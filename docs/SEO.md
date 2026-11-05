# SEO and launch

Goal: show up when people search for a handyman in Roseville, Rocklin, Granite Bay, Loomis, Lincoln or Sheridan, CA.
First Man Handyman is a **service-area business with no storefront**, so nothing here publishes a street address.

## What the launch build does

`FMH_LAUNCH=1 npm run build` (needs Chrome, see README):

| Item | Detail |
|---|---|
| One home page | The launch look (`LAUNCH_LOOK` in `src/areas/active-look.ts`, or `FMH_LOOK=b`) becomes `/`. The picker, the other looks and their pages are removed, so search engines never see duplicate designs. |
| Town pages | `/areas/` plus `/areas/roseville/`, `/rocklin/`, `/granite-bay/`, `/loomis/`, `/lincoln/`, `/sheridan/`. Plain HTML, no JavaScript, about 100 KB. Each has its own title, description, services, recent work and the real reviews. |
| Titles and descriptions | One per page, written in `scripts/seo.mjs` (`indexablePages`). Lengths are enforced. |
| Canonical links, share preview | Every public page. `og.jpg` is cut from a real job photo. |
| Structured data | `HomeAndConstructionBusiness` with the phone, the six towns as `areaServed`, services, social links; breadcrumbs on inner pages. Town of Sheridan only, no street address. **No rating, review count or price is published**, because none is verified. |
| `sitemap.xml`, `robots.txt` | Generated. Print cards stay `noindex`. |
| Home and legal pages | Saved as HTML (so crawlers read the text); React still takes over in the browser. |
| Security meta tag | A Content-Security-Policy `<meta>` on every page, launch or not. |

Check it: `npm run seo-check` builds the launch version and fails on any missing title, description, canonical, h1, structured data, sitemap entry, broken link, invented address or rating.

## Never do

- Do not invent local facts. A town page's only unique text is real: put Adam's own words in `AREA_NOTES` in `src/shared/data.ts` (a job he did there, what people in that town ask for). Pages without notes are thin and rank lower; pages with a real note rank better.
- Do not make near-identical pages for more towns just to catch searches. Google treats those as doorway pages.
- Do not add a street address, a rating or a review count unless the owner supplies it and it can be shown to be true.

## What only Adam can do (this decides most of the local ranking)

1. **Google Business Profile.** Create or claim it at business.google.com. Choose "service-area business", **hide the address**, add the six towns as the service area, add the phone, the website `https://firstmanhandyman.com/`, the categories "Handyman" and optionally "Home improvement", his hours (or "by appointment"), and 6 to 10 of the real job photos. This is the single biggest factor for "handyman near me".
2. **Reviews.** Ask each happy customer to leave a Google review (the link is on the site). Reply to every review. More, recent, real reviews beat any page change here.
3. **Same details everywhere.** Business name, phone and website identical on Google, Facebook, Instagram, Nextdoor, Yelp, Thumbtack, Angi, Apple Maps and Bing Places. Use "First Man Handyman" exactly.
4. **Search Console.** Add the site at search.google.com/search-console, then submit `https://firstmanhandyman.com/sitemap.xml`. Do the same in Bing Webmaster Tools.
5. **Real local notes** for `AREA_NOTES` (see above).

## Before the launch build goes live

- Owner says go (AGENTS.md rule 7).
- Pick the look, set `LAUNCH_LOOK` and the two imports in `src/areas/active-look.ts` to match.
- `npm run typecheck && npm run build && npm run check && npm run perf && npm run seo-check`.
- Host it on a CDN host that sends security headers and compresses (Cloudflare Pages, Netlify): HSTS, a real `Content-Security-Policy` header including `frame-ancestors 'none'`, `X-Content-Type-Options`, `Referrer-Policy`. `scripts/serve.mjs` shows the values.
- Point `firstmanhandyman.com` at the new host. If the old site has pages people link to, keep or redirect those addresses.
- Have Adam read the Terms and Privacy drafts (docs/LEGAL-NOTES.md).

## What is not here

Rankings cannot be promised or tested from this repository. Expect weeks, not days, before Google shows the new pages, and months for competitive searches like "handyman Roseville".
