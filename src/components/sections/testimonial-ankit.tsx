"use client";
import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { BlurText } from '../ui/blur-text';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from 'framer-motion';

const TestimonialAnkit = () => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { amount: 0.3, margin: '0px 0px -10% 0px' });
  const [played, setPlayed] = React.useState(false);
  React.useEffect(() => {
    if (inView && !played) setPlayed(true);
  }, [inView, played]);

  const show = prefersReducedMotion ? 'show' : played ? 'show' : 'hidden';
  const initial = prefersReducedMotion ? 'show' : 'hidden';

  const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } } as const;
  const imageVariant = {
    hidden: { y: 40, rotate: -2, opacity: 0 },
    show: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  } as const;
  const contentVariant = {
    hidden: { y: 32, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 } },
  } as const;
  const sweepVariant = {
    hidden: { x: '-140%' },
    show: { x: '140%', transition: { duration: 1.2, ease: 'easeInOut' } },
  } as const;
  const iconVariant = {
    hidden: { scale: 0.85, rotate: -6, opacity: 0 },
    show: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const { t } = useI18n();

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-10">
        <LazyMotion features={domAnimation}>
          <m.div
            ref={cardRef}
            className="relative bg-[#E6FAF6] rounded-[20px] p-8 md:p-12 overflow-hidden"
            variants={containerVariants}
            initial={initial}
            animate={show}
          >
            {/* gradient sweep effect (one-time) */}
            <m.div
              className="pointer-events-none absolute -inset-y-6 left-0 w-2/5 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70 blur-[2px] skew-x-12 mix-blend-screen"
              variants={sweepVariant}
              style={{ willChange: 'transform' }}
            />
            <div className="lg:flex lg:items-center lg:gap-x-20">
              <m.div
                className="relative mx-auto lg:mx-0 w-full max-w-[320px] h-[320px] flex-shrink-0 mb-8 lg:mb-0 rounded-[20px] overflow-hidden"
                variants={imageVariant}
                style={{ willChange: 'transform' }}
              >
              <Image
                src="/images/limankusbakisi.jpg"
                alt={t('testimonial.ankit.image-alt')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-[30px] right-0">
                <p className="text-white text-2xl font-bold leading-7">{t('testimonial.ankit.label')}</p>
              </div>
              </m.div>

              <m.div className="flex-grow text-center lg:text-left" variants={contentVariant} style={{ willChange: 'transform' }}>
              <m.div variants={iconVariant} style={{ willChange: 'transform' }}>
                <Quote 
                  className="text-[#259c84] h-12 w-[60px] mb-[30px] mx-auto lg:mx-0"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </m.div>
              <blockquote className="text-[#1E2B47] text-[32px] font-medium leading-[48px] mb-8">
                <BlurText
                  text={t('testimonial.ankit.quote')}
                  className="inline-block leading-12 text-left"
                  delay={0}
                  duration={0.25}
                  stagger={0.02}
                  translateY={6}
                  blur={4}
                  triggerOnView
                  once={false}
                />
              </blockquote>
              <a 
                href="https://opencontainer.co/explore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-[#259c84] font-semibold py-[10px] px-5 border-2 border-[#CBEDE6] rounded-lg bg-transparent hover:bg-white/30 transition-colors"
              >
                {t('testimonial.ankit.cta')}
              </a>
              </m.div>
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default TestimonialAnkit;