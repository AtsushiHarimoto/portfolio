# 37. 誰才是你？授權大亂鬥與 SSO 之鑰 (OAuth 2.0 / OIDC)

> **類型**: 系統架構級別的資安通訊協定
> **重點**: 破除業界最大的迷思：**「OAuth 2.0 根本不是用來登入的！」** 本篇深入解析當今全網際網路「使用 Google 登入」與企業辦公室「單一登入 (SSO)」背後，由 OAuth 2.0 與 OpenID Connect (OIDC) 交織而成的龐大授權帝國。

---

## 前言：不要把自家大門鑰匙交給第三方 App

十幾年前，如果你註冊了一個新的社群網站 (如早期的小遊戲網)，它會問你：「請輸入你的 Yahoo 信箱帳號密碼，我們幫你找出你聯絡人中有誰也在玩！」
這是極其恐怖的災難。你為了交一兩個朋友，把可以看你私密信件、甚至重設銀行密碼的「主祭司鑰匙」原封不動地交給了第三方！

為了解決這種 **「全有或全無」的密碼裸奔**，**OAuth 2.0 (開放授權協定)** 誕生了。

---

## 1. OAuth 2.0：發放一張有期限的「訪客通行證」

你必須死死記住這句話：**OAuth 2.0 處理的是「授權 (Authorization)」，它不負責「驗證你是誰 (Authentication)」**。

### 🎟️ 飯店的代客泊車小弟

當 Moyin App 想要獲得一小時存取你 Google 雲端硬碟的權限，它不會跟你要密碼。

1. Moyin App 把你轉導去 Google 的大門 (Authorization Server)。
2. Google 問你：「Moyin 這個傢伙想要『只能讀取』你的雲端硬碟。你同意嗎？」
3. 你按下同意，Google 隨即發給 Moyin 一張稱為 **`Access Token (存取權杖)`** 的「代客泊車磁卡」。
4. 拿著這張 Access Token，Moyin 就能在未來的幾個小時內，自由開走你的車（讀取檔案）。但 Moyin 絕對無法打開你的後車廂（讀取 Gmail 信件），因為這張磁卡的權限 (Scope) 被死死咬定了。

**盲點來了**：這張 `Access Token` 很多時候就像一把實體感應扣，它上面**「根本沒有印你的名字或大頭照」**！Moyin 開走了你的車，但它只知道「我有權限開車」，它連正在伺候的老闆(你)叫什麼名字、Email 是多少都不知道！

---

## 2. 戴上身分證明：OpenID Connect (OIDC) 降臨

既然 OAuth 2.0 只是代客泊車的授權牌，那現在全天下網站上的【使用 Google 登入 (Sign in with Google)】按鈕，到底是怎麼知道我叫什麼名字的？

這依賴於一個**建構在 OAuth 2.0 之上的「補丁協定」**，名為 **OpenID Connect (OIDC)**。

### 🆔 附加上去的身分證 (ID Token)

OIDC 巧妙地利用了 OAuth 2.0 的流程，只是它在 Google 發送那張 `Access Token` 的同時，強制 Google **「必須多塞一張名為 `ID Token` 的有照片身分證給你！」**。
這張 `ID Token` 全天下統一規定，長相就是大家最熟悉的 **JWT (JSON Web Token)**！

- Moyin App 把這串 JWT 拆開一看，裡面清清楚楚寫著 (Claims)：
  - `sub`: "87654321" (這傢伙的宇宙唯一編號)
  - `name`: "Atsushi Harimoto"
  - `email`: "atsushi@example.com"
  - `iss`: "https://accounts.google.com" (這張身分證是玉皇大帝 Google 核發的，絕對保真！)

Moyin 開心地把你的名字印在網頁右上角，並在自家資料庫建檔。這才是現代「第三方登入」的完整真相！

---

## 3. 全知全能的全域通行證：SSO (單一登入)

當企業內部擁有 50 個不同的內部系統 (請假系統、報帳系統、開會系統) 時，員工每天上班輸入 50 次帳號密碼會徹底崩潰。

**SSO (Single Sign-On，單一登入)** 是一種架構概念：「只要在一個首腦系統登入過，所有的分公司大樓都自動為你敞開大門」。
在現代，這套魔法多半是由 OIDC 協定搭配中心的「身分提供者 (IdP, Identity Provider) 如 Auth0, Okta 或是微軟的 Azure AD」來實現。

### 🏰 跨國護照的運作 (Central Authentication)

當你第一天上班打開「請假系統 `a.com`」：

1. `a.com` 發現你不認識，立刻把你踢回給總部的「警衛室 `idp.company.com`」。
2. 警衛室要求你輸入帳號密碼，並發給你一張存放在 `idp.company.com` 網域底下的 Cookie (總部簽證)。
3. 警衛室把你送回 `a.com`，並在你的口袋裡塞了一張 `ID Token (JWT)`。
   下午，你打開了另一個網域的「報帳系統 `b.com`」：
4. `b.com` 也不認識你！再度把你踢回給「警衛室 `idp.company.com`」。
5. 奇蹟發生了！警衛室看到你身上已經有早上發的「總部簽證 Cookie」，它連問都不問，**「一秒內直接發給你另一張新的 ID Token」並把你強行彈回 `b.com`！**
   在你的視角裡，你只是點開了新網頁，畫面閃了一下，你就直接「無密碼登入」了報帳系統。這就是跨網域 SSO 的偉大航線！

---

## 💡 Vibecoding 工地監工發包訣竅

在使喚 AI 為企業甚至 B2C 網站架設安全無虞的認證關卡時，請展示您的領域深度：

> 🗣️ `「你在撰寫這個 Moyin 後台管理面板的驗證層時，不要自己從頭手刻資料庫對撞密碼盤！我們將全面導入【SSO 單一登入架構】。請直接為我介接 Auth0 或是 Keycloak 作為我們的 IdP (身份提供者)。並確保在前端框架 (Vue/React) 中完整實作基於 PKCE 擴展屬性的【OAuth 2.0 授權碼流程 (Authorization Code Flow)】，以榨取含有我們員工 Email 等 Claims 角色的【OIDC 規範 ID Token (JWT 格式)】來建立其本地會話 (Session)！」`
