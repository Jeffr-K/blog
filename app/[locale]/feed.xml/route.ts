import { getAllPostsMeta } from "@/shared/lib/mdx";
import { isLocale } from "@/shared/i18n/config";
import { siteConfig } from "@/shared/lib/site-config";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });

  const posts = getAllPostsMeta(locale);
  const items = posts.map((post) => {
    const url = `${siteConfig.url}/${locale}/posts/${post.slug}`;
    return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(post.datetime).toUTCString()}</pubDate></item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(siteConfig.name)}</title><link>${siteConfig.url}/${locale}</link><description>${escapeXml(siteConfig.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ?? character);
}
