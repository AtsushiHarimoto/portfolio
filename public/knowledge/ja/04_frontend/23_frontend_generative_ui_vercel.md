# 23. 生成式 UI と Vercel AI SDK (Generative UI)

> **種類**: AI ネイティブ・フロントエンド  
> **重点**: テキスト応答を超えて、Vercel AI SDK 3.0 と React Server Components で LLM にインタラクティブな UI カードを描かせる方法を解説します。

---

## 問題：LLM がテキストに囚われていた

従来のチャットボットは「東京行き JL802、$5,000 です。確認しますか？」と返すだけ。画面上で「確認」をタップするUXに移行するには、LLM に地図や天気、決済ボタンを含むカードをその場でレンダリングさせる必要があります。

---

## 1. Vercel の魔法の構成

以前は `<widget>` のような独自タグを正規表現で抜き出して UI を組み立てていましたが、Vercel AI SDK は以下の 2 つの進化でその作業を廃しました。

### Tool/Function Calling
モデルに `render_flight_ticket(destination, price)` のような関数リスト（Tool Contract）を渡し、テキストではなく JSON 形式のツール呼び出しを返してもらいます。

### React Server Components
Next.js/Node が JSON を受け取ると、`streamUI` エンジンが `<FlightTicket>` をサーバーでレンダリングし、React Server Component をストリーム化してチャット画面へ送り込む。ユーザーはクリック可能な UI がそのまま生成されるのを目の当たりにします。

---

## 2. Generative UI 体験

これはテキストボットではなく、瞬時にアプリを構築する“万能エンジニア”です。

- **Click-to-Action**：カードの「支払い」ボタンには実際の `onClick` が紐づいており、1 タップで決済 API が呼ばれる。  
- **豊かなストリーミング**：モデルは人間らしいテキストと合わせて React カードを吐き出し、コンテンツを重ねて表示します。

Vue 3 でも同等の体験を、JSON state を拾って動的コンポーネントへ変換するラッパーや仕組みで再現し始めています。

---

## 💡 Vibecoding 指示文例

ビジネス行為を支えるインテリジェントな会話 AI を依頼するとき：

> 「単なるテキスト応答は NG。Generative UI 思考で取り組んでください。Tool Calling 契約を定義し、LLM がストリームとして返す JSON に反応して、チャット気泡内へ操作可能な Vue コンポーネントカードを即座にマウントしてください。」
