"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target:   number;
  suffix?:  string;
  prefix?:  string;
  duration?: number;
  className?: string;
}

/**
 * Animated number counter that starts when the element enters the viewport.
 */
export function AnimatedCounter({
  target,
  suffix  = "",
  prefix  = "",
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref               = useRef<HTMLSpanElement>(null);
  const isInView          = useInView(ref, { once: true, margin: "-50px" });
  const frameRef          = useRef<number>(null);

  useEffect(() => {
    if (!isInView) return;

    const start     = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * (target - start) + start);

      setCount(value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${target}${suffix}`}>
      {prefix}{count}{suffix}
    </span>
  );
}
