import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "@/shared/i18n/config";

function getPreferredLocale(request: NextRequest) {
  const acceptedLanguages = request.headers.get("accept-language")?.toLowerCase();

  const preferredLocale = acceptedLanguages
    ?.split(",")
    .map((language) => language.split(";")[0]?.trim().split("-")[0])
    .find((language) => locales.some((locale) => locale === language));

  return preferredLocale ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml|.*\\..*).*)",
  ],
};
