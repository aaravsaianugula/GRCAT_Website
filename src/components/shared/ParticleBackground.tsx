"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  createParticle,
  getParticleCount,
  updateParticle,
  drawParticles,
  type Particle,
} from "@/lib/animations/particles";

interface ParticleBackgroundProps {
  className?: string;
  fullViewport?: boolean;
}

export function ParticleBackground({
  className = "",
  fullViewport = false,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1, y: -1 });
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = getParticleCount(width);
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(width, height),
    );
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles(canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    function handleMouse(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1, y: -1 };
    }

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const connectionDist = Math.min(canvas.width * 0.15, 150);

    function animate() {
      if (!ctx || !canvas) return;
      const particles = particlesRef.current;

      for (const p of particles) {
        updateParticle(p, canvas.width, canvas.height);
      }

      drawParticles(
        ctx,
        particles,
        mouseRef.current.x,
        mouseRef.current.y,
        connectionDist,
      );

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`pointer-events-auto h-full w-full ${
          fullViewport ? "fixed inset-0" : ""
        }`}
      />
    </div>
  );
}
