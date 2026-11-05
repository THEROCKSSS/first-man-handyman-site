import { ArrowRight, MessageSquare, Phone } from "lucide-react"
import {
  AREA_NOTES, BUSINESS, COUNTY, EMAIL, GOOGLE_REVIEW, JOBS, OWNER, PHONE, PHONE_SMS, PHONE_TEL, REVIEWS, SERVICE_GROUPS, TOWNS,
  areaPath, slugOf,
} from "@/shared/data"
import { Photo } from "@/shared/Photo"
import { Tel } from "@/shared/Tel"
import { HOME } from "./active-look"

const BTN = "inline-flex h-12 items-center gap-2 rounded-md px-5 font-semibold"

function Header() {
  return (
    <header className="border-b border-border">
      <div className="wrap flex min-h-16 items-center justify-between gap-4 py-3">
        <a href={HOME} translate="no" className="font-display text-lg font-semibold sm:text-xl">{BUSINESS}</a>
        <nav aria-label="Main" className="flex items-center gap-x-5 text-[0.95rem] font-medium">
          <a href="/areas/" className="link-line whitespace-nowrap">Service areas</a>
          <a href={`${HOME}#contact`} className="link-line hidden sm:inline">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-[0.9rem] text-muted-foreground">
        <p>© 2026 {BUSINESS} · {OWNER} · Based in Sheridan, CA. A service-area business: I come to you.</p>
        <p className="flex gap-x-5">
          <a href={`${HOME}legal/#terms`} className="link-line">Terms of service</a>
          <a href={`${HOME}legal/#privacy`} className="link-line">Privacy policy</a>
        </p>
      </div>
    </footer>
  )
}

function CallRow() {
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <a href={PHONE_TEL} className={`${BTN} bg-primary text-primary-foreground`}><Phone className="size-[18px]" strokeWidth={1.9} aria-hidden /> Call <Tel /></a>
      <a href={PHONE_SMS} className={`${BTN} border border-foreground/40`}><MessageSquare className="size-[18px]" strokeWidth={1.9} aria-hidden /> Text me</a>
    </div>
  )
}

function Services({ town }: { town: string }) {
  return (
    <section className="mt-16">
      <h2 className="text-[2rem] sm:text-4xl">What I can help with in {town}</h2>
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {SERVICE_GROUPS.map((g) => (
          <div key={g.id}>
            <h3 className="text-xl sm:text-2xl">{g.label}</h3>
            <ul className="mt-3 space-y-2 border-t border-border pt-3">
              {g.services.map((s) => (
                <li key={s.name}><span className="font-semibold">{s.name}.</span> <span className="text-muted-foreground">{s.items.join("; ")}.</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Work({ index }: { index: number }) {
  const jobs = [0, 1, 2].map((k) => JOBS[(index * 3 + k) % JOBS.length])
  return (
    <section className="mt-16">
      <h2 className="text-[2rem] sm:text-4xl">Recent work</h2>
      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {jobs.map((j) => (
          <li key={j.id}>
            <a href={`${HOME}#job-${j.id}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-md">
                <Photo job={j} sizes="(min-width: 640px) 33vw, 92vw" alt={`${j.title}: ${j.note}`} className="size-full object-cover" />
              </div>
              <p className="mt-3 font-display text-xl font-semibold">{j.title}</p>
              <p className="text-muted-foreground">{j.note}</p>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6"><a href={`${HOME}#work`} className="link-line inline-flex items-center gap-1.5 font-semibold text-rust">See all recent work <ArrowRight className="size-4" strokeWidth={1.9} aria-hidden /></a></p>
    </section>
  )
}

function Reviews() {
  return (
    <section className="mt-16">
      <h2 className="text-[2rem] sm:text-4xl">What customers say</h2>
      <ul className="mt-8 grid gap-6 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <li key={r.name} className="rounded-md border border-border bg-card p-5">
            <blockquote className="text-[1.05rem]">“{r.text}”</blockquote>
            <p className="mt-3 font-semibold">{r.name}</p>
            <p className="text-sm text-muted-foreground">Google review</p>
          </li>
        ))}
      </ul>
      <p className="mt-6"><a href={GOOGLE_REVIEW} className="link-line font-semibold text-rust" rel="noopener">Leave a Google review</a></p>
    </section>
  )
}

export function AreaPage({ town }: { town: string | null }) {
  if (town === null) {
    return (
      <div>
        <a href="#content" className="skip-link">Skip to content</a>
        <Header />
        <main id="content" className="wrap py-12 sm:py-16">
          <h1 className="max-w-[44rem] text-[2.6rem] sm:text-6xl">Handyman service areas in {COUNTY}</h1>
          <p className="mt-5 max-w-[40rem] text-lg text-muted-foreground">
            I’m {OWNER}, a local handyman based in Sheridan, CA. I travel to homes in {TOWNS.slice(0, -1).join(", ")} and {TOWNS[TOWNS.length - 1]}. Pick your town to see what I can help with.
          </p>
          <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {TOWNS.map((t) => (
              <li key={t} className="bg-background">
                <a href={areaPath(t)} className="group flex items-center justify-between px-5 py-6 font-display text-2xl font-semibold">
                  <span>Handyman in {t}</span>
                  <ArrowRight className="size-5 text-rust" strokeWidth={1.8} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <CallRow />
          <Services town="your home" />
        </main>
        <Footer />
      </div>
    )
  }

  const idx = TOWNS.indexOf(town)
  const others = TOWNS.filter((t) => t !== town)
  const note = AREA_NOTES[town]
  return (
    <div>
      <a href="#content" className="skip-link">Skip to content</a>
      <Header />
      <main id="content" className="wrap py-12 sm:py-16">
        <p className="text-[0.95rem] text-muted-foreground"><a href="/areas/" className="link-line">Service areas</a> / {town}</p>
        <h1 className="mt-3 max-w-[44rem] text-[2.6rem] sm:text-6xl">Handyman in {town}, CA</h1>
        <p className="mt-5 max-w-[40rem] text-lg text-muted-foreground">
          I’m {OWNER}, a local handyman serving {town} and the rest of {COUNTY}. I handle repairs, installs and small projects around the house and yard, plus basic car care. Evening and weekend appointments are available.
        </p>
        {note && <p className="mt-4 max-w-[40rem] text-lg">{note}</p>}
        <CallRow />
        <p className="mt-4 max-w-[40rem] text-[0.95rem] text-muted-foreground">
          Quote by phone or text: describe the job, and photos help. You can also email <a href={`mailto:${EMAIL}`} className="link-line font-semibold text-rust">{EMAIL}</a>.
        </p>

        <Services town={town} />
        <Work index={idx} />
        <Reviews />

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-[1.6rem] sm:text-3xl">I also serve nearby towns</h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-lg font-medium">
            {others.map((t) => <li key={t}><a href={areaPath(t)} className="link-line text-rust" id={`near-${slugOf(t)}`}>Handyman in {t}</a></li>)}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}
