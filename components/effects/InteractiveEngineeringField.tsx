"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
}

interface ConnectionEdge {
  from: number;
  to: number;
  dist: number;
}

interface DataPacket {
  from: number;
  to: number;
  progress: number; // 0 to 1
  speed: number;
}

// Section intensity hierarchy mapping
const SECTION_INTENSITIES: Record<string, number> = {
  home: 1.0,          // Hero: 100%
  about: 0.35,        // About: 35%
  projects: 0.50,     // Projects: 50%
  skills: 0.25,       // Skills: 25%
  certifications: 0.20,// Certifications: 20%
  education: 0.25,    // Education: 25%
  contact: 0.15,      // Contact: 15%
  footer: 0.10,       // Footer: 10%
};

export default function InteractiveEngineeringField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isTouch = false;

    // Direct ref-based state (outside React renders)
    const targetMouse = { x: -1000, y: -1000, active: false };
    const renderedMouse = { x: -1000, y: -1000 };
    let targetIntensity = 1.0;
    let renderedIntensity = 1.0;

    if (typeof window !== "undefined") {
      isTouch = window.matchMedia("(pointer: coarse)").matches;
    }

    // Section Scroll Observer for smooth background intensity transitions
    const sectionIds = ["home", "about", "projects", "skills", "certifications", "education", "contact", "footer"];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((e) => e.isIntersecting);
        if (visibleEntry && visibleEntry.target.id in SECTION_INTENSITIES) {
          targetIntensity = SECTION_INTENSITIES[visibleEntry.target.id];
        }
      },
      { threshold: 0.2, rootMargin: "-10% 0px -30% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Node & Packet state
    const nodeCount = 38;
    let nodes: Node[] = [];
    let packets: DataPacket[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * (width || 1200),
          y: Math.random() * (height || 800),
          vx: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.35,
          vy: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.0 + 2.2, // 2.2px to 3.2px
          baseAlpha: Math.random() * 0.25 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize data flow packets
      packets = [];
      for (let p = 0; p < 5; p++) {
        const fromIndex = Math.floor(Math.random() * nodeCount);
        const toIndex = (fromIndex + 1 + Math.floor(Math.random() * (nodeCount - 1))) % nodeCount;
        packets.push({
          from: fromIndex,
          to: toIndex,
          progress: Math.random(),
          speed: Math.random() * 0.004 + 0.003,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      targetMouse.active = true;
    };

    const handleMouseLeave = () => {
      targetMouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // Tab visibility handling
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Main RAF Render Loop
    const maxConnDistance = 175;
    const mouseRadius = 260;
    const gridStep = 44; // Technical grid spacing in px

    const render = () => {
      if (!isTabVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth LERP calculations
      renderedIntensity += (targetIntensity - renderedIntensity) * 0.04;
      const intensity = Math.max(0.08, Math.min(1.0, renderedIntensity));

      if (targetMouse.active && !isTouch) {
        renderedMouse.x += (targetMouse.x - renderedMouse.x) * 0.12;
        renderedMouse.y += (targetMouse.y - renderedMouse.y) * 0.12;
      } else {
        renderedMouse.x += (-1000 - renderedMouse.x) * 0.08;
        renderedMouse.y += (-1000 - renderedMouse.y) * 0.08;
      }

      // ─── 1. Technical Grid Lines & Cursor Illumination ───
      const baseGridAlpha = 0.055 * intensity;
      ctx.lineWidth = 1;

      // Draw base horizontal & vertical grid lines
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = `rgba(63, 63, 70, ${baseGridAlpha})`;
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(63, 63, 70, ${baseGridAlpha})`;
        ctx.stroke();
      }

      // Draw mouse cursor illuminated grid lines
      if (targetMouse.active && !isTouch && intensity > 0.12) {
        const mouseX = renderedMouse.x;
        const mouseY = renderedMouse.y;
        const startX = Math.max(0, Math.floor((mouseX - mouseRadius) / gridStep) * gridStep);
        const endX = Math.min(width, Math.ceil((mouseX + mouseRadius) / gridStep) * gridStep);
        const startY = Math.max(0, Math.floor((mouseY - mouseRadius) / gridStep) * gridStep);
        const endY = Math.min(height, Math.ceil((mouseY + mouseRadius) / gridStep) * gridStep);

        for (let gx = startX; gx <= endX; gx += gridStep) {
          const distX = Math.abs(gx - mouseX);
          if (distX < mouseRadius) {
            const lineFactor = (1 - distX / mouseRadius) * 0.22 * intensity;
            ctx.beginPath();
            ctx.moveTo(gx, Math.max(0, mouseY - mouseRadius));
            ctx.lineTo(gx, Math.min(height, mouseY + mouseRadius));
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineFactor})`;
            ctx.stroke();
          }
        }
        for (let gy = startY; gy <= endY; gy += gridStep) {
          const distY = Math.abs(gy - mouseY);
          if (distY < mouseRadius) {
            const lineFactor = (1 - distY / mouseRadius) * 0.22 * intensity;
            ctx.beginPath();
            ctx.moveTo(Math.max(0, mouseX - mouseRadius), gy);
            ctx.lineTo(Math.min(width, mouseX + mouseRadius), gy);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineFactor})`;
            ctx.stroke();
          }
        }
      }

      // ─── 2. Multi-Layered Soft Mouse Light Glow ───
      if (targetMouse.active && !isTouch && intensity > 0.1) {
        const mx = renderedMouse.x;
        const my = renderedMouse.y;

        // Outer soft ambient glow
        const outerGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius);
        outerGrad.addColorStop(0, `rgba(59, 130, 246, ${0.14 * intensity})`);
        outerGrad.addColorStop(0.5, `rgba(37, 99, 235, ${0.06 * intensity})`);
        outerGrad.addColorStop(1, "rgba(9, 9, 11, 0)");
        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.arc(mx, my, mouseRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner concentrated blue core
        const coreGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 65);
        coreGrad.addColorStop(0, `rgba(96, 165, 250, ${0.28 * intensity})`);
        coreGrad.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 65, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── 3. Nodes & Network Connections ───
      const activeEdges: ConnectionEdge[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!shouldReduceMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;

          node.pulsePhase += 0.02;
        }

        // Distance to mouse for brightness boost
        let mouseFactor = 0;
        if (targetMouse.active && !isTouch) {
          const dx = renderedMouse.x - node.x;
          const dy = renderedMouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            mouseFactor = 1 - dist / mouseRadius;
          }
        }

        const pulse = Math.sin(node.pulsePhase) * 0.15;
        const currentAlpha = Math.min(
          0.9,
          (node.baseAlpha + pulse + mouseFactor * 0.45) * intensity
        );

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDistance) {
            activeEdges.push({ from: i, to: j, dist });

            const lineAlpha = Math.min(
              0.7,
              (1 - dist / maxConnDistance) * (0.22 * intensity + mouseFactor * 0.35 * intensity)
            );

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = mouseFactor > 0.3 ? 1.4 : 0.95;
            ctx.stroke();
          }
        }

        // Node soft aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2 + mouseFactor * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${currentAlpha * 0.3})`;
        ctx.fill();

        // Solid node core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + mouseFactor * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${currentAlpha})`;
        ctx.fill();
      }

      // ─── 4. Data Flow Packet Signal Animations ───
      if (!shouldReduceMotion && activeEdges.length > 0) {
        for (let p = 0; p < packets.length; p++) {
          const packet = packets[p];
          packet.progress += packet.speed;

          if (packet.progress >= 1.0) {
            // Re-assign to a new edge
            const randomEdge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
            packet.from = randomEdge.from;
            packet.to = randomEdge.to;
            packet.progress = 0;
          }

          const n1 = nodes[packet.from];
          const n2 = nodes[packet.to];
          if (n1 && n2) {
            const px = n1.x + (n2.x - n1.x) * packet.progress;
            const py = n1.y + (n2.y - n1.y) * packet.progress;
            const packetAlpha = 0.75 * intensity;

            // Packet glowing dot
            ctx.beginPath();
            ctx.arc(px, py, 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(147, 197, 253, ${packetAlpha})`;
            ctx.fill();

            // Tiny trailing glow
            const tailX = px - (n2.x - n1.x) * 0.04;
            const tailY = py - (n2.y - n1.y) * 0.04;
            ctx.beginPath();
            ctx.arc(tailX, tailY, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${packetAlpha * 0.5})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sectionObserver.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 w-full h-full z-0"
    />
  );
}
