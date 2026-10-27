"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, TrendingUp, Clock, Users } from "lucide-react";
import { CTASection } from "@/components/home/cta-section";
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES } from "@/lib/data/portfolio";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export function PortfolioClient() {
  const [cat, setCat]   = useState("All");
  const [sel, setSel]   = useState<Project | null>(null);

  const list = useMemo(() =>
    cat === "All" ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.filter(p => p.category === cat),
    [cat]
  );

  return (
    <>
      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label mb-4">Portfolio</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
              Projects that<br /><span className="relative inline-block"><span className="gradient-underline">speak for themselves.</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl">
              130+ projects delivered across 12 industries. Every project is a story of a business problem solved with elegant technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* filter + grid */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          {/* filters */}
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {PORTFOLIO_CATEGORIES.map(c => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                  cat === c ? "bg-[#FA5A02] text-white shadow-[0_4px_12px_rgba(250,90,2,.3)]"
                            : "bg-[var(--surface-2)] text-[var(--muted-fg)] border border-[var(--border)] hover:text-[var(--fg)]"
                )}>
                {c}
              </button>
            ))}
          </div>

          {/* grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {list.map(project => (
                <motion.div key={project.id} layout
                  initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .97 }}
                  transition={{ duration: .25 }}>
                  <button onClick={() => setSel(project)}
                    className="group w-full text-left rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden hover:border-[#FA5A02]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,.08)] transition-all duration-300"
                    aria-label={`View ${project.title}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image src={project.image} alt={project.title} fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        sizes="(min-width:1024px) 33vw,(min-width:768px) 50vw,100vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
                      <span className="absolute top-3 left-3 badge-brand text-[11px]">{project.category}</span>
                      {project.featured && <span className="absolute top-3 right-3 badge text-[11px]">Featured</span>}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-[14px] font-bold text-[var(--fg)] group-hover:text-[#FA5A02] transition-colors leading-snug">{project.title}</h3>
                        <span className="text-xs text-[var(--muted-fg)] shrink-0 pt-0.5">{project.year}</span>
                      </div>
                      <p className="text-xs text-[var(--muted-fg)] mb-3 line-clamp-2">{project.description}</p>
                      {project.results[0] && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <TrendingUp className="w-3 h-3 text-[#FA5A02]" />
                          <span className="text-xs font-bold text-[#FA5A02]">{project.results[0].value}</span>
                          <span className="text-xs text-[var(--muted-fg)]">{project.results[0].metric}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}
                        {project.technologies.length > 3 && <span className="tag">+{project.technologies.length-3}</span>}
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* open a project straight from a link, e.g. /portfolio?project=edusmart */}
      <Suspense fallback={null}>
        <ProjectFromUrl onOpen={setSel} />
      </Suspense>

      {/* modal */}
      <AnimatePresence>
        {sel && <ProjectModal key={sel.id} project={sel} onClose={() => setSel(null)} all={list} onNav={setSel} />}
      </AnimatePresence>

      <CTASection />
    </>
  );
}

function ProjectFromUrl({ onOpen }: { onOpen: (p: Project) => void }) {
  const slug = useSearchParams().get("project");
  useEffect(() => {
    const match = PORTFOLIO_PROJECTS.find(p => p.slug === slug);
    if (match) onOpen(match);
  }, [slug, onOpen]);
  return null;
}

