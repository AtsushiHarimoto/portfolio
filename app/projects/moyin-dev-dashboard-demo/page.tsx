'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Puzzle,
  CheckCircle,
  Tag,
  Clock,
  FileBarChart,
  LayoutDashboard,
  ClipboardList,
  Settings,
  Plus,
  RefreshCw,
  Check,
  ChevronDown,
  X,
  Menu,
} from 'lucide-react';
import BackLink from '@/components/BackLink';
import { useLocale } from '@/lib/locale-context';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PageId = 'dashboard' | 'sessions' | 'skills' | 'reports' | 'kanban' | 'settings';

interface NavItem {
  id: PageId;
  icon: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const STAT_CARDS = [
  {
    key: 'totalSessions' as const,
    value: '142',
    icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
    trend: { direction: 'up' as const, value: 12 },
    borderColor: 'border-l-blue-500',
    iconBg: 'bg-blue-500/20 text-blue-400',
  },
  {
    key: 'activeSkills' as const,
    value: '8',
    icon: <Puzzle className="w-5 h-5" strokeWidth={1.5} />,
    trend: { direction: 'up' as const, value: 3 },
    borderColor: 'border-l-moyin-purple',
    iconBg: 'bg-moyin-purple/20 text-moyin-accent',
  },
  {
    key: 'issuesResolved' as const,
    value: '34',
    icon: <CheckCircle className="w-5 h-5" strokeWidth={1.5} />,
    trend: { direction: 'up' as const, value: 28 },
    borderColor: 'border-l-emerald-500',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    key: 'totalTokens' as const,
    value: '1.25M',
    icon: <Tag className="w-5 h-5" strokeWidth={1.5} />,
    trend: { direction: 'up' as const, value: 18 },
    borderColor: 'border-l-moyin-pink',
    iconBg: 'bg-moyin-pink/20 text-moyin-pink',
  },
  {
    key: 'avgDuration' as const,
    value: '47m',
    icon: <Clock className="w-5 h-5" strokeWidth={1.5} />,
    trend: { direction: 'down' as const, value: 5 },
    borderColor: 'border-l-orange-500',
    iconBg: 'bg-orange-500/20 text-orange-400',
  },
  {
    key: 'reportsGenerated' as const,
    value: '12',
    icon: <FileBarChart className="w-5 h-5" strokeWidth={1.5} />,
    trend: { direction: 'up' as const, value: 8 },
    borderColor: 'border-l-cyan-500',
    iconBg: 'bg-cyan-500/20 text-cyan-400',
  },
];

const SESSION_TREND = [
  { dayKey: 'mon' as const, sessions: 18 },
  { dayKey: 'tue' as const, sessions: 24 },
  { dayKey: 'wed' as const, sessions: 16 },
  { dayKey: 'thu' as const, sessions: 32 },
  { dayKey: 'fri' as const, sessions: 28 },
  { dayKey: 'sat' as const, sessions: 12 },
  { dayKey: 'sun' as const, sessions: 22 },
];

const SKILLS_LIST = [
  { name: 'project-context-keeper', status: 'active' as const, lastSync: '2 min ago', description: 'Session restore and context management', enabled: true },
  { name: 'design-phase-router', status: 'active' as const, lastSync: '5 min ago', description: 'Design stage navigation and workflow', enabled: true },
  { name: 'requirements-clarity', status: 'syncing' as const, lastSync: 'syncing...', description: 'Requirements analysis and clarification', enabled: true },
  { name: 'code-review-agent', status: 'active' as const, lastSync: '12 min ago', description: 'Automated code review and suggestions', enabled: true },
  { name: 'test-generator', status: 'inactive' as const, lastSync: '3 days ago', description: 'Unit test scaffolding and generation', enabled: false },
  { name: 'doc-writer', status: 'inactive' as const, lastSync: '5 days ago', description: 'Auto-generate documentation from code', enabled: false },
];

const SESSIONS_DATA = [
  { id: 'ses-001', project: 'moyin-engine', startTime: '2026-02-28 09:15', duration: '1h 23m', status: 'completed' as const, tokens: 48200 },
  { id: 'ses-002', project: 'portfolio-site', startTime: '2026-02-28 11:02', duration: '45m', status: 'completed' as const, tokens: 31500 },
  { id: 'ses-003', project: 'moyin-engine', startTime: '2026-02-28 14:30', duration: '2h 10m', status: 'completed' as const, tokens: 72300 },
  { id: 'ses-004', project: 'skills-config', startTime: '2026-02-28 17:45', duration: '32m', status: 'paused' as const, tokens: 18700 },
  { id: 'ses-005', project: 'moyin-engine', startTime: '2026-03-01 08:00', duration: '1h 05m', status: 'active' as const, tokens: 39100 },
  { id: 'ses-006', project: 'dev-dashboard', startTime: '2026-03-01 09:30', duration: '28m', status: 'active' as const, tokens: 15400 },
  { id: 'ses-007', project: 'portfolio-site', startTime: '2026-02-27 16:20', duration: '55m', status: 'completed' as const, tokens: 26800 },
  { id: 'ses-008', project: 'skills-config', startTime: '2026-02-27 10:00', duration: '1h 40m', status: 'completed' as const, tokens: 54600 },
];

const REPORTS_DATA = [
  { id: 'rpt-001', type: 'daily' as const, date: '2026-03-01', status: 'generating' as const, summary: 'Today\'s session focused on dashboard UI implementation and skills synchronization. 3 sessions completed with 120k tokens used. 2 skills synced successfully.' },
  { id: 'rpt-002', type: 'daily' as const, date: '2026-02-28', status: 'completed' as const, summary: 'Productive day with 4 sessions across 2 projects. moyin-engine received major component updates. Token usage was within budget at 170k. No errors reported.' },
  { id: 'rpt-003', type: 'weekly' as const, date: '2026-02-24', status: 'completed' as const, summary: 'Week 9 summary: 28 sessions, 890k tokens consumed. Skills uptime 99.2%. 12 issues resolved across all projects. Sprint velocity increased by 15% compared to previous week.' },
  { id: 'rpt-004', type: 'sprint' as const, date: '2026-02-17', status: 'completed' as const, summary: 'Sprint 4 retrospective: 142 sessions total, 1.25M tokens. Delivered skills-switch MVP, dashboard prototype, and 34 issue resolutions. Team velocity: 87 story points.' },
  { id: 'rpt-005', type: 'weekly' as const, date: '2026-02-17', status: 'completed' as const, summary: 'Week 8 summary: 32 sessions, 1.1M tokens. Major milestone: skills-switch beta release. 8 new skills integrated. Performance metrics all green.' },
  { id: 'rpt-006', type: 'daily' as const, date: '2026-02-27', status: 'completed' as const, summary: 'Focus on code review and documentation. 2 sessions, 81k tokens. Updated project-context-keeper skill with new caching logic. All tests passing.' },
];

const KANBAN_DATA = {
  todo: [
    { id: 'task-01', title: 'Add skill dependency graph', tags: ['feature', 'skills'], priority: 'high' as const },
    { id: 'task-02', title: 'Implement session replay', tags: ['feature'], priority: 'medium' as const },
    { id: 'task-03', title: 'Add export to CSV for reports', tags: ['enhancement'], priority: 'low' as const },
    { id: 'task-04', title: 'Mobile responsive sidebar', tags: ['ui'], priority: 'high' as const },
  ],
  inProgress: [
    { id: 'task-05', title: 'Dashboard analytics charts', tags: ['feature', 'ui'], priority: 'high' as const },
    { id: 'task-06', title: 'Real-time skill sync status', tags: ['feature'], priority: 'medium' as const },
    { id: 'task-07', title: 'Notification system integration', tags: ['feature'], priority: 'medium' as const },
  ],
  done: [
    { id: 'task-08', title: 'Session management CRUD', tags: ['feature'], priority: 'high' as const },
    { id: 'task-09', title: 'Skills toggle on/off', tags: ['feature', 'skills'], priority: 'high' as const },
    { id: 'task-10', title: 'Report generation pipeline', tags: ['feature'], priority: 'medium' as const },
    { id: 'task-11', title: 'Dark mode theme system', tags: ['ui'], priority: 'low' as const },
    { id: 'task-12', title: 'Kanban board layout', tags: ['ui'], priority: 'medium' as const },
  ],
};

// ---------------------------------------------------------------------------
// Navigation Configuration
// ---------------------------------------------------------------------------

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    icon: <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    id: 'sessions',
    icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    id: 'skills',
    icon: <Puzzle className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    id: 'reports',
    icon: <FileBarChart className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    id: 'kanban',
    icon: <ClipboardList className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    id: 'settings',
    icon: <Settings className="w-5 h-5" strokeWidth={1.5} />,
  },
];

