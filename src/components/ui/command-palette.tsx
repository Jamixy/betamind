"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, Home, Info, Briefcase, FolderOpen,
  BookOpen, DollarSign, HelpCircle, Phone, Building2, Users,
  Newspaper, X, Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

const COMMANDS = [
  { id: "home",         label: "Home",           href: "/",            icon: Home,       group: "Pages"   },
  { id: "about",        label: "About Us",        href: "/about",       icon: Info,       group: "Pages"   },
  { id: "services",     label: "Services",        href: "/services",    icon: Briefcase,  group: "Pages"   },
  { id: "portfolio",    label: "Portfolio",        href: "/portfolio",   icon: FolderOpen, group: "Pages"   },
  { id: "case-studies", label: "Case Studies",    href: "/case-studies",icon: BookOpen,   group: "Pages"   },
  { id: "pricing",      label: "Pricing",          href: "/pricing",     icon: DollarSign, group: "Pages"   },
  { id: "blog",         label: "Blog",             href: "/blog",        icon: Newspaper,  group: "Pages"   },
  { id: "industries",   label: "Industries",       href: "/industries",  icon: Building2,  group: "Pages"   },
  { id: "careers",      label: "Careers",          href: "/careers",     icon: Users,      group: "Pages"   },
  { id: "faq",          label: "FAQ",              href: "/faq",         icon: HelpCircle, group: "Pages"   },
  { id: "contact",      label: "Contact Us",       href: "/contact",     icon: Phone,      group: "Pages"   },
  { id: "wp-dev",       label: "WordPress Development", href: "/services/wordpress-development", icon: Briefcase, group: "Services" },
  { id: "shopify",      label: "Shopify Development",   href: "/services/shopify-development",    icon: Briefcase, group: "Services" },
  { id: "web-apps",     label: "Custom Web Applications",href: "/services/custom-web-apps",       icon: Briefcase, group: "Services" },
  { id: "ai",           label: "AI Integration",        href: "/services/ai-integration",         icon: Briefcase, group: "Services" },
  { id: "seo",          label: "SEO Services",          href: "/services/seo",                    icon: Briefcase, group: "Services" },
] as const;

/**
 * Global command palette — open with Ctrl+K / ⌘K.
 */
export function CommandPalette() {
  const router              = useRouter();
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState("");
  const [active, setActive] = useState(0);
  const inputRef            = useRef<HTMLInputElement>(null);

  /* Open / close with Ctrl+K */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Reset search when opened */
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setActive(0);
    }
  }

  /* Focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = query
    ? COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  /* Group results */
  type CommandItem = (typeof COMMANDS)[number];
  const groups: Record<string, CommandItem[]> = {};
  for (const cmd of filtered) {
    if (!groups[cmd.group]) groups[cmd.group] = [];
    groups[cmd.group].push(cmd);
  }

  const flatFiltered = Object.values(groups).flat();

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      setOpen(false);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter") {
      const cmd = flatFiltered[active];
      if (cmd) navigate(cmd.href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1,    y: 0    }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed top-[12vh] left-1/2 -translate-x-1/2 z-[200] w-full max-w-xl"
          >
            <div className="glass rounded-2xl shadow-2xl shadow-black/30 border border-[var(--surface-border)] overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
                <Search className="w-[1.125rem] h-[1.125rem] text-[var(--muted-foreground)] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, services…"
                  className="flex-1 bg-transparent text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none"
                  aria-label="Search"
                  autoComplete="off"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-all"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {Object.entries(groups).length === 0 ? (
                  <p className="text-center text-sm text-[var(--muted-foreground)] py-8">
                    No results for &quot;{query}&quot;
                  </p>
                ) : (
                  Object.entries(groups).map(([group, cmds]) => (
                    <div key={group} className="mb-2">
                      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] px-3 py-1.5">
                        {group}
                      </p>
                      {cmds.map((cmd) => {
                        const globalIdx = flatFiltered.indexOf(cmd);
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => navigate(cmd.href)}
                            onMouseEnter={() => setActive(globalIdx)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-100 text-left",
                              globalIdx === active
                                ? "bg-[#FA5A02] text-white"
                                : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                            )}
                          >
                            <cmd.icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1">{cmd.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-[var(--muted-foreground)]">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-[var(--muted)] text-[10px] font-mono">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-[var(--muted)] text-[10px] font-mono">↵</kbd>
                    open
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-[var(--muted)] text-[10px] font-mono">esc</kbd>
                    close
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)]">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
