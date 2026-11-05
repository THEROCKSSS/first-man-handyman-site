import { motion } from "framer-motion"
import { Tel } from "@/shared/Tel"
import { MessageCircle, Phone } from "lucide-react"
import { JOBS, MESSENGER, PHONE, PHONE_TEL, TOWNS } from "@/shared/data"

const FACTS = ["5-star rated on Google", "Evenings and weekends", "Your materials welcome", "Text a photo for a quick answer"]
const hero = JOBS[0]

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="wrap grid items-center gap-10 py-12 sm:py-16 lg:min-h-[calc(100svh-78px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-14 lg:py-12">
        <div>
          <motion.h1
            className="text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.1rem]"
            initial={{ opacity: 0.4, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          >
            Small jobs around the house, done carefully.
          </motion.h1>
          <p className="mt-6 max-w-[34rem] text-lg text-muted-foreground sm:text-xl">
            I’m Adam Ingraham, a local handyman for repairs, installs and small projects in {TOWNS.slice(0, -1).join(", ")} and {TOWNS[TOWNS.length - 1]}. Cleaned up after, every job.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={PHONE_TEL}
              className="inline-flex h-14 items-center gap-2.5 rounded-md bg-primary px-6 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/85 active:translate-y-px"
            >
              <Phone className="size-5" strokeWidth={1.75} aria-hidden />
              Call or text <Tel />
            </a>
            <a href={MESSENGER} className="link-line inline-flex items-center gap-2 text-base font-medium">
              <MessageCircle className="size-[18px]" strokeWidth={1.75} aria-hidden />
              Message on Facebook
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-2.5 border-t border-border pt-6 text-[0.97rem] text-foreground/85 sm:grid-cols-2">
            {FACTS.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="size-1.5 shrink-0 rounded-[1px] bg-primary" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <motion.figure
          className="relative"
          initial={{ opacity: 0.4, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <a href="#work" aria-label="See recent work" className="block overflow-hidden rounded-md border border-border bg-card p-2 shadow-[0_18px_40px_-26px_oklch(24%_0.04_258/0.5)]">
            <img
              src={hero.src}
              alt="Before and after: a broken toilet with a cracked tank, and the new toilet installed"
              width={hero.w}
              height={hero.h}
              className="aspect-[4/3] w-full rounded-[4px] object-cover"
              fetchPriority="high"
            />
          </a>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
            <span><span className="font-semibold text-foreground">Toilet replacement.</span> Old toilet out, new one in.</span>
            <a href="#work" className="link-line shrink-0 font-medium text-rust">All recent jobs</a>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
