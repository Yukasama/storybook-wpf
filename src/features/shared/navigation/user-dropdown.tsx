import type { Session } from '@/lib/auth';
import { Settings, User, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/dropdown-menu/dropdown-menu';
import { AuthAction } from '@/features/shared/navigation/auth-action';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeSwitcher } from './theme-switcher';
import { UserAvatar } from './user-avatar';

export function UserDropdown({ session }: { session?: Session }) {
  const t = useTranslations('UserDropdown');
  const user = session?.user;
  const isAuthenticated = Boolean(session);

  return (
    <DropdownMenu>
      <UserAvatar session={session} />

      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        {user && (
          <>
            <div className="relative mb-1 overflow-hidden rounded-t-[14px] px-3 py-3 pb-2.5">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.15),transparent_50%)]" />

              <div className="relative flex flex-col space-y-2">
                <p className="text-sm leading-none font-semibold">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                <div className="flex w-fit items-center gap-1.5 rounded-full bg-blue-500/15 px-2.5 py-0.5 backdrop-blur-sm dark:bg-blue-500/10">
                  <Zap className="h-3 w-3 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" />
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {user.karma.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <DropdownMenuGroup>
              <Link href={`/profile/${user.id}`}>
                <DropdownMenuItem>
                  <User />
                  {t('editProfile')}
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem>
                  <Settings />
                  {t('settings')}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        <ThemeSwitcher />
        <LocaleSwitcher />
        <AuthAction isAuthenticated={isAuthenticated} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
