---
name: update-business-info
description: Change the business's phone, email, towns, services, hours or FAQ answers safely. Use when any contact detail or service list changes.
---

# Update business info

Only change a value the owner has given you. Do not guess hours, prices, licenses or service areas.

## Where each thing lives

| Change | Edit |
|---|---|
| Phone, text link, email, website, Facebook, Instagram, Google review link | the constants at the top of `src/shared/data.ts` (`PHONE`, `PHONE_TEL`, `PHONE_SMS`, `EMAIL`, `SITE_URL`, `SITE_HOST`, `FACEBOOK`, ...) |
| Towns served | `TOWNS` in `data.ts` |
| Services and their bullet lists | `SERVICE_GROUPS` in `data.ts` |
| FAQ questions and answers | `FAQ` in `data.ts` |
| Choices in the text helper | `JOB_TYPES` in `data.ts` |

## Plain-text copies to update by hand

The phone number and email also appear as plain text inside the **FAQ answers** and the **intro sentences** in `data.ts`, and in these places:

- `src/looks/*/App.tsx` hero copy and "Evening and weekend appointments" text (hours wording)
- `src/looks/legal/LegalPage.tsx` (the "Questions" section, and what the policies say about how people contact him)
- `index.html`, `a/index.html` ... meta descriptions (towns)
- `src/picker/Picker.tsx` (text mentioning the website)

Search before you finish: `phone digits`, `adam@`, `Roseville`, `evening`.

## If hours or services change

Terms and privacy say what the site does, not what he sells, so they rarely change. But if the way people contact him changes (a booking form, an online payment, a chat), **stop**: the privacy policy no longer matches. Ask the owner, and see `docs/LEGAL-NOTES.md`.

## Check

```bash
npm run typecheck && npm run build && npm run check
```

Then open `/print/` and confirm the card and flyer show the new details, and tap the Call and Text buttons on a phone-size page.
