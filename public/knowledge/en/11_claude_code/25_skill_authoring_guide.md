# Skill Authoring Guide

> **Type**: Development Standard
> **Date**: 2026-02-26
> **Status**: Skeleton
> **Related**: `07.2.claude_skills_structure.md`, `22_opencwal_principles.md`

---

## Summary

A Claude Code Skill is a reusable prompt package that injects domain knowledge and structured workflows into an Agent. This guide defines Skill design principles, file format, quality standards, and lifecycle management.

---

## 1. What Is a Skill?

### 1.1 Essence

Skill = **Structured context injection package** (see OpenCWAL L1-L2)

```
Trigger condition -> Load Skill content -> Inject into Agent context -> Guide behavior
```

### 1.2 How It Differs from Other Concepts

| Concept | Purpose | Persistence | Trigger Method |
|------|------|--------|----------|
| CLAUDE.md | Global constraints | Always loaded (L0) | Auto-injected |
| Skill | Domain guidance | On-demand (L1) | Manual / condition matching |
| MCP Tool | Capability extension | Always available | Agent-initiated call |
| Prompt Template | Input template | One-time | User selection |

---

## 2. File Format

### 2.1 Frontmatter (Required)

```yaml
---
name: my-skill-name           # kebab-case, globally unique
description: >
  One-sentence description of purpose and trigger condition.
  Use when [trigger scenario].
---
```

### 2.2 Structure Template

```markdown
---
name: skill-name
description: Brief purpose. Use when [trigger scenario].
---

## Context
Why this Skill exists and what problem it solves.

## Rules
Constraints the Agent must follow.

## Workflow
1. Step one
2. Step two
3. ...

## Checklist
- [ ] Acceptance item 1
- [ ] Acceptance item 2

## Examples
<example>
Concrete input/output example
</example>

## Anti-patterns
- Do not do X
- Common mistake Y
```

---

## 3. Design Principles

### 3.1 Core Principles

| # | Principle | Description |
|---|------|------|
| 1 | **Single responsibility** | One Skill solves one problem |
| 2 | **Explicit trigger** | The description must clearly state when to use it |
| 3 | **Self-contained** | Must not depend on other Skills to function |
| 4 | **Testable** | Has clear input -> output expectations |
| 5 | **Token-efficient** | Aim for under 2,000 tokens (ideal) |

### 3.2 Naming Conventions

| Type | Format | Example |
|------|------|------|
| General workflow | `verb-noun` | `commit-work`, `review-pr` |
| Domain guidance | `domain-topic` | `frontend-design`, `api-design` |
| Project-specific | `project-feature` | `moyin-brand-guard` |

### 3.3 Writing Effective Descriptions

```
Good: "Use when implementing frontend components. Ensures brand compliance and accessibility."
Bad:  "Frontend skill"
Bad:  "This skill helps with frontend stuff"
```

Key elements:
- **When to use** (Use when...)
- **What it does** (Ensures / Guides / Validates...)
- **Trigger keywords** to improve auto-matching accuracy

---

## 4. Quality Standards

### 4.1 Skill Quality Checklist

| Item | Standard |
|------|------|
| Frontmatter | name + description complete |
| Trigger condition | Clear "Use when" in description |
| Process steps | Numbered Workflow or Checklist |
| Examples | At least one `<example>` block |
| Anti-patterns | At least list common mistakes |
| Token length | < 3,000 tokens (recommended) |
| Unambiguous | Rules use "must / must not" rather than "should / may" |

### 4.2 Rigid vs Flexible

| Type | Characteristics | Example |
|------|------|------|
| **Rigid** | Steps must be followed exactly | TDD, debugging, commit |
| **Flexible** | Principle-based guidance, adaptable | design-patterns, frontend-design |

Mark the type at the beginning of the Skill so the Agent knows how much flexibility it has.

---

## 5. Storage & Management

### 5.1 Directory Structure

```
~/.claude/skills/
+-- core/               # Core workflow Skills
+-- domain/             # Domain knowledge Skills
+-- project/            # Project-specific Skills
+-- experimental/       # Experimental Skills
```

### 5.2 Lifecycle

```
Draft -> Review -> Active -> Deprecated -> Archived
```

| Stage | Criteria |
|------|------|
| Draft | First version complete |
| Review | Validated through at least 3 real-world uses |
| Active | Stable and in active use |
| Deprecated | A better alternative exists |
| Archived | Moved to `_archive/` |

### 5.3 Version Sync

> Reminder: After modifying `~/.claude/skills/`, sync to Git Remote
> `git@github.com:AtsushiHarimoto/Moyin-Claude-skills-config.git`

---

## 6. Common Anti-patterns

| Anti-pattern | Problem | Fix |
|--------|------|------|
| Giant Skill | > 5,000 tokens; dilutes attention | Split into multiple smaller Skills |
| Vague trigger | Description too broad; gets false-triggered | Add specific trigger conditions |
| Implicit dependency | Assumes other Skills are already loaded | Self-contain all necessary information |
| Missing examples | Agent unsure of expected behavior | Add example blocks |
| Over-specification | Too rigid to adapt to change | Distinguish Rigid / Flexible |

---

## To Be Explored

- [ ] Automated testing strategy for Skills
- [ ] Skill composition and orchestration patterns
- [ ] Skill performance measurement (token usage, trigger accuracy)
- [ ] Integration with OpenCWAL context budgets
- [ ] Skill version management and breaking change handling
