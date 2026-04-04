"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import GradientText from '../ui/GradientText';
import ShinyText from '../ui/ShinyText';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { cn } from '@/lib/utils';


export default function Navigation() {
  const { locale, t } = useI18n();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY === 0);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  const navItems = [
    { label: t('nav.pricing'), href: '#pricing', rel: 'noopener noreferrer' },
    { label: t('nav.product'), href: `https://opencontainer.co`, target: '_blank', rel: 'noopener noreferrer' },
    { label: t('nav.blog'), href: `https://opencontainer.co/news`, target: '_blank', rel: 'noopener noreferrer' },
    { label: t('nav.faq'), href: `https://opencontainer.co/pricing#sss`, target: '_blank', rel: 'noopener noreferrer' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-200',
        isAtTop
          ? 'bg-transparent border-b border-transparent shadow-none'
          : 'bg-white border-b border-gray-100 shadow-sm'
      )}
    >
      <div className="container flex h-20 lg:h-24 items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} aria-label="Home" className="shrink-0">
          <div className="flex items-center">
            <Image
              src="/logo/svg/open-container-1.svg"
              alt="Site logo"
              width={48}
              height={48}
              className="h-24 w-24 lg:h-36 lg:w-36 object-contain"
              priority
            />
            <span className="sr-only">Home</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-10 xl:space-x-12">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="group inline-flex items-center"
                >
                  <GradientText className="text-lg xl:text-xl font-semibold transition-colors group-hover:opacity-90" colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} showBorder={false} animationSpeed={3}>
                    {item.label}
                  </GradientText>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-4 xl:space-x-6 lg:flex">
          <LanguageSwitcher />
          <a
            href={`https://opencontainer.co/planner`}
            target='_blank'
            rel="noopener noreferrer"
            className="btn-sweep bg-[#259c84] rounded-md px-5 py-3 flex items-center gap-2.5 transition-all shadow-[0_4px_14px_0_rgba(37,156,132,0.25)] hover:shadow-[0_6px_20px_0_rgba(37,156,132,0.3)] hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
          >
            <ShinyText
              text={t('cta.start')}
              disabled={false}
              speed={2}
              className='custom-class text-white font-medium text-sm xl:text-base'
            />
          </a>
        </div>

        {/* Mobile Menu (Drawer) */}
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <button className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-navy/50" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="p-0 w-[85%] max-w-xs bg-white border-l border-gray-100">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <Link href={`/${locale}`} aria-label="Home" className="flex items-center gap-2" onClick={() => { /* Drawer auto closes via link navigation? Provide close button anyway */ }}>
                <Image
                  src="/logo/svg/open-container-1.svg"
                  alt="Site logo"
                  width={40}
                  height={40}
                  className="h-14 w-14 object-contain"
                  priority
                />
              </Link>
              <DrawerClose asChild>
                <button aria-label="Close menu" className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-navy/50">
                  <X className="h-5 w-5" />
                </button>
              </DrawerClose>
            </div>
            <div className="px-4 pb-6 pt-4 flex flex-col h-full overflow-y-auto">
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <DrawerClose asChild>
                        <Link
                          href={item.href}
                          target={item.target}
                          rel={item.rel}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-gray-400">{t('nav.language') ?? 'Language'}</span>
                  <LanguageSwitcher />
                </div>
                <a
                  href={`https://opencontainer.co/planner`}
                  target='_blank'
                  rel="noopener noreferrer"
                  className="btn-sweep bg-[#259c84] rounded-md px-5 py-3 flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_14px_0_rgba(37,156,132,0.25)] hover:shadow-[0_6px_20px_0_rgba(37,156,132,0.3)] hover:scale-[1.02] active:scale-[0.99] cursor-pointer text-white text-sm font-medium"
                >
                  {t('cta.start')}
                </a>
                <p className="text-[10px] leading-relaxed text-gray-400 text-center">
                  {t("footer.rights")}
                </p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}