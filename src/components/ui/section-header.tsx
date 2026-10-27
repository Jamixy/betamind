import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?:       string;
  title:        string;
  titleHighlight?: string;
  description?: string;
  centered?:    boolean;
  className?:   string;
  light?:       boolean; // white text variant (on dark backgrounds)
}

/**
 * Reusable section header with optional badge, gradient highlight, and description.
 */
export function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  centered = true,
  className,
  light = false,
}: SectionHeaderProps) {
  const titleParts = titleHighlight
    ? title.split(titleHighlight)
    : [title];

  return (
    <div className={cn(centered && "text-center", className)}>
      {badge && (
        <div className={cn("inline-flex items-center gap-2 mb-4", centered && "justify-center")}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-semibold uppercase tracking-wider border bg-gradient-to-r from-[#FA5A02]/10 to-[#FFA24C]/10 border-[#FA5A02]/20 text-[#FA5A02]">
            <span className="w-1 h-1 rounded-full bg-[#FA5A02] animate-pulse" aria-hidden="true" />
            {badge}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
          light ? "text-white" : "text-[var(--foreground)]"
        )}
      >
        {titleHighlight ? (
          <>
            {titleParts[0]}
            <span className="gradient-text">{titleHighlight}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "text-lg leading-relaxed max-w-2xl",
            centered && "mx-auto",
            light ? "text-slate-300" : "text-[var(--muted-foreground)]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
