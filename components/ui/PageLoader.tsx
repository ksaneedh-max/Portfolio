"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is enabled, complete fast
    if (shouldReduceMotion) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 250);
      return () => clearTimeout(timer);
    }

    // Step 1: Smooth progress bar fill over ~650ms
    const start = performance.now();
    const duration = 650;

    const frame = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        // Step 2: Brief pause at 100% then trigger exit
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 150);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [shouldReduceMotion, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="initial-page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#09090B] selection:bg-blue-500/30 select-none pointer-events-auto"
        >
          {/* Subtle ambient light */}
          <div className="absolute w-[400px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

          {/* Centered System Init Identity Card */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Monogram Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-14 h-14 rounded-2xl bg-[#141417] border border-blue-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.15)] mb-5"
            >
              <span className="text-blue-400 font-mono font-bold text-base tracking-wider">
                KS
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
              className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight"
            >
              KONTHAM SIVA
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.18, ease: "easeOut" }}
              className="mt-1 text-[11px] sm:text-xs font-mono text-blue-400/90 tracking-[0.25em] uppercase"
            >
              AI / ML ENGINEER
            </motion.p>

            {/* Technical Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.22, ease: "easeOut" }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent my-4"
            />

            {/* Thin Technical Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="w-40 h-[2px] bg-[#1F1F23] rounded-full overflow-hidden relative"
            >
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* System Status Label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-3 text-[10px] font-mono text-gray-500 tracking-widest uppercase"
            >
              INITIALIZING SYSTEM {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
