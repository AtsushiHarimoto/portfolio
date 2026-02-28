'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const { t } = useLocale();

  return (
    <section className="section-container">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t.projects.pageTitle}</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          {t.projects.pageSubtitle}
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
