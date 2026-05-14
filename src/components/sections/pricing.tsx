"use client";
import React from "react";
import { Check, UserRound, Store, Star } from "lucide-react";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from "framer-motion";
import apiClient from "@/lib/axios-client";
import { useI18n } from "@/lib/i18n/I18nProvider";

type PlanSlot = "bronze" | "silver" | "gold";

type ApiSubscriptionPlan = {
  slug?: string;
  name?: string;
  description?: string | null;
  price?: number | string;
  currency?: string;
  pricing_summary?: string | ApiPriceSummary[];
  priçing_summary?: ApiPriceSummary[];
  features?: Array<string | ApiFeature>;
  is_popular?: boolean;
  badge_text?: string | null;
  sort_order?: number;
};

type ApiPriceSummary = {
  formatted_price?: string;
  is_default?: boolean;
};

type ApiFeature = {
  name?: string;
  is_active?: boolean;
};

type PlanContent = {
  slug: string;
  name: string;
  tag: string;
  price: string;
  desc: string;
  buyerBadge: string;
  sellerBadge?: string;
  recommended?: string;
  features: string[];
  buyLabel: string;
};

const PLAN_SLOTS: PlanSlot[] = ["bronze", "silver", "gold"];

const EN_PLAN_NAME_MAP: Record<string, string> = {
  Bronz: "Bronze Plan",
  "Gümüş": "Silver Plan",
  Altın: "Gold Plan",
};

const EN_PLAN_DESCRIPTION_MAP: Record<string, string> = {
  "Bireysel kullanıcılar ve küçük çaplı işletmeler için ideal başlangıç paketi.": "Ideal starter package for individual users and small businesses.",
  "KOBİ'ler ve düzenli kiralama yapan kullanıcılar için geliştirilmiş çözüm.": "Enhanced solution for SMEs and regular leasing users.",
  "Büyük ölçekli işletmeler, bayiler ve profesyonel satıcılar için kapsamlı çözüm.": "Comprehensive solution for large enterprises, dealers and professional sellers.",
};

const EN_PLAN_FEATURE_MAP: Record<string, string> = {
  "Temel konteyner bilgilerini görme": "View basic container information",
  "Satıcı hakkında bilgilerine erişim": "Access seller details",
  "Konteyner ilanı oluşturma": "Create container listings",
  "Bronz paketindeki tüm özellikler": "All features in Bronze",
  "Aylık 15 konteyner ilanı oluşturma": "Create 15 container listings per month",
  "Faturalandırma entegrasyonu": "Billing integration",
  "Gümüş paketindeki tüm özellikler": "All features in Silver",
  "Sınırsız konteyner ilanı": "Unlimited container listings",
  "Özel destek ve danışmanlık hizmetleri": "Dedicated support and consulting services",
};

const normalizePlans = (payload: unknown): ApiSubscriptionPlan[] => {
  if (Array.isArray(payload)) {
    return payload as ApiSubscriptionPlan[];
  }

  if (payload && typeof payload === "object") {
    const response = payload as {
      data?: ApiSubscriptionPlan[] | { subscription_plans?: ApiSubscriptionPlan[] };
    };

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data?.subscription_plans)) {
      return response.data.subscription_plans;
    }
  }

  return [];
};

const formatPlanPrice = (plan?: ApiSubscriptionPlan) => {
  if (!plan) {
    return "";
  }

  const pricingSummaryList = Array.isArray(plan.pricing_summary)
    ? plan.pricing_summary
    : Array.isArray(plan.priçing_summary)
      ? plan.priçing_summary
      : [];

  const defaultPrice = pricingSummaryList.find((item) => item.is_default) ?? pricingSummaryList[0];

  if (typeof defaultPrice?.formatted_price === "string" && defaultPrice.formatted_price.trim()) {
    return defaultPrice.formatted_price.trim();
  }

  if (typeof plan.pricing_summary === "string" && plan.pricing_summary.trim()) {
    return plan.pricing_summary.trim();
  }

  if (typeof plan.price === "string" && plan.price.trim()) {
    const numericPrice = Number(plan.price);

    if (!Number.isNaN(numericPrice) && typeof plan.currency === "string") {
      try {
        return new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: plan.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(numericPrice);
      } catch {
        return `${plan.currency} ${plan.price}`;
      }
    }

    return plan.price.trim();
  }

  if (typeof plan.price === "number" && typeof plan.currency === "string") {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: plan.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(plan.price);
    } catch {
      return `${plan.currency} ${plan.price.toFixed(2)}`;
    }
  }

  return "";
};

