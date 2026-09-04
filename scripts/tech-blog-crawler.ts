import fs from "node:fs/promises";
import path from "node:path";

import { techBlogs } from "../shared/data/tech-blogs";
import { fetchAllFeeds, type FeedItem } from "../shared/lib/feed";

const cachePath = path.join(process.cwd(), "data/tech-posts.json");
const retentionDays = 90;
const maxItems = 1000;

async function main() {
  const previous = await readCache();
  const incoming = await fetchAllFeeds(techBlogs);
  const items = mergeItems(previous, incoming);

  await fs.writeFile(cachePath, `${JSON.stringify(items, null, 2)}\n`);
  console.log(`Stored ${items.length} tech posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function readCache(): Promise<FeedItem[]> {
  try {
    return JSON.parse(await fs.readFile(cachePath, "utf8")) as FeedItem[];
  } catch {
    return [];
  }
}

function mergeItems(previousItems: FeedItem[], incomingItems: FeedItem[]): FeedItem[] {
  const byKey = new Map<string, FeedItem>();

  for (const item of [...previousItems, ...incomingItems]) {
    const key = `${item.sourceId}:${normalizeUrl(item.url)}`;
    byKey.set(key, { ...item, id: key });
  }

  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  return [...byKey.values()]
    .filter((item) => new Date(item.date).getTime() >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxItems);
}

function normalizeUrl(raw: string): string {
  try {
    const url = new URL(raw);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
      url.searchParams.delete(key);
    });
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return raw.trim();
  }
}
