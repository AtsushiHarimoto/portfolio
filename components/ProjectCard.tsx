'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gamepad2, Server, Globe, Search, LayoutDashboard, Building2 } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import type { Project } from '@/lib/projects';

const iconMap: Record<string, JSX.Element> = {
  gamepad: <Gamepad2 className="w-6 h-6" strokeWidth={1.5} />,
  server: <Server className="w-6 h-6" strokeWidth={1.5} />,
  network: <Globe className="w-6 h-6" strokeWidth={1.5} />,
  search: <Search className="w-6 h-6" strokeWidth={1.5} />,
  dashboard: <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} />,
  factory: <Building2 className="w-6 h-6" strokeWidth={1.5} />,
};

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  const { locale, t } = useLocale();

  const cardContent = (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-2.5 rounded-xl"
          style={{ backgroundColor: `${project.color}15` }}
        >
          <div style={{ color: project.color }}>
            {iconMap[project.icon] || iconMap.factory}
          </div>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-moyin-pink transition-colors duration-200 z-10 relative"
          aria-label={`${project.name} on GitHub`}
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-moyin-pink-light transition-colors">
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
        {project.description[locale]}
      </p>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-5">
        {project.highlights[locale].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
            <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
            {item}
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/5 text-gray-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      {project.demo ? (
        <Link href={project.demo} className="glass-card p-6 flex flex-col h-full cursor-pointer block">
          {cardContent}
        </Link>
      ) : (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-6 flex flex-col h-full cursor-pointer block"
        >
          {cardContent}
        </a>
      )}
    </motion.div>
  );
}
