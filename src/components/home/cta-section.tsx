"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { WhatsAppPicker } from "@/components/ui/whatsapp-picker";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--bg)]" aria-label="Call to action">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .55 }}
          className="rounded-3xl bg-[#FA5A02] p-10 lg:p-16 relative overflow-hidden"
        >
          {/* subtle pattern */}
          <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none" aria-hidden />
          {/* glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" aria-hidden />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Ready to build something remarkable?
              </h2>
              <p className="text-orange-100 text-lg leading-relaxed">
                Free consultation, no commitment. Tell us your idea and we&apos;ll
                show you exactly how to bring it to life.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#FA5A02] font-bold text-sm hover:bg-orange-50 transition-colors shadow-lg">
                <Calendar className="w-4 h-4" />
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppPicker
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" color="currentColor" />
                Chat on WhatsApp
              </WhatsAppPicker>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
