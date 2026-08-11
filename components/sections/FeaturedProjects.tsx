"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PROJECTS, Project } from "@/data/portfolioData";
import ProjectCaseStudyModal from "@/components/modals/ProjectCaseStudyModal";
import SectionReveal from "@/components/motion/SectionReveal";
import { MOTION_EASE } from "@/components/motion/motionVariants";

// ─── Accent palette per project ───────────────────────────────────────────────
interface ProjectAccent {
  badge: string;        // badge pill classes
  pill: string;         // tech pill classes
  metric: string;       // metric value text colour
  glow: string;         // hover shadow glow
  hoverBorder: string;  // hover border colour
}

const PROJECT_ACCENTS: Record<string, ProjectAccent> = {
  "deepfake-detection": {
    badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    pill: "bg-blue-500/10 text-blue-300 border border-blue-500/15",
    metric: "text-blue-400",
    glow: "hover:shadow-[0_8px_60px_rgba(59,130,246,0.18)]",
    hoverBorder: "hover:border-blue-500/40",
  },
  "nlp-quantization": {
    badge: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    pill: "bg-purple-500/10 text-purple-300 border border-purple-500/15",
    metric: "text-purple-400",
    glow: "hover:shadow-[0_8px_60px_rgba(168,85,247,0.18)]",
    hoverBorder: "hover:border-purple-500/40",
  },
  "university-management-system": {
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    pill: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/15",
    metric: "text-emerald-400",
    glow: "hover:shadow-[0_8px_60px_rgba(16,185,129,0.18)]",
    hoverBorder: "hover:border-emerald-500/40",
  },
};
const DEFAULT_ACCENT = PROJECT_ACCENTS["deepfake-detection"];

// ─── Compact card-level data ───────────────────────────────────────────────────
interface CardData {
  displayTags: string[];
  shortDescription: string;
  cardMetrics: { label: string; value: string }[];
  badge: string;
}

const PROJECT_CARD_DATA: Record<string, CardData> = {
  "deepfake-detection": {
    displayTags: ["Python", "PyTorch", "CNN", "Grad-CAM"],
    shortDescription:
      "Multi-class classification of Real, Deepfake & AI-Generated images using CNNs with Grad-CAM explainability.",
    cardMetrics: [
      { label: "Accuracy", value: "93.61%" },
      { label: "Macro F1", value: "0.936" },
      { label: "Classes", value: "3" },
    ],
    badge: "Computer Vision",
  },
  "nlp-quantization": {
    displayTags: ["Python", "DistilBERT", "PyTorch", "Quantization"],
    shortDescription:
      "On-device emotion classification using mixed precision & dynamic INT8 quantization achieving 48% model compression.",
    cardMetrics: [
      { label: "Accuracy", value: "95.12%" },
      { label: "Size Cut", value: "48%" },
      { label: "Speedup", value: "2.1×" },
    ],
    badge: "NLP",
  },
  "university-management-system": {
    displayTags: ["Python", "MySQL", "HTML/CSS", "Full Stack"],
    shortDescription:
      "Modular university administration platform with Admin & Student portals backed by a normalized MySQL schema.",
    cardMetrics: [
      { label: "Architecture", value: "3-Tier" },
      { label: "Portals", value: "2" },
      { label: "Compliance", value: "ACID" },
    ],
    badge: "Full Stack",
  },
};

// ─── SVG Illustrations ─────────────────────────────────────────────────────────

// Attention weights for NLP illustration (deterministic, no Math.random)
const ATTENTION_WEIGHTS = [
  [0.92, 0.28, 0.10, 0.06, 0.04, 0.08],
  [0.28, 0.88, 0.24, 0.09, 0.05, 0.09],
  [0.10, 0.24, 0.91, 0.19, 0.09, 0.04],
  [0.06, 0.09, 0.19, 0.87, 0.29, 0.09],
  [0.04, 0.05, 0.09, 0.29, 0.84, 0.18],
  [0.08, 0.09, 0.04, 0.09, 0.18, 0.90],
];

