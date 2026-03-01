'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import gsap from 'gsap';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NavItem {
  key: string;
  path: string;
  label: string;
  icon: string;
  gradient: string;
  glowColor: string;
}

function useNavItems() {
  const { t } = useLocale();
  return [
    { key: 'home', path: '/', label: t.nav.home, icon: '家', gradient: 'from-[#ffc0d3]/20 to-[#ffc0d3]/5', glowColor: 'rgba(255,192,211,0.4)' },
    { key: 'projects', path: '/projects/', label: t.nav.projects, icon: '術', gradient: 'from-[#e8b4d4]/20 to-[#c096b4]/5', glowColor: 'rgba(232,180,212,0.4)' },
    { key: 'articles', path: '/articles/', label: t.nav.articles, icon: '法', gradient: 'from-[#c096b4]/20 to-[#a78bfa]/5', glowColor: 'rgba(192,150,180,0.4)' },
    { key: 'career', path: '/career/', label: t.nav.career, icon: '道', gradient: 'from-[#a78bfa]/20 to-[#8b7cf7]/5', glowColor: 'rgba(167,139,250,0.4)' },
    { key: 'about', path: '/about/', label: t.nav.about, icon: '人', gradient: 'from-[#8b7cf7]/20 to-[#6c5ce7]/5', glowColor: 'rgba(108,92,231,0.4)' },
  ] as NavItem[];
}

function NavCard({ item, index, onNavigate }: { item: NavItem; index: number; onNavigate: (path: string) => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Kill GSAP tweens on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (cardRef.current) gsap.killTweensOf(cardRef.current);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    gsap.to(card, {
      rotateX, rotateY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
      overwrite: 'auto',
    });
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${item.glowColor}, transparent 60%)`;
    glow.style.opacity = '1';
    card.style.boxShadow = `0 8px 40px ${item.glowColor}`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (card) {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      card.style.boxShadow = 'none';
    }
    if (glow) glow.style.opacity = '0';
  }

  return (
    <motion.button
      ref={cardRef}
      aria-label={item.label}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.6 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onNavigate(item.path)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative w-[100px] h-[120px] md:w-[140px] md:h-[160px] rounded-2xl cursor-pointer
        border border-white/[0.08] backdrop-blur-xl
        bg-gradient-to-b ${item.gradient}
        transition-shadow duration-500
        hover:border-white/[0.15]
        will-change-transform
      `}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Light-follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300"
      />

      {/* Kanji icon */}
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <span
          className="text-4xl font-serif opacity-20 group-hover:opacity-50
                     transition-all duration-500 group-hover:scale-110
                     group-hover:drop-shadow-[0_0_12px_rgba(255,192,211,0.6)]"
          style={{ fontFamily: '"Playfair Display", "Source Han Serif", serif' }}
        >
          {item.icon}
        </span>
      </div>

      {/* Divider line */}
      <div className="absolute top-[85px] left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent
                      group-hover:via-white/25 transition-all duration-500" />

      {/* Label */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-white/70 text-sm font-medium tracking-wider
                        group-hover:text-white transition-colors duration-300">
          {item.label}
        </span>
      </div>

      {/* Corner accent */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/10
                      group-hover:bg-moyin-pink/60 group-hover:shadow-[0_0_8px_rgba(255,192,211,0.5)]
                      transition-all duration-500" />
    </motion.button>
  );
}

export default function ImmersiveNav() {
  const router = useRouter();
  const navItems = useNavItems();
  const prefersReducedMotion = useReducedMotion();

  function handleNavigate(path: string) {
    if (path === '/') {
      const behavior = prefersReducedMotion ? 'instant' : 'smooth';
      window.scrollTo({ top: 0, behavior: behavior as ScrollBehavior });
      return;
    }
    router.push(path);
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Navigation cards — bottom center */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-auto">
        <nav className="flex gap-2 md:gap-5 flex-wrap justify-center px-4" aria-label="Main navigation">
          {navItems.map((item, i) => (
            <NavCard key={item.key} item={item} index={i} onNavigate={handleNavigate} />
          ))}
        </nav>
      </div>

      {/* Language switcher — top right */}
      <div className="absolute top-6 right-6 z-40 pointer-events-auto">
        <LanguageSwitcher />
      </div>

    </div>
  );
}
