import * as React from "react"
import { Photo } from "@/shared/Photo"
import { Tel } from "@/shared/Tel"
import * as Accordion from "@radix-ui/react-accordion"
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check, Copy, Facebook, Instagram, Mail, MessageCircle, MessageSquare, Phone, Plus } from "lucide-react"
import { Toaster } from "sonner"
import {
  EMAIL, FACEBOOK, FAQ, GOOGLE_REVIEW, INSTAGRAM, JOBS, JOB_TYPES, MESSENGER, PHONE, PHONE_SMS, PHONE_TEL,
  REVIEWS, SERVICE_GROUPS, TOWNS, areaPath,
} from "@/shared/data"
import { JobLightbox, useComposer, useJobHash } from "@/shared/hooks"
import { Reveal } from "@/shared/motion"
import { cn } from "@/lib/utils"

const hero = JOBS[0]
const ease = [0.2, 0.7, 0.2, 1] as const

/** A rule that draws itself left to right when it scrolls into view. */
function DrawRule({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return <motion.span className={cn("block h-px origin-left bg-rust", className)} initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} aria-hidden />
}

function Title({ label, children, sub }: { label: string; children: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-[46rem]">
      <p className="mono text-[0.85rem] text-rust">{label}</p>
      <DrawRule className="mt-2 w-24" />
      <h2 className="mt-4 text-[2.3rem] sm:text-6xl">{children}</h2>
      {sub && <p className="mt-4 text-lg text-muted-foreground">{sub}</p>}
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" translate="no" className="flex items-baseline gap-2 whitespace-nowrap">
          <span className="text-[1.2rem] font-semibold tracking-tight">First Man Handyman</span>
          <span className="mono hidden text-[0.8rem] text-muted-foreground sm:inline">Sheridan, CA</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-6 text-[0.95rem] lg:flex">
          {[["#work", "Figures"], ["#services", "Scope"], ["#materials", "Your materials"], ["#reviews", "Reviews"], ["#faq", "Notes"]].map(([h, l]) => <a key={h} href={h} className="link-line text-foreground/80 hover:text-foreground">{l}</a>)}
        </nav>
        <a href={PHONE_TEL} className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap border border-primary bg-primary px-3.5 text-[0.95rem] font-semibold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">
          <Phone className="size-4" strokeWidth={1.9} aria-hidden /><span className="sm:hidden">Call</span><span className="hidden sm:inline"><Tel /></span>
        </a>
      </div>
    </header>
  )
}

