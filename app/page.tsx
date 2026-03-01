'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { MouseEvent } from 'react';
import { ArrowRight, Server, LayoutDashboard, Gamepad2 } from 'lucide-react';

const techBadges = ['Vue 3', 'TypeScript', 'Python', 'React', 'FastAPI', 'LLM/AI'];

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative"
      >
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full flex flex-col justify-center">
            {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

const demoLinks = [
  { key: 0, href: '/projects/moyin-gateway-demo/?from=home', icon: <Server className="w-6 h-6" strokeWidth={1.5} /> },
  { key: 1, href: '/projects/moyin-dev-dashboard-demo/?from=home', icon: <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} /> },
  { key: 2, href: '/projects/moyin-game-demo/?from=home', icon: <Gamepad2 className="w-6 h-6" strokeWidth={1.5} /> },
];

export default function HomePage() {
  const { t } = useLocale();
  return (
    <>
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,192,211,0.15)_0%,transparent_60%)]"></div>
      
      {/* Hero Section */}
      <section className="relative w-full px-4 py-8 md:py-16 flex justify-center z-10 min-h-[calc(100vh-4rem)] items-center mt-6">
        <div className="relative w-full max-w-7xl overflow-hidden rounded-2xl min-h-[560px] flex flex-col items-center justify-center p-8 text-center border border-moyin-pink/15 shadow-2xl">
          {/* Hero Background Image with Overlay */}
          <div className="absolute inset-0 bg-cover bg-center z-0 object-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCw77EHXnzc0jQJaXTYerP8MEVkTRsKHlA7SVpj222BGYhbFRA19XqXvCAEFBioYKkDgwA4VONrj84FBLgLjQKItthq2LnU6Ps2HEvkE0DtIOTBy24o6POFG9YE9r1NUjmRR_PFB2xBJNquzemgJz9uLveb-Ab1Og62PePBs4Fx06zy4QpTehCw_LyZgn8iIYc07t-4uDZCCVtWs9O1RiPUzSqn4i4xUnK0ZaYRgoWq2iXkoad1EFFYoxMn8QaxUFmy1GaO4ufcfXp9")' }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/80 via-[#1a1625]/60 to-[#1a1625]/90 z-10"></div>
          
          {/* Hero Content */}
          <div className="relative z-20 flex flex-col gap-6 max-w-3xl items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moyin-pink/10 border border-moyin-pink/20 backdrop-blur-sm mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-moyin-pink animate-pulse"></span>
              <span className="text-moyin-pink text-xs font-medium tracking-wider uppercase">{t.hero.greeting}</span>
            </motion.div>

            <div className="flex flex-col gap-2 relative">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white text-5xl md:text-7xl font-serif font-black leading-tight tracking-tight drop-shadow-lg"
              >
                {t.hero.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-moyin-pink/90 text-xl md:text-2xl font-serif italic tracking-wide mt-2"
              >
                {t.hero.title}
              </motion.p>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-moyin-text-secondary text-base md:text-lg max-w-xl leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2.5 justify-center mt-2"
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
                  className="px-4 py-1.5 text-xs font-mono text-moyin-text-secondary border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mt-4"
            >
              <Link href="/projects/" className="flex min-w-[140px] h-12 px-8 cursor-pointer items-center justify-center rounded-lg bg-moyin-pink hover:bg-moyin-pink-light text-[#1a1625] text-base font-bold transition-all shadow-[0_0_20px_rgba(255,194,212,0.4)] hover:scale-105">
                {t.hero.ctaProjects}
              </Link>
              <a
                href="https://github.com/AtsushiHarimoto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-[140px] h-12 px-8 cursor-pointer items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white text-base font-bold transition-all hover:border-moyin-pink/50 group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:text-moyin-pink transition-colors text-white" fill="currentColor" viewBox="0 0 24 24">
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
                    title="Early Work"
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
