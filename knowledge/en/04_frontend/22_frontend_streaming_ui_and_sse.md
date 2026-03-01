# 22. Streaming UI & SSE for the AI Age

> **Type**: Frontend LLM communication primer  
> **Focus**: Understand why token-by-token streaming is essential for autoregressive LLMs, and why SSE (Server-Sent Events) beats WebSocket for single-direction “typewriter” delivery.

---

## Prelude: the cruel latency of autoregressive models

Legacy APIs follow a request-response model: the client asks for a dataset, the server replies with a full array in half a second. GPT-4, however, is autoregressive—it produces one token at a time. A 1,000-word essay might take 15 seconds to finish. If you wait for the entire payload, the UI sits on a blank spinner for that whole window. Users assume the page is dead.

---

## 1. TTFT and streaming to save the experience

The secret is a new metric: Time-To-First-Token (TTFT). Humans calm down if the UI starts showing characters within ~0.5 seconds, even if the full answer still takes 15 seconds.

Streaming flips HTTP’s behavior. The backend no longer waits for the final token. As soon as the GPU produces `"The"`, it pushes that chunk through the network. Each subsequent token flows as soon as it is computed, and the frontend immediately appends it to the view.

---

## 2. Protocol warfare: why SSE outclasses WebSocket

| Protocol | Description & verdict | Why it falters for LLM streaming |
| :------- | :-------------------- | :------------------------------- |
| **WebSocket** | Full-duplex channel; requires connection management (e.g., Redis Pub/Sub). | Overkill. After asking an LLM, the client simply receives a stream—no need for a bidirectional pipe, and heavy WebSocket stacks don’t fit serverless deployments. |
| **SSE (Server-Sent Events)** | Single-direction HTTP stream using EventSource. | Perfect fit. Lightweight, firewall-friendly, and the foundation of Vercel/OpenAI streaming endpoints. |

Modern frameworks often implement this via `fetch` + `ReadableStream`—the spirit is the same.

---

## 3. Frontend byte hell: decoding and rendering

Receiving tokens is not enough. Challenges include:

1. **Chunked decoding** – Streams deliver `Uint8Array` chunks. Some UTF-8 characters split across packets, so the client must buffer and decode safely to avoid garbage output.  
2. **Partial Markdown** – LLMs emit tables and bold text. If you feed a half-built table to a naive Markdown parser, renderers break or the layout thrashes. Use streaming-friendly Markdown renderers that can gracefully handle incomplete input.

---

## 💡 Vibecoding directive

When commanding an AI engineer to build an LLM chat UI:

> “Do not block the UI with axios + await loops. Implement a streaming UI. Use native `fetch` + `ReadableStream` (or EventSource/SSE) to decode chunked UTF-8 into a reactive string. Guard the layout from thrashing by using a streaming-aware Markdown renderer before committing to the DOM.”
