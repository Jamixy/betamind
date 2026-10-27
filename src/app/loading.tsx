import { LogoMark } from "@/components/ui/logo-mark";

/**
 * Branded loading screen, shown while a page is loading.
 * Pure CSS animation (see .bm-loader-* in globals.css) so it renders instantly.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bm-loader-fade min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-[var(--bg)]"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* soft glow */}
        <span className="bm-loader-glow absolute inset-2 rounded-full bg-[#FA5A02]/20 blur-xl" aria-hidden />
        {/* faint track + spinning orange arc */}
        <span className="absolute inset-0 rounded-full border-[3px] border-[#FA5A02]/15" aria-hidden />
        <span className="bm-loader-spin absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#FA5A02] border-r-[#FA5A02]/60" aria-hidden />
        {/* pulsing logo */}
        <LogoMark className="bm-loader-pulse relative w-12 h-12" />
      </div>

      <div className="text-center leading-none">
        <p className="font-bold text-[15px] tracking-tight text-[var(--fg)]">Betamind</p>
        <p className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.3em] text-[var(--muted-fg)]">Technology Ltd</p>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
