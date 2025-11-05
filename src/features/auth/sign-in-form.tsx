'use client';

import type { LoginFlow } from '@ory/client-fetch';
import type { SignInProps } from './lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleContinueWith } from '@ory/client-fetch';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from '@/components/alert/alert';
import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import { Link, useRouter } from '@/i18n/navigation';
import { frontendApi } from '@/lib/frontend-api';
import { GoogleAuthButton } from './google-auth-button';
import { useOryFlow } from './hooks/use-ory-flow';
import { createSignInSchema } from './lib/validator';

type Props = {
  initialFlow: LoginFlow;
  returnTo?: string;
};

export function SignInForm({ initialFlow, returnTo }: Props) {
  const router = useRouter();
  const t = useTranslations('Auth.SignIn');
  const tErrors = useTranslations('Auth.Errors');
  const tAll = useTranslations();

  const signInSchema = useMemo(() => createSignInSchema(tAll), [tAll]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError: setFormError,
  } = useForm<SignInProps>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onValidationError = useCallback(
    (_flow: typeof initialFlow, fieldErrors: Record<string, string>) => {
      setValue('password', '');
      Object.entries(fieldErrors).forEach(([field, message]) => {
        if (field === 'email' || field === 'password') {
          setFormError(field, { type: 'manual', message });
        }
      });
    },
    [setValue, setFormError],
  );

  const {
    flow,
    error,
    setError,
    csrfToken,
    onRedirect,
    flowErrorHandler,
    handleGoogleError,
  } = useOryFlow({ initialFlow, onValidationError, translate: key => tErrors(key) });

  const submitLogin = useCallback(async (_state: null, data: SignInProps) => {
    setError(null);

    try {
      const loginResult = await frontendApi.updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody: {
          csrf_token: csrfToken,
          identifier: data.email,
          method: 'password',
          password: data.password,
        },
      });

      const handled = handleContinueWith(loginResult.continue_with, { onRedirect });
      if (!handled) {
        router.push(returnTo ?? '/');
        router.refresh();
      }
    } catch (error: unknown) {
      const updatedFlow = await flowErrorHandler(error);
      if (!updatedFlow) {
        setError(tErrors('defaultError'));
      }
      setValue('password', '');
    }

    return null;
  }, [
    csrfToken,
    flow.id,
    flowErrorHandler,
    onRedirect,
    returnTo,
    router,
    setValue,
    setError,
    tErrors,
  ]);

  const [, triggerLogin, isPending] = useActionState(submitLogin, null);
  const onSubmit = handleSubmit((formData) => {
    startTransition(() => triggerLogin(formData));
  });

  return (
    <div className="w-full max-w-[340px] pt-36">
      <div className="mb-7 flex flex-col items-center space-y-1">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </div>

      {error ? <Alert message={error} variant="error" /> : null}

      <form className="space-y-3.5" data-testid="sign-in-form" onSubmit={onSubmit}>
        <Input
          id="sign-in-email"
          data-testid="sign-in-email"
          label={t('emailLabel')}
          placeholder={t('emailPlaceholder')}
          disabled={isPending}
          autoComplete="email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          id="sign-in-password"
          data-testid="sign-in-password"
          label={t('passwordLabel')}
          placeholder={t('passwordPlaceholder')}
          disabled={isPending}
          autoComplete="current-password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex justify-end">
          <Link href="/recovery" className="self-end text-sm font-medium text-blue-600 hover:underline">
            {t('forgotPassword')}
          </Link>
        </div>

        <Button data-testid="sign-in-submit" disabled={isPending} type="submit" className="w-full">
          {isPending ? t('submittingButton') : t('submitButton')}
        </Button>
      </form>

      <div className="space-y-3">
        <div className="my-5.5 h-px w-full bg-accent" />
        <GoogleAuthButton
          flow={flow.id}
          csrfToken={csrfToken}
          flowType="login"
          returnTo={returnTo}
          onError={handleGoogleError}
        />
      </div>

      <div className="mt-6 text-center text-[15px]">
        {t('noAccount')}{' '}
        <Link href="/sign-up" className="font-medium text-blue-600 hover:underline">
          {t('signUpLink')}
        </Link>
      </div>
    </div>
  );
}
