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
    howIWork: {
      title: string;
      items: { heading: string; description: string }[];
    };
    philosophy: string;
    contact: {
      title: string;
      github: string;
      email: string;
    };
    names: {
      title: string;
      items: { name: string; description: string }[];
    };
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
  demos: {
    shared: {
      backToHome: string;
      backToProjects: string;
      mockDataBadge: string;
      source: string;
    };
    demoGateway: {
      title: string;
      subtitle: string;
      tabs: { users: string; tokens: string; conversations: string; messages: string; stats: string; console: string };
      userManagement: string;
      createUser: string;
      columnsUser: { userId: string; username: string; status: string; actions: string };
      delete: string;
      cancel: string;
      tokenManagement: string;
      generateToken: string;
      columnsToken: { tokenId: string; tokenHash: string; userId: string; status: string; actions: string };
      revoke: string;
      conversationTitle: string;
      newConversation: string;
      columnsConversation: { convId: string; user: string; provider: string; model: string; messages: string; created: string; status: string; action: string };
      view: string;
      messageTitle: string;
      backToConversations: string;
      statsTitle: string;
      columnsStats: { provider: string; model: string; requests: string; totalTokens: string; avgLatency: string; p95Latency: string };
      consoleTitle: string;
      replayStream: string;
      stopStream: string;
      waitingLogs: string;
      noLogs: string;
    };
    demoDashboard: {
      title: string;
      subtitle: string;
      navigation: string;
      systemOnline: string;
      navItems: { dashboard: string; sessions: string; skills: string; reports: string; kanban: string; settings: string };
      statLabels: { totalSessions: string; activeSkills: string; issuesResolved: string; totalTokens: string; avgDuration: string; reportsGenerated: string };
      sessionTrends: string;
      last7days: string;
      sessions: string;
      quickInsights: string;
      completionRate: string;
      thisWeek: string;
      tasks: string;
      todoDoingDone: string;
      errorRate: string;
      last24h: string;
      uptime: string;
      systemHealth: string;
      days: { mon: string; tue: string; wed: string; thu: string; fri: string; sat: string; sun: string };
      sessionsPage: {
        active: string;
        paused: string;
        completed: string;
        totalTokens: string;
        tableHeaders: { sessionId: string; project: string; startTime: string; duration: string; tokens: string; status: string; action: string };
        pause: string;
        resume: string;
      };
      skillsPage: {
        syncAll: string;
        syncing: string;
        enabled: string;
        disabled: string;
        syncingStatus: string;
        lastSync: string;
      };
      reportsPage: {
        all: string;
        daily: string;
        weekly: string;
        sprint: string;
      };
      kanbanPage: {
        todo: string;
        inProgress: string;
        done: string;
      };
      settingsPage: {
        autoSyncSkills: string;
        autoSyncSkillsDesc: string;
        darkMode: string;
        darkModeDesc: string;
        notifications: string;
        notificationsDesc: string;
        autoCommit: string;
        autoCommitDesc: string;
        language: string;
      };
    };
    demoGame: {
      title: string;
      subtitle: string;
      narrator: string;
      scene: string;
      menuItems: { save: string; load: string; settings: string; backlog: string; titleMenu: string };
      saveGame: string;
      loadGame: string;
      clickToSkip: string;
      textSpeed: string;
      speedLabels: { slow: string; normal: string; fast: string };
      autoPlay: string;
      auto: string;
      scenes: Record<string, { speaker: string; text: string; choices: string[] }>;
    };
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
        '15 years shipping products across IoT, aviation, fintech, and enterprise AI — now designing human-AI collaborative workflows where developers architect and AI implements, in Tokyo.',
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
    demos: {
      shared: {
        backToHome: 'Back to Home',
        backToProjects: 'Back to Projects',
        mockDataBadge: 'Demo — Mock Data',
        source: 'Source',
      },
      demoGateway: {
        title: 'Admin Console',
        subtitle: 'Multi-provider LLM gateway management interface',
        tabs: { users: 'Users', tokens: 'Tokens', conversations: 'Conversations', messages: 'Messages', stats: 'Stats', console: 'Console' },
        userManagement: 'User Management',
        createUser: '+ Create User',
        columnsUser: { userId: 'USER ID', username: 'USERNAME', status: 'STATUS', actions: 'ACTIONS' },
        delete: 'Delete',
        cancel: 'Cancel',
        tokenManagement: 'Token Management',
        generateToken: '+ Generate Token',
        columnsToken: { tokenId: 'TOKEN ID', tokenHash: 'TOKEN HASH', userId: 'USER ID', status: 'STATUS', actions: 'ACTIONS' },
        revoke: 'Revoke',
        conversationTitle: 'Conversations',
        newConversation: '+ New Conversation',
        columnsConversation: { convId: 'CONV ID', user: 'USER', provider: 'PROVIDER', model: 'MODEL', messages: 'MESSAGES', created: 'CREATED', status: 'STATUS', action: 'ACTION' },
        view: 'View',
        messageTitle: 'Messages',
        backToConversations: '\u2190 Back to Conversations',
        statsTitle: 'Provider Statistics',
        columnsStats: { provider: 'PROVIDER', model: 'MODEL', requests: 'REQUESTS', totalTokens: 'TOTAL TOKENS', avgLatency: 'AVG LATENCY', p95Latency: 'P95 LATENCY' },
        consoleTitle: 'Console',
        replayStream: 'Replay Stream',
        stopStream: 'Stop Stream',
        waitingLogs: 'Waiting for logs...',
        noLogs: 'No logs. Click "Replay Stream" to start.',
      },
      demoDashboard: {
        title: 'Moyin-Dev-Dashboard',
        subtitle: 'Developer workflow management & metrics',
        navigation: 'NAVIGATION',
        systemOnline: 'SYSTEM ONLINE',
        navItems: { dashboard: 'Dashboard', sessions: 'Sessions', skills: 'Skills', reports: 'Reports', kanban: 'Kanban', settings: 'Settings' },
        statLabels: { totalSessions: 'Total Sessions', activeSkills: 'Active Skills', issuesResolved: 'Issues Resolved', totalTokens: 'Total Tokens', avgDuration: 'Avg Duration', reportsGenerated: 'Reports Generated' },
        sessionTrends: 'Session Trends',
        last7days: 'Last 7 days',
        sessions: 'Sessions',
        quickInsights: 'QUICK INSIGHTS',
        completionRate: 'Completion Rate',
        thisWeek: 'THIS WEEK',
        tasks: 'Tasks',
        todoDoingDone: 'TODO / DOING / DONE',
        errorRate: 'Error Rate',
        last24h: 'LAST 24H',
        uptime: 'Uptime',
        systemHealth: 'SYSTEM HEALTH',
        days: { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' },
        sessionsPage: {
          active: 'Active',
          paused: 'Paused',
          completed: 'Completed',
          totalTokens: 'Total Tokens',
          tableHeaders: { sessionId: 'Session ID', project: 'Project', startTime: 'Start Time', duration: 'Duration', tokens: 'Tokens', status: 'Status', action: 'Action' },
          pause: 'Pause',
          resume: 'Resume',
        },
        skillsPage: {
          syncAll: 'Sync All',
          syncing: 'Syncing...',
          enabled: 'Enabled',
          disabled: 'Disabled',
          syncingStatus: 'Syncing',
          lastSync: 'Last sync:',
        },
        reportsPage: {
          all: 'All',
          daily: 'Daily',
          weekly: 'Weekly',
          sprint: 'Sprint',
        },
        kanbanPage: {
          todo: 'Todo',
          inProgress: 'In Progress',
          done: 'Done',
        },
        settingsPage: {
          autoSyncSkills: 'Auto-sync Skills',
          autoSyncSkillsDesc: 'Automatically sync skills from remote repositories',
          darkMode: 'Dark Mode',
          darkModeDesc: 'Toggle dark mode appearance',
          notifications: 'Notifications',
          notificationsDesc: 'Enable desktop notifications for events',
          autoCommit: 'Auto-commit',
          autoCommitDesc: 'Automatically commit changes after each session',
          language: 'Language',
        },
      },
      demoGame: {
        title: 'Visual Novel Engine',
        subtitle: 'AI-driven narrative system with dynamic storytelling',
        narrator: 'NARRATOR',
        scene: 'SCENE',
        menuItems: { save: 'Save', load: 'Load', settings: 'Settings', backlog: 'Backlog', titleMenu: 'Title' },
        saveGame: 'Save Game',
        loadGame: 'Load Game',
        clickToSkip: 'Click to skip',
        textSpeed: 'Text Speed',
        speedLabels: { slow: 'Slow', normal: 'Normal', fast: 'Fast' },
        autoPlay: 'Auto Play',
        auto: 'AUTO',
        scenes: {
          scene1: {
            speaker: 'Narrator',
            text: 'You find yourself in a mysterious library filled with ancient books. The air is thick with the scent of old parchment, and a soft, otherworldly glow emanates from somewhere deep within the shelves...',
            choices: ['Examine the glowing book', 'Look for an exit'],
          },
          scene2a: {
            speaker: 'Narrator',
            text: 'You reach out and touch the glowing book. It opens on its own, pages fluttering in an invisible breeze. Ancient text rearranges itself before your eyes, revealing a detailed map to a hidden garden beyond the library walls...',
            choices: ['Follow the map'],
          },
          scene2b: {
            speaker: 'Narrator',
            text: 'You navigate through the towering bookshelves, searching for a way out. At last, you find a heavy wooden door -- but it is locked. Carved into its surface is an intricate puzzle: rotating rings of symbols that seem to pulse with faint light...',
            choices: ['Solve the puzzle'],
          },
          scene3: {
            speaker: 'Narrator',
            text: 'You step through into a breathtaking garden bathed in moonlight. Cherry blossom petals drift gently through the cool night air, landing softly on a stone path that winds towards a serene pond. The stars above seem brighter here, as if the garden exists closer to the heavens...',
            choices: ['Play again'],
          },
        },
      },
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
        'Built a RAG knowledge base integrating 3,000+ internal technical documents, adopted by 4 product teams for daily reference',
        'Introduced AI-assisted coding workflows for a 5-person team, reducing average code review turnaround from 2 days to same-day',
        'Designed an iOS/JS bridge framework used across 3 enterprise mobile products over 7 years',
        'Led architecture for a real-time helicopter operations monitoring system serving aviation ground staff',
      ],
      howIWork: {
        title: 'How I Work',
        items: [
          { heading: 'Human-AI Symbiosis', description: 'The developer becomes a product manager and architecture engine — defining specs and setting the vibe. AI agents handle the actual coding and debugging. This is Vibecoding.' },
          { heading: 'Doc-First + Lifecycle Guard', description: 'Every task follows DOC CHECK → PLAN → APPROVAL → ACTION → VERIFY → POST DOC CHECK. No code is touched without approval, and every delivery carries a traceable evidence chain.' },
          { heading: 'Test = Delivery Contract', description: 'Test scripts are the "procurement contract," and source code is the "fulfillment delivery." Tests define acceptance boundaries first; only when all lights are green can code be merged.' },
          { heading: 'Claude Reflect — Rule Sediment', description: 'Daily corrections are automatically distilled into versioned rules (like ESLint), written into CLAUDE.md for enforcement. Turning "verbal warnings" into "written project memory."' },
        ],
      },
      philosophy: '"Learn new technologies, embed them in the team, and transform them into product value."',
      contact: {
        title: 'Contact',
        github: 'GitHub',
        email: 'Email',
      },
      names: {
        title: 'About the Name',
        items: [
          { name: 'Atsushi Harimoto', description: 'Online handle / creative alias' },
          { name: 'Akira Cheung', description: 'Formal business name' },
        ],
      },
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
            'Built RAG knowledge base integrating 3,000+ internal documents, adopted by 4 product teams for daily reference',
            'Introduced AI-assisted coding workflows for a 5-person team, reducing code review turnaround from 2 days to same-day',
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
            'Tuned parallel API requests, reducing initial screen load from 1.0s to 0.8s',
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
            'Optimized data synchronization, cutting communication latency from 400ms to 200ms',
            'Visualized fuel consumption and maintenance status via IoT device integration',
            'Standardized development process and introduced code review practices',
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
        'IoT・航空・金融・企業AIと15年にわたりプロダクトを出荷。現在は東京で、開発者が設計しAIが実装する——人間とAIの協働ワークフローを構築しています。',
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
    demos: {
      shared: {
        backToHome: 'ホームに戻る',
        backToProjects: 'プロジェクトに戻る',
        mockDataBadge: 'デモ — モックデータ',
        source: 'ソース',
      },
      demoGateway: {
        title: '管理コンソール',
        subtitle: 'マルチプロバイダー LLM ゲートウェイ管理画面',
        tabs: { users: 'ユーザー', tokens: 'トークン', conversations: '会話', messages: 'メッセージ', stats: '統計', console: 'コンソール' },
        userManagement: 'ユーザー管理',
        createUser: '+ ユーザー作成',
        columnsUser: { userId: 'ユーザーID', username: 'ユーザー名', status: 'ステータス', actions: '操作' },
        delete: '削除',
        cancel: 'キャンセル',
        tokenManagement: 'トークン管理',
        generateToken: '+ トークン生成',
        columnsToken: { tokenId: 'トークンID', tokenHash: 'トークンハッシュ', userId: 'ユーザーID', status: 'ステータス', actions: '操作' },
        revoke: '失効',
        conversationTitle: '会話一覧',
        newConversation: '+ 新規会話',
        columnsConversation: { convId: '会話ID', user: 'ユーザー', provider: 'プロバイダー', model: 'モデル', messages: 'メッセージ数', created: '作成日時', status: 'ステータス', action: '操作' },
        view: '表示',
        messageTitle: 'メッセージ',
        backToConversations: '\u2190 会話一覧に戻る',
        statsTitle: 'プロバイダー統計',
        columnsStats: { provider: 'プロバイダー', model: 'モデル', requests: 'リクエスト数', totalTokens: '総トークン数', avgLatency: '平均レイテンシ', p95Latency: 'P95レイテンシ' },
        consoleTitle: 'コンソール',
        replayStream: 'ストリーム再生',
        stopStream: 'ストリーム停止',
        waitingLogs: 'ログを待機中...',
        noLogs: 'ログがありません。「ストリーム再生」をクリックして開始してください。',
      },
      demoDashboard: {
        title: 'Moyin-Dev-Dashboard',
        subtitle: '開発ワークフロー管理 & メトリクス',
        navigation: 'ナビゲーション',
        systemOnline: 'システムオンライン',
        navItems: { dashboard: 'ダッシュボード', sessions: 'セッション', skills: 'スキル', reports: 'レポート', kanban: 'かんばん', settings: '設定' },
        statLabels: { totalSessions: '総セッション数', activeSkills: 'アクティブスキル', issuesResolved: '解決済み課題', totalTokens: '総トークン数', avgDuration: '平均所要時間', reportsGenerated: '生成レポート数' },
        sessionTrends: 'セッション推移',
        last7days: '直近7日間',
        sessions: 'セッション',
        quickInsights: 'クイックインサイト',
        completionRate: '完了率',
        thisWeek: '今週',
        tasks: 'タスク',
        todoDoingDone: 'TODO / 進行中 / 完了',
        errorRate: 'エラー率',
        last24h: '直近24時間',
        uptime: '稼働時間',
        systemHealth: 'システム健全性',
        days: { mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土', sun: '日' },
        sessionsPage: {
          active: 'アクティブ',
          paused: '一時停止',
          completed: '完了',
          totalTokens: '総トークン数',
          tableHeaders: { sessionId: 'セッションID', project: 'プロジェクト', startTime: '開始時刻', duration: '所要時間', tokens: 'トークン', status: 'ステータス', action: '操作' },
          pause: '一時停止',
          resume: '再開',
        },
        skillsPage: {
          syncAll: '全て同期',
          syncing: '同期中...',
          enabled: '有効',
          disabled: '無効',
          syncingStatus: '同期中',
          lastSync: '最終同期:',
        },
        reportsPage: {
          all: 'すべて',
          daily: '日次',
          weekly: '週次',
          sprint: 'スプリント',
        },
        kanbanPage: {
          todo: '未着手',
          inProgress: '進行中',
          done: '完了',
        },
        settingsPage: {
          autoSyncSkills: 'スキル自動同期',
          autoSyncSkillsDesc: 'リモートリポジトリからスキルを自動同期する',
          darkMode: 'ダークモード',
          darkModeDesc: 'ダークモードの外観を切り替える',
          notifications: '通知',
          notificationsDesc: 'イベントのデスクトップ通知を有効にする',
          autoCommit: '自動コミット',
          autoCommitDesc: 'セッション終了後に自動で変更をコミットする',
          language: '言語',
        },
      },
      demoGame: {
        title: 'ビジュアルノベルエンジン',
        subtitle: 'AI駆動のダイナミックストーリーテリングシステム',
        narrator: 'ナレーター',
        scene: 'シーン',
        menuItems: { save: 'セーブ', load: 'ロード', settings: '設定', backlog: 'バックログ', titleMenu: 'タイトル' },
        saveGame: 'ゲームをセーブ',
        loadGame: 'ゲームをロード',
        clickToSkip: 'クリックでスキップ',
        textSpeed: 'テキスト速度',
        speedLabels: { slow: '遅い', normal: '普通', fast: '速い' },
        autoPlay: 'オートプレイ',
        auto: 'AUTO',
        scenes: {
          scene1: {
            speaker: 'ナレーター',
            text: '古い書物が所狭しと並ぶ、不思議な図書館に迷い込んだ。古い羊皮紙の香りが漂い、書棚の奥深くから淡い神秘的な光が漏れている……',
            choices: ['光る本を調べる', '出口を探す'],
          },
          scene2a: {
            speaker: 'ナレーター',
            text: '手を伸ばして光る本に触れると、見えない風にページがはためき、ひとりでに本が開いた。古代の文字が目の前で並び替わり、図書館の壁の向こうにある隠された庭園への地図が浮かび上がる……',
            choices: ['地図に従う'],
          },
          scene2b: {
            speaker: 'ナレーター',
            text: 'そびえ立つ書棚の間を縫うように出口を探す。ようやく重厚な木の扉を見つけたが、鍵がかかっている。扉の表面には複雑なパズルが刻まれており、回転するシンボルの環が微かな光を放っている……',
            choices: ['パズルを解く'],
          },
          scene3: {
            speaker: 'ナレーター',
            text: '月明かりに照らされた息をのむほど美しい庭園に足を踏み入れた。涼やかな夜風に桜の花びらが舞い、静かな池へと続く石畳の小道にそっと降り注ぐ。ここでは星がひときわ明るく輝いている。まるでこの庭園が天に近い場所にあるかのように……',
            choices: ['もう一度遊ぶ'],
          },
        },
      },
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
        'RAGナレッジベース：社内技術文書3,000件超を統合、4つのプロダクトチームが日常的に活用',
        'AIコーディングプロセス：5名チームに導入、コードレビュー所要時間を平均2日から当日完了に短縮',
        'iOS/JS通信フレームワーク：7年間にわたり3つの企業モバイルプロダクトで採用',
        '航空地上スタッフ向けヘリコプター運航リアルタイム監視システムのアーキテクチャ設計を主導',
      ],
      howIWork: {
        title: '私の働き方',
        items: [
          { heading: 'Human-AI 共生', description: '開発者はプロダクトマネージャーかつアーキテクチャエンジンに転身し、仕様定義と Vibe の醸成を担当。AIエージェントが実装とデバッグを遂行する——これが Vibecoding です。' },
          { heading: 'Doc-First + ライフサイクルガード', description: 'すべてのタスクは DOC CHECK → PLAN → APPROVAL → ACTION → VERIFY → POST DOC CHECK のフローに従います。承認なしにコードに触れず、すべての成果物にトレーサブルな証拠チェーンを付与します。' },
          { heading: 'テスト＝納品契約', description: 'テストスクリプトを「発注契約」、ソースコードを「履行納品」と位置づけます。テストが先に受入境界を定義し、全テスト緑灯のみマージ可能です。' },
          { heading: 'Claude Reflect — ルール沈殿', description: '日々の修正指摘を自動的にバージョン管理されたルール（ESLintのような）に蒸留し、CLAUDE.mdに書き込んで強制適用。「口頭注意」を「プロジェクトの文書化された記憶」に変換します。' },
        ],
      },
      philosophy: '「新しい技術を学び、チームに浸透させ、プロダクトの価値に変える」',
      contact: {
        title: 'お問い合わせ',
        github: 'GitHub',
        email: 'メール',
      },
      names: {
        title: '名前について',
        items: [
          { name: 'Atsushi Harimoto', description: 'ネット上のハンドルネーム / クリエイティブ名義' },
          { name: 'Akira Cheung', description: '正式なビジネス名' },
        ],
      },
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
            'RAGナレッジベース：社内技術文書3,000件超を統合、4つのプロダクトチームが日常的に活用',
            'AIコーディングプロセス：5名チームに導入、コードレビュー所要時間を平均2日→当日完了に短縮',
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
            '並列APIリクエスト調整により初回画面ロードを1.0秒→0.8秒に短縮',
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
            'データ同期最適化により通信遅延を400ms→200msに短縮',
            'IoTデバイス連携で燃料消費量・メンテナンス状態を可視化',
            '開発標準化とコードレビュー体制を導入',
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
        '橫跨 IoT、航空、金融科技與企業 AI，15 年持續交付產品——現於東京設計「開發者負責架構、AI 負責實作」的人機協作工作流。',
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
    demos: {
      shared: {
        backToHome: '返回首頁',
        backToProjects: '返回專案',
        mockDataBadge: '演示 — 模擬資料',
        source: '原始碼',
      },
      demoGateway: {
        title: '管理控制台',
        subtitle: '多供應商 LLM 閘道管理介面',
        tabs: { users: '使用者', tokens: '權杖', conversations: '對話', messages: '訊息', stats: '統計', console: '主控台' },
        userManagement: '使用者管理',
        createUser: '+ 建立使用者',
        columnsUser: { userId: '使用者 ID', username: '使用者名稱', status: '狀態', actions: '操作' },
        delete: '刪除',
        cancel: '取消',
        tokenManagement: '權杖管理',
        generateToken: '+ 產生權杖',
        columnsToken: { tokenId: '權杖 ID', tokenHash: '權杖雜湊', userId: '使用者 ID', status: '狀態', actions: '操作' },
        revoke: '撤銷',
        conversationTitle: '對話列表',
        newConversation: '+ 新增對話',
        columnsConversation: { convId: '對話 ID', user: '使用者', provider: '供應商', model: '模型', messages: '訊息數', created: '建立時間', status: '狀態', action: '操作' },
        view: '檢視',
        messageTitle: '訊息',
        backToConversations: '\u2190 返回對話列表',
        statsTitle: '供應商統計',
        columnsStats: { provider: '供應商', model: '模型', requests: '請求數', totalTokens: '總權杖數', avgLatency: '平均延遲', p95Latency: 'P95 延遲' },
        consoleTitle: '主控台',
        replayStream: '重播串流',
        stopStream: '停止串流',
        waitingLogs: '等待日誌...',
        noLogs: '尚無日誌。點擊「重播串流」開始。',
      },
      demoDashboard: {
        title: 'Moyin-Dev-Dashboard',
        subtitle: '開發者工作流管理與指標',
        navigation: '導覽',
        systemOnline: '系統在線',
        navItems: { dashboard: '儀表板', sessions: '工作階段', skills: '技能', reports: '報告', kanban: '看板', settings: '設定' },
        statLabels: { totalSessions: '總工作階段', activeSkills: '啟用技能', issuesResolved: '已解決問題', totalTokens: '總權杖數', avgDuration: '平均時長', reportsGenerated: '已生成報告' },
        sessionTrends: '工作階段趨勢',
        last7days: '最近 7 天',
        sessions: '工作階段',
        quickInsights: '快速洞察',
        completionRate: '完成率',
        thisWeek: '本週',
        tasks: '任務',
        todoDoingDone: '待辦 / 進行中 / 已完成',
        errorRate: '錯誤率',
        last24h: '最近 24 小時',
        uptime: '運行時間',
        systemHealth: '系統健康度',
        days: { mon: '一', tue: '二', wed: '三', thu: '四', fri: '五', sat: '六', sun: '日' },
        sessionsPage: {
          active: '進行中',
          paused: '已暫停',
          completed: '已完成',
          totalTokens: '總權杖數',
          tableHeaders: { sessionId: '階段 ID', project: '專案', startTime: '開始時間', duration: '時長', tokens: '權杖', status: '狀態', action: '操作' },
          pause: '暫停',
          resume: '繼續',
        },
        skillsPage: {
          syncAll: '全部同步',
          syncing: '同步中...',
          enabled: '已啟用',
          disabled: '已停用',
          syncingStatus: '同步中',
          lastSync: '上次同步：',
        },
        reportsPage: {
          all: '全部',
          daily: '每日',
          weekly: '每週',
          sprint: '衝刺',
        },
        kanbanPage: {
          todo: '待辦',
          inProgress: '進行中',
          done: '已完成',
        },
        settingsPage: {
          autoSyncSkills: '自動同步技能',
          autoSyncSkillsDesc: '自動從遠端儲存庫同步技能',
          darkMode: '深色模式',
          darkModeDesc: '切換深色模式外觀',
          notifications: '通知',
          notificationsDesc: '啟用事件桌面通知',
          autoCommit: '自動提交',
          autoCommitDesc: '每次工作階段結束後自動提交變更',
          language: '語言',
        },
      },
      demoGame: {
        title: '視覺小說引擎',
        subtitle: 'AI 驅動的動態敘事系統',
        narrator: '旁白',
        scene: '場景',
        menuItems: { save: '存檔', load: '讀檔', settings: '設定', backlog: '對話紀錄', titleMenu: '標題' },
        saveGame: '儲存遊戲',
        loadGame: '載入遊戲',
        clickToSkip: '點擊跳過',
        textSpeed: '文字速度',
        speedLabels: { slow: '慢', normal: '普通', fast: '快' },
        autoPlay: '自動播放',
        auto: 'AUTO',
        scenes: {
          scene1: {
            speaker: '旁白',
            text: '你發現自己身處一座神秘的圖書館，四周堆滿了古老的書籍。空氣中瀰漫著陳舊羊皮紙的氣息，書架深處隱約透出一縷幽幽的光芒……',
            choices: ['查看發光的書', '尋找出口'],
          },
          scene2a: {
            speaker: '旁白',
            text: '你伸手觸碰那本發光的書。它自行翻開，書頁在無形的微風中翻動。古老的文字在你眼前重新排列，浮現出一幅通往圖書館牆外隱秘花園的地圖……',
            choices: ['跟隨地圖'],
          },
          scene2b: {
            speaker: '旁白',
            text: '你穿梭在高聳的書架之間，尋找著出路。終於找到一扇沉重的木門——但門是鎖著的。門面上刻著精巧的謎題：旋轉的符文環閃爍著微弱的光芒……',
            choices: ['解開謎題'],
          },
          scene3: {
            speaker: '旁白',
            text: '你踏入一座沐浴在月光下的絕美花園。櫻花花瓣在涼爽的夜風中輕輕飄落，柔柔地灑在通往寧靜池塘的石板小徑上。這裡的星星格外明亮，彷彿這座花園離天堂更近一些……',
            choices: ['重新開始'],
          },
        },
      },
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
        'RAG 知識庫：整合 3,000+ 內部技術文件，被 4 個產品團隊採用作為日常參考',
        'AI 編碼流程：導入 5 人團隊，代碼審查平均所需時間從 2 天縮短至當天完成',
        'iOS/JS 通訊框架：7 年間應用於 3 款企業行動端產品',
        '主導航空地面人員直升機即時運航監控系統架構設計',
      ],
      howIWork: {
        title: '我的工作方式',
        items: [
          { heading: 'Human-AI 共生', description: '開發者轉型為產品經理與架構發動機，負責定義規格與營造 Vibe；AI 代理承擔實體 Coding 與除錯——這就是 Vibecoding 氛圍編程。' },
          { heading: 'Doc-First + 生命週期守門', description: '每項任務遵循 DOC CHECK → PLAN → APPROVAL → ACTION → VERIFY → POST DOC CHECK。未經審批不動代碼，確保每次交付具備可回查的證據鏈。' },
          { heading: '測試 = 交付合同', description: '視測試腳本為「發包合同」，實際代碼為「履約交付」。測試先行定義驗收邊界，唯有全數綠燈方得合併。' },
          { heading: 'Claude Reflect — 規則沉澱', description: '將日常糾錯自動沉澱為版本化規則（類似 ESLint），寫入 CLAUDE.md 強制執行。把「口頭警告」變成「白紙黑字的專案記憶」。' },
        ],
      },
      philosophy: '「學習新技術，融入團隊，轉化為產品價值。」',
      contact: {
        title: '聯絡方式',
        github: 'GitHub',
        email: '電子郵件',
      },
      names: {
        title: '關於名字',
        items: [
          { name: 'Atsushi Harimoto', description: '網路暱稱 / 創作名義' },
          { name: 'Akira Cheung', description: '正式商務名稱' },
        ],
      },
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
            'RAG 知識庫：整合 3,000+ 內部文件，被 4 個產品團隊採用作為日常參考',
            'AI 編碼流程：導入 5 人團隊，代碼審查平均所需時間從 2 天縮短至當天完成',
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
            '並行 API 請求調優，初始畫面載入從 1.0s 縮短至 0.8s',
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
            '數據同步最佳化，通訊延遲從 400ms 降至 200ms',
            '透過 IoT 裝置整合實現油耗與維護狀態視覺化',
            '導入開發標準化與代碼審查體制',
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
