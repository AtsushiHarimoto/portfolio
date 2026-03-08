# 02. 武裝你的開發母艦：環境建置與極速部署實戰 (Environment Setup)

## @概覽

要開發現代化的 AI 專案，強大的 Runtime 與開發工具是不可或缺的基石。靠傳統的技術債與舊版套件無法驅動具備神經網絡的系統。本篇將引導您配置 Moyin 專案所需的「黃金工具鏈」，從前端極速編譯到後端 AI 推論層的依賴管理，建立一個穩定的開發沙盒環境。

---

## 1. 打造無懈可擊的地基：兩大陣營的核心套件 (Prerequisites)

為了避免「依賴地獄 (Dependency Hell)」，我們採用了業界最領先的效能管理工具：

### 🚄 ① 前端與閘道控制：Node.js & pnpm

前端生態系與 API 路由的核心引擎。

- **Node.js** (`v18.x` 或 `v22.x` 以上 LTS 版本)
  - **角色**：負責所有編譯、熱更新以及 Gateway API 路由的執行。
- **pnpm (Performant Node Package Manager)**
  - **角色**：高效能的套件管理器。採用硬連結 (Hard Link) 機制共享套件，極大節省磁碟空間與安裝時間。
  - **安裝**：在安裝 Node.js 後，執行 `npm i -g pnpm`。**強烈建議棄用傳統 `npm`** 以維持開發速度。

### 🌋 ② AI 運算與自動化：Python & uv

處理機器學習大模型、載入 PyTorch 與執行自動化腳本的魔法語言環境。

- **Python** (`3.10` 以上版本)
  - **角色**：AI 推論、影像生成與語音模型的依賴語言。
- **uv (極速 Python 依賴管理器)**
  - **角色**：採用 Rust 撰寫的極速套件工具。安裝動輒數百 MB 的 AI 套件時，其速度遠超傳統的 `pip`。
  - **安裝**：執行 `pip install uv`。這是管理 Moyin AI 服務複雜依賴的必備神裝。

---

## 2. 點火升空：本地服務啟動指南 (Local Startup)

完成環境配置後，依序執行以下指令以在本地啟動服務：

### 🔌 ① 啟動總機中樞：API 閘道器 (`moyin-gateway`)

```bash
cd projects/moyin-gateway
# Windows (PowerShell)
./run_game_api.ps1
# macOS / Linux
chmod +x run_game_api.sh && ./run_game_api.sh
```

### 🖥️ ② 點亮視覺界面：控制後台 (`moyin-web`)

開啟新的終端機，啟動基於 Vite 的高速開發服務：

```bash
cd projects/moyin-web
pnpm install
pnpm run dev
```

---

## 3. 常見的環境雷區與拆彈方案 (Common Issues)

- 💣 **Issue A：`Unsupported Engine` 錯誤**
  - **診斷**：您的 Node.js 版本過舊。請前往官網下載最新 LTS 版本並進行覆蓋安裝。
- 💣 **Issue B：路徑過長導致 `node_modules` 無法刪除**
  - **診斷**：Windows 對於過深的目錄層級處理不佳。請勿使用鼠標右鍵刪除，改在終端機執行 `npx rimraf node_modules` 進行強制銷毀。

---

## 💡 架構師的實務建議：AI 自我診斷

在 Vibecoding 的思維模式下，遇到環境報錯時，第一時間不應是手動調整環境變數，而是**將完整的 Error Stack Trace 餵給 AI 傭兵**。

讓 AI 利用其讀取能力診斷系統缺陷，並產出精準的修復腳本。您的目標是維持「總工程師」的視角，將繁瑣的依賴修復工作交給 AI 自動化處理，確保專案能隨時處於「Ready to Code」的狀態。

---

👉 **[下一篇：PowerShell 效率工具與捷徑](./03_powershell_alias_cheat_sheet.md)**
