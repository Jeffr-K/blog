import type { TechBlog } from "@/shared/data/tech-blogs";

const FEED_TIMEOUT_MS = 5000;

export type FeedItem = {
  id: string;
  title: string;
  url: string;
  date: string;
  source: string;
  sourceId: string;
  sourceColor: string;
};

export async function fetchAllFeeds(blogs: TechBlog[]): Promise<FeedItem[]> {
  const results = await Promise.allSettled(
    blogs.map((blog) => fetchFeed(blog))
  );

  const items: FeedItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      items.push(...result.value);
    }
  }

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

async function fetchFeed(blog: TechBlog): Promise<FeedItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);

  try {
    const res = await fetch(blog.feedUrl, {
      next: { revalidate: 3600 },
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; blog-aggregator/1.0; +https://anonymous.rs)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
      },
    });

    if (!res.ok) return [];

    const xml = await res.text();
    return parseXML(xml, blog);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

function parseXML(xml: string, blog: TechBlog): FeedItem[] {
  const isAtom = /<feed[\s>]/i.test(xml);
  const rawItems = isAtom ? extractAtomEntries(xml) : extractRSSItems(xml);

  return rawItems
    .map((raw, i) => ({
      id: `${blog.id}-${i}`,
      title: raw.title,
      url: raw.url,
      date: raw.date,
      source: blog.name,
      sourceId: blog.id,
      sourceColor: blog.color,
    }))
    .filter((item) => item.title && item.url);
}

type RawEntry = { title: string; url: string; date: string };

function extractRSSItems(xml: string): RawEntry[] {
  const items: RawEntry[] = [];
  const re = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;

  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const title = getTagText(block, "title");
    const url =
      getTagText(block, "link") ||
      getLinkHref(block) ||
      getTagText(block, "guid");
    const date =
      getTagText(block, "pubDate") ||
      getTagText(block, "dc:date") ||
      getTagText(block, "updated");

    if (title && url) {
      items.push({ title, url: url.trim(), date: normalizeDate(date) });
    }
  }

  return items;
}

function extractAtomEntries(xml: string): RawEntry[] {
  const items: RawEntry[] = [];
  const re = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
  let m: RegExpExecArray | null;

  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const title = getTagText(block, "title");
    const url = getLinkHref(block) || getTagText(block, "id");
    const date =
      getTagText(block, "published") || getTagText(block, "updated");

    if (title && url) {
      items.push({ title, url: url.trim(), date: normalizeDate(date) });
    }
  }

  return items;
}

function getTagText(xml: string, tag: string): string {
  // CDATA
  const cdata = new RegExp(
    `<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`,
    "i"
  ).exec(xml);
  if (cdata) return decodeEntities(cdata[1].trim());

  // Regular text
  const plain = new RegExp(
    `<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,
    "i"
  ).exec(xml);
  if (plain) return decodeEntities(plain[1].trim());

  return "";
}

function getLinkHref(xml: string): string {
  const m = /<link[^>]+href=["']([^"']+)["']/i.exec(xml);
  return m ? m[1] : "";
}

function normalizeDate(raw: string): string {
  if (!raw) return new Date().toISOString();
  try {
    return new Date(raw).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}
