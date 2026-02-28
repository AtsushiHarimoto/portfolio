# 19. State & Micro-Frontends: Tectonic Shifts and Recomposition

> **Type**: Plus-scale SPA architecture  
> **Focus**: End the era of stuffing everything into a single global store. Clarify client vs server state and show how micro-frontends let diverse teams ship React and Vue in the same shell.

---

## Preface: the Redux apocalypse

Early engineers crammed sidebar toggles and ten thousand order records into one global Vuex/Redux store, causing:

1. **Stale data** – Orders were snapshots of yesterday’s DB state, so refunds never reflected reality.  
2. **Spaghetti code** – A sidebar toggle tripped the entire store, touching thousands of cached orders and annihilating performance.

---

## 1. Draw the line: client state vs server state

### 📱 Client state

- Short-lived interaction data that lives purely in the browser.  
- Examples: theme mode, modals, filter selections for a high-speed rail search.  
- Keep it in `ref/reactive`, lightweight Pinia/Zustand stores, or component state; losing it on refresh is acceptable.

### ☁️ Server state

- Owned by databases, subject to remote mutations by other users; frontend merely reads and displays.  
- Examples: inventory counts, bank balances.  
- Use data-fetching tools like TanStack Query (Vue Query) / SWR instead of shoving API responses back into Pinia. These libraries maintain their own cache pool:
  - **Auto revalidation**: When the window regains focus, it silently refetches stock levels.  
  - **Prefetch**: Hovering over “Next Page” triggers a 200ms head start download so the next page appears instantly.  
  - **Optimistic UI**: Clicking “favorite” instantly turns the heart red; if the server response fails, it quietly resets to gray.

---

## 2. Micro-frontends: resolving team collisions

When a five-person shop becomes fifty, a monolithic Vue repo and 10-minute Webpack builds become unbearable. A buggy feature can break the entire deployment.

### 🧩 Module Federation as Lego

Inspired by microservices, micro-frontends break the UI into self-contained pieces.  
- Team A owns the homepage (Vue 3).  
- Team B owns checkout (legacy React 16).

Thanks to Webpack 5 Module Federation or Single-SPA:

- **Independent deployments**: Checkout team ships a single bundle and CDN-hosted module, deploying in seconds.  
- **Runtime composition**: The browser shell downloads Team A’s and Team B’s bundles from different CDNs and stitches them into one seamless page.

Note: Micro-frontends maximize decoupling but introduce challenges like global CSS leakage and multiple runtime bundles, so they are best suited for large internal dashboards.

---

## 💡 Vibecoding directives

When AI crafts order/customer systems, forbid it from pushing server data into Pinia:

> 🗣️ “While building the orders + review system, do not stash axios results into a Pinia global store via `useEffect`/`watch`. Those are **server state** fields. Instead, rely on `@tanstack/vue-query` for caching, stale-while-revalidate, and optimistic updates. Keep Pinia for lightweight client state such as theme toggles.”
