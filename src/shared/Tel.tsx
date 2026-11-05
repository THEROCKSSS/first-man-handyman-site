import { PHONE } from "./data"

/** The number never breaks across lines (it used to wrap at a hyphen on narrow screens). */
export function Tel() {
  return <span className="whitespace-nowrap">{PHONE}</span>
}
