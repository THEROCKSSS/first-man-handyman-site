// Dependency-free static server for previewing dist/ (also reachable from a phone on the tailnet).
// Usage: node scripts/serve.mjs <dir> <port>
import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { extname, join, normalize } from "node:path"

const [dir = "dist", port = "8290"] = process.argv.slice(2)
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8",
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://x")
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, "")
  if (rel.includes("..")) return res.writeHead(400).end("bad path")
  const file = join(dir, rel === "" ? "index.html" : /[.][a-z0-9]+$/i.test(rel) ? rel : join(rel, "index.html"))
  try {
    const data = await readFile(file)
    res.writeHead(200, { "content-type": TYPES[extname(file).toLowerCase()] ?? "application/octet-stream", "cache-control": "no-store" }).end(data)
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end("not found")
  }
}).listen(Number(port), "0.0.0.0", () => console.log(`serving ${dir} on :${port}`))
