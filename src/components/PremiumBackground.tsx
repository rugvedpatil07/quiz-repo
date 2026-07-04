"use client";

import { useEffect, useRef } from "react";

export function PremiumBackground() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);

  // Background Orbs Effect
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
      { x: width * 0.2, y: height * 0.3, vx: 0.3, vy: 0.2, radius: width * 0.4, color: 'rgba(139, 92, 246, 0.25)' }, // Purple
      { x: width * 0.8, y: height * 0.7, vx: -0.2, vy: -0.3, radius: width * 0.35, color: 'rgba(56, 189, 248, 0.2)' }, // Blue
      { x: width * 0.5, y: height * 0.5, vx: 0.15, vy: -0.1, radius: width * 0.45, color: 'rgba(99, 102, 241, 0.15)' } // Indigo
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

  // Matrix Rain Effect (Transparent Background)
  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    // Give drops random starting positions to avoid uniform start
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    const draw = () => {
      // Fade out previous frame to transparent (not black)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw new letters normally
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(139, 92, 246, 0.4)'; // Subtle indigo rain
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        // Only draw if on screen
        if (drops[i] * fontSize > 0) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }
        
        // Reset randomly after off-screen
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newColumns = Math.floor(width / fontSize);
      if (newColumns > columns) {
        // Add new drops if screen gets wider
        const added = Array(newColumns - columns).fill(0).map(() => Math.floor(Math.random() * -100));
        drops = [...drops, ...added];
      }
      columns = newColumns;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#02040a' }}>
      <canvas ref={bgCanvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <canvas ref={rainCanvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
    </div>
  );
}