// ---------------------------------------------------------------------------
// Page transition variants
// ---------------------------------------------------------------------------

const pageVariants = {
  initial: { opacity: 0, x: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -20, filter: 'blur(4px)' },
};

// ---------------------------------------------------------------------------
// Sub-Page Components
// ---------------------------------------------------------------------------

function DashboardPage() {
  const { t } = useLocale();
  const dd = t.demos.demoDashboard;
  const maxSessions = Math.max(...SESSION_TREND.map((d) => d.sessions));
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <>
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {STAT_CARDS.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
            whileHover={{ y: -4 }}
            className={`glass-card p-5 border-l-4 ${card.borderColor} group relative overflow-hidden`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  {card.icon}
                </div>
                <span className="text-xs font-medium text-moyin-text-hint uppercase tracking-wider">{dd.statLabels[card.key]}</span>
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="xl:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-moyin-text-primary">{dd.sessionTrends}</h3>
              <p className="text-xs text-moyin-text-hint mt-0.5">{dd.last7days}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-moyin-text-muted">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-moyin-pink/60 to-moyin-purple/60" />
              {dd.sessions}
            </div>
          </div>

          <div className="relative h-48">
            <svg viewBox="0 0 700 200" className="w-full h-full" preserveAspectRatio="none">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1="40" y1={20 + (1 - ratio) * 160}
                  x2="680" y2={20 + (1 - ratio) * 160}
                  stroke="rgba(255,255,255,0.04)" strokeWidth="1"
                />
              ))}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <text
                  key={`label-${ratio}`} x="32" y={24 + (1 - ratio) * 160}
                  textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace"
                >
                  {Math.round(maxSessions * ratio)}
                </text>
              ))}
              {SESSION_TREND.map((d, i) => {
                const barWidth = 56;
                const gap = (640 - barWidth * 7) / 6;
                const x = 50 + i * (barWidth + gap);
                const barHeight = (d.sessions / maxSessions) * 160;
                const y = 180 - barHeight;
                const isHovered = hoveredBar === i;
                return (
                  <g key={d.dayKey}>
                    <rect x={x} y={20} width={barWidth} height={160} fill="transparent"
                      onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    <motion.rect x={x} width={barWidth} rx="6" ry="6" fill="url(#barGradient)"
                      initial={{ y: 180, height: 0 }}
                      animate={{ y, height: barHeight, opacity: isHovered ? 1 : 0.75 }}
                      transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                    />
                    {isHovered && (
                      <g>
                        <rect x={x + barWidth / 2 - 22} y={y - 28} width="44" height="22" rx="6"
                          fill="rgba(26,22,37,0.9)" stroke="rgba(255,192,211,0.3)" strokeWidth="1"
                        />
                        <text x={x + barWidth / 2} y={y - 13} textAnchor="middle" fill="#ffc0d3"
                          fontSize="11" fontWeight="bold" fontFamily="monospace"
                        >
                          {d.sessions}
                        </text>
                      </g>
                    )}
                    <text x={x + barWidth / 2} y={198} textAnchor="middle" fill="rgba(255,255,255,0.4)"
                      fontSize="11" fontFamily="sans-serif"
                    >
                      {dd.days[d.dayKey]}
                    </text>
                  </g>
                );
              })}
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-xs font-bold text-moyin-text-hint uppercase tracking-widest mb-5">{dd.quickInsights}</h3>
          <ul className="space-y-5">
            <li className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-sm text-moyin-text-primary">{dd.completionRate}</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">{dd.thisWeek}</span>
              </div>
              <span className="text-2xl font-bold text-moyin-text-primary font-mono">87%</span>
            </li>
            <li className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-sm text-moyin-text-primary">{dd.tasks}</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">{dd.todoDoingDone}</span>
              </div>
              <span className="text-2xl font-bold text-moyin-text-primary font-mono">5/3/34</span>
            </li>
            <li className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <div>
                <span className="text-sm text-moyin-text-primary">{dd.errorRate}</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">{dd.last24h}</span>
              </div>
              <span className="text-2xl font-bold text-emerald-400 font-mono">0.3%</span>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <span className="text-sm text-moyin-text-primary">{dd.uptime}</span>
                <span className="block text-[10px] text-moyin-text-muted uppercase">{dd.systemHealth}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-2xl font-bold text-emerald-400 font-mono">99.9%</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </>
  );
}

