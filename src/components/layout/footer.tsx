import React from "react";
import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { LogoMark } from "@/components/ui/logo-mark";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WhatsAppPicker } from "@/components/ui/whatsapp-picker";

/* ── inline brand SVGs ─────────────────────────────────────── */
function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function IconGithub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

/* ── link groups ────────────────────────────────────────────── */
const LINKS = {
  Services: [
    { label: "WordPress Development",   href: "/services/wordpress-development" },
    { label: "Shopify Development",     href: "/services/shopify-development"   },
    { label: "Custom Web Apps",         href: "/services/custom-web-apps"       },
    { label: "AI Integration",          href: "/services/ai-integration"        },
    { label: "SEO Services",            href: "/services/seo"                   },
    { label: "Cloud Solutions",         href: "/services/cloud"                 },
    { label: "Business Automation",     href: "/services/automation"            },
    { label: "Website Security",        href: "/services/security"              },
  ],
  Company: [
    { label: "About Us",     href: "/about"        },
    { label: "Portfolio",    href: "/portfolio"    },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog",         href: "/blog"         },
    { label: "Careers",      href: "/careers"      },
    { label: "Industries",   href: "/industries"   },
  ],
  Support: [
    { label: "Pricing",          href: "/pricing"  },
    { label: "FAQ",              href: "/faq"       },
    { label: "Contact Us",       href: "/contact"   },
    { label: "Privacy Policy",   href: "/privacy"   },
    { label: "Terms of Service", href: "/terms"     },
  ],
};

const SOCIAL = [
  { Icon: IconTwitter,  href: siteConfig.social.twitter,  label: "Twitter"  },
  { Icon: IconLinkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: IconGithub,   href: siteConfig.social.github,   label: "GitHub"   },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]" role="contentinfo">
      <div className="container-custom">

        {/* ── top CTA strip ────────────────────────────────── */}
        <div className="py-12 border-b border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-[var(--fg)] tracking-tight mb-1">
              Ready to build something great?
            </h2>
            <p className="text-sm text-[var(--muted-fg)]">
              Free consultation, no commitment required.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="btn-primary text-sm whitespace-nowrap">
              Book a Consultation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/portfolio" className="btn-secondary text-sm whitespace-nowrap">
              View Work
            </Link>
          </div>
        </div>

        {/* ── main grid ────────────────────────────────────── */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* brand col */}
          <div className="lg:col-span-2">
            {/* logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group" aria-label="Betamind Technology">
              <LogoMark className="w-9 h-9 group-hover:scale-105 transition-transform duration-200" />
              <div className="leading-none">
                <span className="block font-bold text-[14px] text-[var(--fg)]">Betamind</span>
                <span className="block text-[9.5px] font-semibold text-[var(--muted-fg)] tracking-widest uppercase">Technology Ltd</span>
              </div>
            </Link>

            <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-6 max-w-xs">
              We design and build premium digital products that help businesses grow.
              130+ projects delivered for clients across 13+ countries.
            </p>

            {/* contact */}
            <ul className="space-y-2.5 mb-6">
              <li>
                <a href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#FA5A02] shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <WhatsAppPicker message="Hi Betamind!"
                  className="flex items-center gap-2.5 text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                  Chat on WhatsApp
                </WhatsAppPicker>
              </li>
              {siteConfig.addresses.map(a => (
                <li key={a.label}>
                  <a href={a.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-[#FA5A02] shrink-0" />
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* social */}
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted-fg)] hover:border-[#FA5A02] hover:text-[#FA5A02] hover:bg-[var(--brand-tint)] transition-all duration-150">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* link cols */}
          {(Object.entries(LINKS) as [string, { label: string; href: string }[]][]).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--fg)] mb-4">{group}</h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href}
                      className="text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors duration-150">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── bottom bar ───────────────────────────────────── */}
        <div className="py-5 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted-fg)] order-2 sm:order-1">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted-fg)] order-1 sm:order-2">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
