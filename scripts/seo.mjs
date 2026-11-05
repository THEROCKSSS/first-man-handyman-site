// Search-engine and security tags, added to every page after the build. Every fact comes from src/shared/data.ts.
//   Always:           a Content-Security-Policy meta tag (the host should also send the real headers, see docs/PERFORMANCE.md)
//   Launch build only: titles, descriptions, canonical links, share previews, structured data (JSON-LD), sitemap.xml, and the
//                      chosen look becomes the home page. Pages that should not be found (print cards) keep "noindex".
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import sharp from "sharp"

const data = await import(pathToFileURL(resolve("src/shared/data.ts")).href)
const { BUSINESS, OWNER, TOWNS, COUNTY, PHONE, EMAIL, FACEBOOK, INSTAGRAM, SERVICE_GROUPS, areaPath } = data
const SITE = data.SITE_URL.replace(/\/$/, "")
const LOOKS = ["a", "b", "c", "d"]

export const CSP = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'"

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]))
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")
const list = (a) => `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`

/** Every page that search engines should find, with its own title and description. */
export function indexablePages() {
  const pages = [
    {
      path: "/", kind: "home",
      title: `Handyman in Roseville, Rocklin & Lincoln | ${BUSINESS}`,
      desc: `Local handyman for ${list(TOWNS)}, CA. Faucets, TV mounting, flooring, yard work. Call or text Adam.`,
    },
    {
      path: "/areas/", kind: "hub",
      title: `Handyman service areas in ${COUNTY} | ${BUSINESS}`,
      desc: `${BUSINESS} serves ${list(TOWNS)}, CA. Pick your town to see what I can help with.`,
    },
    ...TOWNS.map((town) => ({
      path: areaPath(town), kind: "town", town,
      title: `Handyman in ${town}, CA | ${BUSINESS}`,
      desc: `Handyman in ${town}, CA: sink and faucet installs, TV mounting, flooring, drywall patches, yard cleanup and more. Call or text Adam at ${PHONE}.`,
    })),
    { path: "/legal/", kind: "legal", title: `Terms and privacy | ${BUSINESS}`, desc: `Terms of service and privacy policy for the ${BUSINESS} website. No tracking, no ads, no accounts.` },
  ]
  for (const p of pages) {
    if (p.title.length > 70) throw new Error(`title too long (${p.title.length}): ${p.title}`)
    if (p.desc.length < 70 || p.desc.length > 160) throw new Error(`description length ${p.desc.length}: ${p.desc}`)
  }
  return pages
}

const place = (name) => ({ "@type": "City", name, containedInPlace: { "@type": "State", name: "California" } })

function business() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE}/#business`,
    name: BUSINESS,
    url: `${SITE}/`,
    image: `${SITE}/og.jpg`,
    telephone: "+1" + PHONE.replace(/\D/g, ""),
    email: EMAIL,
    description: "Local handyman for repairs, installs and small projects around the house and yard, plus basic car care.",
    founder: { "@type": "Person", name: OWNER },
    // A service-area business with no storefront: only the town it is based in, no street address.
    address: { "@type": "PostalAddress", addressLocality: "Sheridan", addressRegion: "CA", addressCountry: "US" },
    areaServed: TOWNS.map(place),
    sameAs: [FACEBOOK, INSTAGRAM],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Handyman services",
      itemListElement: SERVICE_GROUPS.flatMap((g) => g.services).map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.items.join(", ") } })),
    },
  }
}

function jsonLd(p) {
  const graph = [business()]
  if (p.kind === "home") graph.push({ "@type": "WebSite", "@id": `${SITE}/#site`, url: `${SITE}/`, name: BUSINESS, publisher: { "@id": `${SITE}/#business` } })
  else {
    const crumbs = [{ name: "Home", path: "/" }]
    if (p.kind === "town") crumbs.push({ name: "Service areas", path: "/areas/" }, { name: p.town, path: p.path })
    else crumbs.push({ name: p.kind === "hub" ? "Service areas" : "Terms and privacy", path: p.path })
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE}${c.path}` })),
    })
    if (p.kind === "town") graph.push({ "@type": "WebPage", url: `${SITE}${p.path}`, name: p.title, about: { "@id": `${SITE}/#business` }, spatialCoverage: place(p.town) })
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")
}

function headTags(p) {
  const url = `${SITE}${p.path}`
  return [
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(BUSINESS)}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.desc)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${SITE}/og.jpg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(`${BUSINESS}: a recent bathroom faucet install`)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${jsonLd(p)}</script>`,
  ].join("\n    ")
}

/** Makes the chosen look the home page and drops the others. The launch site is one design, not a picker. */
export function reshapeForLaunch(dist, look) {
  if (!LOOKS.includes(look)) throw new Error(`unknown look "${look}"`)
  copyFileSync(join(dist, look, "index.html"), join(dist, "index.html"))
  mkdirSync(join(dist, "legal"), { recursive: true })
  copyFileSync(join(dist, look, "legal", "index.html"), join(dist, "legal", "index.html"))
  // the other looks go completely; the chosen look keeps its scripts and styles (the home page loads them from /<look>/), only its pages go
  for (const l of LOOKS.filter((x) => x !== look)) rmSync(join(dist, l), { recursive: true, force: true })
  for (const f of walk(join(dist, look)).filter((x) => x.endsWith(".html"))) rmSync(f)
  // pages saved while the look lived at /<look>/ link to it; at launch it is the home page. Only <a> links change, never scripts or styles.
  const from = new RegExp(`(<a\\b[^>]*?href=")/${look}/`, "g")
  for (const f of [...walk(join(dist, "areas")).filter((x) => x.endsWith(".html")), join(dist, "index.html"), join(dist, "legal", "index.html")]) {
    writeFileSync(f, readFileSync(f, "utf8").replace(from, "$1/"))
  }
}

export async function applySeo({ dist, launch }) {
  const meta = new Map(launch ? indexablePages().map((p) => [p.path, p]) : [])
  for (const f of walk(dist).filter((x) => x.endsWith(".html"))) {
    let html = readFileSync(f, "utf8")
    const path = "/" + f.slice(dist.length + 1).replace(/\\/g, "/").replace(/index\.html$/, "")
    html = html.replace(/<meta http-equiv="?Content-Security-Policy"?[^>]*>/g, "").replace(/<head[^>]*>/, (m) => `${m}<meta http-equiv="Content-Security-Policy" content="${CSP}">`)
    const p = meta.get(path)
    if (p) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`)
        .replace(/<meta name="?description"?[^>]*>/, `<meta name="description" content="${esc(p.desc)}">`)
        .replace(/<meta name="?robots"?[^>]*>/g, "")
        .replace("</head>", `    ${headTags(p)}\n  </head>`)
    }
    writeFileSync(f, html)
  }
  if (!launch) return
  const missing = [...meta.keys()].filter((k) => !existsSync(join(dist, k, "index.html")))
  if (missing.length) throw new Error(`launch pages missing from the build: ${missing.join(", ")}`)

  const today = new Date().toISOString().slice(0, 10)
  const urls = [...meta.keys()].map((k) => `  <url><loc>${SITE}${k}</loc><lastmod>${today}</lastmod></url>`).join("\n")
  writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
}

/** 1200x630 share picture, cut from one of Adam's real photos. */
export async function buildShareImage(dist, photoId = "bath-faucet") {
  await sharp(join("src", "assets", "jobs", `${photoId}.jpg`)).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(dist, "og.jpg"))
}
