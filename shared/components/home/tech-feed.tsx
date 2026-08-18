"use client";

import { useEffect, useMemo, useState } from "react";

import type { FeedItem } from "@/shared/lib/feed";
import type { TechBlog } from "@/shared/data/tech-blogs";

import styles from "./tech-feed.module.css";

const PAGE_SIZE = 9;

type Props = {
  items: FeedItem[];
  blogs: TechBlog[];
};

export function TechFeed({ items, blogs }: Props) {
  const [query, setQuery] = useState("");
  const [activeSource, setActiveSource] = useState<string>("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q);
      const matchesSource =
        activeSource === "all" || item.sourceId === activeSource;
      return matchesQuery && matchesSource;
    });
  }, [items, query, activeSource]);

  // Reset to first page when filter changes
  useEffect(() => { setPage(0); }, [query, activeSource]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const displayed = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const isEmpty = displayed.length === 0;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>테크 블로그</h2>

      {/* Search + source filter */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <SearchIcon />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="제목, 블로그 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="검색"
          />
          {query && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
            >
              <XIcon />
            </button>
          )}
        </div>

        <div className={styles.sourceFilter} role="tablist" aria-label="블로그 필터">
          <button
            type="button"
            role="tab"
            className={styles.sourceChip}
            aria-selected={activeSource === "all"}
            onClick={() => setActiveSource("all")}
          >
            전체
          </button>
          {blogs.map((blog) => (
            <button
              key={blog.id}
              type="button"
              role="tab"
              className={styles.sourceChip}
              aria-selected={activeSource === blog.id}
              style={{ "--chip-color": blog.color } as React.CSSProperties}
              onClick={() => setActiveSource(blog.id)}
            >
              {blog.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isEmpty ? (
        <div className={styles.empty}>
          <EmptyIcon />
          <span>일치하는 글이 없습니다</span>
        </div>
      ) : (
        <div className={styles.grid}>
          {displayed.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              style={{ "--accent": item.sourceColor } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <span
                  className={styles.sourceBadge}
                  style={{
                    background: `color-mix(in srgb, ${item.sourceColor} 12%, transparent)`,
                    color: item.sourceColor,
                  }}
                >
                  {item.source}
                </span>
                <span className={styles.cardDate}>{formatDate(item.date)}</span>
              </div>
              <p className={styles.cardTitle}>{item.title}</p>
              <ExternalIcon className={styles.externalIcon} />
            </a>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      )}
    </section>
  );
}

/* ── Pagination ─────────────────────────────────────────────────── */

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const pages = buildPageRange(page, totalPages);

  return (
    <nav className={styles.pagination} aria-label="페이지 탐색">
      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className={styles.pageEllipsis}>…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={styles.pageBtn}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p as number)}
          >
            {(p as number) + 1}
          </button>
        )
      )}

      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages - 1}
        aria-label="다음 페이지"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}

function buildPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);

  const pages: (number | "…")[] = [];
  const add = (n: number) => { if (!pages.includes(n)) pages.push(n); };

  add(0);
  if (current > 2) pages.push("…");
  for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++) add(i);
  if (current < total - 3) pages.push("…");
  add(total - 1);

  return pages;
}

/* ── Helpers ────────────────────────────────────────────────────── */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/* ── Icons ──────────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M8 11h6" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
