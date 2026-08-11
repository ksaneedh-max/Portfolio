"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ENGINEERING_PHILOSOPHY } from "@/data/portfolioData";
import { Search, Layout, Terminal, Brain, Zap, Rocket, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function EngineeringPhilosophy() {
  const [activeStage, setActiveStage] = useState<number>(1);

  const iconMap: Record<string, any> = {
    Search,
    Layout,
    Terminal,
    Brain,
    Zap,
    Rocket,
  };

  const currentStageInfo = ENGINEERING_PHILOSOPHY.find((s) => s.step === activeStage);

  return (
    <section id="philosophy" className="py-24 relative z-10 border-t border-[#27272A]/50 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Development Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Engineering & AI Lifecycle Philosophy
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            A structured 6-stage technical workflow from problem deconstruction to production monitoring.
          </p>
        </div>

        {/* 6 Stage Horizontal Lifecycle Pipeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {ENGINEERING_PHILOSOPHY.map((stage) => {
            const IconComp = iconMap[stage.icon] || Search;
            const isActive = activeStage === stage.step;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(stage.step)}
                className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                  isActive
                    ? "bg-blue-600/10 border-blue-500 text-white shadow-xl shadow-blue-600/10"
                    : "bg-[#111113] border-[#27272A] text-gray-400 hover:border-gray-600 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${isActive ? "text-blue-400" : "text-gray-500"}`}>
                    0{stage.step}
                  </span>
                  <IconComp className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-gray-400"}`} />
                </div>

                <div>
                  <h4 className="text-sm font-bold font-heading">{stage.stage}</h4>
                  <span className="text-[10px] text-gray-400 font-sans block truncate mt-0.5">
                    {stage.title}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 rounded-2xl border-2 border-blue-500 pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        {currentStageInfo && (
          <motion.div
            key={currentStageInfo.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-[#111113] border border-[#27272A] glass-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                    STAGE 0{currentStageInfo.step} • {currentStageInfo.stage.toUpperCase()}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    {currentStageInfo.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {currentStageInfo.description}
                </p>
              </div>

              {/* Key Deliverables */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-3">
                <h4 className="text-xs uppercase font-mono font-semibold text-blue-400">
                  Key Stage Outputs & Artifacts
                </h4>
                <div className="space-y-2">
                  {currentStageInfo.keyOutputs.map((output, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-200 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
