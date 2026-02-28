'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const MOCK_USERS = [
  { user_id: 'usr_001', username: 'admin', status: 'active' },
  { user_id: 'usr_002', username: 'dev_team', status: 'active' },
  { user_id: 'usr_003', username: 'guest_reader', status: 'suspended' },
];

const MOCK_TOKENS = [
  { token_id: 'tok_001', token_hash: 'sha256:a3f8…e21b', user_id: 'usr_001', status: 'active' },
  { token_id: 'tok_002', token_hash: 'sha256:7c04…f9d3', user_id: 'usr_001', status: 'active' },
  { token_id: 'tok_003', token_hash: 'sha256:1b9e…4a7c', user_id: 'usr_002', status: 'active' },
  { token_id: 'tok_004', token_hash: 'sha256:e5d2…8f1a', user_id: 'usr_002', status: 'revoked' },
  { token_id: 'tok_005', token_hash: 'sha256:9af1…c3b8', user_id: 'usr_003', status: 'expired' },
];

const MOCK_STATS = [
  { provider: 'Google', model: 'gemini-2.0-flash', request_count: 1_284, total_tokens: 482_910, avg_latency_ms: 320, p95_latency_ms: 890 },
  { provider: 'OpenAI', model: 'gpt-4o', request_count: 876, total_tokens: 1_023_450, avg_latency_ms: 1_240, p95_latency_ms: 3_420 },
  { provider: 'Anthropic', model: 'claude-sonnet-4-20250514', request_count: 2_103, total_tokens: 2_480_000, avg_latency_ms: 980, p95_latency_ms: 2_150 },
  { provider: 'Ollama', model: 'llama3:8b', request_count: 342, total_tokens: 95_200, avg_latency_ms: 180, p95_latency_ms: 450 },
];

const LOG_MESSAGES: Array<{ level: 'INFO' | 'WARN' | 'ERROR'; message: string }> = [
  { level: 'INFO', message: '[gateway] Server started on port 8080' },
  { level: 'INFO', message: '[router] Registered provider: google/gemini-2.0-flash' },
  { level: 'INFO', message: '[router] Registered provider: openai/gpt-4o' },
  { level: 'INFO', message: '[router] Registered provider: anthropic/claude-sonnet-4-20250514' },
  { level: 'INFO', message: '[router] Registered provider: ollama/llama3:8b' },
  { level: 'WARN', message: '[rate-limit] usr_002 approaching token limit (92% used)' },
  { level: 'INFO', message: '[request] usr_001 -> google/gemini-2.0-flash (328ms)' },
  { level: 'INFO', message: '[request] usr_002 -> openai/gpt-4o (1,241ms)' },
  { level: 'ERROR', message: '[provider] ollama/llama3:8b connection timeout after 5000ms' },
  { level: 'INFO', message: '[request] usr_001 -> anthropic/claude-sonnet-4-20250514 (987ms)' },
  { level: 'WARN', message: '[auth] Invalid token attempt from 192.168.1.55' },
  { level: 'INFO', message: '[request] usr_002 -> google/gemini-2.0-flash (298ms)' },
  { level: 'INFO', message: '[cache] Hit ratio: 34.2% (last 5 min)' },
  { level: 'ERROR', message: '[provider] openai/gpt-4o rate limit exceeded — retrying in 2s' },
  { level: 'INFO', message: '[request] usr_001 -> openai/gpt-4o (retry success, 1,890ms)' },
  { level: 'INFO', message: '[health] All providers healthy' },
  { level: 'WARN', message: '[cost] Daily budget 78% consumed ($15.60 / $20.00)' },
  { level: 'INFO', message: '[request] usr_003 -> google/gemini-2.0-flash (312ms)' },
  { level: 'ERROR', message: '[auth] usr_003 token expired — request rejected' },
  { level: 'INFO', message: '[stats] Hourly report: 142 requests, avg 780ms, 0.3% error rate' },
];

// ---------------------------------------------------------------------------
// Tab type
// ---------------------------------------------------------------------------

type Tab = 'Users' | 'Tokens' | 'Stats' | 'Console';
const TABS: Tab[] = ['Users', 'Tokens', 'Stats', 'Console'];

// ---------------------------------------------------------------------------
// Level badge colors
// ---------------------------------------------------------------------------

