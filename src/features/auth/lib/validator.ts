import z from 'zod';

export function createSignInSchema(t: (key: string) => string) {
  return z.object({
    email: z.email(t('Auth.Errors.emailInvalid')),
    password: z.string().min(1, t('Auth.Errors.passwordRequired')),
  });
}

export type SignInProps = z.infer<ReturnType<typeof createSignInSchema>>;

export function createSignUpSchema(t: (key: string) => string) {
  return z
    .object({
      email: z.email(t('Auth.Errors.emailInvalid')),
      password: z
        .string()
        .min(1, t('Auth.Errors.passwordRequired'))
        .min(8, t('Auth.Errors.passwordTooShort')),
      confirmPassword: z.string().min(1, t('Auth.Errors.confirmPasswordRequired')),
      acceptTerms: z.boolean().refine(val => val === true, {
        message: t('Auth.Errors.acceptTermsRequired'),
      }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('Auth.Errors.passwordsMustMatch'),
      path: ['confirmPassword'],
    });
}

export type SignUpProps = z.infer<ReturnType<typeof createSignUpSchema>>;

export function createVerificationSchema(t: (key: string) => string) {
  return z.object({
    code: z.string().min(1, t('Auth.Errors.codeRequired')),
  });
}

export type VerificationProps = z.infer<ReturnType<typeof createVerificationSchema>>;

export function createEmailSchema(t: (key: string) => string) {
  return z.object({
    email: z.string().min(1, t('Auth.Errors.emailRequired')).email(t('Auth.Errors.emailInvalid')),
  });
}

export type EmailProps = z.infer<ReturnType<typeof createEmailSchema>>;

export function createRecoveryCodeSchema(t: (key: string) => string) {
  return z.object({
    code: z.string().min(6, t('Auth.Errors.codeRequired')),
  });
}

export type RecoveryCodeProps = z.infer<ReturnType<typeof createRecoveryCodeSchema>>;

export function createChangePasswordSchema(t: (key: string) => string) {
  return z.object({
    password: z.string().min(8, t('Auth.Errors.passwordMin')),
    confirmPassword: z.string().min(1, t('Auth.Errors.confirmPasswordRequired')),
  }).refine(data => data.password === data.confirmPassword, {
    message: t('Auth.Errors.passwordsDoNotMatch'),
    path: ['confirmPassword'],
  });
}

export type ChangePasswordProps = z.infer<ReturnType<typeof createChangePasswordSchema>>;
