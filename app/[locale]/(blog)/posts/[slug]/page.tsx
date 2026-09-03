import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/shared/i18n/config";
import { compilePost, extractHeadings, getAllPostsMeta } from "@/shared/lib/mdx";
import { MdxPostContent } from "@/shared/components/posts/post-content";
import { ProfileCard } from "@/shared/components/profile/profile-card";
import { Toc } from "@/shared/components/posts/toc";
import { GiscusComments } from "@/shared/components/comments/giscus-comments";

import styles from "./post-detail.module.css";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return (["ko", "ja"] as const).flatMap((locale) =>
    getAllPostsMeta(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const post = await compilePost(slug, locale);
  if (!post) notFound();

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const post = await compilePost(slug, locale);
  if (!post) notFound();

  const headings = extractHeadings(slug, locale);
  const tocLabel = locale === "ko" ? "목차" : "目次";

  return (
    <main className="site-main">
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <ProfileCard locale={locale} />
          </div>
          <div className={styles.center}>
            <MdxPostContent
              content={post.content}
              frontmatter={post.frontmatter}
              locale={locale}
              readTime={post.readTime}
            />
            <GiscusComments locale={locale} />
          </div>
          <div className={styles.right}>
            <Toc sections={headings} label={tocLabel} />
          </div>
        </div>
      </div>
    </main>
  );
}
