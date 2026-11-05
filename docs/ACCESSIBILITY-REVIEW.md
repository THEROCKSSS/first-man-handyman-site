# Accessibility and interface review: all four looks

**Standard:** WCAG 2.1 AA, plus the Web Interface Guidelines (Vercel, fetched fresh 2026-11-04)
**Pages:** picker, A Craftsman Light, B Night Shift, C Sign Painter, D Blueprint, at 1280 and 375 wide
**Method:** axe-core 4 (wcag2a/2aa/21a/21aa + best-practice) on the live public build, contrast computed from each look's real color tokens, keyboard walk (70 Tab stops per look), 320px reflow, 200% text zoom, source review against the guideline rules.
**Not done:** no screen-reader session (ARIA and the accessibility tree were checked instead). Automated tools find roughly a third of issues, so treat this as a strong first pass, not a certificate.

## Summary

| Page | axe violations | Critical | Serious | Moderate |
|---|---|---|---|---|
| Picker | 0 | 0 | 0 | 0 |
| A Craftsman Light | 3 kinds | 1 | 1 | 1 |
| B Night Shift | 2 kinds | 0 | 1 | 1 |
| C Sign Painter | 4 kinds | 0 | 3 | 1 |
| D Blueprint | 2 kinds | 0 | 1 | 1 |

Nothing blocked a customer from calling, texting or seeing the photos. Every issue below was fixable without changing how any look appears.

## What passes

