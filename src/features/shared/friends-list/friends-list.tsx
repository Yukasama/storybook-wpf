'use client';

import type { BlockedPerson, Friend, InstitutionPerson } from './friend-list-item';
import {
  Ban,
  Building2,
  UserPlus,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Button } from '@/components/button/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs/tabs';
import { cn } from '@/lib/utils';
import { FriendListItem } from './friend-list-item';

const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Anna Smith', karma: 1250, avatarFallback: 'AS', avatarColor: 'blue' },
  { id: '2', name: 'Max Miller', karma: 980, avatarFallback: 'MM', avatarColor: 'green' },
  { id: '3', name: 'Lisa Williams', karma: 1450, avatarFallback: 'LW', avatarColor: 'purple' },
  { id: '4', name: 'Tom Fischer', karma: 720, avatarFallback: 'TF', avatarColor: 'orange' },
  { id: '5', name: 'Sarah Klein', karma: 1120, avatarFallback: 'SK', avatarColor: 'pink' },
  { id: '6', name: 'Jonas Brown', karma: 890, avatarFallback: 'JB', avatarColor: 'cyan' },
  { id: '7', name: 'Nina Harris', karma: 1340, avatarFallback: 'NH', avatarColor: 'indigo' },
  { id: '8', name: 'Paul Roberts', karma: 650, avatarFallback: 'PR', avatarColor: 'emerald' },
];

const MOCK_BLOCKED: BlockedPerson[] = [
  { id: '9', name: 'Leon Baker', karma: 540, avatarFallback: 'LB', avatarColor: 'red' },
  {
    id: '10',
    name: 'Julia White',
    karma: 780,
    avatarFallback: 'JW',
    avatarColor: 'orange',
  },
  { id: '11', name: 'Marcus King', karma: 420, avatarFallback: 'MK', avatarColor: 'amber' },
];

const MOCK_INSTITUTION: InstitutionPerson[] = [
  {
    id: '1',
    name: 'Anna Smith',
    karma: 1250,
    avatarFallback: 'AS',
    avatarColor: 'blue',
    isFriend: true,
    isBlocked: false,
  },
  {
    id: '12',
    name: 'Maria Davis',
    karma: 890,
    avatarFallback: 'MD',
    avatarColor: 'amber',
    isFriend: false,
    isBlocked: false,
  },
  {
    id: '13',
    name: 'David Moore',
    karma: 1100,
    avatarFallback: 'DM',
    avatarColor: 'lime',
    isFriend: false,
    isBlocked: false,
  },
  {
    id: '3',
    name: 'Lisa Williams',
    karma: 1450,
    avatarFallback: 'LW',
    avatarColor: 'purple',
    isFriend: true,
    isBlocked: false,
  },
  {
    id: '9',
    name: 'Leon Baker',
    karma: 540,
    avatarFallback: 'LB',
    avatarColor: 'red',
    isFriend: false,
    isBlocked: true,
  },
  {
    id: '14',
    name: 'Emma Taylor',
    karma: 920,
    avatarFallback: 'ET',
    avatarColor: 'purple',
    isFriend: false,
    isBlocked: false,
  },
  {
    id: '15',
    name: 'Felix Anderson',
    karma: 1260,
    avatarFallback: 'FA',
    avatarColor: 'blue',
    isFriend: true,
    isBlocked: false,
  },
];

export type FriendsListProps = {
  friends?: Friend[];
  blocked?: BlockedPerson[];
  institution?: InstitutionPerson[];
};

