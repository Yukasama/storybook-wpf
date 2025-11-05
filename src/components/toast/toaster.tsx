'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      expand={false}
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'group relative flex w-full min-w-[280px] max-w-[340px] items-center gap-3 overflow-hidden rounded-[16px] border border-border/40 bg-white py-2.5 px-4 pr-8 shadow-lg transition-all duration-300 dark:bg-neutral-900',
          title: 'text-[13px] font-semibold leading-tight text-foreground',
          description: 'mt-0.5 text-[11px] leading-snug text-muted-foreground/90',
          icon: 'flex h-5 w-5 shrink-0 items-center justify-center [&_svg]:h-5 [&_svg]:w-5',
          content: 'flex flex-col gap-0.5',
          actionButton:
            'mt-1.5 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90',
          cancelButton:
            'mt-1.5 rounded-lg bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:bg-muted/80',
          closeButton:
            'absolute left-auto right-2 top-2 rounded-lg p-0.5 text-foreground/40 opacity-0 transition-all hover:bg-muted/50 hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100 [&_svg]:h-3 [&_svg]:w-3',
          error:
            'border-red-500/50 bg-gradient-to-br from-red-500/8 via-white to-white dark:border-red-500/35 dark:from-red-500/12 dark:via-neutral-900 dark:to-neutral-900 [&_svg]:text-red-500 dark:[&_svg]:text-red-400',
          success:
            'border-green-500/50 bg-gradient-to-br from-green-500/8 via-white to-white dark:border-green-500/35 dark:from-green-500/12 dark:via-neutral-900 dark:to-neutral-900 [&_svg]:text-green-500 dark:[&_svg]:text-green-400',
          warning:
            'border-yellow-500/50 bg-gradient-to-br from-yellow-500/8 via-white to-white dark:border-yellow-500/35 dark:from-yellow-500/12 dark:via-neutral-900 dark:to-neutral-900 [&_svg]:text-yellow-500 dark:[&_svg]:text-yellow-400',
          info:
            'border-blue-500/50 bg-gradient-to-br from-blue-500/8 via-white to-white dark:border-blue-500/35 dark:from-blue-500/12 dark:via-neutral-900 dark:to-neutral-900 [&_svg]:text-blue-500 dark:[&_svg]:text-blue-400',
        },
      }}
    />
  );
}
