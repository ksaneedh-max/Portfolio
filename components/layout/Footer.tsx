"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import SectionReveal from "@/components/motion/SectionReveal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="py-12 border-t border-[#27272A] relative z-10 text-xs font-sans text-gray-400">
      <SectionReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Status */}
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-semibold text-gray-200">
            Designed & Developed by Kontham Siva Nagendra Prasad
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-[11px] text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PERSONAL_INFO.availability}</span>
          </div>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.05 }}
            className="p-2 rounded-lg bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-gray-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </motion.a>

          <motion.a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.05 }}
            className="p-2 rounded-lg bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-blue-400 hover:text-blue-300 transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </motion.a>

          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            whileHover={{ y: -2, scale: 1.05 }}
            className="p-2 rounded-lg bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-gray-400 hover:text-white transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Right: Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-gray-300 hover:text-white transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </motion.button>

      </SectionReveal>
    </footer>
  );
}

