"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, Download, ExternalLink, Printer, FileText } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resumePdfUrl = "/assets/resume/Siva_Resume.pdf";

  const handlePrint = () => {
    window.open(resumePdfUrl, "_blank");
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = resumePdfUrl;
    a.download = "Siva_Resume.pdf";
    a.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            key="resume-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div
            key="resume-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative pointer-events-auto w-full max-w-5xl h-[85vh] bg-[#111113] border border-[#27272A] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A] bg-[#141417]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-white">Curriculum Vitae</h3>
                  <p className="text-xs text-gray-400">Kontham Siva Nagendra Prasad • Recruiter Overview</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-xs font-medium text-gray-200 transition-colors"
                  title="Print Resume"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>

                <a
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-xs font-medium text-gray-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open PDF
                </a>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-[#27272A] text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Body Container */}
            <div className="flex-1 overflow-y-auto overscroll-contain bg-gradient-to-br from-[#09090B] via-[#0F0F12] to-[#09090B] p-10">
              <div className="flex justify-center items-start">
                <div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,.45)] border border-[#3F3F46] overflow-hidden">
                  <iframe
                    src={resumePdfUrl}
                    title="Resume Preview"
                    className="w-[900px] h-[1270px]"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#27272A] bg-[#141417] px-6 py-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                PDF Resume • Latest Version
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-sm text-white transition"
                >
                  Open PDF
                </a>

                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm text-white transition"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

