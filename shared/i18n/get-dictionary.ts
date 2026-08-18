import "server-only";

import type { Locale } from "./config";

const dictionaries = {
  ko: () => import("@/messages/ko.json").then((module) => module.default),
  ja: () => import("@/messages/ja.json").then((module) => module.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export type Dictionary = typeof import("@/messages/ko.json");

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
