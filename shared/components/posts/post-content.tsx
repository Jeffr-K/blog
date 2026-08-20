import type { Post } from "@/shared/data/posts";
import type { Locale } from "@/shared/i18n/config";
import { categories } from "@/shared/data/categories";

import styles from "./post-content.module.css";

type Props = { post: Post; locale: Locale };

export function PostContent({ post, locale }: Props) {
  const category = categories.find((c) => c.id === post.category);
  const [y, m, d] = post.date.split("-");
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
          <span className={styles.readTime}>
            {post.readTime}{locale === "ko" ? "분 읽기" : "分"}
          </span>
        </div>

        <h1 className={styles.title}>{post.title[locale]}</h1>
        <p className={styles.excerpt}>{post.excerpt[locale]}</p>

        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </header>

      <hr className={styles.divider} />

      <div className={styles.body}>
        {post.sections[locale].map((section) => {
          const Tag = section.level === 2 ? "h2" : "h3";
          return (
            <section key={section.id} className={styles.section}>
              <Tag id={section.id} className={styles[`h${section.level}`]}>
                {section.heading}
              </Tag>
              <p className={styles.paragraph}>{section.body}</p>
            </section>
          );
        })}
      </div>
    </article>
  );
}
