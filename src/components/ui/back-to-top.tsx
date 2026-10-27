"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Floating back-to-top button that appears after 400px of scroll.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1,   y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-xl bg-gradient-to-br from-[#FA5A02] to-[#D94A00] text-white shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-110 hover:shadow-orange-500/50 transition-all duration-200"
          aria-label="Back to top"
        >
          <ArrowUp className="w-[1.125rem] h-[1.125rem]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
