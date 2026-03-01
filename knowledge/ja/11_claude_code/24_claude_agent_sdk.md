# Claude Agent SDK ガイド

> **タイプ**: 開発ガイド
> **日付**: 2026-02-26
> **ステータス**: スケルトン（Skeleton）
> **関連**: `23_mcp_server_dev_guide.md`、`21_agent_system_design.md`

---

## 概要

Claude Agent SDK は、Anthropic が提供するオープンソースフレームワーク（Framework）で、制御可能かつ観測可能なマルチステップ AI エージェント（Agent）を構築するためのものです。本文では SDK の核心概念、開発パターン、Moyin での応用シーンについて解説します。

---

## 1. ポジショニングと核心価値

### 1.1 Agent SDK vs Claude API vs Claude Code

| | Claude API | Agent SDK | Claude Code |
|---|---|---|---|
| レイヤー | 最下層 | 中間層フレームワーク | 最上層プロダクト |
| 用途 | 単発 LLM 呼び出し | カスタムエージェント構築 | インタラクティブ開発アシスタント |
| 制御力 | 最高 | 高 | プリセット動作 |
| 適用シーン | シンプルなタスク | カスタムワークフロー | 日常開発 |

### 1.2 核心機能

- **Agentic Loop**：自動化された思考 → ツール呼び出し → 観察のサイクル
- **Tool Use**：MCP 統合の組み込み + カスタムツール
- **Guardrails（ガードレール）**：入出力のセーフティレール、脱線防止
- **Handoffs（ハンドオフ）**：エージェント間のタスク委譲
- **Tracing（トレーシング）**：完全な実行追跡とオブザーバビリティ（Observability）

---

## 2. 核心概念

### 2.1 エージェント定義

```python
# 概念スケルトン（Python SDK）
from agents import Agent, Runner

agent = Agent(
    name="Moyin Architect",
    instructions="あなたは Moyin プロジェクトのアーキテクトです...",
    tools=[file_reader, code_searcher],
    model="claude-sonnet-4-6",
)

result = Runner.run_sync(agent, "このモジュールの依存関係を分析してください")
```

### 2.2 核心コンポーネント

| コンポーネント | 役割 | 説明 |
|------|------|------|
| **Agent** | ロール定義 | インストラクション、ツール、モデル、ガードレール |
| **Runner** | 実行エンジン | Agentic Loop を管理 |
| **Tool** | 能力拡張 | Function Tool / MCP Tool |
| **Guardrail** | 安全制約 | 入力検証、出力フィルタリング |
| **Handoff** | タスク委譲 | エージェント間切り替え |
| **Tracing** | オブザーバビリティ | 各ステップの判断とツール呼び出しを記録 |

---

## 3. 主要設計パターン

### 3.1 シングルエージェントパターン（Single Agent）

```
User → Agent (tools: [A, B, C]) → Response
```

適用：シンプルなタスク、単一ドメイン

### 3.2 ハンドオフパターン（Handoff：委譲）

```
User → Triage Agent → Specialist Agent A
                    → Specialist Agent B
```

適用：マルチドメイン分類、カスタマーサービスルーティング

### 3.3 オーケストレーターパターン（Orchestrator：編成）

```
User → Orchestrator Agent ──→ Worker Agent 1（並列）
                           ──→ Worker Agent 2（並列）
                           ←── 結果統合 → Response
```

適用：複雑なタスク分解、並列処理

### 3.4 パイプラインパターン（Pipeline）

```
User → Agent A → Agent B → Agent C → Response
```

適用：多段階処理（分析 → 計画 → 実行）

---

## 4. ガードレール（Guardrails）

### 4.1 種類

| ガードレール種別 | チェックタイミング | 用途 |
|----------|----------|------|
| Input Guardrail | エージェントが入力を受け取る前 | 不適切なリクエストをフィルタリング |
| Output Guardrail | エージェントが結果を出力した後 | 出力品質を検証 |
| Tool Guardrail | ツール呼び出し前 | 危険な操作を制限 |

### 4.2 Moyin での応用シーン

- エージェントによる `CLAUDE.md` の変更を禁止 → Tool Guardrail
- 出力がブランドガイドラインに準拠することを保証 → Output Guardrail
- インジェクション攻撃（Injection Attack）をブロック → Input Guardrail

---

## 5. トレーシング（Tracing）

### 5.1 トレース階層

```
Trace（1 回の完全な会話）
  └── Span: Agent "Architect"
        ├── Span: LLM Call
        ├── Span: Tool "file_reader"
        └── Span: Handoff → "Executor"
              ├── Span: LLM Call
              └── Span: Tool "code_writer"
```

### 5.2 オブザーバビリティ指標

- 総トークン（Token）消費量
- エージェントごとのツール呼び出し回数
- 失敗・リトライ回数
- エンドツーエンドレイテンシ

---

## 6. Moyin エージェントシステムとの統合

### 6.1 マッピング

| Moyin 概念（21_agent_system_design.md 参照） | Agent SDK コンポーネント |
|------------------------------------------|---------------|
| オーケストレーション層 | Runner + Orchestrator Agent |
| エージェント層 | 各 Specialist Agent |
| ツール層 | Tool (MCP + Function) |
| 通信プロトコル | Handoff |
| 状態永続化 | Tracing + カスタムストレージ |

### 6.2 想定される応用シーン

| シーン | 方式 |
|------|------|
| 自動化コードレビュー | Reviewer Agent + Guardrails |
| 小説生成パイプライン | Pipeline: アウトライン → 章 → 校正 |
| マルチエージェント並列開発 | Orchestrator + Worktree 分離 |
| インテリジェントカスタマーサービス | Triage Agent + Handoff |

---

## 今後の深掘り項目

- [ ] Python vs TypeScript SDK の差異比較
- [ ] カスタムツールと MCP Tool のトレードオフ基準
- [ ] ガードレールの具体的な実装例
- [ ] LangGraph / CrewAI など他フレームワークとの比較
- [ ] コスト制御戦略（モデルルーティング、キャッシング）
