import type { MetadataRoute } from "next";

import { locales } from "@/shared/i18n/config";
import { getAllPostsMeta } from "@/shared/lib/mdx";
import { siteConfig } from "@/shared/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = locales.flatMap((locale) => [
    { url: `${siteConfig.url}/${locale}`, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteConfig.url}/${locale}/posts`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${siteConfig.url}/${locale}/careers`, changeFrequency: "daily" as const, priority: 0.7 },
  ]);

  const postRoutes = locales.flatMap((locale) =>
    getAllPostsMeta(locale).map((post) => ({
      url: `${siteConfig.url}/${locale}/posts/${post.slug}`,
      lastModified: new Date(post.datetime),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...postRoutes];
}
