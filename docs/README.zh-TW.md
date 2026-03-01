# Atsushi Harimoto — 個人作品集

[English](../README.md) | [日本語](README.ja.md)

一個融合 WebGL 著色器、3D 導航與三語言 i18n 支援的沉浸式電影風格個人作品集網站。以櫻花粉搭配深紫灰的品牌色系為核心視覺語言。

**線上網站：** [atsushiharimoto.github.io/portfolio](https://atsushiharimoto.github.io/portfolio)

---

## 核心功能

- **沉浸式 WebGL 英雄區** — 使用 OGL（自訂 GLSL）渲染的全螢幕水面漣漪著色器，響應滑鼠與觸控
- **3D 導航** — 基於 Three.js 的弧形排列卡片導航，帶景深視差效果
- **浮動技能泡泡** — 物理驅動的 WebGL 技能標籤動態呈現
- **櫻花粒子系統** — 環境氛圍的花瓣飄落動畫
- **完整 i18n 支援** — 英語、日語（日本語）、繁體中文，零重整頁面切換語系
- **即時 Demo** — 內嵌 Moyin Gateway、Dev Dashboard 及 Game 專案展示
- **精選影片** — 帶延遲載入與嚴格 CSP 沙箱的 YouTube 嵌入
- **捲動觸發動畫** — Framer Motion 視口感知動畫貫穿全站
- **靜態匯出** — 為 GitHub Pages 完全預渲染的 HTML
- **無障礙動態效果** — 尊重系統的 `prefers-reduced-motion` 偏好設定

---

## 技術棧

| 層級 | 技術 |
|---|---|
| 框架 | Next.js 14（App Router） |
| UI 函式庫 | React 18 + TypeScript 5 |
| 樣式 | Tailwind CSS 3 + 自訂 `moyin-*` 色彩 Token |
| 動畫 | Framer Motion 11 + GSAP 3 |
| WebGL | Three.js 0.183 + OGL 1.0（自訂 GLSL 著色器） |
| 圖示 | Lucide React |
| Markdown | react-markdown + remark-gfm |
| 圖表 | Mermaid.js |
| 建構 | Vite（透過 Next.js） |
| 部署 | GitHub Pages（靜態匯出） |

### 品牌設計 Token

視覺識別系統使用固定於 `tailwind.config.ts` 的色盤：

| 用途 | Token | 色值 |
|---|---|---|
| 背景（60%） | `moyin-dark` | `#1a1625` |
| 強調色（10%） | `moyin-pink` | `#ffc0d3` |
| 文字基底（30%） | `moyin-text-primary` | `#e8eef5` |
| 花瓣強調 | `moyin-petal` | `#e8b4d4` |

---

## 快速開始

### 環境需求

- Node.js 20 以上
- npm 10 以上（或 pnpm / yarn）

### 安裝與本機執行

```bash
git clone https://github.com/AtsushiHarimoto/portfolio.git
cd portfolio
npm install
npm run dev
```

在瀏覽器開啟 [http://localhost:3000](http://localhost:3000)。

### 建構正式版本

```bash
npm run build
```

靜態檔案輸出至 `out/` 目錄，可直接部署至任何靜態主機。

---

## 專案結構

```
portfolio/
├── app/                        # Next.js App Router 頁面
│   ├── layout.tsx              # 根版面（字型、Metadata）
│   ├── client-layout.tsx       # 客戶端殼層（WebGL 背景、頁首、頁尾、i18n）
│   ├── page.tsx                # 首頁（英雄區、Demo、CTA）
│   ├── projects/               # 專案列表與即時 Demo 嵌入
│   ├── articles/               # 技術文章（Markdown）
│   ├── career/                 # 職涯時間軸
│   └── about/                  # 關於頁面
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SakuraBackground.tsx    # 櫻花花瓣粒子系統
│   └── webgl/
│       ├── WaterRippleHero.tsx # OGL 水面漣漪著色器（全螢幕背景）
│       ├── ImmersiveNav.tsx    # Three.js 3D 導航卡片
│       ├── FloatingSkillBubbles.tsx  # WebGL 浮動技能標籤
│       ├── FloatingMiniNav.tsx # 內頁用精簡導航
│       └── shaders/            # GLSL 頂點與片段著色器
├── lib/
│   ├── i18n.ts                 # 翻譯字串（en / ja / zh-TW）
│   ├── locale-context.tsx      # React Context + 語系切換 Hook
│   ├── projects.ts             # 專案資料
│   └── articles.ts             # 文章 Metadata
├── public/                     # 靜態資源
├── design/                     # 設計參考資料與 Token
├── next.config.mjs             # 靜態匯出設定（basePath: /portfolio）
├── tailwind.config.ts          # 品牌色彩 Token 與自訂動畫
└── tsconfig.json
```

---

## 部署

本站透過靜態匯出部署至 **GitHub Pages**。

`next.config.mjs` 關鍵設定：
- `output: 'export'`（僅正式環境）
- `basePath: '/portfolio'`
- `assetPrefix: '/portfolio/'`
- `images.unoptimized: true`（靜態匯出必要設定）

手動部署流程：

```bash
npm run build
# 將 `out/` 目錄推送至 gh-pages 分支，
# 或設定 GitHub Actions 自動部署。
```

---

## 頁面總覽

| 路由 | 說明 |
|---|---|
| `/` | 英雄區（WebGL）、精選影片、即時 Demo、CTA |
| `/projects/` | 專案卡片與即時 Demo 嵌入 |
| `/articles/` | 技術文章（Markdown 渲染） |
| `/career/` | 職涯時間軸 |
| `/about/` | 自我介紹與聯絡方式 |

---

## 授權

[MIT](../LICENSE) — 歡迎作為參考或個人作品集的起點自由使用。

---

<p align="center">
  以 Next.js 建構 · 以櫻花設計 · 以 WebGL 驅動
</p>
