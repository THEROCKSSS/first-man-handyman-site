import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, Link2, X } from "lucide-react"
import { toast } from "sonner"
import { JOBS, type Job } from "./data"
import { copyText } from "./clipboard"
import { Photo } from "./Photo"

type Props = { job: Job; idx: number; close: () => void; step: (d: number) => void }

/** The photo viewer. Loaded on demand (see JobLightbox in hooks.tsx). Themed through tokens only, so it fits all four looks. */
export default function Lightbox({ job, idx, close, step }: Props) {
  const reduce = useReducedMotion()
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [step])

  const copyLink = async () => {
    if (await copyText(window.location.href)) toast.success("Link to this job copied.")
    else toast.error("Couldn’t copy. Copy the address from your browser instead.")
  }

  return (
    <Dialog.Root open onOpenChange={(o) => !o && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/95 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 overscroll-contain p-4 outline-none sm:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <motion.div
            key={job.id}
            drag={reduce ? false : "x"}
            dragSnapToOrigin
            dragElastic={0.35}
            style={{ touchAction: "pan-y" }}
            onDragEnd={(_, i) => {
              if (i.offset.x < -70 || i.velocity.x < -450) step(1)
              else if (i.offset.x > 70 || i.velocity.x > 450) step(-1)
            }}
            initial={reduce ? false : { opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className="max-w-full shrink-0 select-none overflow-hidden rounded-md bg-card p-1.5"
          >
            <Photo job={job} sizes="(min-width: 640px) 70vw, 92vw" eager alt={`${job.title}: ${job.note}`} draggable={false} className="block h-auto max-h-[calc(100svh-260px)] w-auto max-w-full rounded-[3px] object-contain" />
          </motion.div>
          <div className="shrink-0 text-center text-navy-ink">
            <Dialog.Title className="font-display text-2xl font-semibold">{job.title}</Dialog.Title>
            <Dialog.Description className="text-navy-mute">{job.note}</Dialog.Description>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => step(-1)} className="grid size-11 place-items-center rounded-md bg-card text-foreground transition-colors hover:bg-muted" aria-label="Previous job">
              <ArrowLeft className="size-5" strokeWidth={1.75} />
            </button>
            <span className="min-w-[4.5rem] text-center text-sm tabular-nums text-navy-mute">{idx + 1} of {JOBS.length}</span>
            <button onClick={() => step(1)} className="grid size-11 place-items-center rounded-md bg-card text-foreground transition-colors hover:bg-muted" aria-label="Next job">
              <ArrowRight className="size-5" strokeWidth={1.75} />
            </button>
            <button onClick={copyLink} className="ml-2 inline-flex h-11 items-center gap-2 rounded-md bg-card px-3.5 text-[0.95rem] font-medium text-foreground transition-colors hover:bg-muted">
              <Link2 className="size-[18px]" strokeWidth={1.75} aria-hidden /> Copy link
            </button>
          </div>
          <Dialog.Close className="absolute right-4 top-4 grid size-11 place-items-center rounded-md bg-card text-foreground transition-colors hover:bg-muted sm:right-6 sm:top-6" aria-label="Close">
            <X className="size-5" strokeWidth={1.75} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
