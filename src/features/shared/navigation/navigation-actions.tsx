'use client';

import type { Session } from '@/lib/auth';
import { Bell, FileText, Layers, Search, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip/tooltip';

type Props = {
  session?: Session;
};

export function NavigationActions({ session }: Props) {
  const router = useRouter();
  const t = useTranslations('Navigation');
  const tVerification = useTranslations('EmailVerification');
  const isEmailVerified = session?.identity?.emailVerified ?? false;

  const handleUploadClick = (path: string) => {
    if (!isEmailVerified) {
      toast.error(tVerification('uploadBlocked'), {
        description: tVerification('uploadBlockedDescription'),
      });
      return;
    }
    router.push(path);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm">
            <Upload className="h-4.5 w-4.5 text-white" />
            <p>{t('upload')}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleUploadClick('/upload/document')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>{t('uploadDocument')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUploadClick('/upload/deck')}>
            <Layers className="mr-2 h-4 w-4" />
            <span>{t('uploadDeck')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="group relative cursor-pointer transition-colors"
            aria-label={t('search')}
          >
            <Search
              className="absolute inset-0 m-auto h-9 w-9 translate-x-[-3px] stroke-blue-600 opacity-0 blur-xs transition-all duration-500 group-hover:scale-110 group-hover:opacity-40 group-hover:[animation-duration:6s] dark:group-hover:opacity-100"
              strokeWidth={2}
            />
            <Search className="relative h-7 w-7 transition-all duration-300" strokeWidth={1.5} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('search')}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="group relative cursor-pointer transition-colors"
            aria-label={t('notifications')}
          >
            <Bell
              className="absolute inset-0 m-auto h-9 w-9 translate-x-[-3px] stroke-blue-600 opacity-0 blur-xs transition-all duration-500 group-hover:scale-110 group-hover:opacity-40 group-hover:[animation-duration:10s] dark:group-hover:opacity-100"
              strokeWidth={2}
            />
            <Bell className="relative h-7 w-7 transition-all duration-300" strokeWidth={1.5} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('notifications')}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
