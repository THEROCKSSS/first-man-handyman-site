import * as React from "react"
import { toast } from "sonner"
import { copyText } from "./clipboard"
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
    // fetch the photo viewer while the browser is idle, so the first tap opens it instantly
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500))
    idle(() => { void loadLightbox() })
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

const loadLightbox = () => import("./Lightbox")
const LightboxImpl = React.lazy(loadLightbox)

/** Shown for a moment while the viewer's code loads. */
function LightboxSkeleton({ close }: { close: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy/95 p-4" onClick={close} role="status">
      <div className="aspect-[4/3] max-h-[60svh] w-[min(92vw,720px)] rounded-md bg-card/15" aria-hidden />
      <span className="sr-only">Loading photo…</span>
    </div>
  )
}

/** The photo viewer is its own file, loaded only when needed. */
export function JobLightbox({ job, idx, close, step }: { job: Job | null; idx: number; close: () => void; step: (d: number) => void }) {
  if (!job) return null
  return (
    <React.Suspense fallback={<LightboxSkeleton close={close} />}>
      <LightboxImpl job={job} idx={idx} close={close} step={step} />
    </React.Suspense>
  )
}

const STORE = "fmh-text-helper"
type Saved = { town: string; picked: string[] }
function readSaved(): Saved {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) ?? "null")
    if (s && typeof s.town === "string" && Array.isArray(s.picked)) return { town: s.town, picked: s.picked.filter((x: unknown) => typeof x === "string") }
  } catch { /* storage can be blocked, or missing during pre-rendering; the helper works without it */ }
  return { town: "", picked: [] }
}

/** Waits for the value to stop changing. Used so screen readers hear the finished message, not every keystroke. */
function useDebounced<T>(value: T, ms: number) {
  const [v, setV] = React.useState(value)
  React.useEffect(() => {
    const t = window.setTimeout(() => setV(value), ms)
    return () => window.clearTimeout(t)
  }, [value, ms])
  return v
}

/** The "write the text for me" logic. Remembers town and job types on this device only, never the free-text note. */
export function useComposer() {
  const [picked, setPicked] = React.useState<string[]>([])
  const [town, setTown] = React.useState("")
  const [note, setNote] = React.useState("")
  const [hasSaved, setHasSaved] = React.useState(false)
  const loaded = React.useRef(false)

  // read saved choices after the first render, so server and browser render the same thing
  React.useEffect(() => {
    const s = readSaved()
    setPicked(s.picked); setTown(s.town); setHasSaved(s.town !== "" || s.picked.length > 0)
    loaded.current = true
  }, [])
  React.useEffect(() => {
    if (!loaded.current) return
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
  const liveMessage = useDebounced(message, 800)
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))
  const reset = () => { setPicked([]); setTown(""); setNote("") }
  const smsHref = `${PHONE_SMS}?&body=${encodeURIComponent(message)}`
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Handyman job")}&body=${encodeURIComponent(message)}`
  const copy = async () => {
    if (await copyText(message)) toast.success(`Message copied. Paste it into a text to ${PHONE}.`)
    else toast.error("Couldn’t copy. Select the message and copy it by hand.")
  }
  return { picked, toggle, town, setTown, note, setNote, message, liveMessage, smsHref, mailHref, copy, hasSaved, reset }
}
