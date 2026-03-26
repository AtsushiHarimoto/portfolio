# SL2. Trading Bot — 動能交易機器人

> 對應代碼庫：`workspace/stock/trading-bot/`
> 狀態：規範完成，實現中 | 類型：獨立業務系統（Standalone）

## 一句話介紹
基於 Minervini 風格與狀態機架構的美股 EOD 自動化動能交易系統。

## 用途與背景
Trading Bot 是一個專為美股收盤後（EOD, End of Day）設計的自動化動能交易系統，其核心策略深度借鑒 Minervini 的趨勢追蹤（Trend Following）與 VCP 形態學理論。系統旨在捕捉並持有處於「第二階段（Stage 2）」上漲趨勢中的超級強勢股。

商業動機在於消除主觀交易中的情緒干擾，並將繁瑣的盤後市場數據掃描、進出場信號過濾及風險控管流程徹底自動化。透過嚴謹的狀態機驅動架構，系統能系統化地管理包含資金分配、停損設定、獲利了結等完整的交易生命週期。

作為一個獨立運作的業務系統，Trading Bot 直接串接 Interactive Brokers (IBKR) 以自動化執行真實訂單，同時配備 Web Dashboard 供投資者全局監控持倉狀態、市場制度健康度及各項策略信號，實現高效、科學的量化交易管理。

## 技術架構

### 技術棧

| 領域 | 技術與框架 |
| :--- | :--- |
| **後端核心** | Python 3.12+ 搭配 FastAPI, SQLAlchemy, APScheduler |
| **前端介面** | React + TypeScript (Web Dashboard) |
| **資料庫** | SQLite（開發環境） → PostgreSQL（生產環境） |
| **數據與算法** | pandas, numpy, TA-Lib |
| **券商整合** | Interactive Brokers (IBKR) API via `ib_insync` |
| **架構模式** | 狀態機驅動架構 (State-machine driven) |

### 目錄結構

```text
stock/
├── trading-bot/           # 主實現專案
│   ├── momentum_trader/   # 核心應用模組
│   │   ├── main.py        # FastAPI 應用程式入口
│   │   ├── adapters/      # 外部數據適配器 (IBKR / FMP 等資料源)
│   │   ├── api/           # REST API 路由控制器
│   │   ├── engine/        # 五大核心交易引擎的具體實現
│   │   ├── domain/        # 領域模型與業務實體
│   │   └── frontend/      # React Dashboard 儀表板
│   ├── 03_spec/           # 規範文件目錄（FRD、TSD 等文檔）
│   └── 04_present/        # 演講簡報與展示資料
├── trading-bot-design/    # 設計子倉庫（唯讀，存放手動維護的指標與設計文件）
└── learn/                 # 策略研究、回測與學習資源
```

### 五大核心引擎

**1. Market Timing & Signal Engine（市場時機與信號引擎）**
負責追蹤整體市場制度與市況健康度。核心職責包含計算與識別後續日（FTD）、分布日（Distribution Days）累積狀況，及進行大盤移動平均線（MA）分析，以動態決定當期系統的曝險比例與資金水位。

**2. Stock Screening & Selection（選股與篩選引擎）**
負責在全市場中海選潛在標的。初期利用 Stage 2 趨勢條件進行基礎過濾，篩出處於上漲趨勢的股票，接著應用獨創的 DRIVE(S) 框架針對基本面與技術面進行多維度評分與排序，產出高勝率的候選清單。

**3. Entry & Order Execution（進場與下單引擎）**
主導下單前的最終把關與執行操作。首先檢核風險門禁（Risk Gates），避免在不利市況下重倉；接著利用波動率或固定風險演算法計算具體部位大小（Position Sizing），最後將生成的訂單交由 API 路由至券商端執行。

**4. Position Management & Exit（持倉管理與出場引擎）**
動態照護已建倉的部位。實作嚴苛的出局邏輯以保護資本，包含追蹤及上移停損防線（Stop-Loss Ladder）、到達預期盈虧比時的動態獲利了結（Profit Taking）機制，以及針對盤整無動能標的的強制時間停損（Time Stops）。

**5. Risk Management（風險管控引擎）**
作為最高層級的安全鎖，負責系統級別的資金控管與保護。即時監控帳戶總體狀態，包含限制全局最大市場敞口（Max Exposure）、控制最大資金回撤（Max Drawdown），並進行持倉標的間的板塊相關性（Correlation）檢測以避免風險過度集中。

## EOD 批處理時序

| 時間 (美東 ET) | 階段任務 | 執行內容與操作 |
| :--- | :--- | :--- |
| **16:00** | 收市後處理 | 吸收當日最新日線 K 棒數據，更新市場制度狀態；執行核心篩選引擎產出次日關注清單；計算並更新既有持倉的管理與退出條件。 |
| **09:00** | 盤前準備 | 根據前日運算結果，向券商 API 提交盤前指令與排隊訂單，準備迎接開盤執行。 |
| **10:00** | 開盤後確認 | 於開盤後進行帳戶的全面對帳；更新並確認實際持倉狀況與訂單成交回報。 |

## 重要規範

1. **`trading-bot-design/` 子倉庫唯讀限制**：該子倉庫內的策略與指標文件完全依賴**人工維護與更新**。為避免覆蓋既定商業邏輯，AI 助手（包括 Claude）**絕對禁止**以任何方式 (包含 git push) 修改或生成該倉庫內的指標文件內容。
2. **開發與生產一致性**：開發期間使用 SQLite 作為狀態持久化層以求輕量，進入生產環境後需確保無縫切換至 PostgreSQL，以支持歷史紀錄與高併發寫入。
3. **API 容錯與狀態處理**：由於高度依賴 `ib_insync` 與 IBKR，必須妥善處理斷線重連、API 限流（Rate Limiting）及孤兒訂單（Orphaned Orders）問題。

## 相關文檔
- `workspace/stock/trading-bot/03_spec/` — FRD（功能需求文檔）、TSD（技術規範文檔）、系統架構圖
- `workspace/stock/trading-bot/04_present/` — 系統概述、五大核心引擎說明簡報
