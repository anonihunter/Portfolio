"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

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

      const count = Math.min(
        100,
        Math.max(45, Math.floor(width / 13))
      );

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.2 + 0.35,
      }));
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      document.documentElement.style.setProperty(
        "--mouse-x",
        `${mouseX}px`
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        `${mouseY}px`
      );
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      /*
       * Detect current theme.
       *
       * next-themes adds either:
       * class="dark"
       * or
       * class="light"
       *
       * to <html>.
       */

      const isLightMode =
        document.documentElement.classList.contains("light");

      const particleColor = isLightMode
        ? "rgba(0, 0, 0, 0.30)"
        : "rgba(255, 255, 255, 0.45)";

      const lineColor = isLightMode
        ? "rgba(0, 0, 0,"
        : "rgba(255, 255, 255,";

      for (const particle of particles) {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;

          particle.vx +=
            (dx / Math.max(distance, 1)) *
            force *
            0.0007;

          particle.vy +=
            (dy / Math.max(distance, 1)) *
            force *
            0.0007;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;

        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        ctx.beginPath();

        ctx.fillStyle = particleColor;

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 105) {
            const opacity =
              0.08 * (1 - distance / 105);

            ctx.beginPath();

            ctx.strokeStyle = `${lineColor} ${opacity})`;

            ctx.lineWidth = 0.5;

            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="particleCanvas"
        aria-hidden="true"
      />

      <div
        className="ambientCursor"
        aria-hidden="true"
      />
    </>
  );
}