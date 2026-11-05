import * as React from "react"
import { Photo } from "@/shared/Photo"
import { Tel } from "@/shared/Tel"
import * as Accordion from "@radix-ui/react-accordion"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Pause, Play, Check, Copy, Facebook, Instagram, Mail, MessageCircle, MessageSquare, Phone, Plus, Star } from "lucide-react"
import { Toaster } from "sonner"
import {
  EMAIL, FACEBOOK, FAQ, GOOGLE_REVIEW, INSTAGRAM, JOBS, JOB_TYPES, MESSENGER, PHONE, PHONE_SMS, PHONE_TEL,
  REVIEWS, SERVICE_GROUPS, TOWNS, areaPath,
} from "@/shared/data"
import { JobLightbox, useComposer, useJobHash } from "@/shared/hooks"
import { Reveal } from "@/shared/motion"
import { cn } from "@/lib/utils"

const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services.map((s) => s.name))
const hero = JOBS[0]

function Header() {
  return (
    <header className="border-b-2 border-border bg-background">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <a href="#top" translate="no" className="whitespace-nowrap font-display text-[1.7rem] font-extrabold uppercase leading-none tracking-tight sm:text-[2rem]">
          First Man <span className="text-rust">Handyman</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 font-display text-xl font-bold uppercase tracking-wide lg:flex">
          {[["#work", "Work"], ["#services", "Services"], ["#reviews", "Reviews"], ["#faq", "Questions"]].map(([h, l]) => <a key={h} href={h} className="link-line">{l}</a>)}
        </nav>
        <a href={PHONE_TEL} className="press hard-sm inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap border-2 border-border bg-primary px-4 font-display text-xl font-bold uppercase text-primary-foreground">
          <Phone className="size-[18px]" strokeWidth={2.2} aria-hidden /><span className="sm:hidden">Call</span><span className="hidden sm:inline"><Tel /></span>
        </a>
      </div>
    </header>
  )
}

function Ticker() {
  const [paused, setPaused] = React.useState(false)
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ALL_SERVICES.map((s) => (
        <span key={s} className="flex items-center whitespace-nowrap px-5 font-display text-xl font-bold uppercase tracking-wide">
          {s}<span className="ml-10 inline-block size-2.5 bg-foreground" aria-hidden />
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative border-b-2 border-border bg-primary" role="region" aria-label="Everything I fix">
      <div className={cn("marquee-wrap overflow-hidden py-2.5 pr-32", paused && "is-paused")}>
        <div className="marquee">{row(false)}{row(true)}</div>
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="marquee-btn absolute right-3 top-1/2 inline-flex h-11 -translate-y-1/2 items-center gap-1.5 border-2 border-border bg-background px-3 font-display text-lg font-bold uppercase"
      >
        {paused ? <Play className="size-4" strokeWidth={2.4} aria-hidden /> : <Pause className="size-4" strokeWidth={2.4} aria-hidden />}
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  )
}

const line = { hidden: { y: "105%" }, show: (i: number) => ({ y: 0, transition: { duration: 0.6, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] } }) }

