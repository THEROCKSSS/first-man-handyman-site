import { Check, Copy, Facebook, Instagram, Mail, MessageSquare, Phone } from "lucide-react"
import { EMAIL, FACEBOOK, INSTAGRAM, JOB_TYPES, PHONE_TEL, TOWNS } from "@/shared/data"
import { useComposer } from "@/shared/hooks"
import { Tel } from "@/shared/Tel"
import { cn } from "@/lib/utils"

export function Contact() {
  const c = useComposer()

  return (
    <section id="contact" className="on-navy bg-navy text-navy-ink">
      <div className="wrap grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-[2.4rem] sm:text-5xl lg:text-[3.5rem]">Let’s get it fixed.</h2>
          <p className="mt-5 max-w-[26rem] text-lg text-navy-mute">
            Tell me what needs doing. A photo by text helps me give you a quick answer.
          </p>
          <a
            href={PHONE_TEL}
            className="mt-8 inline-flex h-14 items-center gap-2.5 rounded-md bg-primary px-6 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          >
            <Phone className="size-5" strokeWidth={1.75} aria-hidden /> Call or text <Tel />
          </a>
          <ul className="mt-10 space-y-3 text-[0.98rem] text-navy-mute">
            <li className="flex items-center gap-3"><Mail className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden /><a className="link-line text-navy-ink" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li className="flex items-center gap-3"><Facebook className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden /><a className="link-line text-navy-ink" href={FACEBOOK}>facebook.com/firstmanhandyman</a></li>
            <li className="flex items-center gap-3"><Instagram className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden /><a className="link-line text-navy-ink" href={INSTAGRAM}>@first.man.handyman</a></li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-md bg-navy-2 p-5 sm:p-8">
            <h3 className="text-2xl sm:text-[1.7rem]">Write the text for me</h3>
            <p className="mt-1 text-navy-mute">Pick what applies. Your message builds below, then opens in your texting app.</p>

            <fieldset className="mt-6">
              <legend className="mb-3 text-[0.95rem] font-semibold">What needs doing?</legend>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((t) => {
                  const on = c.picked.includes(t)
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => c.toggle(t)}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3.5 text-[0.95rem] transition-colors",
                        on ? "border-primary bg-primary font-semibold text-primary-foreground" : "border-navy-mute text-navy-ink hover:border-navy-ink",
                      )}
                    >
                      {on && <Check className="size-4" strokeWidth={2} aria-hidden />}
                      {t}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-[0.95rem] font-semibold">
                Your town
                <select
                  name="town"
                  autoComplete="off"
                  value={c.town}
                  onChange={(e) => c.setTown(e.target.value)}
                  className="mt-2 block h-12 w-full rounded-md border border-navy-mute bg-navy px-3 text-base font-normal text-navy-ink"
                >
                  <option value="">Not sure / other</option>
                  {TOWNS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block text-[0.95rem] font-semibold sm:col-span-2">
                Anything else
                <textarea
                  name="note"
                  autoComplete="off"
                  value={c.note}
                  onChange={(e) => c.setNote(e.target.value)}
                  rows={2}
                  placeholder="The kitchen faucet drips when it’s off…"
                  className="mt-2 block w-full resize-y rounded-md border border-navy-mute bg-navy px-3 py-3 text-base font-normal text-navy-ink placeholder:text-navy-mute"
                />
              </label>
            </div>

            <p className="sr-only" role="status" aria-live="polite">{c.liveMessage}</p>
            <div className="mt-6 rounded-md border border-dashed border-navy-mute p-4">
              <p className="text-[0.8rem] font-semibold text-navy-mute">Your message</p>
              <p className="mt-1 text-[1.02rem] leading-relaxed">{c.message}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={c.smsHref} className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
                <MessageSquare className="size-[18px]" strokeWidth={1.75} aria-hidden /> Text Adam
              </a>
              <a href={c.mailHref} className="inline-flex h-12 items-center gap-2 rounded-md border border-navy-ink/40 px-5 font-semibold transition-colors hover:bg-navy-ink hover:text-navy">
                <Mail className="size-[18px]" strokeWidth={1.75} aria-hidden /> Email instead
              </a>
              <button type="button" onClick={c.copy} className="inline-flex h-12 items-center gap-2 rounded-md px-3 font-medium text-navy-mute transition-colors hover:text-navy-ink">
                <Copy className="size-[18px]" strokeWidth={1.75} aria-hidden /> Copy message
              </button>
              {c.hasSaved && (
                <button type="button" onClick={c.reset} className="inline-flex h-12 items-center px-3 text-[0.95rem] font-medium text-navy-mute underline-offset-4 transition-colors hover:text-navy-ink hover:underline">
                  Clear saved choices
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-navy-ink/20">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-[0.9rem] text-navy-mute">
          <span>© 2026 First Man Handyman (FMH) · Adam Ingraham</span>
          <nav aria-label="Legal and print" className="flex flex-wrap gap-x-5 gap-y-1">
            <a href="legal/#terms" className="link-line">Terms of service</a>
            <a href="legal/#privacy" className="link-line">Privacy policy</a>
            <a href="../print/" className="link-line">Print a card</a>
          </nav>
          <span>Roseville · Rocklin · Granite Bay · Loomis · Lincoln · Sheridan, CA</span>
        </div>
      </footer>
    </section>
  )
}
