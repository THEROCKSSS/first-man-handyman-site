"""Same job as scripts/serve.mjs, for a machine that has Python but not Node.
   python serve.py [dir] [port] [bind]
Serves the precompressed .br / .gz files from `npm run build`, long caching for hashed files, strict security headers."""
import hashlib, mimetypes, os, re, sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit

ROOT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "dist")
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8480
BIND = sys.argv[3] if len(sys.argv) > 3 else "127.0.0.1"
TYPES = {".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
         ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
         ".avif": "image/avif", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon",
         ".txt": "text/plain; charset=utf-8"}
COMPRESSIBLE = {".html", ".js", ".css", ".json", ".svg", ".txt"}
CSP = ("default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; "
       "connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'")
HASHED = re.compile(r"[.-][0-9a-f]{8}\.[a-z0-9]+$", re.I)
CACHE = {}


def load(path):
    mt = os.stat(path).st_mtime_ns
    hit = CACHE.get(path)
    if hit and hit[0] == mt:
        return hit
    body = open(path, "rb").read()
    entry = (mt, body, '"%s"' % hashlib.sha1(body).hexdigest()[:20])
    CACHE[path] = entry
    return entry


class H(BaseHTTPRequestHandler):
    server_version = "fmh"
    def log_message(self, *a): pass

    def handle_any(self, head):
        rel = unquote(urlsplit(self.path).path).lstrip("/\\")
        if ".." in rel.replace("\\", "/").split("/"):
            return self.send_error(400, "bad path")
        if rel == "":
            rel = "index.html"
        elif not re.search(r"\.[a-z0-9]+$", rel, re.I):
            rel = rel.rstrip("/") + "/index.html"
        file = os.path.abspath(os.path.join(ROOT, rel))
        if not file.startswith(ROOT) or not os.path.isfile(file):
            self.send_response(404); self.send_header("content-type", "text/plain; charset=utf-8"); self.end_headers()
            return None if head else self.wfile.write(b"not found")
        ext = os.path.splitext(file)[1].lower()
        h = {"content-type": TYPES.get(ext, "application/octet-stream"), "x-content-type-options": "nosniff",
             "referrer-policy": "strict-origin-when-cross-origin", "permissions-policy": "camera=(), microphone=(), geolocation=()",
             "vary": "Accept-Encoding"}
        if ext == ".html":
            h["content-security-policy"] = CSP
        h["cache-control"] = ("public, max-age=31536000, immutable" if HASHED.search(file)
                              else "public, max-age=604800" if rel.startswith("photos/") else "no-cache")
        served = file
        if ext in COMPRESSIBLE:
            accept = self.headers.get("accept-encoding", "")
            if re.search(r"\bbr\b", accept) and os.path.exists(file + ".br"):
                served = file + ".br"; h["content-encoding"] = "br"
            elif re.search(r"\bgzip\b", accept) and os.path.exists(file + ".gz"):
                served = file + ".gz"; h["content-encoding"] = "gzip"
        _, body, etag = load(served)
        h["etag"] = etag
        if self.headers.get("if-none-match") == etag:
            self.send_response(304)
            for k, v in h.items(): self.send_header(k, v)
            return self.end_headers()
        h["content-length"] = str(len(body))
        self.send_response(200)
        for k, v in h.items(): self.send_header(k, v)
        self.end_headers()
        if not head:
            self.wfile.write(body)

    def do_GET(self): self.handle_any(False)
    def do_HEAD(self): self.handle_any(True)


if __name__ == "__main__":
    print("serving %s on %s:%d" % (ROOT, BIND, PORT), flush=True)
    ThreadingHTTPServer((BIND, PORT), H).serve_forever()
