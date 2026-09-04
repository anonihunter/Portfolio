"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  darkColor: string;
  lightColor: string;
}

const COLOR_PALETTE = [
  { dark: '#38bdf8', light: '#0284c7' }, // Cyan
  { dark: '#a855f7', light: '#7c3aed' }, // Purple
  { dark: '#34d399', light: '#059669' }, // Emerald
  { dark: '#fbbf24', light: '#d97706' }, // Amber
  { dark: '#f43f5e', light: '#e11d48' }, // Rose
  { dark: '#818cf8', light: '#4f46e5' }, // Indigo
  { dark: '#fb923c', light: '#ea580c' }, // Orange
  { dark: '#f472b6', light: '#db2777' }, // Pink
  { dark: '#2dd4bf', light: '#0d9488' }, // Teal
  { dark: '#e879f9', light: '#c026d3' }, // Magenta
];

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.max(50, Math.floor(width / 14)));
      particles = Array.from({ length: count }, (_, i) => {
        const colorSet = COLOR_PALETTE[i % COLOR_PALETTE.length];
        const baseRadius = Math.random() * 1.8 + 1.2;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.10 + Math.random() * 0.18;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: baseRadius,
          baseRadius,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          darkColor: colorSet.dark,
          lightColor: colorSet.light,
        };
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = event.touches[0].clientX;
        mouseY = event.touches[0].clientY;
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isLightMode = document.documentElement.classList.contains('light');

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 140) {
          const force = (140 - distance) / 140;
          particle.vx += (dx / Math.max(distance, 1)) * force * 0.0006;
          particle.vy += (dy / Math.max(distance, 1)) * force * 0.0006;
        }

        const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (currentSpeed > 0.15) {
          particle.vx = (particle.vx / currentSpeed) * 0.15;
          particle.vy = (particle.vy / currentSpeed) * 0.15;
        } else if (currentSpeed < 0.10 && currentSpeed > 0.0001) {
          particle.vx = (particle.vx / currentSpeed) * 0.10;
          particle.vy = (particle.vy / currentSpeed) * 0.10;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -15) particle.x = width + 15;
        if (particle.x > width + 15) particle.x = -15;
        if (particle.y < -15) particle.y = height + 15;
        if (particle.y > height + 15) particle.y = -15;

        particle.pulsePhase += particle.pulseSpeed;
        const pulse = Math.sin(particle.pulsePhase);
        const currentRadius = particle.baseRadius + pulse * 0.4;
        const currentColor = isLightMode ? particle.lightColor : particle.darkColor;

        ctx.save();
        ctx.shadowBlur = isLightMode ? 4 : 8;
        ctx.shadowColor = currentColor;
        ctx.fillStyle = currentColor;
        ctx.globalAlpha = isLightMode ? 0.75 + pulse * 0.15 : 0.85 + pulse * 0.15;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 105) {
            const progress = 1 - distance / 105;
            const opacity = (isLightMode ? 0.18 : 0.22) * progress;

            const colorA = isLightMode ? a.lightColor : a.darkColor;
            const colorB = isLightMode ? b.lightColor : b.darkColor;

            ctx.save();
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, colorA);
            grad.addColorStop(1, colorB);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="particleCanvas fixed inset-0 w-full h-full pointer-events-none -z-10 block"
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1 }}
        aria-hidden="true"
      />
      <div
        className="ambientCursor fixed inset-0 pointer-events-none -z-10"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: -1,
          background: 'radial-gradient(460px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.045), transparent 65%)',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default AmbientBackground;