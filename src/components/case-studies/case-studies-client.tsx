"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Calendar, Building2 } from "lucide-react";
import { CTASection } from "@/components/home/cta-section";
import { PORTFOLIO_PROJECTS } from "@/lib/data/portfolio";

const FEATURED = PORTFOLIO_PROJECTS.filter(p => p.featured);
const REST      = PORTFOLIO_PROJECTS.filter(p => !p.featured);

export function CaseStudiesClient() {
  return (
    <>
      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label mb-4">Case Studies</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
              Real problems.<br /><span className="relative inline-block"><span className="gradient-underline">Real results.</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl">
              In-depth stories of how we helped businesses overcome their most complex digital challenges and achieve measurable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* featured */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-8">Featured</h2>
          <div className="space-y-8">
            {FEATURED.map((p, i) => (
              <motion.article key={p.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * .1, duration: .5 }}
                className={`group grid lg:grid-cols-2 gap-0 rounded-2xl border border-[var(--border)] overflow-hidden hover:border-[#FA5A02]/30 hover:shadow-[0_8px_40px_rgba(0,0,0,.08)] transition-all duration-300 bg-[var(--bg)] ${i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""}`}>

                {/* image */}
                <div className="relative h-60 lg:h-auto min-h-[300px] overflow-hidden">
                  <Image src={p.image} alt={p.title} fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(min-width:1024px) 50vw,100vw" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 badge-brand">{p.category}</span>
                </div>

                {/* content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 text-xs text-[var(--muted-fg)]">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3"/>{p.client}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{p.year}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-[var(--fg)] tracking-tight mb-3 leading-tight">{p.title}</h2>
                  <p className="text-[var(--muted-fg)] leading-relaxed text-sm mb-6">{p.description}</p>

                  {/* results */}
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    {p.results.slice(0,4).map(r => (
                      <div key={r.metric} className="p-3 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <TrendingUp className="w-3 h-3 text-[#FA5A02]" />
                          <span className="text-[15px] font-black text-[#FA5A02]">{r.value}</span>
                        </div>
                        <p className="text-[11px] text-[var(--muted-fg)]">{r.metric}</p>
                      </div>
                    ))}
                  </div>

                  {/* tech */}
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {p.technologies.slice(0,5).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>

                  <Link href={`/portfolio?project=${p.slug}`} className="btn-primary self-start text-sm">
                    View project <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* more */}
      {REST.length > 0 && (
        <section className="pb-20 bg-[var(--bg)]">
          <div className="container-custom">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-6">More Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REST.map(p => (
                <Link key={p.id} href={`/portfolio?project=${p.slug}`}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden hover:border-[#FA5A02]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,.07)] transition-all duration-200">
                  <div className="relative h-36">
                    <Image src={p.image} alt={p.title} fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(min-width:1024px) 25vw,(min-width:640px) 50vw,100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-4">
                    <span className="badge-brand text-[11px] mb-2">{p.category}</span>
                    <h3 className="text-[13px] font-bold text-[var(--fg)] group-hover:text-[#FA5A02] transition-colors leading-snug mt-1.5 mb-1">{p.title}</h3>
                    <p className="text-[11.5px] text-[var(--muted-fg)]">{p.client} · {p.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
