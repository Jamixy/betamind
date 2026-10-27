"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, ChevronDown, ArrowRight,
  Globe, ShoppingBag, Code2, GraduationCap, Wrench,
  Shield, TrendingUp, Cloud, Headphones, Zap, Brain, Server,
  Building2, Users, HelpCircle, DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/logo-mark";

/* ── nav data ─────────────────────────────────────────────── */
interface NavChild { label: string; href: string; icon?: React.ReactNode; }
interface NavItem  { label: string; href: string; children?: NavChild[]; }

const serviceIcons: Record<string, React.ReactNode> = {
  "WordPress Development":     <Globe        className="w-3.5 h-3.5" />,
  "Shopify Development":       <ShoppingBag  className="w-3.5 h-3.5" />,
  "Custom Web Applications":   <Code2        className="w-3.5 h-3.5" />,
  "School Management Systems": <GraduationCap className="w-3.5 h-3.5" />,
  "Website Maintenance":       <Wrench       className="w-3.5 h-3.5" />,
  "Website Security":          <Shield       className="w-3.5 h-3.5" />,
  "SEO":                       <TrendingUp   className="w-3.5 h-3.5" />,
  "Cloud Solutions":           <Cloud        className="w-3.5 h-3.5" />,
  "Technical Support":         <Headphones   className="w-3.5 h-3.5" />,
  "Business Automation":       <Zap          className="w-3.5 h-3.5" />,
  "AI Integration":            <Brain        className="w-3.5 h-3.5" />,
  "Hosting & Infrastructure":  <Server       className="w-3.5 h-3.5" />,
};

const navItems: NavItem[] = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services", href: "/services",
    children: [
      { label: "WordPress Development",     href: "/services/wordpress-development"  },
      { label: "Shopify Development",       href: "/services/shopify-development"    },
      { label: "Custom Web Applications",   href: "/services/custom-web-apps"        },
      { label: "School Management Systems", href: "/services/school-management"      },
      { label: "Website Maintenance",       href: "/services/maintenance"            },
      { label: "Website Security",          href: "/services/security"               },
      { label: "SEO",                       href: "/services/seo"                    },
      { label: "Cloud Solutions",           href: "/services/cloud"                  },
      { label: "Technical Support",         href: "/services/support"                },
      { label: "Business Automation",       href: "/services/automation"             },
      { label: "AI Integration",            href: "/services/ai-integration"         },
      { label: "Hosting & Infrastructure",  href: "/services/hosting"                },
    ],
  },
  { label: "Portfolio",    href: "/portfolio"    },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog",         href: "/blog"         },
  {
    label: "More", href: "#",
    children: [
      { label: "Industries", href: "/industries", icon: <Building2  className="w-3.5 h-3.5" /> },
      { label: "Pricing",    href: "/pricing",    icon: <DollarSign className="w-3.5 h-3.5" /> },
      { label: "Careers",    href: "/careers",    icon: <Users      className="w-3.5 h-3.5" /> },
      { label: "FAQ",        href: "/faq",        icon: <HelpCircle className="w-3.5 h-3.5" /> },
    ],
  },
];

