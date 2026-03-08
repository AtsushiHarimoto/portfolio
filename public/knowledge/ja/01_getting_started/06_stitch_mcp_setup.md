# Google Stitch MCP 連携ガイド：AI に「神の視点」を授けるセットアップ (Optional)

## @Overview

「デザインモックから一瞬でコードを生成する」。これは、かつてフロントエンドエンジニアの夢でしたが、2026 年、**Google Stitch** によって現実のものとなりました。Google Labs が開発したこの前衛的な AI デザインアシスタントは、競合制の App や Figma のスクリーンショットを一瞥するだけで、そのレイアウト構造を解体し、プロダクションレベルのコードを高精度で出力します。本稿では、AI に「視覚」を授けるための、Google Stitch MCP サーバーのセットアップ手順について解説します。

---

## 1. Google Stitch MCP とは：視覚的な推論のゲートウェイ

従来の AI（LLM）はテキストベースの「盲目」な存在でしたが、Stitch MCP を仲介させることで、以下の高度な視覚スキルの行使が可能になります。

- 👁️ **`extract_design_context` (デザイン意図の抽出)**: スクリーンショットからフォントサイズ、カラーコード、パディング、シャドウの深さなどのデザインボキャブラリーを正確にスキャンします。
- ⚙️ **`fetch_screen_code` (コード合成)**: 解析した情報を元に、Tailwind CSS や Vue/React のコンポーネント構造を逆方向から「錬金」します。

---

## 2. 前提条件：ライセンスとツール

- **Google Cloud アカウント**: クラウド演算リソースを利用するための管理権限。
- **Node.js**: MCP サーバーの実行環境。
- **Google Stitch Beta アクセス権**: 事前の申請が必要です 👉 [公式申請ページ](https://stitch.withgoogle.com)。

---

## 3. セットアップ SOP：神格の招喚

### 🏛️ Step 1: Google Cloud プロジェクトの構築

1. [Google Cloud Console](https://console.cloud.google.com) にログイン。
2. 「新しいプロジェクトを作成」を選択し、任意の名称（例: `moyind-stitch`）で作成。
3. **プロジェクト ID**（例: `moyind-stitch-456789`）を必ず記録してください。後の設定で必須となります。

### 🛠️ Step 2: Google Cloud CLI (gcloud) の導入

ローカル環境と Google のサーバーを認証で繋ぐための通信プラットフォームを導入します。

- **Windows (PowerShell)**:
  ```powershell
  Invoke-WebRequest -Uri "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe" -OutFile "$env:TEMP\GoogleCloudSDKInstaller.exe"
  Start-Process -FilePath "$env:TEMP\GoogleCloudSDKInstaller.exe" -Wait
  ```
  _※インストール時に「Add gcloud to PATH」に必ずチェックを入れてください。_
- **macOS / Linux**:
  ```bash
  brew install --cask google-cloud-sdk
  ```

### 🔑 Step 3: 認証と API の有効化 (Authentication)

ターミナルから以下のコマンドを順に実行し、プロジェクトをリンクします。

```bash
# 1. Google アカウントによるログイン
gcloud auth login

# 2. プロジェクトの紐付け (記録した Project ID に置換)
gcloud config set project [YOUR_PROJECT_ID]

# 3. デフォルト認証情報の生成 (MCP サーバーに必須)
gcloud auth application-default login

# 4. Stitch API サービスの有効化
gcloud services enable stitch.googleapis.com
```

### 🔌 Step 4: MCP サーバー設定の注入

AI ツールに対象の MCP サーバーを認識させます。

- **Antigravity の場合**: `%USERPROFILE%\.gemini\antigravity\mcp_config.json`
- **Cursor の場合**: プロジェクト内の `.cursor/mcp.json`

JSON 内の `mcpServers` オブジェクトに以下の設定を追加します。

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "stitch-mcp"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "[YOUR_PROJECT_ID]"
      }
    }
  }
}
```

---

## 💡 アーキテクトによる実務アドバイス

Stitch MCP を導入後、AI にデザイン依頼を出す際は、単なる「模倣」ではなく「プロジェクトのデザインシステムへのマッピング」を命じることが重要です。

指示の例：「この画像から UI を復元して。ただし、カラーや間隔はプロジェクト内の **Tailwind Design Tokens** （`theme.css`）に厳密に準拠させ、独自の HEX コードのハードコーディングは禁止する」。

これにより、外界から持ち込まれたデザイン案を、Moyind プロジェクトの統制されたコードとして瞬時に咀嚼・出力させることが可能となります。

---

👉 **[Next Step: プロフェッショナルなポートフォリオへの昇華](./README.md)**
