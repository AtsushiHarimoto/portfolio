# 08. Software Design & Patterns Field Guide

> **Type**: Architectural craft and development philosophy  
> **Focus**: Bust the myth that throwing code together is enough, and teach how to combine SOLID principles with design patterns to drive AI toward enterprise-grade, maintainable output.

---

## Prelude: Design patterns in the Vibecoding era
When AI copilots and Claude agents finish scaffolding an application at lightning speed, it is tempting to think that the GoF catalog is obsolete. The opposite is true. Vibecoding and intent-first prompts force us to keep a tight boundary between UI, business logic, and data access. Without that separation, the model will happily stuff every concern into a thousand-line file, creating the spaghetti architecture that makes refactoring and even the AI itself hallucinate.

Design patterns have not died; they have become the military-grade constraints and prompt hints that force AI to deliver clean, scalable modules.

---

## 1. Core backbone: SOLID object-oriented design principles
When you ask an AI to build architecture, SOLID principles set the hard lines for module responsibilities. The two most cited rules in practice are below:

| Principle | Architectural metaphor | Moyin application |
| :-------- | :-------------------- | :--------------- |
| **Single Responsibility Principle (SRP)** | Absolute functional separation. A class or module must have exactly one reason to change. | **Keep API calls and persistence apart**: never bundle MongoDB writes inside the same script that summons OpenAI. Splitting them keeps bug fixes localized. |
| **Open/Closed Principle (OCP)** | Plug in extensions rather than dissect the core. Systems should be open for extension but closed for modification. | **Interface contracts**: when Claude joins the party, build a new `ClaudeAdapter` instead of editing the core inference engine with `if/else`. Treat adapters as plugins that slot into predetermined extension points. |

---

## 2. Command AI with three reusable patterns
Design patterns are not syntax; they are proven architectural vocab that sharpen your prompts. Mention the pattern by name, and the model instinctively outputs the right structure.

| Pattern | Scenario and pain point | Vibecoding prompt |
| :------ | :--------------------- | :---------------- |
| **Factory Pattern** | Automate instance creation so consumers do not need to know the plumbing. | 🗣️ “AI assistant, implement a provider factory. When I pass `gpt4` or `qwen`, return a fully initialized connection with the correct auth token.” |
| **Strategy Pattern** | Prepare multiple algorithms and switch them at runtime without touching the host. | 🗣️ “Please refactor this login handler with strategy. It must let users switch between the Google strategy and the Apple strategy at checkout without modifying the core.” |
| **Singleton Pattern** | Guarantee a single authoritative instance to avoid resource exhaustion. | 🗣️ “Redis connection pool manager must stay a singleton. If users hammer the button, do not create thousands of connections.” |

> 💡 Reduce cognitive load by memorizing which pattern applies where. Feed the name into Claude and let it stitch the pattern for you.

---

## 3. AI-native patterns born from non-determinism
As LLMs multiply inside the stack, extra patterns emerge to manage unpredictability.

| Pattern | Architectural metaphor | Moyin playbook |
| :------ | :-------------------- | :------------ |
| **Agent-Orchestrator Pattern** | Project manager + outsourced teams. | A high-IQ orchestrator (e.g., GPT-4) decomposes the task and farms simple jobs to fast worker agents. Moyin’s pipeline routes a request into “environment description agent” and “dialog generator agent,” then stitches the results. |
| **RAG Pattern** | Open-book exam with citations. | Force AI to extract official knowledge from vector stores or files before answering. When the user asks for exposes on the brand palette, inject the `06_BRAND_DESIGN` fragment into the context. |
| **Copilot Pattern** | AI proposes; humans approve. | The system highlights potential content (e.g., block malicious posts) but waits for an operator to click `Approve` before performing actions. |

---

## ✅ Vibecoder architect acceptance checklist
When you commission a large refactor or a new microservice, avoid sloppy briefings:

- [ ] ❌ “Just build an API Gateway that mixes credit card and LinePay processing together, as long as it runs.”  
- [x] ✅ “Please design an API Gateway component. Its routing logic must obey the Single Responsibility Principle, separating authentication. Payment channels should follow the Strategy Pattern so we can extend Apple Pay without modifying the credit card core, thus respecting the Open/Closed Principle.”  

Speak this language, and AI will recognize you as a seasoned navigator and hand back industrial-grade architecture.
