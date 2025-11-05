"use client";

import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "../loader/loader";
import { buttonVariants } from "./button-variants";

export type ButtonProps = { isLoading?: boolean } & Omit<
  HTMLMotionProps<"button">,
  "ref"
> &
  VariantProps<typeof buttonVariants>;

/**
 * Dokumentation der Button-Komponente
 */
function Button({
  ref,
  ...props
}: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  const {
    className,
    variant,
    size,
    children,
    isLoading = false,
    disabled,
    type = "button",
    ...rest
  } = props;

  const isDisabled = disabled || isLoading;
  const content = children as React.ReactNode;
  const hasContent = content !== null && content !== undefined;

  return (
    <motion.button
      ref={ref}
      type={type}
      data-variant={variant}
      className={cn(
        buttonVariants({ variant, size }),
        className,
        "cursor-pointer font-semibold"
      )}
      disabled={isDisabled}
      whileTap={{ scale: 0.97 }}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading && (
        <Loader className={cn("-mx-2", variant === "primary" && "invert")} />
      )}
      {hasContent && (
        <span
          className={cn(
            "inline-flex items-center gap-2 whitespace-nowrap",
            isLoading && "opacity-80"
          )}
        >
          {content}
        </span>
      )}
    </motion.button>
  );
}

Button.displayName = "Button";

export { Button };
