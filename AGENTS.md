# AGENTS.md: read this first

This repo is the website for **First Man Handyman**, a real handyman business owned by Adam Ingraham (Sheridan, CA). Four design concepts, one set of real content.

## Before you change anything

Follow `skills/change-workflow/SKILL.md`. In short: inspect, ask the owner questions one at a time with your recommended answer, write a short plan, **wait for a yes**, then build and verify. Skip the interview only for a one-line fix, or when the owner says "just do it".

## Where things are

| What | Where |
|---|---|
| Every fact (phone, email, towns, services, FAQ, reviews, job photos list) | `src/shared/data.ts` |
| Shared behavior (photo viewer, text helper) | `src/shared/hooks.tsx` |
| The four designs | `src/looks/a`, `b`, `c`, `d` (each: `App.tsx`, `look.css` colors and fonts, `fonts.ts`) |
| Terms and privacy page | `src/looks/legal/LegalPage.tsx` (entry files: `src/looks/<x>/legal.tsx`, `<x>/legal/index.html`) |
| Printable cards, flyer, QR codes | `src/print/` |
| Town pages (`/areas/...`) and which look they use | `src/areas/` (`active-look.ts` picks the launch look) |
| Titles, descriptions, structured data, sitemap, security meta tag | `scripts/seo.mjs`; rules in `docs/SEO.md` |
| Main page listing the designs | `src/picker/Picker.tsx` and `index.html` |
| Photos | `src/assets/jobs/<id>.jpg` (originals, one per job). The build makes AVIF/WebP/JPEG sizes into `dist/photos/`. Preview images in `src/assets/thumbs/` |
| Build, check, add-photo | `scripts/` |
| Recipes | `skills/<name>/SKILL.md` |

## Rules that do not bend

1. **Never invent facts.** No made-up prices, years in business, license numbers, insurance, guarantees, counts or awards. If it is not in `data.ts` or from the owner, ask.
2. **Reviews are word for word** with the reviewer's real name. Do not fix spelling, shorten or combine them.
3. **Phone, email and site address live in `data.ts` only.** Use `PHONE`, `PHONE_TEL`, `PHONE_SMS`, `EMAIL`, `SITE_URL`. FAQ answers in that file contain them as plain text, so update those too.
4. **Do not add tracking**, analytics, cookies, third-party scripts, remote fonts or a backend. The privacy policy promises none of these.
5. **Accessibility is a gate.** `npm run check` must pass before anything is called done (no sideways scroll at 320, 375 and 1280 px, zero axe violations, skip link first, visible focus). Keep tap targets at 44px, keep text contrast at 4.5:1.
6. **Mobile changes go in media queries.** Do not alter desktop layout to fix a phone.
7. **Do not publish or deploy** without the owner's yes. The default build is a concept build (noindex). Only `FMH_LAUNCH=1` makes it indexable, and only on the owner's go.
8. **Build with `npm run build`**, not a raw Parcel command (Git Bash rewrites `--public-url /` and breaks every asset link).
9. **Add photos with `node scripts/add-photo.mjs`** so they are compressed and listed correctly.
10. Sentence-case headings, calm copy, no emoji, no hype words. Adam writes in first person ("I").

## Search

12. **Local SEO facts are real or absent.** No invented town details, ratings, review counts, prices or street address (service-area business, no storefront). Town text from Adam goes in `AREA_NOTES` in `data.ts`. `npm run seo-check` must pass before a launch build. Details: `docs/SEO.md`, recipe `skills/launch-seo`.

## Speed

11. **`npm run perf` must pass** after any change that adds images, scripts or fonts. Budgets are in `perf-budget.json`; do not raise them without the owner. Details: `docs/PERFORMANCE.md`.

## Commands

```bash
npm run typecheck && npm run build && npm run check && npm run perf && npm run seo-check
```

## Known leftovers

If `src/components/` exists it is an unused starter folder, ignored by git and excluded in `tsconfig.json`. It can be deleted.

## Skills

`add-job-photo`, `add-review`, `update-business-info`, `choose-the-look`, `check-site`, `publish-site`, `change-workflow`.
