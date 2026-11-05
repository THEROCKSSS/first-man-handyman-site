/** @type {import('tailwindcss').Config} */
const c = (v) => `oklch(var(${v}) / <alpha-value>)`
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "0px", screens: { "2xl": "1200px" } },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      colors: {
        border: c("--border"),
        input: c("--border"),
        ring: c("--ring"),
        background: c("--background"),
        foreground: c("--foreground"),
        card: { DEFAULT: c("--card"), foreground: c("--foreground") },
        popover: { DEFAULT: c("--card"), foreground: c("--foreground") },
        primary: { DEFAULT: c("--primary"), foreground: c("--primary-foreground") },
        secondary: { DEFAULT: c("--muted"), foreground: c("--foreground") },
        muted: { DEFAULT: c("--muted"), foreground: c("--muted-foreground") },
        accent: { DEFAULT: c("--muted"), foreground: c("--foreground") },
        destructive: { DEFAULT: c("--primary"), foreground: c("--primary-foreground") },
        rust: c("--rust"),
        navy: { DEFAULT: c("--navy"), 2: c("--navy-2"), ink: c("--navy-ink"), mute: c("--navy-mute") },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s cubic-bezier(.2,.7,.2,1)",
        "accordion-up": "accordion-up 0.18s cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