/* hero: the photo gets frame, crop marks and two callout leaders that draw themselves */
function Hero() {
  const reduce = useReducedMotion()
  const draw = (delay: number) => ({ initial: reduce ? false : { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.9, delay, ease } }) as const
  return (
    <section id="top" className="border-b border-border">
      <div className="wrap grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="mono text-[0.85rem] text-rust">Handyman · Roseville, Rocklin, Lincoln and nearby</p>
          <motion.h1 className="mt-4 text-[2.8rem] sm:text-[4.3rem]" initial={{ opacity: 0.4, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease }}>
            Small jobs around the house, done carefully.
          </motion.h1>
          <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground sm:text-xl">I’m Adam Ingraham, a local handyman for repairs, installs and small projects in {TOWNS.slice(0, -1).join(", ")} and {TOWNS[TOWNS.length - 1]}. Cleaned up after, every job.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={PHONE_TEL} className="inline-flex h-14 items-center gap-2.5 border border-primary bg-primary px-6 text-lg font-semibold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"><Phone className="size-5" strokeWidth={1.9} aria-hidden /> Call or text <Tel /></a>
            <a href={MESSENGER} className="link-line inline-flex items-center gap-2 font-medium"><MessageCircle className="size-[18px]" strokeWidth={1.75} aria-hidden /> Message on Facebook</a>
          </div>
          <ul className="mono mt-10 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.9rem] text-muted-foreground">
            {["5-star rated on Google", "Evenings and weekends", "Your materials welcome", "Text a photo for a quick answer"].map((f) => <li key={f} className="flex items-center gap-2"><span className="size-1.5 shrink-0 bg-rust" aria-hidden />{f}</li>)}
          </ul>
        </div>

        <figure className="relative pb-10">
          {/* callout leaders: label, a line that draws down to the frame, a dot on the frame edge */}
          <div className="relative h-16" aria-hidden>
            {[["left-[16%]", "Old toilet out", 0.5], ["right-[16%]", "New one in", 0.7]].map(([pos, label, d]) => (
              <div key={label as string} className={cn("absolute bottom-0 flex flex-col items-center", pos as string)}>
                <span className="mono whitespace-nowrap text-[0.82rem] text-rust">{label}</span>
                <svg width="8" height="34" viewBox="0 0 8 34" className="overflow-visible">
                  <motion.line x1="4" y1="2" x2="4" y2="30" stroke="oklch(var(--rust))" strokeWidth="1.5" {...draw(d as number)} />
                  <motion.rect x="1" y="29" width="6" height="6" fill="oklch(var(--rust))" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (d as number) + 0.8 }} />
                </svg>
              </div>
            ))}
          </div>
          <div className="crop border border-border bg-card p-2">
            <a href="#work" aria-label="See the figures"><Photo job={hero} sizes="(min-width: 1024px) 620px, 92vw" eager alt="Before and after: a broken toilet, then the new toilet installed" className="aspect-[4/3] w-full object-cover" /></a>
            <span className="crop-b" aria-hidden />
          </div>
          <figcaption className="mono absolute inset-x-0 bottom-0 flex justify-between text-[0.82rem] text-muted-foreground"><span>Fig. 1 · Toilet replacement</span><a href="#work" className="link-line text-rust">All figures</a></figcaption>
        </figure>
      </div>
    </section>
  )
}

