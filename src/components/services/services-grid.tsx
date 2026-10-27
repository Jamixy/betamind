"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Globe, ShoppingBag, Code2, GraduationCap, Wrench, Shield,
  TrendingUp, Cloud, Headphones, Zap, Brain, Server, ArrowRight, CheckCircle2,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Globe, ShoppingBag, Code2, GraduationCap, Wrench, Shield,
  TrendingUp, Cloud, Headphones, Zap, Brain, Server,
};

const COLORS: Record<string, { bg: string; text: string }> = {
  blue:   { bg: "#FFF1E8", text: "#FA5A02" },
  green:  { bg: "#ECFDF5", text: "#059669" },
  purple: { bg: "#F5F3FF", text: "#7C3AED" },
  teal:   { bg: "#F0FDFA", text: "#0D9488" },
  orange: { bg: "#FFF7ED", text: "#EA580C" },
  red:    { bg: "#FFF1F2", text: "#E11D48" },
  yellow: { bg: "#FFFBEB", text: "#D97706" },
  sky:    { bg: "#F0F9FF", text: "#0284C7" },
  indigo: { bg: "#EEF2FF", text: "#4F46E5" },
  amber:  { bg: "#FFFBEB", text: "#D97706" },
  violet: { bg: "#F5F3FF", text: "#7C3AED" },
  cyan:   { bg: "#ECFEFF", text: "#0891B2" },
};

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)]">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => {
            const Icon  = ICONS[svc.icon] ?? Globe;
            const color = COLORS[svc.color] ?? COLORS.blue;
            return (
              <motion.article key={svc.id}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .05, duration: .45 }}
                className="group card-hover flex flex-col p-7"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: color.bg }}>
                  <Icon className="w-5 h-5" style={{ color: color.text }} />
                </div>
                <h2 className="text-[15px] font-bold text-[var(--fg)] mb-2 leading-snug">{svc.title}</h2>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed mb-5 flex-1">{svc.description}</p>
                <ul className="space-y-1.5 mb-6">
                  {svc.benefits.slice(0, 4).map(b => (
                    <li key={b} className="flex items-start gap-2 text-[12.5px] text-[var(--muted-fg)]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: color.text }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href={svc.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-150 hover:gap-2.5"
                  style={{ color: color.text }}
                  aria-label={`Get started with ${svc.title}`}>
                  Get started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
