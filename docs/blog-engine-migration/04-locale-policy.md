# 04. Locale Policy

## Goal

Define and implement consistent behavior when a post exists in one locale but not another.

## Options

- 404 missing locale files.
- Fallback to the default locale.
- Hide posts from locale-specific lists when that locale file is missing.

## Preferred Policy

Hide missing-locale posts from locale-specific lists and return 404 for a direct missing-locale detail route.

## Scope

- Make list pages locale-specific.
- Make static params include only real locale files.
- Keep language switch links from pointing to missing post translations unless a fallback is intentionally implemented.

## Verification

- `/ko/posts` includes only Korean MDX files.
- `/ja/posts` includes only Japanese MDX files.
- Direct request for a missing locale detail route returns 404.
- `npm run build`

