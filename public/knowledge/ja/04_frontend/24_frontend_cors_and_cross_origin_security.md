# 24. CORS とクロスオリジンの防御 (CORS & Cross-Origin Security)

> **種類**: フロントエンド／バックエンドのセキュリティ基礎  
> **重点**: CORS エラーは API が壊れているわけではなく、ブラウザがユーザーを守っている。Same-Origin Policy、プリフライト OPTIONS、ホワイトリストによる CSRF/資格情報漏洩対策を解説します。

---

## 前書き：Postman では動くのに Chrome がブロックする理由

ブラウザから `fetch("https://api.moyin.com")` を送ると、CORS ポリシーによりブロックされる。しかし Postman は問題なく応答を取得できる。サーバーは正常。Chrome が Same-Origin Policy（SOP）でユーザーを守っているのです。

---

## 1. SOP の檻

ブラウザはプロトコル + ホスト + ポートが一致しない限り、異なるオリジンのレスポンスを読ませない。`hacker.com` が `https://bank.com/api/balance` を叩いて、あなたのクッキーを利用して残高を表示したら恐ろしい。SOP はその状況を遮断し、CORS エラーを出します。これはサーバーではなく**クライアント保護**なのです。

---

## 2. CORS のビザ発行

`www.moyin.com` から `api.moyin.com` にアクセスする場合は、バックエンドがビザを発行しなければなりません。

### OPTIONS プリフライト

Chrome は危険なリクエスト（JSON/Authorization を含む POST）を送る前に OPTIONS を送り、「私は `www.moyin.com` からですが、POST を送っていいですか？」と尋ねます。

### 返すべきヘッダ

API は以下を返す必要があります：

- `Access-Control-Allow-Origin: https://www.moyin.com`  
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`

Chrome が origin を確認すると、実際の POST を通します。

---

## 3. 強固な防衛

次のような設定は危険です：

```http
Access-Control-Allow-Origin: *
```

これはすべてのサイトに金庫を丸裸にするようなものです。

### セキュリティマトリクス

1. **厳格なホワイトリスト**：`ALLOWED_ORIGINS = ['https://moyin.com','https://admin.moyin.com']` を定義し、対象外は `403 Forbidden`。  
2. **Credentials を無効化**：`Access-Control-Allow-Credentials: true` は極力使わない。これを有効化すると他サイトが Cookie を含めてリクエスト送信でき、CSRF の温床になります。  
3. **SameSite Cookie**：認証用 Cookie に `SameSite=Strict` / `Lax` を設定し、他サイトから Cookie が送られないようにすることで物理的に攻撃を防ぎます。

---

## 💡 Vibecoding 指示例

AI に Gateway/Middleware の CORS 設定を任せるときは：

> 「`Access-Control-Allow-Origin: *` などの雑な実装は禁止。正規表現や配列を使った厳密なホワイトリストを構成し、自社ドメインと Vercel プレビューのみ許可して。OPTIONS には最小限の Allow-Methods/Headers を返し、便利さのためにドメイン全開放してはいけない。」
