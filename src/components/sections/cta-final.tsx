"use client";
import React from 'react';
import Image from 'next/image';
import { Check, ArrowRight, Store, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';

const CtaFinal = () => {
  const { t } = useI18n();
  const benefitsRaw = t('cta-final.benefits');
  const benefits = Array.isArray(benefitsRaw) ? benefitsRaw : [benefitsRaw];

  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.3, margin: '0px 0px -10% 0px' });
  const [played, setPlayed] = React.useState(false);
  React.useEffect(() => {
    if (isInView && !played) setPlayed(true);
  }, [isInView, played]);

  const showState = prefersReducedMotion ? 'show' : played ? 'show' : 'hidden';
  const initialState = prefersReducedMotion ? 'show' : 'hidden';

  const blockVariant = {
    hidden: { y: 24 },
    show: { y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const imageVariant = {
    hidden: { y: 28 },
    show: { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const circleVariant = {
    hidden: { pathLength: 0 },
    show: { pathLength: 1, transition: { duration: 1.2, ease: 'easeInOut', delay: 0.2 } },
  } as const;

  return (
    <section className="my-24" aria-labelledby="cta-final-title">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <LazyMotion features={domAnimation}>
          <div ref={sectionRef} className="bg-gradient-to-br from-[#259c84] to-[#1c7f6a] rounded-[30px] overflow-hidden">
            <div className="grid lg:grid-cols-2 items-center">
              <m.div
                className="relative py-12 px-6 sm:p-12 md:p-16 flex flex-col items-center lg:items-start text-center lg:text-left"
                variants={blockVariant}
                initial={initialState}
                animate={showState}
                style={{ willChange: 'transform' }}
              >
                <m.svg
                  viewBox="0 0 200 200"
                  width={200}
                  height={200}
                  className="pointer-events-none absolute -top-6 -right-6 sm:-top-8 sm:-right-8 opacity-40 hidden sm:block"
                  initial={initialState}
                  animate={showState}
                >
                  <m.circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    variants={circleVariant}
                  />
                  <m.circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={circleVariant}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.35 }}
                  />
                </m.svg>
              <h2 id="cta-final-title" className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                {t('cta-final.title-line-1')}
                <br />
                {t('cta-final.title-line-2')}
              </h2>
                {/* Smaller bottom-left circle */}
                <m.svg
                  viewBox="0 0 160 160"
                  width={140}
                  height={140}
                  className="pointer-events-none absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 opacity-30 hidden sm:block"
                  initial={initialState}
                  animate={showState}
                >
                  <m.circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    variants={circleVariant}
                    transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.25 }}
                  />
                  <m.circle
                    cx="80"
                    cy="80"
                    r="45"
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={circleVariant}
                    transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.4 }}
                  />
                </m.svg>
              <p className="mt-4 text-white/95 text-lg max-w-xl">
                {t('cta-final.description')}
              </p>
              <ul className="mt-8 mb-10 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-left">
                    <Check className="h-6 w-6 text-white mr-3 flex-shrink-0 mt-1" />
                    <span className="text-lg text-white">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <Link
                  href="https://opencontainer.co/explore"
                  className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#259c84] shadow-lg shadow-black/10 transition-transform duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60"
                  data-event="cta_click"
                  data-cta="buyer_primary"
                  aria-label={t('cta-final.cta-buyer')}
                >
                  {t('cta-final.cta-buyer')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="https://opencontainer.co/pricing"
                  className="cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-lg border border-white/70 bg-transparent px-8 py-4 text-base font-semibold text-white/95 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
                  data-event="cta_click"
                  data-cta="seller_secondary"
                  aria-label={t('cta-final.cta-seller')}
                >
                  <Store className="h-4 w-4" />
                  {t('cta-final.cta-seller')}
                </Link>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <ShieldCheck className="h-4 w-4" /> {t('cta-final.secure')}
                </div>
              </div>
              </m.div>

              <m.div
                className="px-4 sm:px-8 lg:px-0 justify-self-center w-full"
                variants={imageVariant}
                initial={initialState}
                animate={showState}
                style={{ willChange: 'transform' }}
              >
                <Image
                  src="/images/liman.jpg"
                  alt={t('cta-final.image-alt')}
                  width={640}
                  height={480}
                  className="w-full max-w-[640px] h-auto mx-auto rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl"
                />
              </m.div>
            </div>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default CtaFinal;