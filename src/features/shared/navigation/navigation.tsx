import type { Session } from '@/lib/auth';
import { TooltipProvider } from '@/components/tooltip/tooltip';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { NavigationActions } from './navigation-actions';
import { NavigationLinks } from './navigation-links';
import { UserDropdown } from './user-dropdown';

type Props = {
  session?: Session;
};

export function Navigation({ session }: Props) {
  const hasUser = Boolean(session?.user);

  return (
    <TooltipProvider>
      <nav className="fixed top-0 right-0 left-0 z-20 flex h-16 items-center border-b border-border bg-background px-6">
        <Link href={hasUser ? '/dashboard' : '/'} className="mr-12 text-2xl font-bold">
          Docuvalley
        </Link>

        {hasUser && <NavigationLinks />}
        {!hasUser && <div className="flex-1" />}

        <div className="flex items-center gap-5">
          {hasUser && <NavigationActions session={session} />}
          <div className={cn('ml-0.5', hasUser && 'pl-4.5 sm:border-l sm:border-gray-500/20 sm:dark:border-gray-500/40')}>
            <UserDropdown session={session} />
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
