"use client";

import Giscus from "@giscus/react";

import type { Locale } from "@/shared/i18n/config";
import { giscusConfig } from "@/shared/lib/comments/giscus";
import { useTheme } from "@/shared/components/theme/theme-provider";

import styles from "./giscus-comments.module.css";

type Props = {
  locale: Locale;
};

export function GiscusComments({ locale }: Props) {
  const { theme } = useTheme();

  return (
    <section className={styles.comments} aria-labelledby="comments-title">
      <h2 id="comments-title" className={styles.title}>
        {locale === "ko" ? "댓글" : "コメント"}
      </h2>
      <Giscus
        repo={giscusConfig.repo}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === "dark" ? "dark_dimmed" : "light"}
        lang={locale}
        loading="lazy"
      />
    </section>
  );
}
