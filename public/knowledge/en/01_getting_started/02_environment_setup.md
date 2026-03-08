# Arming the Mothership: Environment Setup & Rapid Deployment (Environment Setup)

## @Overview

To build and maintain a modern AI-native project, your development environment must be robust and high-performing. Relying on legacy tools leads to technical debt and deployment friction. This guide outlines the mandatory runtime prerequisites and core utilities required to ignite the Moyin project, spanning from the visual frontend to the heavyweight AI compute layers.

---

## 1. Building the Foundation: Modern Runtime Prerequisites

To prevent common dependency conflicts (the notorious "Dependency Hell"), Project Moyin standardizes on a high-performance, modern toolchain.

### 🚄 ① Frontend & Gateway: Node.js & pnpm

The engine room for compiling interfaces and orchestrating API routes.

- **Node.js** (`v18.x` or `v22.x`+ LTS)
  - **Role**: Serves as the primary execution engine for builds, hot-reloads, and the Gateway API.
- **pnpm (Performant Node Package Manager)**
  - **Role**: A performance-oriented package manager that uses hard links to save disk space and drastically speed up installations.
  - **Setup**: Run `npm i -g pnpm` after installing Node.js. **Avoid standard `npm`** for this project to ensure consistent and fast dependency resolution.

### 🌋 ② AI Heavy Compute: Python & uv

The primary ecosystem for loading large neural networks, PyTorch frameworks, and automation scripts.

- **Python** (`3.10` or higher)
  - **Role**: The standard language for machine learning and AI inference.
- **uv (The Fast Python Package Manager)**
  - **Role**: A Rust-based replacement for `pip`. It resolves and installs massive AI libraries significantly faster than traditional tools.
  - **Setup**: Install via `pip install uv`. This is non-negotiable for managing multi-gigabyte AI dependencies without bottlenecking your workflow.

---

## 2. Igniting the Engine: Local Service Startup

Once the foundations are set, follow these procedures to launch your local development services.

### 🔌 ① Launching the Central Hub: API Gateway (`moyin-gateway`)

Navigate to the gateway directory and execute the startup script corresponding to your OS.

```bash
cd projects/moyin-gateway
# Windows (PowerShell)
./run_game_api.ps1
# macOS / Linux
chmod +x run_game_api.sh && ./run_game_api.sh
```

### 🖥️ ② Lighting Up the UI: Control Dashboard (`moyin-web`)

Open a secondary terminal to start the Vite-powered development server.

```bash
cd projects/moyin-web
pnpm install
pnpm run dev
```

---

## 3. Troubleshooting the "Amnesia" Minefields

Avoid these common pitfalls often encountered during initial setup on Windows and Linux:

- 💣 **Issue A: `Unsupported Engine` Errors**
  - **Root Cause**: Your Node.js version is obsolete.
  - **Solution**: Install the latest LTS version from the official website to overwrite the legacy runtime.
- 💣 **Issue B: "Path Too Long" or Un-removable `node_modules`**
  - **Root Cause**: Windows' legacy limitation on directory depth.
  - **Solution**: Do not attempt to delete via GUI. Use the terminal command `npx rimraf node_modules` for a clean, forced removal.

---

## 💡 Lead Architect's Insight: AI-Accelerated Setup

Don't spend hours wrestling with environment variables. In the Vibecoding ecosystem, your AI agent is your advanced technician.

If you encounter red-text errors during installation, copy the Full Stack Trace and feed it to the AI. Ask the AI to diagnose the missing dependencies and generate a remediation script. By letting the AI handle the "dirty hands" work of system configuration, you can focus on the higher-level architectural decisions and narrative design.

---

👉 **[Next Step: PowerShell Aliases & Efficiency](./03_powershell_alias_cheat_sheet.md)**
