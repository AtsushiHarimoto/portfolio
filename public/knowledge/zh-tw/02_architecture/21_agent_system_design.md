# 21. Agent 系統設計總覽

> **類型**: 架構設計
> **日期**: 2026-02-26
> **狀態**: 骨架
> **關聯**: `09.1.agent_roles_2026.md`、`22_agentic_design_patterns.md`

---

## 摘要

從架構層面定義 Moyin 多 Agent 系統的分層結構、通訊協議、狀態管理與容錯機制。與 `09_workflows/` 中偏工作流角度的文檔互補。

---

## 1. 系統分層架構

### 1.1 四層模型

```
┌─────────────────────────────────┐
│  Orchestration Layer (編排層)    │  路由、任務分解、優先級調度
├─────────────────────────────────┤
│  Agent Layer (代理層)            │  各角色 Agent 實例
├─────────────────────────────────┤
│  Tool Layer (工具層)             │  MCP Server、API、CLI
├─────────────────────────────────┤
│  Infrastructure Layer (基礎設施) │  LLM API、向量庫、檔案系統
└─────────────────────────────────┘
```

### 1.2 各層職責

| 層級 | 職責 | 關鍵技術 |
|------|------|----------|
| 編排層 | 任務拆解、Agent 選擇、結果合併 | Orchestrator Pattern, DAG |
| 代理層 | 執行具體任務、維護局部狀態 | ReAct Loop, Tool Use |
| 工具層 | 提供原子化能力（讀寫檔案、搜尋、API 調用） | MCP Protocol, Function Calling |
| 基礎設施 | 模型推理、持久化、監控 | Claude API, Ollama, SQLite |

---

## 2. Agent 角色定義

### 2.1 角色矩陣

| Agent | 定位 | 主要能力 | 觸發條件 |
|-------|------|----------|----------|
| Architect (Claude) | 規劃者 | 需求分析、架構設計、Code Review | 新功能、重構 |
| Executor (Codex/Claude) | 執行者 | 編碼實作、測試、Bug Fix | 有明確 Plan |
| Reviewer | 審查者 | 品質把關、安全掃描 | PR 提交、階段完成 |
| Researcher | 探索者 | 技術調研、文檔搜尋 | 未知領域、選型 |

### 2.2 角色與 Skill 映射

> TODO: 對照 `~/.claude/skills/` 中的技能清單，建立角色→技能對應表

---

## 3. Agent 間通訊協議

### 3.1 通訊模式

- **同步 (Request-Reply)**：Orchestrator → Agent → 回傳結果
- **異步 (Fire-and-Forget)**：並行子任務分派、後台 Agent
- **事件驅動 (Pub-Sub)**：Git Hook → 觸發 Review Agent

### 3.2 訊息格式（概念）

```jsonc
{
  "task_id": "uuid",
  "from": "orchestrator",
  "to": "executor",
  "action": "implement",
  "payload": {
    "plan_ref": "workspace/issues/ISSUE-042.md",
    "scope": ["projects/moyin-app/src/components/"],
    "constraints": ["no-new-deps", "vue3-composition-api"]
  },
  "timeout_ms": 300000
}
```

### 3.3 交接清單（Handoff Protocol）

- 交出方必須提供：目標、範圍、驗收條件、相關文件路徑
- 接收方必須回傳：完成狀態、變更清單、未解決問題

---

## 4. 狀態管理

### 4.1 Agent 狀態機

```
idle → assigned → running → (success | failed | blocked)
                                ↓
                          retry / escalate
```

### 4.2 狀態持久化

| 狀態類型 | 儲存位置 | 格式 |
|----------|----------|------|
| 任務進度 | `workspace/issues/` | Markdown + Frontmatter |
| 會話上下文 | `workspace/.context/` | JSON |
| 長期記憶 | Memory files | Markdown |

---

## 5. 容錯與監控

### 5.1 失敗處理策略

| 失敗類型 | 策略 |
|----------|------|
| 工具呼叫失敗 | 重試 → 降級 → 回報 |
| Token 超限 | 壓縮上下文 → 分割任務 |
| Agent 衝突（同一文件） | Lock 機制 / Worktree 隔離 |
| 邏輯死循環 | 最大迭代數限制 + 人工介入 |

### 5.2 監控指標

- 任務完成率 / 失敗率
- 平均 Token 消耗 / 任務
- 人工介入頻率
- Agent 選擇準確度

---

## 6. 與現有工作流的關係

| 文檔 | 關注點 | 本文補充 |
|------|--------|----------|
| `09.1.agent_roles_2026.md` | 誰做什麼（角色職責） | 怎麼連接（架構與協議） |
| `09.7.multi_agent_collaboration.md` | 協作流程 | 底層通訊與狀態機 |
| `22_agentic_design_patterns.md` | 設計模式概念 | 落地架構與實作要點 |

---

## 待深入

- [ ] 具體 DAG 調度引擎選型
- [ ] Agent 間共享記憶池設計
- [ ] 成本控制（Token Budget Per Task）
- [ ] 與 Claude Agent SDK 的整合方案（見 `24_claude_agent_sdk.md`）
