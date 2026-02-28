'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const STAT_CARDS = [
  {
    label: 'Total Sessions',
    value: '142',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    trend: { direction: 'up' as const, value: 12 },
    borderColor: 'border-l-blue-500',
    iconBg: 'bg-blue-500/20 text-blue-400',
  },
  {
    label: 'Active Skills',
    value: '8',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    trend: { direction: 'up' as const, value: 3 },
    borderColor: 'border-l-moyin-purple',
    iconBg: 'bg-moyin-purple/20 text-moyin-accent',
  },
  {
    label: 'Issues Resolved',
    value: '34',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    trend: { direction: 'up' as const, value: 28 },
    borderColor: 'border-l-emerald-500',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    label: 'Total Tokens',
    value: '1.25M',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    trend: { direction: 'up' as const, value: 18 },
    borderColor: 'border-l-moyin-pink',
    iconBg: 'bg-moyin-pink/20 text-moyin-pink',
  },
  {
    label: 'Avg Duration',
    value: '47m',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    trend: { direction: 'down' as const, value: 5 },
    borderColor: 'border-l-orange-500',
    iconBg: 'bg-orange-500/20 text-orange-400',
  },
  {
    label: 'Reports Generated',
    value: '12',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    trend: { direction: 'up' as const, value: 8 },
    borderColor: 'border-l-cyan-500',
    iconBg: 'bg-cyan-500/20 text-cyan-400',
  },
];

const SESSION_TREND = [
  { day: 'Mon', sessions: 18 },
  { day: 'Tue', sessions: 24 },
  { day: 'Wed', sessions: 16 },
  { day: 'Thu', sessions: 32 },
  { day: 'Fri', sessions: 28 },
  { day: 'Sat', sessions: 12 },
  { day: 'Sun', sessions: 22 },
];

