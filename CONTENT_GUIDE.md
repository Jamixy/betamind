# Betamind Technology — Content Editing Guide

Everything on the site is controlled by simple TypeScript files.
No admin panel, no CMS login — just edit a file and save.
In dev mode (`npm run dev`) the browser updates instantly.

---

## 🔑 The Most Important File

**`src/config/site.config.ts`**

Edit this ONE file to update:
- Company name and tagline
- Email address
- Phone number
- WhatsApp number
- Physical address
- Social media links (Twitter, LinkedIn, GitHub, Instagram, YouTube)
- Website URL
- Logo type (text vs image)
- Brand colors

---

## 🖼️ Adding Your Logo

### Option 1 — Use your own image (recommended)

1. Copy your logo file to: `public/logo.png` (or `.svg`)
2. Open `src/config/site.config.ts`
3. Change `logoType: "text"` → `logoType: "image"`
4. Set `logoImage: "/logo.png"` and adjust `logoWidth` / `logoHeight`
5. Open `src/components/layout/navbar.tsx`
6. Find the `LOGO` comment block and replace the letter-mark div with:
   ```tsx
   import Image from "next/image";
   <Image src={siteConfig.logoImage} alt={siteConfig.name} width={siteConfig.logoWidth} height={siteConfig.logoHeight} className="h-9 w-auto" />
   ```

### Option 2 — Keep the text/lettermark logo

Just update `name` and `shortName` in `site.config.ts` — done.

---

## ✉️ Changing Email / Phone / WhatsApp

Open `src/config/site.config.ts` and update:

```ts
email:    "your@email.com",
phone:    "+1 (555) 123-4567",
whatsapp: "15551234567",   // digits only, no spaces or +
```

That's it. Email appears in the footer, contact page, and navbar.
WhatsApp button is on the contact page and CTA sections.

---

## 📝 Editing Page Content

| What to edit          | File                                  |
|-----------------------|---------------------------------------|
| Services (all 12)     | `src/lib/constants.ts` → `SERVICES`   |
| Pricing plans         | `src/lib/constants.ts` → `PRICING_PLANS` |
| Testimonials          | `src/lib/constants.ts` → `TESTIMONIALS` |
| Team members          | `src/lib/constants.ts` → `TEAM_MEMBERS` |
| FAQ questions         | `src/lib/constants.ts` → `FAQ_ITEMS`  |
| Process steps         | `src/lib/constants.ts` → `PROCESS_STEPS` |
| Company values        | `src/lib/constants.ts` → `COMPANY_VALUES` |
| Homepage stats        | `src/config/site.config.ts` → `stats` |
| Portfolio projects    | `src/lib/data/portfolio.ts`           |
| Blog posts            | `src/lib/data/blog.ts`                |
| Job postings          | `src/lib/data/careers.ts`             |
| Industries            | `src/lib/constants.ts` → `INDUSTRIES` |
| Nav links             | `src/components/layout/navbar.tsx`    |
| Footer links          | `src/components/layout/footer.tsx`    |

---

## 🖋️ Adding a New Blog Post

Open `src/lib/data/blog.ts` and add a new object to the `BLOG_POSTS` array:

```ts
{
  id:         "7",
  title:      "Your Article Title",
  slug:       "your-article-slug",       // URL: /blog/your-article-slug
  excerpt:    "Short description shown in the blog grid.",
  content:    "",                        // leave empty — body is in the [slug]/page.tsx
  author: {
    name:   "Your Name",
    avatar: "/team/you.jpg",
    role:   "Your Role",
  },
  category:    "Web Development",        // must match a category in BLOG_CATEGORIES
  tags:        ["Next.js", "React"],
  coverImage:  "/blog/your-image.jpg",   // place in /public/blog/
  publishedAt: "2025-06-01T09:00:00Z",
  readTime:    "5 min read",
  featured:    false,
},
```

---

## 🗂️ Adding a New Portfolio Project

Open `src/lib/data/portfolio.ts` and add to the `PORTFOLIO_PROJECTS` array:

```ts
{
  id:           "my-project",
  title:        "Project Name",
  slug:         "project-name",          // URL: /portfolio/project-name
  category:     "Web Application",
  tags:         ["Next.js", "TypeScript"],
  description:  "What the project does and what you achieved.",
  image:        "https://images.unsplash.com/...",
  client:       "Client Name",
  industry:     "E-Commerce",
  year:         2025,
  url:          "https://clientsite.com",
  technologies: ["Next.js", "TypeScript", "PostgreSQL"],
  results: [
    { metric: "Revenue Growth", value: "+150%" },
    { metric: "Page Speed",     value: "98/100" },
  ],
  featured: true,  // shows on homepage and case studies
},
```

---

## 💲 Changing Prices

Open `src/lib/constants.ts`, find `PRICING_PLANS` and update the `price` values:

```ts
price: { monthly: 999, annually: 799 },
```

For Enterprise (custom pricing), keep both as `null`.

---

## 🎨 Changing Brand Colors

1. Update `src/config/site.config.ts` → `colors` block
2. Update `src/app/globals.css` — change the hex values in `:root`
3. Update `tailwind.config.ts` → `theme.extend.colors` → `accent` and `secondary`

The three places must match.

---

## 🚀 Deploying to Production

**Vercel (recommended — free tier works):**
```bash
npm install -g vercel
vercel
```

**Manual build:**
```bash
npm run build
npm run start
```

The build output goes to `.next/` and is fully static-optimised.

---

## 📂 Key File Structure

```
src/
├── config/
│   └── site.config.ts      ← START HERE for any edits
├── lib/
│   ├── constants.ts         ← services, pricing, testimonials, FAQ, team
│   └── data/
│       ├── portfolio.ts     ← portfolio projects
│       ├── blog.ts          ← blog posts
│       └── careers.ts       ← job postings
├── app/                     ← page routes
├── components/
│   ├── layout/
│   │   ├── navbar.tsx       ← navigation
│   │   └── footer.tsx       ← footer
│   └── home/                ← homepage sections
public/
├── logo.png                 ← place your logo here
├── og-image.png             ← social share image (1200×630)
└── favicon.ico              ← browser tab icon
```
