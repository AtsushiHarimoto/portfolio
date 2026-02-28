# The AI Agent Blueprint: Four Universal Design Patterns

**Goal**: Move beyond treating AI as a single individual. Learn the four essential Agent formations from modern software engineering, and orchestrate your own multi-department AI digital team like a seasoned manager.

---

In [Chapter 11: AI Agents & MCP Deep Dive](./11_vibecoding_agent_mcp.md), we established that an Agent is "a brain with tools (equipped with ReAct reasoning)."
But when AI tackles truly complex tasks -- like building an entire microservice -- a single brain is not enough. It will inevitably be overwhelmed by tangled details.

In recent years, software architects worldwide have codified a set of four essential techniques known as **Agentic Design Patterns**.

Master these patterns, and you become a true AI orchestrator.

---

## 1. Reflection Pattern (Self-Review & Self-Correction)

- **The pain point**: You ask AI to write a calendar component, and it produces a mess of broken code and hands it to you: "Done, boss!" (Then you spend two hours fixing bugs in a rage.)
- **The Reflection solution**:
  We attach an additional "critic" persona to the AI.
  `[Worker Brain]` writes code -> passes it to `[Compiler/Lint Tool]` which finds errors
  -> `[Critic Brain]` reads the error log and mercilessly calls out `[Worker Brain]`: "You misspelled a variable -- go rewrite it!"
  -> Only after they battle it out internally until the code is flawless does the final, working result get delivered to you.
  > **In Moyin**: When you run `/commit` and Git reports a conflict, your Agent automatically reads the error, resolves the conflict on its own, and retries. That is the Reflection pattern in action.

---

## 2. Planning Pattern (Decompose Before You Build)

- **The pain point**: You say: "Build me an order management backend!" The AI's brain short-circuits -- it starts writing `index.html`, realizes halfway through there is no backend, goes back to add a database, and ends up with an incoherent mess.
- **The Planning solution**:
  For large tasks, the AI forces itself to hit the **pause button** before writing any code, becoming an architect who produces a step-by-step execution plan:
  > 1. Scaffold the Express backend shell
  > 2. Define the MongoDB schema
  > 3. Implement the login API
  > 4. Build the frontend login UI connected to the API

> **In Moyin**: Remember the ironclad first rule in `00_core_protocol`? **"Must provide a Plan and checklist first; only proceed to Action after getting your OK."** This is exactly how we force AI to practice the Planning pattern.

---

## 3. Multi-Agent Collaboration

- **The pain point**: You force a single AI to handle coding, UI design, and unit testing all at once (that is like asking a visual designer to manage the database). The AI overloads and gives up.
- **The Multi-Agent solution**:
  We set up an entire virtual company with multiple specialized AIs:
  - `[Senior Engineer AI]`: Responsible only for writing core logic.
  - `[Security Reviewer AI]`: Dedicated to scrutinizing the engineer's output for vulnerabilities.
  - `[QA Tester AI]`: Responsible for writing automated test scripts.
    These three AIs collaborate in a virtual meeting room, discussing until they converge on a solid solution before presenting it. (This is what frameworks like AutoGen are doing today.)

---

## 4. Intelligent Routing (LLM as a Router)

- **The pain point**: A user asks "Hello, what time is it?" and the system calls the most expensive, most capable `GPT-4o` to answer. That is using a cannon to swat a fly -- the monthly API bill will be devastating.
- **The Router solution**:
  Set up an extremely cheap, ultra-fast "switchboard AI gatekeeper."
  When a user sends a message:
  1. The switchboard reads the question.
  2. If it is "What is the leave policy?" -> route to a cheap local model (Ollama).
  3. If it is "Write me a complex algorithm" -> route to the expensive executive model (Claude 3.5 Sonnet).

> **In Moyin**: Our **I1 Gateway** microservice plays this thankless but critical switchboard role every single day.

---

### Acceptance Checklist

After seeing these four patterns, you will notice: **designing an Agent system is essentially designing a company's HR and process management.**

As a future AI Pilot, adopt these principles:

- [ ] I know not to expect a single genius to run the entire company (avoid over-reliance on a single AI).
- [ ] I know to force AI to draft an architectural blueprint before coding **(Planning)**.
- [ ] I know to equip AI with an automated self-critique mechanism **(Reflection)**.
- [ ] I know to route the right tasks to the right departments **(Router & Multi-Agent)**.
