"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BlurText } from "../ui/blur-text";
import { Button } from "../ui/button";
import { useI18n } from "@/lib/i18n/I18nProvider";

const Step1Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="60" height="60" rx="12" className="fill-[#CBEDE6]" />
    <path d="M37.3333 42.6667H22.6667C21.929 42.6667 21.3333 42.071 21.3333 41.3333V25.3333C21.3333 24.5956 21.929 24 22.6667 24H37.3333C38.071 24 38.6667 24.5956 38.6667 25.3333V41.3333C38.6667 42.071 38.071 42.6667 37.3333 42.6667Z" stroke="#259c84" strokeWidth="2" strokeLinejoin="round" />
    <path d="M21.3333 30.6667H38.6667" stroke="#259c84" strokeWidth="2" strokeLinejoin="round" />
    <path d="M30 42.6667V30.6667" stroke="#259c84" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const Step2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="60" height="60" rx="12" className="fill-[#CBEDE6]" />
    <g>
      <path d="M33.5293 33.5294L39 39" stroke="#259c84" strokeWidth="2" strokeLinecap="round" />
      <path d="M31.2941 36.5882C34.9036 36.5882 37.8235 33.6683 37.8235 30.0588C37.8235 26.4493 34.9036 23.5294 31.2941 23.5294C27.6846 23.5294 24.7646 26.4493 24.7646 30.0588C24.7646 33.6683 27.6846 36.5882 31.2941 36.5882Z" stroke="#259c84" strokeWidth="2" />
    </g>
  </svg>
);

const Step3Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="60" height="60" rx="12" className="fill-[#CBEDE6]" />
    <g>
      <path d="M38 25H22C21.4477 25 21 25.4477 21 26V37C21 37.5523 21.4477 38 22 38H38C38.5523 38 39 37.5523 39 37V26C39 25.4477 38.5523 25 38 25Z" stroke="#259c84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39 26L30 32L21 26" stroke="#259c84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const Step4Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="60" height="60" rx="12" className="fill-[#CBEDE6]" />
    <path d="M30 25L28.5303 26.4697C28.2374 26.7626 28.2374 27.2374 28.5303 27.5303L30 29" stroke="#259c84" strokeWidth="2" strokeLinecap="round" />
    <path d="M33 22L31.5303 23.4697C31.2374 23.7626 31.2374 24.2374 31.5303 24.5303L33 26" stroke="#259c84" strokeWidth="2" strokeLinecap="round" />
    <path d="M27 22L25.5303 23.4697C25.2374 23.7626 25.2374 24.2374 25.5303 24.5303L27 26" stroke="#259c84" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 35L28.5303 36.4697C28.2374 36.7626 28.2374 37.2374 28.5303 37.5303L30 39" stroke="#259c84" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Static assets & icon mapping for steps; textual content now comes from i18n
const stepsData = [
  { image: "/images/web-page.png", icon: Step1Icon, hrefs: { primary: "https://opencontainer.co", secondary: "https://panel.opencontainer.co/tr" } },
  { image: "/images/panel.png", icon: Step2Icon, hrefs: { primary: "https://opencontainer.co/rentals", secondary: "https://opencontainer.co/pricing" } },
  { image: "/images/129003.jpg", icon: Step3Icon, hrefs: { primary: "https://opencontainer.co/freight/listings", secondary: "https://opencontainer.co/freight/shipping-lines" } },
  { image: "/images/panel-offer.png", icon: Step4Icon, hrefs: { primary: "https://opencontainer.co/sign-up", secondary: "https://opencontainer.co" } },
] as const;

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
            if (index > -1) {
              setActiveStep(index);
            }
          }
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    const currentRefs = stepRefs.current.filter(ref => ref !== null);
    currentRefs.forEach(ref => observer.observe(ref!));

    return () => {
      currentRefs.forEach(ref => observer.unobserve(ref!));
    };
  }, []);

  const { t } = useI18n();

  return (
    <section className="py-20 lg:py-24">
      <div className="container max-w-[1200px] mx-auto px-10">
        <div className="text-center mb-12 lg:mb-24">
          <h2 className="text-[46px] font-bold text-brand-dark-navy leading-tight">
            <BlurText
              text={t("how-it-works.heading")}
              className="inline-block"
              delay={0.5}
              duration={0.6}
              stagger={0.04}
              translateY={12}
              blur={8}
            />
          </h2>
          <p className="text-md text-brand-medium-gray mt-4 max-w-xxl px-3 mx-auto">
            {t("how-it-works.description")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-24 relative">
          <div className="lg:w-1/2 ">
            <div className="lg:sticky lg:top-[calc(50vh-300px)] h-[320px] sm:h-[480px] lg:h-[600px] w-full rounded-2xl overflow-hidden mb-12 lg:mb-0 relative">
              {stepsData.map((step, index) => (
                // Potential future video support remains intact
                (step as any).video ? (
                  <video
                    key={`v-${index}`}
                    className={cn(
                      "absolute inset-0 rounded-lg w-full h-full object-cover transition-opacity duration-300",
                      activeStep === index ? "opacity-100 z-10" : "opacity-0"
                    )}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={(step as any).poster || undefined}
                  >
                    <source src={(step as any).video.webm} type="video/webm" />
                    <source src={(step as any).video.mp4} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    key={`i-${index}`}
                    alt={`${t(`how-it-works.steps.${index}.title-1`)} ${t(`how-it-works.steps.${index}.title-2`)}`}
                    src={step.image || "/vercel.svg"}
                    className={cn(
                      "absolute inset-0 w-full h-96 rounded-lg object-contain transition-opacity duration-300",
                      activeStep === index ? "opacity-100 z-10" : "opacity-0"
                    )}
                  />
                )
              ))}
            </div>
          </div>

          <ul className="lg:w-1/2 flex flex-col space-y-24 lg:space-y-48">
            {stepsData.map((step, index) => (
              <li
                key={index}
                // @ts-ignore
                ref={el => (stepRefs.current[index] = el)}
                className="flex gap-x-6 items-start"
              >
                <div className="flex-shrink-0 mt-1">
                  <step.icon className={cn('transition-opacity duration-300', activeStep >= index ? 'opacity-100' : 'opacity-40')} />
                </div>
                <div className={cn('transition-opacity duration-300', activeStep >= index ? 'opacity-100' : 'opacity-40')}>
                  <h3 className="text-[32px] font-bold text-brand-dark-navy leading-tight">
                    {activeStep === index ? (
                      <span className="inline-block">
                        <BlurText text={t(`how-it-works.steps.${index}.title-1`)} delay={0.1} duration={0.5} stagger={0.03} translateY={8} blur={6} />
                        <br />
                        <BlurText text={t(`how-it-works.steps.${index}.title-2`)} delay={0.25} duration={0.5} stagger={0.03} translateY={8} blur={6} />
                      </span>
                    ) : (
                      <span className="inline-block">
                        {t(`how-it-works.steps.${index}.title-1`)}<br />{t(`how-it-works.steps.${index}.title-2`)}
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-lg text-brand-medium-gray">
                    {t(`how-it-works.steps.${index}.desc`)}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      asChild
                      variant={"brand" as any}
                      size="lg"
                    >
                      <a href={step.hrefs.primary} target="_blank" rel="noopener noreferrer">{t(`how-it-works.steps.${index}.cta-primary`)}</a>
                    </Button>
                    <Button
                      asChild
                      variant={"brandOutline" as any}
                      size="lg"
                    >
                      <a href={step.hrefs.secondary} target="_blank" rel="noopener noreferrer">{t(`how-it-works.steps.${index}.cta-secondary`)}</a>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;