function DeepfakeIllustration() {
  return (
    <svg viewBox="0 0 380 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="df-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D1117" />
          <stop offset="100%" stopColor="#050810" />
        </linearGradient>
        <linearGradient id="df-layer-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="heatmap-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="50%" stopColor="#2563EB" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
        </linearGradient>
        <filter id="df-blur">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="380" height="180" fill="url(#df-bg)" />

      {/* — Input face placeholder with subtle scan line animation — */}
      <rect x="18" y="28" width="72" height="72" rx="10" fill="#0D1B2A" stroke="#1D4ED8" strokeWidth="1" strokeOpacity="0.55" />
      <circle cx="54" cy="56" r="19" fill="none" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.45" />
      <line x1="36" y1="73" x2="72" y2="73" stroke="#1D4ED8" strokeWidth="0.8" strokeOpacity="0.35" />
      {/* Subtle scanning line */}
      <motion.line
        x1="20"
        x2="88"
        animate={{ y: [30, 98, 30] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        stroke="#3B82F6"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      <text x="54" y="114" textAnchor="middle" fill="#3B82F6" fontSize="8" fontFamily="monospace" opacity="0.65">INPUT</text>

      {/* — CNN conv layers — */}
      {[0, 1, 2, 3].map((i) => {
        const x = 120 + i * 44;
        const w = 26 - i * 3;
        const h = 96 - i * 10;
        const y = 42 + i * 5;
        const rows = 4 - i;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="4" fill="url(#df-layer-grad)" stroke="#2563EB" strokeWidth="0.7" strokeOpacity="0.55" />
            {Array.from({ length: rows }).map((_, j) => (
              <rect
                key={j}
                x={x + 2} y={y + 7 + j * ((h - 14) / rows)}
                width={w - 4} height={2} rx="1"
                fill="#3B82F6" opacity={0.28 - i * 0.04}
              />
            ))}
          </g>
        );
      })}

      {/* — Dashed connectors — */}
      <line x1="90" y1="64" x2="120" y2="64" stroke="#2563EB" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="3,2" />
      {[120, 164, 208].map((x, i) => (
        <line key={i} x1={x + 26 - i * 3} y1="90" x2={x + 44} y2="90" stroke="#2563EB" strokeWidth="0.7" strokeOpacity="0.35" strokeDasharray="3,2" />
      ))}
      <line x1="252" y1="64" x2="288" y2="64" stroke="#2563EB" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="3,2" />

      {/* — Grad-CAM heatmap with pulse — */}
      <rect x="288" y="28" width="72" height="72" rx="10" fill="url(#heatmap-grad)" opacity="0.82" />
      <motion.circle
        cx="324"
        cy="57"
        r="19"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="1.2"
        strokeOpacity="0.9"
        filter="url(#df-blur)"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="324" cy="57" r="11" fill="#3B82F6" opacity="0.28" />
      <circle cx="324" cy="57" r="5" fill="#60A5FA" opacity="0.55" />
      <text x="324" y="114" textAnchor="middle" fill="#60A5FA" fontSize="8" fontFamily="monospace" opacity="0.75">GRAD-CAM</text>

      {/* — Output class chips — */}
      {["REAL", "DEEPFAKE", "AI-GEN"].map((label, i) => (
        <g key={label} transform={`translate(${98 + i * 64}, 140)`}>
          <rect x="0" y="0" width="56" height="22" rx="5"
            fill="#0D1B2A"
            stroke="#1D4ED8"
            strokeWidth={i === 1 ? "1" : "0.5"}
            strokeOpacity={i === 1 ? "1" : "0.35"}
          />
          <text x="28" y="15" textAnchor="middle" fill={i === 1 ? "#60A5FA" : "#3D5A7A"} fontSize="7" fontFamily="monospace">
            {label}
          </text>
        </g>
      ))}

      {/* — Ambient dots — */}
      {[[345, 18], [28, 148], [195, 162], [158, 22]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#3B82F6" opacity="0.35" />
      ))}
    </svg>
  );
}

