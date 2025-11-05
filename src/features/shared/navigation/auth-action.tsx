'use client';

import { LogIn, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/dropdown-menu/dropdown-menu';
import { Link, usePathname } from '@/i18n/navigation';
import { frontendApi } from '@/lib/frontend-api';

export function AuthAction({ isAuthenticated }: { isAuthenticated: boolean }) {
  const t = useTranslations('UserDropdown');
  const pathname = usePathname();
  const isOnSignInPage = pathname?.includes('/sign-in');

  const handleLogout = async () => {
    try {
      const flow = await frontendApi.createBrowserLogoutFlow();
      await frontendApi.updateLogoutFlow({ token: flow.logout_token });
    } catch (error: unknown) {
      // TODO: Don't show error to user
      console.error({ error }, 'Logout failed');
    }

    // Force full page reload to clear session state
    window.location.href = '/sign-in';
  };

  if (isAuthenticated) {
    return (
      <>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive onClick={handleLogout}>
          <LogOut />
          {t('logout')}
        </DropdownMenuItem>
      </>
    );
  }

  if (!isOnSignInPage) {
    return (
      <>
        <DropdownMenuSeparator />
        <Link href="/sign-in">
          <DropdownMenuItem>
            <LogIn />
            {t('login')}
          </DropdownMenuItem>
        </Link>
      </>
    );
  }
}
