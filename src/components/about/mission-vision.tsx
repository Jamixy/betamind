"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Eye } from "lucide-react";

const ITEMS = [
  {
    icon: Target,
    label: "Our Mission",
    title: "Empower businesses through technology",
    body: "Our mission is to make world-class digital products accessible to ambitious businesses of every size. We bridge the gap between enterprise-quality engineering and the agility of a focused boutique team — delivering outcomes that move the needle, not just deliverables.",
  },
  {
    icon: Eye,
    label: "Our Vision",
    title: "The go-to agency for growth-focused brands",
    body: "We envision a world where every growth-focused company has a trusted technology partner that understands both business strategy and modern engineering. We aim to be that partner for 1,000+ companies in the next decade — known for integrity, excellence, and measurable impact.",
  },
];

export function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--muted)]">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-5">
          {ITEMS.map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * .12, duration: .5 }}
              className="card p-8"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--brand-tint)] flex items-center justify-center mb-5">
                <item.icon className="w-5 h-5 text-[#FA5A02]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-fg)] mb-3">{item.label}</p>
              <h2 className="text-xl font-black text-[var(--fg)] mb-3 tracking-tight">{item.title}</h2>
              <p className="text-[var(--muted-fg)] leading-relaxed text-sm">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
