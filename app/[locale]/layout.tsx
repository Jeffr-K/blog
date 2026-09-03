import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import Script from "next/script";
import "reset-css";
import "../globals.css";

import {
  defaultLocale,
  isLocale,
  locales,
} from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/get-dictionary";
import { ThemeProvider } from "@/shared/components/theme/theme-provider";

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t||p);}catch(e){}})();`;

const lineSeedSans = localFont({
  variable: "--font-line-seed-sans",
  display: "swap",
  src: [
    {
      path: "../fonts/line-seed/LINESeedKR-Th.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/line-seed/LINESeedKR-Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/line-seed/LINESeedKR-Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        ja: "/ja",
        "x-default": `/${defaultLocale}`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${lineSeedSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
