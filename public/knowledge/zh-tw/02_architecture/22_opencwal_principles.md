# 22. OpenCWAL 原理設計

> **類型**: 架構原理
> **日期**: 2026-02-26
> **狀態**: 骨架
> **全稱**: Open Context Window & Attention Lattice

---

## 摘要

OpenCWAL 是一套面向 AI Agent 系統的上下文管理框架，解決「有限 Context Window 下如何最大化 Agent 效能」的核心問題。涵蓋 Context 分級、Attention 路由、Latency 優化三大支柱。

---

## 1. 為什麼需要 OpenCWAL

### 1.1 痛點

| 痛點 | 描述 |
|------|------|
| Context 浪費 | 大量無關資訊塞入 prompt，消耗 Token 卻不提升品質 |
| Attention 稀釋 | 關鍵指令被淹沒在冗長上下文中，模型「忘記」重要約束 |
| Latency 失控 | Context 越長，推理延遲越高，體驗越差 |
| 記憶斷層 | 跨會話、跨 Agent 的上下文無法有效傳遞 |

### 1.2 目標

- **精準投餵**：只給 Agent 當前任務所需的最小上下文
- **注意力集中**：確保關鍵指令（System Prompt、約束條件）始終在高注意力區間
- **低延遲**：控制 prompt 長度在效能甜蜜點內
- **可追溯**：每份上下文都有來源與版本

---

## 2. 三大支柱

### 2.1 Context Hierarchy（上下文分級）

```
Level 0 — System Core     永駐（CLAUDE.md、核心規則）
Level 1 — Session State    會話級（當前任務、Plan、Issue）
Level 2 — Working Set      工作級（正在編輯的文件、搜尋結果）
Level 3 — Reference        按需載入（知識庫文檔、歷史記錄）
Level 4 — Archive          不載入（壓縮存檔，僅供搜尋檢索）
```

| Level | 生命週期 | Token 預算佔比 | 載入策略 |
|-------|----------|---------------|----------|
| L0 | 永駐 | ~10% | 自動注入 |
| L1 | 會話內 | ~20% | 任務啟動時載入 |
| L2 | 任務內 | ~50% | 按需讀取 |
| L3 | 按需 | ~15% | 關鍵字觸發 / RAG |
| L4 | 不載入 | 0% | 僅 Grep 索引 |

### 2.2 Attention Routing（注意力路由）

#### 核心原則

- **前置原則 (Front-Loading)**：最重要的約束放在 prompt 最前面
- **重複強調 (Repetition Anchoring)**：關鍵規則在 system-reminder 中重複
- **分離關注點 (Separation)**：不同類型資訊用明確標記分段
- **遞減細節 (Progressive Detail)**：先給摘要，Agent 需要時再展開

#### 注意力熱區圖（概念）

```
Prompt 位置:  [開頭] ████████████ [中段] ████░░░░ [結尾] ████████
注意力強度:    極高              中等/衰減       回升（近因效應）
應該放什麼:    核心規則/約束      工作數據        行動指令/輸出格式
```

### 2.3 Latency Budget（延遲預算）

| 場景 | 目標 Input Token | 目標延遲 | 策略 |
|------|-----------------|----------|------|
| 即時回覆（聊天） | < 4K | < 2s | 最小上下文 |
| 編碼任務 | 8K–32K | < 10s | 精選文件 |
| 深度分析 | 32K–128K | < 60s | 全文件 + RAG |
| 批次任務 | 不限 | 不限 | 子任務拆解 |

---

## 3. 實踐模式

### 3.1 上下文組裝流程

```
1. 載入 L0（System Core）
2. 根據 task_type 載入 L1（Session State）
3. 根據 task_scope 按需讀取 L2（Working Set）
4. 若 L2 不足以解決，觸發 RAG 或 Grep 拉取 L3
5. 組裝完成，檢查總 Token < Budget
6. 若超限 → 壓縮 L2（摘要化）或 拆分子任務
```

### 3.2 在 Moyin 中的體現

| CWAL 原則 | Moyin 實踐 |
|-----------|-----------|
| L0 永駐 | `CLAUDE.md` 自動注入 |
| L1 會話級 | `workspace/.context/` 載入 |
| L2 按需讀取 | Agent 用 Read/Grep 工具取得 |
| Attention Front-Loading | 核心規則放在 CLAUDE.md 最前面 |
| Repetition Anchoring | `system-reminder` 重複關鍵約束 |
| Latency Budget | 按需讀取而非一次載入全部規則 |

### 3.3 Skill 的 CWAL 角色

每個 Skill 本質上是一份**預封裝的 L1–L2 上下文包**：
- Skill 描述 → 觸發條件（決定何時載入）
- Skill 內容 → 注入 Context（提供領域知識與流程指引）
- Skill Checklist → 結構化 Attention（引導 Agent 聚焦步驟）

---

## 4. 設計原則總結

| # | 原則 | 說明 |
|---|------|------|
| 1 | 最小上下文原則 | 只給必要資訊，多餘的是噪音 |
| 2 | 分級載入原則 | 按 L0–L4 分級，越高級越惰性 |
| 3 | 注意力保護原則 | 關鍵約束放高注意力區、避免被稀釋 |
| 4 | Token 預算原則 | 每次呼叫都有明確的 Token 上限 |
| 5 | 可追溯原則 | 每份上下文標注來源路徑與版本 |
| 6 | 壓縮優於截斷 | 超限時優先摘要壓縮，而非直接截斷 |

---

## 待深入

- [ ] Token Budget 自動計算工具
- [ ] Context 壓縮演算法（摘要 vs. 抽取式）
- [ ] RAG 檢索與 L3 載入的整合方案
- [ ] 跨 Agent 上下文傳遞協議
- [ ] 與 `21_agent_system_design.md` 中通訊協議的整合
