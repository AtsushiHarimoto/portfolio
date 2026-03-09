# Portfolio

> 個人作品集網站 — Next.js 14 + WebGL + 多語言

## 技術棧

- **框架**：Next.js 14.2（App Router）+ React 18.3 + TypeScript 5.4
- **3D**：Three.js 0.183（自訂 GLSL 水波紋 shader）
- **動畫**：Framer Motion 11.0
- **樣式**：Tailwind CSS 3.4
- **圖表**：Mermaid 11.12
- **Markdown**：react-markdown + remark-gfm

## 架構概述

```
app/
├── layout.tsx                  # 根 layout（字型、metadata）
├── client-layout.tsx           # 客戶端 shell（WebGL 背景、Header、Footer、i18n）
├── page.tsx                    # 首頁（WebGL hero）
├── projects/                   # 作品展示
├── articles/[slug]/            # 文章（Markdown）
├── career/                     # 職涯時間軸
└── about/                      # 關於

components/webgl/
├── WaterRippleHero.tsx         # Three.js 水波紋 GLSL shader
├── ImmersiveNav.tsx            # Three.js 3D 導航
└── FloatingSkillBubbles.tsx    # 技能泡泡

lib/
├── i18n.ts                     # 3 語言（en、ja、zh-TW）
├── projects.ts                 # 作品資料
└── articles.ts                 # 文章 metadata
```

## 開發指令

```bash
npm run dev             # 開發伺服器（localhost:3000）
npm run build           # 靜態匯出到 out/（GitHub Pages）
```

## 設計鐵律

- **UI 設計**：必須參考品牌文檔 `workspace/knowledge/00_projects/06_BRAND_DESIGN/`

## 關鍵路徑

| 用途 | 路徑 |
|------|------|
| Next.js 配置 | `next.config.mjs`（static export，basePath: `/portfolio`）|
| Tailwind 主題 | `tailwind.config.ts` |
| i18n | `lib/i18n.ts`（en、ja、zh-TW）|
| 作品資料 | `lib/projects.ts` |

## 備註

- 此專案為 git submodule，`.claude/` 已加入 `.gitignore`
- 生產環境 basePath: `/portfolio`
