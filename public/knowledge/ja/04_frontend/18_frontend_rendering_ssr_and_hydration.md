# 18. レンダリングの物理学：CSR vs SSR と Hydration

> **種類**: フロントエンド構成とレンダリング戦略  
> **重点**: 白画面や SEO 失効を避けるために、Node.js を再び導入する理由。CSR / SSR / SSG の原理と、静的 HTML を動的化する Hydration の仕組みを解説します。

---

## 前書き：空っぽの `<div>` に何も起きない

かつては PHP や Java で商品情報を含む HTML を出力し、ユーザーと検索エンジンに即座に見せていました。しかし React / Vue / Angular の時代になると、**CSR (Client-Side Rendering)** が十年近くの標準となります。

---

## 1. CSR (Client-Side Rendering)

### ⚙️ JS が万能、HTML は死ぬ

CSR では `moyin.com` にアクセスすると以下のような空殻しか届きません：

```html
<html>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

`bundle.js` をダウンロード・実行するまで、画面には何も表示されません。

### ☠️ CSR の致命傷

1. **白画面**：2MB ものバンドルを取得し、スマホの CPU で DOM を構築するまで数秒かかる。FCP が崩壊します。  
2. **SEO 死**：クローラーは JS の実行を待たず、空の `<div>` を見てコンテンツなしと判定します。

そのためレンダリングをサーバーへ委ねるアプローチが必要になりました。

---

## 2. SSR & SSG：サーバーが再登場

端末が 2MB も処理できないなら、Node.js / Vercel が代わりに計算すればいい。

### 🚀 SSR (Server-Side Rendering)

Next.js や Nuxt.js が流行した理由：

1. リクエストが Node.js サーバーに到達  
2. サーバーが API を呼び出し、Vue/React のロジックをサーバーで実行し、商品や画像を含んだ完全な HTML を組み立てる  
3. ユーザーの端末は即座にキレイなページを表示し、SEO も満足する

### 📦 SSG (Static Site Generation)

ドキュメントや頻繁に変わらないブログは、ビルド時に静的化します：

- `npm run build` がすべてのページをプレレンダリングして純粋な HTML を生成  
- CDN に配置し、訪問者はサーバー計算なしでミリ秒以内に受け取れる

---

## 3. Hydration：死体に命を吹き込む

> 「SSR なら PHP と何が違うの？」  
> 静的 HTML に動的な魂（イベントとリアクティビティ）を与える作業が Hydration です。

SSR が返すのは文字が詰まった HTML ですが、ボタンはまだ死んでいます。クリックしても何も起きません。

### 💧 Hydration の流れ

ブラウザは HTML を描画した後、静かに `bundle.js` をダウンロードします。Vue/React が起動すると DOM を探索し、

- 「このボタンはカート CTA だ。`onClick` をつなごう」
- 「この数字は価格。双方向バインディングをつけよう」

静的 DOM にイベントリスナーとステートを復活させ、SPA に戻すことを **Hydration (水合)** と呼びます。

Hydration は CPU を大量に消費するため、Astro や Qwik のような **Resumability / Islands Architecture** では、インタラクションが必要なパーツだけ局所 Hydra を実行します。

---

## 💡 Vibecoding での指示例

マーケティング用ランディングページを AI に頼むときは、レンダリング戦略を明確に伝えます。

> 🗣️「この Moyin ホームページのランディングは純粋な CSR ではなく、Nuxt 3 を基盤に SSR または SSG を選択してください。複雑なコンポーネントは Lazy Hydration で処理し、Google Lighthouse の LCP/TBT 評価を満たしてください。」
