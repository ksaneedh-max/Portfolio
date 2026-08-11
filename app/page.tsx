"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MouseGlowGrid from "@/components/effects/MouseGlowGrid";
import InteractiveEngineeringField from "@/components/effects/InteractiveEngineeringField";
import PageLoader from "@/components/ui/PageLoader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#09090B] text-[#FAFAFA] selection:bg-blue-500/30 selection:text-white flex flex-col">
      {/* Initial Page Load / Reload Preloader */}
      <PageLoader onComplete={() => setIsPreloaderDone(true)} />

      {/* Background Interactive Engineering Field & Radial Glow Grid */}
      <MouseGlowGrid />
      <InteractiveEngineeringField />

      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        <Hero isPreloaderDone={isPreloaderDone} />
        <About />
        <FeaturedProjects />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}