function SessionsPage() {
  const { t } = useLocale();
  const dd = t.demos.demoDashboard;
  const [sessions, setSessions] = useState(SESSIONS_DATA);

  const toggleSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (s.status === 'active') return { ...s, status: 'paused' as const };
        if (s.status === 'paused') return { ...s, status: 'active' as const };
        return s;
      })
    );
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'paused': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'completed': return 'text-moyin-text-muted bg-white/[0.03] border-white/10';
      default: return 'text-moyin-text-muted bg-white/[0.03] border-white/10';
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-moyin-text-primary">Dev Sessions</h2>
          <p className="text-xs text-moyin-text-hint mt-1">Manage and monitor your development sessions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-sm !px-4 !py-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          New Session
        </motion.button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: dd.sessionsPage.active, count: sessions.filter((s) => s.status === 'active').length, color: 'text-emerald-400' },
          { label: dd.sessionsPage.paused, count: sessions.filter((s) => s.status === 'paused').length, color: 'text-yellow-400' },
          { label: dd.sessionsPage.completed, count: sessions.filter((s) => s.status === 'completed').length, color: 'text-moyin-text-secondary' },
          { label: dd.sessionsPage.totalTokens, count: `${(sessions.reduce((a, s) => a + s.tokens, 0) / 1000).toFixed(0)}k`, color: 'text-moyin-pink' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 text-center"
          >
            <div className={`text-2xl font-bold font-mono ${item.color}`}>{item.count}</div>
            <div className="text-[10px] text-moyin-text-muted uppercase tracking-wider mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {[dd.sessionsPage.tableHeaders.sessionId, dd.sessionsPage.tableHeaders.project, dd.sessionsPage.tableHeaders.startTime, dd.sessionsPage.tableHeaders.duration, dd.sessionsPage.tableHeaders.tokens, dd.sessionsPage.tableHeaders.status, dd.sessionsPage.tableHeaders.action].map((h) => (
                  <th key={h} className="text-left text-[10px] font-bold text-moyin-text-muted uppercase tracking-wider px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, i) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.04 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-mono text-moyin-accent">{session.id}</td>
                  <td className="px-5 py-3.5 text-sm text-moyin-text-primary">{session.project}</td>
                  <td className="px-5 py-3.5 text-xs font-mono text-moyin-text-hint">{session.startTime}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-moyin-text-secondary">{session.duration}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-moyin-text-secondary">{session.tokens.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${statusColor(session.status)}`}>
                      {session.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                      {session.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {session.status !== 'completed' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSession(session.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                          session.status === 'active'
                            ? 'text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10'
                            : 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
                        }`}
                      >
                        {session.status === 'active' ? dd.sessionsPage.pause : dd.sessionsPage.resume}
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}

