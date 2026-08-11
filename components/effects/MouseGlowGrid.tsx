"use client";

import { useEffect, useState } from "react";

export default function MouseGlowGrid() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]" />

      {/* Mouse Radial Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 transition-opacity duration-300 pointer-events-none blur-[120px] bg-gradient-to-r from-blue-600 to-cyan-500"
        style={{
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
      />

      {/* Subtle top/bottom Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
    </div>
  );
}