- One `h1`, headings in order, `lang="en"`, one `main`, a `nav`, on every page.
- Keyboard: 69 to 70 Tab stops per look, every one shows a visible focus ring, none is hidden under the sticky header. Photo viewer traps focus, closes on Escape, returns focus.
- Reflow at 320px wide: no sideways scroll on any look. 200% text zoom: no sideways scroll.
- Reduced motion respected everywhere (B falls back to a plain swipe gallery, C's ticker stops, counters show final numbers).
- Real alt text on every photo, decorative icons hidden from assistive tech, explicit image width/height, lazy loading below the fold.
- Text contrast: 42 of 48 token pairs pass. The 6 that fail are pairs not used for text (see table). axe found exactly one real text-contrast failure (C, below).

## Findings

### Perceivable

| # | Look | Issue | Criterion | Severity | Fix |
|---|---|---|---|---|---|
| 1 | C | Review-card byline "· Google review" on the orange card is 4.06:1 (needs 4.5:1) | 1.4.3 | Serious | Drop the 70% opacity on that card |
| 2 | A, B | Form fields and unselected job chips use a faint hairline border (page hairline measures 1.37:1 in A, 1.56:1 in B; 3:1 needed for the edge of a control). To be re-measured on the real controls after the fix | 1.4.11 | Major | Stronger border color on inputs, select, textarea and chips in A and B |
| 3 | A, C | Orange used as a fill against paper is 2.83:1 and 2.52:1. Buttons have a text label so this passes, but a 1px ink edge would make the buttons stand out better | 1.4.11 | Minor | Optional |

### Operable

| # | Look | Issue | Criterion | Severity | Fix |
|---|---|---|---|---|---|
| 4 | C | Ticker loops for 46 seconds forever; it pauses on hover or focus but has no pause button | 2.2.2 | Major | Add a visible Pause / Play button |
| 5 | B | Review quote auto-advances every 8 seconds; pauses on hover and focus but no pause button | 2.2.2 | Major | Add a Pause / Play button |
| 6 | B, C, D | No "skip to content" link (A has one) | 2.4.1 | Major | Add it |
| 7 | All | Header nav links are 26px tall; standalone text links (Facebook, "All recent jobs", email, social) 22 to 30px; "All recent jobs" and "All figures" are under the 24px minimum | 2.5.8, 2.5.5 | Minor | Pad the hit area to 44px; the look does not change |
| 8 | B | The "Recent work" strip hijacks vertical scrolling to move sideways (scroll-jacking), no way to grab it | 2.1, predictability | Minor | Replace with a drag rail (in the plan) |
| 9 | All | Focus can land under the sticky header or the phone call bar on long pages (currently fine in tests, but only because of anchor margins) | 2.4.7 | Minor | `scroll-padding` top and bottom |

### Understandable

| # | Look | Issue | Criterion | Severity | Fix |
|---|---|---|---|---|---|
| 10 | All | Text helper `select` and `textarea` have no `name` or `autocomplete`; placeholder does not end in "…" | 3.3.2, guideline | Minor | Add them |
| 11 | All | Phone number breaks at its hyphen on narrow widths ("916-910-" / "5423") | 1.3.1 readability | Minor | Keep the number on one line |

### Robust

| # | Look | Issue | Criterion | Severity | Fix |
|---|---|---|---|---|---|
| 12 | A | Service tabs: inactive tabs point to panels that are not on the page (invalid `aria-controls`) | 4.1.2 | **Critical** | Replace with plain toggle buttons (it is a filter, not true tabs) |
| 13 | All | Photo buttons: accessible name ("Open photo: Toilet replacement") does not contain the visible caption text; also C hero link and D logo link (14 elements in A and D) | 2.5.3 | Serious | Let the name come from the visible caption |
| 14 | C | `aria-label` on a plain `div` ("5 stars") | 4.1.2 | Serious | `role="img"` |
| 15 | All | Contact block, footer and the phone-only call bar sit outside any landmark (13 to 15 elements) | 1.3.1 | Moderate | Put contact inside `main`, footer as `footer`, call bar as a labelled `nav` |

## Color contrast (from the real tokens)

| Pair | A | B | C | D | Needs |
|---|---|---|---|---|---|
| Body text on page | 15.3 | 15.6 | 14.8 | 13.9 | 4.5 |
| Muted text on page | 7.2 | 8.6 | 8.5 | 9.0 | 4.5 |
| Muted text on card | 7.5 | 7.9 | 9.6 | 7.9 | 4.5 |
| Accent text on page | 5.9 | 10.0 | 6.5 | 9.1 | 4.5 |
| Button label on orange/amber | 5.7 | 8.4 | 6.1 | 8.1 | 4.5 |
| Light text on dark band | 13.9 | 16.9 | 14.7 | 16.2 | 4.5 |
| Muted text on dark band | 8.3 | 9.4 | 9.5 | 10.4 | 4.5 |

Rows that fail but are not text on that background: orange as text on paper (A, C: never used that way), page hairlines (A, B: decorative separators, see finding 2 for real control edges).

## Web Interface Guidelines: what was checked and where we differ on purpose

- Pass: no `transition: all`, only transform and opacity animated, reduced motion honored, `color-scheme: dark` on dark looks, `theme-color` set, images sized, hover states present, headings balanced, no blocked paste, no zoom lock.
- Add: `touch-action: manipulation`, `overscroll-behavior: contain` in the photo viewer, intentional tap-highlight color, `translate="no"` on the business name, native `select` option colors on the dark looks, `aria-live` is already on the text helper and the toast.
- Differ on purpose: the guidelines ask for Title Case, second person, and no first person. We kept sentence case (a design rule from your unslop skill) and Adam's first-person voice, which is how his own site is written.
- Later: filters and the open FAQ item are not in the URL (photo viewer is). Low value for a handyman page.

## Priority fixes

1. Critical 12 (A tabs), serious 13, 14, 1.
2. Skip links (6), pause controls (4, 5), landmarks (15), stronger control borders (2).
3. Touch targets, phone wrap, form attributes, focus padding, polish (7 to 11, 3).

## Status: fixed 2026-11-04

All 15 findings were fixed in the next round, then re-tested with `npm run check` (10 pages at 1280, 375 and 320 px): zero axe violations, no sideways scroll, no console errors or broken images, skip link first on every page, visible focus on every control.

| # | Fix |
|---|---|
| 1 | Removed the 70% opacity on the review byline |
| 2 | Form fields and unselected chips now use a stronger border (A and B); D already did |
| 4, 5 | Pause / Play buttons on the Sign Painter ticker and the Night Shift quotes |
| 6 | Skip link on every page |
| 7 | Invisible 44px hit area on every text link; phone buttons raised to 44px |
| 8 | Night Shift gallery is now a drag rail (mouse and touch), with arrow buttons and arrow keys; no scroll-jacking |
| 9 | `scroll-padding` keeps focus clear of the sticky header and call bar |
| 10 | Form fields have name and autocomplete; placeholder ends in an ellipsis |
| 11 | Phone number never breaks across lines |
| 12 | Look A service filter is plain toggle buttons (no tab roles) |
| 13 | Photo buttons take their name from the visible caption |
| 14 | Star rating is `role="img"` |
| 15 | Contact, footer and the call bar are inside landmarks |

Still true: no screen-reader pass. Tap-target sizes in the earlier scan measured the visible text only; the hit area is now 44px tall.
