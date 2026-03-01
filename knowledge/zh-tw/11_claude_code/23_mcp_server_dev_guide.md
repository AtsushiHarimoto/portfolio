# 23. MCP 伺服器開發指南

> **類型**: 開發指南
> **日期**: 2026-02-26
> **狀態**: 骨架
> **關聯**: `12_diagrams/08.Moyin_MCP_Architecture.md`、`11_vibecoding_agent_mcp.md`

---

## 摘要

Model Context Protocol (MCP) 是 Anthropic 提出的開放協議，讓 LLM 能以標準化方式連接外部工具與數據源。本文涵蓋 MCP Server 的原理、開發流程、測試與部署。

---

## 1. MCP 核心概念

### 1.1 協議角色

```
Host (Claude Code / IDE)
  └── Client (MCP Client，內建於 Host)
        └── Server (你開發的 MCP Server)
              └── Resources / Tools / Prompts
```

### 1.2 三大原語

| 原語 | 用途 | 類比 |
|------|------|------|
| **Tools** | Agent 可呼叫的函數 | REST API endpoint |
| **Resources** | 可讀取的數據源 | GET endpoint / 檔案 |
| **Prompts** | 預定義的提示模板 | Slash command |

### 1.3 傳輸方式

| 傳輸 | 適用場景 | 特點 |
|------|----------|------|
| **stdio** | 本地 Server | 最簡單，進程間通訊 |
| **SSE (HTTP)** | 遠端 Server | 支持跨網路，需處理 auth |
| **Streamable HTTP** | 新版推薦 | 支持雙向串流 |

---

## 2. 開發流程

### 2.1 技術選型

| 語言 | SDK | 適用場景 |
|------|-----|----------|
| TypeScript | `@modelcontextprotocol/sdk` | 前端生態、快速原型 |
| Python | `mcp` (PyPI) | 數據處理、ML 整合 |

### 2.2 最小可用 Server（TypeScript）

```typescript
// 骨架示意，非完整代碼
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

// 註冊 Tool
server.tool("greet", { name: z.string() }, async ({ name }) => ({
  content: [{ type: "text", text: `Hello, ${name}!` }],
}));

// 啟動
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2.3 開發步驟

```
1. 定義需求 → 這個 Server 要解決什麼問題？
2. 設計 Tool Schema → 輸入/輸出 JSON Schema
3. 實作 Handler → 業務邏輯
4. 本地測試 → MCP Inspector / 手動測試
5. 配置到 Claude Code → settings.json
6. 整合測試 → 實際對話中驗證
7. 部署 → 本地 stdio 或遠端 HTTP
```

---

## 3. Tool 設計最佳實踐

### 3.1 命名規範

- 動詞開頭：`get_`, `create_`, `search_`, `validate_`
- 清晰描述：Tool description 是 Agent 選擇工具的依據
- 避免模糊：`process_data` ✗ → `parse_csv_to_json` ✓

### 3.2 Schema 設計

| 原則 | 說明 |
|------|------|
| 最小參數 | 只暴露必要參數，減少 Agent 出錯機率 |
| 明確型別 | 用 enum 限制選項，用 description 說明格式 |
| 合理預設 | 提供 default 值減少必填項 |
| 錯誤回傳 | 返回結構化錯誤訊息，而非裸字串 |

### 3.3 安全考量

- 不信任 Agent 輸入 → 驗證所有參數
- 限制檔案存取範圍 → 白名單目錄
- 敏感操作需確認 → 返回確認提示讓 Agent 二次確認
- 避免指令注入 → 不直接拼接 shell 命令

---

## 4. 測試

### 4.1 測試工具

| 工具 | 用途 |
|------|------|
| MCP Inspector | 官方 GUI 測試工具，可視化 Tool 呼叫 |
| `npx @anthropic/mcp-inspector` | 快速啟動 Inspector |
| 單元測試 | 直接測試 handler 函數 |

### 4.2 測試要點

- [ ] 正常輸入 → 預期輸出
- [ ] 邊界值 → 空字串、超長輸入、特殊字元
- [ ] 錯誤處理 → 無效參數、外部服務不可用
- [ ] 超時處理 → 長時間操作的中斷行為

---

## 5. 配置與部署

### 5.1 Claude Code 配置（settings.json）

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

### 5.2 配置層級

| 層級 | 位置 | 適用 |
|------|------|------|
| 專案級 | `.mcp.json` (專案根目錄) | 團隊共享 |
| 用戶級 | `~/.claude/settings.json` | 個人通用 |

---

## 6. Moyin 現有 MCP Server

> TODO: 盤點 Moyin 專案中已開發/使用的 MCP Server 清單

| Server | 用途 | 位置 |
|--------|------|------|
| (待盤點) | | |

---

## 待深入

- [ ] Resource 與 Prompt 原語的開發指南
- [ ] SSE / Streamable HTTP 傳輸的實作細節
- [ ] MCP Server 的認證與授權方案
- [ ] 與 `21_agent_system_design.md` Tool Layer 的對應
- [ ] Server 效能優化與 Connection Pooling
