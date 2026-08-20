import { notFound } from "next/navigation";

import type { Locale } from "@/shared/i18n/config";
import { isLocale } from "@/shared/i18n/config";
import { getPost, posts } from "@/shared/data/posts";
import { PostContent } from "@/shared/components/posts/post-content";
import { ProfileCard } from "@/shared/components/profile/profile-card";
import { Toc } from "@/shared/components/posts/toc";

import styles from "./post-detail.module.css";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return posts.flatMap((post) =>
    ["ko", "ja"].map((locale) => ({ locale, slug: post.slug }))
  );
}

export default async function PostDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const post = getPost(slug);
  if (!post) notFound();

  const tocLabel = (locale as Locale) === "ko" ? "목차" : "目次";

  return (
    <main className="site-main">
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <ProfileCard />
          </div>
          <div className={styles.center}>
            <PostContent post={post} locale={locale as Locale} />
          </div>
          <div className={styles.right}>
            <Toc sections={post.sections[locale as Locale]} label={tocLabel} />
          </div>
        </div>
      </div>
    </main>
  );
}
