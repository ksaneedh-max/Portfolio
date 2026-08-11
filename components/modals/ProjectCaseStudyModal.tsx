"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Project } from "@/data/portfolioData";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const MODAL_ACCENTS: Record<string, {
  heroBg: string;
  dot: string;
  metricText: string;
  stepBg: string;
  glow: string;
}> = {
  "deepfake-detection": {
    heroBg: "from-blue-950/90 via-blue-900/20 to-[#0A0A0C]",
    dot: "bg-blue-500",
    metricText: "text-blue-400",
    stepBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    glow: "shadow-[0_0_120px_rgba(59,130,246,0.08)]",
  },
  "nlp-quantization": {
    heroBg: "from-purple-950/90 via-purple-900/20 to-[#0A0A0C]",
    dot: "bg-purple-500",
    metricText: "text-purple-400",
    stepBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    glow: "shadow-[0_0_120px_rgba(168,85,247,0.08)]",
  },
  "university-management-system": {
    heroBg: "from-emerald-950/90 via-emerald-900/20 to-[#0A0A0C]",
    dot: "bg-emerald-500",
    metricText: "text-emerald-400",
    stepBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glow: "shadow-[0_0_120px_rgba(16,185,129,0.08)]",
  },
};

const DEFAULT_ACCENT = MODAL_ACCENTS["deepfake-detection"];

