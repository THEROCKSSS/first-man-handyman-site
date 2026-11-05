// Every fact below is taken from firstmanhandyman.com (phone, email, towns, services, reviews, FAQ).
import toilet from "../assets/jobs/fmh-job-toilet-bath-before-after.jpg"
import vinyl from "../assets/jobs/fmh-job-vinyl-plank-floor-before-after.jpg"
import kitchenSink from "../assets/jobs/fmh-job-kitchen-sink-before-after.jpg"
import sweep from "../assets/jobs/fmh-job-shower-door-sweep-before-after.jpg"
import disposal from "../assets/jobs/fmh-job-garbage-disposal-installed.jpg"
import bathFaucet from "../assets/jobs/fmh-job-bathroom-faucet-drain-after.jpg"
import kitchenFaucet from "../assets/jobs/fmh-job-kitchen-sink-faucet-after.jpg"
import bathSink from "../assets/jobs/fmh-job-bathroom-sink-faucet.jpg"
import patio from "../assets/jobs/fmh-job-patio-wood-repair.jpg"
import tv from "../assets/jobs/fmh-job-tv-mount-50in.jpg"
import sideYard from "../assets/jobs/fmh-job-side-yard-cleanup.jpg"
import frontYard from "../assets/jobs/fmh-job-front-yard-cleanup.jpg"
import tree from "../assets/jobs/fmh-job-tree-brush-trimming.jpg"

export const PHONE = "916-910-5423"
export const PHONE_TEL = "tel:+19169105423"
export const PHONE_SMS = "sms:+19169105423"
export const SITE_URL = "https://firstmanhandyman.com/"
export const SITE_HOST = "firstmanhandyman.com"
export const EMAIL = "adam@firstmanhandyman.com"
export const FACEBOOK = "https://www.facebook.com/firstmanhandyman"
export const MESSENGER = "https://m.me/firstmanhandyman"
export const INSTAGRAM = "https://www.instagram.com/first.man.handyman/"
export const GOOGLE_REVIEW = "https://g.page/r/CdZ7fT9maCWCEAI/review"

export const TOWNS = ["Roseville", "Rocklin", "Granite Bay", "Loomis", "Lincoln", "Sheridan"]

export type Job = {
  id: string
  title: string
  note: string
  src: string
  w: number
  h: number
  kind: "before-after" | "after" | "yard"
}

export const JOBS: Job[] = [
  { id: "toilet", title: "Toilet replacement", note: "Old toilet out, new one in", src: toilet, w: 1152, h: 864, kind: "before-after" },
  { id: "kitchen-sink", title: "Kitchen sink", note: "New stainless sink and pull-down faucet", src: kitchenSink, w: 1600, h: 1106, kind: "before-after" },
  { id: "patio", title: "Patio wood repair", note: "Rotted patio wood replaced", src: patio, w: 1600, h: 1200, kind: "after" },
  { id: "vinyl-plank", title: "Vinyl plank floor", note: "Worn bathroom floor replaced with vinyl plank", src: vinyl, w: 1152, h: 864, kind: "before-after" },
  { id: "disposal", title: "Garbage disposal", note: "Garbage disposal installed", src: disposal, w: 1200, h: 1600, kind: "after" },
  { id: "shower-sweep", title: "Shower door sweep", note: "Worn sweep replaced to stop drips", src: sweep, w: 1080, h: 1080, kind: "before-after" },
  { id: "tv-mount", title: "TV mounting", note: "50\" TV mounted", src: tv, w: 1600, h: 1200, kind: "after" },
  { id: "bath-faucet", title: "Bathroom faucet", note: "New bathroom faucet and drain, leaks fixed", src: bathFaucet, w: 1600, h: 1200, kind: "after" },
  { id: "kitchen-faucet", title: "Kitchen sink and faucet", note: "Kitchen sink and faucet", src: kitchenFaucet, w: 1080, h: 1351, kind: "after" },
  { id: "side-yard", title: "Side yard cleanup", note: "Bed cleared and a shrub cut back to the stump", src: sideYard, w: 1463, h: 1600, kind: "yard" },
  { id: "bath-sink", title: "Bathroom sink faucet", note: "Bathroom sink faucet", src: bathSink, w: 1152, h: 864, kind: "after" },
  { id: "front-yard", title: "Front yard cleanup", note: "Front yard bed cleanup", src: frontYard, w: 1600, h: 1200, kind: "yard" },
  { id: "tree-brush", title: "Tree and brush work", note: "Tree and brush work by the garage", src: tree, w: 1217, h: 1600, kind: "yard" },
]

