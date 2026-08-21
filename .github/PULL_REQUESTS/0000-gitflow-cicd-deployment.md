# GitFlow, CI/CD, Deployment

## Current State

- GitFlow rules are documented in `.github/CONTRIBUTING.md`.
- PR templates exist for `feature`, `release`, and `hotfix`.
- CI is defined in `.github/workflows/ci.yml`.
- Deployment workflow is intentionally not enabled yet because the production provider and secrets must be decided first.

## Branch Strategy

| Branch | Purpose | Merge Target |
|--------|---------|--------------|
| `feature/*` | Feature work | `develop` |
| `fix/*` | Non-urgent bug fixes | `develop` |
| `release/*` | Release hardening | `main`, then back to `develop` |
| `hotfix/*` | Production emergency fixes | `main`, then back to `develop` |
| `develop` | Integration branch | `release/*` |
| `main` | Production branch | production deployment |

## CI Policy

CI runs on:

- Pull requests targeting `develop` or `main`
- Pushes to `develop` or `main`

Required checks:

- `npm ci`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run test:run`
- `npm run build`

## Deployment Recommendation

Use Vercel as the default production target for this project.

Reasons:

- This is a Next.js 16 App Router project.
- The app uses `next/font`, `proxy.ts`, server components, external fetch with revalidation, and framework-native routing.
- Vercel is the reference deployment platform for Next.js and usually has the least operational friction for framework updates.

Netlify is a viable alternative, especially if the team already standardizes on Netlify, but Vercel should be the first choice unless there is an organizational reason to prefer Netlify.

## Recommended CD Model

Use provider-managed deployment first:

- `develop` -> preview/staging deployment
- PRs -> preview deployments
- `main` -> production deployment

Keep GitHub Actions responsible for validation, not deployment, unless there is a specific need for GitHub-controlled promotion.

## Required Vercel Setup

1. Connect the GitHub repository to Vercel.
2. Set production branch to `main`.
3. Keep preview deployments enabled for pull requests.
4. Add environment variables in Vercel project settings if needed.
5. Protect `main` and `develop` in GitHub branch protection rules.
6. Require the `CI / Validate` check before merge.

## Before Enabling Production Deployment

Current project quality gates must pass:

- Lint errors must be fixed.
- TypeScript errors from unused MDX infrastructure or missing MDX packages must be resolved.
- `npm run build` must complete reliably in CI. External RSS fetching should use timeout/fallback behavior so builds do not hang on network issues.
