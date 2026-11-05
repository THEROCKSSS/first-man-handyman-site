import * as React from "react"
import QRCode from "qrcode"
import { ArrowLeft, Printer } from "lucide-react"
import { EMAIL, PHONE, PHONE_SMS, SERVICE_GROUPS, SITE_HOST, SITE_URL, TOWNS } from "@/shared/data"
import { cn } from "@/lib/utils"

type Look = "a" | "b" | "c" | "d"
type Format = "cards" | "flyer"

const SITE = SITE_URL
const SMS = PHONE_SMS
const LOOKS: { id: Look; name: string; note: string }[] = [
  { id: "a", name: "Craftsman Light", note: "Warm paper, navy and orange" },
  { id: "b", name: "Night Shift", note: "Dark with amber" },
  { id: "c", name: "Sign Painter", note: "Loud, like a truck door" },
  { id: "d", name: "Blueprint", note: "Drafting-table blue" },
]
const FORMATS: { id: Format; name: string; note: string }[] = [
  { id: "cards", name: "Business cards", note: "10 per sheet, 3.5 × 2 in" },
  { id: "flyer", name: "Flyer", note: "one letter page" },
]

function Qr({ text, label, className }: { text: string; label: string; className?: string }) {
  const [svg, setSvg] = React.useState("")
  React.useEffect(() => {
    let on = true
    QRCode.toString(text, { type: "svg", margin: 4, errorCorrectionLevel: "M", color: { dark: "#10203f", light: "#ffffff" } })
      .then((s) => on && setSvg(s))
      .catch(() => on && setSvg(""))
    return () => { on = false }
  }, [text])
  return <div role="img" aria-label={label} className={cn("qr shrink-0 bg-white", className)} dangerouslySetInnerHTML={{ __html: svg }} />
}

function Card({ look }: { look: Look }) {
  const c = look === "c", d = look === "d"
  return (
    <div data-look={look} className={cn("cut relative overflow-hidden", c && "border-[0.03in] border-solid border-border")} style={{ width: "3.5in", height: "2in" }}>
      {d && <div className="bp-grid absolute inset-0" aria-hidden />}
      {look === "a" && <div className="ticks absolute inset-x-0 bottom-0" aria-hidden />}
      <div className="relative grid h-full grid-cols-[1fr_auto] gap-[0.12in] p-[0.15in]">
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className={cn("fd leading-none", c ? "text-[17pt]" : "text-[14pt]")}>First Man Handyman</p>
            <p className={cn("mt-[0.04in] text-[7pt] text-muted-foreground", d && "mono")}>Adam Ingraham · Handyman</p>
          </div>
          <p className="text-[6.5pt] leading-snug text-muted-foreground">Repairs, installs, TV mounting, flooring, yard work and car basics in Roseville, Rocklin, Granite Bay, Loomis, Lincoln and Sheridan.</p>
          <div>
            <p className={cn("fd leading-none", c ? "inline-block bg-primary px-[0.05in] pb-[0.02in] pt-[0.03in] text-[15pt] text-primary-foreground" : "text-[13pt]", look === "b" && "text-rust")}>{PHONE}</p>
            <p className="mt-[0.04in] text-[7pt]">{EMAIL}</p>
            <p className="text-[7pt] font-semibold text-rust">{SITE_HOST}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Qr text={SITE} label="QR code for the website" className="size-[0.98in]" />
          <p className="text-center text-[6pt] leading-tight">Scan for photos<br />and more info<br /><span className="text-muted-foreground">Evenings and weekends</span></p>
        </div>
      </div>
    </div>
  )
}

