import type { Locale } from './i18n';

export type Project = {
  id: string;
  name: string;
  description: Record<Locale, string>;
  tech: string[];
  github: string;
  highlights: Record<Locale, string[]>;
  color: string;
  icon: string;
};

export const projects: Project[] = [
  {
    id: 'moyin-factory',
    name: 'Moyin-Factory',
    description: {
      en: 'The architecture hub and documentation center for the entire Moyin ecosystem. Contains design documents, ADRs, and cross-project coordination resources.',
      ja: 'Moyinエコシステム全体のアーキテクチャハブ兼ドキュメントセンター。設計文書、ADR、プロジェクト間連携リソースを管理。',
      'zh-tw':
        'Moyin 生態系的架構中心與文件中心。包含設計文件、ADR 與跨專案協調資源。',
    },
    tech: ['Documentation', 'Architecture', 'ADR', 'Markdown'],
    github: 'https://github.com/AtsushiHarimoto/moyin-factory',
    highlights: {
      en: [
        'Centralized architecture documentation',
        'Architecture Decision Records (ADR)',
        'Cross-project dependency mapping',
      ],
      ja: [
        'アーキテクチャ文書の一元管理',
        'Architecture Decision Records（ADR）',
        'プロジェクト間依存関係マッピング',
      ],
      'zh-tw': [
        '集中式架構文件',
        '架構決策紀錄 (ADR)',
        '跨專案依賴映射',
      ],
    },
    color: '#9ca3af',
    icon: 'factory',
  },
  {
    id: 'moyin-gateway',
    name: 'Moyin-Gateway',
    description: {
      en: 'A multi-provider LLM gateway that unifies access to OpenAI, Anthropic, Google, and other AI providers through a single, consistent API interface.',
      ja: 'OpenAI、Anthropic、Googleなど複数のAIプロバイダーへのアクセスを統一するマルチプロバイダーLLMゲートウェイ。',
      'zh-tw':
        '多供應商 LLM 閘道，透過統一的 API 介面整合 OpenAI、Anthropic、Google 等 AI 供應商。',
    },
    tech: ['Python', 'FastAPI', 'LLM', 'OpenAI', 'Anthropic'],
    github: 'https://github.com/AtsushiHarimoto/moyin-gateway',
    highlights: {
      en: [
        'Unified API for multiple LLM providers',
        'Streaming response support',
        'Rate limiting and cost tracking',
      ],
      ja: [
        '複数LLMプロバイダーの統一API',
        'ストリーミングレスポンス対応',
        'レート制限とコスト追跡',
      ],
      'zh-tw': [
        '統一多家 LLM 供應商 API',
        '串流回應支援',
        '速率限制與成本追蹤',
      ],
    },
    color: '#e8a0bf',
    icon: 'server',
  },
  {
    id: 'moyin-network-modules',
    name: 'Moyin-Network-Modules',
    description: {
      en: 'A lightweight, type-safe HTTP client library with built-in retry logic, interceptors, and comprehensive test coverage using Vitest.',
      ja: '軽量で型安全なHTTPクライアントライブラリ。リトライロジック、インターセプター、Vitestによる包括的なテストカバレッジを内蔵。',
      'zh-tw':
        '輕量級、型別安全的 HTTP 客戶端函式庫，內建重試邏輯、攔截器，並使用 Vitest 進行全面測試覆蓋。',
    },
    tech: ['TypeScript', 'Vitest', 'HTTP', 'Node.js'],
    github: 'https://github.com/AtsushiHarimoto/moyin-network-modules',
    highlights: {
      en: [
        'Type-safe request/response handling',
        'Configurable retry and timeout logic',
        'Comprehensive Vitest test suite',
      ],
      ja: [
        '型安全なリクエスト/レスポンス処理',
        '設定可能なリトライ・タイムアウトロジック',
        '包括的なVitestテストスイート',
      ],
      'zh-tw': [
        '型別安全的請求/回應處理',
        '可配置的重試與逾時邏輯',
        '完善的 Vitest 測試套件',
      ],
    },
    color: '#a78bfa',
    icon: 'network',
  },
  {
    id: 'hermit-purple',
    name: 'Hermit-Purple',
    description: {
      en: 'An AI-powered trend research and analysis tool that leverages Google Gemini for gathering, processing, and synthesizing technology trend data.',
      ja: 'Google Geminiを活用した技術トレンドの収集・処理・統合を行うAI搭載トレンドリサーチ・分析ツール。',
      'zh-tw':
        'AI 驅動的趨勢研究與分析工具，利用 Google Gemini 收集、處理與整合技術趨勢數據。',
    },
    tech: ['Python', 'Google Gemini', 'AI Research', 'Data Analysis'],
    github: 'https://github.com/AtsushiHarimoto/hermit-purple',
    highlights: {
      en: [
        'Automated trend data collection',
        'Gemini-powered analysis pipeline',
        'Structured research output generation',
      ],
      ja: [
        'トレンドデータの自動収集',
        'Gemini搭載の分析パイプライン',
        '構造化されたリサーチ出力生成',
      ],
      'zh-tw': [
        '自動化趨勢數據收集',
        'Gemini 驅動的分析管線',
        '結構化研究產出生成',
      ],
    },
    color: '#c77da0',
    icon: 'search',
  },
  {
    id: 'moyin-dev-dashboard',
    name: 'Moyin-Dev-Dashboard',
    description: {
      en: 'A developer workflow management dashboard that centralizes project tracking, task management, and development metrics in a unified interface.',
      ja: 'プロジェクト追跡、タスク管理、開発メトリクスを統一インターフェースで一元管理する開発者ワークフロー管理ダッシュボード。',
      'zh-tw':
        '開發者工作流管理儀表板，在統一介面中整合專案追蹤、任務管理與開發指標。',
    },
    tech: ['React', 'Express', 'Node.js', 'TypeScript'],
    github: 'https://github.com/AtsushiHarimoto/moyin-dev-dashboard',
    highlights: {
      en: [
        'Unified project management interface',
        'Real-time development metrics',
        'Customizable workflow pipelines',
      ],
      ja: [
        '統一プロジェクト管理インターフェース',
        'リアルタイム開発メトリクス',
        'カスタマイズ可能なワークフローパイプライン',
      ],
      'zh-tw': [
        '統一專案管理介面',
        '即時開發指標',
        '可自訂工作流管線',
      ],
    },
    color: '#f0c4d8',
    icon: 'dashboard',
  },
  {
    id: 'moyin-game',
    name: 'Moyin-Game',
    description: {
      en: 'A visual novel engine powered by AI-driven narrative systems. Features dynamic storytelling, character management, and an extensible plugin architecture.',
      ja: 'AI駆動のナラティブシステムを搭載したビジュアルノベルエンジン。動的なストーリーテリング、キャラクター管理、拡張可能なプラグインアーキテクチャを備えています。',
      'zh-tw':
        '搭載 AI 敘事系統的視覺小說引擎。具備動態故事敘述、角色管理與可擴展的插件架構。',
    },
    tech: ['Vue 3', 'TypeScript', 'Pinia', 'Vite', 'AI/LLM'],
    github: 'https://github.com/AtsushiHarimoto/moyin-game',
    highlights: {
      en: [
        'AI-driven dynamic narrative generation',
        'Plugin-based architecture for extensibility',
        'State management with Pinia stores',
      ],
      ja: [
        'AI駆動の動的ナラティブ生成',
        'プラグインベースの拡張アーキテクチャ',
        'Piniaストアによる状態管理',
      ],
      'zh-tw': [
        'AI 驅動的動態敘事生成',
        '基於插件的可擴展架構',
        'Pinia Store 狀態管理',
      ],
    },
    color: '#6c5ce7',
    icon: 'gamepad',
  },
];
