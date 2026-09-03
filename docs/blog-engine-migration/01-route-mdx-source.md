# 01. Route MDX Source

## Goal

Make the public blog list and detail routes read post data from files under `content/posts` instead of the hardcoded `shared/data/posts.ts` dataset.

## Scope

- Replace `/[locale]/posts` list data with `getAllPostsMeta(locale)`.
- Replace `/[locale]/posts/[slug]` detail data with `compilePost(slug, locale)`.
- Keep the existing visual layout: list cards, detail article frame, profile sidebar, and TOC sidebar.
- Keep `shared/data/posts.ts` available until all downstream consumers are migrated.

## Constraints

- Missing locale files should not crash the route.
- Draft posts should stay hidden from public lists and static params.
- The migration should not change the careers routes.

## Verification

- `npm run lint`
- `npm run build`
- `/ko/posts` returns 200.
- `/ko/posts/why-rust-is-worth-learning` returns 200.