const normalizeFeatureList = (features?: Array<string | ApiFeature>) => {
  if (!Array.isArray(features)) {
    return [];
  }

  return features
    .map((feature) => {
      if (typeof feature === "string") {
        return feature;
      }

      if (feature && typeof feature.name === "string") {
        return feature.name;
      }

      return "";
    })
    .filter((feature): feature is string => Boolean(feature));
};

const translateApiText = (
  value: string | undefined,
  locale: string,
  map: Record<string, string>,
  fallback: string,
) => {
  if (!value) {
    return fallback;
  }

  if (locale === "en") {
    return map[value] || fallback;
  }

  return value;
};

const translateApiFeatures = (
  features: string[],
  locale: string,
  fallback: string[],
) => {
  if (features.length === 0) {
    return fallback;
  }

  if (locale === "en") {
    return features.map((feature, index) => EN_PLAN_FEATURE_MAP[feature] || fallback[index] || feature);
  }

  return features;
};

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

  const { locale, t } = useI18n();

  const [apiPlans, setApiPlans] = React.useState<ApiSubscriptionPlan[]>([]);

  React.useEffect(() => {
    let isMounted = true;

    const fetchPlans = async () => {
      try {
        const requestUrl = new URL("/api/subscription-plans", window.location.origin).toString();
        const response = await apiClient.get(requestUrl);
        const plans = normalizePlans(response.data)
          .sort((first, second) => (first.sort_order ?? Number.MAX_SAFE_INTEGER) - (second.sort_order ?? Number.MAX_SAFE_INTEGER));

        if (isMounted) {
          setApiPlans(plans);
        }
      } catch {
        if (isMounted) {
          setApiPlans([]);
        }
      }
    };

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const getFeatures = (slot: PlanSlot) => {
    const rawValue = t(`pricing.plans.${slot}.features`);
    return Array.isArray(rawValue) ? rawValue : [rawValue];
  };

  const fallbackPlans: Record<PlanSlot, PlanContent> = {
    bronze: {
      slug: "bronze",
      name: t("pricing.plans.bronze.name"),
      tag: t("pricing.plans.bronze.tag"),
      price: t("pricing.plans.bronze.price"),
      desc: t("pricing.plans.bronze.desc"),
      buyerBadge: t("pricing.plans.bronze.badge-buyer"),
      features: getFeatures("bronze"),
      buyLabel: t("pricing.plans.buy"),
    },
    silver: {
      slug: "silver",
      name: t("pricing.plans.silver.name"),
      tag: t("pricing.plans.silver.tag"),
      price: t("pricing.plans.silver.price"),
      desc: t("pricing.plans.silver.desc"),
      buyerBadge: t("pricing.plans.silver.badge-buyer"),
      sellerBadge: t("pricing.plans.silver.badge-seller"),
      recommended: t("pricing.plans.silver.recommended"),
      features: getFeatures("silver"),
      buyLabel: t("pricing.plans.buy"),
    },
    gold: {
      slug: "gold",
      name: t("pricing.plans.gold.name"),
      tag: t("pricing.plans.gold.tag"),
      price: t("pricing.plans.gold.price"),
      desc: t("pricing.plans.gold.desc"),
      buyerBadge: t("pricing.plans.gold.badge-buyer"),
      sellerBadge: t("pricing.plans.gold.badge-seller"),
      features: getFeatures("gold"),
      buyLabel: t("pricing.plans.buy"),
    },
  };

  const resolvedPlans = PLAN_SLOTS.reduce<Record<PlanSlot, PlanContent>>((accumulator, slot, index) => {
    const fallbackPlan = fallbackPlans[slot];
    const apiPlan = apiPlans.find((plan) => plan.slug?.toLowerCase() === slot) ?? apiPlans[index];
    const apiFeatures = normalizeFeatureList(apiPlan?.features);

    accumulator[slot] = {
      ...fallbackPlan,
      slug: apiPlan?.slug || fallbackPlan.slug,
      name: translateApiText(apiPlan?.name, locale, EN_PLAN_NAME_MAP, fallbackPlan.name),
      price: formatPlanPrice(apiPlan) || fallbackPlan.price,
      desc: translateApiText(apiPlan?.description?.trim(), locale, EN_PLAN_DESCRIPTION_MAP, fallbackPlan.desc),
      features: translateApiFeatures(apiFeatures, locale, fallbackPlan.features),
      recommended: slot === "silver"
        ? apiPlan?.is_popular
          ? apiPlan.badge_text || fallbackPlan.recommended
          : fallbackPlan.recommended
        : undefined,
    };

    return accumulator;
  }, {} as Record<PlanSlot, PlanContent>);

  const bronzePlan = resolvedPlans.bronze;
  const silverPlan = resolvedPlans.silver;
  const goldPlan = resolvedPlans.gold;

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
                <div className="text-5xl font-bold text-neutral-900">{bronzePlan.price}</div>
                <div className="mt-4 text-2xl font-semibold text-neutral-900">{bronzePlan.name}</div>
                <div className="mt-1 text-sm text-neutral-500">{bronzePlan.tag}</div>
                <p className="mt-6 text-base text-neutral-600">
                  {bronzePlan.desc}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-semibold text-[#259c84]">
                    <UserRound className="h-4 w-4" /> {bronzePlan.buyerBadge}
                  </span>
                </div>
                <Link target="_blank" href="https://opencontainer.co/pricing" className="cursor-pointer mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-black">
                  {bronzePlan.buyLabel}
                </Link>
              </div>
              <ul className="mt-8 space-y-4">
                {bronzePlan.features.map((item) => (
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
              {silverPlan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="relative inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900 shadow-md ring-2 ring-yellow-300">
                    <Star className="h-4 w-4" />
                    <span>{silverPlan.recommended}</span>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0 w-0 border-x-6 border-x-transparent border-t-6 border-t-yellow-400"
                    />
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-5xl font-bold text-white">{silverPlan.price}</div>
                <div className="mt-4 text-2xl font-semibold text-white">{silverPlan.name}</div>
                <div className="mt-1 text-sm text-white/80">{silverPlan.tag}</div>
                <p className="mt-6 text-base text-white/90">
                  {silverPlan.desc}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <UserRound className="h-4 w-4" /> {silverPlan.buyerBadge}
                  </span>
                  {silverPlan.sellerBadge && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                      <Store className="h-4 w-4" /> {silverPlan.sellerBadge}
                    </span>
                  )}
                </div>
                <Link target="_blank" href="https://opencontainer.co/pricing" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold tracking-wide text-[#259c84] transition-colors hover:bg-white/95">
                  {silverPlan.buyLabel}
                </Link>
              </div>
              <ul className="mt-8 space-y-4">
                {silverPlan.features.map((item) => (
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
                <div className="text-5xl font-bold text-neutral-900">{goldPlan.price}</div>
                <div className="mt-4 text-2xl font-semibold text-neutral-900">{goldPlan.name}</div>
                <div className="mt-1 text-sm text-neutral-500">{goldPlan.tag}</div>
                <p className="mt-6 text-base text-neutral-600">
                  {goldPlan.desc}
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-semibold text-[#259c84]">
                    <UserRound className="h-4 w-4" /> {goldPlan.buyerBadge}
                  </span>
                  {goldPlan.sellerBadge && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f6f2] px-3 py-1 text-xs font-semibold text-[#259c84]">
                      <Store className="h-4 w-4" /> {goldPlan.sellerBadge}
                    </span>
                  )}
                </div>
                <Link target="_blank" href="https://opencontainer.co/pricing" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-black">
                  {goldPlan.buyLabel}
                </Link>
              </div>
              <ul className="mt-8 space-y-4">
                {goldPlan.features.map((item) => (
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