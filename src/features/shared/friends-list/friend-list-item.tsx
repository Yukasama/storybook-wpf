'use client';

import {
  Ban,
  Eye,
  Mail,
  MoreVertical,
  NotepadText,
  Trash2,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { Avatar } from '@/components/avatar/avatar';
import { Button } from '@/components/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';
import { cn } from '@/lib/utils';

export type Friend = {
  id: string;
  name: string;
  karma: number;
  avatarFallback: string;
  avatarColor?: 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink';
};

export type BlockedPerson = {
  id: string;
  name: string;
  karma: number;
  avatarFallback: string;
  avatarColor?: 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink';
};

export type InstitutionPerson = {
  id: string;
  name: string;
  karma: number;
  avatarFallback: string;
  avatarColor?: 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink';
  isFriend: boolean;
  isBlocked: boolean;
};

type FriendListItemProps = {
  person: Friend | BlockedPerson | InstitutionPerson;
  i: number;
  isExpanded: boolean;
  isDropdownOpen: boolean;
  onDropdownChange: (open: boolean) => void;
  onCollapseList: () => void;
  type: 'friend' | 'blocked' | 'institution';
};

export const FriendListItem = memo(
  ({
    person,
    i,
    isExpanded,
    isDropdownOpen,
    onDropdownChange,
    onCollapseList,
    type,
  }: FriendListItemProps) => {
    const t = useTranslations('FriendsList.dropdown');
    const isInstitutionPerson = type === 'institution' && 'isFriend' in person;
    const isFriend = isInstitutionPerson
      ? person.isFriend
      : type === 'friend';
    const isBlocked = isInstitutionPerson
      ? person.isBlocked
      : type === 'blocked';

    return (
      <div
        className={cn('px-4 py-2 transition-colors group', !isExpanded && 'flex justify-center')}
        style={{ animationDelay: `${i * 30}ms` }}
      >
        <div className="flex h-9 w-full items-center gap-3">
          <div className="shrink-0">
            <Avatar
              fallback={person.avatarFallback}
              color={person.avatarColor}
              size="sm"
            />
          </div>

          {isExpanded && (
            <>
              <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm leading-none font-medium whitespace-nowrap">
                    {person.name}
                  </span>
                  {type === 'institution' && isFriend && !isBlocked && (
                    <Users className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                  )}
                  {type === 'institution' && isBlocked && (
                    <Ban className="h-3.5 w-3.5 shrink-0 text-red-500" />
                  )}
                </div>
                <div className="flex w-fit items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 whitespace-nowrap">
                  <span className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <Zap className="h-3 w-3 fill-blue-500 text-blue-500" />
                    {person.karma.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={onDropdownChange}
                  modal={false}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="small-icon"
                      aria-label="Friend options"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={4}
                    onEscapeKeyDown={onCollapseList}
                    onPointerDownOutside={(e) => {
                      const target = e.target as HTMLElement;
                      const sidebar = target.closest('aside');
                      if (!sidebar) {
                        onCollapseList();
                      }
                    }}
                  >
                    <DropdownMenuItem>
                      <Eye />
                      {t('viewProfile')}
                    </DropdownMenuItem>

                    {isFriend && !isBlocked && (
                      <>
                        <DropdownMenuItem>
                          <Mail />
                          {t('inviteToLobby')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <NotepadText />
                          {t('addNote')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem destructive>
                          <Trash2 />
                          {t('remove')}
                        </DropdownMenuItem>
                        <DropdownMenuItem destructive>
                          <Ban />
                          {t('block')}
                        </DropdownMenuItem>
                      </>
                    )}

                    {!isFriend && !isBlocked && type === 'institution' && (
                      <DropdownMenuItem>
                        <UserPlus />
                        {t('sendRequest')}
                      </DropdownMenuItem>
                    )}

                    {isBlocked && (
                      <DropdownMenuItem>
                        <Ban className="text-muted-foreground" />
                        {t('unblock')}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    );
  },
);

FriendListItem.displayName = 'FriendListItem';
