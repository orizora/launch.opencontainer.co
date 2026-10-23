import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { defaultLocale, getDictionary } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: "OpenContainer - Konteyner Ticareti, Kiralama ve Navlun Yönetimi",
  description: "OpenContainer, konteyner ticareti, kiralama ve navlun yönetimini tek ekranda buluşturan dijital pazar yeridir.",
  icons: {
    icon: '/logo/svg/open-container-1.svg',
    apple: '/logo/open-container.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dict = await getDictionary(defaultLocale);
  return (
    <html lang={defaultLocale}>
      <body className="antialiased">
        <ErrorReporter />
        <I18nProvider locale={defaultLocale} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
