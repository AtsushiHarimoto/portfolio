# 24. 深淵探照燈：系統可觀測性與集中式日誌 (Observability & Logging)

> **類型**: 系統維運與後端可觀測性科普
> **重點**: 當微服務叢集發生 500 錯誤，登入幾十台主機看 `console.log` 猶如在著火的稻草堆裡找一根針。本篇提煉自 ByteByteGo 與 GitHub 在高可用系統的實戰，確立以「可觀測性 (Observability) 三本柱」與「集中式日誌」為骨幹的維穩法則。

---

## 前言：盲人摸象與「可觀測性 (Observability)」的覺醒

如果你的伺服器平常只會輸出 `User login failed` 這種一行純文字，當某天凌晨三點系統大當機時，你絕對找不出是資料庫超載、Redis 快取擊穿，還是第三方 API 斷線。
現代雲原生系統要求從「被動監控 (Monitoring)」昇華為「主動可觀測性 (Observability)」。系統必須主動把內臟剖開給你看，幫助你回答三個終極問題：**「發生什麼事？」、「為什麼發生？」、「在哪個微服務發生的？」**

構成此探照燈的有三大本柱：**日誌 (Logs)、指標 (Metrics)、鏈路追蹤 (Traces)**。

---

## 1. 集中式日誌管理 (Centralized Logging)

在伺服器叢集中，將 Log 寫入虛擬機的實體硬碟 (如 `app.log`) 是極度愚蠢的行為。當 Kubernetes 發現這台機器掛掉並將其銷毀重啟時，這些珍貴的犯罪現場證據也跟著灰飛煙滅。

### 🪵 導入 ELK 堆疊或等效方案

業界標配是**將所有微服務的日誌，一滴不漏地抽送至「全域集中營」**。
例如著名的 ELK 堆疊：

- **Elasticsearch**: 負責作為 Log 的強大搜尋引擎與儲存池。
- **Logstash (或 Fluentd/Filebeat)**: 部署在各個微服務旁邊的無情抽水馬達，一有新日誌就送到 Elasticsearch。
- **Kibana**: 營運面板。當災難發生，工程師只需打開瀏覽器，輸入條件，瞬間就能將 50 台機器的出錯 Log 同時調閱出來。

### ⚙️ 結構化日誌 (Structured Logging) 的殘酷紀律

禁止輸出純文字 `console.log("Error loading user 123")`。
在機器人讀取的世界，請強制全體後端使用 **JSON 格式** 輸出結構化日誌。

```json
// 優秀的結構化日誌
{
  "timestamp": "2026-02-25T14:00:00Z",
  "level": "ERROR",
  "service": "PaymentGateway",
  "user_id": 123,
  "action": "load_user",
  "error_code": "DB_TIMEOUT",
  "message": "Connection to PostgreSQL took 5000ms"
}
```

只有具備欄位 (Key-Value)，大數據後台才能針對 `user_id = 123` 或是 `level = ERROR` 進行火速篩選彙整。

---

## 2. 鏈路追蹤：尋找微服務叢集裡的跨國連環殺手 (Distributed Tracing)

當一個使用者的 `POST /checkout` 請求，在背後觸發了：
`[入口網關 ➡️ 會員微服務 ➡️ 金流微服務 ➡️ 點數微服務]`
如果最終出錯，你怎麼知道這一連串日誌是屬於「同一個人的同一次點擊」？

### 🔗 關聯 ID (Correlation ID) 與 OpenTelemetry

所有 ByteByteGo 系統設計教材中的必考題：**每個 HTTP 請求進來的第一瞬間，立刻為他烙印一個獨一無二的 UUID 條碼 (Correlation ID 或 Trace ID)**。
當這個請求被轉發到下一個微服務時，這個 ID 必須塞在 HTTP Header 裡跟著旅行。
如此一來，在 ELK 搜尋這個唯一的 `Trace ID`，就能如看電影般，把這筆交易在所有微服務留下的死亡足跡，按時間軸精準拼湊出來。

---

## 3. 指標與黃金信號 (Metrics & Golden Signals)

日誌是「出事後」找原因用的，而「指標 (Metrics)」則是預防重於治療的警報器。它不是記錄「A 登入成功」，而是記錄「這 1 分鐘內有 1000 人嘗試登入」。
常見使用 Prometheus 捕捉，再丟給 Grafana 繪製出漂亮的心跳動態圖表。

GitHub 和 SRE (網站可靠性工程) 提倡監控四大 **黃金信號 (Golden Signals)**：

1. **延遲 (Latency)**：成功請求花多久？出錯請求掛多久？(必須看 p99 分位數，勿看沒有意義的平均值)。
2. **流量 (Traffic)**：吞吐量多猛？(每秒 HTTP 請求數 QPS)。
3. **錯誤 (Errors)**：500 錯誤的佔比是多少？
4. **飽和度 (Saturation)**：現在 CPU, RAM, 網路吞吐是否已經頂到肺了？

---

## 4. 日誌管理的致命紅線：機密與效能

- **絕不裸奔機密資訊**：將密碼、信用卡號、用戶身分證號打入 Log 是一場嚴重的資安災難，且已違反各大法規 (如 GDPR)。務必在框架底層設立「遮罩洗脫牆 (Redaction/Masking)」。
- **Log 是效能吸血鬼**：將所有微小細節設定為 `INFO` 甚至 `DEBUG` 在高併發正式環境下，會瞬間將硬碟 I/O 堵死。正式環境應設定為 `WARN` 或 `ERROR`，並善用動態配置開關。

---

## 💡 Vibecoding 工地監工發包訣竅

在使喚 AI 實作新的 API 路由或微服務框架時，千萬不能允許它偷懶：

> 🗣️ `「你在撰寫這個全新的支付路由時，禁止直接使用原生的 console.log！請你實作一個統一的 Logger 類別 (基於 Pino 或 Winston)，確保所有日誌都嚴格遵循 JSON 結構。同時，你必須在 Express/Fastify 的全域 Middleware 中實作 Trace ID 攔截器，確保上下游的所有連線日誌都被打上專屬 Correlation ID 關聯標籤，且絕不准讓使用者的 Token 或密碼明碼出現在輸出中！」`
