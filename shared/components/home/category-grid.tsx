import Link from "next/link";

import type { Locale } from "@/shared/i18n/config";
import type { Category } from "@/shared/data/categories";

import styles from "./category-grid.module.css";

type Props = {
  categories: Category[];
  locale: Locale;
};

export function CategoryGrid({ categories, locale }: Props) {
  return (
    <section className={styles.section} aria-label={locale === "ko" ? "카테고리" : "カテゴリー"}>
      <h2 className={styles.heading}>
        {locale === "ko" ? "카테고리" : "カテゴリー"}
      </h2>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${locale}/posts?category=${category.slug}`}
            className={styles.card}
            style={{ "--accent": category.color } as React.CSSProperties}
          >
            <div className={styles.iconWrap}>
              <CategoryIcon id={category.id} />
            </div>
            <div className={styles.body}>
              <span className={styles.name}>{category.name[locale]}</span>
              <span className={styles.desc}>{category.description[locale]}</span>
            </div>
            <span className={styles.count}>
              {category.count}
              {locale === "ko" ? "개" : "件"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryIcon({ id }: { id: string }) {
  const props = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "career":
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth="2" />
          <path d="M2 12h8M14 12h8" />
        </svg>
      );
    case "tech":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
        </svg>
      );
    case "news":
      return (
        <svg {...props}>
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
        </svg>
      );
    case "life":
      return (
        <svg {...props}>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      );
    case "review":
      return (
        <svg {...props}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "essay":
      return (
        <svg {...props}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case "oss":
      return (
        <svg {...props}>
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M6 21V9a9 9 0 0 0 9 9" />
        </svg>
      );
    case "tutorial":
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "opinion":
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    default:
      return null;
  }
}
