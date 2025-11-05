import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-[box-shadow,transform,background,color,border] duration-300 ease-out outline-none select-none disabled:opacity-70',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white shadow-sm hover:bg-blue-700/90 active:shadow',
        secondary:
          'bg-muted text-foreground shadow-sm hover:bg-neutral-200/50 active:shadow dark:hover:bg-neutral-700/60',
        outline:
          'border border-border bg-transparent text-foreground hover:bg-accent/80',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm active:shadow',
        success:
          'bg-success text-white shadow-sm active:shadow',
        ghost:
          'bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground',
      },
      size: {
        'default': 'h-11 px-4 py-2 text-sm',
        'sm': 'h-9 px-3 text-sm',
        'lg': 'h-12 px-8 text-base',
        'icon': 'size-[34px] rounded-lg p-0',
        'icon-sm': 'h-8 w-8 rounded-lg p-0 text-sm',
        'small-icon': 'h-7 w-7 rounded-lg p-0 text-[13px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);
