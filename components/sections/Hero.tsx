"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import ResumeModal from "@/components/modals/ResumeModal";
import {
  buttonHoverVariants,
  MOTION_EASE,
  staggerChildVariants,
  staggerContainerVariants,
} from "@/components/motion/motionVariants";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* 1. Academic Badge */}
          <motion.div variants={staggerChildVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>SRM IST • B.Tech CSE (AI & ML) '27</span>
            </div>
          </motion.div>

          {/* 2. Main Name */}
          <motion.h1
            variants={staggerChildVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1]"
          >
            Kontham Siva <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-blue-400">
              Nagendra Prasad
            </span>
          </motion.h1>

          {/* 3. Role Badges */}
          <motion.div
            variants={staggerChildVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs sm:text-sm text-gray-300"
          >
            <span className="px-3 py-1 rounded-lg bg-[#141417] border border-[#27272A] text-blue-400 font-semibold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> AI Engineer
            </span>
            <span className="text-gray-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-[#141417] border border-[#27272A] text-gray-300">
              Machine Learning Enthusiast
            </span>
            <span className="text-gray-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-[#141417] border border-[#27272A] text-gray-300">
              Software Developer
            </span>
          </motion.div>

          {/* 4. Description */}
          <motion.p
            variants={staggerChildVariants}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            "{PERSONAL_INFO.shortIntro}"
          </motion.p>

          {/* 5. CTA Buttons */}
          <motion.div
            variants={staggerChildVariants}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <motion.a
              href="#projects"
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition-colors"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.button
              onClick={() => setResumeOpen(true)}
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-sm font-semibold text-gray-200 transition-colors"
            >
              <Download className="w-4 h-4 text-blue-400" />
              Download Resume
            </motion.button>

            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="p-3.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-gray-300 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </motion.a>

            <motion.a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="p-3.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-blue-400 hover:text-blue-300 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* 6. Quick Metrics Bar */}
          <motion.div
            variants={staggerChildVariants}
            className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
                className="p-4 rounded-xl bg-[#141417]/80 border border-[#27272A] text-center glass-card hover:border-blue-500/30 transition-colors"
              >
                <span className="text-lg sm:text-xl font-bold font-heading text-white block">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 font-mono mt-0.5 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

