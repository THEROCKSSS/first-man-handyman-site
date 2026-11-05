import { JOBS } from "@/shared/data"
import { JobLightbox, useJobHash } from "@/shared/hooks"
import { Reveal, SectionHead } from "./bits"

export function Work() {
  const lb = useJobHash()
  return (
    <section id="work" className="border-t border-border bg-muted/50 py-20 sm:py-28">
      <div className="wrap">
        <SectionHead title="Recent work">
          Real jobs from real homes. Tap any photo to see it larger.
        </SectionHead>

        <ul className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
          {JOBS.map((j, i) => (
            <Reveal as="li" key={j.id} delay={(i % 3) * 0.05} className="break-inside-avoid">
              <button onClick={() => lb.open(j.id)} className="group block w-full text-left">
                <span className="block overflow-hidden rounded-md border border-border bg-card p-1.5">
                  <img
                    src={j.src}
                    alt=""
                    width={j.w}
                    height={j.h}
                    loading="lazy"
                    className="w-full rounded-[3px] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    style={{ aspectRatio: `${j.w} / ${j.h}` }}
                  />
                </span>
                <span className="mt-2.5 flex items-baseline justify-between gap-3 px-0.5">
                  <span className="font-display text-xl font-semibold leading-tight">{j.title}</span>
                  {j.kind === "before-after" && (
                    <span className="shrink-0 text-[0.8rem] font-medium text-rust">Before and after</span>
                  )}
                </span>
                <span className="block px-0.5 text-[0.95rem] text-muted-foreground">{j.note}</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      <JobLightbox {...lb} />
    </section>
  )
}
