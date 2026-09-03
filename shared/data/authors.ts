import type { Locale } from "@/shared/i18n/config";

export type Author = {
  id: string;
  name: Record<Locale, string>;
};

export const authors: Author[] = [
  {
    id: "anonymous",
    name: {
      ko: "anonymous",
      ja: "anonymous",
    },
  },
];

export function resolveAuthors(ids: string[], locale: Locale): string[] {
  return ids.map((id) => {
    const author = authors.find((item) => item.id === id);
    return author?.name[locale] ?? id;
  });
}

