"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  createParticle,
  getParticleCount,
  updateParticle,
  drawParticles,
  SpatialGrid,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1, y: -1 });
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const gridRef = useRef<SpatialGrid | null>(null);

  const initParticles = useCallback((width: number, height: number) => {
    const count = getParticleCount(width);
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(width, height),
    );
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let connectionDist = 120;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      connectionDist = Math.min(canvas.width * 0.12, 120);
      gridRef.current = new SpatialGrid(canvas.width, canvas.height, connectionDist);
      initParticles(canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    // IntersectionObserver — pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 },
    );
    observer.observe(container);

    function handleMouse(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1, y: -1 };
    }

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let lastTime = 0;

    function animate(time: number) {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!visibleRef.current || !ctx || !canvas || !gridRef.current) return;

      // Frame budget: skip if last frame took too long (>16ms)
      const delta = time - lastTime;
      lastTime = time;
      if (delta > 32) return; // Skip if severely behind

      const particles = particlesRef.current;
      for (const p of particles) {
        updateParticle(p, canvas.width, canvas.height);
      }

      drawParticles(ctx, particles, mouseRef.current.x, mouseRef.current.y, connectionDist, gridRef.current);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [initParticles]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`pointer-events-none h-full w-full ${fullViewport ? "fixed inset-0" : ""}`}
      />
    </div>
  );
}
