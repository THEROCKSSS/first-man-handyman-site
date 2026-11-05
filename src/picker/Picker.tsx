import { motion, MotionConfig } from "framer-motion"
import { ArrowUpRight, Download, Printer } from "lucide-react"
import thumbA from "../assets/thumbs/a.jpg?as=webp&width=900"
import thumbB from "../assets/thumbs/b.jpg?as=webp&width=900"
import thumbC from "../assets/thumbs/c.jpg?as=webp&width=900"
import thumbD from "../assets/thumbs/d.jpg?as=webp&width=900"
import cardA from "../assets/thumbs/card-a.jpg?as=webp"
import cardB from "../assets/thumbs/card-b.jpg?as=webp"
import cardC from "../assets/thumbs/card-c.jpg?as=webp"
import cardD from "../assets/thumbs/card-d.jpg?as=webp"

const LOOKS = [
  {
    thumb: thumbA, href: "./a/", name: "Craftsman Light", tag: "Calm, warm, easy to read",
    blurb: "Warm paper, navy ink and one safety orange. A tape measure fills in under the header as you scroll. The photos do the selling.",
    motion: "Light motion", bg: "oklch(97.4% 0.011 85)", ink: "oklch(24% 0.04 258)", acc: "oklch(68% 0.175 52)",
  },
  {
    thumb: thumbB, href: "./b/", name: "Night Shift", tag: "Dark, rich, cinematic",
    blurb: "Warm dark with amber light. A photo rail you grab and drag sideways, with counters, drifting hero photos and a service list that opens to show a real job.",
    motion: "Rich motion", bg: "oklch(17% 0.012 60)", ink: "oklch(93% 0.012 85)", acc: "oklch(74% 0.16 65)",
  },
  {
    thumb: thumbC, href: "./c/", name: "Sign Painter", tag: "Loud, bold, like a truck door",
    blurb: "Huge condensed type, hard color blocks and a running ticker of everything he fixes. Built to be remembered from across the street.",
    motion: "Bold motion", bg: "oklch(94% 0.045 92)", ink: "oklch(22% 0.06 258)", acc: "oklch(68% 0.19 50)",
  },
  {
    thumb: thumbD, href: "./d/", name: "Blueprint", tag: "Precise, technical, trustworthy",
    blurb: "A drafting-table look. Lines draw themselves, photos get dimension marks, and the services read like a spec sheet.",
    motion: "Drawn motion", bg: "oklch(27% 0.07 255)", ink: "oklch(96% 0.01 240)", acc: "oklch(74% 0.17 55)",
  },
]

const REPO = "https://github.com/THEROCKSSS/first-man-handyman-site"

const ADDED: [string, string][] = [
  ["Four designs to choose from", "The same real content in four different looks. Each works on a laptop and a phone."],
  ["Job photos you can open", "Tap any photo to see it larger, flip through with arrows or a swipe, and copy a link to that exact job to send a neighbor."],
  ["“Write the text for me”", "Pick the job and your town and it builds a text to Adam. It opens in your own messaging app, and it remembers your choices on your device only."],
  ["Printable cards and a flyer", "Four designs, each with a QR code to firstmanhandyman.com, printed from this page."],
  ["Terms of service and privacy policy", "Short plain-language drafts based on what the site actually does. They need a quick review before launch."],
  ["Easier to read and use", "Readable type and colors, buttons sized for thumbs, keyboard friendly, and calmer motion for people who turn animations off. Checked with accessibility tools."],
  ["Faster pages", "Photos load in modern formats at the right size for each screen, and a built-in speed test checks a slow phone on slow 4G."],
  ["A page for each town", "Roseville, Rocklin, Granite Bay, Loomis, Lincoln and Sheridan each get their own page, so people searching for a handyman there can find him."],
  ["Set up to be found on Google", "Page titles, a sitemap, business details Google can read, and a share preview with a real job photo. No street address is published."],
  ["Safer by default", "A strict security policy on every page, no tracking, and no third-party scripts."],
]

const CAN: [string, string][] = [
  ["Change his details in one place", "Phone, email, towns, services, FAQ answers and hours all live in one file."],
  ["Add a new job photo", "Drop in a picture and a caption and it joins the Recent work gallery."],
  ["Add a new review", "Paste a real Google review word for word, with the reviewer’s name."],
  ["Pick the look", "Choose which of the four designs becomes the home page."],
  ["Print his own marketing", "Cards for the truck, flyers for the neighborhood, a QR code that opens a text."],
  ["Hand it to an AI helper", "The repo includes a map and recipes, so an assistant can do the updates and check its own work."],
]

const SKILLS: [string, string][] = [
  ["add-job-photo", "Resize a new photo, add its caption, rebuild."],
  ["add-review", "Add a real review exactly as written, nothing invented."],
  ["update-business-info", "Change phone, email, hours, towns or services safely."],
  ["choose-the-look", "Make one of the four designs the home page."],
  ["check-site", "Run the same tests used to build it: phones, keyboard, readability."],
  ["launch-seo", "Build the Google-ready version, run the SEO and speed checks, and list what only Adam can do (Google Business Profile, reviews)."],
  ["publish-site", "Build and upload the finished site."],
  ["change-workflow", "The rule for every change: ask questions first, show a plan, wait for a yes, then build and test."],
]

