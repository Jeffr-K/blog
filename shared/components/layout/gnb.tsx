"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/shared/i18n/config";
import { useTheme } from "@/shared/components/theme/theme-provider";
import { useAgent } from "@/shared/components/agent/agent-context";

import styles from "./gnb.module.css";

type GnbProps = {
  locale: Locale;
  navigation: {
    home: string;
    posts: string;
    careers: string;
  };
  language: {
    label: string;
    ko: string;
    ja: string;
  };
};

export function Gnb({ locale, navigation, language }: GnbProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: navigation.home },
    { href: `/${locale}/posts`, label: navigation.posts },
    { href: `/${locale}/careers`, label: navigation.careers },
  ];

  const getLocalizedPath = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  };

  return (
    <header className={styles.header}>
      <div className={`content-container ${styles.inner}`}>
        <Link
          href={`/${locale}`}
          className={styles.brand}
          aria-label={navigation.home}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={styles.brandMark} aria-hidden="true">~</span>
          <span>anonymous.rs</span>
        </Link>

        <div className={styles.desktopRight}>
          <nav className={styles.desktopNav} aria-label="Global">
            {links.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.navLink}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className={styles.desktopActions}>
            <AgentToggle />
            <ThemeToggle />
            <LanguageSwitcher
              locale={locale}
              label={language.label}
              koLabel={language.ko}
              jaLabel={language.ja}
              getLocalizedPath={getLocalizedPath}
            />
          </div>
        </div>

        <div className={styles.mobileControls}>
          <AgentToggle />
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={styles.mobilePanel}
        data-open={isMenuOpen}
      >
        <nav className="content-container" aria-label="Global mobile">
          <div className={styles.mobileLinks}>
            {links.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileLink}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className={styles.mobileLangRow}>
            <Link
              href={getLocalizedPath("ko")}
              className={styles.mobileLangLink}
              hrefLang="ko"
              aria-current={locale === "ko" ? "true" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {language.ko}
            </Link>
            <span className={styles.mobileLangDivider} aria-hidden="true" />
            <Link
              href={getLocalizedPath("ja")}
              className={styles.mobileLangLink}
              hrefLang="ja"
              aria-current={locale === "ja" ? "true" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {language.ja}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function AgentToggle() {
  const { isOpen, toggle } = useAgent();
  return (
    <button
      type="button"
      className={styles.agentBtn}
      aria-label={isOpen ? "AI 에이전트 닫기" : "AI 에이전트 열기"}
      aria-pressed={isOpen}
      data-active={isOpen}
      onClick={toggle}
    >
      <BotIcon />
    </button>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-active={isDark}
      onClick={toggle}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  koLabel: string;
  jaLabel: string;
  getLocalizedPath: (locale: Locale) => string;
};

function LanguageSwitcher({
  locale,
  label,
  koLabel,
  jaLabel,
  getLocalizedPath,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const currentLabel = locale === "ko" ? koLabel : jaLabel;

  return (
    <div ref={ref} className={styles.langDropdown} aria-label={label}>
      <button
        type="button"
        className={styles.langButton}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((o) => !o)}
      >
        {currentLabel}
        <ChevronDownIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className={styles.langMenu} role="listbox">
          <Link
            href={getLocalizedPath("ko")}
            className={styles.langOption}
            aria-selected={locale === "ko"}
            hrefLang="ko"
            onClick={() => setIsOpen(false)}
          >
            {koLabel}
          </Link>
          <Link
            href={getLocalizedPath("ja")}
            className={styles.langOption}
            aria-selected={locale === "ja"}
            hrefLang="ja"
            onClick={() => setIsOpen(false)}
          >
            {jaLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

/* ── Icons ─────────────────────────────────────────────────────── */

function BotIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ChevronDownIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 160ms ease" }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
