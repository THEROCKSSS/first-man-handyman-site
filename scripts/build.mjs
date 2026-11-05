// One build command for every shell. Calling Parcel from Node avoids Git Bash rewriting "/" into "C:/Program Files/Git/".
//   npm run build                 concept build: noindex + robots Disallow (the default, safe to put anywhere)
//   FMH_LAUNCH=1 npm run build    launch build: pages are indexable by search engines
import { spawnSync } from "node:child_process"
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"

const require = createRequire(import.meta.url)
const parcelBin = require.resolve("parcel/lib/bin.js")
const entries = ["index.html", "a/index.html", "b/index.html", "c/index.html", "d/index.html",
  "a/legal/index.html", "b/legal/index.html", "c/legal/index.html", "d/legal/index.html", "print/index.html"]
const dist = process.argv[2] ?? "dist"
const launch = process.env.FMH_LAUNCH === "1"

rmSync(dist, { recursive: true, force: true })
const r = spawnSync(process.execPath, [parcelBin, "build", ...entries, "--dist-dir", dist, "--public-url", "/", "--no-source-maps", "--no-cache"], { stdio: "inherit" })
if (r.status !== 0) process.exit(r.status ?? 1)

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]))
if (launch) {
  for (const f of walk(dist).filter((p) => p.endsWith(".html"))) {
    writeFileSync(f, readFileSync(f, "utf8").replace(/<meta name="robots"[^>]*>/g, ""))
  }
  writeFileSync(join(dist, "robots.txt"), "User-agent: *\nAllow: /\n")
  console.log("launch build: pages are indexable")
} else {
  writeFileSync(join(dist, "robots.txt"), "User-agent: *\nDisallow: /\n")
  console.log("concept build: noindex + robots Disallow")
}
