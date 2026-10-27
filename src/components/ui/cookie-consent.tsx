"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const COOKIE_KEY = "betamind_cookie_consent";

/**
 * GDPR-friendly cookie consent banner.
 * Stored in localStorage so it only appears once.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Delay slightly so it doesn't appear before page paint
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[200]"
        >
          <div className="glass rounded-2xl p-5 shadow-2xl shadow-black/20 border border-[var(--surface-border)]">
            {/* Close */}
            <button
              onClick={decline}
              className="absolute top-3 right-3 p-1 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Icon + Text */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FA5A02]/15 to-[#14B8A6]/15 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-[1.125rem] h-[1.125rem] text-[#FA5A02]" />
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-[var(--foreground)] mb-1">
                  We use cookies
                </p>
                <p className="text-[12.5px] text-[var(--muted-foreground)] leading-relaxed">
                  We use cookies to improve your experience and analyze site traffic.
                  Read our{" "}
                  <Link href="/cookies" className="text-[#FA5A02] hover:underline">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 btn-primary text-[12.5px] py-2 px-3"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="flex-1 btn-secondary text-[12.5px] py-2 px-3"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
