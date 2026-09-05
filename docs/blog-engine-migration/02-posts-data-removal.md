# 02. Remove Hardcoded Posts Data

## Goal

Remove the production dependency on `shared/data/posts.ts` after routes and components can consume MDX metadata and compiled content.

## Scope

- Delete or shrink `shared/data/posts.ts` once no public route imports it.
- Update post card, post content, tag sidebar, home hot articles, and category counts to use MDX metadata or dedicated lightweight data.
- Preserve URL slugs and visible copy.

## Constraints

- Do not remove category definitions from `shared/data/categories.ts`.
- Avoid changing the current page layout while removing the old data model.
- If home sections still need curated posts, introduce a small explicit curated list instead of restoring the old full post dataset.

## Verification

- `rg "shared/data/posts|getPost\\(|posts\\." app shared`
- `npm run lint`
- `npm run build`

