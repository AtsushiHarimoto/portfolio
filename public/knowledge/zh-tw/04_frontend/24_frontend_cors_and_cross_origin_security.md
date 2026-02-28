# 24. 守護網頁的阿茲卡班：CORS 跨域資源共用與非法存取防禦

> **類型**: 前端與後端交界的網際網路安全物理學
> **重點**: 每個前端工程師生平遭遇的第一個地獄級 Error：「CORS 錯誤」。本章將撕穿 CORS 阻擋你存取 API 的神話，釐清誰才是真正的受害者，以及如何正確設置白名單來防止非法跨域與 CSRF 駭客攻擊。

---

## 前言：為什麼我的 API 在 Postman 可以打，在 Chrome 卻死掉？

無數新手前端在寫 `fetch("https://api.github.com/...")` 時，按下 F12 會看到一片怵目驚心的紅字：
`Access to fetch at '...' from origin '...' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

然後新手就會拿著這行紅字去問後端：「你的 API 壞了！」
後端冷笑一聲，打開 Postman 送出同一個網址：「哪有壞？我的 Postman 拿得到資料啊！是你前端有 Bug 吧？」

**真相是：兩邊都沒有壞。這一切都是 Chrome 瀏覽器設下的「保護級結界」。**

---

## 1. 原罪：同源政策 (Same-Origin Policy, SOP)

網際網路有一個極端古老且死板的規矩：**「A 網域的網頁，絕對不准偷看 B 網域 API 回傳的資料。」**
(同源的標準極為嚴苛：協議 `http/https`、網域 `moyin.com`、通訊埠 `443`，這三個只要有一個字不一樣，就是跨域！)

- **如果沒有這條規矩會怎樣？**
  你想想，當你在逛駭客寫的惡意網站 `hacker.com` 時，駭客在背景寫了一支簡單的 JavaScript：
  `fetch("https://bank.com/api/my_balance")`。
  因為你的瀏覽器早就登入過 `bank.com` 且帶有登入的 Cookie。如果沒有同源政策，駭客的腳本就能毫不費力地**把你的銀行餘額全部偷抽走展示在他的網頁上！**

瀏覽器 (Chrome/Edge) 為了保護你的銀行資料，它在駭客要偷看 `bank.com` 回傳的資料時，像保鑣一樣把這份資料「死死捏在手裡不給駭客看」，並在 F12 噴出 CORS 錯誤。
**請記住：CORS 錯誤是在保護「使用者 (客戶端)」不被惡意網站釣魚，而不是在保護伺服器！伺服器早就把資料丟出來了，是被 Chrome 攔截了！**

---

## 2. 跨越結界的簽證：CORS (跨來源資源共用)

但現代開發中，前端架在 `www.moyin.com`，後端 API 架在 `api.moyin.com`，這依然是跨域！我們總不能連自己人都不給看吧？
這時就需要靠後端工程師發放「CORS 簽證」。

### 🛑 前置請求：探路的 OPTIONS 封包 (Preflight)

當前端打算送一個具有攻擊性 (例如帶有 JSON 或是 Authorization Token) 的 `POST` 請求到 `api.moyin.com` 前。
Chrome 瀏覽器會自己偷偷先發送一個名為 `OPTIONS` 的幽靈 HTTP 請求去問 API：
_「嗨！我目前在 `www.moyin.com`，請問等一下我可以對你發 `POST` 嗎？」_

### 🎫 後端的通關密語 (Headers)

後端的 API 伺服器 (如 Nginx 或 Node.js) 必須回應這個 `OPTIONS`，並帶上以下 HTTP Headers：

- `Access-Control-Allow-Origin: https://www.moyin.com` (只准這個網址來找我！)
- `Access-Control-Allow-Methods: GET, POST, OPTIONS` (准許的方法)

Chrome 收到這張簽證，核對網址相符，才會正式放出真正的 `POST` 請求去拿你的資料！

---

## 3. 防禦非法跨域存取的最佳實踐

初級的後端工程師為了貪圖方便，會寫出這種毀滅性的 CORS：

```http
Access-Control-Allow-Origin: *
# (萬用字元：全宇宙的網站都可以來我這偷資料！)
```

**如果這是個有會員登入系統的 API，這等同於自家金庫大門完全敞開。**

### 🛡️ 滴水不漏的防禦矩陣

1. **嚴苛的白名單陣列**：後端程式碼必須設立一個 `ALLOWED_ORIGINS = ['https://moyin.com', 'https://admin.moyin.com']`。如果請求進來的源頭不在陣列內，直接給與 `HTTP 403 Forbidden` 的無情打擊。
2. **禁止攜帶信用卡 (Credentials)**：除非萬不得已，千萬不要輕易開啟 `Access-Control-Allow-Credentials: true`。這會允許外部網站發送 API 時「主動帶上使用者在你家登入過的 Cookie」。這是防範 **CSRF (跨站請求偽造)** 攻擊的最後防線。
3. **SameSite Cookie 終極封鎖**：如果你使用 Cookie 存 JWT，請務必將 Cookie 屬性設為 `SameSite=Strict` 或 `Lax`。這樣一來，只要是從別人網站發出的 API 請求，瀏覽器絕對不會夾帶你的登入 Cookie 過去，從物理上根絕了跨域攻擊。

---

## 💡 Vibecoding 工地監工發包訣竅

在使喚 AI 幫您架設後端 API 的 Gateway 或 Middleware 時，必須嚴厲指出 CORS 的安全底線：

> 🗣️ `「你在幫我設定這組 Express / FastAPI 的後端 CORS 中介軟體 (Middleware) 時，請嚴厲禁止寫出 Access-Control-Allow-Origin: * 這種垃圾代碼！請建立嚴謹的 CORS 配置邏輯，利用正規表達式或陣列白名單機制，只允許來自我們正式網域與 Vercel 預覽網域 (Preview Deployments) 的前端來存取。並確保針對 OPTIONS 預檢請求給出最小權限的 Allow-Methods 與 Headers，絕不能因為貪圖前端開發方便而犧牲了整個域的安全性！」`
