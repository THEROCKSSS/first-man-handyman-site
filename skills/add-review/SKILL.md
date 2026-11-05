---
name: add-review
description: Add a customer review to the site exactly as written. Use when the owner gives you a real Google review to show.
---

# Add a review

Reviews are real people's words. Never invent, edit, shorten, merge or "improve" one.

## Ask the owner

1. The review text, **word for word** (copy and paste from Google).
2. The reviewer's name **as Google shows it**.
3. Confirm it is a public Google review (the site says "Google review").

## Do it

Edit `REVIEWS` in `src/shared/data.ts`:

```ts
{ name: "First Last", text: "The review exactly as written." },
```

- Keep spelling, punctuation and capital letters exactly as the reviewer wrote them, even mistakes.
- Straight apostrophes are fine; do not add quote marks around the text (the design adds them).
- The first review is shown biggest on A, B and C. Put the owner's choice first.
- Looks A, B and C lay out three reviews well. With more than three, ask the owner which three to show, or ask before changing the layout.

## Check

```bash
npm run typecheck && npm run build && npm run check
```

View `#reviews` on each look at phone width. Night Shift rotates its quote; make sure the new one appears and the Pause button still works.
