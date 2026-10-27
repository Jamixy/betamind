import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─── Colors ─────────────────────────────── */
      colors: {
        brand:  "#FA5A02",          // Betamind brand orange
        "brand-dark": "#D94A00",
        "brand-light": "#FB7B35",
        ink:    "#0A0A0A",          // near-black text / bg
        "ink-2":"#111111",
        snow:   "#FFFFFF",
        "gray-50":  "#FAFAFA",
        "gray-100": "#F4F4F5",
        "gray-150": "#EBEBED",
        "gray-200": "#E4E4E7",
        "gray-300": "#D1D1D6",
        "gray-400": "#A1A1AA",
        "gray-500": "#71717A",
        "gray-600": "#52525B",
        "gray-700": "#3F3F46",
        "gray-800": "#27272A",
        "gray-900": "#18181B",
        /* semantic */
        background:  "var(--bg)",
        foreground:  "var(--fg)",
        border:      "var(--border)",
        muted:       "var(--muted)",
        "muted-fg":  "var(--muted-fg)",
        surface:     "var(--surface)",
        "surface-2": "var(--surface-2)",
      },
      /* ─── Typography ─────────────────────────── */
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1rem" }],
        xs:    ["0.75rem",   { lineHeight: "1rem" }],
        sm:    ["0.875rem",  { lineHeight: "1.25rem" }],
        base:  ["1rem",      { lineHeight: "1.5rem" }],
        lg:    ["1.125rem",  { lineHeight: "1.75rem" }],
        xl:    ["1.25rem",   { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem",    { lineHeight: "2rem" }],
        "3xl": ["1.875rem",  { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem",   { lineHeight: "2.5rem" }],
        "5xl": ["3rem",      { lineHeight: "1.1" }],
        "6xl": ["3.75rem",   { lineHeight: "1.05" }],
        "7xl": ["4.5rem",    { lineHeight: "1.02" }],
        "8xl": ["6rem",      { lineHeight: "1" }],
        "9xl": ["8rem",      { lineHeight: "1" }],
      },
      /* ─── Spacing extras ─────────────────────── */
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
      },
      /* ─── Border radius ──────────────────────── */
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      /* ─── Shadows ────────────────────────────── */
      boxShadow: {
        xs:   "0 1px 2px 0 rgba(0,0,0,.05)",
        sm:   "0 1px 3px 0 rgba(0,0,0,.08), 0 1px 2px -1px rgba(0,0,0,.06)",
        md:   "0 4px 12px -2px rgba(0,0,0,.08), 0 2px 4px -2px rgba(0,0,0,.05)",
        lg:   "0 8px 24px -4px rgba(0,0,0,.10), 0 4px 8px -4px rgba(0,0,0,.06)",
        xl:   "0 16px 40px -8px rgba(0,0,0,.12), 0 8px 16px -8px rgba(0,0,0,.06)",
        "2xl":"0 24px 64px -12px rgba(0,0,0,.14)",
        "brand-sm": "0 4px 16px rgba(250,90,2,.25)",
        "brand-md": "0 8px 32px rgba(250,90,2,.30)",
        "card":     "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
        "card-hover": "0 4px 16px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)",
        // dark shadows
        "dark-sm":  "0 4px 16px rgba(0,0,0,.4)",
        "dark-md":  "0 8px 32px rgba(0,0,0,.5)",
      },
      /* ─── Keyframes ──────────────────────────── */
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        "marquee-left": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1",   transform: "scale(1)" },
          "50%":     { opacity: ".5",  transform: "scale(.9)" },
        },
      },
      animation: {
        "fade-up":      "fade-up .5s ease both",
        "fade-in":      "fade-in .4s ease both",
        float:          "float 4s ease-in-out infinite",
        "marquee-left": "marquee-left 30s linear infinite",
        "spin-slow":    "spin-slow 20s linear infinite",
        "pulse-dot":    "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