function NLPIllustration() {
  return (
    <svg viewBox="0 0 380 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="nlp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A0A12" />
          <stop offset="100%" stopColor="#08080F" />
        </linearGradient>
        <linearGradient id="nlp-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="380" height="180" fill="url(#nlp-bg)" />

      {/* — Attention matrix with subtle weight pulse — */}
      {ATTENTION_WEIGHTS.map((row, ri) =>
        row.map((weight, ci) => (
          <motion.rect
            key={`${ri}-${ci}`}
            x={18 + ci * 22} y={18 + ri * 22}
            width="18" height="18" rx="3"
            fill="#A855F7"
            animate={{ opacity: [weight * 0.35, weight * 0.7, weight * 0.35] }}
            transition={{
              duration: 3 + (ri + ci) * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))
      )}
      <text x="82" y="158" textAnchor="middle" fill="#A855F7" fontSize="8" fontFamily="monospace" opacity="0.55">ATTENTION</text>

      {/* — Token chips — */}
      {["[CLS]", "The", "image", "is", "fake", "[SEP]"].map((tok, i) => (
        <g key={tok} transform={`translate(${172 + i * 31}, 22)`}>
          <rect x="-13" y="0" width="27" height="16" rx="3" fill="#180028" stroke="#7C3AED" strokeWidth="0.6" />
          <text x="0" y="11" textAnchor="middle" fill="#C084FC" fontSize="6" fontFamily="monospace">{tok}</text>
        </g>
      ))}

      {/* — DistilBERT encoder block — */}
      <rect x="172" y="52" width="182" height="50" rx="10" fill="#100020" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.65" />
      <text x="263" y="72" textAnchor="middle" fill="#C084FC" fontSize="9.5" fontFamily="monospace" fontWeight="bold">DistilBERT</text>
      <text x="263" y="89" textAnchor="middle" fill="#7C3AED" fontSize="7" fontFamily="monospace">Transformer Encoder</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={185 + i * 31} y1="38" x2={185 + i * 31} y2="52" stroke="#7C3AED" strokeWidth="0.55" strokeOpacity="0.5" />
      ))}

      {/* — Compression viz — */}
      <rect x="178" y="118" width="50" height="36" rx="5" fill="#180028" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.65" />
      <text x="203" y="133" textAnchor="middle" fill="#C084FC" fontSize="8" fontFamily="monospace">FP32</text>
      <text x="203" y="148" textAnchor="middle" fill="#9333EA" fontSize="7" fontFamily="monospace">255 MB</text>

      <text x="248" y="138" textAnchor="middle" fill="#7C3AED" fontSize="11" fontFamily="monospace">→</text>

      <rect x="265" y="123" width="37" height="26" rx="5" fill="#180028" stroke="#A855F7" strokeWidth="1" />
      <text x="283" y="135" textAnchor="middle" fill="#E9D5FF" fontSize="8" fontFamily="monospace">INT8</text>
      <text x="283" y="146" textAnchor="middle" fill="#C084FC" fontSize="7" fontFamily="monospace">132 MB</text>

      {/* — Emotion bars — */}
      {[
        { label: "Joy", val: 0.82, x: 328 },
        { label: "Sad", val: 0.11, x: 349 },
        { label: "Anger", val: 0.07, x: 370 },
      ].map((e) => (
        <g key={e.label}>
          <rect x={e.x - 7} y={155 - e.val * 80} width="13" height={e.val * 80} rx="2" fill="url(#nlp-bar)" />
          <text x={e.x} y="170" textAnchor="middle" fill="#9333EA" fontSize="5.5" fontFamily="monospace">{e.label}</text>
        </g>
      ))}

      {/* — Ambient dots — */}
      {[[355, 18], [165, 142], [312, 53], [178, 170]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#A855F7" opacity="0.38" />
      ))}
    </svg>
  );
}

