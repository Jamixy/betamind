"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Shield, Zap, MessageCircle } from "lucide-react";
import { CTASection } from "@/components/home/cta-section";
import { PRICING_PLANS, MAINTENANCE_PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PricingClient() {
  const [billing, setBilling] = useState<"monthly"|"annually">("monthly");

  return (
    <>
      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label justify-center mb-4">Pricing</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] mb-6">
              Simple, <span className="relative inline-block"><span className="gradient-underline">honest pricing.</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl mx-auto mb-10">
              Fixed-price packages with no surprises. Choose the plan that fits your project scope.
            </p>
            {/* billing toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]" role="group">
              {(["monthly","annually"] as const).map(b => (
                <button key={b} onClick={() => setBilling(b)}
                  className={cn("px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200",
                    billing === b ? "bg-[var(--bg)] text-[var(--fg)] shadow-sm border border-[var(--border)]"
                                  : "text-[var(--muted-fg)] hover:text-[var(--fg)]"
                  )}>
                  {b} {b === "annually" && <span className="ml-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">−20%</span>}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* plans */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => {
              const price  = billing === "annually" ? plan.price.annually : plan.price.monthly;
              const isPop  = plan.badge === "Most Popular";
              return (
                <motion.div key={plan.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * .1, duration: .45 }}
                  className={cn("relative flex flex-col rounded-2xl border overflow-hidden",
                    isPop ? "border-[#FA5A02] ring-1 ring-[#FA5A02] shadow-[0_8px_40px_rgba(250,90,2,.15)]"
                           : "border-[var(--border)] hover:border-[#FA5A02]/40 hover:shadow-[0_4px_20px_rgba(0,0,0,.07)] transition-all duration-200"
                  )}>
                  {isPop && (
                    <div className="bg-[#FA5A02] text-white text-[11px] font-bold text-center py-1.5 tracking-wide uppercase">
                      Most Popular
                    </div>
                  )}
                  <div className="p-7 flex-1 flex flex-col bg-[var(--bg)]">
                    <h2 className="text-lg font-black text-[var(--fg)] mb-1">{plan.name}</h2>
                    <p className="text-[13px] text-[var(--muted-fg)] mb-6">{plan.description}</p>

                    {/* price */}
                    <div className="mb-7">
                      {price !== null ? (
                        <div className="flex items-end gap-1">
                          <span className="text-5xl font-black text-[var(--fg)] tracking-tight">${price.toLocaleString()}</span>
                          <span className="text-sm text-[var(--muted-fg)] pb-1.5">/project</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-4xl font-black text-[var(--fg)]">Custom</span>
                          <p className="text-sm text-[var(--muted-fg)] mt-1">Let&apos;s discuss your project</p>
                        </>
                      )}
                    </div>

                    {/* features */}
                    <ul className="space-y-2.5 mb-7 flex-1">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-[var(--muted-fg)]">{f}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map(f => (
                        <li key={f} className="flex items-start gap-2.5 opacity-40">
                          <X className="w-4 h-4 text-[var(--muted-fg)] shrink-0 mt-0.5" />
                          <span className="text-sm text-[var(--muted-fg)] line-through">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={plan.href}
                      className={cn("w-full text-center py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2",
                        isPop ? "btn-primary" : "btn-secondary"
                      )}>
                      {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* guarantees */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 text-sm text-[var(--muted-fg)]">
            {[
              { icon: Shield,        text: "Fixed-price — no surprise invoices" },
              { icon: Zap,           text: "You own 100% of the source code" },
              { icon: MessageCircle, text: "Free consultation before any commitment" },
            ].map(g => (
              <div key={g.text} className="flex items-center gap-2">
                <g.icon className="w-4 h-4 text-[#FA5A02]" /> {g.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* maintenance plans */}
      <section className="section-pad bg-[var(--muted)] border-t border-[var(--border)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-label justify-center mb-3">Ongoing Support</p>
            <h2 className="text-4xl font-black tracking-tight text-[var(--fg)]">Monthly maintenance plans</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {MAINTENANCE_PLANS.map((plan, i) => {
              const isPop = "badge" in plan && !!plan.badge;
              return (
                <motion.div key={plan.name}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * .1, duration: .45 }}
                  className={cn("relative rounded-2xl border p-6 bg-[var(--bg)]",
                    isPop ? "border-[#FA5A02] shadow-[0_4px_20px_rgba(250,90,2,.12)]" : "border-[var(--border)]"
                  )}>
                  {isPop && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#FA5A02] text-white text-[11px] font-bold whitespace-nowrap">
                      Best Value
                    </span>
                  )}
                  <h3 className="font-black text-lg text-[var(--fg)] mb-1">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-5">
                    <span className="text-3xl font-black text-[var(--fg)]">${plan.price}</span>
                    <span className="text-sm text-[var(--muted-fg)] pb-1">/mo</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[12.5px] text-[var(--muted-fg)]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact?plan=maintenance"
                    className={cn("block text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                      isPop ? "btn-primary" : "btn-secondary"
                    )}>
                    Get Started
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
