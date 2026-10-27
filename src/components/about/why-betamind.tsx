"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const REASONS = [
  { title: "Senior-only team",       desc: "Every project handled by seasoned engineers and designers — no juniors learning on your dime." },
  { title: "Fixed-price contracts",  desc: "We quote a price and stick to it. Zero surprise invoices, zero scope creep without approval." },
  { title: "Direct communication",   desc: "You talk directly to the people building your product. No account managers playing telephone." },
  { title: "Modern tech stack",      desc: "Next.js, TypeScript, AWS, and the latest AI frameworks — best-in-class tools on every project." },
  { title: "Performance obsessed",   desc: "PageSpeed 95+, Core Web Vitals compliance, and security hardening on every single delivery." },
  { title: "Post-launch support",    desc: "We don't disappear after launch. Every client gets post-launch monitoring and ongoing support." },
  { title: "IP & code ownership",    desc: "You own 100% of source code, designs, and intellectual property from day one. No exceptions." },
  { title: "Proven track record",    desc: "130+ projects delivered, 98% client satisfaction, trusted by clients in 13+ countries." },
];

export function WhyBetamind() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: .55 }}>
            <p className="section-label mb-4">Why Us</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--fg)] mb-5">
              Why top brands choose Betamind
            </h2>
            <p className="text-[var(--muted-fg)] leading-relaxed mb-10">
              We&apos;re not the biggest agency — and that&apos;s intentional. Our focused team
              delivers a quality and speed that large agencies simply can&apos;t match.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {REASONS.map((r, i) => (
                <motion.div key={r.title}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * .05 + .2, duration: .4 }}
                  className="flex gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FA5A02] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold text-[var(--fg)] mb-0.5">{r.title}</p>
                    <p className="text-[12px] text-[var(--muted-fg)] leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right — stat grid */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: .55, delay: .15 }}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "130+",  label: "Projects shipped",     color: "#FA5A02" },
                { value: "98%",   label: "Client satisfaction",  color: "#059669" },
                { value: "13+",   label: "Countries served",     color: "#8B5CF6" },
                { value: "8+",    label: "Years experience",     color: "#EA580C" },
                { value: "$50M+", label: "Client revenue driven",color: "#E11D48" },
                { value: "99.9%", label: "Uptime SLA",           color: "#0EA5E9" },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, scale: .95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * .07 + .3, duration: .4 }}
                  className="card p-5 text-center"
                >
                  <p className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[11.5px] font-medium text-[var(--muted-fg)]">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
