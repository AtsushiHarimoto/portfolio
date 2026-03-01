# Atsushi Harimoto — ポートフォリオ

[English](../README.md) | [繁體中文](README.zh-TW.md)

WebGLシェーダー・3Dナビゲーション・三言語i18nを搭載した、没入型シネマティックな個人ポートフォリオサイトです。桜ピンク × 深みのあるバイオレットグレーのブランドカラーで統一されています。

**公開サイト:** [atsushiharimoto.github.io/portfolio](https://atsushiharimoto.github.io/portfolio)

---

## 主な機能

- **没入型WebGLヒーロー** — OGL（カスタムGLSL）で描画された全画面水面リップルシェーダー。マウス・タッチに反応
- **3Dナビゲーション** — Three.jsによるアーク配置のカードナビゲーション（奥行きパララックス付き）
- **フローティングスキルバブル** — 物理演算で動くWebGLスキルタグ
- **桜パーティクルシステム** — 環境演出の花びらアニメーション
- **完全i18n対応** — 英語・日本語・繁体字中国語をリロードなしで切り替え
- **ライブデモ** — Moyin Gateway・Dev Dashboard・Gameプロジェクトの組み込みショーケース
- **フィーチャー動画** — 遅延読み込みとCSPサンドボックス付きYouTube埋め込み
- **スクロールトリガーアニメーション** — Framer Motionによるビューポート連動アニメーション
- **静的エクスポート** — GitHub Pages向けの完全プリレンダリング
- **アクセシブルなモーション** — `prefers-reduced-motion` システム設定を尊重

---

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 14（App Router） |
| UIライブラリ | React 18 + TypeScript 5 |
| スタイリング | Tailwind CSS 3 + カスタム `moyin-*` カラートークン |
| アニメーション | Framer Motion 11 + GSAP 3 |
| WebGL | Three.js 0.183 + OGL 1.0（カスタムGLSLシェーダー） |
| アイコン | Lucide React |
| Markdown | react-markdown + remark-gfm |
| 図表 | Mermaid.js |
| ビルド | Vite（Next.js経由） |
| デプロイ | GitHub Pages（静的エクスポート） |

### ブランドデザイントークン

ビジュアルアイデンティティは `tailwind.config.ts` に固定されたパレットを使用しています：

| 役割 | トークン | 値 |
|---|---|---|
| 背景（60%） | `moyin-dark` | `#1a1625` |
| アクセント（10%） | `moyin-pink` | `#ffc0d3` |
| テキストベース（30%） | `moyin-text-primary` | `#e8eef5` |
| 花びらアクセント | `moyin-petal` | `#e8b4d4` |

---

## はじめかた

### 必要環境

- Node.js 20以上
- npm 10以上（または pnpm / yarn）

### インストールとローカル起動

```bash
git clone https://github.com/AtsushiHarimoto/portfolio.git
cd portfolio
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### プロダクションビルド

```bash
npm run build
```

静的ファイルは `out/` ディレクトリに出力されます。任意の静的ホストで配信可能です。

---

## プロジェクト構成

```
portfolio/
├── app/                        # Next.js App Routerページ
│   ├── layout.tsx              # ルートレイアウト（フォント、メタデータ）
│   ├── client-layout.tsx       # クライアントシェル（WebGL背景、ヘッダー、フッター、i18n）
│   ├── page.tsx                # ホームページ（ヒーロー、デモ、CTA）
│   ├── projects/               # プロジェクト一覧・ライブデモ埋め込み
│   ├── articles/               # テクニカル記事（Markdown）
│   ├── career/                 # キャリアタイムライン
│   └── about/                  # Aboutページ
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SakuraBackground.tsx    # 桜花びらパーティクル
│   └── webgl/
│       ├── WaterRippleHero.tsx # OGL水面リップルシェーダー（全画面背景）
│       ├── ImmersiveNav.tsx    # Three.js 3Dナビゲーションカード
│       ├── FloatingSkillBubbles.tsx  # WebGLフローティングスキルタグ
│       ├── FloatingMiniNav.tsx # 内部ページ用コンパクトナビ
│       └── shaders/            # GLSLバーテックス・フラグメントシェーダー
├── lib/
│   ├── i18n.ts                 # 翻訳文字列（en / ja / zh-TW）
│   ├── locale-context.tsx      # Reactコンテキスト + ロケールスイッチャー
│   ├── projects.ts             # プロジェクトデータ
│   └── articles.ts             # 記事メタデータ
├── public/                     # 静的アセット
├── design/                     # デザイン参考資料・トークン
├── next.config.mjs             # 静的エクスポート設定（basePath: /portfolio）
├── tailwind.config.ts          # ブランドカラートークン・カスタムアニメーション
└── tsconfig.json
```

---

## デプロイ

このサイトは静的エクスポートによって **GitHub Pages** にデプロイされています。

`next.config.mjs` の設定：
- `output: 'export'`（プロダクション時のみ）
- `basePath: '/portfolio'`
- `assetPrefix: '/portfolio/'`
- `images.unoptimized: true`（静的エクスポートに必要）

手動デプロイ手順：

```bash
npm run build
# `out/` ディレクトリをgh-pagesブランチにプッシュするか、
# GitHub Actionsで自動デプロイを設定してください。
```

---

## ページ一覧

| ルート | 説明 |
|---|---|
| `/` | ヒーロー（WebGL）・フィーチャー動画・ライブデモ・CTA |
| `/projects/` | プロジェクトカード・ライブデモ埋め込み |
| `/articles/` | テクニカルライティング（Markdownレンダリング） |
| `/career/` | キャリアタイムライン |
| `/about/` | 自己紹介・コンタクト |

---

## ライセンス

[MIT](../LICENSE) — 自分のポートフォリオの参考・出発点として自由にご利用ください。

---

<p align="center">
  Next.jsで構築 · 桜でスタイリング · WebGLで動かす
</p>
