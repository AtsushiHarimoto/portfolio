'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

type Petal = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  swayAmount: number;
  rotateEnd: number;
  variant: number; // 0-3: different petal color variants
  driftX: number;
};

// Brand-aligned sakura petal colors (from Moyin brand design)
const PETAL_COLORS = [
  // Primary sakura: white center → light pink edge
  { center: 'rgba(255, 255, 255, 0.9)', mid: 'rgba(255, 220, 230, 0.7)', edge: 'rgba(232, 160, 191, VAR)' },
  // Warm petal pink
  { center: 'rgba(255, 240, 245, 0.85)', mid: 'rgba(244, 180, 212, 0.6)', edge: 'rgba(212, 165, 196, VAR)' },
  // Deeper sakura
  { center: 'rgba(255, 230, 240, 0.8)', mid: 'rgba(240, 196, 216, 0.65)', edge: 'rgba(199, 125, 160, VAR)' },
  // Light ethereal
  { center: 'rgba(255, 245, 250, 0.75)', mid: 'rgba(255, 192, 211, 0.5)', edge: 'rgba(168, 139, 250, VAR)' },
];

function getPetalGradient(variant: number, opacity: number): string {
  const c = PETAL_COLORS[variant];
  const edge = c.edge.replace('VAR', String(opacity));
  return `radial-gradient(ellipse at 30% 30%, ${c.center}, ${c.mid} 45%, ${edge} 80%, transparent 100%)`;
}

export default function SakuraBackground() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const generatePetals = useCallback(() => {
    const count = 25;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 110 - 5, // allow slight overflow
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 10, // 10-20s fall time
      size: 6 + Math.random() * 14, // 6-20px
      opacity: 0.2 + Math.random() * 0.4,
      swayAmount: 30 + Math.random() * 80, // lateral sway px
      rotateEnd: 360 + Math.random() * 720,
      variant: Math.floor(Math.random() * 4),
      driftX: (Math.random() - 0.5) * 120, // wind drift
    }));
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPetals([]);
      return;
    }
    setPetals(generatePetals());
  }, [prefersReducedMotion, generatePetals]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Ambient glow orbs (brand: breathing glow) */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-moyin-pink/[0.04] rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/3 -right-40 w-[400px] h-[400px] bg-moyin-purple/[0.05] rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-moyin-accent/[0.03] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '4s' }} />

      {/* Sakura petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-20px',
            width: petal.size,
            height: petal.size * 1.3,
            background: getPetalGradient(petal.variant, petal.opacity),
            borderRadius: '50% 0% 50% 50%',
            filter: petal.size > 14 ? 'blur(0.5px)' : 'none',
          }}
          animate={{
            y: ['-5vh', '108vh'],
            x: [
              0,
              petal.swayAmount * 0.4,
              -petal.swayAmount * 0.3,
              petal.swayAmount * 0.6 + petal.driftX * 0.3,
              petal.driftX,
            ],
            rotate: [0, petal.rotateEnd],
            opacity: [0, petal.opacity, petal.opacity, petal.opacity * 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}
