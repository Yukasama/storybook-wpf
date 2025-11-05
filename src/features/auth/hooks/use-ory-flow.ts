'use client';

import type { LoginFlow, RecoveryFlow, RegistrationFlow, SettingsFlow, UiNode, UiText, VerificationFlow } from '@ory/client-fetch';
import { handleFlowError, isUiNodeInputAttributes, ResponseError } from '@ory/client-fetch';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { frontendApi } from '@/lib/frontend-api';

type OryFlow = LoginFlow | RegistrationFlow | VerificationFlow | RecoveryFlow | SettingsFlow;
type TranslateFunction = (key: string) => string;
type FieldErrors = Record<string, string>;

const ERROR_PATTERNS = [
  { pattern: /credentials|phone number/i, key: 'invalidCredentials' },
  { pattern: /exists already/i, key: 'emailAlreadyExists' },
  { pattern: /data breaches/i, key: 'passwordBreached' },
  { pattern: /at least.*characters/i, key: 'passwordTooShort' },
  { pattern: /too long/i, key: 'passwordTooLong' },
  { pattern: /valid email/i, key: 'emailInvalid' },
  { pattern: /verification code.*invalid|code.*not.*valid|invalid.*code/i, key: 'invalidCode' },
] as const;

const FIELD_NAME_MAP: Record<string, string> = {
  'identifier': 'email',
  'traits.email': 'email',
};

function translateOryMessage(message: UiText, t: TranslateFunction): string {
  const { text } = message;

  const match = ERROR_PATTERNS.find(({ pattern }) => pattern.test(text));
  if (match) {
    return t(match.key);
  }

  if (text.includes('required') || text.includes('Property') || message.id === 4000002) {
    const property = (message.context as Record<string, unknown> | undefined)?.property;
    if (property === 'identifier' || property === 'traits.email') {
      return t('emailRequired');
    }
    if (property === 'password') {
      return t('passwordRequired');
    }
  }

  return text;
}

function getFlowError(flow: OryFlow, t: TranslateFunction): string | null {
  const errorMessage = flow.ui.messages?.find(m => m.type === 'error');
  return errorMessage ? translateOryMessage(errorMessage, t) : null;
}

function getFieldErrors(flow: OryFlow, t: TranslateFunction): FieldErrors {
  const errors: FieldErrors = {};

  for (const node of flow.ui.nodes) {
    if (!isUiNodeInputAttributes(node.attributes)) {
      continue;
    }

    const fieldName = node.attributes.name;
    const errorMessage = node.messages?.find(m => m.type === 'error');

    if (errorMessage) {
      // eslint-disable-next-line security/detect-object-injection
      const mappedFieldName = FIELD_NAME_MAP[fieldName] ?? fieldName;
      // eslint-disable-next-line security/detect-object-injection
      errors[mappedFieldName] = translateOryMessage(errorMessage, t);
    }
  }

  return errors;
}

type UseOryFlowProps<T extends OryFlow> = {
  initialFlow: T;
  onValidationError: (flow: T, fieldErrors: FieldErrors) => void;
  translate: TranslateFunction;
  flowType?: 'verification' | 'recovery';
  onCodeSuccess?: () => void | Promise<void>;
  setCodeValue?: (field: 'code', value: string) => void;
};

