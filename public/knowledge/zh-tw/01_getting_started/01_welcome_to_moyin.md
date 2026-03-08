# 01. Moyin 專案概觀：Vibecoding 革命下的系統佈防 (Welcome to Moyin)

## @概覽

Moyin 專案不僅是一個全端應用程式，它是基於 2026 年開發典範轉移——「**Vibecoding (氛圍編程 / 詠唱開發)**」所構建的 AI 原生專案。在這樣的架構下，開發者從程式碼的搬運工轉變為「架構決策者」與「AI 代理人領航員」。本篇將揭開專案的核心結構，解析前端、中台閘道與後端 AI 計算層如何交織運作。

---

## 1. 專案核心心臟：三大架構層級 (System Architecture)

為了實現極致的模組化與擴展性，專案在根目錄 `projects/` 下將業務邏輯明確劃分為三個層級，嚴格執行權責分離：

### 🏪 ① 互動與展示層 (Frontend / UI)

負責產生沉浸式體驗與管理界面。

- **moyin-game-v1**：玩家端的主程式，採用 Vue 3 與 Vite 構建的視覺小說引擎。
- **moyin-web**：營運端後台，負責內容上架與系統監控。
- **技術棧**：Vue 3, TypeScript, TailwindCSS, Vite。

### ☎️ ② 萬能閘道與中台 (Middleware & APIs)

作為 UI 與重度計算資源之間的防火牆與傳話筒。

- **moyin-gateway**：核心 API 路由閘道，管理流量分流、身份驗證與非同步任務佇列。
- **moyin-mcp-server**：採用 **Model Context Protocol (MCP)** 協議，是讓外部 AI 能聽懂並精準控制專案特有指令的「萬能轉接頭」。

### 🏭 ③ AI 服務與重計算工廠 (AI Services & Compute)

處理最耗費 GPU 資源的運算任務，通常位於系統最深處。

- **moyin-comfyUI**：基於節點流的影像生成引擎，負責產出高品質的視覺素材。
- **index-tts / GPT-SoVITS**：本地語音克隆與文字轉語音引擎，賦予角色獨一無二的聲線。
- **運行環境**：以 Python 為主，並依賴 CUDA 加速的 GPU 計算基礎設施。

---

## 2. 統御一切的大腦：知識庫系統 (Knowledge Base)

位於 `workspace/knowledge/` 的文件體系是專案的靈魂。在 Vibecoding 時代，文檔即是「防禦陣列」，用以規範 AI 的生成行為。

- **開發鐵律 (SOP)**：目錄 `02` 至 `05` 定義了前後端開發的設計模式與規範。這是為了「馴服 AI」，防止其產生具備誤導性的邏輯或技術債。
- **自動化工作流**：目錄 `09_workflows` 定義了從 Bug 修復到自動化測試的標準流程，讓 AI 能依循文檔進行自律開發。

---

## 💡 架構師的實務洞察：Vibecoding 工作流

在 Vibecoding 的開發模式下，您的角色已經晉升為「總建築師」。當 AI 執行任務遇到瓶頸時，最有效的解決方式不是親自下場寫 Code，而是**指引 AI 調用其工具查閱 `workspace/knowledge/` 中的開發範式**。

讓 AI 自己學會讀說明書並從中提取實施邏輯，是實現大規模高效開發、維持系統健壯性的唯一路徑。

---

👉 **[下一篇：開發環境搭建](./02_environment_setup.md)**
