/* eslint-disable security/detect-object-injection */
'use client';

import type { CSSProperties, KeyboardEvent, MouseEvent, Ref } from 'react';
import { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type InputOTPProps = {
  containerClassName?: string;
  error?: string;
  hint?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  length?: number;
  ref?: Ref<HTMLInputElement>;
};

const BASE = {
  highlight: 'pointer-events-none absolute -inset-[1.5px] rounded-[14px] blur-2xl transition-all duration-700 ease-out will-change-transform',
  overlay: 'pointer-events-none absolute inset-0 rounded-[14px] backdrop-blur-[26px] transition duration-500 ease-out',
  frame: 'relative flex h-[56px] w-[56px] items-center justify-center rounded-[14px] border backdrop-blur-[18px] transition-all duration-300 ease-out supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:dark:bg-white/[0.06]',
  interactive: 'opacity-0 group-hover:opacity-95 group-focus-within:opacity-100',
  hoverLift: 'group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]',
  input: 'absolute inset-0 w-full text-center bg-transparent text-2xl font-bold outline-none focus-visible:outline-none',
} as const;

function getAppearance(
  disabled?: boolean,
  hasError?: boolean,
  isFocused?: boolean,
  hasValue?: boolean,
) {
  if (disabled) {
    return {
      highlight: `${BASE.highlight} opacity-0`,
      overlay: `${BASE.overlay} bg-white/15 dark:bg-white/5 opacity-60`,
      frame: `${BASE.frame} cursor-not-allowed bg-white/15 dark:bg-white/[0.05] shadow-none`,
      input: `${BASE.input} text-foreground/70 cursor-not-allowed`,
    };
  }

  if (hasError) {
    return {
      highlight: `${BASE.highlight} ${BASE.interactive} bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(248,113,113,0.30),transparent_55%),radial-gradient(circle_at_80%_-10%,rgba(244,63,94,0.20),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(244,63,94,0.15),transparent_65%)] motion-safe:animate-[liquid-drift_14s_ease-in-out_infinite]`,
      overlay: `${BASE.overlay} bg-white/40 dark:bg-white/12 opacity-95`,
      frame: `${BASE.frame} ${BASE.hoverLift} border-rose-300/80 bg-white/35 dark:bg-white/8 group-hover:border-rose-300/90 group-focus-within:border-rose-200/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_8px_-5px_rgba(190,18,60,0.2)] group-focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_0_1px_rgba(244,63,94,0.2)]`,
      input: `${BASE.input} text-foreground`,
    };
  }

  if (isFocused) {
    return {
      highlight: `${BASE.highlight} ${BASE.interactive} bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(56,189,248,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.20),transparent_65%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(148,163,184,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.38),transparent_65%)] motion-safe:animate-[liquid-drift_16s_ease-in-out_infinite]`,
      overlay: `${BASE.overlay} bg-white/35 dark:bg-white/10 opacity-90`,
      frame: `${BASE.frame} ${BASE.hoverLift} border-white/75 dark:border-white/30 bg-white/30 dark:bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_10px_-6px_rgba(15,23,42,0.22)] dark:shadow-none`,
      input: `${BASE.input} text-foreground`,
    };
  }

  if (hasValue) {
    return {
      highlight: `${BASE.highlight} opacity-0`,
      overlay: `${BASE.overlay} bg-white/35 dark:bg-white/10 opacity-90`,
      frame: `${BASE.frame} border-white/60 dark:border-white/25 bg-white/30 dark:bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_3px_8px_-5px_rgba(15,23,42,0.18)]`,
      input: `${BASE.input} text-foreground`,
    };
  }

  return {
    highlight: `${BASE.highlight} ${BASE.interactive} bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(56,189,248,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.20),transparent_65%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(148,163,184,0.35),transparent_58%),radial-gradient(circle_at_80%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.38),transparent_65%)] motion-safe:animate-[liquid-drift_16s_ease-in-out_infinite]`,
    overlay: `${BASE.overlay} bg-white/35 dark:bg-white/10 opacity-90`,
    frame: `${BASE.frame} ${BASE.hoverLift} border-white/50 dark:border-white/20 bg-white/30 dark:bg-white/[0.03] group-hover:border-white/65 dark:group-hover:border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_10px_-6px_rgba(15,23,42,0.22)] dark:shadow-none`,
    input: `${BASE.input} text-foreground`,
  };
}

function InputOTP(props: InputOTPProps) {
  const {
    containerClassName,
    disabled,
    error,
    hint,
    label,
    value,
    onChange,
    onComplete,
    length = 6,
  } = props;

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();

  const hasError = Boolean(error);
  const values = value.padEnd(length, '').split('').slice(0, length);

  const inputId = `${generatedId}-otp`;

  const describedBy = [
    hasError && `${inputId}-error`,
    hint && !hasError && `${inputId}-hint`,
  ].filter(Boolean).join(' ') || undefined;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }
    if (!containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleChange = (index: number, digit: string) => {
    if (disabled) {
      return;
    }

    // Only allow single digits
    const sanitized = digit.replace(/\D/g, '').slice(-1);

    const newValues = [...values];
    newValues[index] = sanitized;
    const newValue = newValues.join('').replace(/ /g, '');

    onChange(newValue);

    // Auto-focus next input
    if (sanitized && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are filled
    if (sanitized && index === length - 1 && newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (e.key >= '0' && e.key <= '9') {
      // Clear current value before entering new one
      if (values[index]) {
        e.preventDefault();
        handleChange(index, e.key);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  return (
    <fieldset className={cn('text-foreground/90 flex flex-col gap-y-1.5 text-sm', disabled && 'opacity-70', containerClassName)}>
      {label && <label className="ml-0.5 font-medium" htmlFor={`${inputId}-0`}>{label}</label>}

      <div
        ref={containerRef}
        className="flex justify-center gap-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 50, y: 50 })}
        style={{ '--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px` } as CSSProperties}
      >
        {Array.from({ length }).map((_, index) => {
          const isFocused = focusedIndex === index;
          const hasValue = Boolean(values[index]);
          const appearance = getAppearance(disabled, hasError, isFocused, hasValue);

          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="group relative">
              <span aria-hidden className={cn(appearance.overlay)} />

              <div className={cn(appearance.frame, 'overflow-hidden')}>
                <span aria-hidden className={cn(appearance.highlight)} />

                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={values[index] || ''}
                  onChange={e => handleChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  disabled={disabled}
                  aria-label={`Digit ${index + 1}`}
                  aria-describedby={describedBy}
                  aria-invalid={hasError}
                  id={`${inputId}-${index}`}
                  className={cn(appearance.input)}
                  autoComplete="one-time-code"
                />
              </div>
            </div>
          );
        })}
      </div>

      {hasError && error && <p className="ml-0.5 text-xs font-medium text-destructive" id={`${inputId}-error`}>{error}</p>}
      {!hasError && hint && <p className="ml-0.5 text-xs text-muted-foreground" id={`${inputId}-hint`}>{hint}</p>}
    </fieldset>
  );
}

InputOTP.displayName = 'InputOTP';

export { InputOTP };
