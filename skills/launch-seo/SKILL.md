---
name: launch-seo
description: Build the search-ready launch version, run the SEO, speed and accessibility checks, and add local detail to the town pages. Use when preparing to launch, or when asked about Google, SEO or the town pages.
---

# Launch and SEO

Read `docs/SEO.md` first. It lists what the launch build does and what only Adam can do.

## Ask the owner (one at a time, with your recommendation)

1. **Which look is the home page?** (a, b, c or d). It must be set in `src/areas/active-look.ts` (two imports and `LAUNCH_LOOK`).
2. **Any real local detail?** One or two sentences per town from Adam himself: a job he did there, what people there ask for. Put each in `AREA_NOTES` in `src/shared/data.ts`. Never write these yourself.
3. **Is it the owner's go to launch?** Do not go live without a clear yes (see `publish-site`).

## Do it

```bash
npm run typecheck && npm run build && npm run check && npm run perf && npm run seo-check
```

`npm run seo-check` builds the launch version into `dist-launch/` and must say "All SEO checks passed". The launch build needs Chrome (set `CHROME_PATH`).

## Rules

- No invented facts, ratings, review counts, prices or street address. This is a service-area business with no storefront.
- No new near-duplicate town pages.
- If a title, description or town page changes, change it in `scripts/seo.mjs` or `src/areas/`, not in the built files.

## Hand to Adam

The Google Business Profile, asking for reviews, matching details on other sites, and Search Console. Those are in `docs/SEO.md`. Offer to walk him through them.