export function useOryFlow<T extends OryFlow>({
  initialFlow,
  onValidationError,
  translate,
  flowType,
  onCodeSuccess,
  setCodeValue,
}: UseOryFlowProps<T>) {
  const router = useRouter();

  const [prevInitialFlow, setPrevInitialFlow] = useState(initialFlow);
  const [flow, setFlow] = useState(initialFlow);
  const [error, setError] = useState<null | string>(() => getFlowError(initialFlow, translate));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(
    () => getFieldErrors(initialFlow, translate),
  );

  if (initialFlow !== prevInitialFlow) {
    setPrevInitialFlow(initialFlow);
    setFlow(initialFlow);
    setError(getFlowError(initialFlow, translate));
    const newFieldErrors = getFieldErrors(initialFlow, translate);
    setFieldErrors(newFieldErrors);
    onValidationError(initialFlow, newFieldErrors);
  }

  const onRedirect = useCallback((url: string, external: boolean) => {
    if (external) {
      window.location.assign(url);
      return;
    }
    router.push(url);
    router.refresh();
  }, [router]);

  const onRestartFlow = useCallback((useFlowId?: string) => {
    const currentUrl = new URL(window.location.href);
    if (useFlowId) {
      currentUrl.searchParams.set('flow', useFlowId);
    } else {
      currentUrl.searchParams.delete('flow');
    }
    const nextPath = currentUrl.pathname + currentUrl.search;
    router.replace(nextPath);
    router.refresh();
  }, [router]);

  const csrfToken = useMemo(() => {
    const node = flow.ui.nodes.find(
      (item: UiNode) => isUiNodeInputAttributes(item.attributes) && item.attributes.name === 'csrf_token',
    );
    if (node && isUiNodeInputAttributes(node.attributes)) {
      return String(node.attributes.value ?? '');
    }
    return '';
  }, [flow.ui.nodes]);

  const flowErrorHandler = useMemo(() => handleFlowError<T>({
    onRedirect,
    onRestartFlow,
    onValidationError: (body) => {
      setFlow(body);
      const newFieldErrors = getFieldErrors(body, translate);
      setFieldErrors(newFieldErrors);
      setError(getFlowError(body, translate) ?? translate('defaultError'));
      onValidationError(body, newFieldErrors);
      return body;
    },
  }), [onRedirect, onRestartFlow, onValidationError, translate]);

  const handleGoogleError = useCallback((error_: Error) => {
    if (error_ instanceof ResponseError) {
      flowErrorHandler(error_).catch(() => setError(translate('defaultError')));
      return;
    }
    setError(translate('defaultError'));
  }, [flowErrorHandler, translate]);

  const isJsonParseError = useCallback((err: unknown): boolean => {
    return err instanceof SyntaxError
      || (err instanceof Error && err.message.includes('JSON'));
  }, []);

  const handleCodeError = useCallback(async (error: unknown) => {
    if (!flowType || !onCodeSuccess || !setCodeValue) {
      return { success: false };
    }

    const cause = error instanceof Error && 'cause' in error ? error.cause : null;

    const checkRedirectError = (err: unknown): boolean => {
      return err instanceof Error
        && err.message === '303 Redirect'
        && 'status' in err
        && err.status === 303;
    };

    const isRedirectError = checkRedirectError(error) || checkRedirectError(cause);

    if (isRedirectError) {
      try {
        const updatedFlow = flowType === 'verification'
          ? await frontendApi.getVerificationFlow({ id: flow.id })
          : await frontendApi.getRecoveryFlow({ id: flow.id });

        if (updatedFlow.state === 'passed_challenge') {
          await onCodeSuccess();
          return { success: true };
        }

        const errors = updatedFlow.ui.messages?.filter(m => m.type === 'error') || [];
        const errorMessage = errors[0]?.text || translate('invalidCode');
        setError(errorMessage);
        setCodeValue('code', '');
        return { success: false };
      } catch (flowError) {
        console.error('Failed to reload flow:', flowError);
        setError(translate('defaultError'));
        setCodeValue('code', '');
        return { success: false };
      }
    }

    if (isJsonParseError(error)) {
      setError(translate('invalidCode'));
      setCodeValue('code', '');
      return { success: false };
    }

    try {
      const updatedFlow = await flowErrorHandler(error);
      if (updatedFlow) {
        setCodeValue('code', '');
        return { success: false };
      }
    } catch (handlerError) {
      if (isJsonParseError(handlerError)) {
        setError(translate('invalidCode'));
        setCodeValue('code', '');
        return { success: false };
      }
    }

    setError(translate('invalidCode'));
    setCodeValue('code', '');
    return { success: false };
  }, [
    flow.id,
    flowType,
    onCodeSuccess,
    setCodeValue,
    flowErrorHandler,
    translate,
    isJsonParseError,
  ]);

  return {
    flow,
    error,
    fieldErrors,
    setError,
    csrfToken,
    onRedirect,
    flowErrorHandler,
    handleGoogleError,
    handleCodeError,
  };
}
