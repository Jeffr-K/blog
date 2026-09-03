import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

import type { Locale } from "@/shared/i18n/config";
import { mdxComponents } from "@/shared/components/mdx/mdx-components";
import { codeTheme } from "@/shared/lib/mdx/code/config";

const CONTENT_DIR = path.join(process.cwd(), "content/posts");

/* ── Frontmatter schema ─────────────────────────────────────────── */
export type PostFrontmatter = {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authors: string[];
  datetime: string;       // ISO 8601 — "2025-08-10T10:00:00+09:00"
  draft?: boolean;
  /** 저작권 문구. 미설정 시 DEFAULT_COPYRIGHT 사용 */
  copyright?: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  locale: Locale;
  readTime: number;       // minutes
};

/* ── Helpers ────────────────────────────────────────────────────── */

function getPostFilePath(slug: string, locale: Locale): string {
  return path.join(CONTENT_DIR, slug, `index.${locale}.md`);
}

/* ── getAllPostSlugs ─────────────────────────────────────────────── */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

/* ── getPostMeta ─────────────────────────────────────────────────── */
export function getPostMeta(slug: string, locale: Locale): PostMeta | null {
  const filePath = getPostFilePath(slug, locale);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  if (fm.draft) return null;

  return {
    ...fm,
    slug,
    locale,
    readTime: Math.ceil(readingTime(content).minutes),
  };
}

/* ── getAllPostsMeta ─────────────────────────────────────────────── */
export function getAllPostsMeta(locale: Locale): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => getPostMeta(slug, locale))
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.datetime.localeCompare(a.datetime));
}

/* ── getPostsByCategory ──────────────────────────────────────────── */
export function getPostsByCategory(locale: Locale, category: string): PostMeta[] {
  const all = getAllPostsMeta(locale);
  return category === "all" ? all : all.filter((p) => p.category === category);
}

export function getCategoryCount(locale: Locale): Record<string, number> {
  const counts: Record<string, number> = { all: 0 };

  getAllPostsMeta(locale).forEach((post) => {
    counts.all += 1;
    counts[post.category] = (counts[post.category] ?? 0) + 1;
  });

  return counts;
}

export function getAllTags(locale: Locale): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};

  getAllPostsMeta(locale).forEach((post) => {
    post.tags.forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });
  });

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/* ── compilePost ─────────────────────────────────────────────────── */
export async function compilePost(slug: string, locale: Locale) {
  const filePath = getPostFilePath(slug, locale);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: ["anchor"] } },
          ],
          [
            rehypePrettyCode,
            {
              theme: { light: codeTheme.light, dark: codeTheme.dark },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  if (frontmatter.draft) return null;

  const { content: markdownContent } = matter(raw);
  const readTime = Math.ceil(readingTime(markdownContent).minutes);

  return { content, frontmatter, slug, locale, readTime };
}

/* ── extractHeadings (for TOC) ───────────────────────────────────── */
export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function extractHeadings(slug: string, locale: Locale): Heading[] {
  const filePath = getPostFilePath(slug, locale);
  if (!fs.existsSync(filePath)) return [];

  const { content } = matter(fs.readFileSync(filePath, "utf-8"));
  const headings: Heading[] = [];

  for (const line of content.split("\n")) {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);

    if (h2) {
      const text = h2[1].trim();
      headings.push({ id: slugify(text), text, level: 2 });
    } else if (h3) {
      const text = h3[1].trim();
      headings.push({ id: slugify(text), text, level: 3 });
    }
  }

  return headings;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣ぁ-ん一-龯\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
