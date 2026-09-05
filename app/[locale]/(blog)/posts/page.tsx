import { notFound } from "next/navigation";
import Link from "next/link";

import { isLocale } from "@/shared/i18n/config";
import { getPostsByCategory } from "@/shared/lib/mdx";
import { PostCard } from "@/shared/components/posts/post-card";
import { CategorySidebar } from "@/shared/components/posts/category-sidebar";
import { TagsSidebar } from "@/shared/components/posts/tags-sidebar";

import styles from "./posts-list.module.css";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
};

export default async function PostsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  const query = await searchParams;

  if (!isLocale(locale)) notFound();

  const activeCategory = category ?? "all";
  const searchQuery = query.q?.trim() ?? "";
  const categoryPosts = getPostsByCategory(locale, activeCategory);
  const filtered = searchQuery
    ? categoryPosts.filter((post) =>
        [post.title, post.excerpt, ...post.tags]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(searchQuery.toLocaleLowerCase(locale)),
      )
    : categoryPosts;
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number.parseInt(query.page ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const visiblePosts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const heading = locale === "ko" ? "글" : "記事";
  const countLabel = locale === "ko" ? `${filtered.length}개` : `${filtered.length}件`;
  const searchLabel = locale === "ko" ? "글 검색" : "記事を検索";
  const searchPlaceholder = locale === "ko" ? "제목, 요약, 태그 검색" : "タイトル、概要、タグを検索";

  return (
    <main className="site-main">
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <CategorySidebar locale={locale} activeCategory={activeCategory} />
          </div>

          <div className={styles.center}>
            <form className={styles.searchForm} role="search">
              <label htmlFor="post-search" className={styles.searchLabel}>{searchLabel}</label>
              <div className={styles.searchShell}>
                <SearchIcon />
                <input
                  id="post-search"
                  name="q"
                  type="search"
                  defaultValue={searchQuery}
                  placeholder={searchPlaceholder}
                  className={styles.searchInput}
                  aria-label={searchLabel}
                />
                {searchQuery && (
                  <Link
                    href={buildPostsHref(locale, activeCategory, "", 1)}
                    className={styles.searchReset}
                    aria-label={locale === "ko" ? "검색어 지우기" : "検索語を消去"}
                    title={locale === "ko" ? "검색어 지우기" : "検索語を消去"}
                  >
                    <CloseIcon />
                  </Link>
                )}
              </div>
              {activeCategory !== "all" && <input type="hidden" name="category" value={activeCategory} />}
              <button
                type="submit"
                className={styles.searchButton}
                aria-label={locale === "ko" ? "검색" : "検索"}
                title={locale === "ko" ? "검색" : "検索"}
              >
                <SearchIcon />
              </button>
            </form>
            <div className={styles.listHeader}>
              <h1 className={styles.heading}>{heading}</h1>
              <span className={styles.count}>{countLabel}</span>
            </div>
            <div className={styles.list}>
              {visiblePosts.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
            <nav className={styles.pagination} aria-label={locale === "ko" ? "페이지 탐색" : "ページ移動"}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <Link
                  key={page}
                  href={buildPostsHref(locale, activeCategory, searchQuery, page)}
                  className={styles.pageLink}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.right}>
            <TagsSidebar locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}

function buildPostsHref(locale: string, category: string, query: string, page: number): string {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (query) params.set("q", query);
  params.set("page", String(page));
  return `/${locale}/posts?${params.toString()}`;
}

function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

function CloseIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}
