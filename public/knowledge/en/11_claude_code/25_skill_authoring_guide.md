# 25. Skill 編寫規範

> **類型**: 開發規範
> **日期**: 2026-02-26
> **狀態**: 骨架
> **關聯**: `07.2.claude_skills_structure.md`、`22_opencwal_principles.md`

---

## 摘要

Claude Code Skill 是可重用的 prompt 封裝，為 Agent 注入領域知識與結構化工作流。本文定義 Skill 的設計原則、檔案格式、品質標準與生命週期管理。

---

## 1. Skill 是什麼

### 1.1 本質

Skill = **結構化的 Context 注入包**（參見 OpenCWAL L1–L2）

```
觸發條件 → 載入 Skill 內容 → 注入 Agent 上下文 → 引導行為
```

### 1.2 與其他概念的區別

| 概念 | 作用 | 持久性 | 觸發方式 |
|------|------|--------|----------|
| CLAUDE.md | 全局約束 | 永駐 (L0) | 自動注入 |
| Skill | 領域指引 | 按需 (L1) | 手動 / 條件匹配 |
| MCP Tool | 能力擴展 | 常駐 | Agent 自主呼叫 |
| Prompt Template | 輸入模板 | 一次性 | 用戶選擇 |

---

## 2. 檔案格式

### 2.1 Frontmatter（必填）

```yaml
---
name: my-skill-name           # kebab-case，全局唯一
description: >
  一句話描述用途與觸發條件。
  Use when [觸發場景]。
---
```

### 2.2 結構模板

```markdown
---
name: skill-name
description: 簡述用途。Use when [觸發場景]。
---

## Context（背景）
為什麼需要這個 Skill，解決什麼問題。

## Rules（規則）
Agent 必須遵守的約束條件。

## Workflow（流程）
1. 步驟一
2. 步驟二
3. ...

## Checklist（檢查清單）
- [ ] 驗收項目 1
- [ ] 驗收項目 2

## Examples（範例）
<example>
具體的輸入輸出範例
</example>

## Anti-patterns（反模式）
- ✗ 不要做什麼
- ✗ 常見錯誤
```

---

## 3. 設計原則

### 3.1 核心原則

| # | 原則 | 說明 |
|---|------|------|
| 1 | **單一職責** | 一個 Skill 解決一個問題 |
| 2 | **觸發明確** | description 必須清楚說明何時使用 |
| 3 | **自包含** | 不依賴其他 Skill 才能運作 |
| 4 | **可測試** | 有明確的輸入→輸出預期 |
| 5 | **Token 精簡** | 控制在 2000 Token 以內（理想） |

### 3.2 命名規範

| 類型 | 格式 | 範例 |
|------|------|------|
| 通用工作流 | `動詞-名詞` | `commit-work`, `review-pr` |
| 領域指引 | `領域-主題` | `frontend-design`, `api-design` |
| 專案專屬 | `專案-功能` | `moyin-brand-guard` |

### 3.3 Description 寫法

```
✓ "Use when implementing frontend components. Ensures brand compliance and accessibility."
✗ "Frontend skill"
✗ "This skill helps with frontend stuff"
```

關鍵要素：
- **何時用** (Use when...)
- **做什麼** (Ensures / Guides / Validates...)
- **觸發詞** 提升自動匹配率

---

## 4. 品質標準

### 4.1 Skill 品質檢查清單

| 項目 | 標準 |
|------|------|
| Frontmatter | name + description 完整 |
| 觸發條件 | description 中有明確的 "Use when" |
| 流程步驟 | 有編號的 Workflow 或 Checklist |
| 範例 | 至少一個 `<example>` 區塊 |
| 反模式 | 至少列出常見錯誤 |
| Token 長度 | < 3000 tokens（建議） |
| 無歧義 | 規則用「必須 / 禁止」而非「建議 / 可以」 |

### 4.2 Rigid vs Flexible

| 類型 | 特徵 | 範例 |
|------|------|------|
| **Rigid** | 步驟必須嚴格執行 | TDD、debugging、commit |
| **Flexible** | 原則指引，可因地制宜 | design-patterns、frontend-design |

在 Skill 開頭標注類型，讓 Agent 知道執行彈性。

---

## 5. 存放與管理

### 5.1 目錄結構

```
~/.claude/skills/
├── core/               # 核心工作流 Skill
├── domain/             # 領域知識 Skill
├── project/            # 專案專屬 Skill
└── experimental/       # 實驗性 Skill
```

### 5.2 生命週期

```
Draft → Review → Active → Deprecated → Archived
```

| 階段 | 條件 |
|------|------|
| Draft | 初版完成 |
| Review | 經過至少 3 次實際使用驗證 |
| Active | 穩定使用中 |
| Deprecated | 有更好替代方案 |
| Archived | 移入 `_archive/` |

### 5.3 版本同步

> 提醒：修改 `~/.claude/skills/` 後需同步到 Git Remote
> `git@github.com:AtsushiHarimoto/Moyin-Claude-skills-config.git`

---

## 6. 常見反模式

| 反模式 | 問題 | 修正 |
|--------|------|------|
| 巨型 Skill | > 5000 tokens，稀釋注意力 | 拆分為多個小 Skill |
| 模糊觸發 | description 太泛，被誤觸發 | 加上具體觸發條件 |
| 隱性依賴 | 假設其他 Skill 已載入 | 自包含所有必要資訊 |
| 缺少範例 | Agent 不確定預期行為 | 加入 example 區塊 |
| 過度規定 | 限制太死，無法適應變化 | 區分 Rigid / Flexible |

---

## 待深入

- [ ] Skill 自動化測試方案
- [ ] Skill 之間的組合與編排模式
- [ ] Skill 效能度量（Token 佔用、觸發準確率）
- [ ] 與 OpenCWAL 上下文預算的整合
- [ ] Skill 版本管理與 Breaking Change 處理