const SKILLS_LIST = [
  { name: 'project-context-keeper', status: 'active' as const, lastSync: '2 min ago', description: 'Session restore and context management' },
  { name: 'design-phase-router', status: 'active' as const, lastSync: '5 min ago', description: 'Design stage navigation and workflow' },
  { name: 'requirements-clarity', status: 'syncing' as const, lastSync: 'syncing...', description: 'Requirements analysis and clarification' },
  { name: 'code-review-agent', status: 'active' as const, lastSync: '12 min ago', description: 'Automated code review and suggestions' },
  { name: 'test-generator', status: 'inactive' as const, lastSync: '3 days ago', description: 'Unit test scaffolding and generation' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MoyinDevDashboardDemoPage() {
  const maxSessions = Math.max(...SESSION_TREND.map((d) => d.sessions));
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <section className="section-container min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm text-moyin-text-secondary hover:text-moyin-pink transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">Moyin-Dev-Dashboard</span>
            </h1>
            <p className="text-moyin-text-hint text-sm mt-1">Developer workflow management &amp; metrics</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Demo &mdash; Mock Data
            </span>
            <a
              href="https://github.com/AtsushiHarimoto/moyin-dev-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-moyin-text-secondary hover:text-moyin-pink-light border border-white/10 hover:border-moyin-pink/30 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              Source
            </a>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            whileHover={{ y: -4 }}
            className={`glass-card p-5 border-l-4 ${card.borderColor} group relative overflow-hidden`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  {card.icon}
                </div>
                <span className="text-xs font-medium text-moyin-text-hint uppercase tracking-wider">{card.label}</span>
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold ${
                  card.trend.direction === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                <span>{card.trend.direction === 'up' ? '\u2191' : '\u2193'}</span>
                <span>{card.trend.value}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-moyin-text-primary font-mono tracking-tight">
              {card.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Insights row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-moyin-text-primary">Session Trends</h3>
              <p className="text-xs text-moyin-text-hint mt-0.5">Last 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-moyin-text-muted">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-moyin-pink/60 to-moyin-purple/60" />
              Sessions
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="relative h-48">
            <svg viewBox="0 0 700 200" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1="40"
                  y1={20 + (1 - ratio) * 160}
                  x2="680"
                  y2={20 + (1 - ratio) * 160}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <text
                  key={`label-${ratio}`}
                  x="32"
                  y={24 + (1 - ratio) * 160}
                  textAnchor="end"
                  fill="rgba(255,255,255,0.3)"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {Math.round(maxSessions * ratio)}
                </text>
              ))}

              {/* Bars */}
              {SESSION_TREND.map((d, i) => {
                const barWidth = 56;
                const gap = (640 - barWidth * 7) / 6;
                const x = 50 + i * (barWidth + gap);
                const barHeight = (d.sessions / maxSessions) * 160;
                const y = 180 - barHeight;
                const isHovered = hoveredBar === i;

                return (
                  <g key={d.day}>
                    {/* Invisible hover area */}
                    <rect
                      x={x}
                      y={20}
                      width={barWidth}
                      height={160}
                      fill="transparent"
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                      style={{ cursor: 'pointer' }}
                    />

                    {/* Bar */}
                    <motion.rect
                      x={x}
                      width={barWidth}
                      rx="6"
                      ry="6"
                      fill="url(#barGradient)"
                      initial={{ y: 180, height: 0 }}
                      animate={{
                        y,
                        height: barHeight,
                        opacity: isHovered ? 1 : 0.75,
                      }}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                    />

                    {/* Hover tooltip */}
                    {isHovered && (
                      <g>
                        <rect
                          x={x + barWidth / 2 - 22}
                          y={y - 28}
                          width="44"
                          height="22"
                          rx="6"
                          fill="rgba(26,22,37,0.9)"
                          stroke="rgba(255,192,211,0.3)"
                          strokeWidth="1"
                        />
                        <text
                          x={x + barWidth / 2}
                          y={y - 13}
                          textAnchor="middle"
                          fill="#ffc0d3"
                          fontSize="11"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {d.sessions}
                        </text>
                      </g>
                    )}

                    {/* X-axis label */}
                    <text
                      x={x + barWidth / 2}
                      y={198}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.4)"
                      fontSize="11"
                      fontFamily="sans-serif"
                    >
                      {d.day}
                    </text>
                  </g>
                );
              })}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffc0d3" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6"
        >
          <h3 className="text-xs font-bold text-moyin-text-hint uppercase tracking-widest mb-5">Quick Insights</h3>
          <ul className="space-y-5">
            <li className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-sm text-moyin-text-primary">Completion Rate</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">this week</span>
              </div>
              <span className="text-2xl font-bold text-moyin-text-primary font-mono">87%</span>
            </li>
            <li className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-sm text-moyin-text-primary">Tasks</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">todo / doing / done</span>
              </div>
              <span className="text-2xl font-bold text-moyin-text-primary font-mono">5/3/34</span>
            </li>
            <li className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-sm text-moyin-text-primary">Error Rate</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">last 24h</span>
              </div>
              <span className="text-2xl font-bold text-emerald-400 font-mono">0.3%</span>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <span className="text-sm text-moyin-text-primary">Uptime</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">system health</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-2xl font-bold text-emerald-400 font-mono">99.9%</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Skills Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex items-center gap-4 mb-5">
          <h2 className="text-xl font-bold text-moyin-text-primary">Skills Monitor</h2>
          <div className="h-px flex-1 bg-white/[0.04]" />
          <div className="flex items-center gap-2 bg-moyin-dark-light/60 px-4 py-1.5 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-emerald-400 tracking-wider">LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS_LIST.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
              className={`relative p-5 rounded-2xl border backdrop-blur-sm overflow-hidden group transition-all duration-300 ${
                skill.status === 'active'
                  ? 'bg-gradient-to-br from-moyin-pink/5 to-moyin-purple/10 border-moyin-pink/20 shadow-[0_0_20px_rgba(255,192,211,0.05)]'
                  : skill.status === 'syncing'
                  ? 'bg-gradient-to-br from-yellow-500/5 to-orange-500/10 border-yellow-500/20'
                  : 'bg-white/[0.03] border-white/[0.06] opacity-60 hover:opacity-100'
              }`}
            >
              {/* Active indicator bar */}
              {skill.status === 'active' && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-moyin-pink shadow-[0_0_10px_rgba(255,192,211,0.4)]" />
              )}
              {skill.status === 'syncing' && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 animate-pulse" />
              )}

              <div className="flex justify-between items-start pl-2">
                <div className="flex-1 pr-3">
                  <span className="block text-sm font-bold text-moyin-text-primary mb-1">{skill.name}</span>
                  <p className="text-xs text-moyin-text-hint line-clamp-2">{skill.description}</p>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold tracking-wider px-2 py-1 rounded border uppercase shrink-0 ${
                    skill.status === 'active'
                      ? 'text-moyin-pink border-moyin-pink/30 bg-moyin-pink/10'
                      : skill.status === 'syncing'
                      ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
                      : 'text-moyin-text-muted border-white/10 bg-white/[0.03]'
                  }`}
                >
                  {skill.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.04] flex justify-between items-center pl-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono text-moyin-text-muted">
                  Last sync: {skill.lastSync}
                </span>
                {skill.status === 'active' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
