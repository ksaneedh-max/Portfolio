"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles, Terminal, ShieldCheck, Award, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import ResumeModal from "@/components/modals/ResumeModal";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Institution Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>SRM IST • B.Tech CSE (AI & ML) '27</span>
          </motion.div>

          {/* Candidate Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1]"
          >
            Kontham Siva <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-blue-400">
              Nagendra Prasad
            </span>
          </motion.h1>

          {/* Dynamic Highlight Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs sm:text-sm text-gray-300"
          >
            <span className="px-3 py-1 rounded-lg bg-[#141417] border border-[#27272A] text-blue-400 font-semibold flex items-center gap-1.5">
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

          {/* Short Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            "{PERSONAL_INFO.shortIntro}"
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setResumeOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-sm font-semibold text-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-blue-400" />
              Download Resume
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-gray-300 hover:text-white transition-all"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-blue-400 hover:text-blue-300 transition-all"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#141417]/80 border border-[#27272A] text-center glass-card"
              >
                <span className="text-lg sm:text-xl font-bold font-heading text-white block">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 font-mono mt-0.5 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
