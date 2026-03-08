# The Monolith Collapses and Reforms: Server State Cache and Micro-Frontends (State & Micro-Frontends)

## @Overview

Hello, I'm AKIRA.
Today, let's talk about what happens when a frontend project bloats from something small and cute into a "boulder monster" with hundreds of thousands of lines of code.

Have you ever seen code like this: a True/False variable tracking whether the sidebar is open, and an array with 10,000 orders fetched by an API, both forcibly crammed into the same global state management library (like Vuex or early Redux)? Today we'll break the dark-age myth of "put everything in Redux," and look at how big tech companies use "Micro-Frontends" to piece together different teams.

---

## 1. Drawing the Line: Server State vs. Client State

Frontend developers used to have an obsession: stuff every piece of data into the global Store. This causes epic disasters: just toggling the sidebar triggers the global engine to scan all 10,000 orders for changes (due to the monitoring mechanism), instantly killing performance. And those 10,000 orders are from "yesterday"—users stare at stale data without knowing.

Modern senior architects draw a strict line in their minds:

### 📱 Client State

- **What is it?** Purely browser-local "one-time, temporary" interaction data.
- **Examples**: Is it dark mode or light? Is the modal open? You just selected "Tokyo → Osaka" in the dropdown.
- **Where does it live?** Just in Vue's own `ref/reactive`. Only move it to something like super-lightweight `Pinia` or `Zustand` if it needs to be shared across multiple components. No problem if F5 refresh wipes these settings.

### ☁️ Server State

- **What is it?** Remember this: **the ownership of this data belongs to the "remote database"!** The frontend is just "taking a peek." You have no right to change it arbitrarily, and it could be changed by someone else remotely at any time.
- **Examples**: The latest stock count of a product, your account balance.
- **Industry Savior (TanStack Query / SWR)**: We no longer manually write API requests and shove them into Pinia. The industry has universally migrated to data-fetching specialists like `vue-query`.

This library builds a super-smart buffer pool under the hood:

- **Automatic Background Refresh**: Switch to check LINE, then switch back to the browser (Window Focus)—it immediately fetches the product inventory in the background and refreshes to the latest.
- **Brutal Prefetch**: Your mouse cursor "barely touches" the next page button—you haven't even clicked yet—and it's already fetching the next page's list 200ms ahead. This is why you see those elite websites from overseas where page transitions feel like magic.
- **Optimistic UI Updates**: When you tap the like button on an article, it doesn't wait for the server to return "OK, saved." It "pretends it already succeeded" and instantly turns the heart red. If a second later it discovers the connection failed, it quietly reverts to gray. This is the secret behind Facebook's smooth experience.

---

## 2. The Ultimate Military Strategy for Eliminating Team Conflicts: Micro-Frontends

When your company grows big and frontend engineers expand from 5 to 50, everyone fights inside the same gigantic Vue repository (Monorepo). Team A changes the chat button on the homepage, and suddenly Team B's checkout cart fails to build site-wide. Just waiting for Webpack to compile takes 10 minutes—how can anyone work?

### 🧩 Lego Theory and Module Federation

So frontend architecture stole the backend concept of "Microservices" and created **"Micro-Frontend Architecture."**

It allows:

- Team A owns the **[Homepage]**, writing it in the latest Vue 3.
- Team B owns the **[Checkout System]**, stuck with old React 16 due to legacy reasons.

Through Webpack 5's **Module Federation** black magic, or the **Single-SPA** framework, a miracle happens:

1.  **Deploy Independently**: Team B fixes a React bug today. Without touching Team A, they compile just "the checkout section" and deploy to CDN, done in five seconds.
2.  **Perfect Seamless Integration**: When a user opens the homepage, their browser dynamically fetches Team A's Vue module from the network in real-time, then fetches Team B's React module too. On the same screen, they're seamlessly assembled as if by a miracle—users have no idea a completely different framework powers different parts of the page!

---

## 💡 Vibecoding Pro-Tip: Commanding Your AI

The next time you see an AI or junior colleague writing fat architecture that shoves thousands of API records into Pinia, deliver them a wake-up call:

> 🗣️ `"Stop! This customer order data is sacred and inviolable [Server State]! It is absolutely forbidden to use raw axios with watch to shove it into global Pinia! Immediately introduce [@tanstack/vue-query]! I want its built-in background auto-invalidation and re-fetching (Stale-while-revalidate), caching mechanisms, and Optimistic UI magic. Pinia is reserved only for trivial local things like dark mode toggling!"`

Only by separating local state from server cache will your system's maintenance stop feeling like defusing a time bomb.

---

👉 **[Next Step: Frontend Performance & Virtual Lists](./20_frontend_performance_and_virtualization.md)**
