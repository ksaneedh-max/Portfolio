"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUpVariants, MOTION_EASE } from "./motionVariants";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  once?: boolean;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 24,
  once = true,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay,
        ease: MOTION_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
