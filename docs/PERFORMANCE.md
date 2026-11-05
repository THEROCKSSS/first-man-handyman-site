# Performance

Measured with `npm run perf`: a slow phone (CPU 4x slower), slow 4G (1.6 Mbps, 150 ms), first visit, real compressed bytes.
Budgets live in `perf-budget.json`. The test fails if a page gets heavier or slower than its budget. Byte budgets are tight, time budgets have headroom because timings vary between runs.

## What is already done

| Item | How |
|---|---|
| Modern image formats | Every photo is built as AVIF, WebP and JPEG at 480, 800 and 1050 px (`scripts/images.mjs`). `src/shared/Photo.tsx` serves the right one. |
| Lazy images | Everything below the first screen is `loading="lazy"`; the first screen is eager. Width and height are set, so nothing jumps. |
| Compression | `npm run build` writes Brotli and gzip copies. `scripts/serve.mjs` serves them with long caching for hashed files. |
| Browser caching | Hashed files: one year, immutable. Pages: always revalidated. |
| Self-hosted fonts, few weights | Two files per look, preloaded. |
| Split JavaScript | One bundle per page. The photo viewer loads only when needed (and is fetched when the browser is idle). |
| Fewer dependencies | Unused packages removed. |
| Debounce | The text-helper preview that screen readers hear waits until typing stops. |
| Loading placeholders | Photos have a soft color behind them; the viewer shows a skeleton. |
| No third-party scripts | None. Rule 4 in AGENTS.md. |

## Backend items from the general checklist

This is a static site: no server code, no database, no API, no AI responses. These do not apply, and should not be added: Redis, queues, N+1, indexes, connection pools, timeouts, OpenTelemetry, load balancing, pagination, streaming, optimistic updates, duplicate-request prevention.

If a backend ever appears, use the `web-performance-checklist` and `backend-patterns` skills first.

## What the host should do

Serve `dist/` from a CDN host that does Brotli and caching by itself (Cloudflare Pages, Netlify, GitHub Pages). `scripts/serve.mjs` shows the exact headers to copy.

## Not used on purpose

Real-user speed tracking. It means tracking visitors, which the privacy policy says does not happen. `npm run perf` on a throttled phone is the replacement.
