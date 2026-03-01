'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/projects/', label: t.nav.projects },
    { href: '/articles/', label: t.nav.articles },
    { href: '/career/', label: t.nav.career },
    { href: '/about/', label: t.nav.about },
  ];

  const isActive = (href: string) => {
    const normalizedPath = pathname.endsWith('/') ? pathname : pathname + '/';
    const normalizedHref = href.endsWith('/') ? href : href + '/';
    if (normalizedHref === '/') {
      return normalizedPath === '/';
    }
    return normalizedPath.startsWith(normalizedHref);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 60"
            className="h-8 w-auto"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="petalFill" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#fdf6f8" />
                <stop offset="15%" stopColor="#f8dce3" />
                <stop offset="35%" stopColor="#f0b8c8" />
                <stop offset="55%" stopColor="#e89bac" />
                <stop offset="75%" stopColor="#de8596" />
                <stop offset="100%" stopColor="#cf7080" />
              </linearGradient>
              <radialGradient id="rootWhite" cx="12%" cy="50%" r="25%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fdf6f8" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g transform="rotate(-15 60 30)">
              <path
                d="M 5 30 Q 25 12, 60 10 Q 95 8, 115 30 Q 95 55, 60 52 Q 25 49, 5 30 Z"
                fill="url(#petalFill)"
              />
              <ellipse cx="25" cy="30" rx="22" ry="15" fill="url(#rootWhite)" />
              <g stroke="#d4899a" strokeWidth="0.4" fill="none" opacity="0.2" strokeLinecap="round">
                <path d="M 12 28 Q 50 22, 100 22" />
                <path d="M 14 34 Q 55 30, 102 30" />
                <path d="M 16 40 Q 55 38, 98 38" />
              </g>
            </g>
          </svg>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-moyin-pink-light'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-moyin-pink to-moyin-purple rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'text-moyin-pink-light bg-moyin-pink/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
