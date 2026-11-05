import { MotionConfig } from "framer-motion"
import { MessageSquare, Phone } from "lucide-react"
import { Toaster } from "sonner"
import { PHONE_SMS, PHONE_TEL } from "@/shared/data"
import { Header } from "./Header"
import { Hero } from "./Hero"
import { Work } from "./Work"
import { Services } from "./Services"
import { Area, Faq, Materials, Reviews } from "./Sections"
import { Contact } from "./Contact"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="content">
        <Hero />
        <Work />
        <Services />
        <Materials />
        <Reviews />
        <Area />
        <Faq />
        <Contact />
      </main>

      {/* phone-only call / text bar, always reachable */}
      <nav aria-label="Call or text Adam" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-2 pb-[max(8px,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
        <a href={PHONE_TEL} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground">
          <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden /> Call
        </a>
        <a href={PHONE_SMS} className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-foreground/70 font-semibold">
          <MessageSquare className="size-[18px]" strokeWidth={1.75} aria-hidden /> Text
        </a>
      </nav>
      <Toaster position="bottom-center" />
    </MotionConfig>
  )
}
