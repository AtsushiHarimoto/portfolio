'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { Home, FolderOpen, FileText, Briefcase, User, Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'home', path: '/', icon: Home },
  { key: 'projects', path: '/projects/', icon: FolderOpen },
  { key: 'articles', path: '/articles/', icon: FileText },
  { key: 'career', path: '/career/', icon: Briefcase },
  { key: 'about', path: '/about/', icon: User },
];

export default function FloatingMiniNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  const getLabel = (key: string) => t.nav[key as keyof typeof t.nav] || key;

  // Close on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleClickOutside, handleKeyDown]);

  return (
    <div ref={containerRef} className="fixed bottom-6 left-6 z-50">
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        aria-label={(t.nav as Record<string, string>).menu ?? 'Navigation menu'}
        aria-expanded={open}
        aria-controls="floating-nav-menu"
        className="w-14 h-14 rounded-full bg-[#1a1625]/90 border border-moyin-pink/30 backdrop-blur-md
                   flex items-center justify-center text-moyin-pink shadow-lg
                   hover:bg-moyin-pink/20 hover:border-moyin-pink/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Nav items in arc */}
      <AnimatePresence>
        {open && (
          <nav id="floating-nav-menu" aria-label="Quick navigation">
            {NAV_ITEMS.map((item, i) => {
              const angle = -(Math.PI / 2) + (Math.PI / 2 / (NAV_ITEMS.length - 1)) * i;
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const Icon = item.icon;
              const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path) || pathname === item.path.slice(0, -1);

              return (
                <motion.button
                  key={item.key}
                  aria-label={getLabel(item.key)}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: 1, x, y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  onClick={() => {
                    router.push(item.path);
                    setOpen(false);
                  }}
                  className={`absolute bottom-0 left-0 w-11 h-11 rounded-full flex items-center justify-center
                             border backdrop-blur-md shadow-md transition-colors
                             ${isActive
                               ? 'bg-moyin-pink/30 border-moyin-pink/60 text-moyin-pink'
                               : 'bg-[#1a1625]/90 border-white/10 text-white/70 hover:text-moyin-pink hover:border-moyin-pink/40'
                             }`}
                  title={getLabel(item.key)}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.8} />
                </motion.button>
              );
            })}

            {/* Language switcher bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.25, delay: 0.25 }}
              className="absolute bottom-16 left-16"
            >
              <LanguageSwitcher />
            </motion.div>
          </nav>
        )}
      </AnimatePresence>
    </div>
  );
}
