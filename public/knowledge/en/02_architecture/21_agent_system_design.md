# 21. Agent System Design Overview

> **Type**: Architecture  
> **Date**: 2026-02-26  
> **Status**: Outline  
> **Related**: `09.1.agent_roles_2026.md`, `22_agentic_design_patterns.md`

---

## Summary

Define Moyin’s multi-agent layered architecture, communication protocols, state management, and fault tolerance—it complements the workflow-oriented docs under `09_workflows/`.

---

## 1. Layered system architecture

### 1.1 Four-layer model

```
┌───────────────────────────────┐
│ Orchestration Layer           │ routing, task decomposition, prioritization
├───────────────────────────────┤
│ Agent Layer                   │ individual role-specific agents
├───────────────────────────────┤
│ Tool Layer                    │ MCP servers, APIs, CLI tools
├───────────────────────────────┤
│ Infrastructure Layer          │ LLM APIs, vector stores, file systems
└───────────────────────────────┘
```

### 1.2 Responsibilities

| Layer | Duties | Key technologies |
| :---- | :----- | :-------------- |
| Orchestration | Decompose tasks, pick agents, merge results | Orchestrator pattern, DAG |
| Agent | Execute tasks, maintain local state | ReAct loop, tool use |
| Tool | Provide atomic capabilities | MCP protocol, function calling |
| Infrastructure | Model inference, persistence, observability | Claude API, Ollama, SQLite |

---

## 2. Agent roles

### 2.1 Role matrix

| Agent | Persona | Skills | Trigger |
| :---- | :------ | :----- | :------ |
| Architect (Claude) | Planner | Requirements analysis, architecture design, code review | New features, refactors |
| Executor (Codex/Claude) | Doer | Coding, tests, bug fixing | Clear plan approved |
| Reviewer | Gatekeeper | Quality, security scans | PRs, milestone completion |
| Researcher | Scout | Tech research, doc lookup | Unknown domains |

### 2.2 Role → skill mapping

> TODO: Map each role to skills under `~/.claude/skills/`

---

## 3. Agent communication protocol

### 3.1 Patterns

- **Sync request-reply**: Orchestrator → Agent → response  
- **Async fire-and-forget**: Parallel subtasks, background agents  
- **Event-driven pub-sub**: Git hooks trigger review agents

### 3.2 Message schema (conceptual)

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

### 3.3 Handoff protocol

- Sender must provide goal, scope, acceptance criteria, doc paths  
- Receiver must report completion status, change list, remaining issues

---

## 4. State management

### 4.1 Agent state machine

```
idle → assigned → running → (success | failed | blocked)
                              ↓
                        retry / escalate
```

### 4.2 Persistence

| State type | Storage | Format |
| :--------- | :------ | :----- |
| Task progress | `workspace/issues/` | Markdown + frontmatter |
| Session context | `workspace/.context/` | JSON |
| Long-term memory | Memory files | Markdown |

---

## 5. Fault tolerance & observability

### 5.1 Failure handling

| Failure | Strategy |
| :------ | :------- |
| Tool call failure | Retry → degrade → report |
| Token limit exceeded | Compress context → shard task |
| Agent collision | Locking / worktree isolation |
| Logic loop | Max iterations + human intervention |

### 5.2 Metrics

- Task success / failure rate  
- Average token spend per task  
- Human intervention frequency  
- Agent selection accuracy

---

## 6. Relationship with existing workflows

| Doc | Focus | This doc adds |
| :-- | :---- | :---------- |
| `09.1.agent_roles_2026.md` | Who does what | How they connect architecturally |
| `09.7.multi_agent_collaboration.md` | Collaboration flow | Underlying comms & state machine |
| `22_agentic_design_patterns.md` | Design patterns | Concrete architecture and implementation notes |

---

## To explore later

- DAG scheduling engine selection  
- Shared memory pool between agents  
- Cost control (token budget per task)  
- Integration with Claude Agent SDK (`24_claude_agent_sdk.md`)
