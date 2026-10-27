"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (n: number) => {
    setDir(n);
    setIdx(v => (v + n + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[idx];

  return (
    <section ref={ref} className="section-pad bg-[var(--muted)]" aria-labelledby="testimonials-title">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="section-label justify-center mb-3">Testimonials</p>
          <h2 id="testimonials-title" className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--fg)]">
            Trusted by industry leaders
          </h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .5 }}>

          {/* featured card */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-8 lg:p-12 relative overflow-hidden">
              {/* big quote mark */}
              <span className="absolute top-6 right-8 text-[120px] font-black text-[var(--border)] leading-none select-none" aria-hidden>
                &ldquo;
              </span>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={idx}
                  custom={dir}
                  initial={{ opacity: 0, x: dir > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir > 0 ? -40 : 40 }}
                  transition={{ duration: .3 }}
                >
                  {/* stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-xl lg:text-2xl font-semibold text-[var(--fg)] leading-snug mb-8 tracking-tight">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FA5A02] flex items-center justify-center text-white font-bold text-base shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[var(--fg)] text-sm">{t.name}</p>
                      <p className="text-[var(--muted-fg)] text-xs">{t.title} · {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="flex items-center justify-between mt-5 px-1">
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                    className={cn("rounded-full transition-all duration-300", i === idx ? "w-6 h-2 bg-[#FA5A02]" : "w-2 h-2 bg-[var(--border)] hover:bg-[var(--muted-fg)]")}
                    aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
              <div className="flex gap-2">
                {([-1, 1] as const).map(n => (
                  <button key={n} onClick={() => go(n)}
                    className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-fg)] hover:border-[#FA5A02] hover:text-[#FA5A02] transition-all duration-150"
                    aria-label={n < 0 ? "Previous" : "Next"}>
                    {n < 0 ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* mini cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TESTIMONIALS.slice(0, 3).map(t => (
              <div key={t.id} className="card p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[13px] text-[var(--muted-fg)] leading-relaxed mb-4 line-clamp-3">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FA5A02] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[var(--fg)]">{t.name}</p>
                    <p className="text-[11px] text-[var(--muted-fg)]">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
