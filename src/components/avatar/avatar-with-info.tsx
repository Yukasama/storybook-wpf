'use client';

import type { HTMLAttributes } from 'react';
import type { AvatarProps } from './avatar';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from './avatar';

export type AvatarWithInfoProps = {
  name: string;
  karma: number;
  avatarProps?: Omit<AvatarProps, 'className'>;
} & HTMLAttributes<HTMLDivElement>;

function AvatarWithInfo({
  name,
  karma,
  avatarProps,
  className,
  ...divProps
}: AvatarWithInfoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)} {...divProps}>
      <div className="flex flex-col gap-1">
        <span className="text-sm leading-none font-medium">{name}</span>
        <div className="flex w-fit items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5">
          <Zap className="h-3 w-3 fill-blue-500 text-blue-500" />
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {karma.toLocaleString()}
          </span>
        </div>
      </div>
      <Avatar {...avatarProps} />
    </div>
  );
}

AvatarWithInfo.displayName = 'AvatarWithInfo';

export { AvatarWithInfo };
