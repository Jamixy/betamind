"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, DollarSign, ChevronDown, ArrowRight, Globe, Zap, Users, BookOpen, Coffee } from "lucide-react";
import { CTASection } from "@/components/home/cta-section";
import { JOB_POSTINGS } from "@/lib/data/careers";
import type { JobPosting } from "@/types";
import { cn } from "@/lib/utils";

const PERKS = [
  { icon: Globe,    title: "100% Remote",      desc: "Work from anywhere. We're async-first and results-driven." },
  { icon: DollarSign, title: "Competitive Pay", desc: "Market-rate salaries with annual reviews and bonuses." },
  { icon: BookOpen, title: "$2,500 Budget",     desc: "Annual learning, conferences, and equipment allowance." },
  { icon: Zap,      title: "Exciting Work",     desc: "Technically challenging projects across 12+ industries." },
  { icon: Users,    title: "Senior Team",       desc: "No bureaucracy. Direct collaboration with experienced people." },
  { icon: Coffee,   title: "Flexible Hours",    desc: "We care about output, not when you're at your desk." },
];

export function CareersClient() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* hero */}
      <section className="relative pt-32 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 bg-grid-light pointer-events-none" aria-hidden />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <p className="section-label mb-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                We&apos;re Hiring
              </span>
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--fg)] leading-[1.02] mb-6">
              Build the future<br /><span className="relative inline-block"><span className="gradient-underline">with us.</span></span>
            </h1>
            <p className="text-lg text-[var(--muted-fg)] max-w-xl">
              Fully remote, senior-only team. If you&apos;re self-directed and care deeply about quality, we want to meet you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* perks */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="section-label justify-center mb-3">Life at Betamind</p>
            <h2 className="text-4xl font-black tracking-tight text-[var(--fg)]">Why you&apos;ll love it here</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERKS.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * .07, duration: .45 }}
                className="card-hover p-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-tint)] flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-[#FA5A02]" />
                </div>
                <h3 className="text-[14px] font-bold text-[var(--fg)] mb-1.5">{p.title}</h3>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* open roles */}
      <section className="section-pad bg-[var(--muted)] border-t border-[var(--border)]">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-label justify-center mb-3">Open Positions</p>
            <h2 className="text-4xl font-black tracking-tight text-[var(--fg)]">Current openings</h2>
          </div>
          <div className="space-y-3">
            {JOB_POSTINGS.map(job => (
              <JobCard key={job.id} job={job}
                expanded={expanded === job.id}
                onToggle={() => setExpanded(expanded === job.id ? null : job.id)} />
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-[var(--muted-fg)]">
            Don&apos;t see a fit?{" "}
            <Link href="/contact" className="text-[#FA5A02] font-semibold hover:underline">Send us your portfolio anyway.</Link>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function JobCard({ job, expanded, onToggle }: { job: JobPosting; expanded: boolean; onToggle: () => void }) {
  return (
    <div className={cn("rounded-2xl border bg-[var(--bg)] transition-all duration-200",
      expanded ? "border-[#FA5A02]/40 shadow-[0_4px_20px_rgba(250,90,2,.06)]" : "border-[var(--border)] hover:border-[#FA5A02]/20"
    )}>
      <button onClick={onToggle} className="w-full flex items-start sm:items-center justify-between gap-4 p-5 text-left" aria-expanded={expanded}>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-[15px] font-bold text-[var(--fg)]">{job.title}</h3>
            {job.featured && <span className="badge-brand text-[10px]">Featured</span>}
          </div>
          <div className="flex flex-wrap gap-3 text-[12px] text-[var(--muted-fg)]">
            <span className="flex items-center gap-1"><Users className="w-3 h-3"/>{job.department}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{job.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{job.type}</span>
            {job.salary && <span className="flex items-center gap-1"><DollarSign className="w-3 h-3"/>{job.salary}</span>}
          </div>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-[var(--muted-fg)] shrink-0 transition-transform duration-200", expanded && "rotate-180")} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: .2 }}
            className="overflow-hidden">
            <div className="px-5 pb-6 border-t border-[var(--border)] pt-5 space-y-5">
              <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{job.description}</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-[13px] font-bold text-[var(--fg)] mb-2">Requirements</h4>
                  <ul className="space-y-1.5">
                    {job.requirements.map(r => (
                      <li key={r} className="flex items-start gap-2 text-[12.5px] text-[var(--muted-fg)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FA5A02] shrink-0 mt-1.5" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[var(--fg)] mb-2">Benefits</h4>
                  <ul className="space-y-1.5">
                    {job.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2 text-[12.5px] text-[var(--muted-fg)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link href={`/contact?position=${encodeURIComponent(job.title)}`} className="btn-primary inline-flex text-sm">
                Apply for this role <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
