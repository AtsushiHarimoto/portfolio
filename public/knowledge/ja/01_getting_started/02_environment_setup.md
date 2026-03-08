# 開発環境の武装：ランタイム構築と高速デプロイガイド (Environment Setup)

## @Overview

モダンな AI プロジェクトを円滑に進めるためには、堅牢なランタイム環境の構築が不可欠です。Moyind プロジェクトでは、パフォーマンスと依存関係管理の効率を極限まで高めるため、特定のツールセットを標準採用しています。本稿では、フロントエンドから AI 推論層までを確実に動作させるための環境構築手順と、典型的なトラブルシューティングについて解説します。

---

## 1. 開発の基盤：二大ランタイムと管理ツール (Prerequisites)

環境構築における最大の敵は「依存関係の競合（Dependency Hell）」です。これを回避するため、以下のモダンなツールセットを導入してください。

### 🚄 ① フロントエンド & ゲートウェイ：Node.js & pnpm

フロントエンド開発および API ルーティングの中核を担います。

- **Node.js** (`v18.x` または `v22.x` 以上の LTS 版)
  - **役割**: アプリケーションのビルド、ホットリロード、および Gateway API の実行エンジン。
- **pnpm (Performant Node Package Manager)**
  - **役割**: 高速かつディスク容量を節約するパッケージマネージャー。
  - **導入**: Node.js インストール後、`npm i -g pnpm` で導入。従来の `npm` よりも高速なインストールと、ハードリンクによる効率的なストレージ管理を実現します。

### 🌋 ② AI 演算 & 自動化：Python & uv

AI 推論、機械学習モデルのロード、および各種自動化スクリプトの実行に不可欠です。

- **Python** (`3.10` 以上)
  - **役割**: PyTorch などの機械学習フレームワークの実行環境。
- **uv (Fast Python Package Installer)**
  - **役割**: Rust 製の超高速パッケージマネージャー。
  - **導入**: `pip install uv` で導入。従来の `pip` や `poetry` を圧倒する速度で、数百 MB 規模の AI ライブラリも瞬時にインストール可能です。

---

## 2. 起動プロセス：ローカルサービスの点火 (Local Startup)

開発環境が整ったら、以下の手順で各サービスを起動します。

### 🔌 ① API ゲートウェイの起動 (`moyin-gateway`)

システムのハブとなるゲートウェイを起動します。

```bash
cd projects/moyin-gateway
# Windows (PowerShell) の場合
./run_game_api.ps1
# macOS / Linux の場合
chmod +x run_game_api.sh && ./run_game_api.sh
```

### 🖥️ ② フロントエンド管理画面の起動 (`moyin-web`)

別のターミナルを開き、Vite による高速開発モードを有効にします。

```bash
cd projects/moyin-web
pnpm install
pnpm run dev
```

---

## 3. 典型的なトラブルシューティング (Common Issues)

Windows 環境等で頻発する既知の課題とその解決策です。

- **💣 Case A: `Unsupported Engine` エラー**
  - **原因**: Node.js のバージョンが古い。
  - **解決**: 最新の LTS バージョンを再インストールし、ランタイムを更新してください。
- **💣 Case B: `node_modules` が削除できない / パスが長すぎる**
  - **原因**: Windows 特有のディレクトリ階層の深さ制限。
  - **解決**: エクスプローラーではなく、ターミナルから `npx rimraf node_modules` を実行することで、強力に強制削除が可能です。

---

## 💡 アーキテクトによる環境管理のコツ

環境構築でエラーが発生した際、手動で設定を書き換える前に、必ず AI エージェントにターミナルのログ（Error Stack Trace）を読み取らせてください。

Vibecoding のワークフローでは、**「AI にシステムの現状を診断させ、最適なパッチスクリプトを生成・実行させる」** のが最も確実な手法です。開発者はツールを準備し、AI はそのツールを駆使して環境を維持する。この分業が、開発効率を最大化する鍵となります。

---

👉 **[Next Step: PowerShell エイリアスと効率化](./03_powershell_alias_cheat_sheet.md)**
