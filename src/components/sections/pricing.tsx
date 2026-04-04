"use client";
import React from "react";
import { Check, UserRound, Store, Star } from "lucide-react";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nProvider";

export const PricingSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { amount: 0.25, margin: "0px 0px -20% 0px" });
  const [hasPlayed, setHasPlayed] = React.useState(false);
  React.useEffect(() => {
    if (isInView && !hasPlayed) setHasPlayed(true);
  }, [isInView, hasPlayed]);
  const animateState = prefersReducedMotion ? "show" : hasPlayed ? "show" : "hidden";
  const initialState = prefersReducedMotion ? "show" : "hidden";

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  } as const;

  const leftVariant = {
    hidden: { x: -56, y: 12 },
    show: {
      x: 0,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const centerVariant = {
    hidden: { y: 56, scale: 0.98 },
    show: {
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const rightVariant = {
    hidden: { x: 56, y: 12 },
    show: {
      x: 0,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const { t } = useI18n();

  // Fetch feature arrays safely (i18n returns raw value—can be array or string fallback)
  const bronzeFeaturesRaw = t('pricing.plans.bronze.features');
  const silverFeaturesRaw = t('pricing.plans.silver.features');
  const goldFeaturesRaw = t('pricing.plans.gold.features');

  const bronzeFeatures = Array.isArray(bronzeFeaturesRaw) ? bronzeFeaturesRaw : [bronzeFeaturesRaw];
  const silverFeatures = Array.isArray(silverFeaturesRaw) ? silverFeaturesRaw : [silverFeaturesRaw];
  const goldFeatures = Array.isArray(goldFeaturesRaw) ? goldFeaturesRaw : [goldFeaturesRaw];

  return (
    <section className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-8xl">
          <LazyMotion features={domAnimation}>
            <m.div
              className="grid grid-cols-1 gap-12 md:grid-cols-3"
              variants={containerVariants}
              initial={initialState}
              animate={animateState}
              ref={containerRef}
            >
              {/* Card 1 - Bronze */}
              <m.div 
                className="rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm transform motion-safe:transition motion-safe:duration-300 motion-safe:ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
                variants={leftVariant}
                style={{ willChange: "transform" }}
              >
              <div className="text-center">
                <div className="text-5xl font-bold text-neutral-900">{t('pricing.plans.bronze.price')}</div>
                <div className="mt-4 text-2xl font-semibold text-neutral-900">{t('pricing.plans.bronze.name')}</div>
                <div className="mt-1 text-sm text-neutral-500">{t('pricing.plans.bronze.tag')}</div>
                <p className="mt-6 text-base text-neutral-600">
                  {t('pricing.plans.bronze.desc')}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-semibold text-[#259c84]">
                    <UserRound className="h-4 w-4" /> {t('pricing.plans.bronze.badge-buyer')}
                  </span>
                </div>
                <Link target="_blank" href="https://opencontainer.co/pricing" className="cursor-pointer mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-black">
                  {t('pricing.plans.buy')}
                </Link>
              </div>
              <ul className="mt-8 space-y-4">
                {bronzeFeatures.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-700">
                    <span className="mt-1 rounded-full bg-[#e8f6f2] p-1 text-[#259c84]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              </m.div>

              {/* Card 2 - Silver (featured) */}
              <m.div 
                className="relative rounded-[28px] bg-[#259c84] p-8 shadow-lg transform origin-center motion-safe:transition motion-safe:duration-300 motion-safe:ease-out md:scale-[1.05] hover:-translate-y-1 hover:scale-[1.07] hover:shadow-2xl md:-mx-[10px] md:z-20 overflow-visible"
                variants={centerVariant}
                style={{ willChange: "transform" }}
              >
              {/* Önerilen Rozet */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="relative inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900 shadow-md ring-2 ring-yellow-300">
                  <Star className="h-4 w-4" />
                  <span>{t('pricing.plans.silver.recommended')}</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0 w-0 border-x-6 border-x-transparent border-t-6 border-t-yellow-400"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white">{t('pricing.plans.silver.price')}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{t('pricing.plans.silver.name')}</div>
                <div className="mt-1 text-sm text-white/80">{t('pricing.plans.silver.tag')}</div>
                <p className="mt-6 text-base text-white/90">
                  {t('pricing.plans.silver.desc')}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <UserRound className="h-4 w-4" /> {t('pricing.plans.silver.badge-buyer')}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <Store className="h-4 w-4" /> {t('pricing.plans.silver.badge-seller')}
                  </span>
                </div>
                <Link target="_blank" href="https://opencontainer.co/pricing" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold tracking-wide text-[#259c84] transition-colors hover:bg-white/95">
                  {t('pricing.plans.buy')}
                </Link>
              </div>
              <ul className="mt-8 space-y-4">
                {silverFeatures.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <span className="mt-1 rounded-full bg-white/20 p-1 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              {/* Rounded bottom like the reference */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-[28px]" />
            </m.div>

              {/* Card 3 - Gold */}
              <m.div 
                className="rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm transform motion-safe:transition motion-safe:duration-300 motion-safe:ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
                variants={rightVariant}
                style={{ willChange: "transform" }}
              >
              <div className="text-center">
                <div className="text-5xl font-bold text-neutral-900">{t('pricing.plans.gold.price')}</div>
                <div className="mt-4 text-2xl font-semibold text-neutral-900">{t('pricing.plans.gold.name')}</div>
                <div className="mt-1 text-sm text-neutral-500">{t('pricing.plans.gold.tag')}</div>
                <p className="mt-6 text-base text-neutral-600">
                  {t('pricing.plans.gold.desc')}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-semibold text-[#259c84]">
                    <UserRound className="h-4 w-4" /> {t('pricing.plans.gold.badge-buyer')}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-semibold text-[#259c84]">
                    <Store className="h-4 w-4" /> {t('pricing.plans.gold.badge-seller')}
                  </span>
                </div>
                <Link target="_blank" href="https://opencontainer.co/pricing" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-black">
                  {t('pricing.plans.buy')}
                </Link>
              </div>
              <ul className="mt-8 space-y-4">
                {goldFeatures.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-700">
                    <span className="mt-1 rounded-full bg-[#e8f6f2] p-1 text-[#259c84]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>
          </LazyMotion>
        </div>
      </div>
    </section>
  );
};