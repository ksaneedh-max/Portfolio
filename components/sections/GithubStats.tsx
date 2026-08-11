"use client";

import { motion } from "framer-motion";
import { GITHUB_STATS, PERSONAL_INFO } from "@/data/portfolioData";
import { Star, GitFork, GitCommit, BookOpen, ExternalLink, Sparkles, Activity } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export default function GithubStats() {
  // Generate simulated GitHub activity heatmap grid (52 weeks x 7 days)
  const generateContributionDays = () => {
    const days = [];
    for (let i = 0; i < 180; i++) {
      const level = Math.floor(Math.random() * 5); // 0 to 4 intensity
      days.push(level);
    }
    return days;
  };

  const contributionGrid = generateContributionDays();

  const colorMap: Record<number, string> = {
    0: "bg-[#18181B]",
    1: "bg-blue-950/60 border border-blue-900/50",
    2: "bg-blue-800/70 border border-blue-700/60",
    3: "bg-blue-600 border border-blue-500",
    4: "bg-blue-400 border border-blue-300 shadow-sm shadow-blue-400/50"
  };

  return (
    <section id="github" className="py-24 relative z-10 border-t border-[#27272A]/50 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Source Activity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
              GitHub Statistics & Repositories
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              Consistent open-source commit streak, repository architecture, and code activity.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141417] hover:bg-[#27272A] border border-[#27272A] text-xs font-semibold text-white transition-all w-fit"
          >
            <GithubIcon className="w-4 h-4" />
            Follow @{GITHUB_STATS.username} on GitHub
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>
        </div>

        {/* GitHub Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] glass-card text-center">
            <GitCommit className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <span className="text-2xl font-bold font-heading text-white">{GITHUB_STATS.totalCommits}+</span>
            <span className="text-xs text-gray-400 font-mono block mt-0.5">Total Commits</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] glass-card text-center">
            <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <span className="text-2xl font-bold font-heading text-white">{GITHUB_STATS.repositories}</span>
            <span className="text-xs text-gray-400 font-mono block mt-0.5">Public Repositories</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] glass-card text-center">
            <Star className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <span className="text-2xl font-bold font-heading text-white">{GITHUB_STATS.totalStars}</span>
            <span className="text-xs text-gray-400 font-mono block mt-0.5">Stars Earned</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#111113] border border-[#27272A] glass-card text-center">
            <Activity className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <span className="text-2xl font-bold font-heading text-white">{GITHUB_STATS.contributionsThisYear}</span>
            <span className="text-xs text-gray-400 font-mono block mt-0.5">Contributions (2024)</span>
          </div>
        </div>

        {/* Contribution Graph Heatmap Widget */}
        <div className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card mb-12">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-4 mb-4">
            <span className="text-xs font-mono font-semibold text-gray-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Recent Commit Matrix (180 Days Streak)
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded bg-[#18181B]" />
              <span className="w-2.5 h-2.5 rounded bg-blue-950" />
              <span className="w-2.5 h-2.5 rounded bg-blue-800" />
              <span className="w-2.5 h-2.5 rounded bg-blue-600" />
              <span className="w-2.5 h-2.5 rounded bg-blue-400" />
              <span>More</span>
            </div>
          </div>

          {/* Grid Squares */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {contributionGrid.map((level, i) => (
              <div
                key={i}
                title={`Day ${i + 1}: ${level * 3} contributions`}
                className={`w-3.5 h-3.5 rounded-sm ${colorMap[level]} transition-transform hover:scale-125`}
              />
            ))}
          </div>
        </div>

        {/* Pinned Repositories Grid */}
        <div>
          <h3 className="text-xs uppercase font-mono font-semibold text-gray-400 mb-6">
            Pinned Repositories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GITHUB_STATS.pinnedRepos.map((repo, idx) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      {repo.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181B] text-blue-400 border border-blue-500/20">
                      {repo.language}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#27272A] text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-blue-400" />
                      {repo.forks}
                    </span>
                  </div>

                  <a
                    href={`${PERSONAL_INFO.github}/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Code <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
