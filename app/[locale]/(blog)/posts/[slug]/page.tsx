import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/shared/i18n/config";
import { compilePost, extractHeadings, getAllPostsMeta } from "@/shared/lib/mdx";
import { MdxPostContent } from "@/shared/components/posts/post-content";
import { ProfileCard } from "@/shared/components/profile/profile-card";
import { Toc } from "@/shared/components/posts/toc";
import { GiscusComments } from "@/shared/components/comments/giscus-comments";
import { resolveAuthors } from "@/shared/data/authors";
import { siteConfig } from "@/shared/lib/site-config";

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

  const url = `${siteConfig.url}/${locale}/posts/${slug}`;
  const authors = resolveAuthors(post.frontmatter.authors, locale);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    authors: authors.map((name) => ({ name })),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      publishedTime: post.frontmatter.datetime,
      authors,
      tags: post.frontmatter.tags,
      locale: locale === "ko" ? "ko_KR" : "ja_JP",
    },
    twitter: {
      card: "summary",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) notFound();

  const post = await compilePost(slug, locale);
  if (!post) notFound();

  const headings = extractHeadings(slug, locale);
  const url = `${siteConfig.url}/${locale}/posts/${slug}`;
  const authors = resolveAuthors(post.frontmatter.authors, locale);
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
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  headline: post.frontmatter.title,
                  description: post.frontmatter.excerpt,
                  datePublished: post.frontmatter.datetime,
                  author: authors.map((name) => ({ "@type": "Person", name })),
                  mainEntityOfPage: { "@type": "WebPage", "@id": url },
                  url,
                }),
              }}
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
