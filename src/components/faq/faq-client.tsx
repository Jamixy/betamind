"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { CTASection } from "@/components/home/cta-section";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CATS = ["All", ...Array.from(new Set(FAQ_ITEMS.map(f => f.category)))];

export function FAQClient() {
  const [open, setOpen]         = useState<number | null>(null);
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? FAQ_ITEMS : FAQ_ITEMS.filter(f => f.category === category);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(f => ({
      "@type": "Question", name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label justify-center mb-4">FAQ</p>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[var(--fg)] mb-6">
              Frequently asked <span className="relative inline-block"><span className="gradient-underline">questions</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl mx-auto">
              Everything you need to know about working with Betamind.{" "}
              <Link href="/contact" className="text-[#FA5A02] hover:underline">Can&apos;t find your answer? Ask us.</Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* content */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom max-w-3xl">
          {/* category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10" role="group">
            {CATS.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150",
                  category === c ? "bg-[#FA5A02] text-white"
                                 : "bg-[var(--surface-2)] text-[var(--muted-fg)] border border-[var(--border)] hover:text-[var(--fg)]"
                )}>
                {c}
              </button>
            ))}
          </div>

          {/* accordion */}
          <div className="space-y-2.5" role="list">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div key={`${category}-${i}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ delay: i * .03 }}
                  role="listitem"
                  className={cn("rounded-2xl border bg-[var(--bg)] transition-all duration-200",
                    open === i ? "border-[#FA5A02]/40 shadow-[0_4px_20px_rgba(250,90,2,.06)]" : "border-[var(--border)] hover:border-[#FA5A02]/20"
                  )}>
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={open === i}>
                    <span className="text-[15px] font-semibold text-[var(--fg)] leading-snug">{item.question}</span>
                    <ChevronDown className={cn("w-4 h-4 text-[var(--muted-fg)] shrink-0 transition-transform duration-200", open === i && "rotate-180 text-[#FA5A02]")} />
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: .2 }}
                        className="overflow-hidden">
                        <p className="px-5 pb-5 pt-0 text-sm text-[var(--muted-fg)] leading-relaxed border-t border-[var(--border)] pt-4">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* still have questions */}
          <div className="mt-12 p-7 rounded-2xl border border-[var(--border)] bg-[var(--muted)] text-center">
            <div className="w-10 h-10 rounded-2xl bg-[var(--brand-tint)] flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-5 h-5 text-[#FA5A02]" />
            </div>
            <h3 className="text-base font-black text-[var(--fg)] mb-1.5">Still have questions?</h3>
            <p className="text-sm text-[var(--muted-fg)] mb-5">Our team is happy to answer any question about working with us.</p>
            <Link href="/contact" className="btn-primary text-sm inline-flex">Get in touch</Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
