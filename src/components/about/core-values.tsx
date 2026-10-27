"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Shield, Zap, Heart, Star, Globe } from "lucide-react";
import { COMPANY_VALUES } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Target, Shield, Zap, Heart, Star, Globe,
};

const ACCENT_COLORS = [
  { bg: "#FFF1E8", text: "#FA5A02" },
  { bg: "#ECFDF5", text: "#059669" },
  { bg: "#FFF7ED", text: "#EA580C" },
  { bg: "#FDF4FF", text: "#9333EA" },
  { bg: "#FFF1F2", text: "#E11D48" },
  { bg: "#F0FDF4", text: "#16A34A" },
];

export function CoreValues() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)]">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="section-label justify-center mb-3">Our Values</p>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--fg)]">
            What we stand for
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMPANY_VALUES.map((val, i) => {
            const Icon  = ICONS[val.icon] ?? Star;
            const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
            return (
              <motion.div key={val.title}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .07, duration: .45 }}
                className="card-hover p-6"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: color.bg }}>
                  <Icon className="w-5 h-5" style={{ color: color.text }} />
                </div>
                <h3 className="text-[15px] font-bold text-[var(--fg)] mb-2">{val.title}</h3>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{val.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
