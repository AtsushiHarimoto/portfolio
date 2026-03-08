# Terminal Sorcery: The PowerShell Alias Cheat Sheet (Alias Cheat Sheet)

## @Overview

The productivity of an elite engineer is defined not by typing speed, but by the ruthless elimination of repetitive manual actions. In complex microservice architectures like Project Moyin, navigating through nested directories and executing long startup strings wastes cognitive energy. This guide introduces the "Black Magic" of terminal aliases—converting cumbersome commands into single-stroke shortcuts to optimize your daily development pipeline.

---

## 1. Killing the Repetition: Why Aliases are Non-Negotiable

Relying on memory to recall deep file paths or complex build flags is a precursor to burnout and human error.

### 🛠️ The Mechanics of Control

By modifying your terminal’s core configuration (such as `$PROFILE` for Windows PowerShell or `.zshrc` for macOS/Linux), you can map long, ugly command strings to short, memorable aliases.

- **Benefits**:
  1.  **Muscle Memory Automation**: Eliminates the need to memorize paths, reducing friction and error rates to near zero.
  2.  **Instant Deployment**: Sitting down at your station and launching a multi-tier environment in three seconds flat creates a flow state that standard CLI usage cannot match.

---

## 2. Core Command Arsenal (Recommended Alias List)

We have identified the highest-frequency, most critical commands for the Moyin project. We recommend implementing these into your environment immediately, categorized into three strategic modules:

### 🚀 ① Instant Ignition & Navigation (Startup & Navigation)

- **`mo-api`**: Instantly teleports your terminal to the API stronghold (`projects/moyin-gateway`) and prepares the runtime environment for launch.
- **`mo-web`**: Flashes your terminal to the frontend administration console (`projects/moyin-web`) for rapid UI iteration.
- **`mo-start`**: The master ignition. Launches a clean, interactive menu allowing you to select which services (Frontend, Gateway, or AI Engine) to spin up simultaneously with your arrow keys.

### 🧠 ② AI Recruitment & Context Sync (AI Agents & Knowledge Sync)

- **`skill-manager`**: Launches the terminal GUI for your AI "armory." Use this to sync, download, or update your AI agents' skill database.
- **`sync-chat-docs`**: **The "God Mode" Command.** This script aggregates fragmented project knowledge into a single, comprehensive Markdown document. This is vital when you need to provide full project context to top-tier LLMs like Claude 3.5, allowing the AI to "telepathically" understand the entire Moyin ecosystem in seconds.

### 🧹 ③ Systematic Demolition (System Maintenance)

- **`rmf`**: A cross-platform, ruthless "Force Delete" tool. Equivalent to the lethal `rm -rf` in Linux. Use this to annihilate broken `node_modules` folders or deeply nested Windows paths that refuse to be deleted via standard GUI methods.

---

## 3. Delegate to the Machine: Don't Script Manually

A high-level architect doesn't learn shell syntax just to create shortcuts. Utilize your AI agent (Cursor or your local assistant) to handle the configuration.

**Example Prompt**:

> _"Lead Tech! Access my PowerShell $PROFILE. I need a new alias called `open-ideas` that navigates to `workspace/ideas` and opens my editor simultaneously. Implement it as a clean function and reload the profile immediately."_

By delegating the "dirty work" of configuration, you save your brainpower for higher-level architectural design and feature development.

---

## 💡 Lead Architect's Insight: The Command Cockpit

Think of your terminal not just as a text interface, but as the integrated cockpit of a massive mothership. A senior engineer automates any action performed more than three times. By building your personal repository of terminal "spells" and syncing them with your knowledge base, you transform yourself from a manual laborer into a high-speed system navigator.

---

👉 **[Next Step: Understanding AI Skills & Agents](./04_skills_and_agents.md)**