function SkillsPage() {
  const { t } = useLocale();
  const dd = t.demos.demoDashboard;
  const [skills, setSkills] = useState(SKILLS_LIST);
  const [syncing, setSyncing] = useState(false);

  const toggleSkill = (name: string) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name !== name) return s;
        const newEnabled = !s.enabled;
        return {
          ...s,
          enabled: newEnabled,
          status: newEnabled ? ('active' as const) : ('inactive' as const),
          lastSync: newEnabled ? 'just now' : s.lastSync,
        };
      })
    );
  };

  const handleSyncAll = () => {
    setSyncing(true);
    setSkills((prev) =>
      prev.map((s) => (s.enabled ? { ...s, status: 'syncing' as const, lastSync: 'syncing...' } : s))
    );
    setTimeout(() => {
      setSkills((prev) =>
        prev.map((s) => (s.enabled ? { ...s, status: 'active' as const, lastSync: 'just now' } : s))
      );
      setSyncing(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-moyin-text-primary">Skills Monitor</h2>
            <p className="text-xs text-moyin-text-hint mt-1">Toggle and sync your Claude Code skills</p>
          </div>
          <div className="flex items-center gap-2 bg-moyin-dark-light/60 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold text-emerald-400 tracking-wider">LIVE</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSyncAll}
          disabled={syncing}
          className="btn-primary text-sm !px-4 !py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} strokeWidth={2} />
          {syncing ? dd.skillsPage.syncing : dd.skillsPage.syncAll}
        </motion.button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: dd.skillsPage.enabled, count: skills.filter((s) => s.enabled).length, color: 'text-emerald-400' },
          { label: dd.skillsPage.disabled, count: skills.filter((s) => !s.enabled).length, color: 'text-moyin-text-muted' },
          { label: dd.skillsPage.syncingStatus, count: skills.filter((s) => s.status === 'syncing').length, color: 'text-yellow-400' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 text-center"
          >
            <div className={`text-2xl font-bold font-mono ${item.color}`}>{item.count}</div>
            <div className="text-[10px] text-moyin-text-muted uppercase tracking-wider mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Skills cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
            className={`relative p-5 rounded-2xl border backdrop-blur-sm overflow-hidden group transition-all duration-300 ${
              skill.status === 'active'
                ? 'bg-gradient-to-br from-moyin-pink/5 to-moyin-purple/10 border-moyin-pink/20 shadow-[0_0_20px_rgba(255,192,211,0.05)]'
                : skill.status === 'syncing'
                ? 'bg-gradient-to-br from-yellow-500/5 to-orange-500/10 border-yellow-500/20'
                : 'bg-white/[0.03] border-white/[0.06] opacity-60 hover:opacity-100'
            }`}
          >
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

              {/* Toggle switch */}
              <button
                onClick={() => toggleSkill(skill.name)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                  skill.enabled
                    ? 'bg-gradient-to-r from-moyin-pink/80 to-moyin-purple/80'
                    : 'bg-white/10'
                }`}
              >
                <motion.div
                  animate={{ x: skill.enabled ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04] flex justify-between items-center pl-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-mono text-moyin-text-muted">
                {dd.skillsPage.lastSync} {skill.lastSync}
              </span>
              <span
                className={`text-[10px] font-mono font-bold tracking-wider px-2 py-1 rounded border uppercase ${
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
          </motion.div>
        ))}
      </div>
    </>
  );
}

