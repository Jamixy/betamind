"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Globe } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

/* Drawn rather than an emoji: Windows shows the 🇳🇬 emoji as the letters "NG". */
function NigeriaFlag() {
  return (
    <svg viewBox="0 0 3 2" className="w-7 h-[18px] rounded-[3px] shadow-sm" aria-hidden>
      <rect width="3" height="2" fill="#008751" />
      <rect x="1" width="1" height="2" fill="#ffffff" />
    </svg>
  );
}

const DEFAULT_MESSAGE = "Hi Betamind! I'd like to discuss a project.";

/**
 * A button that opens a small chooser for the Nigeria or International WhatsApp agent.
 * Agents come from `whatsappAgents` in site.config.ts.
 */
export function WhatsAppPicker({
  className,
  children,
  message = DEFAULT_MESSAGE,
}: {
  className?: string;
  children: React.ReactNode;
  message?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog">
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[180] bg-black/50 backdrop-blur-sm" aria-hidden />
            {/* bottom sheet on phones, centred card on larger screens */}
            <div onClick={() => setOpen(false)}
              className="fixed inset-0 z-[190] flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: .97 }} transition={{ duration: .22, ease: [.4,0,.2,1] }}
              onClick={e => e.stopPropagation()}
              role="dialog" aria-modal aria-label="Chat with us on WhatsApp"
              className="w-full sm:w-[380px] rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl p-5 text-left"
            >
              <div className="flex items-start justify-between gap-4 mb-1">
                <h2 className="flex items-center gap-2 text-base font-black text-[var(--fg)]">
                  <WhatsAppIcon className="w-5 h-5" />
                  Chat with us on WhatsApp
                </h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close"
                  className="w-8 h-8 -mt-1 -mr-1 rounded-lg flex items-center justify-center text-[var(--muted-fg)] hover:bg-[var(--muted)] hover:text-[var(--fg)] transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-[var(--muted-fg)] mb-4">Choose where you&apos;re contacting us from.</p>

              <div className="space-y-2.5">
                {siteConfig.whatsappAgents.map(agent => (
                  <a key={agent.number}
                    href={`https://wa.me/${agent.number}?text=${encodeURIComponent(message)}`}
                    target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors group">
                    <span className="w-8 flex items-center justify-center shrink-0">
                      {agent.icon === "ng" ? <NigeriaFlag /> : <Globe className="w-6 h-6 text-emerald-600" aria-hidden />}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-bold text-emerald-900">{agent.region}</span>
                      <span className="block text-xs text-emerald-800/80 truncate">{agent.name} · {agent.display}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
