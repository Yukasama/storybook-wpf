import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  'mb-4 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xs',
  {
    variants: {
      variant: {
        default:
          'border-blue-200 bg-blue-100/80 text-blue-700 shadow-blue-100 dark:border-blue-400/50 dark:bg-blue-600/15 dark:text-blue-400 dark:shadow-blue-500/50',
        error:
          'border-red-200 bg-red-100/80 text-red-700 shadow-red-100 dark:border-red-400/50 dark:bg-red-600/15 dark:text-red-400 dark:shadow-red-500/50',
        success:
          'border-green-200 bg-green-100/80 text-green-700 shadow-green-100 dark:border-green-400/50 dark:bg-green-600/15 dark:text-green-400 dark:shadow-green-500/50',
        warning:
          'border-amber-200 bg-amber-100/80 text-amber-800 shadow-amber-100 dark:border-amber-400/50 dark:bg-amber-600/15 dark:text-amber-400 dark:shadow-amber-500/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type AlertProps = React.HTMLAttributes<HTMLDivElement>
  & VariantProps<typeof alertVariants> & {
    message: string;
  };

function Alert({ message, variant = 'default', className, ...props }: AlertProps) {
  const Icon = {
    default: Info,
    error: AlertTriangle,
    success: CheckCircle2,
    warning: AlertCircle,
  }[variant || 'default'];

  return (
    <div className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

Alert.displayName = 'Alert';

export { Alert };
