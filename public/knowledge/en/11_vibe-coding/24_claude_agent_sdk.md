# Claude Agent SDK Guide: Building Controllable & Observable Multi-Step AI Agents (Claude Agent SDK)

## @Overview

The Claude Agent SDK is an open-source framework by Anthropic designed for building controllable and observable multi-step AI agents. This guide covers the core concepts, development patterns, and practical application scenarios for the SDK within the Moyin project.

---

## 1. Positioning and Core Value

### 1.1 Agent SDK vs Claude API vs Claude Code

- **Claude API**: The lowest level. Used for one-off LLM calls.
- **Agent SDK**: The middleware framework. Used for building custom agents with autonomous workflows.
- **Claude Code**: The top-level product. A CLI-based interactive developer assistant.

### 1.2 Core Attributes

- **Agentic Loop**: Manages the "Think ➝ Act ➝ Observe" cycle autonomously.
- **Tool Use**: Out-of-the-box integration for MCP and custom functions.
- **Guardrails**: Input and output boundaries to prevent agent "hallucination" or deviation.
- **Handoffs**: Task delegation and handover between multiple specialized agents.
- **Tracing**: Full execution tracing and observability with low overhead.

---

## 2. Core Concepts and Components

- **Agent**: Definition of the role (instructions, tools, model, and guardrails).
- **Runner**: The heart of the engine. Manages the execution of the Agentic Loop.
- **Tool**: Capability extensions (MCP Tools or bespoke function tools).
- **Guardrail**: Safety and operational constraints (e.g., input validation, output filtering).
- **Handoff**: Task delegation logic (Agent A ➝ Agent B).
- **Tracing**: Observability layer (recording every decision and tool call).

---

## 3. Key Architectural Patterns

### 3.1 Handoff Pattern (Delegation)

```text
User ➝ Triage Agent (Router) ➝ Specialist Agent A
                               ➝ Specialist Agent B
```

Ideal for multi-domain classification and customer service routing.

### 3.2 Orchestrator Pattern (Orchestration)

```text
User ➝ Orchestrator Agent ──→ Worker Agent 1 (Parallel)
                             ──→ Worker Agent 2 (Parallel)
                             ←── Merge Results ➝ Response
```

Best for breaking down complex tasks and parallel processing.

---

## 4. Guardrails (The Protective Boundaries)

### 4.1 Implementation Examples in Moyin

- **Tool Guardrail**: Preventing agents from modifying critical files like `CLAUDE.md`.
- **Output Guardrail**: Ensuring that generated content strictly adheres to the brand's style guide.
- **Input Guardrail**: Filtering out malicious injection attacks or inappropriate requests.

---

## 5. Practical Use Cases for the Moyin Agent System

- **Automated Code Review**: Using a `Reviewer Agent` with `Guardrails` for quality checks.
- **Novel Generation Pipeline**: A `Pipeline` of specialized agents (Plotting ➝ Chapter Writing ➝ Proofreading).
- **Multi-Agent Parallel Development**: An `Orchestrator` managing different components of the codebase simultaneously.

By leveraging the Claude Agent SDK, you're not just building a "chatbot." You're architecting an autonomous, professional AI workforce specifically tailored to your project's ecosystem.

---

👉 **[Next Step: Skill Authoring Guide](./25_skill_authoring_guide.md)**
