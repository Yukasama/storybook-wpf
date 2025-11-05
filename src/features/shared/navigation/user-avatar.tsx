'use client';

import type { Session } from '@/lib/auth';
import { Avatar } from '@/components/avatar/avatar';
import { AvatarWithInfo } from '@/components/avatar/avatar-with-info';
import {
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';
import { useMediaQuery } from '@/hooks/use-media-query';

export function UserAvatar({ session }: { session?: Session }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const user = session?.user;

  return (
    <DropdownMenuTrigger asChild>
      {user && isDesktop
        ? (
            <button type="button" data-testid="user-menu" className="group flex cursor-pointer items-center gap-3 rounded-full outline-none">
              <AvatarWithInfo
                name={user.name}
                karma={user.karma}
                avatarProps={{
                  fallback: user.avatarFallback,
                  color: user.avatarColor,
                  size: 'md',
                }}
              />
            </button>
          )
        : (
            <button type="button" className="rounded-full outline-none">
              <Avatar
                fallback={user?.avatarFallback || 'U'}
                color={user?.avatarColor || 'blue'}
                size="md"
              />
            </button>
          )}
    </DropdownMenuTrigger>
  );
}
