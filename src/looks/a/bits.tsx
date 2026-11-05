import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/** Fade-and-rise on first view. Starts readable (opacity .4) so a captured frame never shows an empty page. */
export function Reveal({
  children, className, delay = 0, as = "div",
}: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "li" | "article" }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0.4, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Comp>
  )
}

export function SectionHead({
  title, children, className, onNavy,
}: { title: string; children?: React.ReactNode; className?: string; onNavy?: boolean }) {
  return (
    <div className={cn("max-w-[44rem]", className)}>
      <h2 className={cn("text-[2.1rem] sm:text-5xl", onNavy && "text-navy-ink")}>{title}</h2>
      {children && (
        <p className={cn("mt-4 text-lg", onNavy ? "text-navy-mute" : "text-muted-foreground")}>{children}</p>
      )}
    </div>
  )
}
