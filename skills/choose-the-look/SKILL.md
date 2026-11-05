---
name: choose-the-look
description: Make one of the four designs (a, b, c or d) the home page of the real site. Use when the owner has picked a look.
---

# Choose the look

The four looks live at `/a/`, `/b/`, `/c/`, `/d/` and the picker is at `/`. For the real site, one look becomes `/`.

## Ask the owner

1. **Which look?** Show him the picker first (`npm run serve`, open http://localhost:8290/).
2. Does he want the other looks deleted, or kept as unlisted pages? Recommend **delete** for a real launch (less to maintain), but never delete without a yes.

## Do it (example: look `b`)

1. `index.html`: change the script tag to `<script type="module" src="./src/looks/b/main.tsx"></script>`, and copy the `<title>`, `theme-color` and description from `b/index.html`.
2. Add root pages the look's footer links to: copy `b/legal/index.html` to `legal/index.html` and fix its script path to `../src/looks/b/legal.tsx`. The footer links `legal/#terms` and `../print/` then resolve to `/legal/` and `/print/`.
3. `scripts/build.mjs`: add `legal/index.html` to `entries`. Remove the entries of looks he does not want, and the picker-only content.
4. If other looks are removed, remove their folders (`a/`, `c/`, `d/`, `src/looks/<x>`), but keep `src/looks/legal` and `src/print`. The print page still shows all four card designs; ask the owner whether to keep that.
5. Launch only on the owner's go: `FMH_LAUNCH=1 npm run build`.

## Check

```bash
npm run typecheck && npm run build && npm run check
```

`npm run check` lists pages in `scripts/check.mjs` (`PAGES`). Update that list to match what exists, then open `/` and tap through every link.
