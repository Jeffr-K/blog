# 05. Discovery, Search, And Pagination

## Goal

Improve post discovery once the source of truth is MDX.

## Scope

- Add query-based search over title, excerpt, category, and tags.
- Add predictable pagination for long post lists.
- Keep category filtering compatible with search and pagination.
- Ensure empty states are deliberate and localized.

## Constraints

- Search should be server-rendered from metadata, not client-only.
- Pagination URLs should be stable and shareable.
- Avoid adding a search service until local metadata search is insufficient.

## Verification

- `/ko/posts?q=rust`
- `/ko/posts?category=tech&page=1`
- Empty search result renders a useful empty state.
- `npm run lint`
- `npm run build`

