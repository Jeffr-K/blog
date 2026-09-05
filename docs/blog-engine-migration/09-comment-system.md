# 09. Comment System

## Goal

Add comments to post detail pages without coupling the MDX content model to a specific comment provider.

## Current Context

- Posts are authored as localized MDX files.
- Post metadata is resolved from the MDX frontmatter.
- The project currently has no authentication provider, database, comment API, or moderation panel.
- The blog is aimed at developers and already exposes GitHub links in its site UI.

## Alternatives

### A. Giscus

Use GitHub Discussions as the comment store and embed the Giscus client on the post detail page.

Advantages:

- No application database or comment API is required.
- Users authenticate with GitHub OAuth.
- Moderation happens in GitHub Discussions.
- Reactions, lazy loading, localization, and custom themes are available.
- The provider supports mapping a page to a discussion by pathname or another stable value.

Tradeoffs:

- Comment authors need a GitHub account.
- The embedded UI is less flexible than a first-party component.
- The repository must be public, have Discussions enabled, and install the Giscus app.
- The project depends on GitHub Discussions and the provider's client behavior.

Reference: https://giscus.app/

### B. Utterances

Use GitHub Issues as the comment store and embed the Utterances widget.

Advantages:

- Very small integration surface.
- No separate database or backend is required.
- Comments remain inspectable and manageable as GitHub Issues.

Tradeoffs:

- The Issue model is less expressive than Discussions for long-term community features.
- Users still need GitHub OAuth.
- Threading, reactions, and moderation UX are more constrained.

Reference: https://utteranc.es/

### C. Supabase Auth + Postgres

Build a first-party comment UI backed by Supabase Auth and Postgres.

Advantages:

- Full control over the UI and interaction model.
- Supports custom profiles, nested replies, reactions, reports, notifications, and an admin view.
- The comment data is owned by the application rather than GitHub.
- Row Level Security can protect user-owned operations.

Tradeoffs:

- Requires authentication, database tables, policies, server/client clients, and API boundaries.
- Spam prevention, moderation, email notifications, and abuse handling become application work.
- Adds environment configuration and an external service dependency.

For Next.js SSR, use separate browser and server clients and validate server-side identity with the provider's documented claims flow. Do not authorize mutations from an unverified session object.

Reference: https://supabase.com/docs/guides/auth/server-side/nextjs

### D. Self-hosted comments

Operate a standalone comment service or a custom API and database.

Advantages:

- Maximum control over data, UI, authentication, and deployment.
- Provider lock-in is minimized.

Tradeoffs:

- Highest operational cost.
- Backups, upgrades, spam protection, abuse reports, monitoring, and mail delivery must be owned by the project.
- It is disproportionate for the current single-author blog stage.

## Decision

Start with Giscus for the first comment release. Keep the integration behind a project-owned component so the provider can be replaced later without changing post MDX files.

The first repository configuration is:

```text
Repository: Jeffr-K/comments
Category: comments
Repository ID: R_kgDOUM13qg
Category ID: DIC_kwDOUM13qs4DEx1W
Mapping: pathname
```

These identifiers are public GitHub resource identifiers, not secrets. They are centralized in `shared/lib/comments/giscus.ts`.

The provider boundary should look like this:

```text
Post detail page
  -> PostComments
    -> CommentProvider
      -> Giscus adapter
```

The MDX content should not contain comment components. Comments belong to the post detail layout, after the article body and before the article footer.

## Thread Identity

Do not use the full localized URL as the only identity unless Korean and Japanese discussions should be completely separate.

Preferred provider mapping:

```ts
type CommentThreadKey = {
  postSlug: string;
  locale: "ko" | "ja";
};
```

For the initial release, use `postSlug + locale` so readers are not placed into a mixed-language thread. If the project later wants one shared discussion per article, use a locale-independent canonical post key instead.

## First Release Behavior

- Render comments only on post detail pages.
- Load the widget lazily near the comments section.
- Match the site's light and dark themes through the shared `ThemeProvider`.
- Use the page locale for the widget language.
- Display a compact section heading and comment count when metadata is available.
- Show a provider-specific loading state and a neutral fallback when configuration is missing.
- Keep the widget disabled in local development unless required environment variables are present.
- Keep provider configuration in environment variables, not in MDX files.

## Future First-Party Model

If the project outgrows Giscus, the minimum application model is:

```text
users
- id
- provider
- provider_user_id
- name
- avatar_url

comments
- id
- post_slug
- locale
- user_id
- parent_id
- body
- status
- created_at
- updated_at
- deleted_at
```

Required statuses are `published`, `pending`, `hidden`, and `deleted`. `parent_id` should be limited to one reply level initially to keep the UI and moderation model predictable.

## Security And Moderation

- Only authenticated users can create comments.
- Only the author and an administrator can edit or delete a comment.
- Validate and sanitize comment content on the server.
- Apply request rate limits and a maximum body length.
- Treat links and rendered HTML as untrusted input.
- Keep deletion reversible with a `deleted` state where possible.
- Provide a report path before enabling public comments.
- Never trust client-provided author IDs or moderator flags.

## Implementation Order

1. Document the provider boundary and thread identity.
2. Add the `PostComments` client component and Giscus adapter.
3. Add locale-aware theme and configuration handling.
4. Add loading, unavailable, and error states.
5. Verify the widget on Korean and Japanese post detail routes.
6. Reassess Supabase only when custom identity, replies, moderation, or notifications are actual requirements.

## Verification

- Comments appear only on post detail pages.
- Korean and Japanese routes map to the intended discussion threads.
- The widget follows the site theme.
- Missing configuration does not break article rendering.
- The comments section does not affect MDX compilation.
- `npm run lint`
- `npm run build`
