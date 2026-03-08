# MCP 伺服器開發指南 (MCP Dev Guide)

## @概覽

Model Context Protocol (MCP) 是 Anthropic 提出的開放協議，讓 LLM 能以標準化方式連接外部工具與數據源。本文涵蓋 MCP Server 的原理、開發流程、測試與部署。

---

## 1. MCP 核心概念

### 1.1 協議角色

```text
Host (Claude Code / IDE)
  └── Client (MCP Client，內建於 Host)
        └── Server (你開發的 MCP Server)
              └── Resources / Tools / Prompts
```

### 1.2 三大原語 (Primitives)

- **Tools**：Agent 可呼叫的函數。類比於 REST API 的端點。
- **Resources**：可讀取的數據源。類比於 GET 端點或本地檔案。
- **Prompts**：預編義的提示模板。類似於斜槓命令 (Slash command)。

---

## 2. 開發流程（TypeScript 示例）

### 2.1 最小可用 Server (MVP)

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// 註冊一個工具 (Tool)
server.tool("greet", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));

// 啟動 (使用標準備輸入輸出傳輸)
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2.2 開發步驟 (Steps)

1.  **定義需求**：這個 Server 要解決什麼問題？
2.  **設計 Tool Schema**：定義輸入/輸出的 JSON Schema（確保寫好讓 AI 易讀的描述）。
3.  **實作 Handler**：撰寫核心業務邏輯。
4.  **本地測試**：透過 `MCP Inspector` 進行視覺化偵錯。
5.  **配置**：將 Server 路徑加入 `settings.json`。

---

## 3. 工具設計最佳實踐

### 3.1 命名規範 (Naming)

- **動詞開頭**：如 `get_data`、`search_files`、`validate_id`。
- **精確描述**：Tool 的 `description` 是 Agent 決定是否使用該工具的唯一憑據，務必精準。
- **最小化參數**：精簡參數設計，降低 Agent 推理出錯的機率。

### 3.2 安全考量 (Security)

- **參數驗證**：永遠不要信任 Agent 的輸入，務必在 Server 端驗證所有參數。
- **權限限制**：若涉及檔案存取，務必限制在白名單目錄內。
- **敏感操作確認**：對於具備破壞性的操作，可返回確認提示，強迫 Agent 詢問 User 獲得授權。

---

## 4. 測試與偵錯

- **MCP Inspector**：官方提供的 GUI 測試工具。執行 `npx @anthropic/mcp-inspector` 啟動，可直觀測試工具呼叫流程。
- **單元測試**：強烈建議對 Handler 函數進行獨立的單元測試。

---

## 5. 配置與部署 (Deployment)

在配置檔案（如 `~/.claude/settings.json`）的 `mcpServers` 區塊中加入你的 Server 即可生效。

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

透過將外部能力標準化為 MCP，你可以讓 AI 助手具備更強大的、可擴展的生產力。

---

👉 **[下一篇：Claude Agent SDK 活用](./24_claude_agent_sdk.md)**
