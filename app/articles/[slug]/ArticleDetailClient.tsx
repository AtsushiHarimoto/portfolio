'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import {
  getArticleBySlug,
  getArticlePath,
  getCategoryById,
  categories,
} from '@/lib/articles';
import type { Locale } from '@/lib/i18n';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`~\[\]]/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    items.push({ id, text, level });
  }

  return items;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function ArticleDetailClient({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);

  const article = getArticleBySlug(slug);
  const category = article ? getCategoryById(article.category) : null;

  useEffect(() => {
    if (!article) return;

    const basePath =
      process.env.NODE_ENV === 'production' ? '/portfolio' : '';
    const path = `${basePath}${getArticlePath(article, locale)}`;

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => {
        setMarkdown('# Article not found\n\nThis article could not be loaded.');
        setLoading(false);
      });
  }, [article, locale]);

  const toc = useMemo(() => extractToc(markdown), [markdown]);

  if (!article) {
    return (
      <section className="section-container">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-400">
            Article not found
          </h1>
          <Link
            href="/articles/"
            className="mt-4 inline-block text-moyin-pink-light hover:text-moyin-pink transition-colors"
          >
            {t.articles.backToList}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-container">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link
          href="/articles/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-moyin-pink-light transition-colors group"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t.articles.backToList}
        </Link>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-w-0"
        >
          {/* Article header */}
          <div className="mb-8">
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-moyin-pink/10 text-moyin-pink-light border border-moyin-pink/20 mb-4">
                {category.icon} {category.label[locale]}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold gradient-text leading-tight">
              {article.title[locale]}
            </h1>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="glass-card p-8 animate-pulse">
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-white/5 rounded"
                    style={{ width: `${70 + Math.random() * 30}%` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Markdown content */
            <div className="glass-card p-6 md:p-8 lg:p-10">
              <div className="prose-article">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1
                        id={slugify(String(children))}
                        className="text-3xl font-bold text-moyin-text-primary mt-10 mb-6 first:mt-0"
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2
                        id={slugify(String(children))}
                        className="text-2xl font-semibold text-moyin-text-primary mt-10 mb-4 pb-2 border-b border-white/10"
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3
                        id={slugify(String(children))}
                        className="text-xl font-semibold text-moyin-text-primary mt-8 mb-3"
                      >
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-medium text-moyin-text-primary mt-6 mb-2">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-moyin-text-secondary leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-moyin-pink-light hover:text-moyin-pink underline underline-offset-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1.5 mb-4 text-moyin-text-secondary ml-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-1.5 mb-4 text-moyin-text-secondary ml-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-moyin-text-secondary leading-relaxed">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-moyin-pink/40 pl-4 py-2 my-4 bg-moyin-pink/5 rounded-r-lg text-moyin-text-hint italic">
                        {children}
                      </blockquote>
                    ),
                    code: ({ className, children, ...props }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded bg-moyin-dark-lighter text-moyin-pink-light text-sm font-mono">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code
                          className={`${className || ''} text-sm font-mono`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-moyin-dark rounded-xl p-4 mb-4 overflow-x-auto border border-white/5 text-sm leading-relaxed">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm text-left border-collapse">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-moyin-dark-lighter/50 text-moyin-text-primary">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 font-medium border-b border-white/10">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-moyin-text-secondary border-b border-white/5">
                        {children}
                      </td>
                    ),
                    hr: () => (
                      <hr className="my-8 border-white/10" />
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-moyin-text-primary">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-moyin-text-hint">{children}</em>
                    ),
                    img: ({ src, alt }) => (
                      <span className="block my-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={alt || ''}
                          className="rounded-xl max-w-full h-auto border border-white/5"
                        />
                        {alt && (
                          <span className="block text-center text-xs text-gray-500 mt-2">
                            {alt}
                          </span>
                        )}
                      </span>
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </motion.article>

        {/* Table of Contents - Desktop */}
        {toc.length > 0 && (
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden xl:block w-64 flex-shrink-0"
          >
            <div className="glass-card p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h3 className="text-sm font-semibold text-moyin-text-primary mb-3 px-2">
                {t.articles.tableOfContents}
              </h3>
              <nav className="space-y-0.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs leading-relaxed text-gray-500 hover:text-moyin-pink-light transition-colors py-1 ${
                      item.level === 2 ? 'px-2' : 'px-2 pl-5'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>
        )}

        {/* Table of Contents - Mobile (floating button) */}
        {toc.length > 0 && (
          <div className="xl:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="w-12 h-12 rounded-full bg-moyin-purple/90 text-white shadow-lg shadow-moyin-purple/30 flex items-center justify-center hover:bg-moyin-purple transition-colors"
              aria-label="Table of Contents"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>

            {tocOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 z-40"
                  onClick={() => setTocOpen(false)}
                />
                {/* TOC panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-20 right-6 z-50 w-72 glass-card p-4 max-h-80 overflow-y-auto"
                >
                  <h3 className="text-sm font-semibold text-moyin-text-primary mb-3 px-2">
                    {t.articles.tableOfContents}
                  </h3>
                  <nav className="space-y-0.5">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setTocOpen(false)}
                        className={`block text-xs leading-relaxed text-gray-400 hover:text-moyin-pink-light transition-colors py-1 ${
                          item.level === 2 ? 'px-2' : 'px-2 pl-5'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </motion.div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
