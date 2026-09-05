import Link from "next/link";

import type { Locale } from "@/shared/i18n/config";
import { categories } from "@/shared/data/categories";
import { getCategoryCount } from "@/shared/lib/mdx";

import styles from "./category-sidebar.module.css";

type Props = {
  locale: Locale;
  activeCategory?: string;
};

export function CategorySidebar({ locale, activeCategory = "all" }: Props) {
  const counts = getCategoryCount(locale);
  const heading = locale === "ko" ? "카테고리" : "カテゴリー";
  const allLabel = locale === "ko" ? "전체 글" : "すべて";

  return (
    <nav className={styles.nav} aria-label={heading}>
      <p className={styles.heading}>{heading}</p>
      <ul className={styles.list}>
        <li>
          <Link
            href={`/${locale}/posts`}
            className={styles.item}
            aria-current={activeCategory === "all" ? "page" : undefined}
          >
            <span className={styles.checkbox} aria-hidden="true" />
            <span className={styles.label}>{allLabel}</span>
            <span className={styles.count}>{counts.all ?? 0}</span>
          </Link>
        </li>
        {categories.map((cat) => {
          const count = counts[cat.id] ?? 0;
          if (count === 0) return null;
          const isActive = activeCategory === cat.id;
          return (
            <li key={cat.id}>
              <Link
                href={`/${locale}/posts?category=${cat.id}`}
                className={styles.item}
                aria-current={isActive ? "page" : undefined}
                style={{ "--accent": cat.color } as React.CSSProperties}
              >
                <span className={styles.checkbox} aria-hidden="true" />
                <span className={styles.label}>{cat.name[locale]}</span>
                <span className={styles.count}>{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
