'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { useVfx } from '@/lib/vfx-context';
import { locales, getTranslations } from '@/lib/i18n';

/**
 * 用途：首頁專用的浮動控制列（語言切換 + VFX Toggle）
 * 固定在右上角，讓首頁在沒有 Header 的情況下也能切換語言
 */
export default function HomeControls() {
  const { locale, setLocale } = useLocale();
  const { isVfxEnabled, toggleVfx } = useVfx();
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find((l) => l.code === locale);

  const t = getTranslations(locale);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-4 right-4 z-header flex items-center gap-2"
      aria-label="Site controls"
    >
      {/* VFX Toggle */}
      <button
        onClick={toggleVfx}
        className={`flex items-center justify-center p-2 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
          isVfxEnabled
            ? 'bg-moyin-pink/20 border-moyin-pink/40 text-moyin-pink'
            : 'bg-black/30 border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20'
        }`}
        title={isVfxEnabled ? t.vfx.disable : t.vfx.enable}
        aria-label={isVfxEnabled ? t.vfx.disable : t.vfx.enable}
      >
        <Sparkles
          className={`w-4 h-4 transition-transform duration-500 ${isVfxEnabled ? 'rotate-12 scale-110' : ''}`}
          strokeWidth={2}
        />
      </button>

      {/* Language Switcher */}
      <div className="relative">
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-300
                     border border-white/10 rounded-lg bg-black/30 backdrop-blur-sm
                     hover:text-white hover:border-white/25 transition-all duration-200"
          aria-label="Switch language"
          aria-expanded={langOpen}
        >
          <span className="text-[10px] font-bold text-moyin-pink">
            {currentLocale?.flag}
          </span>
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        </button>

        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-36 glass-card border border-white/10 rounded-xl overflow-hidden shadow-xl"
            >
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLocale(l.code);
                    setLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                    locale === l.code
                      ? 'text-moyin-pink-light bg-moyin-pink/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <span className="text-[10px] font-bold">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
