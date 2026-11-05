# First Man Handyman: website design concepts

Four ready-made designs for [firstmanhandyman.com](https://firstmanhandyman.com/), a handyman service by Adam Ingraham in Sheridan, CA (Roseville, Rocklin, Granite Bay, Loomis, Lincoln, Sheridan). They share the same real photos, reviews, phone number and tools. Only the look and the motion change.

| Look | Feel |
|---|---|
| **A Craftsman Light** | Warm paper, navy and orange. Calm and easy to read. |
| **B Night Shift** | Dark with amber light. A photo rail you grab and drag. |
| **C Sign Painter** | Loud and bold, like a truck door. A running ticker of what he fixes. |
| **D Blueprint** | Drafting-table blue. Lines draw themselves. |

Every design has: call and text buttons (a Call / Text bar on phones), recent-work photos that open larger (swipe, arrows, a link per job), the services list, reviews, FAQ, a "write the text for me" helper that opens your own texting app, a Terms of service and Privacy policy page (drafts), and printable cards and a flyer with a QR code at `/print/`.

These are **design concepts**. Nothing here changes the real website until Adam decides.

## For Adam (no coding)

- All his details (phone, email, towns, services, FAQ answers, reviews, job list) live in one file: `src/shared/data.ts`.
- Hand this folder to an AI assistant and tell it: **"Read AGENTS.md first."** It explains where everything is and ships step-by-step recipes (in `skills/`) for adding a photo, adding a review, changing details, choosing the look and publishing.
- The assistant is set up to ask you questions and show you a plan before it changes anything.

## For developers

```bash
npm install
npm run build        # builds dist/ (concept mode: noindex + robots Disallow)
npm run check        # accessibility, phone-width, keyboard and broken-image checks on every page
npm run perf         # speed test on a slow phone and slow 4G, compared with perf-budget.json
npm run serve        # serves dist/ at http://localhost:8290
```

`FMH_LAUNCH=1 npm run build` makes the indexable launch build. `npm run check` needs Chrome or Chromium (set `CHROME_PATH`, or run `npx playwright install chromium`).

Stack: React 18, TypeScript, Tailwind 3, Framer Motion, Radix primitives, Parcel. Fonts are self-hosted, there are no third-party requests, no cookies and no analytics.

```
src/shared/     content (data.ts), shared hooks, phone number component
src/looks/a-d/  the four designs (App, look.css tokens, fonts)
src/looks/legal terms and privacy page, used by each look
src/print/      printable cards and flyer, QR codes
src/picker/     the main page that lists the designs
scripts/        build, check, add-photo, serve
skills/         step-by-step recipes for an AI assistant
docs/           accessibility review, legal notes
```

## Licenses

Code: MIT, see `LICENSE`. **Photos, the business name, review text and contact details belong to Adam Ingraham / First Man Handyman, all rights reserved.** Third-party libraries and fonts are listed in `THIRD_PARTY_NOTICES.md`.
