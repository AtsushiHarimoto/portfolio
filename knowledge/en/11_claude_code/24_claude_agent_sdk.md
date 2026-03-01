# Claude Agent SDK Guide

> **Type**: Development Guide
> **Date**: 2026-02-26
> **Status**: Skeleton
> **Related**: `23_mcp_server_dev_guide.md`, `21_agent_system_design.md`

---

## Summary

The Claude Agent SDK is an open-source framework from Anthropic for building controllable, observable, multi-step AI Agents. This guide covers core SDK concepts, development patterns, and application scenarios within Moyin.

---

## 1. Positioning & Core Value

### 1.1 Agent SDK vs Claude API vs Claude Code

| | Claude API | Agent SDK | Claude Code |
|---|---|---|---|
| Layer | Lowest level | Mid-level framework | Top-level product |
| Purpose | Single LLM call | Build custom Agents | Interactive dev assistant |
| Control | Highest | High | Preset behavior |
| Use case | Simple tasks | Custom workflows | Day-to-day development |

### 1.2 Core Features

- **Agentic Loop**: Automated think -> tool call -> observe cycle
- **Tool Use**: Built-in MCP integration + custom Tools
- **Guardrails**: Input/output safety rails to prevent derailing
- **Handoffs**: Task delegation between Agents
- **Tracing**: Full execution tracing and observability

---

## 2. Core Concepts

### 2.1 Agent Definition

```python
# Conceptual skeleton (Python SDK)
from agents import Agent, Runner

agent = Agent(
    name="Moyin Architect",
    instructions="You are the architect of the Moyin project...",
    tools=[file_reader, code_searcher],
    model="claude-sonnet-4-6",
)

result = Runner.run_sync(agent, "Analyze this module's dependency graph")
```

### 2.2 Core Components

| Component | Responsibility | Description |
|------|------|------|
| **Agent** | Role definition | Instructions, tools, model, guardrails |
| **Runner** | Execution engine | Manages the Agentic Loop |
| **Tool** | Capability extension | Function Tool / MCP Tool |
| **Guardrail** | Safety constraint | Input validation, output filtering |
| **Handoff** | Task delegation | Agent-to-Agent switching |
| **Tracing** | Observability | Records each decision and tool call |

---

## 3. Key Design Patterns

### 3.1 Single Agent Pattern

```
User -> Agent (tools: [A, B, C]) -> Response
```

Use case: Simple tasks, single domain

### 3.2 Handoff Pattern (Delegation)

```
User -> Triage Agent -> Specialist Agent A
                     -> Specialist Agent B
```

Use case: Multi-domain classification, customer service routing

### 3.3 Orchestrator Pattern

```
User -> Orchestrator Agent --> Worker Agent 1 (parallel)
                           --> Worker Agent 2 (parallel)
                           <-- Merge results -> Response
```

Use case: Complex task decomposition, parallel processing

### 3.4 Pipeline Pattern

```
User -> Agent A -> Agent B -> Agent C -> Response
```

Use case: Multi-stage processing (analyze -> plan -> execute)

---

## 4. Guardrails

### 4.1 Types

| Guardrail Type | Check Timing | Purpose |
|----------|----------|------|
| Input Guardrail | Before Agent receives input | Filter inappropriate requests |
| Output Guardrail | After Agent produces output | Validate output quality |
| Tool Guardrail | Before tool invocation | Restrict dangerous operations |

### 4.2 Application Scenarios in Moyin

- Prevent Agent from modifying `CLAUDE.md` -> Tool Guardrail
- Ensure output complies with brand guidelines -> Output Guardrail
- Block injection attacks -> Input Guardrail

---

## 5. Tracing

### 5.1 Trace Hierarchy

```
Trace (one complete conversation)
  +-- Span: Agent "Architect"
        +-- Span: LLM Call
        +-- Span: Tool "file_reader"
        +-- Span: Handoff -> "Executor"
              +-- Span: LLM Call
              +-- Span: Tool "code_writer"
```

### 5.2 Observability Metrics

- Total token consumption
- Tool call count per Agent
- Failure and retry counts
- End-to-end latency

---

## 6. Integration with the Moyin Agent System

### 6.1 Mapping

| Moyin Concept (see 21_agent_system_design.md) | Agent SDK Component |
|------------------------------------------|---------------|
| Orchestration Layer | Runner + Orchestrator Agent |
| Agent Layer | Specialist Agents |
| Tool Layer | Tool (MCP + Function) |
| Communication Protocol | Handoff |
| State Persistence | Tracing + Custom Storage |

### 6.2 Potential Application Scenarios

| Scenario | Approach |
|------|------|
| Automated Code Review | Reviewer Agent + Guardrails |
| Novel Generation Pipeline | Pipeline: Outline -> Chapter -> Proofread |
| Multi-Agent Parallel Development | Orchestrator + Worktree Isolation |
| Intelligent Customer Service | Triage Agent + Handoff |

---

## To Be Explored

- [ ] Python vs TypeScript SDK comparison
- [ ] Trade-off criteria between custom Tools and MCP Tools
- [ ] Concrete Guardrail implementation examples
- [ ] Comparison with LangGraph / CrewAI and similar frameworks
- [ ] Cost control strategies (model routing, caching)
