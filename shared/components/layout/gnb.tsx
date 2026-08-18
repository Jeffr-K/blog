"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/shared/i18n/config";

import styles from "./gnb.module.css";

type GnbProps = {
  locale: Locale;
  navigation: {
    home: string;
    posts: string;
    about: string;
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
    { href: `/${locale}/about`, label: navigation.about },
  ];

  const getLocalizedPath = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  };

  return (
    <header className={styles.header}>
      <div className={`site-container ${styles.inner}`}>
        <Link
          href={`/${locale}`}
          className={styles.brand}
          aria-label={`${navigation.home}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={styles.brandMark} aria-hidden="true">
            Y
          </span>
          <span>YIYB</span>
        </Link>

        <nav className={styles.desktopNavigation} aria-label="Global">
          {links.map((link) => {
            const isActive =
              link.href === `/${locale}`
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navigationLink}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.desktopActions}>
          <LanguageSwitcher
            locale={locale}
            label={language.label}
            koLabel={language.ko}
            jaLabel={language.ja}
            getLocalizedPath={getLocalizedPath}
          />
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={styles.mobilePanel}
        data-open={isMenuOpen}
      >
        <nav className="site-container" aria-label="Global mobile">
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

          <LanguageSwitcher
            locale={locale}
            label={language.label}
            koLabel={language.ko}
            jaLabel={language.ja}
            getLocalizedPath={getLocalizedPath}
          />
        </nav>
      </div>
    </header>
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
  return (
    <div className={styles.languageSwitcher} aria-label={label}>
      <Link
        href={getLocalizedPath("ko")}
        className={styles.languageLink}
        aria-current={locale === "ko" ? "true" : undefined}
        hrefLang="ko"
      >
        {koLabel}
      </Link>
      <span className={styles.languageDivider} aria-hidden="true" />
      <Link
        href={getLocalizedPath("ja")}
        className={styles.languageLink}
        aria-current={locale === "ja" ? "true" : undefined}
        hrefLang="ja"
      >
        {jaLabel}
      </Link>
    </div>
  );
}