function ReportsPage() {
  const { t } = useLocale();
  const dd = t.demos.demoDashboard;
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const typeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'weekly': return 'text-moyin-purple bg-moyin-purple/10 border-moyin-purple/30';
      case 'sprint': return 'text-moyin-pink bg-moyin-pink/10 border-moyin-pink/30';
      default: return 'text-moyin-text-muted bg-white/[0.03] border-white/10';
    }
  };

  const statusIcon = (status: string) => {
    if (status === 'generating') {
      return <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />;
    }
    return <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-moyin-text-primary">Reports</h2>
          <p className="text-xs text-moyin-text-hint mt-1">Generated daily, weekly, and sprint reports</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-sm !px-4 !py-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Generate Report
        </motion.button>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-6">
        {[dd.reportsPage.all, dd.reportsPage.daily, dd.reportsPage.weekly, dd.reportsPage.sprint].map((filter) => (
          <button
            key={filter}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors text-moyin-text-secondary border-white/10 hover:border-moyin-pink/30 hover:text-moyin-pink-light"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        {REPORTS_DATA.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
          >
            <button
              onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
              className="w-full glass-card p-5 text-left hover:border-moyin-pink/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${typeColor(report.type)}`}>
                    {report.type}
                  </span>
                  <div>
                    <span className="text-sm font-medium text-moyin-text-primary">{report.id}</span>
                    <span className="block text-xs text-moyin-text-hint font-mono mt-0.5">{report.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {statusIcon(report.status)}
                    <span className={`text-xs font-medium ${report.status === 'generating' ? 'text-yellow-400' : 'text-emerald-400'}`}>
                      {report.status}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-moyin-text-muted transition-transform duration-200 ${expandedReport === report.id ? 'rotate-180' : ''}`}
                    strokeWidth={2}
                  />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expandedReport === report.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mx-2 p-4 rounded-b-2xl bg-moyin-dark-light/30 border border-t-0 border-white/[0.04]">
                    <h4 className="text-xs font-bold text-moyin-text-hint uppercase tracking-wider mb-2">Summary</h4>
                    <p className="text-sm text-moyin-text-secondary leading-relaxed">{report.summary}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="text-xs text-moyin-accent hover:text-moyin-purple transition-colors">View Full Report</button>
                      <span className="text-moyin-text-muted">|</span>
                      <button className="text-xs text-moyin-text-muted hover:text-moyin-text-secondary transition-colors">Export PDF</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function KanbanPage() {
  const { t } = useLocale();
  const dd = t.demos.demoDashboard;
  const columns = [
    { id: 'todo', title: dd.kanbanPage.todo, items: KANBAN_DATA.todo, headerColor: 'text-blue-400', dotColor: 'bg-blue-400', borderColor: 'border-blue-500/30' },
    { id: 'inProgress', title: dd.kanbanPage.inProgress, items: KANBAN_DATA.inProgress, headerColor: 'text-yellow-400', dotColor: 'bg-yellow-400', borderColor: 'border-yellow-500/30' },
    { id: 'done', title: dd.kanbanPage.done, items: KANBAN_DATA.done, headerColor: 'text-emerald-400', dotColor: 'bg-emerald-400', borderColor: 'border-emerald-500/30' },
  ];

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default: return 'text-moyin-text-muted bg-white/[0.03] border-white/10';
    }
  };

  const tagColor = (tag: string) => {
    switch (tag) {
      case 'feature': return 'text-moyin-purple bg-moyin-purple/10';
      case 'ui': return 'text-moyin-pink bg-moyin-pink/10';
      case 'skills': return 'text-blue-400 bg-blue-500/10';
      case 'enhancement': return 'text-cyan-400 bg-cyan-500/10';
      default: return 'text-moyin-text-muted bg-white/[0.03]';
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-moyin-text-primary">Kanban Board</h2>
          <p className="text-xs text-moyin-text-hint mt-1">Track project tasks across workflow stages</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-sm !px-4 !py-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Add Task
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {columns.map((col, colIdx) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIdx * 0.1 }}
            className="glass-card p-4"
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <h3 className={`text-sm font-bold ${col.headerColor}`}>{col.title}</h3>
              </div>
              <span className="text-xs font-mono text-moyin-text-muted bg-white/[0.04] px-2 py-0.5 rounded">
                {col.items.length}
              </span>
            </div>

            {/* Task cards */}
            <div className="space-y-3">
              {col.items.map((task, taskIdx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + colIdx * 0.1 + taskIdx * 0.05 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className={`p-3.5 rounded-xl border bg-moyin-dark/50 hover:bg-moyin-dark-light/40 transition-colors cursor-default ${col.borderColor} border-opacity-50 hover:border-opacity-100`}
                >
                  <p className="text-sm text-moyin-text-primary font-medium mb-2.5">{task.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {task.tags.map((tag) => (
                        <span key={tag} className={`text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${tagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${priorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function SettingsPage() {
  const { t } = useLocale();
  const dd = t.demos.demoDashboard;
  const [settings, setSettings] = useState({
    autoSync: true,
    darkMode: true,
    notifications: true,
    autoCommit: false,
    language: 'en',
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (key === 'language') return;
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleItems: { key: keyof typeof settings; label: string; description: string; locked?: boolean }[] = [
    { key: 'autoSync', label: dd.settingsPage.autoSyncSkills, description: dd.settingsPage.autoSyncSkillsDesc },
    { key: 'darkMode', label: dd.settingsPage.darkMode, description: dd.settingsPage.darkModeDesc, locked: true },
    { key: 'notifications', label: dd.settingsPage.notifications, description: dd.settingsPage.notificationsDesc },
    { key: 'autoCommit', label: dd.settingsPage.autoCommit, description: dd.settingsPage.autoCommitDesc },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ja', label: '\u65E5\u672C\u8A9E' },
    { code: 'zh-tw', label: '\u7E41\u9AD4\u4E2D\u6587' },
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-moyin-text-primary">Settings</h2>
        <p className="text-xs text-moyin-text-hint mt-1">Configure your dashboard preferences</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        {/* Toggle settings */}
        {toggleItems.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-moyin-text-primary">{item.label}</span>
                  {item.locked && (
                    <span className="text-[9px] font-bold text-moyin-text-muted uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                      locked
                    </span>
                  )}
                </div>
                <p className="text-xs text-moyin-text-hint mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => !item.locked && toggleSetting(item.key)}
                disabled={item.locked}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                  item.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } ${
                  settings[item.key]
                    ? 'bg-gradient-to-r from-moyin-pink/80 to-moyin-purple/80'
                    : 'bg-white/10'
                }`}
              >
                <motion.div
                  animate={{ x: settings[item.key] ? 20 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Language selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: toggleItems.length * 0.06 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <span className="text-sm font-medium text-moyin-text-primary">{dd.settingsPage.language}</span>
              <p className="text-xs text-moyin-text-hint mt-1">Select the display language for the dashboard interface</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
              className="bg-moyin-dark-light border border-white/10 rounded-lg px-3 py-2 text-sm text-moyin-text-primary focus:border-moyin-pink/40 focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-moyin-dark-light">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (toggleItems.length + 1) * 0.06 }}
          className="glass-card p-5 border-red-500/20"
        >
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-moyin-text-primary">Reset all settings</span>
              <p className="text-xs text-moyin-text-hint mt-1">Restore all settings to their default values</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs font-medium px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Reset
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function MoyinDevDashboardDemoPage() {
  const { t } = useLocale();
  const dd = t.demos.demoDashboard;
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage />;
      case 'sessions': return <SessionsPage />;
      case 'skills': return <SkillsPage />;
      case 'reports': return <ReportsPage />;
      case 'kanban': return <KanbanPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <section className="min-h-screen">
      {/* Header - full width */}
      <div className="max-w-[1440px] mx-auto px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackLink />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl border border-white/10 hover:border-moyin-pink/30 transition-colors text-moyin-text-secondary hover:text-moyin-pink"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={2} />
                )}
              </button>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  <span className="gradient-text">{dd.title}</span>
                </h1>
                <p className="text-moyin-text-hint text-sm mt-1">{dd.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                {t.demos.shared.mockDataBadge}
              </span>
              <a
                href="https://github.com/AtsushiHarimoto/moyin-dev-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-moyin-text-secondary hover:text-moyin-pink-light border border-white/10 hover:border-moyin-pink/30 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                {t.demos.shared.source}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sidebar + Main Content Layout */}
      <div className="max-w-[1440px] mx-auto px-6 pb-20">
        <div className="flex gap-6 relative">
          {/* Mobile overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <motion.aside
            initial={false}
            className={`
              lg:sticky lg:top-6 lg:self-start
              fixed top-0 left-0 bottom-0 z-50
              lg:relative lg:z-auto
              w-[260px] shrink-0
              glass-card
              transition-transform duration-300 ease-in-out
              lg:translate-x-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="p-4">
              {/* Sidebar title for mobile */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <span className="text-xs font-bold text-moyin-text-hint uppercase tracking-widest">{dd.navigation}</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-moyin-text-muted hover:text-moyin-pink transition-colors">
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              {/* Nav section label */}
              <span className="hidden lg:block text-[10px] font-bold text-moyin-text-muted uppercase tracking-widest px-3 mb-3">
                {dd.navigation}
              </span>

              {/* Nav items */}
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                        isActive
                          ? 'text-moyin-pink-light bg-gradient-to-r from-moyin-pink/10 to-moyin-purple/10 border border-moyin-pink/20'
                          : 'text-moyin-text-secondary hover:text-moyin-text-primary hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-moyin-pink shadow-[0_0_8px_rgba(255,192,211,0.4)]"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className={isActive ? 'text-moyin-pink' : 'text-moyin-text-muted group-hover:text-moyin-text-secondary'}>
                        {item.icon}
                      </span>
                      {dd.navItems[item.id]}
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.04]">
                <div className="px-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{dd.systemOnline}</span>
                  </div>
                  <p className="text-[10px] text-moyin-text-muted font-mono">v0.3.0-beta</p>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
}
