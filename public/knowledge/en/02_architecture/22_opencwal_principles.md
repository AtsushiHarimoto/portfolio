# 22. OpenCWAL Principles

> **Type**: Architectural primer  
> **Date**: 2026-02-26  
> **Status**: Outline  
> **Acronym**: Open Context Window & Attention Lattice

---

## Summary

OpenCWAL is a context-management framework for AI agent systems. It maximizes agent performance within constrained context windows by combining context hierarchy, attention routing, and latency budgeting.

---

## 1. Why OpenCWAL matters

### 1.1 Pain points

| Pain | Description |
| :--- | :---------- |
| Context waste | Lots of irrelevant tokens consume budget without improving quality |
| Attention dilution | Key instructions get buried and the model “forgets” constraints |
| Latency blow-up | Longer prompts increase inference delay |
| Memory fragmentation | Context across sessions/agents fails to propagate |

### 1.2 Goals

- Feed each agent only the minimal context it needs  
- Keep constraints in high-attention zones  
- Keep prompts within a latency budget  
- Make every context traceable

---

## 2. Three pillars

### 2.1 Context hierarchy

```
Level 0 — System Core     Permanently injected (CLAUDE.md, core rules)
Level 1 — Session State    Session-level (current task, plan, issue)
Level 2 — Working Set      Task-level (documents under active edits)
Level 3 — Reference        On-demand (knowledge base docs, history)
Level 4 — Archive          Not loaded (compressed archive for search)
```

| Level | Lifetime | Token budget | Load policy |
| :---- | :------- | :----------: | :---------- |
| L0 | Permanent | ~10% | Auto-inject |
| L1 | Session | ~20% | Load at task start |
| L2 | Task | ~50% | Read on demand |
| L3 | On-demand | ~15% | Trigger via keywords/RAG |
| L4 | Archive | 0% | Search via grep |

### 2.2 Attention routing

#### Core principles

- Front-loading: place constraints at the prompt beginning  
- Repetition anchoring: repeat rules in system reminders  
- Separation: segment different info types clearly  
- Progressive detail: start with summary, expand as needed

#### Attention heatmap

```
Prompt position: [front] ████████████ [middle] ████░░░░ [end] ████████
Intensity:        very high          medium/decay          reactivated (recency)
Content:          core rules         working data          action/output format
```

### 2.3 Latency budget

| Use case | Target tokens | Target latency | Strategy |
| :------- | :-----------: | :------------: | :------ |
| Chat | <4K | <2s | Minimal context |
| Coding | 8K–32K | <10s | Selective docs |
| Deep analysis | 32K–128K | <60s | Full docs + RAG |
| Batch jobs | unlimited | unlimited | Split subtasks |

---

## 3. Practical patterns

### 3.1 Context assembly flow

```
1. Load L0 (System Core)
2. Load L1 (Session State) based on task_type
3. Load L2 (Working Set) per task scope
4. If insufficient, trigger RAG/Grep for L3
5. Ensure total tokens < budget
6. If over limit → compress L2 or split task
```

### 3.2 Moyin practices

| Principle | Moyin implementation |
| :-------- | :------------------- |
| L0 permanence | Auto-inject CLAUDE.md |
| L1 session | Load from `workspace/.context/` |
| L2 on demand | Agents fetch via Read/Grep |
| Attention front-loading | Core rules at CLAUDE.md start |
| Repetition anchoring | `system-reminder` repeats constraints |
| Latency budget | On-demand reads instead of full prompts |

### 3.3 Skills as CWAL payloads

Every skill packages L1–L2 context:

- Skill description → triggers (when to load)  
- Skill content → context injection (domain knowledge + process guidance)  
- Skill checklist → structured attention (steps to focus on)

---

## 4. Design principles

| # | Principle | Description |
| :-- | :-------- | :--------- |
| 1 | Minimal context | Only provide necessary info |
| 2 | Hierarchical loading | L0–L4 with increasing laziness |
| 3 | Attention protection | Keep constraints in high-attention zones |
| 4 | Token budget | Each call has a hard token cap |
| 5 | Traceability | Label every context with source & version |
| 6 | Compression over truncation | Prefer summarizing over blunt truncation |

---

## To explore

- Auto token budget calculators  
- Context compression (abstractive vs extractive)  
- RAG + L3 integration  
- Cross-agent context sharing protocols  
- Alignment with the communication protocol in `21_agent_system_design.md`
