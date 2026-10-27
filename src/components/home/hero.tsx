"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const PROOF = ["130+ Projects Delivered", "98% Client Satisfaction", "13+ Countries"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: .12, delayChildren: .1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: .5, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[var(--bg)]" aria-label="Hero">

      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" aria-hidden />

      <div className="relative container-custom pt-32 pb-20">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">

          {/* eyebrow */}
          <motion.div variants={item} className="mb-6">
            <span className="badge-brand gap-2 py-1 px-3 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FA5A02] animate-pulse-dot" />
              Premium Digital Agency
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1 variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[var(--fg)] tracking-[-0.04em] leading-[1.02] mb-7">
            We Build Digital<br />
            Products That<br />
            <span className="relative inline-block"><span className="gradient-underline">Grow Businesses.</span></span>
          </motion.h1>

          {/* sub */}
          <motion.p variants={item}
            className="text-lg sm:text-xl text-[var(--muted-fg)] max-w-xl leading-relaxed mb-10">
            From concept to launch — we design and engineer premium web applications,
            e‑commerce stores, and AI‑powered systems for ambitious brands worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/contact" className="btn-primary btn-xl">
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary btn-xl">
              View Our Work
            </Link>
          </motion.div>

          {/* social proof */}
          <motion.div variants={item} className="flex flex-wrap gap-x-6 gap-y-2">
            {PROOF.map((p) => (
              <span key={p} className="flex items-center gap-2 text-sm text-[var(--muted-fg)]">
                <CheckCircle className="w-4 h-4 text-[#FA5A02] shrink-0" />
                {p}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* floating metric cards */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 pr-4" aria-hidden>
          <FloatCard delay={0}>
            <p className="text-[11px] font-medium text-[var(--muted-fg)] mb-1">Revenue growth</p>
            <p className="text-2xl font-black text-[var(--fg)]">+210%</p>
            <p className="text-[10px] text-[var(--muted-fg)] mt-0.5">StyleNova E‑Commerce</p>
            <div className="mt-2 h-1 w-full rounded-full bg-[var(--border)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }} animate={{ width: "82%" }}
                transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-[#FA5A02]"
              />
            </div>
          </FloatCard>
          <FloatCard delay={.2}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <p className="text-[11px] font-medium text-[var(--muted-fg)]">Build in progress</p>
            </div>
            <p className="text-[13px] font-bold text-[var(--fg)]">Edusmart</p>
            <div className="mt-2 space-y-1">
              {["Design ✓", "Development…", "Pilot school"].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${i < 1 ? "bg-emerald-400" : "bg-[var(--border)]"}`} />
                  <span className="text-[11px] text-[var(--muted-fg)]">{s}</span>
                </div>
              ))}
            </div>
          </FloatCard>
          <FloatCard delay={.4}>
            <p className="text-[11px] font-medium text-[var(--muted-fg)] mb-1.5">Support tickets resolved</p>
            <p className="text-2xl font-black text-[var(--fg)]">−70%</p>
            <p className="text-[10px] text-[var(--muted-fg)]">FinanceFlow AI Integration</p>
          </FloatCard>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden
      >
        <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-[var(--muted-fg)]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-[var(--muted-fg)] to-transparent" />
      </motion.div>
    </section>
  );
}

function FloatCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: .8 + delay, duration: .5 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="w-[200px] rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
