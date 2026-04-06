"use client";
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';

const LOCALES = ["en", "tr"] as const;
const DEFAULT_LOCALE = "en" as const;

type Locale = typeof LOCALES[number];

interface LanguageSwitcherProps {
  variant?: 'inline' | 'nav';
  className?: string;
}

function extractLocale(pathname: string): { locale: Locale; rest: string } {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
    const [, ...rest] = segments;
    return { locale: segments[0] as Locale, rest: '/' + rest.join('/') };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname === '/' ? '' : pathname };
}

const SCROLL_STORAGE_KEY = '__oc_locale_prev_scroll';

export default function LanguageSwitcher({ variant = 'inline', className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [current, setCurrent] = useState<Locale>(DEFAULT_LOCALE);
  const restoringRef = useRef(false);

  useEffect(() => {
    if (!pathname) return;
    const { locale } = extractLocale(pathname);
    setCurrent(locale);
  }, [pathname]);

  const switchLocale = useCallback((next: Locale) => {
    if (next === current) return;
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const { rest } = extractLocale(pathname || '/');
    const newPath = `/${next}${rest}${hash}`.replace(/\/$/, '');

    // Store current scroll position for restoration after navigation
    try {
      sessionStorage.setItem(SCROLL_STORAGE_KEY, String(window.scrollY));
    } catch {}

    // Persist preference similar to pages router behaviour
    try {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`; // 1 year
    } catch {}

    // Navigate without automatic scroll reset
    router.push(newPath, { scroll: false });
    // No router.refresh(): path change + locale segment already triggers data fetch
  }, [current, pathname, router]);

  // Restore scroll after locale navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (restoringRef.current) return;
    try {
      const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);
      if (stored) {
        const target = parseInt(stored, 10);
        restoringRef.current = true;
        // Try a few frames to mitigate layout shifts due to newly loaded translations
        let attempts = 0;
        const maxAttempts = 10;
        const restore = () => {
          window.scrollTo({ top: target, behavior: 'auto' });
          attempts += 1;
          if (attempts < maxAttempts) {
            requestAnimationFrame(restore);
          } else {
            restoringRef.current = false;
            try { sessionStorage.removeItem(SCROLL_STORAGE_KEY); } catch {}
          }
        };
        requestAnimationFrame(restore);
      }
    } catch {}
  }, [pathname]);

  return (
    <div className={`flex items-center gap-2 text-sm text-neutral-700 ${className}`}>      
      <Globe className="h-4 w-4" />
      <select
        aria-label={current === 'tr' ? 'Dil Seçimi' : 'Language Selection'}
        className="bg-transparent outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 rounded-md"
        value={current}
        onChange={(e) => switchLocale(e.target.value as Locale)}
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
}
