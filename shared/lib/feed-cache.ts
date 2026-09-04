import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { FeedItem } from "./feed";

const CACHE_PATH = path.join(process.cwd(), "data/tech-posts.json");

export function getCachedTechPosts(): FeedItem[] {
  if (!fs.existsSync(CACHE_PATH)) return [];

  try {
    const data = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8")) as unknown;
    return Array.isArray(data) ? (data as FeedItem[]) : [];
  } catch {
    return [];
  }
}
