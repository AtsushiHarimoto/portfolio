# SL3. Remotion Factory — 影片自動化生成工廠

> 對應代碼庫：`projects/remotion-factory/`
> 狀態：Phase 1 完成 | 類型：內容輸出工具（Standalone）

## 一句話介紹
基於 React 和 Remotion 框架構建的程式化影片生成工具，專為交易 Bot 打造的自動化社群媒體內容輸出管道。

## 用途與背景
本專案是交易 Bot 商業化與社群運營的核心「內容輸出端」。它可以將交易 Bot 每日或每週產出的結構化數據（JSON）與分析報告，直接轉換為具有動態視覺效果與音效同步的動畫影片。

透過動態解析與多格式支援的設計，同一套代碼能夠自動適配不同的長寬比與時長，無縫發布至 YouTube 與 B站（16:9 橫向）以及 TikTok 和 Shorts（9:16 直向）等主流影音平台。這大幅降低了人工剪輯的維護成本，實現了從「市場數據捕捉」到「自動化影音曝光」的完整閉環。

## 技術架構

### 技術棧

| 類別 | 技術/工具 | 說明 |
| :--- | :--- | :--- |
| **核心框架** | Remotion 4.0.438 | 基於 React 的程式化影片渲染引擎 |
| **前端演現** | React 18.3.1 | 組件化 UI 開發 |
| **開發語言** | TypeScript | 提供強型別保護與開發者體驗 |
| **套件管理** | pnpm | 輕量且快速的依賴管理 |
| **代碼規範** | Prettier + ESLint | 統一的代碼風格與語法檢查 |

### 目錄結構

```text
remotion-factory/
├── src/
│   ├── index.ts                    # Remotion 入口（註冊所有的 compositions）
│   ├── Root.tsx                    # 根組件（處理多格式切換 16:9 / 9:16）
│   ├── calculateMetadata.ts        # 動態解析格式與計算影片總時長
│   ├── AudioLayer.tsx              # 音頻層管理（處理 BGM 與旁白同步）
│   ├── compositions/               # 核心影片範本目錄
│   │   ├── DailyReport.tsx         # 日報範本（主力，支援多平台）
│   │   ├── WeeklyWatchlist.tsx     # 週報範本
│   │   ├── StrategyEdu.tsx         # 策略教育範本
│   │   └── scenes/                 # 各範本模組化的獨立場景組件
│   │       ├── IntroScene.tsx      # 開場動畫
│   │       ├── MarketRegimeScene.tsx # 市場制度視圖
│   │       ├── WatchlistScene.tsx  # 監視名單視圖
│   │       ├── ReviewScene.tsx     # 複盤視圖
│   │       ├── EduScene.tsx        # 教育內容視圖
│   │       └── OutroScene.tsx      # 結尾動畫
│   └── data/                       # 數據與配置傳入層
│       ├── mock-daily-report.json  # 開發用的測試數據
│       ├── audio_manifest.json     # 日報音頻時間軸清單
│       └── weekly_audio_manifest.json # 週報音頻時間軸清單
└── public/
    └── audio/                      # 靜態音檔資源
        ├── bgm/                    # 背景音樂
        └── narration/              # 旁白音檔
```

### Composition 說明

- **DailyReport（日報範本）**：專案的核心主力範本，用於自動生成每日交易概況。內部包含了 `Intro`、`MarketRegime`、`Review` 等多個可替換場景。原生支援 16:9（YouTube/B站）及 9:16（TikTok/Shorts）雙格式的自適應佈局。
- **WeeklyWatchlist（週報範本）**：針對每週監視名單生成的動畫影片，主要串接 `WatchlistScene` 及相關的深度市場掃描視圖展示。
- **StrategyEdu（策略教育範本）**：用於生成量化教學或策略理念講解影片，整合 `EduScene` 模組，專注於靜態視圖與文本知識的動態化展示。

## 與 Trading Bot 的數據流

```text
[ Trading Bot ] 
      │ (輸出結構化的每日數據 / 分析報告)
      ▼
[ JSON 數據檔案 & Audio Manifest ] 
      │ (自動輸入 / 讀取至 Remotion Factory)
      ▼
[ Remotion 核心渲染引擎 ] 
  ├── 動態解析（calculateMetadata.ts 處理時長）
  ├── 組裝視圖（多個 Scene 組件化拼裝）
  └── 音頻整合（AudioLayer 掛載 BGM + 旁白同步）
      │ (透過 Remotion CLI 自動化渲染導出)
      ▼
[ 影片分發網絡 (多格式 MP4) ]
  ├── 16:9 橫向影片  ➔  YouTube / Bilibili
  └──  9:16 直向影片  ➔  TikTok / YouTube Shorts / IG Reels
```

## 快速上手

開發與預覽：

```bash
# 1. 安裝環境依賴
pnpm install

# 2. 啟動開發伺服器 (會自動開啟瀏覽器進入 Remotion Studio)
pnpm start
```

 CLI 命令行渲染影片：

```bash
# 渲染日報 16:9 版本為 MP4
npx remotion render src/index.ts DailyReport out/daily-report-16-9.mp4

# 可透過 props 直接帶入最新鮮的 JSON 數據路徑進行動態渲染
npx remotion render src/index.ts DailyReport out/report.mp4 --props='{"dataPath": "./data/latest-report.json"}'
```

## Phase 路線圖

- **Phase 1（完成）**：DailyReport 範本可用。完成場景模組化、多格式動態解析、16:9/9:16 視圖適配與基礎音頻層同步管理。
- **Phase 2（計劃中）**：自動化管道整合。實現 `Bot 輸出 JSON → 觸發 Remotion CLI 自動渲染 → API 自動上傳至社群平台` 的無人值守工作流。
- **Phase 3（未來）**：AI 旁白生成深度整合。接入 IndexTTS / ASMR-TTS 工作流，根據 Bot 文本即時生成旁白音檔與時間戳，全流程無縫對接。

## 相關文檔

- `workspace/stock/trading-bot/` — 數據來源（Trading Bot 引擎）
- `projects/index-tts/` / `projects/asmr-tts/` — 旁白語音生成專案（預備於 Phase 3 未來整合）
