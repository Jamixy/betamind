"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, FileText, Cpu, Rocket } from "lucide-react";

const STEPS = [
  { icon: MessageSquare, step: "01", title: "Free Consultation",  desc: "Tell us about your project. We listen carefully and ask the right questions." },
  { icon: FileText,      step: "02", title: "Proposal & Scope",   desc: "Detailed proposal with fixed pricing, timeline, and technology recommendations." },
  { icon: Cpu,           step: "03", title: "Build & Iterate",    desc: "Regular demos and check-ins. You're never in the dark about progress." },
  { icon: Rocket,        step: "04", title: "Launch & Support",   desc: "Zero-downtime deployment, monitoring, and ongoing post-launch support." },
];

export function ServiceProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--muted)]">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="section-label justify-center mb-3">How It Works</p>
          <h2 className="text-4xl font-black tracking-tight text-[var(--fg)]">Simple process, remarkable results</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <motion.div key={s.step}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * .1, duration: .45 }}
              className="card-hover p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-tint)] flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-[#FA5A02]" />
                </div>
                <span className="text-xs font-bold text-[var(--muted-fg)] uppercase tracking-wider">{s.step}</span>
              </div>
              <h3 className="text-[14px] font-bold text-[var(--fg)] mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
