# Project Moyin & The Vibecoding Revolution (Welcome to Moyin)

## @Overview

Project Moyin is more than just a full-stack application; it is built on the 2026 developmental paradigm shift known as "**Vibecoding**"—autonomous development driven by high-level architectural oversight and AI agency. This guide provides a technical overview of the system architecture that integrates frontend interfaces, middleware gateways, and heavy-duty AI compute layers into a single, cohesive ecosystem.

---

## 1. The Three Pillars of the System: Layered Architecture

To ensure scalability and modularity, Project Moyin is strictly partitioned into three distinct layers.

### 🏪 ① Presentation & Interaction (Frontend / UI)

The "storefront" responsible for user experience and content administration.

- **moyin-game-v1**: An immersive Visual Novel engine built for high-performance narrative delivery (Vue 3 / Vite).
- **moyin-web**: A robust administrative dashboard for content management and operation logistics.
- **Tech Stack**: Vue 3, TypeScript, TailwindCSS, and Vite for lightning-fast builds.

### ☎️ ② Unified Gateway & Intelligence (Middleware & APIs)

The "firewall" that decouples frontend interactions from heavy backend computations.

- **moyin-gateway**: The central API routing hub. It manages traffic throttling, authentication, and ensures asynchronous request fulfillment.
- **moyin-mcp-server**: A **Model Context Protocol (MCP)** implementation. It serves as the "Universal Adapter," allowing external AI agents to understand and interact with the project’s internal state and unique command sets.

### 🏭 ③ AI Services & Heavy Compute (Backend AI Engine)

The core "foundry" where GPU-intensive tasks are processed deep within the stack.

- **moyin-comfyUI**: A node-based workflow engine for image and video generation (Stable Diffusion XL / Flux).
- **index-tts / GPT-SoVITS**: Voice cloning and Text-to-Speech engines that give each character a unique auditory identity.
- **Requirements**: Primarily Python-based ecosystems running on CUDA-accelerated GPU infrastructures.

---

## 2. Shared Intelligence: The Knowledge Base as Source of Truth

The `workspace/knowledge/` directory is the "Soul and Brain" of the Moyin project. In the era of Vibecoding, the knowledge base is as critical as the source code itself.

- **Engineering SOPs**: Directories `02` through `05` define the strict rules and design patterns. These serve to "tame" the AI agents, ensuring they adhere to architectural constraints rather than following hallucinated logic.
- **Automated Workflows**: The `09_workflows` directory contains defined procedures for bug fixing, deployment, and testing, enabling AI agents to self-heal and maintain system integrity.

---

## 💡 Lead Architect's Insight: The Vibecoding Workflow

In the Vibecoding era, your role shifts from being a manual worker to being a "Cold Decision Maker" and "Architectural Navigator."

When delegating tasks to AI agents, do not attempt to memorize or feed instructions manually. Instead, empower the AI to utilize its tools to read the `workspace/knowledge/` directory directly. By pointing the AI to the relevant documentation, you ensure consistency, reduce cognitive load, and maintain a high standard of engineering excellence.

---

👉 **[Next Step: Setting Up Your Environment](./02_environment_setup.md)**
