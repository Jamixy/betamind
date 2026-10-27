"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient progress bar fixed to the top of the viewport,
 * indicating scroll position throughout the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping:   30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999] pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #FA5A02, #14B8A6)",
      }}
    />
  );
}