/* figures */
const FILTERS = [["all", "All jobs"], ["before-after", "Before and after"], ["yard", "Outside"]] as const
function Work({ onOpen }: { onOpen: (id: string) => void }) {
  const [f, setF] = React.useState<(typeof FILTERS)[number][0]>("all")
  const list = JOBS.filter((j) => f === "all" || j.kind === f)
  return (
    <section id="work" className="border-b border-border py-20 sm:py-28">
      <div className="wrap">
        <Title label="Figures 1 to 13" sub="Real jobs from real homes. Tap any figure to see it larger.">Recent work</Title>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter jobs">
          {FILTERS.map(([k, l]) => (
            <button key={k} aria-pressed={f === k} onClick={() => setF(k)} className={cn("mono h-11 border px-4 text-[0.9rem] transition-colors", f === k ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground/60 hover:text-foreground")}>{l}</button>
          ))}
          <span className="mono ml-1 self-center text-[0.85rem] text-muted-foreground" aria-live="polite">{list.length} shown</span>
        </div>
        <ul className="mt-8 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((j) => (
              <motion.li key={j.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25, ease }}>
                <button onClick={() => onOpen(j.id)} className="group block w-full text-left">
                  <span className="crop block border border-border bg-card p-1.5">
                    <Photo job={j} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw" alt="" className={cn("aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]", j.kind === "before-after" ? "object-contain bg-card" : "object-cover")} />
                    <span className="crop-b" aria-hidden />
                  </span>
                  <span className="mono mt-2.5 flex justify-between gap-3 text-[0.8rem] text-rust"><span>Fig. {JOBS.indexOf(j) + 1}</span>{j.kind === "before-after" && <span>Before and after</span>}</span>
                  <span className="block font-semibold">{j.title}</span>
                  <span className="block text-[0.95rem] text-muted-foreground">{j.note}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}

/* scope of work: a spec sheet */
function Services() {
  return (
    <section id="services" className="border-b border-border py-20 sm:py-28">
      <div className="wrap">
        <Title label="Scope of work" sub="Everyday home repairs and installs, plus simple car and yard jobs, done carefully and cleaned up after.">What I can help with</Title>
        <div className="mt-12 space-y-12">
          {SERVICE_GROUPS.map((g, gi) => (
            <Reveal key={g.id}>
              <div className="flex items-baseline gap-3"><span className="mono text-[0.85rem] text-rust">Sheet {gi + 1}</span><h3 className="text-2xl sm:text-3xl">{g.label}</h3></div>
              <DrawRule className="mt-3 w-full bg-border" />
              <ul>
                {g.services.map((s) => (
                  <li key={s.name} className="grid gap-x-8 gap-y-2 border-b border-border/60 py-5 md:grid-cols-12">
                    <div className="md:col-span-4"><p className="text-xl font-semibold">{s.name}</p><p className="text-[0.95rem] text-muted-foreground">{s.blurb}</p></div>
                    <ul className="mono grid gap-x-6 gap-y-1.5 text-[0.92rem] sm:grid-cols-2 md:col-span-8">
                      {s.items.map((it) => <li key={it} className="flex gap-2"><span className="mt-[0.5em] size-1.5 shrink-0 bg-rust" aria-hidden />{it}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-lg">Don’t see what you need? <a href={PHONE_TEL} className="link-line font-semibold text-rust">Call or text <Tel /></a> and just ask.</p>
      </div>
    </section>
  )
}

/* your materials: a three-stage line that draws across */
function Materials() {
  const stages = [["You choose the exact product and price", "Faucet, toilet, vinyl plank. Whatever you pick is what goes in."], ["I bring the tools and the know-how", "The install is mine, from start to finish."], ["Installed right", "Not sure what to buy? Text me and ask."]]
  return (
    <section id="materials" className="border-b border-border bg-navy py-20 sm:py-28">
      <div className="wrap">
        <Title label="Your materials, my labor">Pick the parts. I’ll install them.</Title>
        <p className="mt-5 max-w-[40rem] text-lg text-muted-foreground">Want to keep a repair on a budget? Pick up the parts or materials you like, such as the faucet, the toilet or the vinyl plank, and I’ll provide the labor to install it right.</p>
        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="absolute left-0 right-0 top-[11px] hidden md:block"><DrawRule className="bg-rust/70" /></div>
          {stages.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.12} className="relative">
              <span className="relative z-[1] mb-4 block size-6 border-2 border-rust bg-navy" aria-hidden />
              <p className="text-xl font-semibold">{t}</p><p className="mt-1.5 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
        <a href={PHONE_SMS} className="mt-10 inline-flex h-12 items-center gap-2 border border-primary bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">Text me a question <ArrowUpRight className="size-[18px]" strokeWidth={1.9} aria-hidden /></a>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="border-b border-border py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Title label="Field reports">5-star rated on Google</Title>
          <a href={GOOGLE_REVIEW} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1.5 font-semibold text-rust">Leave a review on Google <ArrowUpRight className="size-4" strokeWidth={1.9} aria-hidden /></a>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08} className="crop border border-border bg-card p-6">
              <p className="mono text-[0.8rem] text-rust">Report {i + 1}</p>
              <blockquote className={cn("mt-3 leading-relaxed", i === 0 ? "text-lg" : "text-lg")}>“{r.text}”</blockquote>
              <p className="mt-5 font-semibold">{r.name} <span className="mono text-[0.8rem] font-normal text-muted-foreground">· Google review</span></p>
              <span className="crop-b" aria-hidden />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Area() {
  return (
    <section id="area" className="border-b border-border py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Title label="Service area" sub="Handyman service in these communities and nearby. Based in Sheridan, CA.">Proudly serving south Placer County</Title>
          <ul className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
            {TOWNS.map((t) => <li key={t} className="bg-background transition-colors hover:bg-card"><a href={areaPath(t)} className="block px-4 py-5 text-xl font-semibold underline decoration-border decoration-2 underline-offset-4">{t}</a></li>)}
          </ul>
        </div>
        <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <h3 className="text-[1.8rem] sm:text-4xl">Evening and weekend appointments available</h3>
          <p className="mt-4 text-lg text-muted-foreground">Busy during the workday? I can schedule evenings and weekends so you don’t have to take time off.</p>
          <a href={PHONE_SMS} className="mt-6 inline-flex h-12 items-center border border-foreground/60 px-5 font-semibold transition-colors hover:bg-foreground hover:text-background">Text to book a time</a>
        </Reveal>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="border-b border-border py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4"><div className="lg:sticky lg:top-24"><Title label="General notes">Frequently asked questions</Title><p className="mt-5 text-muted-foreground">Something else? <a href={PHONE_TEL} className="link-line font-semibold text-rust">Call or text <Tel /></a>.</p></div></div>
        <Accordion.Root type="single" collapsible defaultValue="f0" className="border-t border-border lg:col-span-8">
          {FAQ.map((f, n) => (
            <Accordion.Item key={f.q} value={`f${n}`} className="border-b border-border">
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-[64px] w-full items-center justify-between gap-6 py-4 text-left text-[1.15rem] font-semibold hover:text-rust sm:text-[1.3rem]">
                  <span className="flex gap-4"><span className="mono w-7 shrink-0 text-[0.85rem] font-normal text-rust">N{n + 1}</span>{f.q}</span>
                  <Plus className="size-5 shrink-0 text-rust transition-transform duration-200 group-data-[state=open]:rotate-45" strokeWidth={1.8} aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"><p className="max-w-[40rem] pb-6 pl-11 text-lg text-muted-foreground">{f.a}</p></Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}

function Contact() {
  const c = useComposer()
  return (
    <section id="contact" className="bg-navy">
      <div className="wrap grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="mono text-[0.85rem] text-rust">Work order</p><DrawRule className="mt-2 w-24" />
          <h2 className="mt-4 text-[2.6rem] sm:text-6xl">Let’s get it fixed.</h2>
          <p className="mt-5 max-w-[26rem] text-lg text-muted-foreground">Tell me what needs doing. A photo by text helps me give you a quick answer.</p>
          <a href={PHONE_TEL} className="mt-8 inline-flex h-14 items-center gap-2.5 border border-primary bg-primary px-6 text-lg font-semibold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"><Phone className="size-5" strokeWidth={1.9} aria-hidden /> Call or text <Tel /></a>
          {/* title block, like the corner of a drawing sheet */}
          <dl className="mono mt-10 grid grid-cols-[auto_1fr] border border-border text-[0.85rem]">
            {[["Contractor", "First Man Handyman (FMH)"], ["Owner", "Adam Ingraham"], ["Phone", PHONE], ["Email", EMAIL], ["Area", "South Placer County, CA"], ["Hours", "Evenings and weekends available"]].map(([k, v]) => (
              <React.Fragment key={k}><dt className="border-b border-r border-border px-3 py-2 text-muted-foreground last-of-type:border-b-0">{k}</dt><dd className="break-words border-b border-border px-3 py-2 last-of-type:border-b-0">{v}</dd></React.Fragment>
            ))}
          </dl>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
            <li className="flex items-center gap-2"><Facebook className="size-[18px] text-muted-foreground" strokeWidth={1.5} aria-hidden /><a className="link-line" href={FACEBOOK}>facebook.com/firstmanhandyman</a></li>
            <li className="flex items-center gap-2"><Instagram className="size-[18px] text-muted-foreground" strokeWidth={1.5} aria-hidden /><a className="link-line" href={INSTAGRAM}>@first.man.handyman</a></li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="crop border border-border bg-background p-5 sm:p-8">
            <h3 className="text-2xl sm:text-3xl">Write the text for me</h3>
            <p className="mt-1 text-muted-foreground">Pick what applies. Your message builds below, then opens in your texting app.</p>
            <fieldset className="mt-6"><legend className="mb-3 font-semibold">What needs doing?</legend>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((t) => { const on = c.picked.includes(t); return (
                  <button key={t} type="button" aria-pressed={on} onClick={() => c.toggle(t)} className={cn("mono inline-flex min-h-11 items-center gap-1.5 border px-3 text-[0.88rem] transition-colors", on ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/70 hover:border-foreground")}>
                    {on && <Check className="size-4" strokeWidth={2.4} aria-hidden />}{t}
                  </button>) })}
              </div>
            </fieldset>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block font-semibold">Your town<select name="town" autoComplete="off" value={c.town} onChange={(e) => c.setTown(e.target.value)} className="mt-2 block h-12 w-full border border-muted-foreground/70 bg-card px-3 text-base font-normal"><option value="">Not sure / other</option>{TOWNS.map((t) => <option key={t}>{t}</option>)}</select></label>
              <label className="block font-semibold sm:col-span-2">Anything else<textarea name="note" autoComplete="off" value={c.note} onChange={(e) => c.setNote(e.target.value)} rows={2} placeholder="The kitchen faucet drips when it’s off…" className="mt-2 block w-full resize-y border border-muted-foreground/70 bg-card px-3 py-3 text-base font-normal placeholder:text-muted-foreground/70" /></label>
            </div>
            <p className="sr-only" role="status" aria-live="polite">{c.liveMessage}</p>
            <div className="mt-6 border border-dashed border-border p-4"><p className="mono text-[0.8rem] text-rust">Your message</p><p className="mt-1 leading-relaxed">{c.message}</p></div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={c.smsHref} className="inline-flex h-12 items-center gap-2 border border-primary bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"><MessageSquare className="size-[18px]" strokeWidth={1.9} aria-hidden /> Text Adam</a>
              <a href={c.mailHref} className="inline-flex h-12 items-center gap-2 border border-foreground/50 px-5 font-semibold transition-colors hover:bg-foreground hover:text-background"><Mail className="size-[18px]" strokeWidth={1.9} aria-hidden /> Email instead</a>
              <button type="button" onClick={c.copy} className="inline-flex h-12 items-center gap-2 px-3 font-medium text-muted-foreground transition-colors hover:text-foreground"><Copy className="size-[18px]" strokeWidth={1.9} aria-hidden /> Copy message</button>{c.hasSaved && <button type="button" onClick={c.reset} className="inline-flex h-12 items-center px-3 text-[0.95rem] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">Clear saved choices</button>}
            </div>
            <span className="crop-b" aria-hidden />
          </div>
        </div>
      </div>
      <footer className="border-t border-border"><div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-[0.9rem] text-muted-foreground"><span>© 2026 First Man Handyman (FMH) · Adam Ingraham</span><nav aria-label="Legal and print" className="flex flex-wrap gap-x-5 gap-y-1"><a href="legal/#terms" className="link-line">Terms of service</a><a href="legal/#privacy" className="link-line">Privacy policy</a><a href="../print/" className="link-line">Print a card</a></nav><span>Roseville · Rocklin · Granite Bay · Loomis · Lincoln · Sheridan, CA</span></div></footer>
    </section>
  )
}

export default function App() {
  const lb = useJobHash()
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="content">
        <Hero />
        <Work onOpen={lb.open} />
        <Services />
        <Materials />
        <Reviews />
        <Area />
        <Faq />
      <Contact />
      </main>
      <JobLightbox {...lb} />
      <nav aria-label="Call or text Adam" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-2 pb-[max(8px,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <a href={PHONE_TEL} className="inline-flex h-12 items-center justify-center gap-2 border border-primary bg-primary font-semibold text-primary-foreground"><Phone className="size-[18px]" strokeWidth={1.9} aria-hidden /> Call</a>
        <a href={PHONE_SMS} className="inline-flex h-12 items-center justify-center gap-2 border border-foreground/60 font-semibold"><MessageSquare className="size-[18px]" strokeWidth={1.9} aria-hidden /> Text</a>
      </nav>
      <Toaster position="bottom-center" theme="dark" />
    </MotionConfig>
  )
}
