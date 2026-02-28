# 21. ブラウザAI：WebGPU、Wasm、フロントエンド上の計算 (Browser AI)

> **種類**: フロントエンドの計算資源とエッジコンピュート  
> **重点**: OpenAI 請求書を減らすため、ユーザーの GPU へ推論を移行するにはどうするか。WebAssembly、WebGPU、Transformers.js を接続し、ブラウザが神経網を直接走らせる手法を解説します。

---

## 序章：API 呼び出しの遅延とプライバシーコスト

従来の構成では：

1. ブラウザが大容量の画像／音声を Python サーバーへアップロード（3 秒）。  
2. サーバーが GPU を起動または課金 API（OpenAI）を叩いて推論。  
3. 結果を再度送る（さらに 1 秒）。  

この往復は遅くて高額、かつ秘匿データを外部へ持ち出す法規リスクがあります。Chrome 上で完結できたらどうでしょう？

---

## 1. WebAssembly（Wasm）：JS 拘束を破る

JavaScript は DOM 操作用。線形代数や行列を JS で計算すればタグは即クラッシュ。Wasm は C++/Rust/Go から `.wasm` バイナリを生成し、V8 がほぼネイティブ速度で実行します。サンドボックスで安全に動き、OpenCV／MediaPipe をパッケージしてブラウザ内で完結できます。

---

## 2. WebGPU：GPU の暴力的な計算力

Wasm で CPU を奪うだけでは足りず、AI は何千万もの乗算を同時にこなすために GPU のコア群を必要とします。WebGL はグラフィックスのためのものであり、データ計算に向いていません。WebGPU は compute shader を開放し、JavaScript から CUDA さながらの行列演算を呼べるようにします。

---

## 3. Transformers.js：前端から AI を呼ぶ

「私は Vue/React の人間で C++/シェーダーはわからない」――そんな声に応えるのが Hugging Face の Transformers.js です。ONNX 圧縮されたモデルをブラウザへダウンロード／キャッシュし、以下のようにたった数行で利用できます。

```javascript
import { pipeline, env } from "@xenova/transformers";
env.backends.onnx.wasm.numThreads = 1;

const classifier = await pipeline("sentiment-analysis");
const result = await classifier("このサイトが好きです！");
```

Whisper、映像認識や WebLLM による簡易対話などが、ネット無し・60FPS で端末上に展開されます。これこそエッジ AI です。

---

## 💡 Vibecoding 指示例

極低レイテンシかつサーバー費用ゼロのマルチメディアアプリを Claude/Cursor に命じるとき：

> 「このリアルタイム背景分離＋音声翻訳ツールは Vue 3 で構築し、メディアを WebSocket でサーバーへ送らないでください。Transformers.js を Web Worker で読み込み、ONNX モデルを UI を凍らせずバックグラウンドで展開してください。WebGPU を優先し、古い端末向けに Wasm をフォールバックとしてください。」
