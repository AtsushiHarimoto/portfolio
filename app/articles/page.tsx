'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { Menu, ChevronRight } from 'lucide-react';
import {
  articles,
  categories,
  getArticlesByCategory,
  type Category,
} from '@/lib/articles';
import type { Locale } from '@/lib/i18n';

function CategoryBadge({
  category,
  locale,
}: {
  category: Category;
  locale: Locale;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-moyin-pink/10 text-moyin-pink-light border border-moyin-pink/20">
      {category.icon} {category.label[locale]}
    </span>
  );
}

export default function ArticlesPage() {
  const { t, locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredArticles = activeCategory
    ? getArticlesByCategory(activeCategory)
    : articles;

  const activeCategoryData = activeCategory
    ? categories.find((c) => c.id === activeCategory)
    : null;

  return (
    <section className="section-container">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{t.articles.pageTitle}</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          {t.articles.pageSubtitle}
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-3 glass-card text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" strokeWidth={2} />
          {activeCategoryData
            ? `${activeCategoryData.icon} ${activeCategoryData.label[locale]}`
            : t.articles.allCategories}
        </button>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } lg:block lg:w-64 flex-shrink-0`}
        >
          <div className="glass-card p-4 sticky top-24">
            <nav className="space-y-1">
              {/* All categories button */}
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === null
                    ? 'bg-moyin-pink/15 text-moyin-pink-light border border-moyin-pink/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <span>{t.articles.allCategories}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === null
                      ? 'bg-moyin-pink/20 text-moyin-pink-light'
                      : 'bg-white/10 text-gray-500'
                  }`}
                >
                  {articles.length}
                </span>
              </button>

              <div className="h-px bg-white/5 my-2" />

              {/* Category buttons */}
              {categories.map((cat) => {
                const count = getArticlesByCategory(cat.id).length;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-moyin-pink/15 text-moyin-pink-light border border-moyin-pink/20'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.label[locale]}</span>
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        isActive
                          ? 'bg-moyin-pink/20 text-moyin-pink-light'
                          : 'bg-white/10 text-gray-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Category title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || 'all'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-moyin-text-primary flex items-center gap-3">
                {activeCategoryData && (
                  <span className="text-2xl">{activeCategoryData.icon}</span>
                )}
                {activeCategoryData
                  ? activeCategoryData.label[locale]
                  : t.articles.allCategories}
                <span className="text-sm font-normal text-gray-500">
                  ({filteredArticles.length} {t.articles.articleCount})
                </span>
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Article cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {filteredArticles.map((article, index) => {
                const cat = categories.find(
                  (c) => c.id === article.category
                );

                return (
                  <motion.div
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                  >
                    <Link
                      href={`/articles/${article.slug}/`}
                      className="group block glass-card p-5 hover:bg-moyin-dark-light/70 hover:border-moyin-pink/15 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-medium text-moyin-text-primary group-hover:text-moyin-pink-light transition-colors duration-200 mb-2 line-clamp-2">
                            {article.title[locale]}
                          </h3>
                          {!activeCategory && cat && (
                            <CategoryBadge
                              category={cat}
                              locale={locale}
                            />
                          )}
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-moyin-purple group-hover:text-moyin-pink-light transition-colors">
                            {t.articles.readArticle}
                            <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
