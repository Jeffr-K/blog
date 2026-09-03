import { notFound } from "next/navigation";

import { isLocale } from "@/shared/i18n/config";
import { categories } from "@/shared/data/categories";
import { techBlogs } from "@/shared/data/tech-blogs";
import { getAllPostsMeta } from "@/shared/lib/mdx";
import { fetchAllFeeds } from "@/shared/lib/feed";
import { HotArticleBanner } from "@/shared/components/home/hot-article-banner";
import { CategoryGrid } from "@/shared/components/home/category-grid";
import { TechFeed } from "@/shared/components/home/tech-feed";
import { ProfileCard } from "@/shared/components/profile/profile-card";

import styles from "./page.module.css";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const [hotArticles, feedItems] = await Promise.all([
    Promise.resolve(getAllPostsMeta(locale).slice(0, 5)),
    fetchAllFeeds(techBlogs),
  ]);

  return (
    <main className="site-main">
      {/* 왼쪽 여백에 고정된 프로필 카드 */}
      <div className={styles.profileSidebar}>
        <ProfileCard locale={locale} />
      </div>

      <div className="content-container">
        <HotArticleBanner articles={hotArticles} locale={locale} />
        <CategoryGrid categories={categories} locale={locale} />
        <TechFeed items={feedItems} blogs={techBlogs} />
      </div>
    </main>
  );
}
