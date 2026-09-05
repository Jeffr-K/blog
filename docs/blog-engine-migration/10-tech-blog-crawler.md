# 10. Tech Blog Crawler

## Goal

Collect technical blog metadata on a schedule and serve the cached result from the homepage without making the visitor wait for external RSS servers.

## Current State

- The homepage reads RSS and Atom feeds through `shared/lib/feed.ts`.
- Feed sources are registered in `shared/data/tech-blogs.ts`.
- Requests run in parallel with `Promise.allSettled`.
- Each request has a five-second timeout and a one-hour Next.js revalidation window.
- The result is held only for the current render; there is no persistent crawler result or crawl history.

The current code is a request-time feed aggregator, not a background crawler.

## Scope

- Fetch RSS and Atom feeds on a schedule.
- Store only link-curation metadata.
- Normalize entries from different feed formats into one schema.
- Deduplicate entries across repeated crawls and sources.
- Preserve the last successful result when a source is temporarily unavailable.
- Let the homepage read cached data without contacting every external source.
- Keep the original source and URL visible for every item.

## Out Of Scope

- Scraping full article bodies.
- Mirroring images or article assets.
- Re-hosting article content.
- Generating long summaries from source articles.
- Ranking articles by opaque engagement metrics.
- Building an admin dashboard in the first release.

## Data Policy

The crawler stores metadata needed for a link directory only:

```ts
type TechPost = {
  id: string;
  sourceId: string;
  title: string;
  url: string;
  publishedAt: string;
  discoveredAt: string;
};
```

The homepage should link to the original article. It should not render copied article HTML, full descriptions, source images, or embedded content.

## Source Registry

Keep source definitions separate from collected results:

```ts
type TechBlogSource = {
  id: string;
  name: string;
  feedUrl: string;
  siteUrl: string;
  color: string;
  enabled: boolean;
};
```

The registry is application configuration, not crawled content. A source can be disabled without deleting its previous cached entries.

## Collection Pipeline

```text
scheduled job
  -> load enabled source registry
  -> fetch each feed with timeout and user agent
  -> parse RSS or Atom
  -> normalize title, URL, date, and source ID
  -> validate URL and required fields
  -> create stable item ID
  -> merge with cached items
  -> deduplicate and sort
  -> write the new cache and crawl report
```

Each source should be isolated. One malformed feed or timeout must not cancel the full crawl.

## Stable IDs And Deduplication

Use the feed GUID when it is available. Otherwise use a normalized URL as the identity key. Do not use the array index because feed ordering changes over time.

```ts
function getTechPostId(sourceId: string, guid: string | undefined, url: string) {
  return `${sourceId}:${guid?.trim() || normalizeUrl(url)}`;
}
```

Deduplication rules:

- Prefer the GUID when present.
- Normalize trailing slashes and tracking parameters from URLs.
- Keep the newest metadata for the same identity.
- Do not merge identical URLs from different sources unless the source identity is explicitly known to be duplicated.

## Storage Alternatives

### A. Generated JSON cache

The scheduled job writes a versioned JSON file such as `data/tech-posts.json`. The homepage reads that file at build or request time.

Advantages:

- No database is required.
- Works well with a static Next.js deployment.
- Easy to inspect and restore through Git history.

Tradeoffs:

- The scheduled job needs permission to update the repository or object storage.
- Generated data creates automated commits if stored in Git.
- Concurrent runs need a lock or a single scheduled workflow.

### B. Managed database

Store sources, posts, crawl runs, and source errors in a managed database.

Advantages:

- Better querying, retention, and operational history.
- No generated commits.
- Easier to add an admin screen later.

Tradeoffs:

- Adds credentials, migrations, backups, and a new service dependency.
- More infrastructure than the current homepage needs.

### C. Build-time collection

Fetch feeds during deployment and include the result in the generated output.

Advantages:

- Minimal runtime infrastructure.
- Visitors never wait for external feeds.

Tradeoffs:

- No updates until the next deployment.
- A slow or broken feed can make deployments slower unless failures are isolated.

## Decision For The First Crawler

Use a scheduled GitHub Actions job with a generated JSON cache for the first release.

Reasoning:

- The project currently has no database.
- The data volume is small.
- The result is read-only homepage content.
- Git history provides a simple audit trail for generated changes.
- The collector can later write the same normalized model to a database without changing the parser.

The crawler should live outside React rendering code:

```text
scripts/tech-blog-crawler.ts
shared/lib/feed/parser.ts
shared/lib/feed/normalize.ts
data/tech-posts.json
.github/workflows/tech-blog-crawler.yml
```

The existing `fetchAllFeeds` behavior should be reused or split into pure parser and network layers instead of being copied into the workflow.

## Crawl Report

Every run should produce a small report for logs and debugging:

```ts
type CrawlSourceResult = {
  sourceId: string;
  status: "success" | "failed" | "empty";
  itemCount: number;
  durationMs: number;
  error?: string;
};
```

The crawler should retain the previous cached entries when a source fails. A failed fetch must not erase a healthy source's data.

## Scheduling And Retry

- Run once per hour initially.
- Use a per-source timeout between three and five seconds.
- Retry transient network failures once with a short backoff.
- Do not retry malformed XML indefinitely.
- Prevent overlapping workflow runs.
- Fail the workflow only when the collector itself cannot produce a valid cache; individual source failures should be reported but tolerated.

## Homepage Contract

The homepage should read `TechPost[]` from a cache reader. It should not know whether the data came from RSS, JSON, a database, or another provider.

```ts
export function getTechPosts(): TechPost[];
```

The UI keeps its current behavior:

- search by title and source
- filter by source
- paginate results
- link to the original article
- show an explicit empty state
- show a non-blocking stale-data or unavailable state when the crawl report indicates a problem

## Compliance And Courtesy

- Prefer the source's published RSS or Atom feed over scraping HTML pages.
- Follow the source's terms and published crawling guidance.
- Identify requests with a stable user agent.
- Keep request frequency low and cache results.
- Store only the metadata required for the directory.
- Display source attribution and the original link.
- Provide a way to disable a source or remove an entry.
- Honor removal requests promptly.

## Implementation Order

1. Split feed parsing and network fetching into testable modules.
2. Add stable IDs, URL normalization, and deduplication.
3. Add the JSON cache reader and writer.
4. Move the homepage from request-time fetching to cached data.
5. Add the scheduled GitHub Actions workflow.
6. Add source-level crawl status and stale-data handling.
7. Add parser fixtures and failure-case tests.

## Verification

- A malformed or unavailable source does not erase existing cached entries.
- Repeated crawls do not create duplicate posts.
- RSS and Atom fixtures normalize to the same `TechPost` shape.
- The homepage does not make external feed requests during normal rendering.
- Every item links to its original source.
- The crawler can run locally with a dry-run option.
- `npm run lint`
- `npm run build`
- `npm run test:run`
