export const locales = ["en", "tr"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "en";

export const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("../../../locales/en/common.json").then(m => m.default),
  tr: () => import("../../../locales/tr/common.json").then(m => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
