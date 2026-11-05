import "../looks/a/fonts"
import "../looks/b/fonts"
import "../looks/c/fonts"
import "../looks/d/fonts"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import PrintPage from "./PrintPage"
import "../base.css"
import "../looks/a/look.css"
import "./print.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrintPage />
  </StrictMode>,
)
