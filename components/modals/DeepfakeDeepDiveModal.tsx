"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Layers, ShieldAlert, BarChart3, FlaskConical, Database, Wrench, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { PROJECTS } from "@/data/portfolioData";

interface DeepfakeDeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeepfakeDeepDiveModal({ isOpen, onClose }: DeepfakeDeepDiveModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'training' | 'results'>('overview');
  
  if (!isOpen) return null;

  const project = PROJECTS.find(p => p.id === "deepfake-detection");
  if (!project || !project.deepDive) return null;

  const { deepDive } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-[#111113] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#27272A] bg-[#141417]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-heading text-white">{project.title}</h2>
                  <span className="text-[10px] font-mono uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">
                    Flagship ML Research
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{project.subtitle}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#27272A] text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#27272A] border-b border-[#27272A]">
            {project.metrics.map((m, i) => (
              <div key={i} className="bg-[#141417] p-3 text-center">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">{m.label}</span>
                <span className="text-lg font-bold font-heading text-blue-400">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#27272A] bg-[#111113] overflow-x-auto">
            {[
              { id: 'overview', label: 'Problem & Research', icon: ShieldAlert },
              { id: 'architecture', label: 'Pipeline & Architecture', icon: Layers },
              { id: 'training', label: 'Dataset & Preprocessing', icon: Database },
              { id: 'results', label: 'Results & Future Work', icon: BarChart3 },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm text-gray-300">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Problem Statement */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    Problem Formulation
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.problem}</p>
                </div>

                {/* Research Focus */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" />
                    Research Hypothesis & Strategy
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.research}</p>
                </div>

                {/* Key Pipeline Overview */}
                <div>
                  <h4 className="text-xs uppercase font-mono font-semibold text-gray-400 mb-3">
                    Machine Learning Pipeline Steps
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {project.pipelineSteps?.map((step) => (
                      <div key={step.step} className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                        <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1">
                          0{step.step}. STAGE
                        </span>
                        <h5 className="text-xs font-semibold text-white font-heading">{step.title}</h5>
                        <p className="text-[11px] text-gray-400 mt-1">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Model Architecture */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-3">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Model Architecture Specifications
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.architecture}</p>
                </div>

                {/* Visual Pipeline Stack */}
                <div className="p-5 rounded-2xl bg-[#18181B] border border-[#27272A]">
                  <h4 className="text-xs uppercase font-mono font-semibold text-gray-400 mb-4">
                    Layer Configuration Diagram
                  </h4>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-[#27272A]/50 border border-blue-500/20 flex justify-between items-center text-blue-300">
                      <span>Input Tensor (224x224x3 RGB Video Frame)</span>
                      <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded">Preprocessed</span>
                    </div>
                    <div className="text-center text-gray-500 text-xs">↓</div>
                    <div className="p-3 rounded-lg bg-[#141417] border border-[#27272A] flex justify-between items-center">
                      <span>Conv2D Block 1 (32 Filters, 3x3 Kernel) + BatchNorm + LeakyReLU</span>
                      <span className="text-gray-400 text-[10px]">Feature Map: 224x224x32</span>
                    </div>
                    <div className="text-center text-gray-500 text-xs">↓</div>
                    <div className="p-3 rounded-lg bg-[#141417] border border-[#27272A] flex justify-between items-center">
                      <span>Conv2D Block 2 (64 Filters, 3x3 Kernel) + MaxPool2D (2x2)</span>
                      <span className="text-gray-400 text-[10px]">Feature Map: 112x112x64</span>
                    </div>
                    <div className="text-center text-gray-500 text-xs">↓</div>
                    <div className="p-3 rounded-lg bg-[#141417] border border-[#27272A] flex justify-between items-center">
                      <span>Conv2D Block 3 (128 Filters, 3x3 Kernel) + Dropout (0.3)</span>
                      <span className="text-gray-400 text-[10px]">Feature Map: 56x56x128</span>
                    </div>
                    <div className="text-center text-gray-500 text-xs">↓</div>
                    <div className="p-3 rounded-lg bg-[#141417] border border-[#27272A] flex justify-between items-center">
                      <span>Global Average Pooling + Dense Layer (128 units, Dropout 0.5)</span>
                      <span className="text-gray-400 text-[10px]">Vector: 128</span>
                    </div>
                    <div className="text-center text-gray-500 text-xs">↓</div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex justify-between items-center text-white">
                      <span>Sigmoid Output Neuron (Softmax Classification Score)</span>
                      <span className="text-blue-400 text-[10px]">P(Deepfake) ∈ [0, 1]</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'training' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Dataset */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Dataset Composition
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.dataset}</p>
                </div>

                {/* Preprocessing */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Data Preprocessing & Augmentation
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.preprocessing}</p>
                </div>

                {/* Training Regime */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Training Hyperparameters
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.training}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'results' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Empirical Results */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Empirical Results & Metrics
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.results}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Challenges & Lessons */}
                  <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                    <h4 className="text-xs uppercase font-mono font-semibold text-amber-400">
                      Technical Challenges
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{deepDive.challenges}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#141417] border border-[#27272A] space-y-2">
                    <h4 className="text-xs uppercase font-mono font-semibold text-emerald-400">
                      Lessons Learned
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{deepDive.lessonsLearned}</p>
                  </div>
                </div>

                {/* Future Work */}
                <div className="p-5 rounded-2xl bg-[#141417] border border-blue-500/20 space-y-2">
                  <h3 className="text-sm font-semibold uppercase font-mono text-blue-400 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Future Improvements & Next Roadmap
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{deepDive.futureImprovements}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#27272A] bg-[#141417] flex justify-between items-center">
            <span className="text-xs text-gray-400 font-mono">
              Designed & Developed by Kontham Siva Nagendra Prasad
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-xs font-medium text-gray-200 transition-colors"
            >
              Close Deep-Dive
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