export default function ProjectCaseStudyModal({ project, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const accent = project
    ? (MODAL_ACCENTS[project.id] ?? DEFAULT_ACCENT)
    : DEFAULT_ACCENT;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal wrapper — keeps modal centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6 pointer-events-none">
            <motion.div
              key={`modal-${project.id}`}
              initial={{ opacity: 0, scale: 0.93, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 28 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-5xl bg-[#0A0A0C] border border-[#27272A] rounded-3xl overflow-hidden pointer-events-auto flex flex-col ${accent.glow}`}
              style={{ height: "80vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Sticky Header ── */}
              <div className="flex-none flex items-center justify-between gap-4 px-6 sm:px-8 py-4 border-b border-[#1C1C1E] bg-[#0A0A0C]/95 backdrop-blur-xl z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex-none w-2.5 h-2.5 rounded-full ${accent.dot}`} />
                  <div className="min-w-0">
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">
                      Engineering Case Study
                    </p>
                    <h2 className="text-sm sm:text-base font-bold text-white leading-tight truncate max-w-[480px]">
                      {project.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex-none w-8 h-8 rounded-full bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ── Scrollable Body ── */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">

                {/* Hero Banner */}
                <div className={`relative h-40 sm:h-52 bg-gradient-to-br ${accent.heroBg} overflow-hidden`}>
                  {/* Decorative ambient orbs */}
                  <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full ${accent.dot} opacity-[0.06] blur-3xl pointer-events-none`} />
                  <div className={`absolute -bottom-12 -left-12 w-40 h-40 rounded-full ${accent.dot} opacity-[0.04] blur-2xl pointer-events-none`} />
                  {/* Fine grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-8 pb-6">
                    <span className="self-start text-[10px] font-mono px-2.5 py-0.5 rounded-full border bg-white/5 text-white/50 border-white/10 mb-2">
                      {project.badge ?? project.category[0]}
                    </span>
                    <p className="text-xs text-white/40 font-mono">{project.subtitle}</p>
                  </div>
                </div>

                {/* ── Content Sections ── */}
                <div className="px-6 sm:px-8 py-8 space-y-10">

                  {/* Project Overview */}
                  <ModalSection title="Project Overview">
                    <p className="text-sm text-gray-300 leading-relaxed">{project.summary}</p>
                    {project.datasetInfo && (
                      <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-[#111113] border border-[#1C1C1E] rounded-xl">
                        <div className={`flex-none mt-1 w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                        <p className="text-xs text-gray-400 leading-relaxed">{project.datasetInfo}</p>
                      </div>
                    )}
                  </ModalSection>

                  {/* Problem Statement & Research Gap */}
                  {project.engineeringSections && project.engineeringSections.length >= 1 && (
                    <ModalSection title="Problem Statement">
                      <div className="space-y-3">
                        {project.engineeringSections.slice(0, 2).map((sec) => (
                          <div key={sec.id} className="p-4 sm:p-5 bg-[#111113] border border-[#1C1C1E] rounded-2xl">
                            <h4 className="text-[10px] font-mono font-semibold text-white/60 uppercase tracking-wider mb-2.5">
                              {sec.title}
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">
                              {typeof sec.content === "string" ? sec.content : sec.content.join("\n")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ModalSection>
                  )}

                  {/* Architecture & Pipeline */}
                  {project.pipelineSteps && project.pipelineSteps.length > 0 && (
                    <ModalSection title="Architecture & Pipeline">
                      <div className="space-y-1">
                        {project.pipelineSteps.map((step) => (
                          <div
                            key={step.step}
                            className="flex items-start gap-4 py-3 px-3 rounded-xl hover:bg-[#111113] transition-colors group/step"
                          >
                            <div
                              className={`flex-none w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold font-mono ${accent.stepBg}`}
                            >
                              {step.step}
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                              <p className="text-sm font-semibold text-white group-hover/step:text-white transition-colors">
                                {step.title}
                              </p>
                              {step.desc && (
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.desc}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ModalSection>
                  )}

                  {/* Results & Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <ModalSection title="Results & Metrics">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {project.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="p-4 bg-[#111113] border border-[#1C1C1E] rounded-2xl text-center"
                          >
                            <div className={`text-xl font-black font-mono ${accent.metricText} leading-none`}>
                              {m.value}
                            </div>
                            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mt-1.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ModalSection>
                  )}

                  {/* Technical Deep-Dive */}
                  {project.engineeringSections && project.engineeringSections.length > 2 && (
                    <ModalSection title="Technical Deep-Dive">
                      <div className="space-y-2">
                        {project.engineeringSections.slice(2).map((sec) => (
                          <details
                            key={sec.id}
                            className="group border border-[#1C1C1E] rounded-2xl overflow-hidden"
                          >
                            <summary className="flex items-center justify-between gap-3 px-5 py-3.5 cursor-pointer bg-[#111113] hover:bg-[#141416] transition-colors list-none text-sm font-semibold text-white/90">
                              {sec.title}
                              <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-open:rotate-90 transition-transform duration-200 flex-none" />
                            </summary>
                            <div className="px-5 py-4 bg-[#0D0D0F] border-t border-[#1C1C1E]">
                              <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">
                                {typeof sec.content === "string" ? sec.content : sec.content.join("\n")}
                              </p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </ModalSection>
                  )}

                  {/* Resources & Links */}
                  <ModalSection title="Resources & Links">
                    <div className="flex flex-wrap gap-3">
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111113] hover:bg-[#18181B] border border-[#27272A] hover:border-white/20 rounded-xl text-sm text-gray-300 hover:text-white transition-all"
                        >
                          <GithubIcon className="w-4 h-4" />
                          GitHub Repository
                        </a>
                      )}
                      {project.paperUrl && project.paperUrl !== "#" && (
                        <a
                          href={project.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111113] hover:bg-[#18181B] border border-[#27272A] hover:border-white/20 rounded-xl text-sm text-gray-300 hover:text-white transition-all"
                        >
                          <FileText className="w-4 h-4" />
                          Research Paper
                        </a>
                      )}
                      {project.demoUrl && project.demoUrl !== "#" && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111113] hover:bg-[#18181B] border border-[#27272A] hover:border-white/20 rounded-xl text-sm text-gray-300 hover:text-white transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {(!project.githubUrl || project.githubUrl === "#") &&
                        (!project.paperUrl || project.paperUrl === "#") &&
                        (!project.demoUrl || project.demoUrl === "#") && (
                          <p className="text-xs text-gray-600 italic">No external links available for this project.</p>
                        )}
                    </div>
                  </ModalSection>

                  {/* Bottom padding */}
                  <div className="h-6" />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-0.5 h-5 bg-white/15 rounded-full" />
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
      {children}
    </section>
  );
}
