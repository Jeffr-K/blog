export const locales = ["ko", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
