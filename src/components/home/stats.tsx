"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { STATS } from "@/lib/constants";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="border-y border-[var(--border)] bg-[var(--muted)]" aria-label="Statistics">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--border)]">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * .1, duration: .45, ease: [.4,0,.2,1] }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center gap-1.5"
            >
              <span className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--fg)] tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-[var(--muted-fg)] font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
