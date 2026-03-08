# MCP サーバー開発ガイド：LLM を外部ツールと接続する標準プロトコルの実装 (MCP Dev Guide)

## @Overview

Model Context Protocol (MCP) は、Anthropic が提唱したオープンなプロトコルであり、LLM が標準化された方法で外部ツールやデータソースに接続できるようにするものです。本ガイドでは、MCP サーバーの原理、開発フロー、テスト、およびデプロイについて解説します。

---

## 1. MCP のコア概念

### 1.1 アーキテクチャ構成

```text
Host (Claude Code / IDE)
  └── Client (Host 内蔵の MCP クライアント)
        └── Server (開発する MCP サーバー)
              └── Resources / Tools / Prompts
```

### 1.2 3大要素 (Primitives)

- **Tools**: エージェントが実行可能な関数。REST API のエンドポイントに相当。
- **Resources**: 読み取り可能なデータソース。GET エンドポイントやファイルに相当。
- **Prompts**: 事前に定義されたプロンプトテンプレート。Slash command 等。

---

## 2. 開発ワークフロー（TypeScript 例）

### 2.1 最小構成のサーバー

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// Tool の登録
server.tool("greet", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));

// 起動 (stdio 通信)
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2.2 開発ステップ

1.  **要件定義**: そのサーバーで何の課題を解決するか？
2.  **Schema 設計**: ツールが受け取る JSON Schema を定義（AI が理解しやすい説明を書く）。
3.  **Handler 実装**: 実際のロジックを記述。
4.  **テスト**: `MCP Inspector` を使用して動作確認。
5.  **設定反映**: `settings.json` にサーバーを追加。

---

## 3. ベストプラクティス

### 3.1 ツール設計

- **命名**: 動詞で始める（例: `get_data`, `search_files`）。
- **説明 (Description)**: エージェントが「いつこのツールを使うべきか」を判断する唯一の手がかりです。具体的かつ明確に記述してください。
- **最小限の引数**: パラメータを絞り込み、エージェントの推論ミスを減らします。

### 3.2 セキュリティ

- **入力のバリデーション**: エージェントからの入力を盲信せず、必ず検証してください。
- **アクセス制限**: ファイル操作等はホワイトリスト形式でディレクトリを制限します。
- **重要操作の確認**: 破壊的な操作を行う前には、エージェントにユーザーへの確認を求めるレスポンスを返させます。

---

## 4. デバッグとテスト

- **MCP Inspector**: 官方が提供する GUI テストツールです。`npx @anthropic/mcp-inspector` で起動し、視覚的にツールの呼び出しをテストできます。
- **単元テスト**: Handler 関数そのものを直接テストするコードを書くことが推奨されます。

---

## 5. 配置 (Configuration)

`settings.json` (例: `~/.claude/settings.json`) にサーバーを登録することで、AI がそのツールを認識できるようになります。

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/absolute/path/to/server/index.js"],
      "env": { "API_KEY": "..." }
    }
  }
}
```

これらの手順に従うことで、独自の能力を AI に持たせ、開発効率を飛躍的に向上させることができます。

---

👉 **[Next Step: Claude Agent SDK 活用](./24_claude_agent_sdk.md)**
