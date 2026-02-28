# 24. Claude Agent SDK 指南

> **類型**: 開發指南
> **日期**: 2026-02-26
> **狀態**: 骨架
> **關聯**: `23_mcp_server_dev_guide.md`、`21_agent_system_design.md`

---

## 摘要

Claude Agent SDK 是 Anthropic 提供的開源框架，用於構建可控、可觀測的多步驟 AI Agent。本文涵蓋 SDK 核心概念、開發模式與在 Moyin 中的應用場景。

---

## 1. 定位與核心價值

### 1.1 Agent SDK vs Claude API vs Claude Code

| | Claude API | Agent SDK | Claude Code |
|---|---|---|---|
| 層級 | 最底層 | 中間層框架 | 最上層產品 |
| 用途 | 單次 LLM 呼叫 | 構建自定義 Agent | 互動式開發助手 |
| 控制力 | 最高 | 高 | 預設行為 |
| 適用場景 | 簡單任務 | 自定義工作流 | 日常開發 |

### 1.2 核心特性

- **Agentic Loop**：自動化的思考→工具呼叫→觀察循環
- **Tool Use**：內建 MCP 整合 + 自定義 Tool
- **Guardrails**：輸入/輸出護欄，防止脫軌
- **Handoffs**：Agent 間任務移交
- **Tracing**：完整執行追蹤與可觀測性

---

## 2. 核心概念

### 2.1 Agent 定義

```python
# 概念骨架（Python SDK）
from agents import Agent, Runner

agent = Agent(
    name="Moyin Architect",
    instructions="你是 Moyin 專案的架構師...",
    tools=[file_reader, code_searcher],
    model="claude-sonnet-4-6",
)

result = Runner.run_sync(agent, "分析這個模組的依賴關係")
```

### 2.2 核心元件

| 元件 | 職責 | 說明 |
|------|------|------|
| **Agent** | 定義角色 | 指令、工具、模型、護欄 |
| **Runner** | 執行引擎 | 管理 Agentic Loop |
| **Tool** | 能力擴展 | Function Tool / MCP Tool |
| **Guardrail** | 安全約束 | 輸入驗證、輸出過濾 |
| **Handoff** | 任務移交 | Agent → Agent 切換 |
| **Tracing** | 可觀測性 | 記錄每步決策與工具呼叫 |

---

## 3. 關鍵設計模式

### 3.1 單 Agent 模式

```
User → Agent (tools: [A, B, C]) → Response
```

適用：簡單任務、單一領域

### 3.2 Handoff 模式（委派）

```
User → Triage Agent → Specialist Agent A
                    → Specialist Agent B
```

適用：多領域分類、客服路由

### 3.3 Orchestrator 模式（編排）

```
User → Orchestrator Agent ──→ Worker Agent 1 (並行)
                           ──→ Worker Agent 2 (並行)
                           ←── 合併結果 → Response
```

適用：複雜任務分解、並行處理

### 3.4 Pipeline 模式（管線）

```
User → Agent A → Agent B → Agent C → Response
```

適用：多階段處理（分析→規劃→執行）

---

## 4. Guardrails（護欄）

### 4.1 類型

| 護欄類型 | 檢查時機 | 用途 |
|----------|----------|------|
| Input Guardrail | Agent 接收輸入前 | 過濾不當請求 |
| Output Guardrail | Agent 產出結果後 | 驗證輸出品質 |
| Tool Guardrail | 工具呼叫前 | 限制危險操作 |

### 4.2 在 Moyin 中的應用場景

- 禁止 Agent 修改 `CLAUDE.md` → Tool Guardrail
- 確保產出符合品牌規範 → Output Guardrail
- 阻擋注入攻擊 → Input Guardrail

---

## 5. Tracing（追蹤）

### 5.1 追蹤層級

```
Trace (一次完整對話)
  └── Span: Agent "Architect"
        ├── Span: LLM Call
        ├── Span: Tool "file_reader"
        └── Span: Handoff → "Executor"
              ├── Span: LLM Call
              └── Span: Tool "code_writer"
```

### 5.2 可觀測性指標

- 總 Token 消耗
- 每個 Agent 的工具呼叫次數
- 失敗與重試次數
- 端到端延遲

---

## 6. 與 Moyin Agent 系統的整合

### 6.1 映射關係

| Moyin 概念 (見 21_agent_system_design.md) | Agent SDK 元件 |
|------------------------------------------|---------------|
| 編排層 | Runner + Orchestrator Agent |
| 代理層 | 各 Specialist Agent |
| 工具層 | Tool (MCP + Function) |
| 通訊協議 | Handoff |
| 狀態持久化 | Tracing + 自定義 Storage |

### 6.2 潛在應用場景

| 場景 | 方案 |
|------|------|
| 自動化 Code Review | Reviewer Agent + Guardrails |
| 小說生成管線 | Pipeline: 大綱→章節→校對 |
| 多 Agent 並行開發 | Orchestrator + Worktree 隔離 |
| 智能客服 | Triage Agent + Handoff |

---

## 待深入

- [ ] Python vs TypeScript SDK 差異對比
- [ ] 自定義 Tool 與 MCP Tool 的取捨原則
- [ ] Guardrail 的具體實作範例
- [ ] 與 LangGraph / CrewAI 等框架的比較
- [ ] 成本控制策略（model routing, caching）
