// Makes phone-sized AVIF, WebP and JPEG versions of every job photo into <dist>/photos/<id>-<width>.<ext>.
// Source photos live in src/assets/jobs/<id>.jpg. Results are cached in .cache/photos so rebuilds are quick.
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs"
import { basename, join } from "node:path"
import sharp from "sharp"

export const WIDTHS = [480, 800, 1050]
const FORMATS = [
  ["avif", (s) => s.avif({ quality: 50, effort: 4 })],
  ["webp", (s) => s.webp({ quality: 74, effort: 5 })],
  ["jpg", (s) => s.jpeg({ quality: 76, mozjpeg: true, progressive: true })],
]

export async function buildPhotos(dist) {
  const src = "src/assets/jobs", cache = ".cache/photos", out = join(dist, "photos")
  mkdirSync(cache, { recursive: true }); mkdirSync(out, { recursive: true })
  let made = 0, files = 0
  for (const f of readdirSync(src).filter((n) => n.endsWith(".jpg"))) {
    const id = basename(f, ".jpg"), input = join(src, f), mtime = statSync(input).mtimeMs
    await Promise.all(WIDTHS.flatMap((w) => FORMATS.map(async ([ext, enc]) => {
      const name = `${id}-${w}.${ext}`, c = join(cache, name)
      if (!existsSync(c) || statSync(c).mtimeMs < mtime) {
        await enc(sharp(input).resize({ width: w, withoutEnlargement: true })).toFile(c)
        made++
      }
      copyFileSync(c, join(out, name)); files++
    })))
  }
  console.log(`photos: ${files} files in ${out} (${made} newly encoded)`)
}
