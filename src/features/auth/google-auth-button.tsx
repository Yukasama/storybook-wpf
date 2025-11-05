'use client';

import { handleContinueWith } from '@ory/client-fetch';
import { useTranslations } from 'next-intl';
import { startTransition, useActionState, useCallback } from 'react';
import { Button } from '@/components/button/button';
import { Icons } from '@/components/icons';
import { useRouter } from '@/i18n/navigation';
import { frontendApi } from '@/lib/frontend-api';

type Props = {
  flow: string;
  csrfToken: string;
  flowType: 'login' | 'registration';
  returnTo?: string;
  onError?: (error: Error) => void;
};

export function GoogleAuthButton({ flow, csrfToken, flowType, returnTo, onError }: Props) {
  const router = useRouter();
  const t = useTranslations('Auth.Google');

  const onRedirect = useCallback((url: string) => {
    if (url.startsWith('/')) {
      router.push(url);
      router.refresh();
    } else {
      window.location.assign(url);
    }
  }, [router]);

  const googleAuthAction = async (_prevState: unknown, _formData: unknown) => {
    try {
      const update = {
        csrf_token: csrfToken,
        method: 'oidc' as const,
        provider: 'google',
      };

      const result = flowType === 'login'
        ? await frontendApi.updateLoginFlow({ flow, updateLoginFlowBody: update })
        : await frontendApi.updateRegistrationFlow({ flow, updateRegistrationFlowBody: update });

      const handled = handleContinueWith(result.continue_with, { onRedirect });
      if (!handled) {
        router.push(returnTo ?? '/');
        router.refresh();
      }
    } catch (error: unknown) {
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  };

  const [, triggerGoogleAuth, isPending] = useActionState(googleAuthAction, null);

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={() => startTransition(() => triggerGoogleAuth(null))}
      type="button"
      className="w-full"
    >
      <Icons.Google className="mx-0.5 h-5.5 w-5.5" />
      {isPending ? t('continuingButton') : t('continueButton')}
    </Button>
  );
}
