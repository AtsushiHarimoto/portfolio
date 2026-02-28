# MCP サーバー開発ガイド

> **タイプ**: 開発ガイド
> **日付**: 2026-02-26
> **ステータス**: スケルトン（Skeleton）
> **関連**: `12_diagrams/08.Moyin_MCP_Architecture.md`、`11_vibecoding_agent_mcp.md`

---

## 概要

Model Context Protocol（MCP）は、Anthropic が提唱するオープンプロトコル（Protocol）で、LLM が標準化された方法で外部ツールやデータソースに接続できるようにするものです。本文では MCP Server の原理、開発フロー、テスト、デプロイについて解説します。

---

## 1. MCP の核心概念

### 1.1 プロトコルの役割

```
Host（Claude Code / IDE）
  └── Client（MCP Client、Host に内蔵）
        └── Server（あなたが開発する MCP Server）
              └── Resources / Tools / Prompts
```

### 1.2 3 つのプリミティブ（Primitive）

| プリミティブ | 用途 | アナロジー |
|------|------|------|
| **Tools** | エージェントが呼び出せる関数 | REST API エンドポイント |
| **Resources** | 読み取り可能なデータソース | GET エンドポイント / ファイル |
| **Prompts** | 事前定義されたプロンプトテンプレート | スラッシュコマンド（Slash command） |

### 1.3 トランスポート方式

| トランスポート | 適用シーン | 特徴 |
|------|----------|------|
| **stdio** | ローカルサーバー | 最もシンプル、プロセス間通信 |
| **SSE (HTTP)** | リモートサーバー | クロスネットワーク対応、認証処理が必要 |
| **Streamable HTTP** | 新バージョン推奨 | 双方向ストリーミング（Streaming）対応 |

---

## 2. 開発フロー

### 2.1 技術選定

| 言語 | SDK | 適用シーン |
|------|-----|----------|
| TypeScript | `@modelcontextprotocol/sdk` | フロントエンドエコシステム、ラピッドプロトタイピング |
| Python | `mcp` (PyPI) | データ処理、ML 統合 |

### 2.2 最小構成サーバー（TypeScript）

```typescript
// スケルトン例示、本番コードではありません
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// Tool を登録
server.tool("greet", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));

// 起動
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2.3 開発ステップ

```
1. 要件定義 → この Server はどんな問題を解決するのか？
2. Tool スキーマ設計 → 入出力の JSON Schema
3. ハンドラー実装 → ビジネスロジック
4. ローカルテスト → MCP Inspector / 手動テスト
5. Claude Code に設定 → settings.json
6. 統合テスト → 実際の会話で検証
7. デプロイ → ローカル stdio またはリモート HTTP
```

---

## 3. Tool 設計のベストプラクティス

### 3.1 命名規則

- 動詞で始める：`get_`、`create_`、`search_`、`validate_`
- 明確な説明：Tool の description はエージェントがツールを選択する判断基準になります
- 曖昧さを避ける：`process_data` -- NG → `parse_csv_to_json` -- OK

### 3.2 スキーマ設計

| 原則 | 説明 |
|------|------|
| 最小パラメータ | 必要なパラメータのみ公開し、エージェントのエラー率を低減 |
| 明確な型定義 | enum で選択肢を制限し、description で形式を説明 |
| 合理的なデフォルト値 | default 値を提供し、必須項目を削減 |
| 構造化エラー | 生の文字列ではなく、構造化されたエラーメッセージを返却 |

### 3.3 セキュリティ考慮事項

- エージェントの入力を信頼しない → すべてのパラメータを検証
- ファイルアクセス範囲を制限 → ホワイトリスト（Whitelist）ディレクトリ
- 機密操作には確認が必要 → 確認プロンプトを返してエージェントに二重確認させる
- コマンドインジェクション（Command Injection）を防止 → シェルコマンドを直接結合しない

---

## 4. テスト

### 4.1 テストツール

| ツール | 用途 |
|------|------|
| MCP Inspector | 公式 GUI テストツール、Tool 呼び出しの可視化 |
| `npx @anthropic/mcp-inspector` | Inspector のクイック起動 |
| ユニットテスト | ハンドラー関数を直接テスト |

### 4.2 テストチェックリスト

- [ ] 正常入力 → 期待される出力
- [ ] 境界値 → 空文字列、超長入力、特殊文字
- [ ] エラーハンドリング → 無効なパラメータ、外部サービス不可用
- [ ] タイムアウト処理 → 長時間操作の中断動作

---

## 5. 設定とデプロイ

### 5.1 Claude Code の設定（settings.json）

```jsonc
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/server/index.js"],
      "env": {
        "API_KEY": "..."
      }
    }
  }
}
```

### 5.2 設定階層

| 階層 | 場所 | 適用範囲 |
|------|------|------|
| プロジェクトレベル | `.mcp.json`（プロジェクトルート） | チーム共有 |
| ユーザーレベル | `~/.claude/settings.json` | 個人 / グローバル |

---

## 6. Moyin の既存 MCP Server

> TODO: Moyin プロジェクトで開発済み / 使用中の MCP Server の棚卸し

| Server | 用途 | 場所 |
|--------|------|------|
| （棚卸し中） | | |

---

## 今後の深掘り項目

- [ ] Resource と Prompt プリミティブの開発ガイド
- [ ] SSE / Streamable HTTP トランスポートの実装詳細
- [ ] MCP Server の認証・認可方式
- [ ] `21_agent_system_design.md` の Tool Layer との対応関係
- [ ] サーバーパフォーマンス最適化とコネクションプーリング（Connection Pooling）
