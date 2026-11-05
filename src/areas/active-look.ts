// The design the area pages (/areas/...) use. When the owner picks a launch look, change these two imports and LAUNCH_LOOK
// to the same letter (a, b, c or d). The launch build (FMH_LAUNCH=1) makes that look the home page of the site.
import "../looks/a/fonts"
import "../looks/a/look.css"

export const LAUNCH_LOOK = "a" as const
/** Where "back to the site" points in the concept build. The launch build turns it into "/". */
export const HOME = `/${LAUNCH_LOOK}/`
