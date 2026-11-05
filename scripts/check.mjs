// npm run check: serves dist/ and runs the same checks used to build the site.
//   - no sideways scroll at 1280, 375 and 320 px wide
//   - no console errors, failed requests or broken images
//   - axe-core accessibility scan (WCAG 2.1 A/AA + best practices)
//   - keyboard: the skip link is the first Tab stop, and every focused control shows a focus ring
// Needs Chrome or Chromium. Set CHROME_PATH if it is not found automatically.
import { createServer } from "node:http"
import { existsSync, readFileSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { extname, join, normalize } from "node:path"
import { chromium } from "playwright-core"

const require = createRequire(import.meta.url)
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8")
const dist = process.argv[2] ?? "dist"
if (!existsSync(join(dist, "index.html"))) { console.error(`No ${dist}/index.html. Run "npm run build" first.`); process.exit(2) }

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".txt": "text/plain" }
const server = createServer(async (req, res) => {
  const rel = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "")
  const file = join(dist, rel === "" ? "index.html" : /[.][a-z0-9]+$/i.test(rel) ? rel : join(rel, "index.html"))
  try { res.writeHead(200, { "content-type": TYPES[extname(file).toLowerCase()] ?? "application/octet-stream" }).end(await readFile(file)) }
  catch { res.writeHead(404).end("not found") }
}).listen(0)
const base = `http://127.0.0.1:${server.address().port}`

const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean)
let executablePath = candidates.find((p) => existsSync(p))
let browser
try { browser = await chromium.launch(executablePath ? { executablePath } : {}) }
catch { console.error('Could not start a browser. Install Chrome, or run "npx playwright install chromium", or set CHROME_PATH.'); server.close(); process.exit(2) }

const PAGES = ["/", "/a/", "/b/", "/c/", "/d/", "/a/legal/", "/b/legal/", "/c/legal/", "/d/legal/", "/print/"]
const failures = []
const fail = (page, msg) => { failures.push(`${page}  ${msg}`); console.log(`  FAIL ${msg}`) }

for (const path of PAGES) {
  console.log(path)
  for (const [w, h] of [[1280, 800], [375, 812], [320, 700]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } })
    const page = await ctx.newPage()
    const problems = []
    page.on("console", (m) => m.type() === "error" && problems.push(`console error: ${m.text().slice(0, 120)}`))
    page.on("pageerror", (e) => problems.push(`page error: ${String(e).slice(0, 120)}`))
    page.on("requestfailed", (r) => problems.push(`request failed: ${r.url().slice(-70)}`))
    page.on("response", (r) => r.status() >= 400 && problems.push(`HTTP ${r.status()}: ${r.url().slice(-70)}`))
    await page.goto(base + path, { waitUntil: "load" })
    await page.waitForTimeout(900)
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < total; y += 600) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(50) }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500)

    if ((await page.evaluate(() => document.documentElement.scrollWidth)) > w) problems.push(`sideways scroll at ${w}px`)
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.slice(-50)))
    if (broken.length) problems.push(`broken images: ${broken.join(", ")}`)

    if (w === 1280) {
      await page.addScriptTag({ content: axeSource })
      const v = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } })).violations.map((x) => `${x.impact} ${x.id} x${x.nodes.length}`))
      v.forEach((x) => problems.push(`accessibility: ${x}`))
      if (path !== "/") {
        await page.keyboard.press("Tab")
        const first = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? "")
        if (!/skip to content/i.test(first)) problems.push(`first Tab stop is "${first.slice(0, 30)}", not the skip link`)
      }
      let noRing = 0
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab")
        const ok = await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return true; const s = getComputedStyle(e); return (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== "none" })
        if (!ok) noRing++
      }
      if (noRing) problems.push(`${noRing} controls show no focus ring`)
    }
    problems.forEach((p) => fail(`${path} @${w}`, p))
    await ctx.close()
  }
}
await browser.close(); server.close()
console.log(failures.length ? `\n${failures.length} problem(s) found.` : "\nAll checks passed.")
process.exit(failures.length ? 1 : 0)
