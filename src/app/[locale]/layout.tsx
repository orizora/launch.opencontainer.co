import type { ReactNode } from 'react';
import { getDictionary } from '@/lib/i18n/config';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/config';

export async function generateStaticParams() {
  return locales.map(l => ({ locale: l }));
}

export const dynamicParams = false;
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const resolved = await params;
  const locale = locales.includes(resolved.locale) ? resolved.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return (
    <I18nProvider locale={locale} dict={dict}>
      {children}
    </I18nProvider>
  );
}
