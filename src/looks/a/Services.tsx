import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PHONE_TEL, SERVICE_GROUPS } from "@/shared/data"
import { Tel } from "@/shared/Tel"
import { SectionHead } from "./bits"

export function Services() {
  const [tab, setTab] = React.useState(SERVICE_GROUPS[0].id)
  const group = SERVICE_GROUPS.find((g) => g.id === tab)!

  return (
    <section id="services" className="border-t border-border py-20 sm:py-28">
      <div className="wrap">
        <SectionHead title="What I can help with">
          Everyday home repairs and installs, plus simple car and yard jobs, done carefully and cleaned up after.
        </SectionHead>

        <div className="mt-10">
          <div role="group" aria-label="Kinds of jobs" className="relative flex flex-wrap gap-2">
            {SERVICE_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={tab === g.id}
                onClick={() => setTab(g.id)}
                className="relative h-11 rounded-md border border-foreground/40 px-4 text-[0.97rem] font-medium text-foreground/80 transition-colors hover:text-foreground aria-pressed:border-transparent aria-pressed:text-primary-foreground"
              >
                {tab === g.id && (
                  <motion.span layoutId="svc-pill" className="absolute inset-0 rounded-md bg-primary" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
                )}
                <span className="relative">{g.label}</span>
                <span className="relative ml-2 text-[0.8rem] tabular-nums opacity-70">{g.services.length}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-foreground/80" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={tab}
                initial={{ opacity: 0.3, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {group.services.map((s) => (
                  <li key={s.name} className="grid gap-x-10 gap-y-3 border-b border-border py-7 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <h3 className="text-2xl sm:text-[1.7rem]">{s.name}</h3>
                      <p className="mt-1 text-muted-foreground">{s.blurb}</p>
                    </div>
                    <ul className="md:col-span-7 md:pt-1">
                      {s.items.map((it) => (
                        <li key={it} className="flex gap-3 border-t border-border/70 py-2 first:border-t-0 first:pt-0 md:border-t-0 md:py-1.5">
                          <span className="mt-[0.62em] size-1.5 shrink-0 rounded-[1px] bg-rust" aria-hidden />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 text-lg">
          Don’t see what you need? <a href={PHONE_TEL} className="link-line font-semibold text-rust">Call or text <Tel /></a> and just ask.
        </p>
      </div>
    </section>
  )
}
