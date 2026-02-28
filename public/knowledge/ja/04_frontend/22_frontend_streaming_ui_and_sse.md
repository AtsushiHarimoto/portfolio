# 22. ストリーミング UI と SSE：AI 時代の通信 (Streaming UI)

> **種類**: LLM とフロントエンドの通信パターン  
> **重点**: 自己回帰モデルはトークンを一つずつ生成するため、なぜストリーミングが必須か。そして SSE（Server-Sent Events）が双方向 WebSocket より適している理由を解説します。

---

## 前書き：LLM の残酷な待ち時間

通常の API はリクエスト→レスポンスで一気にデータを返す。しかし GPT-4 のような LLM は自己回帰で、1000 単語の文章を完成させるには 15 秒かかる。その間、従来の HTTP で待っていたら UI は何も表示せず、ユーザーはページが固まったと誤認します。

---

## 1. 初トークン時間（TTFT）とストリーミング

Time-To-First-Token（TTFT）を達成するため、サーバーは最初のトークン `"The"` を算出した瞬間からデータを送る。前端は受信したら即座に画面へ追加し、15 秒の間もまるでタイピングしているように見せます。

---

## 2. SSE はなぜ WebSocket より軽いか

| プロトコル | 特性と結論 | LLM ストリーミングに向かない理由 |
| :--------- | :--------- | :---------------------------- |
| **WebSocket** | 双方向で常時接続。Redis Pub/Sub を使って接続管理が必要。 | LLM とのやり取りは一方向のみ。双方向は無駄で、Serverless 環境では運用が重くなります。 |
| **SSE**（Server-Sent Events） | EventSource ベースの一方向 HTTP ストリーム。 | 軽量でファイアウォールにも通る。Vercel AI SDK や OpenAI の Streaming API も SSE がベース。 |

React/Next などでは、`fetch` + `ReadableStream` で同じ精神を再現します。

---

## 3. バイト単位の大地獄：デコードとレンダリング

LLM の各 token は chunk で届くので：

1. **UTF-8 戻し**：`Uint8Array` の途中で漢字が切れるため、バッファして正しく結合する必要があります。  
2. **Markdown の中途半端な構文**：テーブルや装飾が途中で止まると単純な `marked.js` ではクラッシュする。インクリメンタルレンダリングに対応した Markdown パーサーを選び、DOM への描画を安定させましょう。

---

## 💡 Vibecoding の指示テンプレ

大語言モデルのチャット UI を依頼するとき：

> 「axios + await で UI を塞がないでください。Streaming UI を実装し、`fetch` + `ReadableStream`（または EventSource / SSE）で chunk を UTF-8 へデコードして ref へ繋ぎ、Markdown レンダラーが未完成のタグで暴走しないよう配慮してください。」
