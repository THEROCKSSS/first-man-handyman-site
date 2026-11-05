---
name: publish-site
description: Build the finished site and upload it. Use only after the owner says to publish.
---

# Publish the site

**Do not publish without the owner's clear yes.** Publishing a website for a real business is public and hard to take back.

## Before

1. Run `skills/check-site`. Everything must pass.
2. Confirm with the owner:
   - which look is the home page (`skills/choose-the-look`)
   - the Terms and Privacy pages have been **read by Adam and ideally checked by a professional** (see `docs/LEGAL-NOTES.md`). They carry a "Draft for review" banner at the top of `src/looks/legal/LegalPage.tsx`. Remove it only when he approves.
   - the host (any static host works: Netlify, Cloudflare Pages, GitHub Pages with a custom domain, or his current web host) and who controls the domain
3. The old WordPress site stays up until the new one is checked on its real address.

## Build

Concept build (default) is hidden from search engines. The real site must be indexable:

```bash
FMH_LAUNCH=1 npm run build
```

On Windows PowerShell: `$env:FMH_LAUNCH="1"; npm run build`.

## Upload

Upload the **contents of `dist/`** to the host's root. The site expects to live at the domain root (`/`), not in a sub-folder. Static hosts need no server code.

## After

- Open the live address on a phone and a laptop. Tap Call, Text, a photo, the FAQ.
- Open `/robots.txt`: it must say `Allow: /`.
- Tell the owner the address and what was published. Keep a note of how to undo (put the old site back).