/* ── Navbar ───────────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [lastPath,        setLastPath]        = useState(pathname);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  // close the mobile menu on navigation
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const enter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveDropdown(label);
  };
  const leave = () => {
    leaveTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop bar ─────────────────────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: .4, ease: [.4,0,.2,1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-[100] transition-all duration-300",
          scrolled
            ? "bg-[color-mix(in_srgb,var(--bg)_95%,transparent)] backdrop-blur-md border-b border-[var(--border)] shadow-sm"
            : "bg-[var(--bg)]"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Betamind Technology">
              <LogoMark className="w-9 h-9 group-hover:scale-105 transition-transform duration-200" />
              <div className="leading-none">
                <span className="block font-bold text-[14px] tracking-tight text-[var(--fg)]">Betamind</span>
                <span className="block text-[9.5px] font-semibold text-[var(--muted-fg)] tracking-widest uppercase">Technology Ltd</span>
              </div>
            </Link>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && enter(item.label)}
                  onMouseLeave={() => item.children && leave()}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-150",
                        isActive(item.href)
                          ? "text-[#FA5A02] bg-[var(--brand-tint)]"
                          : "text-[var(--fg)] hover:text-[#FA5A02] hover:bg-[var(--brand-tint)]"
                      )}
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-150",
                        isActive(item.href)
                          ? "text-[#FA5A02] bg-[var(--brand-tint)]"
                          : "text-[var(--fg)] hover:text-[#FA5A02] hover:bg-[var(--brand-tint)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: .98 }}
                        animate={{ opacity: 1, y: 0, scale: 1   }}
                        exit={{    opacity: 0, y: 6, scale: .98 }}
                        transition={{ duration: .15, ease: [.4,0,.2,1] }}
                        onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }}
                        onMouseLeave={leave}
                        className={cn(
                          "absolute top-full left-0 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-xl overflow-hidden",
                          item.label === "Services" ? "w-[480px]" : "w-52"
                        )}
                      >
                        {item.label === "Services" ? (
                          <div className="p-3">
                            <div className="grid grid-cols-2 gap-0.5">
                              {item.children.map((c) => (
                                <Link key={c.href} href={c.href}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] font-semibold text-[var(--fg)] hover:text-[#FA5A02] hover:bg-[var(--brand-tint)] transition-all duration-100">
                                  <span className="text-[#FA5A02] shrink-0">{serviceIcons[c.label]}</span>
                                  {c.label}
                                </Link>
                              ))}
                            </div>
                            <div className="mt-2 pt-2 border-t border-[var(--border)]">
                              <Link href="/services"
                                className="flex items-center justify-center gap-1.5 py-2 text-[12.5px] font-semibold text-[#FA5A02] hover:opacity-80 transition-opacity">
                                View all services <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2">
                            {item.children.map((c) => (
                              <Link key={c.href} href={c.href}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[var(--fg)] hover:text-[#FA5A02] hover:bg-[var(--brand-tint)] transition-all duration-100">
                                {c.icon && <span className="text-[#FA5A02]">{c.icon}</span>}
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="btn-ghost p-2 rounded-lg"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
              <Link href="/contact" className="hidden md:inline-flex btn-secondary text-[13px] px-4 py-2">
                Contact
              </Link>
              <Link href="/contact?ref=navbar" className="hidden md:inline-flex btn-primary text-[13px] px-4 py-2">
                Get a Quote
              </Link>
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden btn-ghost p-2 rounded-lg"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: .3, ease: [.4,0,.2,1] }}
              className="fixed top-0 right-0 bottom-0 z-[95] w-80 bg-[var(--bg)] border-l border-[var(--border)] shadow-2xl lg:hidden flex flex-col"
            >
              {/* header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <LogoMark className="w-8 h-8" />
                  <span className="font-bold text-[14px]">Betamind Technology Ltd</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="btn-ghost p-1.5 rounded-lg" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item) => (
                  <MobileItem key={item.label} item={item} pathname={pathname} onClose={() => setMobileOpen(false)} serviceIcons={serviceIcons} />
                ))}
              </div>

              {/* footer */}
              <div className="p-4 border-t border-[var(--border)] space-y-2.5">
                <Link href="/contact?ref=mobile" onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-sm">
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--surface-2)] text-sm text-[var(--muted-fg)]"
                  >
                    <span>{theme === "dark" ? "Dark mode" : "Light mode"}</span>
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Mobile nav item ──────────────────────────────────────── */
function MobileItem({ item, pathname, onClose, serviceIcons }: {
  item: NavItem; pathname: string; onClose: () => void;
  serviceIcons: Record<string, React.ReactNode>;
}) {
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (!item.children) {
    return (
      <Link href={item.href} onClick={onClose}
        className={cn("flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
          isActive(item.href) ? "bg-[var(--brand-tint)] text-[#FA5A02]" : "text-[var(--fg)] font-semibold hover:bg-[var(--brand-tint)] hover:text-[#FA5A02]")}>
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button onClick={() => setOpen(v => !v)}
        className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors",
          isActive(item.href) ? "bg-[var(--brand-tint)] text-[#FA5A02]" : "text-[var(--fg)] hover:bg-[var(--brand-tint)] hover:text-[#FA5A02]")}>
        {item.label}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: .2 }}
            className="overflow-hidden pl-3 mt-0.5 space-y-0.5"
          >
            {item.children.map((c) => (
              <Link key={c.href} href={c.href} onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-[var(--fg)] hover:text-[#FA5A02] hover:bg-[var(--brand-tint)] transition-colors">
                {(serviceIcons[c.label] || c.icon) && (
                  <span className="text-[#FA5A02]">{serviceIcons[c.label] || c.icon}</span>
                )}
                {c.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
