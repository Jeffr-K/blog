"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";


import type { Locale } from "@/shared/i18n/config";
import type { PostMeta } from "@/shared/lib/mdx";
import { categories } from "@/shared/data/categories";

import styles from "./hot-article-banner.module.css";

type Props = {
  articles: PostMeta[];
  locale: Locale;
};

const INTERVAL_MS = 5000;

export function HotArticleBanner({ articles, locale }: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + articles.length) % articles.length),
    [articles.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % articles.length),
    [articles.length]
  );

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  if (articles.length === 0) return null;

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  return (
    <section className={styles.section} aria-label="인기 글">
      <div
        className={styles.card}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div
            key={`${index}-${isPaused}`}
            className={styles.progressBar}
            data-paused={isPaused}
          />
        </div>

        {/* Slide content */}
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {articles.map((item, i) => {
              const isVisible = i === index;
              return (
                <div key={item.slug} className={styles.slide} aria-hidden={!isVisible}>
                  <div className={styles.tagRow}>
                    <span className={styles.hotBadge}>HOT</span>
                    <span className={styles.category}>
                      {categories.find((category) => category.id === item.category)?.name[locale] ?? item.category}
                    </span>
                    <span className={styles.counter}>
                      {i + 1} / {articles.length}
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/posts/${item.slug}`}
                    className={styles.titleLink}
                    tabIndex={isVisible ? 0 : -1}
                  >
                    <h2 className={styles.title}>{item.title}</h2>
                  </Link>

                  <p className={styles.excerpt}>{item.excerpt}</p>

                  <div className={styles.metaRow}>
                    <span className={styles.metaDate}>
                      {formatDate(item.datetime, locale)}
                    </span>
                    <span className={styles.metaDivider} aria-hidden="true" />
                    <span className={styles.metaRead}>
                      {item.readTime}
                      {locale === "ko" ? "분 읽기" : "分"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom nav: dots only */}
        <div className={styles.navBar}>
          <div className={styles.dots} role="tablist">
            {articles.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                role="tab"
                className={styles.dot}
                aria-selected={i === index}
                aria-label={`Article ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(datetime: string, locale: Locale): string {
  const dateStr = datetime.slice(0, 10);
  const [y, m, d] = dateStr.split("-");
  if (locale === "ja") return `${y}年${m}月${d}日`;
  return `${y}.${m}.${d}`;
}
