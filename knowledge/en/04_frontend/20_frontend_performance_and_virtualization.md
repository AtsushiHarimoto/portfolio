# 20. Performance & Virtualization: Saving the DOM and Impressing Google

> **Type**: Performance tuning & rendering physics  
> **Focus**: When you need to render 100,000 stock rows without crashing Chrome, use virtualization/windowing and dominate Google’s Core Web Vitals.

---

## Prelude: where does the browser break?

Many juniors think Vue/React’s Virtual DOM cures all ills. In reality, `v-for="item in 100000"` still creates 100,000 `<div>` nodes in the true DOM tree. Once you exceed ~1,500 nodes, repaint and reflow costs explode. Rolling the wheel through 100,000 items triggers massive paint events, drains memory/GPU, and the tab crashes.

---

## 1. Virtualization / windowing

When facing huge datasets, the trick is simple: **fake the scroll**.

### 🪟 Windowing with vue-virtual-scroller

1. **Fake scrollbar height** – assuming 100k items at 50px each, the component creates a 5 million px spacer so the scrollbar appears natural.  
2. **Render only ~20 items** – the DOM keeps only ~20 `<div>`s plus a small buffer.  
3. **Swap content on the fly** – when you scroll 1,000px to item 200, the framework reuses the 20 visible `<div>`s, assigns them data for indices 201-220, and applies `transform: translateY` to instantly reposition them.

Result: no matter how many rows, the browser only manages ~25 elements at a time, keeping complexity around O(1) and preventing crashes.

---

## 2. Core Web Vitals: Google’s judgment

Google embedded Web Vitals into SEO as of 2021. Fail them and your search ranking plummets.

### 🥇 LCP (Largest Contentful Paint)

- **Meaning**: Time until the hero content (hero image or biggest H1) appears.  
- **Threshold**: ≤ 2.5 seconds.  
- **Fix**: Avoid `background-image` hero graphics; instead, use `<img fetchpriority="high">` so the browser prioritizes fetching them from the CDN.

### 🏎️ INP (Interaction to Next Paint)

- **Successor to FID**.  
- **Meaning**: The longest interaction delay (e.g., clicking “Add to Cart”).  
- **Threshold**: ≤ 200ms for responsive feedback.  
- **Fix**: Prevent blocking the main thread with heavy `for` loops. Offload to Web Workers or rely on optimistic updates to trick the experience.

### 🌋 CLS (Cumulative Layout Shift)

- **Meaning**: Unexpected layout shifts (e.g., an ad loading and pushing content).  
- **Threshold**: cumulative score < 0.1.  
- **Fix**: Always reserve space for `<img>` by declaring width/height or using CSS ratio containers so placeholders hold the layout steady until images load.

---

## 💡 Vibecoding briefing tip

When asking AI to render an infinite admin list with SEO in mind:

> 🗣️ “Stop rendering 50,000 DOM nodes via `v-for`. Import `vue-virtual-scroller` or implement windowing yourself. Keep each `<li>` at 60px height for predictable transforms, and ensure the hero banner has explicit width/height placeholders to satisfy CLS.”
