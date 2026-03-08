# 06. 降維打擊的黑魔法：Google Stitch MCP 視覺超能設置指南 (Optional)

## @概覽

「從一張設計稿截圖直接生成程式碼」，這曾是前端工程師的終極夢想，而在 2026 年，藉由 **Google Stitch** 已成為現實。這是 Google Labs 釋出的前瞻級 AI 輔助武器，具備強大的視覺拆解能力：只要提供競品 App 截圖或 Figma 草圖，它便能精確識別佈局結構、設計語彙，並直接「噴出」對應的前端原始代碼。本篇將引導您配置 Google Stitch MCP 伺服器，為您的 AI 代理人開啟「神之眼」。

---

## 1. 什麼是 Stitch MCP？賦予 AI 視覺的門戶

傳統的 AI 模型在處理 UI 數據時如同「盲人摸象」，而 Stitch MCP 則是一套視覺推理接口，能讓您的本地 AI 實作下述神級功能：

- 👁️ **`extract_design_context` (設計語意提取)**：精確抓取截圖中的字體大小、陰影色深、按鈕圓角以及 Pixel 等級的間距參數。
- ⚙️ **`fetch_screen_code` (自動代碼煉金術)**：不僅是觀察，它還能將視覺元件直接「逆向還原」成 HTML/Tailwind CSS 結構，或對應的 Vue/React 原始碼，還原度可達 95% 以上。

---

## 2. 前提條件：通行證與環境準備

在啟動設置前，請確保具備以下三項資產：

1.  **Google Cloud 帳戶**：具備操作 GCP 雲端資源的權限，用以承載視覺算力。
2.  **Node.js**：環境必須已安裝且可於全域路徑存取。
3.  **Google Stitch Beta 權限**：需事先申請封測資格 👉 [申請連結](https://stitch.withgoogle.com)。

---

## 3. 配置步驟 SOP：召喚視覺超能

### 🏛️ 步驟 1：建立 Google Cloud 專案

1. 登入 [Google Cloud 控制台](https://console.cloud.google.com)。
2. 點選「新增專案」，取名為如 `moyind-stitch`。
3. **重要**：記下您的 **專案 ID (Project ID)**（例如：`moyind-stitch-456789`），後續金鑰綁定將頻繁使用。

### 🛠️ 步驟 2：安裝 Google Cloud CLI (gcloud) 工具

為了與 Google 認證伺服器交換信物，您的電腦需安裝專屬 CLI 工具。

- **Windows (PowerShell)**：
  ```powershell
  Invoke-WebRequest -Uri "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe" -OutFile "$env:TEMP\GoogleCloudSDKInstaller.exe"
  Start-Process -FilePath "$env:TEMP\GoogleCloudSDKInstaller.exe" -Wait
  ```
  _※注意：安裝時請務必勾選「Add gcloud to PATH」。_
- **macOS (Terminal)**：
  ```bash
  brew install --cask google-cloud-sdk
  ```

### 🔑 步驟 3：本地身分驗證 (Authentication)

執行以下指令完成認證與權限解除封印：

```bash
# 1. 喚起瀏覽器登入 Google 帳號授權
gcloud auth login

# 2. 綁定專案工作區 (請替換為您的 Project ID)
gcloud config set project [YOUR_PROJECT_ID]

# 3. 獲取預設應用程式憑證 (ADC，MCP 伺服器運作關鍵)
gcloud auth application-default login

# 4. 啟用 Stitch API 服務
gcloud services enable stitch.googleapis.com
```

### 🔌 步驟 4：硬核掛載 MCP 伺服器配置

將武裝配置寫入 AI 工具的底層配置檔中。

- **Antigravity (Windows)**：`%USERPROFILE%\.gemini\antigravity\mcp_config.json`
- **Cursor**：專案目錄內的 `.cursor/mcp.json`

在 `mcpServers` 中填入：

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

## 💡 架構師的實務心法：精準抄襲與還原

一旦啟動 Stitch MCP，您的開發重心將轉向「提示詞控制」。建議指派 AI 執行具備設計系統約束的還原任務：

**指令範例**：「_AI 助教！請調用 Stitch MCP 解析我上傳的截圖。測量所有按鈕的圓角與陰影參數，並將其還原為 Vue 組件。注意：所有色碼必須映射至本專案規範的 **Tailwind Color Tokens**，嚴禁直接寫入色碼值。_」

透過此「逆向還原」流程，您可以實現從視覺靈感至代碼實作的一條龍產出，這正是 2026 前端工程師的終極型態。

---

👉 **[下一篇：邁向專業架構師的自我修養](./index.md)**
