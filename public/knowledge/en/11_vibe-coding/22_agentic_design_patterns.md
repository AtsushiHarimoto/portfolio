# The Brain Blueprints for AI Agents: Four Universal Design Patterns (Agentic Design Patterns)

## @Overview

Stop treating AI as just a single person! Learn the four trendiest agentic patterns in software engineering and manage your "multi-department digital AI team" like a pro executive.

---

In the previous chapter, "Deep Dive into AI Agents & MCP," we learned that an Agent is a "brain that can handle tools (possesses ReAct reasoning abilities)." However, when an AI needs to complete truly complex tasks (like writing a full set of microservices), a single raw brain isn't enough; it will eventually be driven mad by intricate details.

In recent years, software masters around the world have summarized a set of four major moves known as **"Agentic Design Patterns."** Understanding these moves will make you a true AI conductor!

---

## 🪞 1. Reflection Pattern (Self-Correction)

- **The Nightmare Scenario**: You ask an AI to write a calendar component, and it produces a messy, non-functional block of code: "Boss, I'm done!" (Then you spend two hours fixing the bugs yourself).
- **💯 Reflection (Self-Audit) Mode**:
  We attach a "Nitpicking Reviewer" persona to the AI.
  1. `[The Worker Brain]` writes the code ➝ `[Compiler/Checker Tool]` finds errors.
  2. `[The Nitpicker Brain]` reads the error logs and ruthlessly criticizes the Worker: "You have a typo in your variable; go back and rewrite it!"
  3. They argue and iterate internally until the code is flawless before handing the final, successfully running result to you.

---

## 🗺️ 2. Planning Pattern (Breaking Down Tasks)

- **The Nightmare Scenario**: You command: "Build me an order management system!" The AI freezes up, starts writing `index.html`, realizes halfway through it has no backend, and scrambles to add a database. The code ends up as a total mess.
- **💯 Planning (Architectural Blueprint) Mode**:
  Facing a massive task, the AI forces itself to hit the **Pause Button** and act as an architect, producing a Step-by-Step execution plan:
  > 1. Set up the Express backend skeleton.
  > 2. Define MongoDB data schemas.
  > 3. Implement the Login API.
  > 4. Finally, write the frontend login interface to connect to the API.

---

## 🤝 3. Multi-Agent Collaboration Pattern

- **The Nightmare Scenario**: You force a single AI model to handle coding, UI design, and unit testing all at once (like asking a visual designer to manage a database). The AI crashes under the load.
- **💯 Multi-Agent (Department Meeting) Mode**:
  We set up a virtual company with multiple AI specialists:
  - `[Senior Engineer AI]`: Only responsible for core logic.
  - `[Security Audit AI]`: Strictly monitors the engineer's code for vulnerabilities.
  - `[QA Testing AI]`: Responsible for automatically writing test scripts.
    These three AIs "meet" in a private cloud room to discuss the best solution before presenting the results. (This is what powerful libraries like AutoGen are doing).

---

## 🚦 4. Intelligent Routing Pattern (LLM as a Router)

- **The Nightmare Scenario**: A player asks, "Hi, what time is it?" and the system calls the most expensive and smartest `GPT-4o` to answer. This is like using a cannon to shoot a sparrow—your monthly API bill will make you cry.
- **💯 Router (Switchboard) Mode**:
  Establish an extremely cheap and fast "Guard AI" as a switchboard.
  When a player sends a message:
  1. The Switchboard checks the question.
  2. If it's about "leave policy," the Switchboard routes it ➝ Dispatched to a cheap local model (Ollama).
  3. If it's about "writing a massive algorithm," the Switchboard ➝ Forwards it to the expensive senior executive (Claude 3.5 Sonnet).

---

## ✅ The Pro Executive's Checklist

After seeing these four patterns, you'll find that **designing an Agent system is essentially designing a company's HR and process management.** As a future AI Pilot, make these your mottos:

- [ ] I will not expect a single genius to run the whole company (do not over-rely on a single AI).
- [ ] I will force the AI to write an architectural blueprint (**Planning**) before starting work.
- [ ] I will add a validation mechanism for automatic nitpicking (**Reflection**).
- [ ] I will assign the right tasks to the right department inboxes (**Router and Multi-Agent**).

---

👉 **[Next Step: MCP Server Development Guide](23_mcp_server_dev_guide.md)**
