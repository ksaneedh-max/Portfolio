"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { Code2, Brain, Boxes, Wrench, Search, CheckCircle2, Sparkles } from "lucide-react";
import SectionReveal from "@/components/motion/SectionReveal";
import { MOTION_EASE } from "@/components/motion/motionVariants";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; level: string; description: string } | null>(null);

  const iconMap: Record<string, any> = {
    Code2,
    Brain,
    Boxes,
    Wrench,
  };

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((skill) => {
      const matchesCategory = selectedCategory === "All" || selectedCategory === cat.title;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    return { ...cat, skills: matchingSkills };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-[#27272A]/50 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              Skills & Technical Expertise
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              Categorized proficiency across Machine Learning frameworks, core software languages, full-stack tools, and dev infrastructure.
            </p>
          </div>

          {/* Search Filter Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141417] border border-[#27272A] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </SectionReveal>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 border-b border-[#27272A] mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-[#141417] text-gray-400 hover:text-white border border-[#27272A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category, idx) => {
            const IconComponent = iconMap[category.icon] || Code2;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: MOTION_EASE }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card transition-all duration-200 hover:border-blue-500/30"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-[#27272A] pb-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">{category.title}</h3>
                    <span className="text-xs text-gray-500 font-mono">
                      {category.skills.length} Technologies
                    </span>
                  </div>
                </div>

                {/* Chips Grid */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <motion.button
                        key={skill.name}
                        onClick={() => setSelectedSkill(isSelected ? null : skill)}
                        whileHover={{ y: -1.5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25"
                            : "bg-[#18181B] text-gray-200 border-[#27272A] hover:border-blue-500/50 hover:bg-[#27272A]"
                        }`}
                      >
                        <span>{skill.name}</span>
                        <span className="text-[10px] opacity-60 font-sans">({skill.level})</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Skill Information Tooltip Banner */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="mt-8 p-4 rounded-xl bg-[#141417] border border-blue-500/30 flex items-center justify-between gap-4 text-xs font-sans shadow-lg shadow-blue-600/10"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="font-bold text-white font-mono">{selectedSkill.name}</span>
                  <span className="text-gray-400 ml-2 font-mono text-[11px]">— Level: {selectedSkill.level}</span>
                  <p className="text-gray-300 mt-0.5 text-xs">{selectedSkill.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-gray-500 hover:text-white text-xs font-mono underline"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

