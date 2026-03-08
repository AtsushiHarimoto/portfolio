# Skill 編寫規範 (Skill Authoring Guide)

## @概覽

Claude Code Skill 是可重用的 prompt 封裝，為 Agent 注入領域知識與結構化工作流。本文定義 Skill 的設計原則、檔案格式、品質標準與生命週期管理。

---

## 1. Skill 是什麼

### 1.1 本質

Skill = **結構化的 Context 注入包**（參見 OpenCWAL L1–L2）。

```text
觸發條件 → 載入 Skill 內容 → 注入 Agent 上下文 → 引導行為
```

### 1.2 與其他概念的區別

- **CLAUDE.md**：全局約束。永駐 (L0)，自動注入。
- **Skill**：領域指引。按需 (L1)，手動或條件匹配觸發。
- **MCP Tool**：能力擴展。常駐，Agent 自主呼叫。
- **Prompt Template**：輸入模板。一次性，用戶選擇使用。

---

## 2. 檔案格式

### 2.1 Frontmatter（必填）

```yaml
---
name: my-skill-name # kebab-case，全局唯一
description: >
  一句話描述用途與觸發條件。
  Use when [觸發場景]。
---
```

### 2.2 結構內容

- **Context**：背景說明，為什麼需此 Skill。
- **Rules**：Agent 必須遵守的絕對約束。
- **Workflow**：具備編號的執行步驟。
- **Checklist**：驗收項目的檢查清單。
- **Examples**：使用 `<example>` 標籤的輸入輸出範例。
- **Anti-patterns**：反模式清單與常見錯誤。

---

## 3. 設計原則

- **單一職責**：一個 Skill 只專心解決一個問題。
- **觸發明確**：`description` 必須精確說明何時使用（Use when...）。
- **自包含**：不依賴於其他尚未載入的 Skill。
- **Token 節省**：建議控制在 2,000 Tokens 以內。
- **可測試性**：具備明確的預期行為。

---

## 4. 品質標準

- **Frontmatter**：`name` 與 `description` 是否完整。
- **觸發定義**：`description` 中是否有清晰的 "Use when"。
- **指令精確度**：規則應使用「必須 / 禁止」而非「建議 / 可以」。
- **範例豐富度**：至少包含一個 `<example>` 區段。
- **反模式列舉**：是否提醒了常見的踩雷點。

---

## 5. 存取與生命週期管理

### 5.1 目錄結構

```text
~/.claude/skills/
├── core/               # 核心工作流
├── domain/             # 領域知識（如前端設計、API 設計）
├── project/            # 專案專屬規約
└── experimental/       # 實驗性功能
```

### 5.2 生命週期階段

`Draft`（草稿）➝ `Review`（實戰驗證）➝ `Active`（穩定使用）➝ `Deprecated`（待廢止）➝ `Archived`（歸檔）。

設計優異的 AI Skill 能讓你的 Agent 從「純聊天的助手」進化為「具備專業領域知識的工作夥伴」。

---

👉 **[下一篇：專案上下文管理](./12_prompt_and_context_management.md)**
