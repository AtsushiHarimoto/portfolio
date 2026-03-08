# AI Skill Authoring Guide: Designing Structured Prompts & Workflows for Claude Code (Skill Authoring Guide)

## @Overview

Claude Code Skills are reusable prompt encapsulations that inject domain knowledge and structured workflows into an AI Agent. This guide defines the design principles, file formats, quality standards, and lifecycle management for Skills.

---

## 1. What is an AI Skill?

### 1.1 Essence

Skill = **Structured Context Injection Pack** (Reference: OpenCWAL L1–L2).

```text
Trigger Condition Met → Load Skill Content → Inject into Agent Context → Guide Behavior
```

### 1.2 Distinctions from Other Concepts

- **CLAUDE.md**: Global constraints. Persistent (L0). Automatically injected.
- **Skill**: Domain guidance. On-demand (L1). Manual or conditionally matched.
- **MCP Tool**: Capability expansion. Always available. Autonomously called by the Agent.
- **Prompt Template**: Input template. One-off entry. Selected by the user.

---

## 2. File Format

### 2.1 Frontmatter (Required)

```yaml
---
name: my-skill-name # kebab-case, globally unique
description: >
  A single sentence describing the purpose and trigger.
  Use when [trigger scenario].
---
```

### 2.2 Structural Template

- **Context**: Why this skill is needed; what problem it solves.
- **Rules**: Constraints the Agent must strictly obey.
- **Workflow**: Numbered steps (1, 2, 3...) to follow.
- **Checklist**: Items the Agent or User must verify before completion.
- **Examples**: Specific input/output examples using `<example>` tags.
- **Anti-patterns**: Common mistakes or "don'ts" to highlight.

---

## 3. Design Principles

### 3.1 Core Tenets

- **Single Responsibility**: One skill should solve one specific problem.
- **Clear Triggering**: The `description` must explicitly state when to use the skill (e.g., "Use when...").
- **Self-Contained**: Do not assume other skills are loaded to operate.
- **Token Efficient**: Keep it under 2,000 tokens if possible (ideal range).
- **Verifiable**: Has clear "Input ➝ Output" expectations.

---

## 4. Quality Standards

### 4.1 Skill Quality Checklist

- [ ] **Frontmatter**: Complete `name` and `description`.
- [ ] **Trigger**: Explicit "Use when..." condition in the description.
- [ ] **Workflow**: Numbered steps or a clear sequence.
- [ ] **Examples**: At least one `<example>` block included.
- [ ] **Anti-patterns**: Common errors listed and warned against.
- [ ] **Ambiguity**: Rules use "Must / Must not" rather than "Should / Could."

---

## 5. Storage and Management

### 5.1 Directory Structure

```text
~/.claude/skills/
├── core/               # Core workflow skills
├── domain/             # Domain-specific knowledge (e.g., frontend, API design)
├── project/            # Project-specific custom skills
└── experimental/       # Skills in the draft/testing phase
```

### 5.2 Lifecycle

`Draft` (Initial version) ➝ `Review` (Validated by at least 3 real uses) ➝ `Active` (Stable usage) ➝ `Deprecated` (Marked for removal) ➝ `Archived` (Moved to `_archive/`).

By maintaining high standards for your AI Skills, you ensure that your Agent transitions from a "talking chatbot" to a professional "Engineered Partner" that understands your domain deeply.

---

👉 **[Next Step: Project Context Management](./12_prompt_and_context_management.md)**
