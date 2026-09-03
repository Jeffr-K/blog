"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./toc.module.css";

type TocSection = {
  id: string;
  level: 2 | 3;
  heading?: string;
  text?: string;
};

type Props = {
  sections: TocSection[];
  label: string;
};

export function Toc({ sections, label }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sections]);

  return (
    <nav className={styles.toc} aria-label={label}>
      <p className={styles.heading}>{label}</p>
      <ul className={styles.list}>
        {sections.map((s) => (
          <li key={s.id} className={styles.item} data-level={s.level}>
            <a
              href={`#${s.id}`}
              className={styles.link}
              aria-current={s.id === activeId ? "true" : undefined}
              onClick={() => setActiveId(s.id)}
            >
              {s.heading ?? s.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
