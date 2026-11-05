// npm run seo-check: builds the launch version into dist-launch/ and checks everything search engines care about.
//   titles and descriptions, one h1, canonical links, no noindex on public pages, structured data, sitemap, robots.txt,
//   share image, image alt text, internal links that resolve, no scripts on the town pages, no leftover concept-look links.
import { spawnSync } from "node:child_process"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"

const out = "dist-launch"
if (!process.argv.includes("--no-build")) {
  const r = spawnSync(process.execPath, ["scripts/build.mjs", out], { stdio: "inherit", env: { ...process.env, FMH_LAUNCH: "1" } })
  if (r.status !== 0) process.exit(r.status ?? 1)
}
const data = await import(pathToFileURL(resolve("src/shared/data.ts")).href)
const { indexablePages } = await import("./seo.mjs")
const SITE = data.SITE_URL.replace(/\/$/, "")
const pages = indexablePages()
const failures = []
const fail = (page, msg) => { failures.push(`${page}  ${msg}`); console.log(`  FAIL ${msg}`) }
const fileFor = (p) => join(out, p, "index.html")
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]))

for (const p of pages) {
  console.log(p.path)
  if (!existsSync(fileFor(p.path))) { fail(p.path, "page is missing"); continue }
  const html = readFileSync(fileFor(p.path), "utf8")
  const one = (re, what) => { const m = html.match(re); if (!m) fail(p.path, `no ${what}`); return m }
  if ((html.match(/<title>/g) ?? []).length !== 1) fail(p.path, "needs exactly one <title>")
  if (!html.includes(`<title>${p.title.replace(/&/g, "&amp;")}</title>`)) fail(p.path, "title is not the planned one")
  one(new RegExp(`<meta name="description" content="[^"]{70,160}"`), "meta description of 70 to 160 characters")
  if (!html.includes(`<link rel="canonical" href="${SITE}${p.path}">`)) fail(p.path, "canonical link is missing or wrong")
  if (/<meta name="?robots"?[^>]*noindex/.test(html)) fail(p.path, "page is marked noindex")
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail(p.path, "needs exactly one <h1>")
  if (p.town && !new RegExp(`<h1[^>]*>[^<]*${p.town}`).test(html)) fail(p.path, `h1 does not mention ${p.town}`)
  if (!html.includes('property="og:image"') || !html.includes("twitter:card")) fail(p.path, "share-preview tags missing")
  if (!html.includes("Content-Security-Policy")) fail(p.path, "no Content-Security-Policy tag")
  if (/\/(b|c|d)\//.test(html.replace(/https?:\/\/[^"' ]+/g, ""))) fail(p.path, "links to a concept look that is not in the launch build")
  if (/<a\b[^>]*href="\/a\//.test(html)) fail(p.path, "still links to the /a/ concept path")
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) if (!/\balt=/.test(img)) fail(p.path, "image without alt text")
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (!ld) fail(p.path, "no structured data")
  else {
    try {
      const biz = JSON.parse(ld[1])["@graph"].find((n) => n["@type"] === "HomeAndConstructionBusiness")
      if (!biz) fail(p.path, "structured data has no business")
      else {
        if (biz.telephone !== "+1" + data.PHONE.replace(/\D/g, "")) fail(p.path, "structured data phone differs from data.ts")
        if (biz.areaServed.length !== data.TOWNS.length) fail(p.path, "structured data does not list every town")
        if (biz.address.streetAddress) fail(p.path, "a street address is published, but this is a service-area business")
        if (biz.aggregateRating) fail(p.path, "invented rating in structured data")
      }
    } catch (e) { fail(p.path, `structured data is not valid JSON: ${e.message}`) }
  }
  if (p.kind === "town" || p.kind === "hub") {
    if (/<script\b(?![^>]*ld\+json)/.test(html)) fail(p.path, "has a script; it should be plain HTML")
    if (!/<main[\s\S]*<h1/.test(html)) fail(p.path, "page text is missing from the static HTML")
  }
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)"/g)) {
    const target = m[1]
    if (!existsSync(join(out, target)) && !existsSync(join(out, target, "index.html"))) fail(p.path, `broken link: ${target}`)
  }
}

console.log("site files")
const sitemap = existsSync(join(out, "sitemap.xml")) ? readFileSync(join(out, "sitemap.xml"), "utf8") : ""
for (const p of pages) if (!sitemap.includes(`<loc>${SITE}${p.path}</loc>`)) fail("sitemap.xml", `does not list ${p.path}`)
const robots = existsSync(join(out, "robots.txt")) ? readFileSync(join(out, "robots.txt"), "utf8") : ""
if (/Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt", "blocks the whole site")
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt", "has no Sitemap line")
if (!existsSync(join(out, "og.jpg"))) fail("og.jpg", "share image is missing")
if (existsSync(fileFor("/print/")) && !/noindex/.test(readFileSync(fileFor("/print/"), "utf8"))) fail("/print/", "printable cards should stay noindex")
for (const l of ["b", "c", "d"]) if (walk(out).some((f) => f.startsWith(join(out, l) + "\\") || f.startsWith(join(out, l) + "/"))) fail(`/${l}/`, "concept look left in the launch build")

console.log(failures.length ? `\n${failures.length} SEO problem(s) found.` : "\nAll SEO checks passed.")
process.exit(failures.length ? 1 : 0)
