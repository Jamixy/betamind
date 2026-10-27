"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Globe, ShoppingBag, Code2, GraduationCap, Wrench, Shield, TrendingUp, Cloud, Headphones, Zap, Brain, Server } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe, ShoppingBag, Code2, GraduationCap, Wrench, Shield,
  TrendingUp, Cloud, Headphones, Zap, Brain, Server,
};

const COLORS: Record<string, string> = {
  blue: "#FA5A02", green: "#10B981", purple: "#8B5CF6", teal: "#14B8A6",
  orange: "#F97316", red: "#EF4444", yellow: "#F59E0B", sky: "#0EA5E9",
  indigo: "#6366F1", amber: "#F59E0B", violet: "#7C3AED", cyan: "#06B6D4",
};

export function ServicesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)]" aria-labelledby="services-title">
      <div className="container-custom">

        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">Our Services</p>
            <h2 id="services-title" className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--fg)]">
              Everything you need<br className="hidden sm:block" /> to grow online
            </h2>
          </div>
          <Link href="/services" className="btn-secondary shrink-0 self-start sm:self-auto">
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => {
            const Icon  = ICONS[svc.icon] ?? Globe;
            const color = COLORS[svc.color] ?? "#FA5A02";
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .05, duration: .4, ease: [.4,0,.2,1] }}
              >
                <Link href={svc.href}
                  className="group flex flex-col h-full p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[#FA5A02]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,.07)] transition-all duration-200">

                  {/* icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${color}15` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>

                  <h3 className="text-[14px] font-bold text-[var(--fg)] mb-1.5 leading-snug group-hover:text-[#FA5A02] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-[12.5px] text-[var(--muted-fg)] leading-relaxed flex-1 mb-4">
                    {svc.shortDesc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#FA5A02] group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
