"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number; // depth 0=far, 1=near
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  opacity: number;
}

interface AuroraBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  phase: number;
  speed: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;
    canvas.width = width;
    canvas.height = height;

    // ----- Layers of particles with depth -----
    const LAYER_COUNT = 3;
    const layerDefs = [
      { count: 30, zMin: 0.0, zMax: 0.3, speed: 0.15, connect: 120 },
      { count: 45, zMin: 0.3, zMax: 0.65, speed: 0.35, connect: 150 },
      { count: 30, zMin: 0.65, zMax: 1.0, speed: 0.6, connect: 180 },
    ];

    const colorPalettes = [
      "rgba(0, 112, 243,",    // Electric Blue
      "rgba(34, 211, 238,",   // Cyan
      "rgba(161, 161, 170,",  // Zinc 400
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      layerDefs.forEach((layer, li) => {
        const adjustedCount = Math.min(layer.count, Math.floor(layer.count * (width * height) / (1920 * 1080)));
        for (let i = 0; i < adjustedCount; i++) {
          const z = layer.zMin + Math.random() * (layer.zMax - layer.zMin);
          const baseR = 0.5 + z * 2.5; // near = bigger
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z,
            vx: (Math.random() - 0.5) * layer.speed,
            vy: (Math.random() - 0.5) * layer.speed,
            radius: baseR,
            baseRadius: baseR,
            color: colorPalettes[li],
            opacity: 0.15 + z * 0.6,
          });
        }
      });
    };
    initParticles();

    // ----- Aurora blobs -----
    const blobs: AuroraBlob[] = [
      { x: width * 0.15, y: height * 0.2, vx: 0.12, vy: 0.08, size: width * 0.35, hue: 270, phase: 0, speed: 0.0006 },
      { x: width * 0.8, y: height * 0.7, vx: -0.09, vy: -0.11, size: width * 0.45, hue: 190, phase: Math.PI * 0.7, speed: 0.0008 },
      { x: width * 0.5, y: height * 0.5, vx: 0.07, vy: -0.07, size: width * 0.28, hue: 250, phase: Math.PI * 1.4, speed: 0.001 },
    ];

    // ----- Mouse -----
    let mouse = { x: -9999, y: -9999 };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t++;

      // ---- Draw aurora blobs ----
      blobs.forEach((b) => {
        b.phase += b.speed;
        const wobble = Math.sin(b.phase) * height * 0.08;
        const cx = b.x + Math.cos(b.phase * 0.7) * width * 0.04;
        const cy = b.y + wobble;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.size * 0.5);
        if (b.hue > 240) {
          // Deep Cobalt blob
          grad.addColorStop(0, `rgba(0, 112, 243, 0.08)`);
          grad.addColorStop(0.5, `rgba(0, 112, 243, 0.03)`);
        } else if (b.hue > 180) {
          // Cyan blob
          grad.addColorStop(0, `rgba(34, 211, 238, 0.06)`);
          grad.addColorStop(0.5, `rgba(34, 211, 238, 0.02)`);
        } else {
          // Muted Zinc blob
          grad.addColorStop(0, `rgba(255, 255, 255, 0.03)`);
          grad.addColorStop(0.5, `rgba(255, 255, 255, 0.01)`);
        }
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, b.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // ---- Draw & connect particles by layer (far→near for correct compositing) ----
      for (let li = 0; li < LAYER_COUNT; li++) {
        const layer = layerDefs[li];
        const layerParts = particles.filter(p => p.z >= layer.zMin && p.z < (li === LAYER_COUNT - 1 ? layer.zMax + 0.01 : layer.zMax));

        for (let i = 0; i < layerParts.length; i++) {
          const p = layerParts[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse parallax — near particles react more
          const dxM = mouse.x - p.x;
          const dyM = mouse.y - p.y;
          const distM = Math.sqrt(dxM * dxM + dyM * dyM);
          if (distM < 220) {
            const force = (1 - distM / 220) * p.z * 0.015;
            p.x += dxM * force;
            p.y += dyM * force;

            // Draw mouse connection line for near particles only
            if (p.z > 0.5) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              const alpha = (1 - distM / 220) * p.z * 0.25;
              ctx.strokeStyle = `rgba(0, 112, 243, ${alpha})`;
              ctx.lineWidth = p.z;
              ctx.stroke();
            }
          }

          // Connect to nearby same-layer particles
          for (let j = i + 1; j < layerParts.length; j++) {
            const q = layerParts[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < layer.connect) {
              const alpha = (1 - dist / layer.connect) * p.opacity * 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = `${p.color}${alpha})`;
              ctx.lineWidth = 0.4 + p.z * 0.6;
              ctx.stroke();
            }
          }

          // Draw particle dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();

          // Glow for near particles
          if (p.z > 0.65) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
            const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
            glowGrad.addColorStop(0, `${p.color}${p.opacity * 0.4})`);
            glowGrad.addColorStop(1, `${p.color}0)`);
            ctx.fillStyle = glowGrad;
            ctx.fill();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Static deep-background grid for visual depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(600px) rotateX(30deg) translateY(-10%)",
          transformOrigin: "50% 0%",
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.15) 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.15) 80%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      />
    </div>
  );
}
