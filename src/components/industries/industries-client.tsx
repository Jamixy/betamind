"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, ShoppingBag, Heart, TrendingUp, Building2, Hotel, Truck, Cpu, Factory, Play, Scale, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/home/cta-section";
import { INDUSTRIES } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  GraduationCap, ShoppingBag, Heart, TrendingUp, Building2, Hotel, Truck, Cpu, Factory, Play, Scale,
};

const DETAILS: Record<string, { desc: string; color: string; bg: string }> = {
  "Education":    { desc: "School management systems, e-learning platforms, and student portals.", color: "#FA5A02", bg: "#FFF1E8" },
  "E-Commerce":   { desc: "High-converting Shopify/WooCommerce stores with CRO and headless commerce.", color: "#059669", bg: "#ECFDF5" },
  "Healthcare":   { desc: "HIPAA-compliant patient portals, telemedicine apps, and clinic systems.", color: "#E11D48", bg: "#FFF1F2" },
  "Finance":      { desc: "Secure fintech dashboards, AI analytics, and automated reporting.", color: "#D97706", bg: "#FFFBEB" },
  "Real Estate":  { desc: "Property portals, CRM integrations, virtual tours, and lead management.", color: "#7C3AED", bg: "#F5F3FF" },
  "Hospitality":  { desc: "Direct booking engines, PMS, and guest experience platforms.", color: "#EA580C", bg: "#FFF7ED" },
  "Logistics":    { desc: "Real-time tracking dashboards, route optimisation, and warehouse systems.", color: "#0284C7", bg: "#F0F9FF" },
  "Technology":   { desc: "SaaS platforms, API products, developer tools, and enterprise software.", color: "#4F46E5", bg: "#EEF2FF" },
  "Non-Profit":   { desc: "Donation platforms, volunteer management, and impact reporting tools.", color: "#DB2777", bg: "#FDF2F8" },
  "Manufacturing":{ desc: "Inventory management, supply chain dashboards, and B2B ordering portals.", color: "#65A30D", bg: "#F7FEE7" },
  "Media":        { desc: "CMS platforms, streaming portals, subscriber systems, and analytics.", color: "#0891B2", bg: "#ECFEFF" },
  "Legal":        { desc: "Client intake portals, document management, and case tracking systems.", color: "#0D9488", bg: "#F0FDFA" },
};

export function IndustriesClient() {
  return (
    <>
      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label mb-4">Industries</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
              Deep expertise across<br /><span className="relative inline-block"><span className="gradient-underline">12 industries.</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl">
              The best digital solutions are built by teams that understand your industry. We bring domain-specific knowledge to every engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* grid */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ICONS[ind.icon] ?? Building2;
              const d    = DETAILS[ind.name] ?? { desc: "", color: "#FA5A02", bg: "#FFF1E8" };
              return (
                <motion.div key={ind.name}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * .05, duration: .45 }}
                  className="group card-hover p-7"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ background: d.bg }}>
                      <Icon className="w-5 h-5" style={{ color: d.color }} />
                    </div>
                    <span className="badge text-[11px]">{ind.count}+ projects</span>
                  </div>
                  <h2 className="text-[15px] font-bold text-[var(--fg)] mb-2">{ind.name}</h2>
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-5">{d.desc}</p>
                  <Link href="/contact"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-150 hover:gap-2.5"
                    style={{ color: d.color }}>
                    Start a project <ArrowRight className="w-3.5 h-3.5" />
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
