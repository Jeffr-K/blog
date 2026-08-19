import { notFound } from "next/navigation";

import type { Locale } from "@/shared/i18n/config";
import { isLocale } from "@/shared/i18n/config";
import { getPostsByCategory } from "@/shared/data/posts";
import { PostCard } from "@/shared/components/posts/post-card";
import { CategorySidebar } from "@/shared/components/posts/category-sidebar";
import { TagsSidebar } from "@/shared/components/posts/tags-sidebar";

import styles from "./posts-list.module.css";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function PostsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;

  if (!isLocale(locale)) notFound();

  const activeCategory = category ?? "all";
  const filtered = getPostsByCategory(activeCategory);

  const heading = (locale as Locale) === "ko" ? "글" : "記事";
  const countLabel = (locale as Locale) === "ko" ? `${filtered.length}개` : `${filtered.length}件`;

  return (
    <main className="site-main">
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <CategorySidebar locale={locale as Locale} activeCategory={activeCategory} />
          </div>

          <div className={styles.center}>
            <div className={styles.listHeader}>
              <h1 className={styles.heading}>{heading}</h1>
              <span className={styles.count}>{countLabel}</span>
            </div>
            <div className={styles.list}>
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} locale={locale as Locale} />
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <TagsSidebar locale={locale as Locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
