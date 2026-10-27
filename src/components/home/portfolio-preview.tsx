"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/data/portfolio";

const featured = PORTFOLIO_PROJECTS.filter(p => p.featured).slice(0, 4);

export function PortfolioPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="section-pad bg-[var(--muted)]" aria-labelledby="portfolio-title">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">Portfolio</p>
            <h2 id="portfolio-title" className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--fg)]">
              Selected work
            </h2>
          </div>
          <Link href="/portfolio" className="btn-secondary shrink-0 self-start sm:self-auto">
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* grid — first card spans 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * .1, duration: .45, ease: [.4,0,.2,1] }}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <Link href={`/portfolio?project=${project.slug}`}
                className="group block rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden hover:border-[#FA5A02]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,.08)] transition-all duration-300">

                {/* image */}
                <div className={`relative overflow-hidden ${i === 0 ? "h-64 lg:h-80" : "h-52"}`}>
                  <Image src={project.image} alt={project.title} fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes={i === 0 ? "100vw" : "(min-width:768px) 50vw, 100vw"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  <span className="absolute top-4 left-4 badge-brand">{project.category}</span>
                </div>

                {/* content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-[15px] font-bold text-[var(--fg)] group-hover:text-[#FA5A02] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <span className="text-xs text-[var(--muted-fg)] shrink-0 pt-0.5">{project.year}</span>
                  </div>
                  <p className="text-[13px] text-[var(--muted-fg)] leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                  {/* results */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {project.results.slice(0,3).map(r => (
                      <div key={r.metric}>
                        <p className="text-sm font-bold text-[#FA5A02] flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />{r.value}
                        </p>
                        <p className="text-[10.5px] text-[var(--muted-fg)]">{r.metric}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0,4).map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
