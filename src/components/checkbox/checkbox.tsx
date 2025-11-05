'use client';

import type { ComponentPropsWithoutRef, ComponentRef, CSSProperties, MouseEvent, RefObject } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

function Checkbox({
  ref,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  ref?: RefObject<ComponentRef<typeof CheckboxPrimitive.Root> | null>;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLButtonElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (props.disabled) {
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
      'pointer-events-none absolute -inset-[1.5px] rounded-[6px] blur-2xl transition-all duration-700 ease-out will-change-transform',
    overlay:
      'pointer-events-none absolute inset-0 rounded-[6px] backdrop-blur-[26px] transition duration-500 ease-out',
    frame:
      'relative flex h-5 w-5 items-center justify-center rounded-[6px] border backdrop-blur-[18px] transition-all duration-300 ease-out supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:dark:bg-white/[0.06]',
  };

  const appearance = props.disabled
    ? {
        ...baseClasses,
        highlight: `${baseClasses.highlight} opacity-0`,
        overlay: `${baseClasses.overlay} bg-white/15 dark:bg-white/5 opacity-60`,
        frame: `${baseClasses.frame} cursor-not-allowed bg-white/15 dark:bg-white/[0.05] shadow-none`,
      }
    : {
        ...baseClasses,
        highlight: `${baseClasses.highlight} opacity-0`,
        overlay: `${baseClasses.overlay} bg-white/80 dark:bg-slate-900/80 opacity-100 group-data-[state=checked]:bg-blue-600 dark:group-data-[state=checked]:bg-blue-600`,
        frame: `${baseClasses.frame} border-border dark:border-white/20 bg-white/50 dark:bg-white/[0.05] group-hover:border-border/80 dark:group-hover:border-white/25 group-data-[state=checked]:border-blue-600 dark:group-data-[state=checked]:border-blue-600 group-data-[state=checked]:bg-blue-600 dark:group-data-[state=checked]:bg-blue-600 shadow-sm`,
      };

  return (
    <CheckboxPrimitive.Root
      ref={ref ?? containerRef}
      className={cn('group peer relative outline-none cursor-pointer rounded-md', className)}
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
        <CheckboxPrimitive.Indicator className="relative flex items-center justify-center text-white">
          <Check className="h-4 w-4" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </div>
    </CheckboxPrimitive.Root>
  );
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
