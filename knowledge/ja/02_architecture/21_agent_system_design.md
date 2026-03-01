# 21. Agent システム設計概要

> **種類**: アーキテクチャ  
> **日付**: 2026-02-26  
> **ステータス**: 骨子  
> **関連**: `09.1.agent_roles_2026.md`, `22_agentic_design_patterns.md`

---

## 概要

多 Agent システムの層構造、通信プロトコル、状態管理、耐障害性を定義し、`09_workflows/` のワークフロー文書を補完します。

---

## 1. システムの階層構造

### 1.1 四層モデル

```
┌───────────────────────────┐
│ Orchestration Layer       │ ルーティング、タスク分解、優先度調整
├───────────────────────────┤
│ Agent Layer               │ 役割別 Agent インスタンス
├───────────────────────────┤
│ Tool Layer                │ MCP、API、CLI
├───────────────────────────┤
│ Infrastructure Layer      │ LLM API、ベクターストア、ファイルシステム
└───────────────────────────┘
```

### 1.2 各層の責務

| 層 | 任務 | キー技術 |
| :-- | :-- | :------ |
| 編排層 | タスク分解、Agent 選定、結果統合 | オーケストレーター、DAG |
| Agent 層 | タスク実行、局所状態管理 | ReAct ループ、ツール利用 |
| ツール層 | 原子的な能力提供 | MCP、関数呼び出し |
| 基盤層 | モデル推論、永続化、観測 | Claude API、Ollama、SQLite |

---

## 2. Agent の役割

### 2.1 役割マトリクス

| Agent | 役割 | 能力 | トリガー |
| :--- | :--- | :--- | :--- |
| Architect (Claude) | 設計者 | 要件分析、アーキテクチャ、コードレビュー | 新機能・リファクタ |
| Executor (Codex/Claude) | 実行者 | コーディング、テスト、バグ修正 | 明確なプラン |
| Reviewer | レビュー | 品質／セキュリティ | PR・マイルストーン完了 |
| Researcher | 調査者 | 技術リサーチ、文書探索 | 未知領域 |

### 2.2 役割とスキルの対応

> TODO: `~/.claude/skills/` の技能リストと役割を紐づける

---

## 3. Agent 通信プロトコル

### 3.1 通信パターン

- **同期 (Request-Reply)**：Orchestrator → Agent → 応答  
- **非同期 (Fire-and-Forget)**：並列サブタスク、バックグラウンド Agent  
- **イベント駆動 (Pub-Sub)**：Git フックから Review Agent へ

### 3.2 メッセージスキーマ（概念）

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

### 3.3 ハンドオフプロトコル

- 送信側は目標・対象範囲・受け入れ基準・関連ドキュメントを提供  
- 受信側は完了状態・変更一覧・未解決事項を返す

---

## 4. 状態管理

### 4.1 Agent 状態機

```
idle → assigned → running → (success | failed | blocked)
                              ↓
                        retry / escalate
```

### 4.2 永続化

| 状態種別 | 保存先 | 形式 |
| :------ | :---- | :-- |
| タスク進捗 | `workspace/issues/` | Markdown + Frontmatter |
| セッションコンテキスト | `workspace/.context/` | JSON |
| 長期メモリ | Memory files | Markdown |

---

## 5. 障害耐性と監視

### 5.1 障害対応

| 障害 | 戦略 |
| :--- | :--- |
| ツール呼び出し失敗 | リトライ → フォールバック → レポート |
| トークン制限 | コンテキスト圧縮 → タスク分割 |
| 同一ファイルのエージェント衝突 | ロック / Worktree 分離 |
| 論理ループ | 最大イテレーション + 人的介入 |

### 5.2 指標

- 完了率 / 失敗率  
- タスクごとの平均トークン消費  
- 人的介入頻度  
- Agent 選択精度

---

## 6. 既存ワークフローとの関係

| 文書 | 焦点 | 本文の補完 |
| :-- | :-- | :-- |
| `09.1.agent_roles_2026.md` | 誰が何をやるか | どう接続するか |
| `09.7.multi_agent_collaboration.md` | 協業フロー | 下層の通信と状態機 |
| `22_agentic_design_patterns.md` | デザインパターン | 実装／アーキ構築 |

---

## 今後の検討

- DAG スケジューリングエンジン選定  
- Agent 共有メモリプール  
- 費用制御（タスクごとのトークン予算）  
- Claude Agent SDK との統合（`24_claude_agent_sdk.md`を参照）
