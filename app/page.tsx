'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { ArrowRight, Server, LayoutDashboard, Gamepad2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const WaterRippleHero = dynamic(() => import('@/components/webgl/WaterRippleHero'), { ssr: false });
const ImmersiveNav = dynamic(() => import('@/components/webgl/ImmersiveNav'), { ssr: false });

const techBadges = ['Vue 3', 'TypeScript', 'Python', 'React', 'FastAPI', 'LLM/AI'];

const demoLinks = [
  { key: 0, href: '/projects/moyin-gateway-demo/?from=home', icon: <Server className="w-6 h-6" strokeWidth={1.5} /> },
  { key: 1, href: '/projects/moyin-dev-dashboard-demo/?from=home', icon: <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} /> },
  { key: 2, href: '/projects/moyin-game-demo/?from=home', icon: <Gamepad2 className="w-6 h-6" strokeWidth={1.5} /> },
];

export default function HomePage() {
  const { t } = useLocale();
  return (
    <>
      {/* Hero Section — Immersive WebGL */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-moyin-dark">
        {/* Water Ripple Shader Background — z-0 */}
        <div className="absolute inset-0 z-0">
          <WaterRippleHero />
        </div>

        {/* 3D Immersive Navigation Overlay — z-10, objects at top arc */}
        <ImmersiveNav />

        {/* Hero Content — z-15, vertically centered above nav cards */}
        <div className="relative z-[15] flex flex-col gap-6 max-w-3xl items-center text-center pointer-events-none px-4 -mt-24">

          {/* Greeting badge — slide down + scale */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       bg-moyin-pink/10 border border-moyin-pink/25 backdrop-blur-sm mb-2
                       shadow-[0_0_20px_rgba(255,192,211,0.15)]"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-moyin-pink shadow-[0_0_8px_rgba(255,192,211,0.8)]"
            />
            <span className="text-moyin-pink text-xs font-medium tracking-[0.2em] uppercase">{t.hero.greeting}</span>
          </motion.div>

          {/* Name — per-character stagger + glow sweep */}
          <div className="flex flex-col gap-2 relative">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.01, delay: 0.5 }}
              className="text-5xl md:text-7xl font-serif font-black leading-tight tracking-tight
                         hero-name-glow"
            >
              {t.hero.name.split('').map((char: string, i: number) => (
                <motion.span
                  key={`${char}-${i}`}
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Decorative line under name */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-moyin-pink/60 to-transparent mt-2"
            />

            {/* Title — slide up with gradient reveal */}
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl font-serif italic tracking-wide mt-3
                         bg-gradient-to-r from-moyin-pink via-[#ffaac4] to-moyin-petal bg-clip-text text-transparent
                         drop-shadow-[0_0_20px_rgba(255,192,211,0.3)]"
            >
              {t.hero.title}
            </motion.p>
          </div>

          {/* Subtitle — fade in with slight blur */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-moyin-text-secondary text-base md:text-lg max-w-xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Tech badges — staggered pop-in with float */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01, delay: 1.8 }}
            className="flex flex-wrap gap-2.5 justify-center mt-2"
          >
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0, filter: 'blur(4px)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  y: [0, -5, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 2.0 + i * 0.1 },
                  scale: { duration: 0.5, delay: 2.0 + i * 0.1, type: 'spring', stiffness: 300, damping: 15 },
                  filter: { duration: 0.5, delay: 2.0 + i * 0.1 },
                  y: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: 2.5 + i * 0.2 },
                }}
                className="px-4 py-1.5 text-xs font-mono text-moyin-text-secondary
                           border border-moyin-pink/10 rounded-lg bg-white/[0.03] backdrop-blur-sm
                           shadow-[0_0_12px_rgba(255,192,211,0.06)]
                           hover:border-moyin-pink/30 hover:bg-moyin-pink/5 hover:text-moyin-pink-light
                           transition-colors duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Work — YouTube Section */}
      <section className="relative w-full px-4 py-16 flex justify-center z-10">
        <div className="relative w-full max-w-7xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="w-full flex flex-col items-center text-center gap-4"
          >
            <h2 className="text-white text-3xl md:text-4xl font-serif font-bold tracking-tight">
              {t.home.featuredTitle}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-moyin-pink to-transparent rounded-full mb-4"></div>
            
            <div className="w-full max-w-4xl mx-auto">
              <div className="w-full p-4 md:p-6 rounded-xl border border-moyin-pink/15 bg-[#230f15]/70 backdrop-blur-md shadow-xl">
                <div className="relative w-full overflow-hidden rounded-xl border border-white/5 aspect-video">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/pxvT3Hsj3g8"
                    title={t.home.featuredTitle}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Demos Section */}
      <section className="relative w-full px-4 pt-8 pb-16 flex justify-center z-10">
        <div className="relative w-full max-w-7xl flex flex-col items-center">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4 text-center items-center mb-12"
          >
            <h2 className="text-white text-3xl md:text-4xl font-serif font-bold tracking-tight">
              {t.home.demosTitle}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-moyin-pink to-transparent rounded-full"></div>
          </motion.div>

          {/* Demos grid based on the glassmorphism cards style but keeping original logic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {demoLinks.map((demo, i) => {
              const item = t.home.demoItems[demo.key];
              return (
                <motion.div
                  key={demo.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="group h-full block"
                >
                  <Link href={demo.href} className="block h-full">
                    <div className="flex flex-col gap-4 rounded-xl border border-moyin-pink/15 bg-[#230f15]/70 backdrop-blur-md p-6 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 h-full shadow-lg">
                      <div className="w-12 h-12 rounded-lg bg-moyin-pink/10 flex items-center justify-center group-hover:bg-moyin-pink transition-colors text-moyin-pink-light group-hover:text-[#1a1625]">
                        {demo.icon}
                      </div>
                      <div className="flex flex-col gap-2 mt-2 h-full">
                        <h3 className="text-white text-lg font-serif font-bold group-hover:text-moyin-pink transition-colors">{item.name}</h3>
                        <p className="text-moyin-text-secondary text-sm leading-relaxed flex-grow">{item.description}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-moyin-pink-light group-hover:text-moyin-pink transition-colors duration-300 mt-4">
                          {t.home.viewDemo}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section (Stitch Style adapted) */}
      <section className="relative w-full px-4 py-8 pb-20 flex justify-center z-10">
        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl flex flex-col items-center justify-center px-4 py-20 text-center border border-moyin-pink/15">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-cover bg-center z-0 opacity-40" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkwudz23_nGqPm7L5q49kBEVk0yWa_tTcXQEaebv9IUYtiv1_q_yI3kwy5wN9gRDhzZcje-PjAuvQrRdLvp43EMoprD5aiwxUZvGXznBmUH23E9wV82DB4AdI3GIxVDwj0j_P8MSmF32V6g3yaXPB23a6DTlVbKOVh0X2e7JanOaFwkpSnPp86zO-aCGHtyHb0UeKIUSyLtq6_BdkkCBDb18TDzBZc3ygPkJtA3d0k__IbaQ4eOQDEWjy1xDcbcux2p1YEQkN4UDFC")' }}>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1625] via-[#1a1625]/80 to-transparent z-10"></div>
          
          <div className="relative z-20 flex flex-col gap-6 max-w-2xl items-center">
            <h2 className="text-white text-3xl md:text-5xl font-serif font-black leading-tight tracking-tight drop-shadow-lg">
              {t.hero.name}
            </h2>
            <p className="text-moyin-text-secondary text-lg">
              {t.hero.title}
            </p>
            <div className="flex justify-center mt-4">
              <Link href="/projects/" className="flex h-14 px-10 items-center justify-center rounded-lg bg-gradient-to-r from-moyin-pink to-[#ffa6c0] hover:to-moyin-pink text-[#1a1625] text-lg font-bold transition-all shadow-[0_0_30px_rgba(255,194,212,0.3)] hover:shadow-[0_0_40px_rgba(255,194,212,0.5)] hover:scale-105">
                {t.hero.ctaProjects}
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
