"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TextType from "@/components/ui/text-type";
import BlurText from "@/components/ui/blur-text";
import ShinyText from '../ui/ShinyText';
import { useI18n } from '@/lib/i18n/I18nProvider';

const HeroSection = () => {
  const { t } = useI18n();
  const [imgLoaded, setImgLoaded] = React.useState(false);

  const floatingBalls = [
    { id: 1, color: '#ef4444', size: 20, initialX: '5%', initialY: '35%', zIndex: 5 }, // sol yan kırmızı
    { id: 2, color: '#22c55e', size: 16, initialX: '92%', initialY: '40%', zIndex: 5 }, // sağ yan yeşil
    { id: 3, color: '#8b5cf6', size: 24, initialX: '8%', initialY: '60%', zIndex: 5 }, // sol alt mor
    { id: 4, color: '#f97316', size: 18, initialX: '88%', initialY: '65%', zIndex: 5 }, // sağ alt turuncu
    { id: 5, color: '#06b6d4', size: 14, initialX: '15%', initialY: '5%', zIndex: 5 }, // sol üst cyan
    { id: 6, color: '#10b981', size: 22, initialX: '85%', initialY: '8%', zIndex: 5 }, // sağ üst emerald
    
    { id: 7, color: '#f59e0b', size: 12, initialX: '25%', initialY: '12%', zIndex: 5 }, // üst sol amber
    { id: 8, color: '#ec4899', size: 18, initialX: '75%', initialY: '15%', zIndex: 5 }, // üst sağ pink
    { id: 9, color: '#06b6d4', size: 15, initialX: '30%', initialY: '8%', zIndex: 5 }, // üst cyan
    { id: 10, color: '#84cc16', size: 20, initialX: '70%', initialY: '10%', zIndex: 5 }, // üst lime
    { id: 11, color: '#8b5cf6', size: 14, initialX: '20%', initialY: '18%', zIndex: 5 }, // üst yan violet
    { id: 12, color: '#ef4444', size: 16, initialX: '80%', initialY: '22%', zIndex: 5 }, // üst yan red
  ];

  return (
    <section className="relative bg-brand-light-gray overflow-hidden">
      {/* Noktalı zemin pattern */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Yeşil blob sağ üst köşede */}
      <div className="absolute top-20 right-0 w-56 h-56 opacity-20">
        <div 
          className="w-full h-full bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-xl transform translate-x-1/3 -translate-y-1/3"
          style={{
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          }}
        />
      </div>

      {/* Yeşil blob sol alt köşede */}
      <div className="absolute top-60 left-0 w-56 h-56 opacity-20">
        <div 
          className="w-full h-full bg-gradient-to-tr from-emerald-400 to-green-500 rounded-full blur-xl transform -translate-x-1/3 translate-y-1/3"
          style={{
            borderRadius: '30% 70% 60% 40% / 70% 60% 40% 30%',
          }}
        />
      </div>

      {/* Animasyonlu renkli toplar */}
      {floatingBalls.map((ball) => (
        <motion.div
          key={ball.id}
          className="absolute rounded-full"
          style={{
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            left: ball.initialX,
            top: ball.initialY,
            zIndex: ball.zIndex,
          }}
          animate={{
            x: [0, 40, -30, 50, -20, 0],
            y: [0, -35, 45, -25, 30, 0],
            scale: [1, 1.3, 0.7, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 10 + ball.id * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ball.id * 0.2,
          }}
        />
      ))}

      <div className="container mx-auto px-10 pt-20 pb-16 lg:pt-[126px] lg:pb-24 relative z-10">
        <div className="flex flex-col items-center text-center">
      <h1 className="hero-heading relative flex flex-col justify-center text-[48px] md:text-[80px] lg:text-[96px] font-bold text-brand-dark-navy leading-none -tracking-[0.03em] h-[132px] md:h-[165px] lg:h-[198px] break-words">
            <span className="relative inline-block">
              <span className="absolute -inset-x-2 -inset-y-0 sm:-inset-y-1 bg-[#CBEDE6] rounded-lg z-0" />
              <span className="relative z-10 inline-flex items-end">
                <TextType
                  words={[
                    t("hero.title-1"),
                    t("hero.title-2"),
                    t("hero.title-3"),
                    t("hero.title-4"),
                  ]}
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseAfterTyped={800}
                  pauseBeforeNext={100}
                  caret
                  caretClassName="bg-brand-dark-navy"
                />
              </span>
            </span>
          </h1>

          <p className="mt-4 lg:mt-6 text-xl text-brand-medium-gray max-w-[850px] mx-auto leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="mt-10 lg:mt-12 flex flex-col items-center space-y-4">
            <a
              href="https://opencontainer.co"
              title={t("hero.one-month-free")}
              target='_blank'
              className="btn-sweep bg-[#259c84] text-white font-medium text-base rounded-[8px] px-6 py-3.5 flex items-center gap-2.5 transition-all shadow-[0_4px_14px_0_rgba(37,156,132,0.25)] hover:shadow-[0_6px_20px_0_rgba(37,156,132,0.3)] transform hover:scale-[1.02] cursor-pointer">
              <ShinyText
                text="hero.one-month-free"
                disabled={false}
                speed={3}
                className='custom-class text-white font-medium text-base'
              />
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-brand-medium-gray font-medium tracking-wide">
              {t("hero.btn-desc")}
            </p>
          </div>

          <motion.div
            className="mt-16 lg:mt-[70px] relative w-full max-w-[1070px] mx-auto"
            initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(10px)" }}
            animate={imgLoaded ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Ekran%20Resmi%202025-09-18%2021.35.12-1758220604863.png"
              alt="OpenContainer"
              width={1070}
              height={700}
              className="rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] w-full h-auto"
              priority
              onLoadingComplete={() => setImgLoaded(true)}
            />
          </motion.div>
        </div>
      </div>
    </section>);

};

export default HeroSection;