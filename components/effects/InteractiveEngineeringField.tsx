"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Props {
  intensity?: number; // 0 to 1 scale factor
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export default function InteractiveEngineeringField({
  intensity = 1.0,
  className = "",
}: Props) {
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
    const mouse = { x: -1000, y: -1000, active: false };

    // Check touch device
    if (typeof window !== "undefined") {
      isTouch = window.matchMedia("(pointer: coarse)").matches;
    }

    // Dynamic node count based on area (max 35)
    let nodes: Node[] = [];
    const maxNodes = Math.min(35, Math.floor((intensity * 30) + 10));

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-initialize nodes within new bounds
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < maxNodes; i++) {
        nodes.push({
          x: Math.random() * (width || 800),
          y: Math.random() * (height || 600),
          vx: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.25,
          vy: shouldReduceMotion ? 0 : (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.2 + 1,
          baseAlpha: Math.random() * 0.2 + 0.15,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parentEl = canvas.parentElement;
    if (parentEl && !isTouch) {
      parentEl.addEventListener("mousemove", handleMouseMove);
      parentEl.addEventListener("mouseleave", handleMouseLeave);
    }

    // Visibility change handler (pause when tab hidden)
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    const maxConnDistance = 140;
    const mouseRadius = 160;

    const render = () => {
      if (!isTabVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const effIntensity = Math.max(0.05, Math.min(1.0, intensity));

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!shouldReduceMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;
        }

        // Distance to mouse
        let mouseFactor = 0;
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            mouseFactor = 1 - dist / mouseRadius;
          }
        }

        const currentAlpha = Math.min(
          0.85,
          (node.baseAlpha + mouseFactor * 0.45) * effIntensity
        );

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + mouseFactor * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${currentAlpha})`;
        ctx.fill();

        // Connect to neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDistance) {
            const lineAlpha =
              (1 - dist / maxConnDistance) * 0.18 * effIntensity +
              mouseFactor * 0.25 * effIntensity;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw subtle mouse ambient glow if active
      if (mouse.active && effIntensity > 0.2) {
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius
        );
        grad.addColorStop(0, `rgba(59, 130, 246, ${0.08 * effIntensity})`);
        grad.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (parentEl && !isTouch) {
        parentEl.removeEventListener("mousemove", handleMouseMove);
        parentEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [intensity, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 w-full h-full z-0 ${className}`}
    />
  );
}
