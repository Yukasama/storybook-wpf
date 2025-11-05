"use client";

import type { HTMLAttributes, RefObject } from "react";
import { cn } from "@/lib/utils";

export type AvatarColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "cyan"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export type AvatarProps = {
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: AvatarColor;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const sizeMap: Record<string, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const colorMap: Record<AvatarColor, { bg: string; text: string }> = {
  red: { bg: "bg-red-500", text: "text-white" },
  orange: { bg: "bg-orange-500", text: "text-white" },
  amber: { bg: "bg-amber-500", text: "text-white" },
  yellow: { bg: "bg-yellow-500", text: "text-white" },
  lime: { bg: "bg-lime-500", text: "text-white" },
  green: { bg: "bg-green-500", text: "text-white" },
  emerald: { bg: "bg-emerald-500", text: "text-white" },
  cyan: { bg: "bg-cyan-500", text: "text-white" },
  blue: { bg: "bg-blue-500", text: "text-white" },
  indigo: { bg: "bg-indigo-500", text: "text-white" },
  purple: { bg: "bg-purple-500", text: "text-white" },
  pink: { bg: "bg-pink-500", text: "text-white" },
};

function Avatar({
  ref,
  ...props
}: AvatarProps & { ref?: RefObject<HTMLDivElement | null> }) {
  const { fallback = "H", size = "md", color, className, ...divProps } = props;

  const colors = color
    ? // eslint-disable-next-line security/detect-object-injection
      colorMap[color]
    : { bg: "bg-accent", text: "text-accent-foreground" };

  const getInitials = (text: string): string => {
    const parts = text.split(/\s+/);
    if (parts.length > 1) {
      const first = parts[0].charAt(0);
      const last = parts[parts.length - 1].charAt(0);
      return `${first}${last}`.toUpperCase();
    }

    return text.slice(0, 2).toUpperCase();
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full",
        "border-2 border-white dark:border-gray-600 shadow-sm font-medium cursor-pointer",
        // eslint-disable-next-line security/detect-object-injection
        sizeMap[size],
        colors.bg,
        colors.text,
        className
      )}
      {...divProps}
    >
      {getInitials(fallback)}
    </div>
  );
}

Avatar.displayName = "Avatar";

export { Avatar };
