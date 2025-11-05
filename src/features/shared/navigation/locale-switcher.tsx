'use client';

import type { Locale } from 'next-intl';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/dropdown-menu/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';

const locales: { code: Locale; flag: string }[] = [
  { code: 'de', flag: '🇩🇪' },
  { code: 'en', flag: '🇬🇧' },
  { code: 'fr', flag: '🇫🇷' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'it', flag: '🇮🇹' },
  { code: 'nl', flag: '🇳🇱' },
  { code: 'pt', flag: '🇵🇹' },
];

export function LocaleSwitcher() {
  const t = useTranslations('UserDropdown');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Globe />
        {t('language.label')}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {locales.map(({ code, flag }) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLocaleChange(code)}
              disabled={isPending || locale === code}
            >
              {flag} {t(`language.${code}`)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