export function FriendsList({
  friends = MOCK_FRIENDS,
  blocked = MOCK_BLOCKED,
  institution = MOCK_INSTITUTION,
}: FriendsListProps) {
  const t = useTranslations('FriendsList');
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('friends');

  const handleMouseLeave = () => {
    if (!openDropdownId) {
      setIsExpanded(false);
      setActiveTab('friends');
    }
  };

  const handleDropdownChange = useCallback((friendId: string, open: boolean) => {
    setOpenDropdownId(open ? friendId : null);
  }, []);

  const handleCollapseList = useCallback(() => {
    setIsExpanded(false);
    setOpenDropdownId(null);
    setActiveTab('friends');
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
      <aside
        className={cn(
          'fixed right-0 top-16 h-[calc(100vh-4rem)] flex flex-col border-l border-border',
          isExpanded ? 'w-64 z-30 bg-background' : 'w-16 z-10',
        )}
        style={{ transition: 'width 300ms ease-in-out' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            'flex shrink-0 items-center border-b border-border p-2 h-14 gap-2',
            isExpanded ? 'justify-between' : 'justify-center',
          )}
        >
          <TabsList
            className={cn(
              'grid h-8 grid-cols-3 transition-opacity duration-300 flex-1',
              isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none w-0',
            )}
          >
            <TabsTrigger
              value="friends"
              className="h-8"
              aria-label="Friends"
            >
              <Users className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="institution"
              className="h-8"
              aria-label="Institution"
            >
              <Building2 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="blocked"
              className="h-8 data-[state=active]:bg-red-500 data-[state=inactive]:hover:bg-red-500/10 dark:data-[state=inactive]:hover:bg-red-400/10"
              aria-label="Blocked"
            >
              <Ban className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <Button
            size="icon"
            variant="primary"
            aria-label="Add friend"
            className={cn('h-8 w-8 transition duration-200', !isExpanded && 'translate-x-[-7px]')}
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="friends" className="m-0 flex-1 overflow-hidden">
          <div
            className="h-full overflow-x-hidden overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(128, 128, 128, 0.3) transparent',
            }}
          >
            <div className="pt-2 pb-4">
              {friends.length === 0
                ? (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      {isExpanded && (
                        <p className="motion-preset-fade text-sm text-muted-foreground motion-duration-300">
                          {t('noFriendsYet')}
                        </p>
                      )}
                    </div>
                  )
                : (
                    friends.map((friend, i) => (
                      <FriendListItem
                        key={friend.id}
                        person={friend}
                        i={i}
                        isExpanded={isExpanded}
                        isDropdownOpen={openDropdownId === friend.id}
                        onDropdownChange={open => handleDropdownChange(friend.id, open)}
                        onCollapseList={handleCollapseList}
                        type="friend"
                      />
                    ))
                  )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="institution" className="m-0 flex-1 overflow-hidden">
          <div
            className="h-full overflow-x-hidden overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(128, 128, 128, 0.3) transparent',
            }}
          >
            <div className="pt-2 pb-4">
              {institution.length === 0
                ? (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      {isExpanded && (
                        <p className="motion-preset-fade text-sm text-muted-foreground motion-duration-300">
                          {t('noInstitutionMembers')}
                        </p>
                      )}
                    </div>
                  )
                : (
                    institution.map((person, i) => (
                      <FriendListItem
                        key={person.id}
                        person={person}
                        i={i}
                        isExpanded={isExpanded}
                        isDropdownOpen={openDropdownId === person.id}
                        onDropdownChange={open => handleDropdownChange(person.id, open)}
                        onCollapseList={handleCollapseList}
                        type="institution"
                      />
                    ))
                  )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="blocked" className="m-0 flex-1 overflow-hidden">
          <div
            className="h-full overflow-x-hidden overflow-y-auto"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(128, 128, 128, 0.3) transparent',
            }}
          >
            <div className="pt-2 pb-4">
              {blocked.length === 0
                ? (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      {isExpanded && (
                        <p className="motion-preset-fade text-sm text-muted-foreground motion-duration-300">
                          {t('noBlockedUsers')}
                        </p>
                      )}
                    </div>
                  )
                : (
                    blocked.map((person, i) => (
                      <FriendListItem
                        key={person.id}
                        person={person}
                        i={i}
                        isExpanded={isExpanded}
                        isDropdownOpen={openDropdownId === person.id}
                        onDropdownChange={open => handleDropdownChange(person.id, open)}
                        onCollapseList={handleCollapseList}
                        type="blocked"
                      />
                    ))
                  )}
            </div>
          </div>
        </TabsContent>
      </aside>
    </Tabs>
  );
}
