import "@fontsource/zilla-slab/500.css"
import "@fontsource/zilla-slab/600.css"
import "@fontsource/figtree/400.css"
import "@fontsource/figtree/500.css"
import "@fontsource/figtree/600.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import Picker from "./Picker"
import "../base.css"
import "../looks/a/look.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Picker />
  </StrictMode>,
)
