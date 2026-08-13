import React, { useRef, useEffect } from 'react';
import type { ParticleMode } from '../engines/world/WorldEngine';

interface ParticleFieldProps {
  mode: ParticleMode;
}

export default function ParticleField({ mode }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = [];

    const createParticle = (): Particle => {
      const configs: Record<ParticleMode, () => Particle> = {
        rain: () => ({
          x: Math.random() * canvas.width + 100,
          y: -20,
          vx: -0.8,
          vy: 8 + Math.random() * 6,
          size: 0.8 + Math.random() * 0.8,
          opacity: 0.15 + Math.random() * 0.35,
          life: 0,
          maxLife: canvas.height / 8,
          color: '100, 180, 255',
        }),
        stars: () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          vx: 0,
          vy: 0,
          size: 0.5 + Math.random() * 1.5,
          opacity: 0.2 + Math.random() * 0.6,
          life: Math.random() * 120,
          maxLife: 120 + Math.random() * 120,
          color: '200, 220, 255',
        }),
        energy: () => ({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -(1 + Math.random() * 3),
          size: 1 + Math.random() * 2,
          opacity: 0.4 + Math.random() * 0.4,
          life: 0,
          maxLife: 80 + Math.random() * 60,
          color: '0, 229, 255',
        }),
        embers: () => ({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(0.8 + Math.random() * 2),
          size: 1.5 + Math.random() * 2.5,
          opacity: 0.5 + Math.random() * 0.4,
          life: 0,
          maxLife: 100 + Math.random() * 80,
          color: mode === 'embers' ? '255, 140, 40' : '255, 107, 53',
        }),
        snow: () => ({
          x: Math.random() * canvas.width,
          y: -10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: 0.5 + Math.random() * 1.5,
          size: 1.5 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.5,
          life: 0,
          maxLife: canvas.height / 1.5,
          color: '200, 230, 255',
        }),
      };
      return configs[mode]();
    };

    // Seed initial particles
    const targetCount = mode === 'rain' ? 120 : mode === 'stars' ? 200 : 80;
    for (let i = 0; i < targetCount; i++) {
      const p = createParticle();
      if (mode === 'stars') {
        // Stars start anywhere
      } else {
        p.life = Math.random() * p.maxLife;
      }
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        let alpha = p.opacity;

        if (mode === 'stars') {
          // Twinkle
          alpha = p.opacity * (0.5 + 0.5 * Math.sin((p.life / p.maxLife) * Math.PI * 2));
          if (p.life > p.maxLife) {
            Object.assign(p, createParticle());
          }
        } else {
          // Fade in/out
          if (lifeRatio < 0.1) alpha = p.opacity * (lifeRatio / 0.1);
          if (lifeRatio > 0.8) alpha = p.opacity * ((1 - lifeRatio) / 0.2);
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);

        if (mode === 'rain') {
          // Rain streaks
          ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 3, p.y + p.vy * 3);
          ctx.stroke();
        } else {
          // Glowing dots
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          gradient.addColorStop(0, `rgba(${p.color}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Reset particle when out of bounds
        if (
          p.life >= p.maxLife ||
          p.y > canvas.height + 20 ||
          p.y < -20 ||
          p.x < -100 ||
          p.x > canvas.width + 100
        ) {
          Object.assign(particles[i], createParticle());
        }
      });

      // Maintain count
      while (particles.length < targetCount) {
        particles.push(createParticle());
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  );
}
