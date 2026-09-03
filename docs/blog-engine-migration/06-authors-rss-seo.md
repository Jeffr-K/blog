# 06. Authors, RSS, And SEO

## Goal

Round out the blog engine with author modeling, feed output, and route-level metadata.

## Scope

- Introduce an author registry keyed by frontmatter author IDs.
- Generate detail metadata from MDX frontmatter.
- Connect RSS/feed generation to MDX metadata instead of hardcoded posts.
- Consider JSON-LD for articles once metadata is stable.

## Constraints

- Author IDs in frontmatter should validate against the registry.
- Feed output should not include drafts.
- Metadata should be locale-aware.

## Verification

- RSS/feed output contains MDX posts.
- Detail pages expose title and description from frontmatter.
- `npm run lint`
- `npm run build`

