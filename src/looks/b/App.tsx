import * as React from "react"
import { Photo } from "@/shared/Photo"
import { Tel } from "@/shared/Tel"
import * as Accordion from "@radix-ui/react-accordion"
import { AnimatePresence, MotionConfig, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Check, Copy, Facebook, Instagram, Mail, MessageCircle, MessageSquare, Phone, Plus } from "lucide-react"
import { Toaster } from "sonner"
import {
  EMAIL, FACEBOOK, FAQ, GOOGLE_REVIEW, INSTAGRAM, JOBS, JOB_TYPES, MESSENGER, PHONE, PHONE_SMS, PHONE_TEL,
  REVIEWS, SERVICE_GROUPS, TOWNS, areaPath, type Job,
} from "@/shared/data"
import { JobLightbox, useComposer, useJobHash } from "@/shared/hooks"
import { Counter, Reveal } from "@/shared/motion"
import { cn } from "@/lib/utils"

const byId = (id: string) => JOBS.find((j) => j.id === id)!
const SERVICE_PHOTO: Record<string, string> = {
  "Toilets, sinks & disposals": "toilet", "Showers & baths": "shower-sweep", "Cabinets, doors & hardware": "bath-sink",
  "TV mounting & assembly": "tv-mount", Flooring: "vinyl-plank", "Exterior & seasonal": "patio", "Yard work": "side-yard",
  "Brush & hauling": "tree-brush",
}
const KINDS = SERVICE_GROUPS.reduce((n, g) => n + g.services.length, 0)

/* ---------- header: floating bar ---------- */
function Header() {
  const links = [["#work", "Work"], ["#services", "Services"], ["#reviews", "Reviews"], ["#faq", "Questions"], ["#contact", "Contact"]]
  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4 sm:px-4">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-4 rounded-lg border border-border bg-background/85 px-4 backdrop-blur-md">
        <a href="#top" translate="no" className="font-display text-[1.25rem] leading-none whitespace-nowrap">First Man Handyman</a>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="link-line text-[0.95rem] text-foreground/75 hover:text-foreground">{l}</a>)}
        </nav>
        <a href={PHONE_TEL} className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-primary px-3.5 text-[0.95rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
          <Phone className="size-4" strokeWidth={1.9} aria-hidden />
          <span className="sm:hidden">Call</span><span className="hidden sm:inline"><Tel /></span>
        </a>
      </div>
    </header>
  )
}

