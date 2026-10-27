/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          BETAMIND TECHNOLOGY — SITE CONFIGURATION        ║
 * ║                                                          ║
 * ║  This is the ONE file you edit to update:                ║
 * ║  • Company name, tagline, description                    ║
 * ║  • Contact details (email, phone, WhatsApp, address)     ║
 * ║  • Social media links                                    ║
 * ║  • Logo (path to your image file)                        ║
 * ║  • Brand colors                                          ║
 * ║  • SEO / Open Graph settings                             ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * After editing, save the file — the site hot-reloads instantly
 * in dev mode, or run `npm run build` for production.
 */

export const siteConfig = {

  /* ──────────────────────────────────────────
     COMPANY IDENTITY
  ────────────────────────────────────────── */
  name:        "Betamind Technology",
  shortName:   "Betamind",
  tagline:     "We Build Digital Products That Grow Businesses.",
  description: "Betamind Technology is a premium full-service digital agency specializing in custom web applications, Shopify & WordPress development, AI integration, cloud solutions, and business automation.",

  /* ──────────────────────────────────────────
     LOGO
     Options:
       logoType: "text"   → uses the stylised "B" lettermark + company name
       logoType: "image"  → uses an image from /public/
  ────────────────────────────────────────── */
  logoType:    "text" as "text" | "image",
  logoImage:   "/logo-mark.png",     // brain-"B" mark used in the navbar, footer and browser tab
  logoWidth:   140,                  // px
  logoHeight:  40,                   // px

  /* ──────────────────────────────────────────
     CONTACT DETAILS  ← edit these
  ────────────────────────────────────────── */
  email:     "hello@betamindtech.com",
  calendarUrl: "https://calendly.com/betamind", // booking link

  // WhatsApp agents shown when someone clicks a "Chat on WhatsApp" button.
  // `icon` is "ng" (Nigerian flag) or "globe". `number` is digits only (country code first, no + or spaces); `display` is how it's shown.
  whatsappAgents: [
    { region: "Nigeria",       icon: "ng", name: "Aisha Bello",     number: "2348156060153", display: "+234 815 606 0153" },
    { region: "International", icon: "globe", name: "Francisca Sarah", number: "16340093627",   display: "+1 634 009 3627"   },
  ],

  // Office locations, shown in this order.
  addresses: [
    { label: "Abuja, Nigeria",    mapUrl: "https://maps.google.com/?q=Abuja,+Nigeria" },
    { label: "San Francisco, CA", mapUrl: "https://maps.google.com/?q=San+Francisco,+CA" },
  ],

  /* ──────────────────────────────────────────
     WEBSITE URL
  ────────────────────────────────────────── */
  url:       "https://www.betamindtech.com",
  founded:   "2018",
  registered: "2025",               // year registered with the CAC as BetaMind Technology Limited

  /* ──────────────────────────────────────────
     SOCIAL MEDIA  ← add your real URLs
  ────────────────────────────────────────── */
  social: {
    twitter:   "https://twitter.com/betamindtech",
    linkedin:  "https://linkedin.com/company/betamindtechnology",
    github:    "https://github.com/betamindtech",
    instagram: "https://instagram.com/betamindtech",
    youtube:   "https://youtube.com/@betamindtech",
  },

  /* ──────────────────────────────────────────
     SEO / OPEN GRAPH
  ────────────────────────────────────────── */
  ogImage:        "/og-image.png",
  twitterHandle:  "@betamindtech",

  /* ──────────────────────────────────────────
     BRAND COLORS  (CSS hex values)
     These are used in components via CSS variables.
     If you change these, also update globals.css
     and tailwind.config.ts to match.
  ────────────────────────────────────────── */
  colors: {
    accent:    "#FA5A02",   // brand orange — main CTA, links, highlights
    secondary: "#14B8A6",   // teal — secondary accents
    primary:   "#0F172A",   // dark navy — dark backgrounds
    dark:      "#020617",   // near-black — hero backgrounds
  },

  /* ──────────────────────────────────────────
     STATS (shown on homepage)
  ────────────────────────────────────────── */
  stats: [
    { label: "Projects Delivered", value: 130, suffix: "+" },
    { label: "Client Satisfaction", value: 98,  suffix: "%" },
    { label: "Years Experience",    value: 8,   suffix: "+" },
    { label: "Countries Served",    value: 13,  suffix: "+" },
  ],

  /* ──────────────────────────────────────────
     ADMIN / CMS NOTE
     This project uses file-based content.
     To update content, edit the following files:

     Services:      src/lib/constants.ts  →  SERVICES array
     Portfolio:     src/lib/data/portfolio.ts
     Blog posts:    src/lib/data/blog.ts
     Testimonials:  src/lib/constants.ts  →  TESTIMONIALS array
     Team members:  src/lib/constants.ts  →  TEAM_MEMBERS array
     Pricing:       src/lib/constants.ts  →  PRICING_PLANS array
     FAQ:           src/lib/constants.ts  →  FAQ_ITEMS array
     Jobs:          src/lib/data/careers.ts
  ────────────────────────────────────────── */

} as const;

export type SiteConfig = typeof siteConfig;
