"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Map, Paintbrush, Code2, TestTube, Rocket, Headphones } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Search, Map, Figma: Paintbrush, Code2, TestTube, Rocket, Headphones,
};

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)]" aria-labelledby="process-title">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="section-label justify-center mb-3">How We Work</p>
          <h2 id="process-title" className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--fg)]">
            Our 7-step process
          </h2>
          <p className="mt-4 text-[var(--muted-fg)] max-w-xl mx-auto">
            A structured methodology that delivers predictable quality on every engagement.
          </p>
        </div>

        {/* desktop timeline */}
        <div className="relative hidden lg:block">
          {/* connector */}
          <div className="absolute top-[28px] left-[calc(100%/14)] right-[calc(100%/14)] h-px bg-[var(--border)]" aria-hidden />
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: .3, duration: 1.4, ease: [.4,0,.2,1] }}
            style={{ originX: 0 }}
            className="absolute top-[28px] left-[calc(100%/14)] right-[calc(100%/14)] h-px bg-[#FA5A02]"
            aria-hidden
          />
          <div className="grid grid-cols-7 gap-3">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = ICONS[step.icon] ?? Code2;
              return (
                <motion.div key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * .1 + .2, duration: .4 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-4 z-10">
                    <div className="w-14 h-14 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg)] flex items-center justify-center group-hover:border-[#FA5A02] group-hover:bg-[var(--brand-tint)] transition-all duration-200">
                      <Icon className="w-5 h-5 text-[var(--muted-fg)] group-hover:text-[#FA5A02] transition-colors" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FA5A02] text-white text-[9px] font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-[12.5px] font-bold text-[var(--fg)] mb-1">{step.title}</h3>
                  <p className="text-[11px] text-[var(--muted-fg)] leading-relaxed px-1 mb-2">{step.description}</p>
                  <span className="text-[10px] font-semibold text-[#FA5A02] bg-[var(--brand-tint)] px-2 py-0.5 rounded-full">{step.duration}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* mobile list */}
        <div className="lg:hidden space-y-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon] ?? Code2;
            return (
              <motion.div key={step.step}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * .07, duration: .4 }}
                className="flex gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-tint)] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#FA5A02]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-[#FA5A02] uppercase tracking-wider">{step.step}</span>
                    <span className="text-[10px] text-[var(--muted-fg)] bg-[var(--surface-2)] px-1.5 py-0.5 rounded-full">{step.duration}</span>
                  </div>
                  <h3 className="text-[14px] font-bold text-[var(--fg)] mb-0.5">{step.title}</h3>
                  <p className="text-[12.5px] text-[var(--muted-fg)] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
