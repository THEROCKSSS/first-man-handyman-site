---
name: check-site
description: Run the site's own tests (phones, keyboard, readability, broken images) and report real results. Use before calling any change done, and before publishing.
---

# Check the site

```bash
npm run typecheck && npm run build && npm run check
```

`npm run check` serves `dist/` and, for every page at 1280, 375 and 320 px wide, checks:

- no sideways scroll
- no console errors, failed requests or broken images
- zero accessibility violations (axe-core, WCAG 2.1 A and AA plus best practices)
- the skip link is the first Tab stop
- every control you can Tab to shows a visible focus ring

It prints each failure and exits with an error if any. If it cannot find a browser, install Chrome, run `npx playwright install chromium`, or set `CHROME_PATH`.

## Also look yourself

The script cannot judge looks. Open the changed page in a real browser at phone width (375) and laptop width (1280), and check:

- text is readable, nothing overlaps, buttons are easy to hit
- the Call and Text buttons work
- the photo viewer opens, swipes or uses arrow keys, and closes with Escape
- turn on "reduce motion" in the operating system: pages should still work and nothing should loop

## Report honestly

Say which commands you ran and their real output. If a check failed, say so and fix it or ask. If you could not check something (a real phone, a screen reader), say that. Never write "all good" from memory.
