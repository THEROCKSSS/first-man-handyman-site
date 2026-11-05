import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { TOWNS, slugOf } from "@/shared/data"
import { AreaPage } from "./AreaPage"
import "../base.css"
import "./active-look"

const root = document.getElementById("root")!
const slug = root.dataset.town
const town = slug ? TOWNS.find((t) => slugOf(t) === slug) ?? null : null

// These pages are turned into plain HTML at build time (scripts/prerender.mjs), so search engines read the text without running scripts.
createRoot(root).render(
  <StrictMode>
    <AreaPage town={town} />
  </StrictMode>,
)
