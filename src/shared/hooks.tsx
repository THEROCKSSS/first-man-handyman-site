import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, Link2, X } from "lucide-react"
import { toast } from "sonner"
import { EMAIL, JOBS, PHONE, PHONE_SMS, type Job } from "./data"

/** Bookmarkable job view: #job-<id>. Shared by every look. */
export function useJobHash() {
  const [openId, setOpenId] = React.useState<string | null>(null)
  React.useEffect(() => {
    const read = () => {
      const m = window.location.hash.match(/^#job-(.+)$/)
      setOpenId(m && JOBS.some((j) => j.id === m[1]) ? m[1] : null)
    }
    read()
    window.addEventListener("hashchange", read)
    return () => window.removeEventListener("hashchange", read)
  }, [])
  const open = React.useCallback((id: string) => { window.location.hash = `#job-${id}` }, [])
  const close = React.useCallback(() => {
    history.pushState("", document.title, window.location.pathname + window.location.search + "#work")
    setOpenId(null)
  }, [])
  const idx = JOBS.findIndex((j) => j.id === openId)
  const job: Job | null = idx >= 0 ? JOBS[idx] : null
  const step = React.useCallback(
    (d: number) => { if (idx >= 0) open(JOBS[(idx + d + JOBS.length) % JOBS.length].id) },
    [idx, open],
  )
  return { job, idx, open, close, step }
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Themed through tokens only, so it fits all four looks. Swipe, arrow keys, buttons and "copy link" all work. */
export function JobLightbox({ job, idx, close, step }: { job: Job | null; idx: number; close: () => void; step: (d: number) => void }) {
  const reduce = useReducedMotion()
  React.useEffect(() => {
    if (!job) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [job, step])

  const copyLink = async () => {
    const ok = await copyText(window.location.href)
    if (ok) toast.success("Link to this job copied.")
    else toast.error("Couldn’t copy. Copy the address from your browser instead.")
  }

  return (
    <Dialog.Root open={!!job} onOpenChange={(o) => !o && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 overscroll-contain p-4 outline-none sm:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          {job && (
            <>
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
                <img src={job.src} alt={`${job.title}: ${job.note}`} draggable={false} className="block h-auto max-h-[calc(100svh-260px)] w-auto max-w-full rounded-[3px] object-contain" />
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
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const STORE = "fmh-text-helper"
type Saved = { town: string; picked: string[] }
function readSaved(): Saved {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) ?? "null")
    if (s && typeof s.town === "string" && Array.isArray(s.picked)) return { town: s.town, picked: s.picked.filter((x: unknown) => typeof x === "string") }
  } catch { /* storage can be blocked; the helper works without it */ }
  return { town: "", picked: [] }
}

/** The "write the text for me" logic. Remembers town and job types on this device only, never the free-text note. */
export function useComposer() {
  const saved = React.useMemo(readSaved, [])
  const [picked, setPicked] = React.useState<string[]>(saved.picked)
  const [town, setTown] = React.useState(saved.town)
  const [note, setNote] = React.useState("")
  const [hasSaved, setHasSaved] = React.useState(saved.town !== "" || saved.picked.length > 0)

  React.useEffect(() => {
    try {
      if (!town && picked.length === 0) localStorage.removeItem(STORE)
      else localStorage.setItem(STORE, JSON.stringify({ town, picked }))
    } catch { /* ignore */ }
    setHasSaved(town !== "" || picked.length > 0)
  }, [town, picked])

  const message = React.useMemo(() => {
    const parts = ["Hi Adam, I found First Man Handyman and need some help."]
    if (picked.length) parts.push(`The job: ${picked.join(", ").toLowerCase()}.`)
    const n = note.trim()
    if (n) parts.push(/[.!?]$/.test(n) ? n : `${n}.`)
    if (town) parts.push(`I'm in ${town}.`)
    parts.push("I can send a photo.")
    return parts.join(" ")
  }, [picked, town, note])
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))
  const reset = () => { setPicked([]); setTown(""); setNote("") }
  const smsHref = `${PHONE_SMS}?&body=${encodeURIComponent(message)}`
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Handyman job")}&body=${encodeURIComponent(message)}`
  const copy = async () => {
    if (await copyText(message)) toast.success(`Message copied. Paste it into a text to ${PHONE}.`)
    else toast.error("Couldn’t copy. Select the message and copy it by hand.")
  }
  return { picked, toggle, town, setTown, note, setNote, message, smsHref, mailHref, copy, hasSaved, reset }
}
