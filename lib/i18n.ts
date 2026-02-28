export type Locale = 'en' | 'ja' | 'zh-tw';

export const defaultLocale: Locale = 'en';

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ja', label: '日本語', flag: 'JP' },
  { code: 'zh-tw', label: '繁體中文', flag: 'TW' },
];

type DemoItem = {
  name: string;
  description: string;
};

type TranslationKeys = {
  nav: {
    home: string;
    projects: string;
    articles: string;
    career: string;
    about: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaProjects: string;
  };
  home: {
    featuredTitle: string;
    demosTitle: string;
    viewDemo: string;
    demoItems: DemoItem[];
  };
  projects: {
    pageTitle: string;
    pageSubtitle: string;
    viewSource: string;
    techStack: string;
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    introTitle: string;
    intro: string[];
    skillsTitle: string;
    skillCategories: {
      frontend: string;
      backend: string;
      mobile: string;
      aiMl: string;
      devopsTools: string;
    };
    experienceTitle: string;
    experienceItems: { period: string; role: string; description: string }[];
    highlightsTitle: string;
    highlights: string[];
    philosophy: string;
    languagesTitle: string;
    languages: { name: string; level: string }[];
  };
  career: {
    pageTitle: string;
    pageSubtitle: string;
    present: string;
    techStack: string;
    achievements: string;
    items: {
      period: string;
      role: string;
      domain: string;
      description: string;
      tech: string[];
      achievements: string[];
    }[];
  };
  articles: {
    pageTitle: string;
    pageSubtitle: string;
    allCategories: string;
    articleCount: string;
    readArticle: string;
    backToList: string;
    tableOfContents: string;
  };
  footer: {
    copyright: string;
    builtWith: string;
  };
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Side Projects',
      articles: 'Articles',
      career: 'Career',
      about: 'About',
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Atsushi Harimoto',
      title: 'Full-Stack Developer & AI Engineer',
      subtitle:
        'Building creative software at the intersection of web technology and artificial intelligence. Passionate about developer tools, language processing, and interactive media.',
      cta: 'Get in Touch',
      ctaProjects: 'View Projects',
    },
    home: {
      featuredTitle: 'Early Work',
      demosTitle: 'Live Demos',
      viewDemo: 'View Demo',
      demoItems: [
        { name: 'Moyin-Gateway', description: 'LLM Gateway Admin Console' },
        { name: 'Moyin-Dev-Dashboard', description: 'Developer Workflow Dashboard' },
        { name: 'Moyin-Game', description: 'AI Visual Novel Engine' },
      ],
    },
    projects: {
      pageTitle: 'Projects',
      pageSubtitle:
        'A selection of open-source projects spanning AI, web development, and developer tooling.',
      viewSource: 'View Source',
      techStack: 'Tech Stack',
    },
    about: {
      pageTitle: 'About Me',
      pageSubtitle: 'AI Engineer & Full-Stack Developer with 15+ years of experience.',
      introTitle: 'Background',
      intro: [
        'AI Engineer & Full-Stack Developer with 15+ years of hands-on experience spanning IoT, FinTech, aviation, and enterprise AI domains. Based in Tokyo, Japan.',
        'Started as a mobile developer building IoT device applications in 2009, progressed through senior engineering roles in mobile & frontend development, and evolved into a full-stack AI engineer and team sub-leader.',
        'Currently serving as SE / Sub-Leader for an enterprise DX initiative, leading a 5-person development team focused on RAG knowledge base construction, AI-assisted coding workflows, and CI/CD infrastructure.',
      ],
      skillsTitle: 'Technical Skills',
      skillCategories: {
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        aiMl: 'AI / LLM',
        devopsTools: 'DevOps & Tools',
      },
      experienceTitle: 'Experience',
      experienceItems: [
        {
          period: '2025.8 — Present',
          role: 'SE / Sub-Leader — Enterprise AI & DX',
          description:
            'Leading a 5-person team on enterprise DX initiatives. Built a RAG knowledge base for ~3,000 technical documents, introduced AI-assisted coding workflows, and designed CI/CD + automated testing infrastructure.',
        },
        {
          period: '2024.1 — 2025.6',
          role: 'Systems Engineer — FinTech',
          description:
            'Developed a fraud detection system for financial institutions. Led mobile app (iOS/Android) and API development. Optimized parallel requests to reduce initial load time by 20%.',
        },
        {
          period: '2021.10 — 2023.12',
          role: 'App Development Engineer — Aviation',
          description:
            'Built a real-time helicopter operations monitoring system as tech lead. Optimized data synchronization to cut communication latency by 50%. Led architecture design and team mentoring.',
        },
        {
          period: '2014.10 — 2021.9',
          role: 'Senior Developer — Enterprise Mobile & Frontend',
          description:
            'Developed mobile apps (iOS/Android) and frontend systems (Vue.js). Designed an iOS/JS communication framework adopted across multiple enterprise products. Managed frontend technology for the department.',
        },
        {
          period: '2009.9 — 2014.9',
          role: 'Mobile Developer — IoT',
          description:
            'Built IoT device integration applications using Objective-C and Java. Developed mobile apps connecting smart devices to cloud platforms.',
        },
      ],
      highlightsTitle: 'Key Achievements',
      highlights: [
        'RAG knowledge base: processed ~3,000 docs with hybrid search (BM25 + vector), improving top-5 search accuracy from 65% to 85%',
        'AI coding process: introduced team-wide AI-assisted workflows, improving PR first-review pass rate by ~20 points',
        'FinTech optimization: parallel request tuning reduced initial load time by 20%',
        'Aviation monitoring: data sync optimization cut communication latency by 50%',
      ],
      philosophy: '"Learn new technologies, embed them in the team, and transform them into product value."',
      languagesTitle: 'Languages',
      languages: [
        { name: 'Chinese (Mandarin & Cantonese)', level: 'Native' },
        { name: 'Japanese', level: 'Business (JLPT N2)' },
        { name: 'English', level: 'Professional' },
      ],
    },
    career: {
      pageTitle: 'Career',
      pageSubtitle: '15+ years across IoT, FinTech, Aviation, and Enterprise AI.',
      present: 'Present',
      techStack: 'Tech Stack',
      achievements: 'Key Achievements',
      items: [
        {
          period: '2025.8 — Present',
          role: 'SE / Sub-Leader',
          domain: 'Enterprise AI & DX',
          description:
            'Leading a 5-person development team on an enterprise DX initiative. Spearheading RAG knowledge base construction, AI-assisted coding workflow adoption, and CI/CD infrastructure design.',
          tech: ['TypeScript', 'React', 'Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Docker', 'GitHub Actions'],
          achievements: [
            'Built RAG knowledge base for ~3,000 technical documents — hybrid search (BM25 + vector) improved top-5 search accuracy from 65% to 85%',
            'Introduced AI-assisted coding workflows — PR first-review pass rate improved by ~20 points',
            'Designed CI/CD pipelines and automated testing infrastructure (Jest + E2E)',
          ],
        },
        {
          period: '2024.1 — 2025.6',
          role: 'Systems Engineer',
          domain: 'FinTech',
          description:
            'Developed a fraud detection system for financial institutions. Led mobile application (iOS/Android) and API development with focus on performance optimization and security.',
          tech: ['JavaScript', 'Java', 'Swift', 'Kotlin', 'Objective-C', 'REST API'],
          achievements: [
            'Optimized parallel requests — reduced initial load time from 1.0s to 0.8s (20% improvement)',
            'Implemented reactive data monitoring across Web + Hybrid + Native stack',
            'Adopted agile development with optimized sprint release cycles',
          ],
        },
        {
          period: '2021.10 — 2023.12',
          role: 'App Development Engineer / Tech Lead',
          domain: 'Aviation',
          description:
            'Built a real-time helicopter operations monitoring system as tech lead. Managed architecture design, team mentoring, and development process optimization.',
          tech: ['JavaScript', 'TypeScript', 'Java', 'Swift', 'Kotlin', 'Map API', 'CI/CD'],
          achievements: [
            'Optimized data synchronization — cut communication latency from 400ms to 200ms (50% reduction)',
            'Visualized fuel consumption and maintenance status via IoT device integration',
            'Standardized development process and code review — doubled release speed',
          ],
        },
        {
          period: '2014.10 — 2021.9',
          role: 'Senior Developer',
          domain: 'Enterprise Mobile & Frontend',
          description:
            'Developed mobile apps (iOS/Android) and frontend systems (Vue.js). Designed a cross-platform iOS/JS communication framework. Managed frontend technology direction for the department.',
          tech: ['Swift', 'Objective-C', 'JavaScript', 'Vue.js', 'Java', 'Python', 'Uniapp'],
          achievements: [
            'Designed iOS/JS communication framework adopted across multiple enterprise products',
            'Led department frontend technology strategy and standardization',
            'Delivered mobile and web solutions spanning 7 years of continuous growth',
          ],
        },
        {
          period: '2009.9 — 2014.9',
          role: 'Mobile Developer',
          domain: 'IoT',
          description:
            'Built IoT device integration applications connecting smart devices to cloud platforms. Developed mobile apps using Objective-C and Java for smart home and industrial IoT scenarios.',
          tech: ['Objective-C', 'Java', 'iOS', 'Android'],
          achievements: [
            'Developed IoT device companion apps for smart home platform',
            'Built mobile applications connecting hardware devices to cloud services',
          ],
        },
      ],
    },
    articles: {
      pageTitle: 'Knowledge Base',
      pageSubtitle: 'Technical articles covering architecture, frontend, backend, AI/LLM, and developer workflows.',
      allCategories: 'All',
      articleCount: 'articles',
      readArticle: 'Read',
      backToList: 'Back to Articles',
      tableOfContents: 'Table of Contents',
    },
    footer: {
      copyright: 'Atsushi Harimoto. All rights reserved.',
      builtWith: 'Built with Next.js, Tailwind CSS & Framer Motion',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      projects: '個人プロジェクト',
      articles: '技術記事',
      career: 'キャリア',
      about: '自己紹介',
    },
    hero: {
      greeting: 'はじめまして',
      name: 'Atsushi Harimoto',
      title: 'フルスタック開発者 & AIエンジニア',
      subtitle:
        'Web技術と人工知能の交差点で、創造的なソフトウェアを構築しています。開発者ツール、言語処理、インタラクティブメディアに情熱を持っています。',
      cta: 'お問い合わせ',
      ctaProjects: 'プロジェクトを見る',
    },
    home: {
      featuredTitle: '初期の作品',
      demosTitle: 'ライブデモ',
      viewDemo: 'デモを見る',
      demoItems: [
        { name: 'Moyin-Gateway', description: 'LLMゲートウェイ管理コンソール' },
        { name: 'Moyin-Dev-Dashboard', description: '開発者ワークフローダッシュボード' },
        { name: 'Moyin-Game', description: 'AIビジュアルノベルエンジン' },
      ],
    },
    projects: {
      pageTitle: 'プロジェクト',
      pageSubtitle:
        'AI、Web開発、開発者ツールにまたがるオープンソースプロジェクトの一覧です。',
      viewSource: 'ソースを見る',
      techStack: '技術スタック',
    },
    about: {
      pageTitle: '自己紹介',
      pageSubtitle: '15年以上の開発経験を持つAIエンジニア兼フルスタック開発者。',
      introTitle: '経歴',
      intro: [
        '15年以上の開発経験を持つAIエンジニア兼フルスタック開発者。IoT・金融・航空・エンタープライズAIと幅広いドメインで、技術選定からアーキテクチャ設計、チーム指導までをリード。東京在住。',
        '2009年にIoTデバイス連携アプリのモバイル開発者としてキャリアをスタート。モバイル・フロントエンドのシニアエンジニアとして経験を積み、現在はフルスタック型AIエンジニア兼副リーダーとして活動中。',
        'エンタープライズDX推進プロジェクトにてSE/副リーダーとして5名の開発チームを統括。RAGナレッジベース構築・AIコーディングプロセス導入・CI/CDパイプライン整備を主導。',
      ],
      skillsTitle: '技術スキル',
      skillCategories: {
        frontend: 'フロントエンド',
        backend: 'バックエンド',
        mobile: 'モバイル',
        aiMl: 'AI / LLM',
        devopsTools: 'DevOps & ツール',
      },
      experienceTitle: '職務経歴',
      experienceItems: [
        {
          period: '2025.8 — 現在',
          role: 'SE / 副リーダー — エンタープライズAI・DX推進',
          description:
            '5名の開発チームを統括。約3,000件の技術文書を対象としたRAGナレッジベース構築、AIコーディングプロセス導入、CI/CD・自動テスト基盤の設計・構築を主導。',
        },
        {
          period: '2024.1 — 2025.6',
          role: 'システムエンジニア — 金融',
          description:
            '金融機関向け不正検知システムの開発。モバイルアプリ（iOS/Android）およびAPI設計を担当。並列リクエスト最適化により初回ロード時間を20%短縮。',
        },
        {
          period: '2021.10 — 2023.12',
          role: 'アプリ開発エンジニア — 航空',
          description:
            'ヘリコプター運航リアルタイム監視システムの開発を技術リーダーとして推進。データ同期最適化により通信遅延を50%削減。アーキテクチャ設計とチーム育成を担当。',
        },
        {
          period: '2014.10 — 2021.9',
          role: '上級開発エンジニア — エンタープライズモバイル・フロントエンド',
          description:
            'モバイルアプリ（iOS/Android）およびフロントエンド（Vue.js）開発。iOS/JS通信フレームワークの設計・実装。部門のフロントエンド技術管理を担当。',
        },
        {
          period: '2009.9 — 2014.9',
          role: 'モバイル開発エンジニア — IoT',
          description:
            'IoTデバイス連携アプリの開発。Objective-C、Javaを用いたモバイルアプリ開発。スマートデバイスとクラウドプラットフォームの連携。',
        },
      ],
      highlightsTitle: '主な成果',
      highlights: [
        'RAGナレッジベース：約3,000件の文書をBM25＋ベクター検索のハイブリッドで処理、検索精度を65%→85%に改善（Top-5）',
        'AIコーディングプロセス：チーム全体にAI支援ワークフローを導入、PR初回レビュー通過率を約20ポイント向上',
        '金融最適化：並列リクエスト最適化により初回ロード時間を20%短縮',
        '航空監視：データ同期最適化で通信遅延を50%削減',
      ],
      philosophy: '「新しい技術を学び、チームに浸透させ、プロダクトの価値に変える」',
      languagesTitle: '言語',
      languages: [
        { name: '中国語（普通話 + 広東語）', level: 'ネイティブ' },
        { name: '日本語', level: 'ビジネスレベル（JLPT N2）' },
        { name: '英語', level: 'ビジネスレベル' },
      ],
    },
    career: {
      pageTitle: 'キャリア',
      pageSubtitle: 'IoT・金融・航空・エンタープライズAI — 15年以上の開発経験。',
      present: '現在',
      techStack: '技術スタック',
      achievements: '主な成果',
      items: [
        {
          period: '2025.8 — 現在',
          role: 'SE / 副リーダー',
          domain: 'エンタープライズAI・DX推進',
          description:
            '5名の開発チームを統括。RAGナレッジベース構築、AIコーディングプロセス導入、CI/CD・自動テスト基盤の設計・構築を主導。',
          tech: ['TypeScript', 'React', 'Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Docker', 'GitHub Actions'],
          achievements: [
            'RAGナレッジベース：約3,000件の文書、ハイブリッド検索で検索精度を65%→85%に改善（Top-5）',
            'AIコーディングプロセス：PR初回レビュー通過率を約20ポイント向上',
            'CI/CD・自動テスト基盤（Jest + E2E）の設計・構築',
          ],
        },
        {
          period: '2024.1 — 2025.6',
          role: 'システムエンジニア',
          domain: '金融',
          description:
            '金融機関向け不正検知システムの開発。モバイルアプリ（iOS/Android）およびAPI設計を担当。パフォーマンス最適化とセキュリティ強化に注力。',
          tech: ['JavaScript', 'Java', 'Swift', 'Kotlin', 'Objective-C', 'REST API'],
          achievements: [
            '並列リクエスト最適化：初回ロード時間を1.0秒→0.8秒に短縮（20%改善）',
            'Web + ハイブリッド + ネイティブ全体でリアクティブデータ監視を実装',
            'アジャイル開発を採用し、スプリントリリースサイクルを最適化',
          ],
        },
        {
          period: '2021.10 — 2023.12',
          role: 'アプリ開発エンジニア / 技術リーダー',
          domain: '航空',
          description:
            'ヘリコプター運航リアルタイム監視システムを技術リーダーとして開発。アーキテクチャ設計、チーム育成、開発プロセス最適化を担当。',
          tech: ['JavaScript', 'TypeScript', 'Java', 'Swift', 'Kotlin', 'Map API', 'CI/CD'],
          achievements: [
            'データ同期最適化：通信遅延を400ms→200msに短縮（50%削減）',
            'IoTデバイス連携で燃料消費量・メンテナンス状態を可視化',
            '開発標準化とコードレビュー導入：リリーススピードを倍増',
          ],
        },
        {
          period: '2014.10 — 2021.9',
          role: '上級開発エンジニア',
          domain: 'エンタープライズモバイル・フロントエンド',
          description:
            'モバイルアプリ（iOS/Android）およびフロントエンド（Vue.js）開発。iOS/JS通信フレームワークの設計・実装。部門のフロントエンド技術管理を担当。',
          tech: ['Swift', 'Objective-C', 'JavaScript', 'Vue.js', 'Java', 'Python', 'Uniapp'],
          achievements: [
            'iOS/JS通信フレームワーク設計：複数の企業プロダクトで採用',
            '部門フロントエンド技術戦略の策定・標準化をリード',
            '7年間にわたるモバイル・Web ソリューションの継続的な開発',
          ],
        },
        {
          period: '2009.9 — 2014.9',
          role: 'モバイル開発エンジニア',
          domain: 'IoT',
          description:
            'IoTデバイス連携アプリの開発。Objective-C、Javaを用いたスマートホーム・産業IoT向けモバイルアプリ開発。',
          tech: ['Objective-C', 'Java', 'iOS', 'Android'],
          achievements: [
            'IoTスマートホームプラットフォーム向けコンパニオンアプリの開発',
            'ハードウェアデバイスとクラウドサービスを接続するモバイルアプリ開発',
          ],
        },
      ],
    },
    articles: {
      pageTitle: 'ナレッジベース',
      pageSubtitle: 'アーキテクチャ、フロントエンド、バックエンド、AI/LLM、開発ワークフローに関する技術記事。',
      allCategories: 'すべて',
      articleCount: '件',
      readArticle: '読む',
      backToList: '記事一覧へ',
      tableOfContents: '目次',
    },
    footer: {
      copyright: 'Atsushi Harimoto. All rights reserved.',
      builtWith: 'Next.js、Tailwind CSS、Framer Motionで構築',
    },
  },
  'zh-tw': {
    nav: {
      home: '首頁',
      projects: '個人專案',
      articles: '技術文章',
      career: '職業經歷',
      about: '關於我',
    },
    hero: {
      greeting: '你好，我是',
      name: 'Atsushi Harimoto',
      title: '全端工程師 & AI 工程師',
      subtitle:
        '在 Web 技術與人工智慧的交匯處，打造富有創意的軟體。熱衷於開發者工具、語言處理與互動式媒體。',
      cta: '聯繫我',
      ctaProjects: '查看專案',
    },
    home: {
      featuredTitle: '早期作品',
      demosTitle: '互動演示',
      viewDemo: '查看演示',
      demoItems: [
        { name: 'Moyin-Gateway', description: 'LLM 閘道管理控制台' },
        { name: 'Moyin-Dev-Dashboard', description: '開發者工作流儀表板' },
        { name: 'Moyin-Game', description: 'AI 視覺小說引擎' },
      ],
    },
    projects: {
      pageTitle: '專案作品',
      pageSubtitle: '涵蓋 AI、Web 開發與開發者工具的開源專案精選。',
      viewSource: '查看原始碼',
      techStack: '技術棧',
    },
    about: {
      pageTitle: '關於我',
      pageSubtitle: '擁有 15 年以上開發經驗的 AI 工程師暨全端開發者。',
      introTitle: '背景',
      intro: [
        '擁有 15 年以上開發經驗的 AI 工程師暨全端開發者，橫跨 IoT、金融科技、航空與企業 AI 領域，從技術選型到架構設計、團隊領導皆有豐富實戰經驗。現居東京。',
        '2009 年以 IoT 裝置應用的行動開發者身分入行，歷經行動端與前端的資深工程師階段，現為全端型 AI 工程師暨副組長。',
        '於企業 DX 推進專案擔任 SE / 副組長，領導 5 人開發團隊，主導 RAG 知識庫建構、AI 輔助編碼流程導入及 CI/CD 基礎設施設計。',
      ],
      skillsTitle: '技術能力',
      skillCategories: {
        frontend: '前端',
        backend: '後端',
        mobile: '行動端',
        aiMl: 'AI / LLM',
        devopsTools: 'DevOps & 工具',
      },
      experienceTitle: '職業經歷',
      experienceItems: [
        {
          period: '2025.8 — 現職',
          role: 'SE / 副組長 — 企業 AI 與 DX 推進',
          description:
            '領導 5 人開發團隊。建構 RAG 知識庫處理約 3,000 份技術文件，導入 AI 輔助編碼流程，設計 CI/CD 與自動化測試基礎設施。',
        },
        {
          period: '2024.1 — 2025.6',
          role: '系統工程師 — 金融科技',
          description:
            '開發金融機構不正偵測系統。負責行動應用（iOS/Android）與 API 設計。優化並行請求，初始載入時間縮短 20%。',
        },
        {
          period: '2021.10 — 2023.12',
          role: '應用開發工程師 — 航空',
          description:
            '以技術負責人身分建構直升機即時運航監控系統。數據同步最佳化使通訊延遲降低 50%。負責架構設計與團隊培養。',
        },
        {
          period: '2014.10 — 2021.9',
          role: '資深開發工程師 — 企業行動端與前端',
          description:
            '開發行動應用（iOS/Android）與前端系統（Vue.js）。設計 iOS/JS 通訊框架，應用於多款企業級產品。管理部門前端技術。',
        },
        {
          period: '2009.9 — 2014.9',
          role: '行動開發工程師 — IoT',
          description:
            '開發 IoT 裝置整合應用。使用 Objective-C 和 Java 建構連接智慧裝置與雲端平台的行動應用。',
        },
      ],
      highlightsTitle: '關鍵成果',
      highlights: [
        'RAG 知識庫：處理約 3,000 份文件，採用 BM25 + 向量搜尋混合檢索，Top-5 搜尋準確率從 65% 提升至 85%',
        'AI 編碼流程：導入團隊級 AI 輔助工作流，PR 首次審查通過率提升約 20 個百分點',
        '金融最佳化：並行請求調優，初始載入時間縮短 20%',
        '航空監控：數據同步最佳化，通訊延遲降低 50%',
      ],
      philosophy: '「學習新技術，融入團隊，轉化為產品價值。」',
      languagesTitle: '語言能力',
      languages: [
        { name: '中文（普通話 + 粵語）', level: '母語' },
        { name: '日語', level: '商務級（JLPT N2）' },
        { name: '英語', level: '專業級' },
      ],
    },
    career: {
      pageTitle: '職業經歷',
      pageSubtitle: '橫跨 IoT、金融科技、航空與企業 AI — 15 年以上開發經驗。',
      present: '現職',
      techStack: '技術棧',
      achievements: '關鍵成果',
      items: [
        {
          period: '2025.8 — 現職',
          role: 'SE / 副組長',
          domain: '企業 AI 與 DX 推進',
          description:
            '領導 5 人開發團隊。主導 RAG 知識庫建構、AI 輔助編碼流程導入及 CI/CD 與自動化測試基礎設施設計。',
          tech: ['TypeScript', 'React', 'Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Docker', 'GitHub Actions'],
          achievements: [
            'RAG 知識庫：處理約 3,000 份文件，混合檢索 Top-5 搜尋準確率從 65% 提升至 85%',
            'AI 編碼流程：PR 首次審查通過率提升約 20 個百分點',
            'CI/CD 與自動化測試基盤（Jest + E2E）設計與建構',
          ],
        },
        {
          period: '2024.1 — 2025.6',
          role: '系統工程師',
          domain: '金融科技',
          description:
            '開發金融機構不正偵測系統。負責行動應用（iOS/Android）與 API 設計，專注效能最佳化與安全強化。',
          tech: ['JavaScript', 'Java', 'Swift', 'Kotlin', 'Objective-C', 'REST API'],
          achievements: [
            '並行請求最佳化：初始載入時間從 1.0s 縮短至 0.8s（20% 改善）',
            '跨 Web + 混合 + 原生架構實作響應式數據監控',
            '導入敏捷開發，最佳化衝刺發布週期',
          ],
        },
        {
          period: '2021.10 — 2023.12',
          role: '應用開發工程師 / 技術負責人',
          domain: '航空',
          description:
            '以技術負責人身分建構直升機即時運航監控系統。負責架構設計、團隊培養與開發流程最佳化。',
          tech: ['JavaScript', 'TypeScript', 'Java', 'Swift', 'Kotlin', 'Map API', 'CI/CD'],
          achievements: [
            '數據同步最佳化：通訊延遲從 400ms 降至 200ms（50% 降低）',
            '透過 IoT 裝置整合實現油耗與維護狀態視覺化',
            '開發標準化與代碼審查導入：發布速度翻倍',
          ],
        },
        {
          period: '2014.10 — 2021.9',
          role: '資深開發工程師',
          domain: '企業行動端與前端',
          description:
            '開發行動應用（iOS/Android）與前端系統（Vue.js）。設計 iOS/JS 通訊框架。管理部門前端技術方向。',
          tech: ['Swift', 'Objective-C', 'JavaScript', 'Vue.js', 'Java', 'Python', 'Uniapp'],
          achievements: [
            'iOS/JS 通訊框架設計：應用於多款企業級產品',
            '主導部門前端技術策略與標準化',
            '7 年間持續交付行動端與 Web 解決方案',
          ],
        },
        {
          period: '2009.9 — 2014.9',
          role: '行動開發工程師',
          domain: 'IoT',
          description:
            '開發 IoT 裝置整合應用。使用 Objective-C 和 Java 為智慧家庭與工業 IoT 場景建構行動應用。',
          tech: ['Objective-C', 'Java', 'iOS', 'Android'],
          achievements: [
            'IoT 智慧家庭平台伴侶應用開發',
            '建構連接硬體裝置與雲端服務的行動應用',
          ],
        },
      ],
    },
    articles: {
      pageTitle: '技術知識庫',
      pageSubtitle: '涵蓋架構設計、前端、後端、AI/LLM 與開發工作流的技術文章。',
      allCategories: '全部',
      articleCount: '篇文章',
      readArticle: '閱讀',
      backToList: '返回文章列表',
      tableOfContents: '目錄',
    },
    footer: {
      copyright: 'Atsushi Harimoto. 版權所有。',
      builtWith: '使用 Next.js、Tailwind CSS 和 Framer Motion 建構',
    },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations[defaultLocale];
}