function UniversityIllustration() {
  return (
    <svg viewBox="0 0 380 180" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="uni-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#060F0A" />
          <stop offset="100%" stopColor="#04080A" />
        </linearGradient>
      </defs>
      <rect width="380" height="180" fill="url(#uni-bg)" />

      {/* — Admin Portal — */}
      <rect x="18" y="18" width="142" height="102" rx="10" fill="#061210" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.5" />
      <rect x="18" y="18" width="142" height="22" rx="10" fill="#0A2019" />
      <rect x="18" y="34" width="142" height="6" fill="#0A2019" />
      <text x="89" y="33" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="monospace">ADMIN PORTAL</text>
      {["Faculty Roster", "Courses", "Departments", "Audit Logs"].map((label, i) => (
        <g key={label} transform={`translate(28, ${50 + i * 16})`}>
          <rect x="0" y="0" width="112" height="12" rx="2" fill={i % 2 === 0 ? "#061810" : "#071410"} />
          <rect x="3" y="3" width="62" height="6" rx="1" fill="#10B981" opacity={0.2 - i * 0.03} />
          <rect x="72" y="3" width="30" height="6" rx="1" fill="#10B981" opacity="0.10" />
          <text x="5" y="10" fill="#34D399" fontSize="6" fontFamily="monospace" opacity="0.55">{label}</text>
        </g>
      ))}

      {/* — Student Portal — */}
      <rect x="220" y="18" width="142" height="102" rx="10" fill="#061210" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.5" />
      <rect x="220" y="18" width="142" height="22" rx="10" fill="#0A2019" />
      <rect x="220" y="34" width="142" height="6" fill="#0A2019" />
      <text x="291" y="33" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="monospace">STUDENT PORTAL</text>
      {["Course Enrollment", "Grade View", "Timetable", "Fee Status"].map((label, i) => (
        <g key={label} transform={`translate(230, ${50 + i * 16})`}>
          <rect x="0" y="0" width="112" height="12" rx="2" fill={i % 2 === 0 ? "#061810" : "#071410"} />
          <rect x="3" y="3" width="55" height="6" rx="1" fill="#10B981" opacity={0.2 - i * 0.03} />
          <rect x="65" y="3" width="35" height="6" rx="1" fill="#10B981" opacity="0.08" />
          <text x="5" y="10" fill="#34D399" fontSize="6" fontFamily="monospace" opacity="0.55">{label}</text>
        </g>
      ))}

      {/* — MySQL DB — */}
      <rect x="130" y="132" width="120" height="34" rx="8" fill="#061210" stroke="#10B981" strokeWidth="1" strokeOpacity="0.75" />
      <text x="190" y="147" textAnchor="middle" fill="#34D399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">MySQL</text>
      <text x="190" y="159" textAnchor="middle" fill="#10B981" fontSize="7" fontFamily="monospace" opacity="0.55">Relational Database</text>

      {/* — Connecting lines with animated stroke dash — */}
      <motion.line
        x1="89" y1="120" x2="155" y2="132"
        stroke="#10B981" strokeWidth="0.9" strokeOpacity="0.5" strokeDasharray="4,3"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.line
        x1="291" y1="120" x2="225" y2="132"
        stroke="#10B981" strokeWidth="0.9" strokeOpacity="0.5" strokeDasharray="4,3"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* — Python backend badge — */}
      <rect x="153" y="82" width="74" height="22" rx="6" fill="#061810" stroke="#10B981" strokeWidth="0.6" strokeOpacity="0.45" />
      <text x="190" y="96" textAnchor="middle" fill="#6EE7B7" fontSize="7" fontFamily="monospace">Python Backend</text>
      <line x1="160" y1="93" x2="153" y2="93" stroke="#10B981" strokeWidth="0.55" strokeOpacity="0.4" />
      <line x1="227" y1="93" x2="220" y2="93" stroke="#10B981" strokeWidth="0.55" strokeOpacity="0.4" />

      {/* — Ambient dots — */}
      {[[14, 142], [366, 32], [190, 13], [370, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#10B981" opacity="0.35" />
      ))}
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, React.ComponentType> = {
  "deepfake-detection": DeepfakeIllustration,
  "nlp-quantization": NLPIllustration,
  "university-management-system": UniversityIllustration,
};

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        className="py-24 relative z-10 border-t border-[#27272A]/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engineering Portfolio</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
                Featured Engineering Projects
              </h2>

              <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
                A collection of research-driven AI systems and production-ready software
                projects demonstrating expertise in Computer Vision, Natural Language
                Processing, Explainable AI, and Full-Stack Development.
              </p>
            </div>
          </SectionReveal>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewCaseStudy={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* Mobile Scroll */}
          <div className="md:hidden">
            <div
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              } as React.CSSProperties}
            >
              {PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  className="snap-center flex-none w-[88vw]"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onViewCaseStudy={() => setSelectedProject(project)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-3">
              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  className="w-1.5 h-1.5 rounded-full bg-[#27272A]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal OUTSIDE the section with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectCaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Project Card ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
  onViewCaseStudy: () => void;
}

function ProjectCard({ project, index, onViewCaseStudy }: ProjectCardProps) {
  const accent = PROJECT_ACCENTS[project.id] ?? DEFAULT_ACCENT;
  const cardData = PROJECT_CARD_DATA[project.id] ?? {
    displayTags: [],
    shortDescription: project.summary,
    cardMetrics: [],
    badge: project.category[0] ?? "Project",
  };
  const Illustration = ILLUSTRATIONS[project.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: MOTION_EASE }}
      whileHover={{
        y: -4,
        scale: 1.015,
        transition: { duration: 0.25, ease: MOTION_EASE },
      }}
      className={[
        "group relative flex flex-col rounded-[24px] bg-[#0D0D0F] border border-[#27272A] overflow-hidden",
        "transition-colors duration-300 ease-out",
        "hover:shadow-2xl",
        accent.glow,
        accent.hoverBorder,
      ].join(" ")}
      style={{ height: "500px" }}
    >
      {/* ── Hero Illustration ── */}
      <div className="relative flex-none h-[180px] overflow-hidden bg-[#09090B]">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {Illustration ? <Illustration /> : null}
        </div>
        {/* Bottom gradient fade into card body */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#0D0D0F] to-transparent pointer-events-none" />
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-3">

        {/* Badge */}
        <span className={`self-start text-[10px] font-mono px-2.5 py-1 rounded-full ${accent.badge}`}>
          {cardData.badge}
        </span>

        {/* Title */}
        <h3 className="text-[15px] font-bold font-heading text-white leading-snug line-clamp-2 tracking-tight">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-3">
          {cardData.shortDescription}
        </p>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1.5">
          {cardData.displayTags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ y: -1, scale: 1.03 }}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${accent.pill}`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Metrics Strip */}
        {cardData.cardMetrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[#1C1C1E]">
            {cardData.cardMetrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className={`text-sm font-black font-mono leading-none ${accent.metric}`}>
                  {m.value}
                </div>
                <div className="text-[9px] font-mono text-gray-600 mt-1 leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <motion.button
            id={`view-case-study-${project.id}`}
            onClick={onViewCaseStudy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all duration-200"
          >
            View Case Study
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          {project.githubUrl && project.githubUrl !== "#" ? (
            <motion.a
              href={project.githubUrl}
              id={`github-link-${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-transparent hover:bg-white/[0.04] border border-[#27272A] hover:border-white/20 text-xs font-semibold text-gray-400 hover:text-white transition-all duration-200"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </motion.a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#1C1C1E] text-xs font-semibold text-gray-700 cursor-not-allowed"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              Private
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

