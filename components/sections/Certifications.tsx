"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS, Certification } from "@/data/portfolioData";
import { Award, ExternalLink, Sparkles } from "lucide-react";
import { SiSap } from "react-icons/si";
import CertificationModal from "@/components/modals/CertificationModal";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certificationIcons: Record<string, React.ReactNode> = {
    "aws-ai-practitioner": (
      <img
        src="/assets/certifications/aws.svg"
        alt="AWS"
        className="w-10 h-10 object-contain"
      />
    ),

    "azure-fundamentals": (
      <img
        src="/assets/certifications/azure.svg"
        alt="Microsoft Azure"
        className="w-10 h-10 object-contain"
      />
    ),

    "sap-generative-ai": (
      <img
        src="/assets/certifications/sap.svg"
        alt="SAP"
        className="w-10 h-10 object-contain"
      />
    ),

    "nptel-ml": (
      <img
        src="/assets/certifications/nptel.jpeg"
        alt="NPTEL"
        className="w-10 h-10 object-contain rounded-lg"
      />
    ),
  };

  // Define IDs for global certifications as per user grouping
  const globalIds = ["aws-ai-practitioner", "sap-generative-ai", "azure-fundamentals"];
  const globalCerts = CERTIFICATIONS.filter(c => globalIds.includes(c.id));
  const academicCerts = CERTIFICATIONS.filter(c => c.id === "nptel-ml");

  return (
    <section id="certifications" className="py-24 relative z-10 border-t border-[#27272A]/50 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Global Certifications & Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Certifications & Industry Credentials
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl">
            Industry-recognized certifications demonstrating expertise in Artificial Intelligence, Cloud Computing, Machine Learning, Enterprise AI, and Modern Software Development.
          </p>
        </div>

        {/* Global Certifications */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6">Global Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {globalCerts.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#18181B] border border-[#27272A] overflow-hidden">
                      {certificationIcons[cert.id] ?? (
                        <Award className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                    <span className="text-xs font-mono text-gray-400 bg-[#18181B] px-3 py-1 rounded-full border border-[#27272A]">
                      Issued {cert.year}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">{cert.name}</h3>
                    <p className="text-xs text-blue-400 font-medium mt-0.5">{cert.issuingOrganization}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skillsCovered.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181B] text-gray-300 border border-[#27272A]">
                        {skill}
                      </span>
                    ))}
                    {cert.skillsCovered.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181B] text-gray-400">+{cert.skillsCovered.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-[#27272A] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition"
                  >
                    View Details
                  </button>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-blue-600 hover:text-white border border-[#27272A] hover:border-blue-500 text-xs font-medium text-gray-300 transition-all"
                  >
                    Verify
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Academic Certifications */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Academic Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicCerts.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#18181B] border border-[#27272A] overflow-hidden">
                      {certificationIcons[cert.id] ?? (
                        <Award className="w-8 h-8 text-gray-500" />
                      )}
                    </div>
                    <span className="text-xs font-mono text-gray-400 bg-[#18181B] px-3 py-1 rounded-full border border-[#27272A]">
                      Issued {cert.year}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">{cert.name}</h3>
                    <p className="text-xs text-blue-400 font-medium mt-0.5">{cert.issuingOrganization}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skillsCovered.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181B] text-gray-300 border border-[#27272A]">
                        {skill}
                      </span>
                    ))}
                    {cert.skillsCovered.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18181B] text-gray-400">+{cert.skillsCovered.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-[#27272A] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition"
                  >
                    View Details
                  </button>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-blue-600 hover:text-white border border-[#27272A] hover:border-blue-500 text-xs font-medium text-gray-300 transition-all"
                  >
                    Verify
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      <CertificationModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
}
