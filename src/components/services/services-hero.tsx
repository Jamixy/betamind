"use client";

import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
      <div className="container-custom relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="max-w-3xl">
          <p className="section-label mb-4">Services</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
            Premium services for<br /><span className="relative inline-block"><span className="gradient-underline">modern businesses.</span></span>
          </h1>
          <p className="text-lg text-[var(--muted-fg)] max-w-xl leading-relaxed">
            From custom web applications to AI integration and cloud infrastructure —
            every service delivered with enterprise-grade quality and startup-speed execution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
