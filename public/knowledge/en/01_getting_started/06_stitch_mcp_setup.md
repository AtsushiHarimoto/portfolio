# Google Stitch MCP Setup: Granting Your AI Divine Vision (Optional)

## @Overview

"Generating code instantly from a design mockup"—this has long been the industry's ultimate goal. In 2026, **Google Stitch** has turned this into reality. As a forward-thinking AI design assistant from Google Labs, Stitch can ingest a screenshot of a competitor's app or a Figma wireframe, deconstruct the visual hierarchy, and synthesize high-fidelity frontend code. This guide provides the technical procedure to equip your AI agent with "sight" by setting up the Google Stitch MCP server.

---

## 1. What is Stitch MCP? A Visual Reasoning Gateway

Standard AI models are effectively "blind" to structured UI data. Stitch MCP acts as a visionary plug-in, unlocking advanced visual capabilities for your local AI agent.

- 👁️ **`extract_design_context` (Visual Parsing)**: Accurately identifies font sizes, specific hex codes, drop shadows, and pixel-perfect spacing directly from a source image.
- ⚙️ **`fetch_screen_code` (Automated Synthesis)**: Based on the deconstructed design, it synthesizes production-ready HTML, Tailwind CSS, or component code (Vue/React) with up to 95% fidelity.

---

## 2. Prerequisites: Licenses & Tooling

Before initiating the setup, ensure you have the following assets ready:

1.  **Google Cloud Account**: Administrative access to GCP for managing cloud compute resources.
2.  **Node.js**: A local runtime environment required to execute the MCP server.
3.  **Google Stitch Beta Access**: Prior application/approval is mandatory 👉 [Apply here](https://stitch.withgoogle.com).

---

## 3. The Setup SOP: Provisioning the Divine Eye

### 🏛️ Step 1: Establish a Google Cloud Stronghold

1. Log in to the [Google Cloud Console](https://console.cloud.google.com).
2. Select "Create Project" and name it something professional (e.g., `moyin-stitch`).
3. **Crucial**: Copy your **Project ID** (e.g., `moyin-stitch-123456`). This identifier is required for binding your local agent to the cloud engine.

### 🛠️ Step 2: Install the Google Cloud CLI (gcloud)

To authenticate your local workstation with Google’s servers, the proprietary CLI is mandatory.

- **For Windows (PowerShell)**:
  ```powershell
  Invoke-WebRequest -Uri "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe" -OutFile "$env:TEMP\GoogleCloudSDKInstaller.exe"
  Start-Process -FilePath "$env:TEMP\GoogleCloudSDKInstaller.exe" -Wait
  ```
  _Ensure "Add gcloud to PATH" is checked during installation._
- **For macOS (Terminal)**:
  ```bash
  brew install --cask google-cloud-sdk
  ```

### 🔑 Step 3: Local Authentication & API Activation

Execute the following commands in sequence to exchange credentials:

```bash
# 1. Authenticate your Google Account
gcloud auth login

# 2. Bind your workspace to the project (Replace with your actual ID)
gcloud config set project [YOUR_PROJECT_ID]

# 3. Generate Application Default Credentials (ADC)
gcloud auth application-default login

# 4. Enable the Stitch API Service
gcloud services enable stitch.googleapis.com
```

### 🔌 Step 4: Configuring the MCP Server

Inform your AI agent of the available weapon. Inject the configuration into your local settings.

- **Antigravity (Windows)**: `%USERPROFILE%\.gemini\antigravity\mcp_config.json`
- **Cursor**: `.cursor/mcp.json` within your workspace.

Add the following to the `mcpServers` object:

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "stitch-mcp"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "[YOUR_PROJECT_ID]"
      }
    }
  }
}
```

---

## 💡 Lead Architect's Insight: Strategic Deconstruction

Once your AI is equipped with Stitch MCP, don't use it for simple mirroring. Demand that the AI map external designs to your project's specific design system.

**Example Command**:

> _"Lead Tech! Analyze this screenshot using Stitch MCP. Measure the spacing and shadows, then synthesize a Vue 3 component. Ensure every color and utility class is mapped directly to our project's **Tailwind Color Tokens**. Do not use arbitrary hard-coded hex values."_

By forcing the AI to "digest" external designs through the filter of your local constraints, you maintain architectural integrity while leveraging state-of-the-art visual generation.

---

👉 **[Next Step: Mastering Architectural Excellence](./index.md)**
