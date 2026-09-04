export const siteConfig = {
  name: "anonymous.rs",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anonymous.rs",
  description: "개발과 시스템을 탐구하는 anonymous.rs의 기술 블로그",
} as const;