function levelColor(level: string) {
  switch (level) {
    case 'INFO':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'WARN':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'ERROR':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

function statusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'suspended':
    case 'revoked':
      return 'bg-red-500/20 text-red-400';
    case 'expired':
      return 'bg-yellow-500/20 text-yellow-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MoyinGatewayDemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Users');
  const [keyword, setKeyword] = useState('');

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
              <span className="gradient-text">Moyin-Gateway</span>
              <span className="text-moyin-text-secondary text-lg ml-3 font-normal">Admin Console</span>
            </h1>
            <p className="text-moyin-text-hint text-sm mt-1">Multi-provider LLM gateway management interface</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Demo badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Demo &mdash; Mock Data
            </span>
            {/* GitHub link */}
            <a
              href="https://github.com/AtsushiHarimoto/moyin-gateway"
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

      {/* Console Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="glass-card overflow-hidden"
      >
        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.06]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-moyin-pink-light'
                  : 'text-moyin-text-hint hover:text-moyin-text-secondary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="gateway-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-moyin-pink to-moyin-purple"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'Users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <UsersTab />
              </motion.div>
            )}
            {activeTab === 'Tokens' && (
              <motion.div
                key="tokens"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <TokensTab />
              </motion.div>
            )}
            {activeTab === 'Stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <StatsTab />
              </motion.div>
            )}
            {activeTab === 'Console' && (
              <motion.div
                key="console"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ConsoleTab keyword={keyword} setKeyword={setKeyword} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Users Tab
// ---------------------------------------------------------------------------

function UsersTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-moyin-text-primary mb-4">User Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">User ID</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Username</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user, i) => (
              <motion.tr
                key={user.user_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{user.user_id}</td>
                <td className="py-3 px-4 text-moyin-text-primary">{user.username}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-xs text-moyin-text-hint hover:text-red-400 transition-colors cursor-not-allowed opacity-60">
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tokens Tab
// ---------------------------------------------------------------------------

function TokensTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-moyin-text-primary mb-4">Token Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Token ID</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Hash</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">User</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TOKENS.map((token, i) => (
              <motion.tr
                key={token.token_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{token.token_id}</td>
                <td className="py-3 px-4 font-mono text-moyin-text-muted text-xs">{token.token_hash}</td>
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{token.user_id}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(token.status)}`}>
                    {token.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-xs text-moyin-text-hint hover:text-red-400 transition-colors cursor-not-allowed opacity-60">
                    Revoke
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stats Tab
// ---------------------------------------------------------------------------

function StatsTab() {
  const maxCount = Math.max(...MOCK_STATS.map((s) => s.request_count));

  return (
    <div>
      <h3 className="text-lg font-semibold text-moyin-text-primary mb-4">Provider / Model Statistics</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Provider</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Model</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Requests</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Total Tokens</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Avg Latency</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">P95 Latency</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STATS.map((stat, i) => (
              <motion.tr
                key={stat.provider}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4 text-moyin-text-primary font-medium">{stat.provider}</td>
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{stat.model}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-moyin-text-primary font-mono">{stat.request_count.toLocaleString()}</span>
                    <div className="hidden sm:block w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-moyin-pink/60 to-moyin-purple/60"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.request_count / maxCount) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{stat.total_tokens.toLocaleString()}</td>
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{stat.avg_latency_ms} ms</td>
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{stat.p95_latency_ms} ms</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Console Tab
// ---------------------------------------------------------------------------

function ConsoleTab({
  keyword,
  setKeyword,
}: {
  keyword: string;
  setKeyword: (v: string) => void;
}) {
  const [visibleLogs, setVisibleLogs] = useState<Array<{ id: number; level: string; message: string; timestamp: string }>>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = useCallback(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [visibleLogs, scrollToBottom]);

  const startStream = useCallback(() => {
    if (isStreaming) return;
    setIsStreaming(true);
    indexRef.current = 0;
    setVisibleLogs([]);

    intervalRef.current = setInterval(() => {
      const logEntry = LOG_MESSAGES[indexRef.current % LOG_MESSAGES.length];
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setVisibleLogs((prev) => [
        ...prev,
        {
          id: Date.now() + indexRef.current,
          level: logEntry.level,
          message: logEntry.message,
          timestamp: ts,
        },
      ]);

      indexRef.current += 1;

      if (indexRef.current >= LOG_MESSAGES.length) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsStreaming(false);
      }
    }, 350);
  }, [isStreaming]);

  const stopStream = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  useEffect(() => {
    // Auto-start the stream on mount
    startStream();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLogs = keyword
    ? visibleLogs.filter((log) => log.message.toLowerCase().includes(keyword.toLowerCase()))
    : visibleLogs;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-moyin-text-primary">Console Logs</h3>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter by keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-3 py-1.5 text-sm bg-moyin-dark border border-white/10 rounded-lg text-moyin-text-primary placeholder:text-moyin-text-muted focus:outline-none focus:border-moyin-pink/40 transition-colors w-48"
          />
          <button
            onClick={isStreaming ? stopStream : startStream}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isStreaming
                ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            {isStreaming ? 'Stop Stream' : 'Replay Stream'}
          </button>
        </div>
      </div>

      {/* Log viewer */}
      <div className="bg-moyin-dark rounded-xl border border-white/[0.06] p-4 h-[420px] overflow-y-auto font-mono text-xs scrollbar-thin">
        {filteredLogs.length === 0 && (
          <div className="flex items-center justify-center h-full text-moyin-text-muted">
            {isStreaming ? 'Waiting for logs...' : 'No logs. Click "Replay Stream" to start.'}
          </div>
        )}
        {filteredLogs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-3 py-1.5 border-b border-white/[0.02] last:border-0"
          >
            <span className="text-moyin-text-muted shrink-0 w-16">{log.timestamp}</span>
            <span
              className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${levelColor(log.level)}`}
            >
              {log.level}
            </span>
            <span className="text-moyin-text-secondary break-all">{log.message}</span>
          </motion.div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
