// npm run perf: serves dist/ (compressed, cached) and loads each page on a simulated slow phone and slow 4G.
//   CPU 4x slower, 1.6 Mbps down, 150 ms round trip, 375 px wide, first visit (empty cache).
// Compares the real transferred (compressed) bytes and timings with perf-budget.json and fails if the site got heavier or slower.
//   npm run perf              check against the budgets
//   npm run perf -- --report  just print the numbers
// Needs Chrome or Chromium. Set CHROME_PATH if it is not found automatically.
import { spawn } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { chromium } from "playwright-core"

const dist = "dist"
if (!existsSync(`${dist}/index.html`)) { console.error('No dist/. Run "npm run build" first.'); process.exit(2) }
const budget = JSON.parse(readFileSync("perf-budget.json", "utf8"))
const reportOnly = process.argv.includes("--report")
const PORT = 8391

const server = spawn(process.execPath, ["scripts/serve.mjs", dist, String(PORT)], { stdio: ["ignore", "pipe", "inherit"] })
await new Promise((res) => server.stdout.on("data", (d) => String(d).includes("serving") && res()))

const candidates = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean)
const executablePath = candidates.find((p) => existsSync(p))
let browser
try { browser = await chromium.launch(executablePath ? { executablePath } : {}) }
catch { console.error('Could not start a browser. Install Chrome, or run "npx playwright install chromium", or set CHROME_PATH.'); server.kill(); process.exit(2) }

const rows = [], failures = []
for (const [path, limits] of Object.entries(budget.pages)) {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  const page = await ctx.newPage()
  const cdp = await ctx.newCDPSession(page)
  await cdp.send("Network.enable")
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 })
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 })
  const types = new Map(), bytes = { js: 0, css: 0, font: 0, img: 0, html: 0, other: 0 }
  cdp.on("Network.responseReceived", (e) => types.set(e.requestId, e.type))
  cdp.on("Network.loadingFinished", (e) => {
    const t = types.get(e.requestId), k = t === "Script" ? "js" : t === "Stylesheet" ? "css" : t === "Font" ? "font" : t === "Image" ? "img" : t === "Document" ? "html" : "other"
    bytes[k] += e.encodedDataLength
  })
  await page.addInitScript(() => {
    window.__m = { lcp: 0, cls: 0 }
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__m.lcp = e.startTime }).observe({ type: "largest-contentful-paint", buffered: true })
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value }).observe({ type: "layout-shift", buffered: true })
  })
  await page.goto(`http://127.0.0.1:${PORT}${path}`, { waitUntil: "load", timeout: 120000 })
  await page.waitForTimeout(2500)
  const m = await page.evaluate(() => ({ fcp: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0), lcp: Math.round(window.__m.lcp), cls: Number(window.__m.cls.toFixed(3)) }))
  const kb = Object.fromEntries(Object.entries(bytes).map(([k, v]) => [k, Math.round(v / 1024)]))
  const total = Object.values(kb).reduce((a, b) => a + b, 0)
  const row = { path, ...m, js: kb.js, img: kb.img, total }
  rows.push(row)
  for (const [key, got, limit] of [["fcp", m.fcp, limits.fcpMs], ["lcp", m.lcp, limits.lcpMs], ["cls", m.cls, limits.cls], ["js KB", kb.js, limits.jsKB], ["total KB", total, limits.totalKB]]) {
    if (limit !== undefined && got > limit) failures.push(`${path}: ${key} is ${got}, budget ${limit}`)
  }
  await ctx.close()
}
await browser.close(); server.kill()

console.log("slow phone, slow 4G, first visit (compressed bytes)\n")
console.log("page".padEnd(11), "FCP ms".padEnd(8), "LCP ms".padEnd(8), "CLS".padEnd(7), "JS KB".padEnd(7), "img KB".padEnd(8), "total KB")
for (const r of rows) console.log(r.path.padEnd(11), String(r.fcp).padEnd(8), String(r.lcp).padEnd(8), String(r.cls).padEnd(7), String(r.js).padEnd(7), String(r.img).padEnd(8), r.total)
if (reportOnly) process.exit(0)
console.log(failures.length ? `\n${failures.length} budget problem(s):\n  ${failures.join("\n  ")}` : "\nAll pages are inside their budgets.")
process.exit(failures.length ? 1 : 0)
