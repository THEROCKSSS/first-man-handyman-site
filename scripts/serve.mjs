// Production-style static server for dist/. Zero dependencies.
//   node scripts/serve.mjs [dir] [port]
// - serves the precompressed .br / .gz files that `npm run build` writes (Brotli first, then gzip)
// - hashed files (index.1a2b3c4d.js, fonts) are cached for a year; photos for a week; pages are revalidated
// - sends safe default headers and a strict Content-Security-Policy
// Behind a CDN or a host that already does all this (Cloudflare Pages, Netlify), you do not need this file.
import { createServer } from "node:http"
import { createHash } from "node:crypto"
import { existsSync, readFileSync, statSync } from "node:fs"
import { extname, join, normalize } from "node:path"

const [dir = "dist", port = "8290"] = process.argv.slice(2)
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8",
}
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg", ".txt"])
const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
const HASHED = /[.-][0-9a-f]{8}\.[a-z0-9]+$/i
const cache = new Map() // path -> { body, etag }

function load(file) {
  const st = statSync(file)
  const hit = cache.get(file)
  if (hit && hit.mtime === st.mtimeMs) return hit
  const body = readFileSync(file)
  const entry = { body, mtime: st.mtimeMs, etag: `"${createHash("sha1").update(body).digest("base64url").slice(0, 20)}"` }
  cache.set(file, entry)
  return entry
}

createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") return res.writeHead(405, { allow: "GET, HEAD" }).end()
  const rel = normalize(decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname)).replace(/^([/\\])+/, "")
  if (rel.includes("..")) return res.writeHead(400).end("bad path")
  let file = join(dir, rel === "" ? "index.html" : /[.][a-z0-9]+$/i.test(rel) ? rel : join(rel, "index.html"))
  if (!existsSync(file)) return res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("not found")
  const ext = extname(file).toLowerCase()
  const headers = {
    "content-type": TYPES[ext] ?? "application/octet-stream",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
    vary: "Accept-Encoding",
  }
  if (ext === ".html") headers["content-security-policy"] = CSP
  headers["cache-control"] = HASHED.test(file) ? "public, max-age=31536000, immutable"
    : rel.startsWith("photos/") ? "public, max-age=604800" : "no-cache"

  let served = file
  if (COMPRESSIBLE.has(ext)) {
    const accept = String(req.headers["accept-encoding"] ?? "")
    if (/\bbr\b/.test(accept) && existsSync(`${file}.br`)) { served = `${file}.br`; headers["content-encoding"] = "br" }
    else if (/\bgzip\b/.test(accept) && existsSync(`${file}.gz`)) { served = `${file}.gz`; headers["content-encoding"] = "gzip" }
  }
  const { body, etag } = load(served)
  headers.etag = etag
  if (req.headers["if-none-match"] === etag) return res.writeHead(304, headers).end()
  headers["content-length"] = body.length
  res.writeHead(200, headers).end(req.method === "HEAD" ? undefined : body)
}).listen(Number(port), "0.0.0.0", () => console.log(`serving ${dir} on :${port}`))
