# The Vibecoding Workflow: From Manual Coder to Lead Architect (Vibecoding Workflow)

## @Overview

The role of the software developer is undergoing a radical shift—from a manual laborer writing code line-by-line to a high-level "Lead Architect" orchestrating AI agents. **Vibecoding** represents the pinnacle of this new human-AI symbiosis. This guide details how to leverage the immense computational power of AI while maintaining zero-risk, high-speed delivery through a refined Standard Operating Procedure (SOP) and rigorous architectural protocols.

---

## 1. The Sentinel Protocol: Safeguarding through `00_core_protocol`

While AI agents are incredibly powerful, they are prone to "hallucinations" and dangerous unauthorized file overwrites. To mitigate this risk, Project Moyin implements a strict behavioral barrier via `.agent/rules/00_core_protocol.md`.

- **🛑 No Unapproved Writes**: The agent has zero authority to create, modify, or delete any file on your local disk without explicit user approval (e.g., an `OK` command or a confirmation gesture). The AI must first propose changes and wait for your mandate.
- **📝 Mandatory PLAN Phase**: For complex tasks, the agent is prohibited from starting immediate implementation. It must first analyze the Knowledge Base and existing code, then present a "Plan of Action" (PLAN) for your review.
- **🇹🇼 Language Synchronization**: All internal reasoning, project reports, and Git commit messages are strictly synchronized to the specified project language (e.g., Traditional Chinese) to ensure absolute transparency in the "AI's thoughts."

---

## 2. The Standard Interaction Loop (SOP)

A robust and secure Vibecoding workflow follows a precise 4-step loop that ensures high-fidelity results with minimal manual effort:

1.  **👨‍💼 The Request**: You provide high-level requirements in natural language (e.g., _"Refactor this login form to use our shared Design Tokens"_).
2.  **🤖 The Proposal (PLAN)**: The AI agent analyzes the current codebase and presents a structured "Plan of Action," detailing affected files and proposed implementation logic.
3.  **👨‍💼 Approval & Execution**: Once you review the plan and provide an `OK`, the AI instantaneously generates hundreds of lines of code, applies the changes, and runs the necessary verification tests.
4.  **👨‍💼 Verification & Acceptance**: You review the Diff. If the output meets your standard, you instruct the AI to proceed with the final commit.

---

## 3. High-Efficiency Sorcery: The Slash Command Workflows

To eliminate redundant typing, we have encapsulated complex multi-step procedures into "Slash Commands." These trigger end-to-end automated pipelines.

- 👉 **`/new`**: **New Feature Onboarding**. AI acts as a consultant, guiding you through a structured Q&A to turn a vague idea into a rigid requirement specification.
- 👉 **`/plan`**: **Architectural Analysis**. Triggers a deep-dive analysis of codebase impacts before any destructive refactoring takes place.
- 👉 **`/verify`**: **Autonomous Quality Control**. Empowers the AI to read server logs, trigger test suites, and self-patch bugs detected in the code.
- 👉 **`/commit`**: **Automated Release Management**. Scans your afternoon’s modifications and generates a standard Conventional Commit message, preparing your local changes for deployment.

---

## 💡 Lead Architect's Insight: Strategies for Success

In a Vibecoding environment, your value lies in your ability to manage "Context"—defining the boundaries and providing the AI with the right information.

- **Context is King**: The accuracy of an AI is proportional to the data it can access. Explicitly providing file paths, attaching UI screenshots, or pointing the AI to specific existing components to clone will reduce hallucination rates to near zero.
- **The Git Safety Net**: Never fear letting the AI generate large volumes of code. With robust Git version control, any mistake can be reverted instantaneously. This "permission to fail" is what allows for unprecedented development velocity.

---

👉 **[Next Step: Google Stitch MCP Integration](./06_stitch_mcp_setup.md)**