function Flyer({ look }: { look: Look }) {
  const c = look === "c", d = look === "d"
  return (
    <div data-look={look} className="relative overflow-hidden" style={{ width: "8.5in", height: "11in" }}>
      {d && <div className="bp-grid absolute inset-0" aria-hidden />}
      {look === "a" && <div className="ticks absolute inset-x-0 top-0" aria-hidden />}
      {c && <div className="absolute inset-x-0 top-0 h-[2.45in] bg-primary" aria-hidden />}
      <div className="relative flex h-full flex-col px-[0.7in] pb-[0.6in] pt-[0.65in]">
        <header>
          <p className={cn("fd leading-none", c ? "text-[54pt] text-primary-foreground" : "text-[42pt]")}>First Man Handyman</p>
          <p className={cn("mt-[0.1in] text-[14pt]", c ? "text-primary-foreground" : "text-muted-foreground", d && "mono")}>Adam Ingraham · Handyman · Roseville, Rocklin, Granite Bay, Loomis, Lincoln, Sheridan</p>
        </header>
        <p className={cn("fd mt-[0.5in] text-[27pt] leading-[1.05]", c && "text-[34pt]")}>Small jobs around the house, done carefully.</p>

        <div className="mt-[0.4in] grid grid-cols-[1.35fr_1fr] gap-[0.45in]">
          <div className="space-y-[0.16in]">
            {SERVICE_GROUPS.map((g) => (
              <div key={g.id}>
                <p className={cn("fd text-[14pt] text-rust", c && "text-[16pt]")}>{g.label}</p>
                <p className="mt-[0.03in] text-[10.5pt] leading-snug">{g.services.map((s) => s.name).join(" · ")}</p>
              </div>
            ))}
          </div>
          <ul className="space-y-[0.09in] text-[11pt]">
            {["5-star rated on Google", "Evenings and weekends", "Your materials welcome", "Text a photo for a quick answer"].map((t) => (
              <li key={t} className="flex gap-[0.08in]"><span className="mt-[0.075in] inline-block size-[0.07in] shrink-0 bg-primary" aria-hidden />{t}</li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-[0.35in]">
          <p className="text-[11pt] text-muted-foreground">Call or text</p>
          <p className={cn("fd whitespace-nowrap text-[58pt] leading-none", look === "b" && "text-rust", c && "inline-block bg-primary px-[0.1in] pb-[0.04in] pt-[0.06in] text-primary-foreground")}>{PHONE}</p>
          <div className="mt-[0.3in] flex items-end justify-between gap-[0.4in]">
            <div>
              <p className="text-[12pt]">{EMAIL}</p>
              <p className="text-[12pt] font-semibold text-rust">{SITE_HOST}</p>
            </div>
            <div className="flex gap-[0.3in]">
              <div className="text-center">
                <Qr text={SITE} label="QR code for the website" className="size-[1.55in]" />
                <p className="mt-[0.05in] text-[9pt] leading-tight">Photos and<br />more info</p>
              </div>
              <div className="text-center">
                <Qr text={SMS} label="QR code that starts a text to Adam" className="size-[1.55in]" />
                <p className="mt-[0.05in] text-[9pt] leading-tight">Text Adam<br />a photo</p>
              </div>
            </div>
          </div>
          <p className="mt-[0.3in] border-t border-border pt-[0.1in] text-[9pt] text-muted-foreground">Serving {TOWNS.join(", ")}, CA</p>
        </div>
      </div>
    </div>
  )
}

/** Scales the real-size letter page down to fit the screen; printing ignores the scale. */
function Fit({ children }: { children: React.ReactNode }) {
  const box = React.useRef<HTMLDivElement>(null)
  const [s, setS] = React.useState(1)
  React.useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setS(Math.min(1, el.clientWidth / 816))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={box} className="w-full">
      <div className="sheet-frame mx-auto shadow-[0_18px_40px_-26px_rgb(20_30_60/0.5)]" style={{ width: 816 * s, height: 1056 * s }}>
        <div className="sheet-scaler" style={{ width: 816, height: 1056, transform: `scale(${s})`, transformOrigin: "top left" }}>{children}</div>
      </div>
    </div>
  )
}

export default function PrintPage() {
  const [look, setLook] = React.useState<Look>("a")
  const [format, setFormat] = React.useState<Format>("cards")
  const [saver, setSaver] = React.useState(false)

  return (
    <div className={cn("print-root", saver && "ink-saver")}>
      <div className="no-print">
        <a href="#content" className="skip-link">Skip to content</a>
        <header className="border-b border-border">
          <div className="wrap flex min-h-16 items-center justify-between gap-4 py-3">
            <a href="/" translate="no" className="font-display text-xl font-semibold">First Man Handyman</a>
            <a href="/" className="link-line inline-flex items-center gap-1.5 text-[0.95rem] font-medium"><ArrowLeft className="size-4" strokeWidth={1.9} aria-hidden /> Back to the designs</a>
          </div>
        </header>
      </div>

      <main id="content" className="wrap py-10 sm:py-14">
        <div className="no-print max-w-[46rem]">
          <h1 className="text-[2.4rem] sm:text-5xl">Print a card or flyer</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Business cards and a flyer with Adam’s details and a QR code to his website, in each of the four designs. Pick one, then print it yourself.
          </p>
        </div>

        <div className="no-print mt-8 grid gap-6 sm:grid-cols-2">
          <fieldset>
            <legend className="mb-2 font-semibold">Design</legend>
            <div className="flex flex-wrap gap-2">
              {LOOKS.map((l) => (
                <button key={l.id} type="button" aria-pressed={look === l.id} onClick={() => setLook(l.id)} title={l.note}
                  className={cn("inline-flex min-h-11 items-center rounded-md border px-3.5 text-[0.95rem] transition-colors", look === l.id ? "border-primary bg-primary font-semibold text-primary-foreground" : "border-foreground/40 hover:border-foreground")}>
                  {l.name}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-semibold">What to print</legend>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button key={f.id} type="button" aria-pressed={format === f.id} onClick={() => setFormat(f.id)}
                  className={cn("inline-flex min-h-11 items-center rounded-md border px-3.5 text-[0.95rem] transition-colors", format === f.id ? "border-primary bg-primary font-semibold text-primary-foreground" : "border-foreground/40 hover:border-foreground")}>
                  {f.name} <span className="ml-1.5 text-[0.82rem] font-normal">({f.note})</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="no-print mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button type="button" onClick={() => window.print()} className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
            <Printer className="size-[18px]" strokeWidth={1.9} aria-hidden /> Print
          </button>
          <label className="inline-flex min-h-11 items-center gap-2.5 text-[0.97rem]">
            <input type="checkbox" checked={saver} onChange={(e) => setSaver(e.target.checked)} className="size-5 accent-[oklch(50%_0.15_45)]" />
            Save ink (white background)
          </label>
        </div>
        <ul className="no-print mt-5 max-w-[46rem] list-disc space-y-1 pl-5 text-[0.95rem] text-muted-foreground">
          <li>In the print dialog, set Margins to None and Scale to 100%, and turn on Background graphics so the colors print.</li>
          <li>Business cards: cut along the dashed lines. The sheet fits standard 10-per-page card stock.</li>
          <li>The QR code opens the website. On the flyer, a second QR opens a text to Adam.</li>
        </ul>

        <div className="mt-10">
          <Fit>
            <div className="sheet bg-white" style={{ width: "8.5in", height: "11in" }}>
              {format === "flyer" ? (
                <Flyer look={look} />
              ) : (
                <div className="grid grid-cols-2" style={{ padding: "0.5in 0.75in", gridTemplateRows: "repeat(5, 2in)" }}>
                  {Array.from({ length: 10 }).map((_, i) => <Card key={i} look={look} />)}
                </div>
              )}
            </div>
          </Fit>
        </div>
      </main>
    </div>
  )
}
