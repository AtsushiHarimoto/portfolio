# Claude Agent SDK 指南 (Claude Agent SDK)

## @概覽

Claude Agent SDK 是 Anthropic 提供的開源框架，用於構建可控、可觀測的多步驟 AI Agent。本文涵蓋 SDK 核心概念、開發模式與在 Moyin 中的應用場景。

---

## 1. 定位與核心價值

### 1.1 Agent SDK vs Claude API vs Claude Code

- **Claude API**：最底層。單次 LLM 呼叫。
- **Agent SDK**：中間層。用於構建自定義工作流的多步驟 Agent。
- **Claude Code**：最上層。互動式開發助手產品。

### 1.2 核心特性

- **Agentic Loop**：自動化的「思考 ➝ 工具呼叫 ➝ 觀察」循環。
- **Tool Use**：支援 MCP 整合與自定義函式工具。
- **Guardrails**：輸入/輸出護欄，防止 Agent 脫軌。
- **Handoffs**：各個 Agent 之間的任務自動移交與委派。
- **Tracing**：完整的執行追蹤與可觀測性。

---

## 2. 核心元件與概念

- **Agent**：定義角色（包含指令、工具、模型選擇與護欄）。
- **Runner**：執行引擎，負責管理與維護 Agentic Loop。
- **Tool**：能力擴展（區分為 MCP 型與函式型）。
- **Guardrail**：安全與限制約束（輸入驗證、輸出篩選）。
- **Handoff**：任務移交邏輯（例如 Agent A ➝ Agent B）。
- **Tracing**：可觀測性層，記錄每步決策與呼叫軌跡。

---

## 3. 關鍵設計模式

### 3.1 Handoff 模式（委派與移交）

```text
User ➝ Triage Agent (分發) ➝ Specialist Agent A
                            ➝ Specialist Agent B
```

適合多領域分類與客服路由場景。

### 3.2 Orchestrator 模式（編排與彙整）

```text
User ➝ Orchestrator ──→ Worker Agent 1 (並行)
                      ──→ Worker Agent 2 (並行)
                      ←── 合併結果 ➝ Response
```

適合複雜任務分解與大規模並行處理。

---

## 4. Guardrails（任務護欄）的應用

在 Moyin 專案中，我們實踐了以下護欄：

- **Tool Guardrail**：禁止 Agent 修改如 `CLAUDE.md` 等核心規約文件。
- **Output Guardrail**：確保生成的內容完全符合項目的品牌規範。
- **Input Guardrail**：阻擋注入攻擊 (Prompt Injection) 或不當請求。

---

## 5. Moyin Agent 系統的開發場景

- **自動化 Code Review**：利用 `Reviewer Agent` 搭配 `Guardrails` 進行自動化品質把關。
- **小說生成管線 (Pipeline)**：建立多階段 Agent 流（大綱 ➝ 章節撰寫 ➝ 校對回饋）。
- **多 Agent 並行開發**：透過 `Orchestrator` 管理不同模組的同步開發任務。

透過將 Claude Agent SDK 標準化，我們得以構建出既具備自主性、又完全處於開發者掌控之中的專業 AI 數位勞動力。

---

👉 **[下一篇：技能開發實踐](./25_skill_authoring_guide.md)**
