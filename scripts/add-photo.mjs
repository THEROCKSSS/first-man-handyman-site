// Add a job photo to "Recent work".
//   node scripts/add-photo.mjs <image-file> --id patio-2 --title "Patio repair" --note "Rotted boards replaced" --kind after
// kind: "after" (one photo), "before-after" (a side-by-side picture), or "yard"
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import sharp from "sharp"

const [, , input, ...rest] = process.argv
const opt = (name) => { const i = rest.indexOf(`--${name}`); return i >= 0 ? rest[i + 1] : undefined }
const id = opt("id"), title = opt("title"), note = opt("note"), kind = opt("kind") ?? "after"
if (!input || !id || !title || !note || !["after", "before-after", "yard"].includes(kind)) {
  console.error('Usage: node scripts/add-photo.mjs <image> --id <short-id> --title "<Title>" --note "<one line>" [--kind after|before-after|yard]')
  process.exit(1)
}
if (!existsSync(input)) { console.error(`Image not found: ${input}`); process.exit(1) }
if (!/^[a-z0-9-]+$/.test(id)) { console.error("--id may only use lowercase letters, numbers and dashes"); process.exit(1) }

const dataFile = "src/shared/data.ts"
let data = readFileSync(dataFile, "utf8")
if (data.includes(`id: "${id}"`)) { console.error(`There is already a job with id "${id}".`); process.exit(1) }

const out = `src/assets/jobs/fmh-job-${id}.jpg`
const buf = await sharp(input).rotate().resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer()
const { width, height } = await sharp(buf).metadata()
writeFileSync(out, buf)

const v = "job" + id.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase())
const importLine = `import ${v} from "../assets/jobs/fmh-job-${id}.jpg"`
const lastImport = [...data.matchAll(/^import .*assets\/jobs\/.*$/gm)].pop()
data = data.slice(0, lastImport.index + lastImport[0].length) + "\n" + importLine + data.slice(lastImport.index + lastImport[0].length)
const start = data.indexOf("export const JOBS: Job[] = [")
const end = data.indexOf("\n]\n", start)
const q = (s) => JSON.stringify(s)
data = data.slice(0, end) + `\n  { id: ${q(id)}, title: ${q(title)}, note: ${q(note)}, src: ${v}, w: ${width}, h: ${height}, kind: ${q(kind)} },` + data.slice(end)
writeFileSync(dataFile, data)
console.log(`Added "${title}" (${width}x${height}, ${(buf.length / 1024).toFixed(0)} KB) as the last photo.`)
console.log('Next: npm run typecheck && npm run build && npm run check')
