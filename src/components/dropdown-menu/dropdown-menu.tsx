'use client';

import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, RefObject } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuSubTrigger({
  ref,
  className,
  inset,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
} & { ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.SubTrigger> | null> }) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center gap-2 rounded-[14px] px-3 py-2.5 text-sm outline-none',
        'transition-colors duration-200',
        'focus:bg-sky-500/10 dark:focus:bg-sky-400/10',
        'data-[state=open]:bg-sky-500/10 dark:data-[state=open]:bg-sky-400/10',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

function DropdownMenuSubContent({
  ref,
  className,
  sideOffset = 8,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
  ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.SubContent> | null>;
}) {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-100 min-w-32 overflow-hidden rounded-[18px]',
        'border border-white/50 dark:border-white/20',
        'bg-white/80 dark:bg-slate-900/80 backdrop-blur-[26px]',
        'p-1',
        'shadow-[0_4px_16px_-6px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'origin-[--radix-dropdown-menu-content-transform-origin]',
        className,
      )}
      {...props}
    />
  );
}
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

function DropdownMenuContent({
  ref,
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.Content> | null>;
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-[18px]',
          'border border-white/50 dark:border-white/20',
          'bg-white/80 dark:bg-slate-900/80 backdrop-blur-[26px]',
          'p-1',
          'shadow-[0_4px_16px_-6px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-[--radix-dropdown-menu-content-transform-origin]',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

function DropdownMenuItem({
  ref,
  className,
  inset,
  destructive,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  destructive?: boolean;
} & { ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.Item> | null> }) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-[14px] px-3 py-2.5 text-sm outline-none',
        'transition-colors duration-200',
        destructive
          ? 'text-red-600 dark:text-red-400 focus:bg-red-500/10 dark:focus:bg-red-400/10 focus:text-red-600 dark:focus:text-red-400'
          : 'focus:bg-sky-500/10 dark:focus:bg-sky-400/10',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  );
}
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

function DropdownMenuCheckboxItem({
  ref,
  className,
  children,
  checked,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
  ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem> | null>;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-[14px] py-2.5 pl-8 pr-3 text-sm outline-none',
        'transition-colors duration-200',
        'focus:bg-sky-500/10 dark:focus:bg-sky-400/10',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-sky-500 dark:text-sky-400" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

function DropdownMenuRadioItem({
  ref,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
  ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.RadioItem> | null>;
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-[14px] py-2.5 pl-8 pr-3 text-sm outline-none',
        'transition-colors duration-200',
        'focus:bg-sky-500/10 dark:focus:bg-sky-400/10',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current text-sky-500 dark:text-sky-400" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

function DropdownMenuLabel({
  ref,
  className,
  inset,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
} & { ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.Label> | null> }) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        'px-3 py-2 text-sm font-semibold text-foreground/90',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  );
}
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

function DropdownMenuSeparator({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & {
  ref?: RefObject<ComponentRef<typeof DropdownMenuPrimitive.Separator> | null>;
}) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-slate-200/70 dark:bg-white/10', className)}
      {...props}
    />
  );
}
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

function DropdownMenuShortcut({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