function Hero() {
  const reduce = useReducedMotion()
  const lines = ["Small jobs.", "Done carefully."]
  return (
    <section id="top" className="border-b-2 border-border">
      <div className="wrap grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <h1 className="text-[4.2rem] leading-[0.86] sm:text-[6.6rem] lg:text-[7rem] xl:text-[7.6rem]">
            {lines.map((t, i) => (
              <span key={t} className="block overflow-hidden pb-[0.06em]">
                <motion.span className={cn("block", i === 1 && "text-rust")} variants={line} custom={i} initial={reduce ? "show" : "hidden"} animate="show">{t}</motion.span>
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-[34rem] text-xl text-muted-foreground">
            I’m Adam Ingraham, a local handyman for repairs, installs and small projects in {TOWNS.slice(0, -1).join(", ")} and {TOWNS[TOWNS.length - 1]}. Cleaned up after, every job.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={PHONE_TEL} className="press hard inline-flex min-h-14 items-center gap-3 border-2 border-border bg-primary px-6 font-display text-2xl font-extrabold uppercase text-primary-foreground sm:text-3xl">
              <Phone className="size-6" strokeWidth={2.4} aria-hidden /> Call or text <Tel />
            </a>
            <a href={MESSENGER} className="link-line inline-flex items-center gap-2 text-lg font-semibold"><MessageCircle className="size-5" strokeWidth={2} aria-hidden /> Message on Facebook</a>
          </div>
        </div>
        <motion.a
          href="#work"
          initial={reduce ? false : { opacity: 0.4, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="hard block border-2 border-border bg-card p-2"
        >
          <Photo job={hero} sizes="(min-width: 1024px) 520px, 92vw" eager alt="Before and after: a broken toilet, then the new toilet installed" className="aspect-[4/3] w-full object-cover" />
          <span className="mt-2 flex items-center justify-between gap-3 px-1 pb-0.5 font-display text-xl font-bold uppercase"><span>Toilet replacement</span><span className="inline-flex items-center gap-1 text-rust">See all jobs <ArrowUpRight className="size-5" strokeWidth={2.4} aria-hidden /></span></span>
        </motion.a>
      </div>
      <ul className="wrap grid gap-x-8 gap-y-1 border-t-2 border-border py-4 font-display text-xl font-bold uppercase tracking-wide sm:grid-cols-4">
        {["5-star rated on Google", "Evenings and weekends", "Your materials welcome", "Text a photo for a quick answer"].map((f) => <li key={f} className="flex items-center gap-2"><span className="size-2.5 shrink-0 bg-primary outline outline-2 outline-foreground" aria-hidden />{f}</li>)}
      </ul>
    </section>
  )
}

function Work({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="work" className="border-b-2 border-border py-16 sm:py-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[3.6rem] sm:text-[6rem]">Recent work</h2>
          <p className="max-w-[24rem] text-lg text-muted-foreground">Real jobs from real homes. Tap any photo to see it larger.</p>
        </div>
        <ul className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {JOBS.map((j, i) => {
            const wide = j.id === "toilet" || j.id === "kitchen-sink"
            return (
              <Reveal as="li" key={j.id} delay={(i % 4) * 0.05} className={cn("relative aspect-square", wide && "col-span-2 row-span-2")}>
                <button onClick={() => onOpen(j.id)} className="press hard-sm group absolute inset-0 block overflow-hidden border-2 border-border bg-card">
                  <Photo job={j} sizes="(min-width: 1024px) 600px, 50vw" alt="" className={cn("size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]", wide || j.kind === "before-after" ? "object-contain bg-card" : "object-cover")} />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t-2 border-border bg-primary px-2.5 py-1.5 text-left font-display text-[1.05rem] font-bold uppercase leading-tight text-primary-foreground sm:text-xl">
                    <span>{j.title}</span>{j.kind === "before-after" && <span className="hidden shrink-0 text-[0.9rem] sm:inline">Before + after</span>}
                  </span>
                </button>
              </Reveal>
            )
          })}
          <Reveal as="li" className="aspect-square">
            <div className="hard-sm flex size-full flex-col justify-between border-2 border-border bg-foreground p-4 text-background">
              <p className="font-display text-[1.6rem] font-extrabold uppercase leading-[0.92] sm:text-5xl">Want yours next?</p>
              <div>
                <p className="mb-3 hidden text-[0.95rem] opacity-85 sm:block">Text a photo of the job for a quick answer.</p>
                <a href={PHONE_SMS} className="press inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap border-2 border-background bg-primary px-2.5 font-display text-lg font-extrabold uppercase text-primary-foreground sm:px-3.5 sm:text-xl">Text Adam <ArrowUpRight className="size-5" strokeWidth={2.4} aria-hidden /></a>
              </div>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}

function Services() {
  const [inside, outside, car] = SERVICE_GROUPS
  const panel = (g: typeof inside, tone: string, className?: string) => (
    <Reveal className={cn("border-2 border-border hard", tone, className)}>
      <h3 className="border-b-2 border-border bg-foreground px-5 py-3 text-[2.2rem] text-background sm:text-5xl">{g.label}</h3>
      <ul className="divide-y-2 divide-border/70 px-5">
        {g.services.map((s) => (
          <li key={s.name} className="py-4">
            <p className="font-display text-[1.7rem] font-extrabold uppercase leading-none sm:text-3xl">{s.name}</p>
            <p className="mt-1 text-[0.98rem] opacity-80">{s.blurb}</p>
            <p className="mt-2 leading-snug">{s.items.join(" / ")}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  )
  return (
    <section id="services" className="border-b-2 border-border bg-muted py-16 sm:py-24">
      <div className="wrap">
        <h2 className="text-[3.6rem] sm:text-[6rem]">What I can help with</h2>
        <p className="mt-4 max-w-[38rem] text-lg text-muted-foreground">Everyday home repairs and installs, plus simple car and yard jobs, done carefully and cleaned up after.</p>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {panel(inside, "bg-card")}
          <div className="grid gap-8">{panel(outside, "bg-primary text-primary-foreground")}{panel(car, "bg-card")}</div>
        </div>
        <p className="mt-10 font-display text-2xl font-bold uppercase sm:text-3xl">Don’t see what you need? <a href={PHONE_TEL} className="link-line text-rust">Call or text <Tel /></a> and just ask.</p>
      </div>
    </section>
  )
}

function Materials() {
  return (
    <section id="materials" className="border-b-2 border-border bg-primary text-primary-foreground">
      <div className="wrap grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <h2 className="text-[3.8rem] leading-[0.88] sm:text-[7rem]">Your materials, my labor.</h2>
          <p className="mt-6 max-w-[36rem] text-xl">Want to keep a repair on a budget? Pick up the parts or materials you like, such as the faucet, the toilet or the vinyl plank, and I’ll provide the labor to install it right.</p>
          <a href={PHONE_SMS} className="press hard mt-8 inline-flex min-h-14 items-center gap-2 border-2 border-border bg-foreground px-6 font-display text-2xl font-extrabold uppercase text-background">Text me a question <ArrowUpRight className="size-6" strokeWidth={2.4} aria-hidden /></a>
        </Reveal>
        <ul className="grid content-center gap-4 lg:col-span-5">
          {[["You choose the exact product and price", "Faucet, toilet, vinyl plank. Whatever you pick is what goes in."], ["I bring the tools and the know-how", "The install is mine, from start to finish."], ["Not sure what to buy?", "Text me and ask."]].map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 0.08} className="hard-sm border-2 border-border bg-foreground p-5 text-background">
              <p className="font-display text-[1.7rem] font-extrabold uppercase leading-none sm:text-3xl">{t}</p>
              <p className="mt-1.5 opacity-85">{d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="border-b-2 border-border py-16 sm:py-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex gap-1" role="img" aria-label="5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-7 fill-primary text-foreground" strokeWidth={1.5} aria-hidden />)}</div>
            <h2 className="mt-3 text-[3.6rem] sm:text-[6rem]">5-star rated on Google</h2>
          </div>
          <a href={GOOGLE_REVIEW} target="_blank" rel="noopener noreferrer" className="press hard-sm inline-flex min-h-12 items-center gap-2 border-2 border-border bg-card px-5 font-display text-xl font-bold uppercase">Leave a review on Google <ArrowUpRight className="size-5" strokeWidth={2.4} aria-hidden /></a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08} className={cn("hard border-2 border-border p-6", i === 0 ? "bg-primary text-primary-foreground lg:row-span-1" : "bg-card")}>
              <span className="block font-display text-8xl font-extrabold leading-[0.6] opacity-90" aria-hidden>“</span>
              <blockquote className={cn("mt-2", i === 0 ? "text-[1.35rem] font-medium leading-snug" : "text-xl leading-snug")}>{r.text}</blockquote>
              <p className="mt-5 font-display text-xl font-bold uppercase">{r.name} <span className="font-medium">· Google review</span></p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Area() {
  return (
    <section id="area" className="border-b-2 border-border bg-navy text-navy-ink">
      <div className="wrap py-16 sm:py-24">
        <h2 className="text-[3.2rem] sm:text-[5.5rem]">Proudly serving south Placer County</h2>
        <p className="mt-4 text-xl text-navy-mute">Handyman service in these communities and nearby. Based in Sheridan, CA.</p>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-1 font-display text-[3rem] font-extrabold uppercase leading-[1.02] sm:text-[5.2rem]">
          {TOWNS.map((t, i) => <li key={t} className="flex items-center gap-5 transition-colors hover:text-primary"><a href={areaPath(t)} className="underline decoration-primary decoration-[3px] underline-offset-[0.1em]">{t}</a>{i < TOWNS.length - 1 && <span className="text-primary" aria-hidden>/</span>}</li>)}
        </ul>
      </div>
      <div className="hazard h-6 border-y-2 border-foreground" aria-hidden />
      <div className="bg-card text-foreground">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-8">
          <div><h3 className="text-[2rem] sm:text-5xl">Evening and weekend appointments available</h3><p className="mt-2 max-w-[38rem] text-lg text-muted-foreground">Busy during the workday? I can schedule evenings and weekends so you don’t have to take time off.</p></div>
          <a href={PHONE_SMS} className="press hard inline-flex min-h-14 items-center gap-2 border-2 border-border bg-primary px-6 font-display text-2xl font-extrabold uppercase text-primary-foreground">Text to book a time</a>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="border-b-2 border-border py-16 sm:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4"><div className="lg:sticky lg:top-8">
          <h2 className="text-[3.2rem] sm:text-[5rem]">Frequently asked questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">Something else? <a href={PHONE_TEL} className="link-line font-semibold text-rust">Call or text <Tel /></a>.</p>
        </div></div>
        <Accordion.Root type="single" collapsible defaultValue="f0" className="space-y-3 lg:col-span-8">
          {FAQ.map((f, n) => (
            <Accordion.Item key={f.q} value={`f${n}`} className="border-2 border-border bg-card data-[state=open]:bg-primary data-[state=open]:text-primary-foreground hard-sm">
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-[64px] w-full items-center justify-between gap-5 px-5 py-3 text-left font-display text-[1.5rem] font-bold uppercase leading-tight sm:text-3xl">
                  {f.q}<Plus className="size-7 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45" strokeWidth={2.6} aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"><p className="max-w-[42rem] px-5 pb-5 text-lg">{f.a}</p></Accordion.Content>
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
    <section id="contact" className="bg-foreground text-background">
      <div className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 className="text-[4rem] leading-[0.88] sm:text-[7rem]">Let’s get it <span className="text-primary">fixed.</span></h2>
          <p className="mt-5 max-w-[26rem] text-xl opacity-85">Tell me what needs doing. A photo by text helps me give you a quick answer.</p>
          <a href={PHONE_TEL} className="mt-8 inline-flex min-h-14 items-center gap-3 border-2 border-background bg-primary px-6 font-display text-2xl font-extrabold uppercase text-primary-foreground transition-colors hover:bg-background"><Phone className="size-6" strokeWidth={2.4} aria-hidden /> Call or text <Tel /></a>
          <ul className="mt-10 space-y-3">
            <li className="flex items-center gap-3"><Mail className="size-5" strokeWidth={2} aria-hidden /><a className="link-line" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li className="flex items-center gap-3"><Facebook className="size-5" strokeWidth={2} aria-hidden /><a className="link-line" href={FACEBOOK}>facebook.com/firstmanhandyman</a></li>
            <li className="flex items-center gap-3"><Instagram className="size-5" strokeWidth={2} aria-hidden /><a className="link-line" href={INSTAGRAM}>@first.man.handyman</a></li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="border-2 border-background bg-card p-5 text-foreground shadow-[8px_8px_0_0_oklch(var(--primary))] sm:p-8">
            <h3 className="text-[2.2rem] sm:text-5xl">Write the text for me</h3>
            <p className="mt-2 text-muted-foreground">Pick what applies. Your message builds below, then opens in your texting app.</p>
            <fieldset className="mt-6"><legend className="mb-3 font-display text-xl font-bold uppercase">What needs doing?</legend>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((t) => { const on = c.picked.includes(t); return (
                  <button key={t} type="button" aria-pressed={on} onClick={() => c.toggle(t)} className={cn("inline-flex min-h-11 items-center gap-1.5 border-2 border-border px-3.5 text-[1.02rem] font-semibold transition-colors", on ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted")}>
                    {on && <Check className="size-4" strokeWidth={3} aria-hidden />}{t}
                  </button>) })}
              </div>
            </fieldset>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block font-display text-xl font-bold uppercase">Your town
                <select name="town" autoComplete="off" value={c.town} onChange={(e) => c.setTown(e.target.value)} className="mt-2 block h-12 w-full border-2 border-border bg-card px-3 font-sans text-base font-normal normal-case"><option value="">Not sure / other</option>{TOWNS.map((t) => <option key={t}>{t}</option>)}</select>
              </label>
              <label className="block font-display text-xl font-bold uppercase sm:col-span-2">Anything else
                <textarea name="note" autoComplete="off" value={c.note} onChange={(e) => c.setNote(e.target.value)} rows={2} placeholder="The kitchen faucet drips when it’s off…" className="mt-2 block w-full resize-y border-2 border-border bg-card px-3 py-3 font-sans text-base font-normal normal-case placeholder:text-muted-foreground/70" />
              </label>
            </div>
            <p className="sr-only" role="status" aria-live="polite">{c.liveMessage}</p>
            <div className="mt-6 border-2 border-dashed border-border p-4"><p className="font-display text-lg font-bold uppercase text-muted-foreground">Your message</p><p className="mt-1 text-lg leading-snug">{c.message}</p></div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={c.smsHref} className="press hard-sm inline-flex min-h-12 items-center gap-2 border-2 border-border bg-primary px-5 font-display text-xl font-extrabold uppercase text-primary-foreground"><MessageSquare className="size-5" strokeWidth={2.4} aria-hidden /> Text Adam</a>
              <a href={c.mailHref} className="press hard-sm inline-flex min-h-12 items-center gap-2 border-2 border-border bg-card px-5 font-display text-xl font-extrabold uppercase"><Mail className="size-5" strokeWidth={2.4} aria-hidden /> Email instead</a>
              <button type="button" onClick={c.copy} className="inline-flex min-h-12 items-center gap-2 px-3 font-semibold text-muted-foreground transition-colors hover:text-foreground"><Copy className="size-5" strokeWidth={2} aria-hidden /> Copy message</button>{c.hasSaved && <button type="button" onClick={c.reset} className="inline-flex h-12 items-center px-3 text-[0.95rem] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">Clear saved choices</button>}
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t-2 border-background/30"><div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 opacity-85"><span>© 2026 First Man Handyman (FMH) · Adam Ingraham</span><nav aria-label="Legal and print" className="flex flex-wrap gap-x-5 gap-y-1"><a href="legal/#terms" className="link-line">Terms of service</a><a href="legal/#privacy" className="link-line">Privacy policy</a><a href="../print/" className="link-line">Print a card</a></nav><span>Roseville · Rocklin · Granite Bay · Loomis · Lincoln · Sheridan, CA</span></div></footer>
    </section>
  )
}

export default function App() {
  const lb = useJobHash()
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <Ticker />
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
      <nav aria-label="Call or text Adam" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t-2 border-border bg-background p-2 pb-[max(8px,env(safe-area-inset-bottom))] md:hidden">
        <a href={PHONE_TEL} className="inline-flex h-12 items-center justify-center gap-2 border-2 border-border bg-primary font-display text-xl font-extrabold uppercase text-primary-foreground"><Phone className="size-[18px]" strokeWidth={2.4} aria-hidden /> Call</a>
        <a href={PHONE_SMS} className="inline-flex h-12 items-center justify-center gap-2 border-2 border-border bg-card font-display text-xl font-extrabold uppercase"><MessageSquare className="size-[18px]" strokeWidth={2.4} aria-hidden /> Text</a>
      </nav>
      <Toaster position="bottom-center" />
    </MotionConfig>
  )
}