function ProjectModal({ project, onClose, all, onNav }: {
  project: Project; onClose: () => void; all: Project[]; onNav: (p: Project) => void;
}) {
  const idx  = all.findIndex(p => p.id === project.id);
  const shots = project.images ?? [];
  const [shot, setShot] = useState<number | null>(null);

  /* lightbox keys: Esc closes, arrows step through screenshots */
  useEffect(() => {
    if (shot === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     setShot(null);
      if (e.key === "ArrowLeft")  setShot(i => (i === null ? i : (i - 1 + shots.length) % shots.length));
      if (e.key === "ArrowRight") setShot(i => (i === null ? i : (i + 1) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shot, shots.length]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 32, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: .97 }} transition={{ duration: .28, ease: [.4,0,.2,1] }}
        role="dialog" aria-modal aria-label={project.title}
        className="fixed inset-4 md:inset-10 lg:inset-16 z-[160] flex flex-col bg-[var(--bg)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto"
      >
        {/* image */}
        <div className="relative h-56 md:h-72 shrink-0">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            {([-1,1] as const).map(n => (
              <button key={n} onClick={() => all[idx+n] && onNav(all[idx+n])} disabled={!all[idx+n]}
                className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/60 transition-all"
                aria-label={n < 0 ? "Previous" : "Next"}>
                {n < 0 ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-2xl font-black text-[var(--fg)] tracking-tight mb-1">{project.title}</h2>
                  <p className="text-sm text-[var(--muted-fg)]">{project.client} · {project.industry} · {project.year}</p>
                </div>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-[#FA5A02] hover:border-[#FA5A02] transition-all shrink-0" aria-label="Live site">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-[var(--muted-fg)] leading-relaxed mb-6 text-sm">{project.description}</p>
              {project.problem && (
                <CaseSection title="The problem">
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{project.problem}</p>
                </CaseSection>
              )}
              {project.built && project.built.length > 0 && (
                <CaseSection title="What was built">
                  <div className="space-y-2.5">
                    {project.built.map(b => (
                      <div key={b.title} className="p-3.5 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
                        <p className="text-[13px] font-bold text-[var(--fg)] mb-0.5">{b.title}</p>
                        <p className="text-xs text-[var(--muted-fg)] leading-relaxed">{b.text}</p>
                      </div>
                    ))}
                  </div>
                </CaseSection>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <CaseSection title={project.built ? "Engineering highlights" : "Key features"}>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {project.highlights.map((h, i) => (
                      <li key={h.title} className="flex gap-3 p-3.5 rounded-xl border border-[var(--border)]">
                        <span className="w-6 h-6 rounded-lg bg-[var(--brand-tint)] text-[#FA5A02] text-xs font-black flex items-center justify-center shrink-0">{i + 1}</span>
                        <span>
                          <span className="block text-[13px] font-bold text-[var(--fg)] mb-0.5">{h.title}</span>
                          <span className="block text-xs text-[var(--muted-fg)] leading-relaxed">{h.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CaseSection>
              )}
              <div className="mb-6">
                {project.technologies.length > 0 && <h3 className="text-sm font-bold text-[var(--fg)] mb-3">Technologies</h3>}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              {shots.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-[var(--fg)] mb-3">Screenshots</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {shots.map((src, i) => (
                      <button key={src} onClick={() => setShot(i)}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--muted)] hover:border-[#FA5A02] transition-all"
                        aria-label={`View screenshot ${i + 1} of ${shots.length}`}>
                        <Image src={src} alt="" fill className="object-cover object-top" sizes="(min-width:640px) 160px, 30vw" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {project.testing && (
                <CaseSection title="Testing">
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{project.testing}</p>
                </CaseSection>
              )}
              {project.next && (
                <CaseSection title="What I learned & what's next">
                  <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{project.next}</p>
                </CaseSection>
              )}
            </div>
            <div>
              {(project.role || project.status) && (
                <div className="space-y-2.5 mb-6">
                  {project.role && (
                    <div className="p-3.5 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted-fg)] mb-0.5">Role</p>
                      <p className="text-[13px] font-semibold text-[var(--fg)]">{project.role}</p>
                    </div>
                  )}
                  {project.status && (
                    <div className="p-3.5 rounded-xl bg-[var(--brand-tint)] border border-[var(--brand-tint-border)]">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#D94A00] mb-0.5">Status</p>
                      <p className="text-[13px] font-semibold text-[#D94A00]">{project.status}</p>
                    </div>
                  )}
                </div>
              )}
              {project.results.length > 0 && <h3 className="text-sm font-bold text-[var(--fg)] mb-3">Results</h3>}
              <div className="space-y-3 mb-6">
                {project.results.map(r => (
                  <div key={r.metric} className="p-3.5 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
                    <p className="text-xl font-black text-[#FA5A02] mb-0.5">{r.value}</p>
                    <p className="text-xs text-[var(--muted-fg)]">{r.metric}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-xs text-[var(--muted-fg)]"><Users className="w-3.5 h-3.5 text-[#FA5A02]"/>{project.client}</div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-fg)]"><Clock className="w-3.5 h-3.5 text-[#FA5A02]"/>{project.industry}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* screenshot lightbox */}
      <AnimatePresence>
        {shot !== null && shots[shot] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            role="dialog" aria-modal aria-label={`${project.title} screenshot ${shot + 1} of ${shots.length}`}
            onClick={() => setShot(null)}
            className="fixed inset-0 z-[170] bg-black/90 flex items-center justify-center p-4 md:p-12">
            <div className="relative w-full h-full" onClick={e => e.stopPropagation()}>
              <Image src={shots[shot]} alt={`${project.title} screenshot ${shot + 1}`} fill className="object-contain" sizes="100vw" />
            </div>
            <button onClick={() => setShot(null)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all" aria-label="Close screenshot">
              <X className="w-5 h-5" />
            </button>
            {shots.length > 1 && ([-1, 1] as const).map(n => (
              <button key={n} onClick={e => { e.stopPropagation(); setShot((shot + n + shots.length) % shots.length); }}
                className={cn("absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all", n < 0 ? "left-4" : "right-4")}
                aria-label={n < 0 ? "Previous screenshot" : "Next screenshot"}>
                {n < 0 ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70">{shot + 1} / {shots.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-[var(--fg)] mb-3">{title}</h3>
      {children}
    </div>
  );
}
