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
    <section className="section-container">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t.career.pageTitle}</span>
        </h1>
        <p className="text-lg text-moyin-text-secondary max-w-2xl mx-auto">
          {t.career.pageSubtitle}
        </p>
      </motion.div>

      {/* Timeline */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        {/* Center spine — background track */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-moyin-dark-lighter" />

        {/* Center spine — animated fill */}
        <motion.div
          className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-0.5 bg-gradient-to-b from-moyin-pink via-moyin-petal to-moyin-purple origin-top"
          style={{ scaleY: lineScaleY, height: '100%' }}
        />

        {/* Timeline items */}
        <div className="space-y-12 md:space-y-16">
          {t.career.items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={isLeft}
                techLabel={t.career.techStack}
                achievementsLabel={t.career.achievements}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  isLeft,
  techLabel,
  achievementsLabel,
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
  isLeft: boolean;
  techLabel: string;
  achievementsLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.5'],
  });
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
        style={{ scale: dotScale, opacity: dotOpacity }}
      >
        <span className="w-4 h-4 rounded-full bg-moyin-pink shadow-[0_0_12px_rgba(255,192,211,0.5)] border-2 border-moyin-dark" />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`
          ml-12 md:ml-0 md:w-[calc(50%-2.5rem)]
          ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}
          group
        `}
      >
        <div className="glass-card p-6 relative overflow-hidden hover:border-moyin-pink/20 transition-colors duration-300">
          {/* Accent gradient bar */}
          <div
            className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-moyin-pink/60 to-moyin-purple/30 ${
              isLeft ? 'right-0 md:right-0' : 'right-0 md:left-0'
            }`}
          />

          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-moyin-pink/[0.03] to-moyin-purple/[0.03] rounded-2xl" />

          {/* Period badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-mono text-moyin-pink px-2.5 py-1 bg-moyin-pink/10 rounded-md border border-moyin-pink/20">
              {item.period}
            </span>
            <span className="text-xs font-mono text-moyin-text-muted px-2 py-1 bg-moyin-dark-lighter/60 rounded-md">
              {item.domain}
            </span>
          </div>

          {/* Role */}
          <h3 className="text-lg font-semibold text-moyin-text-primary mb-2 group-hover:text-moyin-pink-light transition-colors duration-300">
            {item.role}
          </h3>

          {/* Description */}
          <p className="text-sm text-moyin-text-hint leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-4">
            <p className="text-xs font-mono text-moyin-text-muted mb-2 uppercase tracking-wider">
              {techLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-moyin-dark-lighter/80 text-moyin-text-hint border border-white/5 hover:border-moyin-pink/20 hover:text-moyin-pink-light transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <p className="text-xs font-mono text-moyin-text-muted mb-2 uppercase tracking-wider">
              {achievementsLabel}
            </p>
            <ul className="space-y-1.5">
              {item.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-moyin-text-secondary leading-relaxed"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-moyin-pink/60 shrink-0" />
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Connector line from dot to card (mobile only visible, desktop via spacing) */}
        <div
          className={`hidden md:block absolute top-6 w-6 h-px bg-moyin-dark-lighter ${
            isLeft ? 'right-0 translate-x-full md:left-auto md:right-[-2.5rem]' : 'left-0 -translate-x-full md:right-auto md:left-[-2.5rem]'
          }`}
        />
      </motion.div>
    </div>
  );
}
