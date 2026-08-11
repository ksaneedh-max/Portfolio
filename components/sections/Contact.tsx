"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, FileText, Send, CheckCircle2, Sparkles, Copy, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import ResumeModal from "@/components/modals/ResumeModal";
import confetti from "canvas-confetti";
import SectionReveal from "@/components/motion/SectionReveal";
import { MOTION_EASE } from "@/components/motion/motionVariants";

const WEB3FORMS_ACCESS_KEY = "48a9fc8d-2bdd-4d8c-bc68-2c0607a3d1c3";

export default function Contact() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      return;
    }

    setIsSubmitting(true);
    setFormSubmitted(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject:
            formState.subject.trim() ||
            `Portfolio Contact from ${formState.name}`,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          replyto: formState.email,
          from_name: "Siva's Portfolio",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
          });
        } catch {
          // Ignore confetti errors
        }

        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setFormSubmitted(false);
        }, 6000);
      } else {
        console.error("Web3Forms error:", result);

        alert(
          result.message ||
          "Unable to send the message. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);

      alert(
        "Something went wrong while sending the message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-[#27272A]/50 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <SectionReveal className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Contact & Recruiter Inquiry
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            Currently available for AI/ML Engineering & Software Development opportunities. Feel free to connect directly.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Direct Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: MOTION_EASE }}
            className="lg:col-span-5 space-y-6"
          >

            {/* Email Card */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card space-y-3 transition-colors duration-200 hover:border-blue-500/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Primary Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[11px] font-mono text-gray-400 hover:text-white bg-[#18181B] px-2.5 py-1 rounded-md border border-[#27272A] transition-colors"
                >
                  {copiedEmail ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedEmail ? "Copied!" : "Copy"}
                </button>
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-base font-bold font-heading text-white hover:text-blue-400 transition-colors block"
              >
                {PERSONAL_INFO.email}
              </a>
              <p className="text-xs text-gray-400">Responds typically within 24 hours.</p>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card space-y-3 transition-colors duration-200 hover:border-blue-500/30"
            >
              <span className="text-xs font-mono text-blue-400 font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Phone
              </span>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-base font-bold font-heading text-white hover:text-blue-400 transition-colors block"
              >
                {PERSONAL_INFO.phone}
              </a>
              <p className="text-xs text-gray-400">Available during standard IST hours.</p>
            </motion.div>

            {/* Social Links & Resume Download Card */}
            <div className="p-6 rounded-2xl bg-[#111113] border border-[#27272A] glass-card space-y-4">
              <span className="text-xs font-mono text-gray-400 font-semibold uppercase block">
                Professional Networks & CV
              </span>

              <div className="flex flex-col gap-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs text-gray-200 transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-blue-400" />
                    GitHub Profile
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs text-gray-200 transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    LinkedIn Network
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                </a>

                <motion.button
                  onClick={() => setResumeOpen(true)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold shadow-lg shadow-blue-600/20 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    View & Download Official CV
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Recruiter Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1, ease: MOTION_EASE }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111113] border border-[#27272A] glass-card">
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Have a question or role discussion? Fill out the form below to reach Kontham Siva Nagendra Prasad directly.
              </p>

              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-sans text-emerald-300 flex items-center gap-3 overflow-hidden"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold block">Message Transmitted Successfully!</span>
                      <span>Thank you for reaching out. Kontham Siva Nagendra Prasad will get back to you shortly.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Jane Doe (Technical Recruiter)"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141417] border border-[#27272A] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. recruiter@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141417] border border-[#27272A] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. AI / ML Engineering Role Opportunity"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141417] border border-[#27272A] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Share brief details about the role, project collaboration, or interview request..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141417] border border-[#27272A] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs font-semibold text-white shadow-xl shadow-blue-600/20 transition-all"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>

      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

