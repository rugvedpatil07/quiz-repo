"use client";

import { useEffect, useRef } from "react";

export function PremiumBackground() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);

  // Background Orbs Effect — warm champagne + indigo + gold
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const orbs = [
      { x: width * 0.2, y: height * 0.3, vx: 0.2, vy: 0.15, radius: width * 0.4, color: 'rgba(225, 224, 255, 0.2)' },   // Soft Indigo wash
      { x: width * 0.8, y: height * 0.7, vx: -0.15, vy: -0.2, radius: width * 0.35, color: 'rgba(212, 168, 67, 0.12)' }, // Gold shimmer
      { x: width * 0.5, y: height * 0.5, vx: 0.1, vy: -0.08, radius: width * 0.45, color: 'rgba(46, 49, 146, 0.06)' }    // Deep Indigo hint
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius * 0.5 || orb.x > width + orb.radius * 0.5) orb.vx *= -1;
        if (orb.y < -orb.radius * 0.5 || orb.y > height + orb.radius * 0.5) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(draw);
    };

    let animationId = requestAnimationFrame(draw);
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      orbs[0].radius = width * 0.4;
      orbs[1].radius = width * 0.35;
      orbs[2].radius = width * 0.45;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: 'transparent' }}>
      <canvas ref={bgCanvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'blur(80px)', pointerEvents: 'none' }} />
    </div>
  );
}
