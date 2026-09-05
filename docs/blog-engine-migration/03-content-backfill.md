# 03. Content Backfill

## Goal

Move the existing six hardcoded articles into the MDX content tree.

## Scope

- Create `content/posts/<slug>/index.ko.md` for every existing Korean article.
- Create `content/posts/<slug>/index.ja.md` for every existing Japanese article.
- Preserve title, excerpt, category, tags, date, and read time intent through frontmatter and content.
- Use the conventions in `docs/WRITING_GUIDE.md`.

## Constraints

- Keep slugs stable.
- Do not invent external facts for article bodies.
- If a Japanese article currently has less content than Korean, preserve that state rather than silently generating a full translation.

## Verification

- `find content/posts -name 'index.*.md'`
- `npm run build`
- Confirm each expected `/ko/posts/<slug>` and `/ja/posts/<slug>` route renders or follows the chosen missing-locale policy.

