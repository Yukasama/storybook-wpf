'use client';

import type { ComponentPropsWithoutRef, ComponentRef, RefObject } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) {
  const Provider = TooltipPrimitive.Provider;
  return <Provider delayDuration={delayDuration} {...props} />;
}
TooltipProvider.displayName = 'TooltipProvider';

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

function TooltipContent({
  ref,
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  ref?: RefObject<ComponentRef<typeof TooltipPrimitive.Content> | null>;
}) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-[14px] px-3 py-1.5',
        'border border-white/50 dark:border-white/20',
        'bg-white/80 dark:bg-slate-900/80 backdrop-blur-[26px]',
        'text-sm text-foreground',
        'shadow-[0_4px_16px_-6px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
        'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  );
}
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
