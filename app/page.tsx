'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';

const techBadges = ['Vue 3', 'TypeScript', 'Python', 'React', 'FastAPI', 'LLM/AI'];

const demoLinks = [
  { key: 0, href: '/projects/moyin-gateway-demo/', emoji: '\u{1F310}' },
  { key: 1, href: '/projects/moyin-dev-dashboard-demo/', emoji: '\u{1F6E0}\u{FE0F}' },
  { key: 2, href: '/projects/moyin-game-demo/', emoji: '\u{1F3AE}' },
];

export default function HomePage() {
  const { t } = useLocale();
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
        <div className="section-container relative z-10 w-full">
          <div className="max-w-3xl mx-auto lg:mx-0">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm font-mono text-moyin-pink mb-4 tracking-wider"
            >
              {t.hero.greeting}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            >
              <span className="gradient-text">{t.hero.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl font-medium text-[#b8c5d6] mb-6"
            >
              {t.hero.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-[#9fafc4] leading-relaxed mb-8 max-w-2xl"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Tech badges — horizontal flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {techBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                  className="glass-card px-4 py-1.5 text-xs font-mono text-[#b8c5d6] border border-white/5 hover:border-moyin-pink/20 hover:text-moyin-pink-light transition-colors duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/projects/" className="btn-primary">
                {t.hero.ctaProjects}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="https://github.com/AtsushiHarimoto"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work — YouTube Section */}
      <section className="relative">
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              <span className="gradient-text">{t.home.featuredTitle}</span>
            </h2>

            <div className="glass-card p-4 md:p-6 max-w-4xl mx-auto">
              <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/pxvT3Hsj3g8"
                  title="Early Work"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Demos Section */}
      <section className="relative">
        <div className="section-container relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            <span className="gradient-text">{t.home.demosTitle}</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {demoLinks.map((demo, i) => {
              const item = t.home.demoItems[demo.key];
              return (
                <motion.div
                  key={demo.key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <Link href={demo.href} className="block h-full">
                    <div className="glass-card p-6 h-full flex flex-col items-center text-center transition-all duration-300 group-hover:border-moyin-pink/30 group-hover:shadow-lg group-hover:shadow-moyin-pink/10">
                      <span className="text-4xl mb-4" role="img" aria-label={item.name}>
                        {demo.emoji}
                      </span>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                      <p className="text-sm text-[#9fafc4] mb-6 flex-grow">{item.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-moyin-pink-light group-hover:text-moyin-pink transition-colors duration-300">
                        {t.home.viewDemo}
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
