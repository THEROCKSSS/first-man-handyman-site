import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion"
import { Tel } from "@/shared/Tel"
import { Phone } from "lucide-react"
import { PHONE, PHONE_TEL } from "@/shared/data"

const LINKS = [
  { href: "#work", label: "Recent work" },
  { href: "#services", label: "Services" },
  { href: "#materials", label: "Your materials" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "Questions" },
]

export function Header() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const right = useTransform(smooth, (v) => (1 - v) * 100)
  const clip = useMotionTemplate`inset(0 ${right}% 0 0)`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background">
        Skip to content
      </a>
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <a href="#top" translate="no" className="flex min-w-0 flex-col whitespace-nowrap leading-none">
          <span className="font-display text-[1.3rem] font-semibold tracking-tight sm:text-[1.45rem]">First Man Handyman</span>
          <span className="mt-1 text-[0.78rem] text-muted-foreground sm:text-[0.8rem]">Adam Ingraham · Sheridan, CA</span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-line text-[0.95rem] text-foreground/80 hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={PHONE_TEL}
          className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 text-[0.95rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
        >
          <Phone className="size-4" strokeWidth={1.75} aria-hidden />
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">Call or text <Tel /></span>
        </a>
      </div>
      {/* tape measure: ticks always visible, filled in as the page is read */}
      <div className="relative" aria-hidden>
        <div className="tape" />
        <motion.div className="tape-fill absolute inset-x-0 bottom-0" style={{ clipPath: clip }} />
      </div>
    </header>
  )
}
