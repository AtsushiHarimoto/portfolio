'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BackLink from '@/components/BackLink';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const INITIAL_USERS = [
  { user_id: 'usr_001', username: 'admin', status: 'active' },
  { user_id: 'usr_002', username: 'dev_team', status: 'active' },
  { user_id: 'usr_003', username: 'guest_reader', status: 'suspended' },
];

const INITIAL_TOKENS = [
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

interface Conversation {
  conversation_id: string;
  user: string;
  provider: string;
  model: string;
  message_count: number;
  created_at: string;
  status: 'active' | 'closed' | 'error';
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  { conversation_id: 'conv_001', user: 'admin', provider: 'Anthropic', model: 'claude-sonnet-4-20250514', message_count: 12, created_at: '2025-06-14 09:23', status: 'active' },
  { conversation_id: 'conv_002', user: 'dev_team', provider: 'OpenAI', model: 'gpt-4o', message_count: 8, created_at: '2025-06-14 10:05', status: 'active' },
  { conversation_id: 'conv_003', user: 'admin', provider: 'Google', model: 'gemini-2.0-flash', message_count: 24, created_at: '2025-06-13 15:42', status: 'closed' },
  { conversation_id: 'conv_004', user: 'guest_reader', provider: 'Ollama', model: 'llama3:8b', message_count: 3, created_at: '2025-06-14 11:18', status: 'error' },
  { conversation_id: 'conv_005', user: 'dev_team', provider: 'Anthropic', model: 'claude-sonnet-4-20250514', message_count: 16, created_at: '2025-06-14 08:00', status: 'active' },
];

interface Message {
  message_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tokens: number;
  timestamp: string;
}

const MOCK_MESSAGES_BY_CONV: Record<string, Message[]> = {
  conv_001: [
    { message_id: 'msg_001', role: 'system', content: 'You are a helpful coding assistant specializing in TypeScript and React.', tokens: 18, timestamp: '09:23:01' },
    { message_id: 'msg_002', role: 'user', content: 'How do I properly type a useReducer hook with discriminated unions in TypeScript?', tokens: 22, timestamp: '09:23:05' },
    { message_id: 'msg_003', role: 'assistant', content: 'Great question! When using useReducer with discriminated unions, you should define your action types using a union of interfaces, each with a distinct `type` property. Here is an example:\n\n```typescript\ntype Action =\n  | { type: "increment"; payload: number }\n  | { type: "reset" };\n```\n\nThen your reducer can use a switch statement on `action.type` with full type narrowing.', tokens: 156, timestamp: '09:23:08' },
    { message_id: 'msg_004', role: 'user', content: 'Can you show me a complete example with state typing as well?', tokens: 16, timestamp: '09:24:12' },
    { message_id: 'msg_005', role: 'assistant', content: 'Of course! Here is a complete example with both state and action typing:\n\n```typescript\ninterface State {\n  count: number;\n  lastAction: string;\n}\n\ntype Action =\n  | { type: "increment"; payload: number }\n  | { type: "decrement"; payload: number }\n  | { type: "reset" };\n\nfunction reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case "increment":\n      return { count: state.count + action.payload, lastAction: "increment" };\n    case "decrement":\n      return { count: state.count - action.payload, lastAction: "decrement" };\n    case "reset":\n      return { count: 0, lastAction: "reset" };\n  }\n}\n```', tokens: 248, timestamp: '09:24:16' },
    { message_id: 'msg_006', role: 'user', content: 'Perfect, thanks!', tokens: 6, timestamp: '09:25:00' },
  ],
  conv_002: [
    { message_id: 'msg_010', role: 'user', content: 'Explain the difference between server components and client components in Next.js 14.', tokens: 18, timestamp: '10:05:02' },
    { message_id: 'msg_011', role: 'assistant', content: 'In Next.js 14 (App Router), components are server components by default. They render on the server, can directly access databases and file systems, and ship zero JavaScript to the client.\n\nClient components are marked with "use client" at the top of the file. They run in the browser and can use React hooks like useState, useEffect, and event handlers.\n\nKey differences:\n- Server: no hooks, no browser APIs, smaller bundle\n- Client: interactive, has hooks, adds to JS bundle', tokens: 182, timestamp: '10:05:06' },
    { message_id: 'msg_012', role: 'user', content: 'When should I use "use client"?', tokens: 10, timestamp: '10:06:15' },
    { message_id: 'msg_013', role: 'assistant', content: 'Use "use client" only when you need interactivity or browser APIs. Common cases:\n\n1. Any component using useState, useEffect, useRef\n2. Components with onClick, onChange, or other event handlers\n3. Components using browser-only APIs (localStorage, window)\n4. Components using third-party libraries that require the browser\n\nKeep the "use client" boundary as low as possible in the component tree to maximize server rendering.', tokens: 142, timestamp: '10:06:18' },
  ],
  conv_003: [
    { message_id: 'msg_020', role: 'user', content: 'Write a Python function that finds all prime numbers up to N using the Sieve of Eratosthenes.', tokens: 24, timestamp: '15:42:01' },
    { message_id: 'msg_021', role: 'assistant', content: 'Here is an efficient implementation of the Sieve of Eratosthenes:\n\n```python\ndef sieve_of_eratosthenes(n: int) -> list[int]:\n    if n < 2:\n        return []\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, int(n**0.5) + 1):\n        if is_prime[i]:\n            for j in range(i*i, n + 1, i):\n                is_prime[j] = False\n    return [i for i, prime in enumerate(is_prime) if prime]\n```\n\nTime complexity: O(n log log n). Space: O(n).', tokens: 210, timestamp: '15:42:05' },
  ],
  conv_004: [
    { message_id: 'msg_030', role: 'user', content: 'Hello, can you help me debug a Docker issue?', tokens: 12, timestamp: '11:18:01' },
    { message_id: 'msg_031', role: 'assistant', content: 'Of course! Please share the error message or describe the issue you are encountering with Docker, and I will help you troubleshoot.', tokens: 32, timestamp: '11:18:04' },
    { message_id: 'msg_032', role: 'user', content: 'I get "connection refused" when trying to connect to my container on port 3000.', tokens: 18, timestamp: '11:19:00' },
  ],
  conv_005: [
    { message_id: 'msg_040', role: 'system', content: 'You are a senior software architect. Provide detailed technical analysis.', tokens: 14, timestamp: '08:00:01' },
    { message_id: 'msg_041', role: 'user', content: 'What are the trade-offs between microservices and a modular monolith?', tokens: 16, timestamp: '08:00:05' },
    { message_id: 'msg_042', role: 'assistant', content: 'This is an excellent architectural question. Here is a detailed comparison:\n\n**Microservices:**\n+ Independent deployment and scaling\n+ Technology diversity\n+ Team autonomy\n- Network complexity and latency\n- Distributed data management\n- Operational overhead (monitoring, tracing)\n\n**Modular Monolith:**\n+ Simpler deployment and debugging\n+ No network overhead between modules\n+ Easier transactions across boundaries\n- Requires strong module boundaries\n- Single deployment unit\n- Risk of module coupling over time\n\nMy recommendation: Start with a modular monolith and extract services when you have a clear need. Premature microservices is one of the most common architectural mistakes.', tokens: 286, timestamp: '08:00:12' },
  ],
};

// ---------------------------------------------------------------------------
// Tab type
// ---------------------------------------------------------------------------

type Tab = 'Users' | 'Tokens' | 'Stats' | 'Console' | 'Conversations' | 'Messages';
const TABS: Tab[] = ['Users', 'Tokens', 'Conversations', 'Messages', 'Stats', 'Console'];

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
    case 'error':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'closed':
      return 'bg-gray-500/20 text-gray-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

function roleBadgeColor(role: string) {
  switch (role) {
    case 'user':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'assistant':
      return 'bg-moyin-purple/20 text-purple-400 border-moyin-purple/30';
    case 'system':
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MoyinGatewayDemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Users');
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState(INITIAL_USERS);
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState<string>('conv_001');
  const [logLevelFilters, setLogLevelFilters] = useState<Record<'INFO' | 'WARN' | 'ERROR', boolean>>({
    INFO: true,
    WARN: true,
    ERROR: true,
  });

  return (
    <section className="section-container min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <BackLink />

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
        <div className="flex border-b border-white/[0.06] overflow-x-auto scrollbar-thin">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
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
                <UsersTab users={users} setUsers={setUsers} />
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
                <TokensTab tokens={tokens} setTokens={setTokens} users={users} />
              </motion.div>
            )}
            {activeTab === 'Conversations' && (
              <motion.div
                key="conversations"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ConversationsTab
                  conversations={conversations}
                  setConversations={setConversations}
                  users={users}
                  onViewMessages={(convId) => {
                    setSelectedConversation(convId);
                    setActiveTab('Messages');
                  }}
                />
              </motion.div>
            )}
            {activeTab === 'Messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <MessagesTab
                  conversations={conversations}
                  selectedConversation={selectedConversation}
                  setSelectedConversation={setSelectedConversation}
                />
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
                <ConsoleTab
                  keyword={keyword}
                  setKeyword={setKeyword}
                  logLevelFilters={logLevelFilters}
                  setLogLevelFilters={setLogLevelFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Users Tab (Enhanced with Create & Delete)
// ---------------------------------------------------------------------------

function UsersTab({
  users,
  setUsers,
}: {
  users: typeof INITIAL_USERS;
  setUsers: React.Dispatch<React.SetStateAction<typeof INITIAL_USERS>>;
}) {
  const [showForm, setShowForm] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleCreateUser = () => {
    if (!newUsername.trim()) return;
    const nextNum = String(users.length + 1).padStart(3, '0');
    const newUser = {
      user_id: `usr_${nextNum}`,
      username: newUsername.trim(),
      status: 'active',
    };
    setUsers((prev) => [...prev, newUser]);
    setNewUsername('');
    setShowForm(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.user_id !== userId));
    setConfirmDeleteId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-moyin-text-primary">User Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg border bg-moyin-pink/10 border-moyin-pink/30 text-moyin-pink-light hover:bg-moyin-pink/20 transition-all"
        >
          {showForm ? 'Cancel' : '+ Create User'}
        </button>
      </div>

      {/* Inline Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <input
                type="text"
                placeholder="Enter username..."
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateUser()}
                className="flex-1 px-3 py-2 text-sm bg-moyin-dark border border-white/10 rounded-lg text-moyin-text-primary placeholder:text-moyin-text-muted focus:outline-none focus:border-moyin-pink/40 transition-colors"
                autoFocus
              />
              <button
                onClick={handleCreateUser}
                disabled={!newUsername.trim()}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-moyin-pink to-moyin-purple text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {users.map((user, i) => (
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
                  {confirmDeleteId === user.user_id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-400">Confirm?</span>
                      <button
                        onClick={() => handleDeleteUser(user.user_id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors font-medium"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-xs text-moyin-text-hint hover:text-moyin-text-secondary transition-colors"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(user.user_id)}
                      className="text-xs text-moyin-text-hint hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-moyin-text-muted text-sm">
                  No users. Click &quot;Create User&quot; to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tokens Tab (Enhanced with Generate & Revoke)
// ---------------------------------------------------------------------------

function TokensTab({
  tokens,
  setTokens,
  users,
}: {
  tokens: typeof INITIAL_TOKENS;
  setTokens: React.Dispatch<React.SetStateAction<typeof INITIAL_TOKENS>>;
  users: typeof INITIAL_USERS;
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleGenerateToken = () => {
    if (!selectedUserId) return;
    const nextNum = String(tokens.length + 1).padStart(3, '0');
    const randomHash = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const randomHashEnd = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const newToken = {
      token_id: `tok_${nextNum}`,
      token_hash: `sha256:${randomHash}\u2026${randomHashEnd}`,
      user_id: selectedUserId,
      status: 'active',
    };
    setTokens((prev) => [...prev, newToken]);
    setSelectedUserId('');
    setShowForm(false);
  };

  const handleRevokeToken = (tokenId: string) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.token_id === tokenId && t.status === 'active'
          ? { ...t, status: 'revoked' }
          : t
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-moyin-text-primary">Token Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg border bg-moyin-pink/10 border-moyin-pink/30 text-moyin-pink-light hover:bg-moyin-pink/20 transition-all"
        >
          {showForm ? 'Cancel' : '+ Generate Token'}
        </button>
      </div>

      {/* Inline Generate Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-moyin-dark border border-white/10 rounded-lg text-moyin-text-primary focus:outline-none focus:border-moyin-pink/40 transition-colors"
              >
                <option value="" className="bg-moyin-dark">Select user...</option>
                {users.filter((u) => u.status === 'active').map((u) => (
                  <option key={u.user_id} value={u.user_id} className="bg-moyin-dark">
                    {u.username} ({u.user_id})
                  </option>
                ))}
              </select>
              <button
                onClick={handleGenerateToken}
                disabled={!selectedUserId}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-moyin-pink to-moyin-purple text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Generate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {tokens.map((token, i) => (
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
                  {token.status === 'active' ? (
                    <button
                      onClick={() => handleRevokeToken(token.token_id)}
                      className="text-xs text-moyin-text-hint hover:text-red-400 transition-colors"
                    >
                      Revoke
                    </button>
                  ) : (
                    <span className="text-xs text-moyin-text-muted">--</span>
                  )}
                </td>
              </motion.tr>
            ))}
            {tokens.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-moyin-text-muted text-sm">
                  No tokens. Click &quot;Generate Token&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Conversations Tab
// ---------------------------------------------------------------------------

function ConversationsTab({
  conversations,
  setConversations,
  users,
  onViewMessages,
}: {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  users: typeof INITIAL_USERS;
  onViewMessages: (convId: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [formUser, setFormUser] = useState('');
  const [formProvider, setFormProvider] = useState('');
  const [formModel, setFormModel] = useState('');

  const providerModels: Record<string, string[]> = {
    Anthropic: ['claude-sonnet-4-20250514', 'claude-opus-4-20250514'],
    OpenAI: ['gpt-4o', 'gpt-4o-mini'],
    Google: ['gemini-2.0-flash', 'gemini-2.5-pro'],
    Ollama: ['llama3:8b', 'mistral:7b'],
  };

  const handleCreateConversation = () => {
    if (!formUser || !formProvider || !formModel) return;
    const nextNum = String(conversations.length + 1).padStart(3, '0');
    const now = new Date();
    const created = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newConv: Conversation = {
      conversation_id: `conv_${nextNum}`,
      user: formUser,
      provider: formProvider,
      model: formModel,
      message_count: 0,
      created_at: created,
      status: 'active',
    };
    setConversations((prev) => [...prev, newConv]);
    setFormUser('');
    setFormProvider('');
    setFormModel('');
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-moyin-text-primary">Conversations</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1.5 text-xs font-medium rounded-lg border bg-moyin-pink/10 border-moyin-pink/30 text-moyin-pink-light hover:bg-moyin-pink/20 transition-all"
        >
          {showForm ? 'Cancel' : '+ New Conversation'}
        </button>
      </div>

      {/* Inline Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <select
                value={formUser}
                onChange={(e) => setFormUser(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-moyin-dark border border-white/10 rounded-lg text-moyin-text-primary focus:outline-none focus:border-moyin-pink/40 transition-colors"
              >
                <option value="" className="bg-moyin-dark">Select user...</option>
                {users.filter((u) => u.status === 'active').map((u) => (
                  <option key={u.user_id} value={u.username} className="bg-moyin-dark">
                    {u.username}
                  </option>
                ))}
              </select>
              <select
                value={formProvider}
                onChange={(e) => {
                  setFormProvider(e.target.value);
                  setFormModel('');
                }}
                className="flex-1 px-3 py-2 text-sm bg-moyin-dark border border-white/10 rounded-lg text-moyin-text-primary focus:outline-none focus:border-moyin-pink/40 transition-colors"
              >
                <option value="" className="bg-moyin-dark">Select provider...</option>
                {Object.keys(providerModels).map((p) => (
                  <option key={p} value={p} className="bg-moyin-dark">{p}</option>
                ))}
              </select>
              <select
                value={formModel}
                onChange={(e) => setFormModel(e.target.value)}
                disabled={!formProvider}
                className="flex-1 px-3 py-2 text-sm bg-moyin-dark border border-white/10 rounded-lg text-moyin-text-primary focus:outline-none focus:border-moyin-pink/40 transition-colors disabled:opacity-40"
              >
                <option value="" className="bg-moyin-dark">Select model...</option>
                {formProvider && providerModels[formProvider]?.map((m) => (
                  <option key={m} value={m} className="bg-moyin-dark">{m}</option>
                ))}
              </select>
              <button
                onClick={handleCreateConversation}
                disabled={!formUser || !formProvider || !formModel}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-moyin-pink to-moyin-purple text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Create
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Conv ID</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">User</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Provider / Model</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Messages</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Created</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-moyin-text-hint font-medium text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conv, i) => (
              <motion.tr
                key={conv.conversation_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{conv.conversation_id}</td>
                <td className="py-3 px-4 text-moyin-text-primary">{conv.user}</td>
                <td className="py-3 px-4">
                  <span className="text-moyin-text-primary text-xs">{conv.provider}</span>
                  <span className="text-moyin-text-muted text-xs"> / </span>
                  <span className="font-mono text-moyin-text-secondary text-xs">{conv.model}</span>
                </td>
                <td className="py-3 px-4 font-mono text-moyin-text-secondary text-xs">{conv.message_count}</td>
                <td className="py-3 px-4 text-moyin-text-secondary text-xs">{conv.created_at}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(conv.status)}`}>
                    {conv.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {MOCK_MESSAGES_BY_CONV[conv.conversation_id] ? (
                    <button
                      onClick={() => onViewMessages(conv.conversation_id)}
                      className="text-xs text-moyin-pink-light hover:text-moyin-pink transition-colors"
                    >
                      View Messages
                    </button>
                  ) : (
                    <span className="text-xs text-moyin-text-muted">No messages</span>
                  )}
                </td>
              </motion.tr>
            ))}
            {conversations.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-moyin-text-muted text-sm">
                  No conversations. Click &quot;New Conversation&quot; to start one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Messages Tab
// ---------------------------------------------------------------------------

function MessagesTab({
  conversations,
  selectedConversation,
  setSelectedConversation,
}: {
  conversations: Conversation[];
  selectedConversation: string;
  setSelectedConversation: (id: string) => void;
}) {
  const messages = MOCK_MESSAGES_BY_CONV[selectedConversation] || [];
  const currentConv = conversations.find((c) => c.conversation_id === selectedConversation);

  const conversationsWithMessages = conversations.filter(
    (c) => MOCK_MESSAGES_BY_CONV[c.conversation_id]
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-moyin-text-primary">Messages</h3>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-moyin-text-hint">Conversation:</span>
          <select
            value={selectedConversation}
            onChange={(e) => setSelectedConversation(e.target.value)}
            className="px-3 py-1.5 text-sm bg-moyin-dark border border-white/10 rounded-lg text-moyin-text-primary focus:outline-none focus:border-moyin-pink/40 transition-colors"
          >
            {conversationsWithMessages.map((c) => (
              <option key={c.conversation_id} value={c.conversation_id} className="bg-moyin-dark">
                {c.conversation_id} ({c.user} - {c.provider}/{c.model})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conversation metadata */}
      {currentConv && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs"
        >
          <span className="text-moyin-text-hint">User:</span>
          <span className="text-moyin-text-primary font-medium">{currentConv.user}</span>
          <span className="text-white/10">|</span>
          <span className="text-moyin-text-hint">Provider:</span>
          <span className="text-moyin-text-primary font-medium">{currentConv.provider}/{currentConv.model}</span>
          <span className="text-white/10">|</span>
          <span className="text-moyin-text-hint">Created:</span>
          <span className="text-moyin-text-secondary">{currentConv.created_at}</span>
          <span className="text-white/10">|</span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${statusColor(currentConv.status)}`}>
            {currentConv.status}
          </span>
        </motion.div>
      )}

      {/* Chat-like message display */}
      <div className="bg-moyin-dark rounded-xl border border-white/[0.06] p-4 max-h-[520px] overflow-y-auto scrollbar-thin space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-moyin-text-muted text-sm">
            No messages in this conversation.
          </div>
        ) : (
          messages.map((msg, i) => (
            <motion.div
              key={msg.message_id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-moyin-pink/10 border border-moyin-pink/20'
                    : msg.role === 'system'
                    ? 'bg-white/[0.03] border border-white/[0.08]'
                    : 'bg-moyin-purple/10 border border-moyin-purple/20'
                }`}
              >
                {/* Header: role badge + timestamp */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase border ${roleBadgeColor(msg.role)}`}
                  >
                    {msg.role}
                  </span>
                  <span className="text-[10px] text-moyin-text-muted font-mono">{msg.timestamp}</span>
                  <span className="text-[10px] text-moyin-text-muted font-mono ml-auto">{msg.tokens} tokens</span>
                </div>
                {/* Message content */}
                <div className="text-sm text-moyin-text-secondary whitespace-pre-wrap break-words leading-relaxed">
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Total tokens summary */}
      {messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex items-center justify-between text-xs text-moyin-text-muted"
        >
          <span>{messages.length} messages</span>
          <span>
            Total: {messages.reduce((sum, m) => sum + m.tokens, 0).toLocaleString()} tokens
          </span>
        </motion.div>
      )}
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
// Console Tab (Enhanced with log level filters)
// ---------------------------------------------------------------------------

function ConsoleTab({
  keyword,
  setKeyword,
  logLevelFilters,
  setLogLevelFilters,
}: {
  keyword: string;
  setKeyword: (v: string) => void;
  logLevelFilters: Record<'INFO' | 'WARN' | 'ERROR', boolean>;
  setLogLevelFilters: React.Dispatch<React.SetStateAction<Record<'INFO' | 'WARN' | 'ERROR', boolean>>>;
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

  const toggleLevel = (level: 'INFO' | 'WARN' | 'ERROR') => {
    setLogLevelFilters((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const filteredLogs = visibleLogs.filter((log) => {
    const levelKey = log.level as 'INFO' | 'WARN' | 'ERROR';
    if (!logLevelFilters[levelKey]) return false;
    if (keyword && !log.message.toLowerCase().includes(keyword.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-moyin-text-primary">Console Logs</h3>
        <div className="flex-1" />
        <div className="flex flex-wrap items-center gap-2">
          {/* Log level filter checkboxes */}
          {(['INFO', 'WARN', 'ERROR'] as const).map((level) => (
            <label
              key={level}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium border cursor-pointer transition-all select-none ${
                logLevelFilters[level]
                  ? levelColor(level)
                  : 'bg-white/[0.02] text-moyin-text-muted border-white/[0.06] opacity-50'
              }`}
            >
              <input
                type="checkbox"
                checked={logLevelFilters[level]}
                onChange={() => toggleLevel(level)}
                className="sr-only"
              />
              <span
                className={`w-2.5 h-2.5 rounded-sm border flex items-center justify-center transition-colors ${
                  logLevelFilters[level]
                    ? level === 'INFO'
                      ? 'bg-emerald-500/40 border-emerald-400'
                      : level === 'WARN'
                      ? 'bg-yellow-500/40 border-yellow-400'
                      : 'bg-red-500/40 border-red-400'
                    : 'bg-white/5 border-white/20'
                }`}
              >
                {logLevelFilters[level] && (
                  <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                )}
              </span>
              {level}
            </label>
          ))}

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
