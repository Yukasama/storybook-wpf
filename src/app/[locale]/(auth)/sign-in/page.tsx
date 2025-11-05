import type { OryPageParams } from '@ory/nextjs/app';
import { getLoginFlow } from '@ory/nextjs/app';
import config from '@/config/ory';
import { SignInForm } from '@/features/auth/sign-in-form';

export default async function SignInPage({ searchParams }: Readonly<OryPageParams>) {
  const flow = await getLoginFlow(config, searchParams);

  if (!flow) {
    return;
  }

  return (
    <div className="flex flex-col items-center">
      <SignInForm initialFlow={flow} returnTo="/" />
    </div>
  );
}
