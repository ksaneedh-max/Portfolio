"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { EDUCATION_DATA } from "@/data/portfolioData";
import { GraduationCap, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import SectionReveal from "@/components/motion/SectionReveal";
import { MOTION_EASE } from "@/components/motion/motionVariants";

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="py-24 relative z-10 border-t border-[#27272A]/50 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionReveal className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Education & Academic Timeline
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            Educational background in Artificial Intelligence, Machine Learning, and Computer Science fundamentals.
          </p>
        </SectionReveal>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12">
          
          {/* Static background line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#27272A]" />

          {/* Dynamic Scroll-Linked Progressive Line */}
          {!shouldReduceMotion ? (
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-3 w-[2px] bg-gradient-to-b from-blue-500 via-blue-400 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            />
          ) : (
            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-blue-500" />
          )}

          {EDUCATION_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: MOTION_EASE }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-8 h-8 rounded-full bg-[#141417] border border-[#27272A] flex items-center justify-center text-blue-400 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
                <GraduationCap className="w-4 h-4" />
              </div>

              {/* Content Card */}
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-6 sm:p-8 rounded-2xl bg-[#111113] border border-[#27272A] glass-card space-y-4 transition-colors duration-200 hover:border-blue-500/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#27272A] pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-white">{item.institution}</h3>
                    <p className="text-sm font-medium text-blue-400 mt-0.5">{item.degree}</p>
                  </div>

                  {/* Score Chip */}
                  <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center w-fit">
                    <span className="text-xs font-mono font-bold text-blue-300 block">{item.score}</span>
                    <span className="text-[9px] font-mono text-gray-400 block">{item.scoreLabel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                  <span>{item.period}</span>
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {item.location}
                    </span>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

