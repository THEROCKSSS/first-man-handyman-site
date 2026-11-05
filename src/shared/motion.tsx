import * as React from "react"
import { animate, motion, useInView, useReducedMotion } from "framer-motion"

/** Fade-and-rise on first view. Starts readable (opacity .4) so a captured frame never looks empty. */
export function Reveal({
  children, className, delay = 0, as = "div", y = 20,
}: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "article" | "figure"; y?: number }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0.4, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Counts up to a real value. Renders the final number first, so a frame captured before the animation still reads true. */
export function Counter({ to, className }: { to: number; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const [n, setN] = React.useState(to)
  React.useEffect(() => {
    if (!inView || reduce) return
    let stop: (() => void) | undefined
    const raf = requestAnimationFrame(() => {
      const c = animate(0, to, { duration: 1.3, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) })
      stop = () => c.stop()
    })
    return () => { cancelAnimationFrame(raf); stop?.(); setN(to) }
  }, [inView, reduce, to])
  return <span ref={ref} className={className}>{n}</span>
}

export function useMedia(query: string) {
  const [match, setMatch] = React.useState(() => (typeof window === "undefined" ? false : window.matchMedia(query).matches))
  React.useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    on()
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [query])
  return match
}
