// Turns the area pages into plain HTML after the build, so search engines and link previews read the text without running any JavaScript.
// It loads each page in Chrome through the production-style server, saves the finished page, and removes the scripts.
// Needs Chrome or Chromium (set CHROME_PATH if it is not found).
import { spawn } from "node:child_process"
import { existsSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { chromium } from "playwright-core"

export function chromePath() {
  return [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"]
    .filter(Boolean).find((p) => existsSync(p))
}

/** @returns {Promise<boolean>} true when every page was saved as static HTML */
export async function prerender(dist, paths) {
  let browser
  try {
    const executablePath = chromePath()
    browser = await chromium.launch(executablePath ? { executablePath } : {})
  } catch {
    return false
  }
  const port = 8394
  const server = spawn(process.execPath, ["scripts/serve.mjs", dist, String(port)], { stdio: ["ignore", "pipe", "inherit"] })
  await new Promise((res) => server.stdout.on("data", (d) => String(d).includes("serving") && res()))
  try {
    for (const item of paths) {
      // a plain string = a page with no interaction (scripts removed); { path, keepScripts } = an app page that React takes over again in the browser
      const { path, keepScripts = false } = typeof item === "string" ? { path: item } : item
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
      await page.goto(`http://127.0.0.1:${port}${path}`, { waitUntil: "load" })
      await page.waitForSelector("h1")
      if (keepScripts) await page.waitForTimeout(2500) // let entrance animations and counters settle
      let html = await page.content()
      if (!keepScripts) {
        html = html
          .replace(/<script\b(?![^>]*ld\+json)[^>]*\bsrc=[^>]*><\/script>/g, "")
          .replace(/<link\b[^>]*rel=["']?modulepreload["']?[^>]*>/g, "")
        if (/<script\b(?![^>]*ld\+json)/.test(html)) throw new Error(`${path}: a script is still in the page`)
      }
      writeFileSync(join(dist, path, "index.html"), `<!doctype html>\n${html.replace(/^<!DOCTYPE html>\s*/i, "")}`)
      await page.close()
    }
  } finally {
    await browser.close()
    server.kill()
  }
  return true
}
