import Link from "next/link";

import type { Locale } from "@/shared/i18n/config";
import { getAllPostsMeta, getAllTags } from "@/shared/lib/mdx";

import styles from "./tags-sidebar.module.css";

export function TagsSidebar({ locale }: { locale: Locale }) {
  const tags = getAllTags(locale).slice(0, 16);
  const recent = getAllPostsMeta(locale).slice(0, 4);

  return (
    <div className={styles.sidebar}>
      <section className={styles.section}>
        <p className={styles.heading}>{locale === "ko" ? "태그" : "タグ"}</p>
        <div className={styles.tagCloud}>
          {tags.map(({ tag, count }) => (
            <span
              key={tag}
              className={styles.tag}
              style={{ fontSize: `${Math.max(0.625, Math.min(0.875, 0.625 + count * 0.06))}rem` }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.heading}>{locale === "ko" ? "최근 글" : "最近の記事"}</p>
        <ul className={styles.recentList}>
          {recent.map((post) => (
            <li key={post.slug}>
              <Link href={`/${locale}/posts/${post.slug}`} className={styles.recentItem}>
                <span className={styles.recentTitle}>{post.title}</span>
                <span className={styles.recentDate}>{post.datetime.slice(0, 7)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
