'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { Github, Mail } from 'lucide-react';

type SkillCategoryKey = 'frontend' | 'backend' | 'mobile' | 'aiMl' | 'devopsTools';

const skillCategories: { key: SkillCategoryKey; skills: string[] }[] = [
  {
    key: 'frontend',
    skills: ['Vue 3', 'React', 'TypeScript', 'Tailwind CSS', 'Webpack', 'Vite'],
  },
  {
    key: 'backend',
    skills: ['Python', 'FastAPI', 'Node.js', 'Express', 'Spring Boot'],
  },
  {
    key: 'mobile',
    skills: ['Swift', 'Objective-C', 'Kotlin', 'Java', 'Cordova', 'Uniapp'],
  },
  {
    key: 'aiMl',
    skills: ['RAG / LangChain', 'Prompt Engineering', 'Vector DB', 'OpenAI API', 'MCP', 'AI Agent'],
  },
  {
    key: 'devopsTools',
    skills: ['Docker', 'GitHub Actions', 'Jenkins', 'CI/CD', 'Git', 'Linux'],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function AboutPage() {
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
          <span className="gradient-text">{t.about.pageTitle}</span>
        </h1>
        <p className="text-lg text-moyin-text-secondary max-w-2xl">
          {t.about.pageSubtitle}
        </p>
      </motion.div>

      {/* Name Card */}
      <motion.div {...fadeInUp} transition={{ duration: 0.5 }} className="mb-12">
        <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
          <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
          {t.about.names.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.about.names.items.map((item, i) => (
            <div key={i} className="glass-card p-5">
              <p className="text-moyin-text-primary font-semibold text-lg mb-1">{item.name}</p>
              <p className="text-sm text-moyin-text-hint">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Intro, Experience, Highlights, How I Work, Philosophy */}
        <div className="lg:col-span-2 space-y-12">
          {/* Background */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
              {t.about.introTitle}
            </h2>
            <div className="space-y-4">
              {t.about.intro.map((paragraph, i) => (
                <p key={i} className="text-moyin-text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
              {t.about.experienceTitle}
            </h2>
            <div className="space-y-4">
              {t.about.experienceItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card p-5 relative overflow-hidden group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-moyin-pink/60 to-moyin-purple/30" />
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-moyin-pink px-2 py-1 bg-moyin-pink/10 rounded-md">
                      {item.period}
                    </span>
                    <h3 className="text-base font-medium text-moyin-text-primary">
                      {item.role}
                    </h3>
                  </div>
                  <p className="text-sm text-moyin-text-hint leading-relaxed pl-0.5">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Achievements */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
              {t.about.highlightsTitle}
            </h2>
            <div className="space-y-3">
              {t.about.highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-moyin-pink shrink-0" />
                  <p className="text-sm text-moyin-text-secondary leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How I Work */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.22 }}>
            <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
              {t.about.howIWork.title}
            </h2>
            <div className="space-y-4">
              {t.about.howIWork.items.map((item, i) => (
                <div key={i} className="glass-card p-5">
                  <h3 className="text-base font-medium text-moyin-pink-light mb-2">{item.heading}</h3>
                  <p className="text-sm text-moyin-text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.25 }}>
            <blockquote className="glass-card p-6 border-l-2 border-moyin-pink/50">
              <p className="text-moyin-pink-light text-lg italic leading-relaxed">
                {t.about.philosophy}
              </p>
            </blockquote>
          </motion.div>

          {/* Languages */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.3 }}>
            <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
              {t.about.languagesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.about.languages.map((lang, i) => (
                <div key={i} className="glass-card p-4 text-center">
                  <p className="text-moyin-text-primary font-medium mb-1">{lang.name}</p>
                  <p className="text-xs text-moyin-text-muted">{lang.level}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.35 }}>
            <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
              {t.about.contact.title}
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/AtsushiHarimoto"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-6 py-4 flex items-center gap-3 hover:border-moyin-pink/30 transition-colors"
              >
                <Github className="w-5 h-5 text-moyin-pink" strokeWidth={1.5} />
                <span className="text-moyin-text-primary font-medium">{t.about.contact.github}</span>
              </a>
              <a
                href="mailto:akiracheung.atsushiharimoto@gmail.com"
                className="glass-card px-6 py-4 flex items-center gap-3 hover:border-moyin-pink/30 transition-colors"
              >
                <Mail className="w-5 h-5 text-moyin-pink" strokeWidth={1.5} />
                <span className="text-moyin-text-primary font-medium">{t.about.contact.email}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Skills */}
        <div>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="sticky top-24"
          >
            <h2 className="text-2xl font-semibold text-moyin-text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gradient-to-r from-moyin-pink to-transparent rounded-full" />
              {t.about.skillsTitle}
            </h2>
            <div className="space-y-6">
              {skillCategories.map((category, catIndex) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: catIndex * 0.1 }}
                >
                  <h3 className="text-sm font-mono text-moyin-pink mb-3">
                    {t.about.skillCategories[category.key]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg
                                   bg-moyin-dark-lighter/80 text-moyin-text-hint
                                   border border-white/5 hover:border-moyin-pink/30
                                   hover:text-moyin-pink-light transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
