'use client';

import type { CSSProperties, InputHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = {
  containerClassName?: string;
  error?: string;
  hint?: string;
  label?: string;
  leadingIcon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  isSuccess?: boolean;
  trailingIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const BASE = {
  highlight: 'pointer-events-none absolute -inset-[1.5px] rounded-[22px] blur-2xl transition-all duration-700 ease-out will-change-transform',
  overlay: 'pointer-events-none absolute inset-0 rounded-[22px] backdrop-blur-[26px] transition duration-500 ease-out',
  frame: 'relative flex min-h-[52px] items-center gap-3 rounded-[22px] border px-4 py-3 text-base backdrop-blur-[18px] transition-all duration-300 ease-out supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:dark:bg-white/[0.06]',
  icon: 'text-muted-foreground transition-colors duration-300',
  input: 'flex-1 bg-transparent text-base outline-none focus-visible:outline-none',
  interactive: 'opacity-0 group-hover:opacity-95 group-focus-within:opacity-100',
  hoverLift: 'group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]',
} as const;

function getAppearance(disabled?: boolean, hasError?: boolean, hasSuccess?: boolean) {
  if (disabled) {
    return {
      highlight: `${BASE.highlight} opacity-0`,
      overlay: `${BASE.overlay} bg-white/15 dark:bg-white/5 opacity-60`,
      frame: `${BASE.frame} cursor-not-allowed bg-white/15 dark:bg-white/[0.05] shadow-none`,
      icon: `${BASE.icon} text-muted-foreground/40`,
      input: `${BASE.input} text-foreground/70 placeholder:text-muted-foreground/40 cursor-not-allowed`,
    };
  }

  if (hasError) {
    return {
      highlight: `${BASE.highlight} ${BASE.interactive} bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(248,113,113,0.30),transparent_55%),radial-gradient(circle_at_80%_-10%,rgba(244,63,94,0.20),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(244,63,94,0.15),transparent_65%)] motion-safe:animate-[liquid-drift_14s_ease-in-out_infinite]`,
      overlay: `${BASE.overlay} bg-white/40 dark:bg-white/12 opacity-95`,
      frame: `${BASE.frame} ${BASE.hoverLift} border-rose-300/80 bg-white/35 dark:bg-white/8 group-hover:border-rose-300/90 group-focus-within:border-rose-200/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_8px_-5px_rgba(190,18,60,0.2)] group-focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_0_1px_rgba(244,63,94,0.2)]`,
      icon: `${BASE.icon} text-rose-300 group-hover:text-rose-300 group-focus-within:text-rose-200`,
      input: `${BASE.input} text-foreground placeholder:text-muted-foreground/65`,
    };
  }

  if (hasSuccess) {
    return {
      highlight: `${BASE.highlight} ${BASE.interactive} bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(52,211,153,0.30),transparent_55%),radial-gradient(circle_at_80%_-10%,rgba(16,185,129,0.24),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(45,212,191,0.18),transparent_65%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(52,211,153,0.32),transparent_55%),radial-gradient(circle_at_80%_-10%,rgba(16,185,129,0.35),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.32),transparent_65%)] motion-safe:animate-[liquid-drift_15s_ease-in-out_infinite]`,
      overlay: `${BASE.overlay} bg-white/45 dark:bg-white/12 opacity-95`,
      frame: `${BASE.frame} ${BASE.hoverLift} border-emerald-300/70 bg-white/40 dark:bg-white/8 group-hover:border-emerald-200/95 group-focus-within:border-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_10px_-6px_rgba(5,150,105,0.22)] group-focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_0_0_1px_rgba(16,185,129,0.25)]`,
      icon: `${BASE.icon} text-emerald-300 group-hover:text-emerald-300 group-focus-within:text-emerald-200`,
      input: `${BASE.input} text-foreground placeholder:text-muted-foreground/60`,
    };
  }

  return {
    highlight: `${BASE.highlight} ${BASE.interactive} bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(56,189,248,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.20),transparent_65%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(148,163,184,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.38),transparent_65%)] motion-safe:animate-[liquid-drift_16s_ease-in-out_infinite]`,
    overlay: `${BASE.overlay} bg-white/35 dark:bg-white/10 opacity-90`,
    frame: `${BASE.frame} ${BASE.hoverLift} border-white/50 dark:border-white/20 bg-white/30 dark:bg-white/[0.03] group-hover:border-white/65 dark:group-hover:border-white/25 dark:group-hover:-translate-y-0 group-focus-within:border-white/75 dark:group-focus-within:border-white/30 dark:group-focus-within:-translate-y-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_10px_-6px_rgba(15,23,42,0.22)] dark:shadow-none`,
    icon: `${BASE.icon} group-hover:text-sky-400 group-focus-within:text-sky-300 dark:group-hover:text-sky-200 dark:group-focus-within:text-sky-200`,
    input: `${BASE.input} text-foreground placeholder:text-muted-foreground/60`,
  };
}

function Input(props: InputProps) {
  const {
    className,
    containerClassName,
    disabled,
    error,
    hint,
    id,
    label,
    leadingIcon,
    ref,
    isSuccess,
    trailingIcon,
    type,
    ...inputProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const generatedId = useId();

  const isPasswordInput = type === 'password';
  const inputId = id ?? `${generatedId}-input`;
  const hasError = Boolean(error);
  const hasSuccess = isSuccess && !hasError;

  const describedBy = [
    hasError && `${inputId}-error`,
    hasSuccess && `${inputId}-success`,
    hint && !hasError && `${inputId}-hint`,
  ].filter(Boolean).join(' ') || undefined;

  const appearance = getAppearance(disabled, hasError, hasSuccess);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }
    const target = highlightRef.current ?? containerRef.current;
    if (!target) {
      return;
    }
    const rect = target.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <fieldset className={cn('text-foreground/90 flex flex-col gap-y-0.5 text-sm', disabled && 'opacity-70', containerClassName)}>
      {label && <label className="ml-0.5 font-medium" htmlFor={inputId}>{label}</label>}

      <div
        ref={containerRef}
        className="group relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
        style={{ '--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px` } as CSSProperties}
      >
        <span aria-hidden className={cn(appearance.overlay)} />

        <div className={cn(appearance.frame, 'overflow-hidden')}>
          <span aria-hidden ref={highlightRef} className={cn(appearance.highlight)} />
          {leadingIcon && <span aria-hidden className={cn(appearance.icon)}>{leadingIcon}</span>}

          <input
            {...inputProps}
            type={isPasswordInput && showPassword ? 'text' : type}
            aria-describedby={describedBy}
            aria-invalid={hasError}
            className={cn(appearance.input, className)}
            disabled={disabled}
            id={inputId}
            ref={ref}
          />

          {isPasswordInput
            ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled}
                  className={cn('hover:text-foreground cursor-pointer transition-colors', disabled && 'cursor-not-allowed')}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              )
            : trailingIcon && (
              <span aria-hidden className={cn(appearance.icon)}>{trailingIcon}</span>
            )}
        </div>
      </div>

      {hasError && error && <p className="ml-0.5 text-xs font-medium text-destructive" id={`${inputId}-error`}>{error}</p>}
      {!hasError && hint && <p className="ml-0.5 text-xs text-muted-foreground" id={`${inputId}-hint`}>{hint}</p>}
    </fieldset>
  );
}

Input.displayName = 'Input';

export { Input };
