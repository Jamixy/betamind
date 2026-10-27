"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";

/* ── Inline brand SVGs ──────────────────────────────────────── */
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const AVATAR_COLORS = [
  { bg: "#FA5A02", text: "#fff" },
  { bg: "#8B5CF6", text: "#fff" },
  { bg: "#059669", text: "#fff" },
  { bg: "#EA580C", text: "#fff" },
];

export function TeamSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--surface-2)" }}
      aria-labelledby="team-title"
    >
      <div className="container-custom">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-fg)] mb-3">
            Our Team
          </p>
          <h2
            id="team-title"
            className="text-4xl lg:text-5xl font-black tracking-tight mb-4"
            style={{ color: "var(--fg)" }}
          >
            The people behind Betamind
          </h2>
          <p className="text-[var(--muted-fg)] max-w-xl mx-auto text-[15px] leading-relaxed">
            A small, senior team of engineers, designers, and strategists who
            care deeply about craft and outcomes.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM_MEMBERS.map((member, i) => {
            const color    = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <div
                  className="group flex flex-col h-full p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--border)",
                    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,.10)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(250,90,2,.3)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                >
                  {/* Avatar */}
                  <div
                    className="relative w-16 h-16 rounded-2xl mb-5 flex items-center justify-center text-2xl font-black select-none shrink-0"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    {member.avatar
                      ? <Image src={member.avatar} alt={member.name} fill sizes="64px" className="object-cover object-top rounded-2xl" />
                      : initials}
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                      style={{ backgroundColor: "#34D399", borderColor: "var(--bg)" }}
                      aria-hidden
                    />
                  </div>

                  {/* Name + Title */}
                  <h3 className="text-[15px] font-bold leading-snug mb-0.5" style={{ color: "var(--fg)" }}>
                    {member.name}
                  </h3>
                  <p className="text-[12.5px] font-semibold mb-3" style={{ color: "#FA5A02" }}>
                    {member.title}
                  </p>

                  {/* Bio */}
                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--muted-fg)" }}>
                    {member.bio}
                  </p>

                  {/* Social links */}
                  <div className="flex items-center gap-2 mt-auto">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                        style={{ border: "1px solid var(--border)", color: "var(--muted-fg)" }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#FA5A02";
                          (e.currentTarget as HTMLElement).style.color = "#FA5A02";
                          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-tint)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLElement).style.color = "var(--muted-fg)";
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        }}
                      >
                        <IconLinkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on Twitter`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                        style={{ border: "1px solid var(--border)", color: "var(--muted-fg)" }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#1DA1F2";
                          (e.currentTarget as HTMLElement).style.color = "#1DA1F2";
                          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-2)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLElement).style.color = "var(--muted-fg)";
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        }}
                      >
                        <IconTwitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={member.linkedin ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} profile`}
                      className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150"
                      style={{ border: "1px solid var(--border)", color: "var(--muted-fg)" }}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Hiring nudge ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
          className="mt-8 p-6 rounded-2xl border border-dashed flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p className="font-bold text-sm mb-0.5" style={{ color: "var(--fg)" }}>
              We&apos;re always looking for talented people
            </p>
            <p className="text-sm" style={{ color: "var(--muted-fg)" }}>
              Remote-first, senior-only. Check our open roles.
            </p>
          </div>
          <Link
            href="/careers"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-150"
            style={{ borderColor: "var(--border)", color: "var(--fg)", backgroundColor: "var(--bg)" }}
          >
            View open roles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
