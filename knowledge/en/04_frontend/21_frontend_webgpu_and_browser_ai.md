# 21. Browser AI: WebGPU, Wasm, and Frontend Compute

> **Type**: Frontend compute and edge science  
> **Focus**: Avoid endless OpenAI bills by offloading inference to the user’s GPU. Explore WebAssembly for C++/Rust performance, WebGPU for modern compute shaders, and Transformers.js for shipping LLMs client-side.

---

## Preface: the latency and privacy tax of API calls

Traditionally, a “portrait cutout” or “speech-to-text” feature looks like this:

1. Upload a multi-megabyte asset from the browser to a Python server (3+ seconds).  
2. The server spins up costly GPU or calls pay-per-use OpenAI.  
3. Send the result back (another second).  

The loop is slow, expensive, and violates privacy governance because sensitive audio/image data leaves the device. What if Chrome could handle it locally?

---

## 1. WebAssembly (Wasm): freeing compute from JS

JavaScript is designed for DOM work, not matrix-heavy inference. Pure JS will crash Chrome the moment you try C++‑level vision math.

### The browser’s second language

WebAssembly lets you compile C++, Rust, or Go down to `.wasm` binaries that V8 executes near-native speed. The code runs sandboxed and cross-platform, so you can drop a heavyweight library like OpenCV into the browser without hitting the backend anymore.

---

## 2. WebGPU: brute-force GPU access

Wasm harnesses the CPU; deep learning needs the GPU’s thousands of cores. WebGL was never designed for this. WebGPU, co-created by Apple/Google/Microsoft, exposes compute shaders and lets your webpage call the same kind of kernels that CUDA uses.

WebGPU APIs deliver orders-of-magnitude more power, so your JavaScript can drive matrix multiplications with desktop‑grade force directly in the browser.

---

## 3. Transformers.js: the glue for frontend neural engines

You don’t need to write C++ or shader programs. Hugging Face’s open-source Transformers.js wraps everything. It downloads ONNX‑compressed models into the browser, and you just write familiar JavaScript:

```javascript
import { pipeline, env } from "@xenova/transformers";
env.backends.onnx.wasm.numThreads = 1;

const classifier = await pipeline("sentiment-analysis");
const result = await classifier("I love this site!");
```

Whisper‑style ASR, vision models, or miniature chatbots now run offline at 60 FPS—even without a network connection.

---

## 💡 Vibecoding directive

When asking Claude/Cursor for a zero-latency multimodal utility:

> “Build this real-time background removal + speech transcription tool entirely in Vue 3. Do not stream media over WebSocket to the server. Load Transformers.js within a Web Worker so ONNX model downloads never freeze the UI, prefer WebGPU acceleration, and fall back to Wasm on older devices.”