export type Service = { name: string; blurb: string; items: string[] }
export type ServiceGroup = { id: string; label: string; services: Service[] }

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: "inside",
    label: "Inside the house",
    services: [
      { name: "Toilets, sinks & disposals", blurb: "Fixture swaps and leak fixes.", items: ["Toilet replacements and installs", "Sink and faucet installs and repairs", "Garbage disposal installs"] },
      { name: "Showers & baths", blurb: "Small fixes that keep water where it belongs.", items: ["Shower and tub re-caulking", "Leak checks", "Securing loose shower arms and hand showers"] },
      { name: "Cabinets, doors & hardware", blurb: "Things that stick, sag or won’t close.", items: ["Vanity installs", "Cabinet hinge and drawer repairs", "Door, hinge, lock and weatherstrip fixes"] },
      { name: "TV mounting & assembly", blurb: "Mounted level and put together right.", items: ["TV mounting", "Furniture assembly", "Fitness equipment assembly"] },
      { name: "Drywall, paint & trim", blurb: "Patches and touch-ups that blend in.", items: ["Drywall patching", "Touch-up painting", "Trim work"] },
      { name: "Flooring", blurb: "Small rooms and spot repairs.", items: ["Vinyl plank flooring", "Peel-and-stick vinyl", "Carpet removal", "Small floor patching"] },
    ],
  },
  {
    id: "outside",
    label: "Outside & yard",
    services: [
      { name: "Exterior & seasonal", blurb: "Outside jobs around the house.", items: ["Patio wood, railing and small framing repairs", "Gutter cleaning", "Pressure washing", "Holiday light hanging and removal"] },
      { name: "Yard work", blurb: "Light landscaping and tidy-ups.", items: ["Planting and weeding", "Bark and mulch removal and install", "Hedge and shrub pruning", "Yard cleanup"] },
      { name: "Brush & hauling", blurb: "Cut back, cleaned up and hauled off.", items: ["Light tree and brush trimming", "Brush cleanup and haul-off", "Green waste and junk hauling (dump runs)"] },
    ],
  },
  {
    id: "car",
    label: "Cars",
    services: [
      { name: "Car basics", blurb: "Quick everyday car upkeep.", items: ["Battery testing and replacement", "Wiper blades", "Bulbs", "Air and cabin filters"] },
      { name: "Brakes", blurb: "Pads and rotors for everyday cars and trucks.", items: ["Brake pad replacement", "Rotor replacement"] },
      { name: "Headlight restoration", blurb: "Cloudy, yellowed lenses cleaned up.", items: ["Headlight lens restoration, so they look clearer and brighter"] },
    ],
  },
]

export const REVIEWS = [
  { name: "Austin Schuessler", text: "Adam did a great job. Quoted me over the phone with a good price for what I needed. Very professional, handled everything with care. Will definitely use his services again for jobs around the house." },
  { name: "June Crossley", text: "I had him do 2 jobs. Fix my patio and replace log in the outside wall. More jobs to come." },
  { name: "Lisa Quilice", text: "Great guy good prices reliable hard working. Highly recommend." },
]

export const FAQ = [
  { q: "What areas do you serve?", a: "First Man Handyman is based in Sheridan, CA and serves Roseville, Rocklin, Granite Bay, Loomis, Lincoln and Sheridan in Placer County, in the Sacramento region." },
  { q: "Do you offer evening and weekend appointments?", a: "Yes. Evening and weekend appointments are available, so you can get small jobs done around your work schedule." },
  { q: "What kinds of jobs do you take?", a: "Small repairs and installs around the house and yard: toilets, sinks, faucets and garbage disposals; shower and tub caulking; vanities, cabinets, doors and hardware; TV mounting and furniture assembly; drywall patching, touch-up paint and trim; vinyl plank and peel-and-stick flooring; patio wood and railing repairs, gutter cleaning, pressure washing and holiday lights; yard work, brush cleanup and hauling; and basic car care. Don’t see your job listed? Call or text Adam at 916-910-5423. If it’s a small job around the house, there’s a good chance I can help." },
  { q: "Do you work on cars?", a: "Yes, basic car care: battery testing and replacement, wiper blades, bulbs, air and cabin filters, brake pad and rotor replacement, and headlight lens restoration." },
  { q: "Do you haul away debris?", a: "Yes. I do brush cleanup and haul-off, plus green waste and junk hauling (dump runs)." },
  { q: "Can I buy my own materials?", a: "Yes. You choose the exact product and price, and I bring the tools and the know-how. Not sure what to buy? Text me and ask." },
  { q: "How do I get a quote?", a: "Call or text Adam at 916-910-5423 or email adam@firstmanhandyman.com with a short description of the job. Photos help." },
]

export const JOB_TYPES = [
  "Toilet or sink", "Faucet or disposal", "Shower or tub", "Cabinets or doors", "TV mount or assembly",
  "Drywall, paint or trim", "Flooring", "Patio or exterior", "Yard cleanup", "Brush and hauling", "Car basics", "Brakes", "Headlights",
]