export default function Picker() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="wrap py-14 sm:py-20">
        <header className="max-w-[46rem]">
          <p className="text-[0.95rem] font-medium text-rust">Design concepts for First Man Handyman</p>
          <h1 className="mt-3 text-[2.6rem] sm:text-6xl">Four ways the site could look.</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Same real photos, same reviews, same phone number, same working tools: call or text, the job gallery, the services list and the “write the text for me” helper. Only the look and the motion change. Each one works on a laptop and a phone.
          </p>
        </header>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {LOOKS.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0.4, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <a href={l.href} className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/50">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border" style={{ background: l.bg }}>
                  <img src={l.thumb} alt={`Preview of the ${l.name} design`} width={1440} height={900} loading={i < 2 ? "eager" : "lazy"} className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl">{l.name}</h2>
                      <p className="mt-1 text-[0.97rem] font-medium text-rust">{l.tag}</p>
                    </div>
                    <span className="mt-1 inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 font-semibold text-primary-foreground transition-colors group-hover:bg-primary/85">
                      Open <ArrowUpRight className="size-[18px]" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>
                  <p className="mt-3 text-muted-foreground">{l.blurb}</p>
                  <div className="mt-4 flex items-center gap-3 text-[0.9rem]">
                    <span className="flex gap-1" aria-hidden>
                      {[l.bg, l.ink, l.acc].map((c) => <span key={c} className="size-4 rounded-[3px] border border-border" style={{ background: c }} />)}
                    </span>
                    <span className="text-muted-foreground">{l.motion}</span>
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        <section aria-labelledby="added" className="mt-20 border-t border-border pt-14">
          <h2 id="added" className="text-[2rem] sm:text-5xl">What was added to the old site</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {ADDED.map(([t, d]) => (
              <li key={t} className="border-t border-border pt-4">
                <h3 className="text-xl">{t}</h3>
                <p className="mt-1 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="can" className="mt-20 border-t border-border pt-14">
          <h2 id="can" className="text-[2rem] sm:text-5xl">What Adam can do with it</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {CAN.map(([t, d]) => (
              <li key={t} className="border-t border-border pt-4">
                <h3 className="text-xl">{t}</h3>
                <p className="mt-1 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ai" className="mt-20 rounded-lg border border-border bg-card p-6 sm:p-10">
          <h2 id="ai" className="text-[2rem] sm:text-5xl">For Adam’s AI helper</h2>
          <p className="mt-4 max-w-[44rem] text-lg text-muted-foreground">
            The whole site is on GitHub. Download it, hand it to an AI assistant, and the assistant finds a map of the project and a set of small step-by-step recipes (skills) for keeping the site up to date. It also follows a set workflow: it asks questions and shows a plan before it changes anything.
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {SKILLS.map(([t, d]) => (
              <li key={t} className="border-t border-border pt-3">
                <p className="font-semibold">{t}</p>
                <p className="text-[0.97rem] text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={REPO} className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
              Open the GitHub repo <ArrowUpRight className="size-[18px]" strokeWidth={1.75} aria-hidden />
            </a>
            <a href={`${REPO}/archive/refs/heads/main.zip`} className="link-line inline-flex items-center gap-2 font-medium">
              <Download className="size-[18px]" strokeWidth={1.75} aria-hidden /> Download everything as a ZIP
            </a>
          </div>
          <p className="mt-5 text-[0.95rem] text-muted-foreground">
            Tell your assistant: “Read AGENTS.md in this folder first.” It explains where everything is and what not to touch.
          </p>
        </section>

        <section aria-labelledby="print" className="mt-20 border-t border-border pt-14">
          <h2 id="print" className="text-[2rem] sm:text-5xl">Print your own cards</h2>
          <p className="mt-4 max-w-[44rem] text-lg text-muted-foreground">
            Business cards and a flyer with Adam’s name, phone, email and a QR code to his website, in all four designs. Anyone can print them from this page.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[[cardA, "Craftsman Light"], [cardB, "Night Shift"], [cardC, "Sign Painter"], [cardD, "Blueprint"]].map(([src, n]) => (
              <li key={n}>
                <a href="./print/" className="block overflow-hidden rounded-md border border-border bg-card p-2 transition-colors hover:border-foreground/50">
                  <img src={src} alt={`Business card in the ${n} design`} width={672} height={384} loading="lazy" className="aspect-[7/4] w-full rounded-[3px] object-cover" />
                  <span className="mt-2 block px-1 text-[0.95rem] font-medium">{n}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="./print/" className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
            <Printer className="size-[18px]" strokeWidth={1.75} aria-hidden /> Open the printable cards
          </a>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-[0.92rem] text-muted-foreground">
          <p className="max-w-[40rem]">These are design concepts, not the live site. All text, photos and contact details come from firstmanhandyman.com.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-1">
            <a href="./a/legal/#terms" className="link-line">Terms of service (draft)</a>
            <a href="./a/legal/#privacy" className="link-line">Privacy policy (draft)</a>
          </nav>
        </div>
      </footer>
    </MotionConfig>
  )
}
