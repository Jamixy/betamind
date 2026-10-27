import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { Toaster } from "sonner";
import { SITE_CONFIG } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/* Fonts                                                                */
/* ------------------------------------------------------------------ */
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
  preload:  true,
});

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default:  `${SITE_CONFIG.name} — Premium Digital Agency`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "web development agency",
    "custom web applications",
    "Next.js development",
    "Shopify development",
    "WordPress development",
    "AI integration",
    "SEO agency",
    "cloud solutions",
    "digital transformation",
    "software agency",
    "Betamind Technology",
  ],
  authors:   [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator:   SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index:   true,
    follow:  true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         SITE_CONFIG.url,
    siteName:    SITE_CONFIG.name,
    title:       `${SITE_CONFIG.name} — Premium Digital Agency`,
    description: SITE_CONFIG.description,
    images: [
      {
        url:    SITE_CONFIG.ogImage,
        width:  1200,
        height: 630,
        alt:    `${SITE_CONFIG.name} — We Build Digital Products That Grow Businesses`,
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    site:        SITE_CONFIG.twitterHandle,
    creator:     SITE_CONFIG.twitterHandle,
    title:       `${SITE_CONFIG.name} — Premium Digital Agency`,
    description: SITE_CONFIG.description,
    images:      [SITE_CONFIG.ogImage],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#020617" },
  ],
  width:               "device-width",
  initialScale:        1,
  maximumScale:        5,
  userScalable:        true,
};

/* ------------------------------------------------------------------ */
/* JSON-LD — Organization Schema                                        */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context":       "https://schema.org",
  "@type":          "Organization",
  name:             SITE_CONFIG.name,
  url:              SITE_CONFIG.url,
  logo:             `${SITE_CONFIG.url}/logo-mark.png`,
  description:      SITE_CONFIG.description,
  email:            SITE_CONFIG.email,
  foundingDate:     SITE_CONFIG.founded,
  sameAs: [
    SITE_CONFIG.social.twitter,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.github,
  ],
  address: [
    { "@type": "PostalAddress", addressLocality: "Abuja",         addressCountry: "NG" },
    { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA", addressCountry: "US" },
  ],
  contactPoint: {
    "@type":       "ContactPoint",
    contactType:   "customer service",
    email:         SITE_CONFIG.email,
    telephone:     SITE_CONFIG.whatsappAgents[0].display,
    availableLanguage: "English",
  },
};

/* ------------------------------------------------------------------ */
/* Root Layout                                                          */
/* ------------------------------------------------------------------ */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to Google Fonts (already handled by next/font but belt-and-suspenders) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main id="main-content">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Utilities */}
          <BackToTop />
          <CookieConsent />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: "var(--font-inter)",
                borderRadius: "0.5rem",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
