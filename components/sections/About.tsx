"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, User, Target } from "lucide-react";
import SectionReveal from "@/components/motion/SectionReveal";

const CAPABILITY_TAGS = [
  "AI / ML",
  "COMPUTER VISION",
  "NLP",
  "SOFTWARE ENGINEERING",
];

const FOCUS_AREAS = [
  {
    title: "Artificial Intelligence",
    description: "Building intelligent applications and systems.",
  },
  {
    title: "Machine Learning & Deep Learning",
    description: "Model development, experimentation and evaluation.",
  },
  {
    title: "Computer Vision",
    description: "Image analysis, classification and explainability.",
  },
  {
    title: "NLP",
    description: "Transformer-based language applications and optimization.",
  },
  {
    title: "Software Engineering",
    description: "Building practical applications around AI systems.",
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 border-t border-[#27272A]/50 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Section Header ─── */}
        <SectionReveal className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT ME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-[1.15] max-w-3xl">
            Engineering-minded developer building intelligent systems.
          </h2>
        </SectionReveal>

        {/* ─── Two-Column Desktop Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT COLUMN: WHO I AM */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="h-full glass-card p-6 sm:p-8 rounded-2xl bg-[#0D0D0F] border border-[#27272A] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 tracking-wider uppercase mb-5">
                  <User className="w-4 h-4 text-blue-400" />
                  <span>WHO I AM</span>
                </div>

                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                  <p>
                    I'm Siva, a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy building intelligent systems and practical software solutions, turning technical problems into working and measurable applications.
                  </p>
                  <p>
                    My work spans machine learning, deep learning, computer vision, natural language processing, and full-stack development. I particularly enjoy the engineering side of AI — developing models, experimenting with solutions, optimizing them, and building the applications around them.
                  </p>
                </div>
              </div>

              {/* Capability Tags */}
              <div className="pt-6 border-t border-[#27272A]/80">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block mb-3">
                  Core Technical Capabilities
                </span>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-wrap gap-2.5"
                >
                  {CAPABILITY_TAGS.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ y: -1.5, scale: 1.02 }}
                      transition={{ duration: 0.15 }}
                      className="px-3 py-1.5 rounded-lg bg-[#141417] border border-[#27272A] text-xs font-mono font-semibold text-gray-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-[#18181C] hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: CURRENT FOCUS */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="h-full glass-card p-6 sm:p-8 rounded-2xl bg-[#0D0D0F] border border-[#27272A] flex flex-col">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-400 tracking-wider uppercase mb-5 pb-3 border-b border-[#27272A]/80">
                <div className="flex items-center gap-2 text-blue-400">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span>CURRENT FOCUS</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">05 DOMAINS</span>
              </div>

              <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                {FOCUS_AREAS.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + idx * 0.07,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -3,
                      borderColor: "rgba(59, 130, 246, 0.35)",
                      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.12)",
                      transition: { duration: 0.2 },
                    }}
                    className="group p-3 sm:p-3.5 rounded-xl bg-[#141417]/80 hover:bg-[#18181C] border border-[#27272A] transition-all duration-200 flex items-start gap-3.5 cursor-default"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                      0{idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold font-heading text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

