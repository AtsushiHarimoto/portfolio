# SL4. YouTube Creator — 教學影片自動化製作工廠

> 對應代碼庫：`workspace/youtube-creator/`
> 頻道：@moyin-factory | 狀態：連載中（EP01-02 已發佈）

## 一句話介紹
這是一個基於 Remotion 與 ComfyUI 的 AI/ML 科普教學影片自動化製作工廠，涵蓋從腳本、配音、動畫合成到最終上傳的端到端產線。

## 用途與背景
- **頻道定位**：製作並發佈 AI 與機器學習相關的科普教學影片。
- **虛擬主持人**：由擁有「溫柔犀利、善用生活比喻」性格的虛擬主持人 Mobis 擔綱講解。
- **發行策略**：採用三語發行（日文旁白 + 繁體中文 + 英文字幕），最大化知識傳播的受眾覆蓋率。
- **固定配置**：
  - **幀率與解析度**：30 FPS，1920×1080 
  - **BGM**：Mixkit "Deep Urban"（音量 15%）
  - **TTS 語音**：日文（`ja-JP-NanamiNeural`，語速 +5%）；中文（語速 +5%）；英文（語速 +0%）
  - **YouTube 分類**：28 (Science & Technology)

## 技術架構

### 技術棧

| 層級 | 技術 | 用途 |
|------|------|------|
| **視覺合成** | Remotion 4 (React 18/TypeScript) | 場景編排、文字動畫、時間軸控制 |
| **角色動畫** | FantasyTalking / ComfyUI-WanVideoWrapper | 說話角色生成、唇形同步、動態背景 |
| **AI 資產生成** | ComfyUI (SDXL) + MuseTalk + BiRefNet | 背景圖合成、影片去背處理、精準唇語同步 |
| **語音合成** | Edge TTS (Microsoft) | 三語音頻配音 (JP/ZH/EN) |
| **工具鏈** | Python + FFmpeg + Pillow | TTS 生成、時間軸計算、字幕處理、音頻混音、封面生成 |
| **發佈** | YouTube Data API v3 | 自動化影片上傳與元數據配置 |

### 目錄結構（集數化管理）
```text
youtube-creator/
├── README.md / CLAUDE.md        # 專案總覽與開發規範
├── ep01/                        # ✅ 已發佈：AIに500万字の小説を書かせてみた
│   └── remotion_video/          # Remotion 4（6 場景，5:20，12 個交付物）
├── ep02/                        # ✅ 已發佈：AIに全部コーディングさせてみた
│   └── remotion_video/          # 7 場景（Claude/Codex/Antigravity 三個 AI 對話）
├── ep03/                        # 🔨 製作中：ChatGPT＝文字予測マシン？
│   ├── docs/plans/              # ComfyUI 管線設計與規劃文檔
│   ├── comfyui_pipeline/        # ComfyUI 工作流與節點配置
│   └── remotion_video/          # Remotion 專案 + 15 個 Python 工具腳本（3,404 行代碼）
├── ep04/ ep05/                  # 📋 準備中
└── output/                      # 測試交付物與最終渲染輸出
```

## 標準製作管線

影片的自動化產出遵循以下標準工作流：

`script.md` (腳本定稿) 
➔ `generate-tts.py` (生成各語種配音) 
➔ `rebuild-timeline.py` (分析語音長度計算場景時間軸) 
➔ **更新 `constants.ts`** (注入時間軸至 Remotion) 
➔ `npm run preview` (本地預覽畫面對位) 
➔ **ComfyUI 產線** (生成背景、角色動態等視覺資產) 
➔ `npm run render` (Remotion 渲染合成預覽版影片) 
➔ `generate-srt.py` (生成多語字幕) 
➔ `merge-audio-tracks.py` (旁白與 BGM 音軌混合) 
➔ `create-thumbnail.py` (自動生成影片封面) 
➔ **YouTube 上傳** (發佈影片與字幕)

## EP03 進階管線（ComfyUI 動畫）

自 EP03 起引入動態說話角色與生成式背影，視覺管線擴展為 5 個階段：

1. **Phase 0 (環境建置)**：安裝 ComfyUI-WanVideoWrapper、FantasyTalking 及 BiRefNet 模型。
2. **Phase 1 (資產生成)**：使用 Wan 2.2 T2V 生成背景（5 個場景），並透過 FantasyTalking 處理角色說話動畫（共 47 段）。
3. **Phase 2 (角色去背)**：使用 BiRefNet 將有背景的角色影片提取為 RGBA 透明去背的 PNG 序列。
4. **Phase 3 (生成圖解)**：利用 matplotlib 自動生成 CNN / Transformer / LLM 架構與教學圖示。
5. **Phase 4 (最終合成)**：透過 FFmpeg 將去背角色、動態背景與 Remotion 導出的字幕動畫進行疊加燒錄。

## 集數進度表

| EP | 標題 | 狀態 | 影片長度 | 核心技術亮點 |
|----|------|------|---------|-------------|
| 01 | AIに500万字の小説を書かせてみた | ✅ 已發佈 | 5:20 | Remotion 場景編排，基礎時間軸自動化 |
| 02 | AIに全部コーディングさせてみた | ✅ 已發佈 | 4:32 | 三個 AI 角色聯機對話互動畫面設計 |
| 03 | ChatGPT＝文字予測マシン？ | 🔨 製作中 | 預計 5:20 | 動態角色動畫、複雜圖解代碼自生成 |
| 04 | (待決定) | 📋 準備中 | — | — |
| 05 | (待決定) | 📋 準備中 | — | — |

## Python 工具腳本索引

核心 Python 工具主要集中於 `ep03` 目錄中，負責串接整條管線（共 15 個腳本）：

- **語音與時間軸處理**
  - `generate-tts-{ja,zh,en}.py`：三語 TTS 語音生成。
  - `rebuild-timeline.py`：根據生成音訊讀取長度，重建 Remotion 場景時間軸。
  - `merge-audio-tracks.py`：多語言音軌與 BGM 混合。
  - `amplitude-analysis.py`：音頻振幅分析（用於關聯動畫特效）。
- **ComfyUI 與 AI 動畫**
  - `comfyui_client.py`：ComfyUI REST API 封裝工具。
  - `comfyui_animate.py`：觸發 FantasyTalking 節點生成。
  - `musetalk_inference.py`：MuseTalk 唇形同步（支援 GPU 安全版與 Lazy Import）。
  - `rembg-characters.py`：調用 BiRefNet 進行角色影片去背。
- **後製與發行**
  - `generate-srt.py`：時間軸對齊與 SRT 字幕生成。
  - `create-thumbnail.py`：自動拼貼與生成 YouTube 封面圖。

## GPU 注意事項

- **VRAM 競爭衝突**：MuseTalk 推理強依賴 CUDA，為防止 OOM，`musetalk_inference.py` 必須使用 **lazy import** 策略動態載入模型。
- **執行時序**：MuseTalk 與 ComfyUI 會嚴重的搶佔顯存，兩者**絕對不能同時啟動**，須於工作流中嚴格依序排程執行。

## 相關專案
- `projects/moyin-comfyUI/` — ComfyUI 服務中樞（處理所有底層圖像與影片生成）
- `projects/index-tts/` / `projects/asmr-tts/` — 測試中的音頻實驗室，為未來語音擬真度的升級路徑
- `projects/remotion-factory/` — 交易 Bot 專案使用同套 Remotion 框架衍生出的另一條短片/影片產線
