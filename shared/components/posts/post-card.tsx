import Link from "next/link";

import type { Locale } from "@/shared/i18n/config";
import type { PostMeta } from "@/shared/lib/mdx";
import { categories } from "@/shared/data/categories";

import styles from "./post-card.module.css";

type Props = { post: PostMeta; locale: Locale };

export function PostCard({ post, locale }: Props) {
  const category = categories.find((c) => c.id === post.category);
  const [y, m, d] = post.datetime.slice(0, 10).split("-");
  const dateStr = locale === "ja" ? `${y}年${m}月${d}日` : `${y}.${m}.${d}`;

  return (
    <article className={styles.card}>
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
          {post.readTime}{locale === "ko" ? "분" : "分"}
        </span>
      </div>

      <Link href={`/${locale}/posts/${post.slug}`} className={styles.titleLink}>
        <h2 className={styles.title}>{post.title}</h2>
      </Link>

      <p className={styles.excerpt}>{post.excerpt}</p>

      <div className={styles.tags}>
        {post.tags.slice(0, 4).map((tag) => (
          <span key={tag} className={styles.tag}>#{tag}</span>
        ))}
      </div>
    </article>
  );
}
