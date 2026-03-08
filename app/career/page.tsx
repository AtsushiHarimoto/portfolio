'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';

export default function CareerPage() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 md:py-32">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 md:mb-32 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
          {t.career.pageTitle}
        </h1>
        <p className="text-lg text-moyin-text-secondary leading-relaxed">
          {t.career.pageSubtitle}
        </p>
      </motion.div>

      {/* Timeline */}
      <div ref={containerRef} className="relative">
        {/* Global Track */}
        <div className="absolute left-[11.5px] md:left-[151.5px] top-3 bottom-4 w-[1px] bg-white/[0.08]" />

        {/* Global Fill */}
        <motion.div
          className="absolute left-[11.5px] md:left-[151.5px] top-3 bottom-4 w-[1px] bg-gradient-to-b from-moyin-pink to-moyin-purple origin-top"
          style={{ scaleY: lineScaleY }}
        />

        {/* Timeline items */}
        <div className="space-y-16 md:space-y-24">
          {t.career.items.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: {
    period: string;
    role: string;
    domain: string;
    description: string;
    tech: string[];
    achievements: string[];
  };
  index: number;
}) {
  return (
    <div className="relative grid grid-cols-[24px_1fr] md:grid-cols-[140px_24px_1fr] gap-x-0 group">
      {/* Desktop Period */}
      <div className="hidden md:block pr-8 text-right pt-[7px]">
        <span className="text-[13px] font-mono tracking-wide text-moyin-text-hint transition-colors duration-300 group-hover:text-moyin-pink">
          {item.period}
        </span>
      </div>

      {/* Dot Node */}
      <div className="relative flex justify-center pt-[10px]">
        <div className="w-[7px] h-[7px] bg-moyin-dark rounded-full border border-white/30 transition-all duration-300 group-hover:bg-moyin-pink group-hover:border-moyin-pink group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(255,192,211,0.8)] z-10" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="pl-5 md:pl-10 pb-4"
      >
        <div className="mb-5">
          {/* Mobile Period */}
          <span className="md:hidden block text-[13px] font-mono tracking-wide text-moyin-text-muted mb-2 transition-colors duration-300 group-hover:text-moyin-pink">
            {item.period}
          </span>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-moyin-pink-light transition-colors duration-300">
              {item.role}
            </h3>
            <span className="text-[11px] font-medium tracking-wider uppercase text-moyin-pink px-2.5 py-1 bg-moyin-pink/[0.05] border border-moyin-pink/20 rounded-full">
              {item.domain}
            </span>
          </div>
          <p className="text-[15px] md:text-base text-moyin-text-secondary leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tech.map((tech) => (
            <span
              key={tech}
              className="text-[12px] font-mono text-moyin-text-hint bg-white/[0.02] px-2.5 py-1 rounded border border-white/[0.05] transition-colors duration-300 group-hover:border-white/10 group-hover:text-moyin-text-secondary group-hover:bg-white/[0.04]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Achievements */}
        <ul className="space-y-3 p-0 m-0">
          {item.achievements.map((achievement, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              className="flex items-start gap-3"
            >
              <span className="mt-[9px] w-[3px] h-[3px] shrink-0 rounded-full bg-white/20 group-hover:bg-moyin-pink/60 transition-colors duration-300" />
              <span className="text-[14px] md:text-[15px] text-moyin-text-secondary/90 leading-relaxed max-w-2xl">
                {achievement}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
