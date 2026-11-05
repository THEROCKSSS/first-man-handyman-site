import { ArrowLeft } from "lucide-react"
import { EMAIL, PHONE_TEL } from "@/shared/data"
import { Tel } from "@/shared/Tel"

type Look = "a" | "b" | "c" | "d"
const UPDATED = "November 4, 2026"

const TERMS: [string, string[]][] = [
  ["About this website", ["This website belongs to First Man Handyman (“FMH”, “I”), a handyman service run by Adam Ingraham in Sheridan, California. It shows what I do, some recent work, and how to reach me."]],
  ["What’s on this site", ["The descriptions of my services are general. Not every job suits every home. I work to keep everything here accurate, but the site is provided “as is”, and I can’t promise it is always complete, current or free of mistakes."]],
  ["Quotes and estimates", ["Anything about price or timing, on this site or in a call or text, is an estimate until you and I both agree to a job. The final price depends on what I find when I see the work and on the materials used.", "Jobs are agreed directly between you and me. Nothing on this website is a booking or a contract."]],
  ["Materials you buy", ["If you choose and buy the materials yourself, they stay your responsibility, including whether they suit the job and what the maker’s warranty covers. I will install them with care."]],
  ["Photos and text", ["The photos, text and design here belong to Adam Ingraham and First Man Handyman. Please share links, but don’t copy them for another business. The reviews are quotes from customers’ Google reviews."]],
  ["Messages you send me", ["The buttons for texting or emailing open your own messaging or email app with a message you can edit. Nothing is sent until you send it. Please don’t send card numbers, passwords or other sensitive details by text or email."]],
  ["Other websites", ["This site links to Google, Facebook and Instagram. I don’t control those sites, and their own terms and privacy policies apply there."]],
  ["Limits", ["As far as California law allows, I’m not responsible for losses that come from using this website. This does not limit my responsibility for the work I do for you, which is covered by what we agree for each job and by the law."]],
  ["Changes and governing law", ["I may update these terms, and the date at the top will change when I do. California law applies."]],
]

const PRIVACY: [string, string[]][] = [
  ["The short version", ["This website does not collect your information on a server. There are no accounts, no forms that send your details to me, no ads, no analytics, no tracking cookies and no third-party scripts, fonts or images."]],
  ["When you visit", ["Like any website, the company that hosts it may keep basic server logs, such as your IP address, browser type, the pages requested and the time. I don’t use them to identify you."]],
  ["What stays on your device", ["The text helper can remember your town and the kinds of jobs you picked, using your browser’s local storage, so you don’t have to choose them again. It never saves what you type under “Anything else”, and none of it is sent to me or anyone else. Use “Clear saved choices” or clear this site’s data in your browser to remove it."]],
  ["When you contact me", ["If you call, text, email or message me on Facebook, I receive what you send: your name, number or email, your message and any photos. I use it to answer you and to do the job. I don’t sell it or share it for advertising.", "I keep messages as long as I need them to do the job and answer follow-up questions. Your phone company, email provider and Facebook handle your messages under their own privacy policies."]],
  ["Reviews", ["The reviews shown here are quotes from public Google reviews, with the names the reviewers chose to show."]],
  ["Your choices", ["You can ask me what information I have about you and ask me to delete it. Email or text me and I’ll answer. I don’t sell or share personal information. This site is not meant for children under 13."]],
  ["Changes", ["If I change this policy, the date at the top will change."]],
]

export function LegalPage({ look }: { look: Look }) {
  const home = `/${look}/`
  return (
    <div>
      <a href="#content" className="skip-link">Skip to content</a>
      <header className="border-b border-border">
        <div className="wrap flex min-h-16 items-center justify-between gap-4 py-3">
          <a href={home} translate="no" className="font-display text-xl font-semibold">First Man Handyman</a>
          <a href={home} className="link-line inline-flex items-center gap-1.5 text-[0.95rem] font-medium"><ArrowLeft className="size-4" strokeWidth={1.9} aria-hidden /> Back to the site</a>
        </div>
      </header>

      <main id="content" className="wrap py-12 sm:py-16">
        <div className="max-w-[44rem]">
          <p className="rounded-md border border-border bg-muted px-4 py-3 text-[0.95rem] text-muted-foreground">
            Draft for Adam’s review. Plain-language terms and privacy for this website. This is not legal advice, so have it checked before launch.
          </p>
          <h1 className="mt-8 text-[2.6rem] sm:text-6xl">Terms and privacy</h1>
          <p className="mt-3 text-muted-foreground">Last updated {UPDATED}</p>
          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-medium">
            <a href="#terms" className="link-line text-rust">Terms of service</a>
            <a href="#privacy" className="link-line text-rust">Privacy policy</a>
          </nav>

          <section id="terms" className="mt-12">
            <h2 className="text-[2rem] sm:text-4xl">Terms of service</h2>
            {TERMS.map(([h, ps]) => (
              <div key={h} className="mt-8">
                <h3 className="text-xl sm:text-2xl">{h}</h3>
                {ps.map((p) => <p key={p} className="mt-2 text-[1.05rem] leading-relaxed">{p}</p>)}
              </div>
            ))}
          </section>

          <section id="privacy" className="mt-16 border-t border-border pt-12">
            <h2 className="text-[2rem] sm:text-4xl">Privacy policy</h2>
            {PRIVACY.map(([h, ps]) => (
              <div key={h} className="mt-8">
                <h3 className="text-xl sm:text-2xl">{h}</h3>
                {ps.map((p) => <p key={p} className="mt-2 text-[1.05rem] leading-relaxed">{p}</p>)}
              </div>
            ))}
          </section>

          <section className="mt-16 border-t border-border pt-10">
            <h2 className="text-[1.6rem] sm:text-3xl">Questions</h2>
            <p className="mt-2 text-[1.05rem]">
              Email <a href={`mailto:${EMAIL}`} className="link-line font-semibold text-rust">{EMAIL}</a> or call or text <a href={PHONE_TEL} className="link-line font-semibold text-rust"><Tel /></a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="wrap py-6 text-[0.9rem] text-muted-foreground">© 2026 First Man Handyman (FMH) · Adam Ingraham</div>
      </footer>
    </div>
  )
}