/* ---------- hero: headline + three photos drifting at different speeds ---------- */
function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const yA = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -70])
  const yB = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -150])
  const yC = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -30])
  const [a, b, c] = [byId("toilet"), byId("kitchen-faucet"), byId("patio")]
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="wrap grid items-center gap-12 pb-16 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <motion.h1
            className="text-[2.9rem] leading-[1.02] sm:text-[4.4rem] lg:text-[5rem]"
            initial={{ opacity: 0.4, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          >
            Small jobs around the house, <span className="text-rust">done carefully.</span>
          </motion.h1>
          <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground sm:text-xl">
            I’m Adam Ingraham, a local handyman for repairs, installs and small projects in {TOWNS.slice(0, -1).join(", ")} and {TOWNS[TOWNS.length - 1]}. Cleaned up after, every job.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={PHONE_TEL} className="inline-flex h-14 items-center gap-2.5 rounded-md bg-primary px-6 text-lg font-semibold text-primary-foreground transition-[background-color,transform] hover:bg-primary/85 active:translate-y-px">
              <Phone className="size-5" strokeWidth={1.9} aria-hidden /> Call or text <Tel />
            </a>
            <a href={MESSENGER} className="link-line inline-flex items-center gap-2 font-medium"><MessageCircle className="size-[18px]" strokeWidth={1.75} aria-hidden /> Message on Facebook</a>
          </div>
        </div>

        <div className="relative grid grid-cols-2 items-start gap-3 sm:gap-4" aria-label="Recent jobs">
          <motion.a href="#work" style={{ y: yA }} className="photo-edge col-span-2 block overflow-hidden rounded-md bg-card p-1.5" aria-label="See recent work">
            <Photo job={a} sizes="(min-width: 1024px) 560px, 92vw" eager alt="Before and after of a toilet replacement" className="aspect-[4/3] w-full rounded-[3px] object-cover" />
          </motion.a>
          <motion.a href="#work" style={{ y: yB }} className="photo-edge block overflow-hidden rounded-md bg-card p-1.5" aria-label="See recent work">
            <Photo job={b} sizes="(min-width: 1024px) 270px, 45vw" alt="A new pull-down kitchen faucet and stainless sink" className="aspect-[4/5] w-full rounded-[3px] object-cover" />
          </motion.a>
          <motion.a href="#work" style={{ y: yC }} className="photo-edge mt-10 block overflow-hidden rounded-md bg-card p-1.5 sm:mt-14" aria-label="See recent work">
            <Photo job={c} sizes="(min-width: 1024px) 270px, 45vw" alt="Rotted patio wood replaced with new boards" className="aspect-[4/5] w-full rounded-[3px] object-cover" />
          </motion.a>
        </div>
      </div>

      <div className="border-y border-border bg-card">
        <dl className="wrap grid grid-cols-3 divide-x divide-border py-7 text-center sm:py-9">
          {[
            [<Counter key="k" to={KINDS} className="tabular-nums" />, "kinds of jobs"],
            [<Counter key="t" to={TOWNS.length} className="tabular-nums" />, "towns served"],
            [<span key="s">5-star</span>, "on Google"],
          ].map(([n, l], i) => (
            <div key={i} className="px-2">
              <dd className="font-display text-[2rem] leading-none text-rust sm:text-5xl">{n}</dd>
              <dt className="mt-2 text-[0.9rem] text-muted-foreground sm:text-base">{l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------- recent work: a rail you grab and drag ---------- */
function JobCard({ j, onOpen, dragged }: { j: Job; onOpen: (id: string) => void; dragged: React.MutableRefObject<boolean> }) {
  return (
    <button
      data-card
      onClick={() => { if (!dragged.current) onOpen(j.id) }}
      className="group block shrink-0 select-none text-left"
    >
      <span className="photo-edge block overflow-hidden rounded-md bg-card p-1.5">
        <Photo job={j} sizes="(min-width: 640px) 520px, 78vw" alt="" draggable={false}
          className="block h-[var(--card-h)] w-auto max-w-none rounded-[3px] transition-transform duration-500 ease-out group-hover:scale-[1.02]" style={{ aspectRatio: `${j.w} / ${j.h}` }} />
      </span>
      <span className="mt-3 flex items-baseline justify-between gap-4 px-0.5">
        <span className="font-display text-xl leading-tight">{j.title}</span>
        {j.kind === "before-after" && <span className="shrink-0 text-[0.8rem] font-medium text-rust">Before and after</span>}
      </span>
      <span className="block px-0.5 text-[0.95rem] text-muted-foreground">{j.note}</span>
    </button>
  )
}

function Rail({ onOpen }: { onOpen: (id: string) => void }) {
  const reduce = useReducedMotion()
  const view = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLDivElement>(null)
  const dragged = React.useRef(false)
  const x = useMotionValue(0)
  const [max, setMax] = React.useState(0) // how far the track can travel to the left
  const [pos, setPos] = React.useState({ start: true, end: false })
  const progress = useTransform(x, (v) => `${max > 0 ? Math.round(Math.min(1, Math.max(0, -v / max)) * 100) : 0}%`)

  React.useLayoutEffect(() => {
    const measure = () => {
      const v = view.current, t = track.current
      if (v && t) setMax(Math.max(0, t.scrollWidth - v.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    if (view.current) ro.observe(view.current)
    window.addEventListener("resize", measure)
    return () => { ro.disconnect(); window.removeEventListener("resize", measure) }
  }, [])

  useMotionValueEvent(x, "change", (v) => { const s = v >= -1, e = v <= -max + 1; setPos((p) => (p.start === s && p.end === e ? p : { start: s, end: e })) })
  React.useEffect(() => setPos({ start: x.get() >= -1, end: x.get() <= -max + 1 }), [max, x])

  const moveTo = (target: number) => {
    const t = Math.min(0, Math.max(-max, target))
    if (reduce) x.set(t)
    else animate(x, t, { type: "spring", stiffness: 220, damping: 32, mass: 0.9 })
  }
  const by = (dir: 1 | -1) => moveTo(x.get() - dir * (view.current?.clientWidth ?? 600) * 0.8)

  return (
    <section id="work" className="border-t border-border pb-16 [--card-h:min(52svh,460px)]">
      <div className="wrap flex flex-wrap items-end justify-between gap-6 pt-20 sm:pt-28">
        <div>
          <h2 className="text-[2.4rem] sm:text-6xl">Recent work</h2>
          <p className="mt-4 max-w-[34rem] text-lg text-muted-foreground">Real jobs from real homes. Drag the photos sideways or use the arrows, and tap one to see it larger.</p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Move the photos">
          <button type="button" onClick={() => by(-1)} disabled={pos.start} aria-label="Show earlier jobs" className="grid size-12 place-items-center rounded-md border border-border transition-colors hover:border-foreground/60 disabled:opacity-35 disabled:hover:border-border">
            <ArrowLeft className="size-5" strokeWidth={1.75} aria-hidden />
          </button>
          <button type="button" onClick={() => by(1)} disabled={pos.end} aria-label="Show later jobs" className="grid size-12 place-items-center rounded-md border border-border transition-colors hover:border-foreground/60 disabled:opacity-35 disabled:hover:border-border">
            <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={view}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Recent jobs. Use the left and right arrow keys to move."
        className="mt-10 overflow-hidden"
        onScroll={(e) => { e.currentTarget.scrollLeft = 0 }}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.key === "ArrowRight") { e.preventDefault(); by(1) }
          else if (e.key === "ArrowLeft") { e.preventDefault(); by(-1) }
          else if (e.key === "Home") { e.preventDefault(); moveTo(0) }
          else if (e.key === "End") { e.preventDefault(); moveTo(-max) }
        }}
        onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) x.set(Math.min(0, Math.max(-max, x.get() - e.deltaX))) }}
        onFocusCapture={(e) => {
          const card = (e.target as HTMLElement).closest("[data-card]") as HTMLElement | null
          const v = view.current
          if (!card || !v) return
          const left = card.offsetLeft, right = left + card.offsetWidth, cur = -x.get(), w = v.clientWidth
          if (left < cur + 24) moveTo(-(left - 24))
          else if (right > cur + w - 24) moveTo(-(right - w + 24))
        }}
      >
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={reduce ? 0 : 0.12}
          dragMomentum={!reduce}
          dragTransition={{ power: 0.32, timeConstant: 320, bounceStiffness: 260, bounceDamping: 36 }}
          style={{ x, touchAction: "pan-y" }}
          onDragStart={() => { dragged.current = true }}
          onDragEnd={() => { window.setTimeout(() => { dragged.current = false }, 60) }}
          className="relative flex w-max cursor-grab select-none gap-6 pl-5 pr-8 will-change-transform active:cursor-grabbing sm:pl-[max(20px,calc((100vw-1200px)/2+20px))]"
        >
          {JOBS.map((j) => <JobCard key={j.id} j={j} onOpen={onOpen} dragged={dragged} />)}
          <div className="flex h-[var(--card-h)] w-[min(80vw,420px)] shrink-0 flex-col justify-end self-start rounded-md border border-dashed border-border p-6">
            <p className="font-display text-3xl leading-tight">Want yours next?</p>
            <p className="mt-2 text-muted-foreground">Text a photo of the job for a quick answer.</p>
            <a href={PHONE_SMS} className="mt-5 inline-flex h-12 w-fit items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/85">Text Adam <ArrowRight className="size-[18px]" strokeWidth={1.9} aria-hidden /></a>
          </div>
        </motion.div>
      </div>

      <div className="wrap mt-8" aria-hidden>
        <div className="h-px w-full bg-border"><motion.div className="h-px bg-primary" style={{ width: progress }} /></div>
      </div>
    </section>
  )
}

/* ---------- services accordion ---------- */
function Services() {
  const [open, setOpen] = React.useState("Toilets, sinks & disposals")
  return (
    <section id="services" className="border-t border-border py-20 sm:py-28">
      <div className="wrap">
        <h2 className="text-[2.4rem] sm:text-6xl">What I can help with</h2>
        <p className="mt-4 max-w-[36rem] text-lg text-muted-foreground">Everyday home repairs and installs, plus simple car and yard jobs, done carefully and cleaned up after.</p>
        <div className="mt-12 space-y-12">
          {SERVICE_GROUPS.map((g) => (
            <div key={g.id}>
              <h3 className="font-display text-2xl text-rust">{g.label}</h3>
              <Accordion.Root type="single" collapsible value={open} onValueChange={setOpen} className="mt-3 border-t border-foreground/40">
                {g.services.map((s) => {
                  const photo = SERVICE_PHOTO[s.name] ? byId(SERVICE_PHOTO[s.name]) : null
                  return (
                    <Accordion.Item key={s.name} value={s.name} className="border-b border-border">
                      <Accordion.Header>
                        <Accordion.Trigger className="group flex min-h-[72px] w-full items-center justify-between gap-6 py-4 text-left">
                          <span>
                            <span className="block font-display text-[1.55rem] leading-tight transition-colors group-hover:text-rust group-data-[state=open]:text-rust sm:text-[1.95rem]">{s.name}</span>
                            <span className="mt-0.5 block text-muted-foreground">{s.blurb}</span>
                          </span>
                          <Plus className="size-6 shrink-0 text-rust transition-transform duration-200 group-data-[state=open]:rotate-45" strokeWidth={1.6} aria-hidden />
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className={cn("grid gap-6 pb-7", photo && "md:grid-cols-[minmax(0,1fr)_minmax(0,320px)]")}>
                          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
                            {s.items.map((it) => (
                              <li key={it} className="flex gap-3 border-t border-border/70 py-2.5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                                <Check className="mt-1 size-4 shrink-0 text-rust" strokeWidth={2} aria-hidden /><span>{it}</span>
                              </li>
                            ))}
                          </ul>
                          {photo && (
                            <figure>
                              <Photo job={photo} sizes="(min-width: 768px) 320px, 92vw" alt={`${photo.title}: ${photo.note}`} className="photo-edge aspect-[4/3] w-full rounded-md bg-card object-cover p-1" />
                              <figcaption className="mt-2 text-[0.85rem] text-muted-foreground">Recent job: {photo.title}</figcaption>
                            </figure>
                          )}
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  )
                })}
              </Accordion.Root>
            </div>
          ))}
        </div>
        <p className="mt-10 text-lg">Don’t see what you need? <a href={PHONE_TEL} className="link-line font-semibold text-rust">Call or text <Tel /></a> and just ask.</p>
      </div>
    </section>
  )
}

/* ---------- your materials ---------- */
function Materials() {
  const steps = [["You choose the exact product and price", "Faucet, toilet, vinyl plank. Whatever you pick is what goes in."], ["I bring the tools and the know-how", "The install is mine, from start to finish."], ["Not sure what to buy?", "Text me and ask."]]
  return (
    <section id="materials" className="border-t border-border bg-card py-20 sm:py-28">
      <div className="wrap">
        <Reveal className="max-w-[46rem]">
          <h2 className="text-[2.6rem] sm:text-6xl lg:text-7xl">Your materials, my labor.</h2>
          <p className="mt-6 max-w-[38rem] text-lg text-muted-foreground">Want to keep a repair on a budget? Pick up the parts or materials you like, such as the faucet, the toilet or the vinyl plank, and I’ll provide the labor to install it right.</p>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 0.08} className="bg-background p-6 sm:p-8">
              <span className="font-display text-4xl text-rust">{i + 1}</span>
              <p className="mt-4 font-display text-2xl leading-snug">{t}</p>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </ul>
        <a href={PHONE_SMS} className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/85">Text me a question <ArrowUpRight className="size-[18px]" strokeWidth={1.9} aria-hidden /></a>
      </div>
    </section>
  )
}

/* ---------- reviews: one big quote, auto-advancing, pausable ---------- */
function Reviews() {
  const reduce = useReducedMotion()
  const [i, setI] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [userPaused, setUserPaused] = React.useState(false)
  React.useEffect(() => {
    if (reduce || paused || userPaused) return
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 8000)
    return () => clearInterval(t)
  }, [reduce, paused, userPaused, i])
  const r = REVIEWS[i]
  return (
    <section id="reviews" className="border-t border-border py-20 sm:py-28" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[2.4rem] sm:text-6xl">5-star rated on Google</h2>
          <a href={GOOGLE_REVIEW} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1.5 font-semibold text-rust">Leave a review on Google <ArrowUpRight className="size-4" strokeWidth={1.9} aria-hidden /></a>
        </div>
        <div className="mt-12 min-h-[19rem] sm:min-h-[16rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure key={i} initial={{ opacity: 0.2, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
              <blockquote className="max-w-[56rem] font-display text-[1.7rem] leading-[1.25] sm:text-[2.5rem]">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3"><span className="h-px w-8 bg-primary" aria-hidden /><span className="font-semibold">{r.name}</span><span className="text-muted-foreground">Google review</span></figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Choose a review">
          {REVIEWS.map((x, n) => (
            <button key={x.name} aria-pressed={n === i} onClick={() => setI(n)} className={cn("h-11 rounded-md border px-4 text-[0.95rem] transition-colors", n === i ? "border-primary bg-primary text-primary-foreground font-semibold" : "border-muted-foreground/70 text-muted-foreground hover:text-foreground")}>{x.name}</button>
          ))}
        <button type="button" aria-pressed={userPaused} onClick={() => setUserPaused((v) => !v)} className="ml-auto inline-flex h-11 items-center gap-2 rounded-md border border-muted-foreground/70 px-3.5 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground">{userPaused ? <Play className="size-4" strokeWidth={1.9} aria-hidden /> : <Pause className="size-4" strokeWidth={1.9} aria-hidden />}{userPaused ? "Play quotes" : "Pause quotes"}</button>
        </div>
      </div>
    </section>
  )
}

/* ---------- area ---------- */
function Area() {
  return (
    <section id="area" className="border-t border-border bg-card py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="text-[2.4rem] sm:text-6xl">Proudly serving south Placer County</h2>
          <p className="mt-4 text-lg text-muted-foreground">Handyman service in these communities and nearby. Based in Sheridan, CA.</p>
          <ul className="mt-8 border-t border-foreground/40">
            {TOWNS.map((t) => (
              <li key={t} className="border-b border-border">
                <a href={areaPath(t)} className="group flex items-center justify-between py-3 font-display text-[2rem] leading-none transition-colors hover:text-rust sm:text-5xl">
                  {t}<ArrowRight className="size-6 -translate-x-2 text-rust opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" strokeWidth={1.6} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <h3 className="text-[1.9rem] sm:text-4xl">Evening and weekend appointments available</h3>
          <p className="mt-4 text-lg text-muted-foreground">Busy during the workday? I can schedule evenings and weekends so you don’t have to take time off.</p>
          <a href={PHONE_SMS} className="mt-6 inline-flex h-12 items-center rounded-md border border-foreground/60 px-5 font-semibold transition-colors hover:bg-foreground hover:text-background">Text to book a time</a>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- faq ---------- */
function Faq() {
  return (
    <section id="faq" className="border-t border-border py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4"><div className="lg:sticky lg:top-28">
          <h2 className="text-[2.4rem] sm:text-5xl">Frequently asked questions</h2>
          <p className="mt-5 text-muted-foreground">Something else? <a href={PHONE_TEL} className="link-line font-semibold text-rust">Call or text <Tel /></a>.</p>
        </div></div>
        <Accordion.Root type="single" collapsible defaultValue="f0" className="border-t border-foreground/40 lg:col-span-8">
          {FAQ.map((f, n) => (
            <Accordion.Item key={f.q} value={`f${n}`} className="border-b border-border">
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-[68px] w-full items-center justify-between gap-6 py-4 text-left font-display text-[1.4rem] leading-snug hover:text-rust sm:text-[1.65rem]">
                  {f.q}<Plus className="size-5 shrink-0 text-rust transition-transform duration-200 group-data-[state=open]:rotate-45" strokeWidth={1.6} aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"><p className="max-w-[40rem] pb-6 text-lg text-muted-foreground">{f.a}</p></Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}

/* ---------- contact ---------- */
function Contact() {
  const c = useComposer()
  return (
    <section id="contact" className="border-t border-border bg-card">
      <div className="wrap grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-[2.6rem] sm:text-6xl">Let’s get it fixed.</h2>
          <p className="mt-5 max-w-[26rem] text-lg text-muted-foreground">Tell me what needs doing. A photo by text helps me give you a quick answer.</p>
          <a href={PHONE_TEL} className="mt-8 inline-flex h-14 items-center gap-2.5 rounded-md bg-primary px-6 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/85"><Phone className="size-5" strokeWidth={1.9} aria-hidden /> Call or text <Tel /></a>
          <ul className="mt-10 space-y-3 text-[0.98rem]">
            <li className="flex items-center gap-3"><Mail className="size-[18px] text-muted-foreground" strokeWidth={1.5} aria-hidden /><a className="link-line" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li className="flex items-center gap-3"><Facebook className="size-[18px] text-muted-foreground" strokeWidth={1.5} aria-hidden /><a className="link-line" href={FACEBOOK}>facebook.com/firstmanhandyman</a></li>
            <li className="flex items-center gap-3"><Instagram className="size-[18px] text-muted-foreground" strokeWidth={1.5} aria-hidden /><a className="link-line" href={INSTAGRAM}>@first.man.handyman</a></li>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-md border border-border bg-background p-5 sm:p-8">
            <h3 className="text-2xl sm:text-3xl">Write the text for me</h3>
            <p className="mt-1 text-muted-foreground">Pick what applies. Your message builds below, then opens in your texting app.</p>
            <fieldset className="mt-6"><legend className="mb-3 font-semibold">What needs doing?</legend>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((t) => { const on = c.picked.includes(t); return (
                  <button key={t} type="button" aria-pressed={on} onClick={() => c.toggle(t)} className={cn("inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3.5 text-[0.95rem] transition-colors", on ? "border-primary bg-primary font-semibold text-primary-foreground" : "border-muted-foreground/70 hover:border-foreground")}>
                    {on && <Check className="size-4" strokeWidth={2.2} aria-hidden />}{t}
                  </button>) })}
              </div>
            </fieldset>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block font-semibold">Your town
                <select name="town" autoComplete="off" value={c.town} onChange={(e) => c.setTown(e.target.value)} className="mt-2 block h-12 w-full rounded-md border border-muted-foreground/70 bg-card px-3 text-base font-normal"><option value="">Not sure / other</option>{TOWNS.map((t) => <option key={t}>{t}</option>)}</select>
              </label>
              <label className="block font-semibold sm:col-span-2">Anything else
                <textarea name="note" autoComplete="off" value={c.note} onChange={(e) => c.setNote(e.target.value)} rows={2} placeholder="The kitchen faucet drips when it’s off…" className="mt-2 block w-full resize-y rounded-md border border-muted-foreground/70 bg-card px-3 py-3 text-base font-normal placeholder:text-muted-foreground/70" />
              </label>
            </div>
            <p className="sr-only" role="status" aria-live="polite">{c.liveMessage}</p>
            <div className="mt-6 rounded-md border border-dashed border-border p-4"><p className="text-[0.8rem] font-semibold text-muted-foreground">Your message</p><p className="mt-1 leading-relaxed">{c.message}</p></div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={c.smsHref} className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/85"><MessageSquare className="size-[18px]" strokeWidth={1.9} aria-hidden /> Text Adam</a>
              <a href={c.mailHref} className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/50 px-5 font-semibold transition-colors hover:bg-foreground hover:text-background"><Mail className="size-[18px]" strokeWidth={1.9} aria-hidden /> Email instead</a>
              <button type="button" onClick={c.copy} className="inline-flex h-12 items-center gap-2 rounded-md px-3 font-medium text-muted-foreground transition-colors hover:text-foreground"><Copy className="size-[18px]" strokeWidth={1.9} aria-hidden /> Copy message</button>{c.hasSaved && <button type="button" onClick={c.reset} className="inline-flex h-12 items-center px-3 text-[0.95rem] font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">Clear saved choices</button>}
            </div>
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
        <Rail onOpen={lb.open} />
        <Services />
        <Materials />
        <Reviews />
        <Area />
        <Faq />
      <Contact />
      </main>
      <JobLightbox {...lb} />
      <nav aria-label="Call or text Adam" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-2 pb-[max(8px,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <a href={PHONE_TEL} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground"><Phone className="size-[18px]" strokeWidth={1.9} aria-hidden /> Call</a>
        <a href={PHONE_SMS} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-foreground/60 font-semibold"><MessageSquare className="size-[18px]" strokeWidth={1.9} aria-hidden /> Text</a>
      </nav>
      <Toaster position="bottom-center" theme="dark" />
    </MotionConfig>
  )
}
