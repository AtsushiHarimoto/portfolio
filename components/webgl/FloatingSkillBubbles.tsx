'use client';

import { useEffect, useRef, useMemo } from 'react';

interface SkillBubble {
  label: string;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'devops' | 'design';
  size: 'sm' | 'md' | 'lg';
}

const SKILLS: SkillBubble[] = [
  // Frontend
  { label: 'Vue 3', category: 'frontend', size: 'lg' },
  { label: 'React', category: 'frontend', size: 'lg' },
  { label: 'TypeScript', category: 'frontend', size: 'lg' },
  { label: 'Tailwind CSS', category: 'frontend', size: 'md' },
  { label: 'Vite', category: 'frontend', size: 'sm' },
  { label: 'JavaScript', category: 'frontend', size: 'md' },
  // Backend
  { label: 'Python', category: 'backend', size: 'lg' },
  { label: 'FastAPI', category: 'backend', size: 'md' },
  { label: 'Node.js', category: 'backend', size: 'md' },
  { label: 'Spring Boot', category: 'backend', size: 'sm' },
  // Mobile
  { label: 'Swift', category: 'mobile', size: 'md' },
  { label: 'Kotlin', category: 'mobile', size: 'sm' },
  { label: 'Uniapp', category: 'mobile', size: 'sm' },
  // AI / LLM
  { label: 'LangChain', category: 'ai', size: 'md' },
  { label: 'OpenAI API', category: 'ai', size: 'md' },
  { label: 'Prompt Eng.', category: 'ai', size: 'sm' },
  { label: 'AI Agent', category: 'ai', size: 'lg' },
  { label: 'MCP', category: 'ai', size: 'sm' },
  { label: 'RAG', category: 'ai', size: 'sm' },
  // DevOps
  { label: 'Docker', category: 'devops', size: 'md' },
  { label: 'GitHub Actions', category: 'devops', size: 'sm' },
  { label: 'CI/CD', category: 'devops', size: 'md' },
  { label: 'Git', category: 'devops', size: 'sm' },
  { label: 'Linux', category: 'devops', size: 'sm' },
  // Design
  { label: 'UI/UX Design', category: 'design', size: 'md' },
  { label: 'System Design', category: 'design', size: 'md' },
];

const CATEGORY_COLORS: Record<string, { border: string; text: string; glow: string }> = {
  frontend: { border: 'rgba(255,192,211,0.2)', text: 'rgba(255,192,211,0.5)', glow: 'rgba(255,192,211,0.15)' },
  backend:  { border: 'rgba(167,139,250,0.2)', text: 'rgba(167,139,250,0.5)', glow: 'rgba(167,139,250,0.15)' },
  mobile:   { border: 'rgba(139,200,250,0.2)', text: 'rgba(139,200,250,0.5)', glow: 'rgba(139,200,250,0.15)' },
  ai:       { border: 'rgba(232,180,212,0.2)', text: 'rgba(232,180,212,0.5)', glow: 'rgba(232,180,212,0.15)' },
  devops:   { border: 'rgba(150,210,180,0.2)', text: 'rgba(150,210,180,0.5)', glow: 'rgba(150,210,180,0.15)' },
  design:   { border: 'rgba(250,200,150,0.2)', text: 'rgba(250,200,150,0.5)', glow: 'rgba(250,200,150,0.15)' },
};

const SIZE_CONFIG = {
  sm: { fontSize: 10, opacity: 1, blur: 0, scale: 0.8 },
  md: { fontSize: 12, opacity: 1, blur: 0, scale: 1.0 },
  lg: { fontSize: 14, opacity: 1, blur: 0, scale: 1.1 },
};

// Deterministic pseudo-random from seed
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface BubbleData {
  skill: SkillBubble;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  driftSpeed: number;
  phase: number;
}

export default function FloatingSkillBubbles() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const bubbles = useMemo<BubbleData[]>(() => {
    return SKILLS.map((skill, i) => {
      const r1 = seededRandom(i);
      const r2 = seededRandom(i + 100);
      const r3 = seededRandom(i + 200);
      const r4 = seededRandom(i + 300);
      return {
        skill,
        x: 5 + r1 * 90,   // 5%–95%
        y: 5 + r2 * 90,    // 5%–95%
        driftX: (r3 - 0.5) * 60,  // px drift range
        driftY: (r4 - 0.5) * 40,
        driftSpeed: 15 + r3 * 25, // seconds per cycle
        phase: r4 * Math.PI * 2,
      };
    });
  }, []);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    // Create bubble elements
    const elements: HTMLDivElement[] = [];
    bubbles.forEach((b) => {
      const el = document.createElement('div');
      const colors = CATEGORY_COLORS[b.skill.category];
      const sizeConf = SIZE_CONFIG[b.skill.size];

      el.textContent = b.skill.label;
      el.style.position = 'absolute';
      el.style.left = `${b.x}%`;
      el.style.top = `${b.y}%`;
      el.style.fontSize = `${sizeConf.fontSize}px`;
      el.style.fontFamily = '"JetBrains Mono", monospace';
      el.style.color = colors.text;
      el.style.opacity = String(sizeConf.opacity);
      el.style.border = `1px solid ${colors.border}`;
      el.style.borderRadius = '9999px';
      el.style.padding = '4px 12px';
      el.style.whiteSpace = 'nowrap';
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'default';
      el.style.transition = 'opacity 0.4s, box-shadow 0.4s, border-color 0.4s, color 0.4s';
      el.style.willChange = 'transform';
      el.style.transform = `scale(${sizeConf.scale})`;
      if (sizeConf.blur) {
        el.style.filter = `blur(${sizeConf.blur}px)`;
      }

      // Hover effects
      el.addEventListener('mouseenter', () => {
        el.style.opacity = '0.9';
        el.style.boxShadow = `0 0 20px ${colors.glow}`;
        el.style.borderColor = colors.text;
        el.style.color = colors.text.replace('0.5)', '0.9)');
        if (sizeConf.blur) el.style.filter = 'blur(0px)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.opacity = String(sizeConf.opacity);
        el.style.boxShadow = 'none';
        el.style.borderColor = colors.border;
        el.style.color = colors.text;
        if (sizeConf.blur) el.style.filter = `blur(${sizeConf.blur}px)`;
      });

      container.appendChild(el);
      elements.push(el);
    });

    // Animate drift
    if (reducedMotion) return;

    let raf: number;
    const start = performance.now();

    function animate() {
      const t = (performance.now() - start) * 0.001;
      bubbles.forEach((b, i) => {
        const el = elements[i];
        if (!el) return;
        const dx = Math.sin(t / b.driftSpeed * Math.PI * 2 + b.phase) * b.driftX;
        const dy = Math.cos(t / b.driftSpeed * Math.PI * 2 + b.phase * 1.3) * b.driftY;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${SIZE_CONFIG[b.skill.size].scale})`;
      });
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      elements.forEach((el) => el.remove());
    };
  }, [bubbles, reducedMotion]);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 z-skill-bubbles pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
