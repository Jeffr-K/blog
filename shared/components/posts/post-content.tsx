import type { ReactNode } from "react";

import type { Locale } from "@/shared/i18n/config";
import type { PostFrontmatter } from "@/shared/lib/mdx";
import { resolveAuthors } from "@/shared/data/authors";
import { categories } from "@/shared/data/categories";

import styles from "./post-content.module.css";

type MdxProps = {
  content: ReactNode;
  frontmatter: PostFrontmatter;
  locale: Locale;
  readTime: number;
};

export function MdxPostContent({
  content,
  frontmatter,
  locale,
  readTime,
}: MdxProps) {
  const category = categories.find((c) => c.id === frontmatter.category);
  const authorNames = resolveAuthors(frontmatter.authors, locale);
  const [y, m, d] = frontmatter.datetime.slice(0, 10).split("-");
  const dateStr = locale === "ja" ? `${y}年${m}月${d}日` : `${y}.${m}.${d}`;

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.meta}>
          {category && (
            <span
              className={styles.category}
              style={{
                background: `color-mix(in srgb, ${category.color} 10%, transparent)`,
                color: category.color,
              }}
            >
              {category.name[locale]}
            </span>
          )}
          <span className={styles.date}>{dateStr}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.author}>{authorNames.join(", ")}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.readTime}>
            {readTime}
            {locale === "ko" ? "분 읽기" : "分"}
          </span>
        </div>

        <h1 className={styles.title}>{frontmatter.title}</h1>
        <p className={styles.excerpt}>{frontmatter.excerpt}</p>

        <div className={styles.tags}>
          {frontmatter.tags.map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </header>

      <hr className={styles.divider} />

      <div className={styles.body}>{content}</div>
    </article>
  );
}
