"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site.config";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 bg-[var(--bg)] overflow-hidden border-b border-[var(--border)]">
      <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .55, ease: [.4,0,.2,1] }}
          className="max-w-3xl"
        >
          <p className="section-label mb-4">About Us</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
            We&apos;re a team of<br />
            <span className="relative inline-block"><span className="gradient-underline">digital craftspeople.</span></span>
          </h1>
          <p className="text-lg text-[var(--muted-fg)] leading-relaxed max-w-xl">
            Founded in {siteConfig.founded} and registered with the Corporate Affairs
            Commission (CAC) as BetaMind Technology Limited in {siteConfig.registered},
            we build digital products for clients in Nigeria and internationally,
            products that create lasting business value.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
