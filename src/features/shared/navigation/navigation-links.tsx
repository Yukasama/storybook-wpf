'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function NavigationLinks() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const NAV_ITEMS = [
    { label: t('dashboard'), href: '/dashboard' },
    { label: t('myInstitution'), href: '/institution' },
  ];

  return (
    <div className="flex flex-1 items-center gap-6">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'font-medium transition-colors hover:text-foreground',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
