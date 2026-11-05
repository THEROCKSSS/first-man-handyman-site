---
name: add-job-photo
description: Add a new job photo to Recent work on every look. Compresses the picture, adds it to the job list and rebuilds. Use when the owner gives you a photo of finished work.
---

# Add a job photo

Follow `skills/change-workflow` first if the request is more than "add this photo".

## Ask the owner (one at a time, with your recommendation)

1. **Which photo?** One image file, or a before/after picture he already made.
2. **Title** (2 to 4 words, like "Toilet replacement") and **one line** that says what was done ("Old toilet out, new one in"). Use his words. Do not make up details.
3. **Kind.** `after` for a single photo, `before-after` for a side-by-side picture, `yard` for outside work.
4. Permission: the customer's home is in the photo. Confirm there are no faces, house numbers or license plates, or that the customer is fine with it.

## Do it

```bash
node scripts/add-photo.mjs path/to/photo.jpg --id patio-2 --title "Patio repair" --note "Rotted boards replaced" --kind after
npm run typecheck && npm run build && npm run check && npm run perf
```

The script shrinks the photo to 1400px wide, saves it in `src/assets/jobs/`, and adds it as the **last** job in `src/shared/data.ts`. The build then makes the small AVIF/WebP/JPEG versions by itself. To show it first, move its line to the top of `JOBS`. If `npm run perf` complains about weight, the photo is probably huge; resize it before adding.

## Check

- Open `/a/`, `/b/`, `/c/`, `/d/`: the photo appears in Recent work and opens larger when tapped. The Night Shift rail should scroll to it.
- `npm run check` passes.
- Do not add an `alt` text to the gallery card; the caption names it. The viewer builds its alt text from the title and note.
