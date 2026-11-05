import "./fonts"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { LegalPage } from "../legal/LegalPage"
import "../../base.css"
import "./look.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LegalPage look="b" />
  </StrictMode>,
)
