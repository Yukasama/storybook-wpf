'use client';

import type { ComponentPropsWithoutRef, ComponentRef, CSSProperties, MouseEvent, RefObject } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  ref,
  className,
  children,
  disabled,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  ref?: RefObject<ComponentRef<typeof SelectPrimitive.Trigger> | null>;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLButtonElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    const target = highlightRef.current ?? containerRef.current;
    if (!target) {
      return;
    }
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const baseClasses = {
    highlight:
      'pointer-events-none absolute -inset-[1.5px] rounded-[22px] blur-2xl transition-all duration-700 ease-out will-change-transform',
    overlay:
      'pointer-events-none absolute inset-0 rounded-[22px] backdrop-blur-[26px] transition duration-500 ease-out',
    frame:
      'relative flex min-h-[52px] w-full items-center justify-between gap-3 rounded-[22px] border px-4 py-3 text-base backdrop-blur-[18px] transition-all duration-300 ease-out supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:dark:bg-white/[0.06]',
    icon: 'text-muted-foreground transition-colors duration-300',
  };

  const appearance = disabled
    ? {
        ...baseClasses,
        highlight: `${baseClasses.highlight} opacity-0`,
        overlay: `${baseClasses.overlay} bg-white/15 dark:bg-white/5 opacity-60`,
        frame: `${baseClasses.frame} cursor-not-allowed bg-white/15 dark:bg-white/[0.05] shadow-none`,
        icon: `${baseClasses.icon} text-muted-foreground/40`,
      }
    : {
        ...baseClasses,
        highlight: `${baseClasses.highlight} opacity-0 group-hover:opacity-95 group-data-[state=open]:opacity-100 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(56,189,248,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.20),transparent_65%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(148,163,184,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.38),transparent_65%)] motion-safe:animate-[liquid-drift_16s_ease-in-out_infinite]`,
        overlay: `${baseClasses.overlay} bg-white/35 dark:bg-white/10 opacity-90`,
        frame: `${baseClasses.frame} border-white/50 dark:border-white/20 bg-white/30 dark:bg-white/[0.03] group-hover:border-white/65 dark:group-hover:border-white/25 group-hover:-translate-y-[1px] dark:group-hover:-translate-y-0 group-data-[state=open]:border-white/75 dark:group-data-[state=open]:border-white/30 group-data-[state=open]:-translate-y-[1px] dark:group-data-[state=open]:-translate-y-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_10px_-6px_rgba(15,23,42,0.22)] dark:shadow-none`,
        icon: `${baseClasses.icon} group-hover:text-sky-400 group-data-[state=open]:text-sky-300 dark:group-hover:text-sky-200 dark:group-data-[state=open]:text-sky-200`,
      };

  return (
    <SelectPrimitive.Trigger
      ref={ref ?? containerRef}
      disabled={disabled}
      className={cn('group relative outline-none', disabled && 'opacity-70', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
      style={
        {
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as CSSProperties
      }
      {...props}
    >
      <span aria-hidden className={cn(appearance.overlay)} />

      <div className={cn(appearance.frame, 'overflow-hidden')}>
        <span
          aria-hidden
          ref={highlightRef}
          className={cn(appearance.highlight)}
        />
        <span className="flex-1 truncate text-left">{children}</span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className={cn('h-4 w-4 shrink-0', appearance.icon)} />
        </SelectPrimitive.Icon>
      </div>
    </SelectPrimitive.Trigger>
  );
}
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

function SelectScrollUpButton({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
  ref?: RefObject<ComponentRef<typeof SelectPrimitive.ScrollUpButton> | null>;
}) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      aria-label="Scroll up"
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

function SelectScrollDownButton({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & {
  ref?: RefObject<ComponentRef<typeof SelectPrimitive.ScrollDownButton> | null>;
}) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      aria-label="Scroll down"
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}
SelectScrollDownButton.displayName
  = SelectPrimitive.ScrollDownButton.displayName;

function SelectContent({
  ref,
  className,
  children,
  position = 'popper',
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  ref?: RefObject<ComponentRef<typeof SelectPrimitive.Content> | null>;
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-[18px]',
          'border border-white/50 dark:border-white/20',
          'bg-white/80 dark:bg-slate-900/80 backdrop-blur-[26px]',
          'shadow-[0_4px_16px_-6px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_4px_16px_-6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper'
            && 'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
SelectContent.displayName = SelectPrimitive.Content.displayName;

function SelectLabel({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
  ref?: RefObject<ComponentRef<typeof SelectPrimitive.Label> | null>;
}) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('px-3 py-2 text-sm font-semibold text-foreground/90', className)}
      {...props}
    />
  );
}
SelectLabel.displayName = SelectPrimitive.Label.displayName;

function SelectItem({
  ref,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  ref?: RefObject<ComponentRef<typeof SelectPrimitive.Item> | null>;
}) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-[14px] py-2.5 pl-3 pr-8 text-sm outline-none',
        'transition-colors duration-200',
        'focus:bg-sky-500/10 dark:focus:bg-sky-400/10',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-sky-500 dark:text-sky-400" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
SelectItem.displayName = SelectPrimitive.Item.displayName;

function SelectSeparator({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  ref?: RefObject<ComponentRef<typeof SelectPrimitive.Separator> | null>;
}) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-white/30 dark:bg-white/10', className)}
      {...props}
    />
  );
}
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
