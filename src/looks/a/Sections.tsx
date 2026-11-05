import * as Accordion from "@radix-ui/react-accordion"
import { Tel } from "@/shared/Tel"
import { ArrowUpRight, Plus } from "lucide-react"
import { FAQ, GOOGLE_REVIEW, PHONE, PHONE_SMS, PHONE_TEL, REVIEWS, TOWNS, areaPath } from "@/shared/data"
import { Reveal, SectionHead } from "./bits"

export function Materials() {
  return (
    <section id="materials" className="on-navy bg-navy py-20 text-navy-ink sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="text-[2.3rem] sm:text-5xl lg:text-[3.4rem]">Your materials, my labor.</h2>
          <p className="mt-6 max-w-[32rem] text-lg text-navy-mute">
            Want to keep a repair on a budget? Pick up the parts or materials you like, such as the faucet, the toilet or the vinyl plank, and I’ll provide the labor to install it right.
          </p>
          <a
            href={PHONE_SMS}
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Text me a question <ArrowUpRight className="size-[18px]" strokeWidth={1.75} aria-hidden />
          </a>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-6 lg:pt-3">
          <ul className="border-t border-navy-ink/25">
            {[
              ["You choose the exact product and price", "Faucet, toilet, vinyl plank. Whatever you pick is what goes in."],
              ["I bring the tools and the know-how", "The install is mine, from start to finish."],
              ["Not sure what to buy?", "Text me and ask."],
            ].map(([t, d]) => (
              <li key={t} className="border-b border-navy-ink/25 py-6">
                <p className="font-display text-2xl font-semibold sm:text-[1.7rem]">{t}</p>
                <p className="mt-1 text-navy-mute">{d}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function Reviews() {
  const [lead, ...rest] = REVIEWS
  return (
    <section id="reviews" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead title="5-star rated on Google">What local customers are saying.</SectionHead>
          <a href={GOOGLE_REVIEW} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1.5 font-semibold text-rust">
            Leave a review on Google <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden />
          </a>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <figure>
              <blockquote className="font-display text-[1.7rem] font-medium leading-[1.28] sm:text-[2.15rem]">
                “{lead.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-[0.97rem]">
                <span className="h-px w-8 bg-rust" aria-hidden />
                <span className="font-semibold">{lead.name}</span>
                <span className="text-muted-foreground">Google review</span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="lg:col-span-5">
            {rest.map((r, i) => (
              <Reveal key={r.name} delay={0.06 * (i + 1)}>
                <figure className="border-t border-border py-6 first:border-t-foreground/80 first:pt-5">
                  <blockquote className="text-lg leading-relaxed">“{r.text}”</blockquote>
                  <figcaption className="mt-3 text-[0.95rem]">
                    <span className="font-semibold">{r.name}</span>
                    <span className="text-muted-foreground"> · Google review</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Area() {
  return (
    <section id="area" className="border-t border-border bg-muted/50 py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHead title="Proudly serving south Placer County">
            Handyman service in these communities and nearby. Based in Sheridan, CA.
          </SectionHead>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-foreground/80 sm:grid-cols-3">
            {TOWNS.map((t) => (
              <li key={t} className="border-b border-border py-3.5 font-display text-xl font-semibold sm:text-2xl"><a href={areaPath(t)} className="link-line">{t}</a></li>
            ))}
          </ul>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <h3 className="text-[1.9rem] sm:text-4xl">Evening and weekend appointments available</h3>
          <p className="mt-4 text-lg text-muted-foreground">
            Busy during the workday? I can schedule evenings and weekends so you don’t have to take time off.
          </p>
          <a
            href={PHONE_SMS}
            className="mt-6 inline-flex h-12 items-center rounded-md border border-foreground/80 px-5 font-semibold transition-colors hover:bg-foreground hover:text-background"
          >
            Text to book a time
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-border py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead title="Frequently asked questions" />
            <p className="mt-5 text-muted-foreground">
              Something else? <a href={PHONE_TEL} className="link-line font-semibold text-rust">Call or text <Tel /></a>.
            </p>
          </div>
        </div>
        <Accordion.Root type="single" collapsible defaultValue="faq-0" className="border-t border-foreground/80 lg:col-span-8">
          {FAQ.map((f, i) => (
            <Accordion.Item key={f.q} value={`faq-${i}`} className="border-b border-border">
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-[64px] w-full items-center justify-between gap-6 py-4 text-left font-display text-[1.35rem] font-semibold leading-snug sm:text-2xl">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-rust transition-transform duration-200 group-data-[state=open]:rotate-45" strokeWidth={1.75} aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-[40rem] pb-6 text-lg text-muted-foreground">{f.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
