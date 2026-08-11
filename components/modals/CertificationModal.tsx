"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  Download,
  ZoomIn,
  ZoomOut,
  Award,
  FileText,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Certification } from "@/data/portfolioData";
import { createPortal } from "react-dom";

interface CertificationModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export default function CertificationModal({
  cert,
  onClose,
}: CertificationModalProps) {
  const [zoom, setZoom] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (cert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cert]);

  if (!mounted) return null;

  const certPdfUrl = cert ? `/assets/certifications/${cert.id}.pdf` : "";

  // Automatically supports png / jpeg / jpg
  const certImageUrl = cert
    ? cert.id === "nptel-ml"
      ? "/assets/certifications/nptel.jpeg"
      : `/assets/certifications/${cert.id}.png`
    : "";

  const certificationIcons: Record<string, React.ReactNode> = cert
    ? {
        "aws-ai-practitioner": (
          <img
            src="/assets/certifications/aws.svg"
            className="w-10 h-10 object-contain"
            alt=""
          />
        ),

        "azure-fundamentals": (
          <img
            src="/assets/certifications/azure.svg"
            className="w-10 h-10 object-contain"
            alt=""
          />
        ),

        "sap-generative-ai": (
          <img
            src="/assets/certifications/sap.svg"
            className="w-10 h-10 object-contain"
            alt=""
          />
        ),

        "nptel-ml": (
          <img
            src="/assets/certifications/nptel.jpeg"
            className="w-10 h-10 rounded-lg object-cover"
            alt=""
          />
        ),
      }
    : {};

  return createPortal(
    <AnimatePresence>
      {cert && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 pb-8 px-4 sm:px-6 overflow-y-auto pointer-events-none">
          {/* Backdrop */}
          <motion.div
            key="cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl pointer-events-auto"
          />

          {/* Modal */}
          <motion.div
            key={`cert-modal-${cert.id}`}
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative pointer-events-auto w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden border border-[#27272A] bg-[#0B0B0D] shadow-[0_25px_80px_rgba(0,0,0,.55)] flex flex-col"
          >
            {/* ====================================== */}
            {/* HEADER */}
            {/* ====================================== */}
            <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0B0B0D]/95 border-b border-[#1F1F22]">
              <div className="px-6 py-5 flex items-start justify-between gap-8">
                {/* LEFT */}
                <div className="flex gap-5">
                  {/* Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-[#17171A] border border-[#2A2A2E] flex items-center justify-center flex-shrink-0">
                    {certificationIcons[cert.id] ?? (
                      <Award className="w-8 h-8 text-blue-400" />
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400">
                      <ShieldCheck className="w-3 h-3" />
                      Official Certificate
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-white leading-tight">
                      {cert.name}
                    </h2>

                    <p className="mt-1 text-gray-400">
                      {cert.issuingOrganization}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      <div className="px-3 py-1.5 rounded-full bg-[#161618] border border-[#2A2A2E] text-xs text-gray-300 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        {cert.year}
                      </div>

                      {cert.credentialId && (
                        <div className="px-3 py-1.5 rounded-full bg-[#161618] border border-[#2A2A2E] text-xs text-gray-300">
                          {cert.credentialId}
                        </div>
                      )}

                      <div className="px-3 py-1.5 rounded-full bg-[#161618] border border-[#2A2A2E] text-xs text-blue-300">
                        {cert.issuingOrganization}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-11 h-11 rounded-full bg-[#17171A] hover:bg-[#232327] border border-[#2A2A2E] flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </div>

              {/* ====================================== */}
              {/* TOOLBAR */}
              {/* ====================================== */}
              <div className="sticky top-[138px] z-10 border-b border-[#1F1F22] bg-[#0B0B0D]/95 backdrop-blur-xl">
                <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-4">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
                      className="w-10 h-10 rounded-xl bg-[#17171A] hover:bg-[#232327] border border-[#2A2A2E] flex items-center justify-center transition"
                    >
                      <ZoomOut className="w-4 h-4 text-gray-300" />
                    </button>

                    <div className="min-w-[72px] text-center px-3 py-2 rounded-xl bg-[#17171A] border border-[#2A2A2E]">
                      <span className="text-sm font-semibold text-white">
                        {Math.round(zoom * 100)}%
                      </span>
                    </div>

                    <button
                      onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
                      className="w-10 h-10 rounded-xl bg-[#17171A] hover:bg-[#232327] border border-[#2A2A2E] flex items-center justify-center transition"
                    >
                      <ZoomIn className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>

                  {/* Right Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={certPdfUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17171A] hover:bg-[#232327] border border-[#2A2A2E] text-sm text-gray-300 hover:text-white transition"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>

                    <a
                      href={certPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#17171A] hover:bg-[#232327] border border-[#2A2A2E] text-sm text-gray-300 hover:text-white transition"
                    >
                      <FileText className="w-4 h-4" />
                      Open PDF
                    </a>

                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-lg shadow-blue-500/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Credential
                    </a>
                  </div>
                </div>
              </div>

              {/* ====================================== */}
              {/* CERTIFICATE VIEWER */}
              {/* ====================================== */}
              <div className="flex-1 overflow-y-auto overscroll-contain bg-[#09090B] relative">
                {/* Background Glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/2 top-12 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-blue-500/5 blur-[180px]" />
                </div>

                {/* Grid */}
                <div
                  className="absolute inset-0 opacity-[0.025] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                <div className="relative min-h-full flex items-start justify-center px-10 py-14">
                  <motion.div
                    animate={{
                      scale: zoom,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    style={{
                      transformOrigin: "top center",
                    }}
                    className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-[0_40px_100px_rgba(0,0,0,.65)]
          border border-[#2A2A2E]
          max-w-5xl
          w-fit
        "
                  >
                    <img
                      src={certImageUrl}
                      alt={cert.name}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      className="block max-w-full h-auto select-none"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}