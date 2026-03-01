# 23. Generative UI & the Vercel AI SDK

> **Type**: AI-native frontend architecture  
> **Focus**: Move beyond text responses. Vercel AI SDK 3.0 and React Server Components empower LLMs to render interactive UI cards—so a flight booking request can instantly spawn a dynamic ticket component instead of another chat message.

---

## The problem: text-trapped LLMs

Chatbots have long answered with text: “Here’s the JL802 flight to Tokyo at $5,000. Confirm?” The user still needs to type “Confirm.” Modern UX demands more—LLMs should render a rich card with a map, weather, and a “Confirm Purchase” button directly inside the chat.

---

## 1. The Vercel magic stack

Previously you hacked regexes to parse `<widget>` tokens. Vercel AI SDK replaces that with two breakthroughs:

### Tool/Function Calling  
We supply the model with a “cheat sheet” describing functions like `render_flight_ticket(destination, price)`. Instead of verbose text, the LLM returns a precise JSON tool call.

### React Server Components  
Next.js/Node intercept the JSON, and Vercel’s `streamUI` engine renders a `<FlightTicket>` component server-side. The serialized React Server Component streams to the browser and materializes as a fully interactive card—complete with event handlers—inside the chat UI.

---

## 2. Welcome to Generative UI

This is not a text bot anymore; it is a one-second app writer.

- **Click-to-action**: The ticket card ships with a red “Pay” button wired to your payment API. Users tap once instead of typing “Pay.”  
- **Rich streaming**: The model can still speak in human prose while simultaneously streaming a React UI payload, creating an immersive hybrid experience.

Vue 3 ecosystems are following suit via wrappers or JSON state intercepts to render dynamic components from LLM tool events.

---

## 💡 Vibecoding directive

When building a revenue-grade conversational agent:

> “Do not deliver plain text. Embrace Generative UI. Define Tool Calling contracts so the LLM returns structured JSON. When a tool stream arrives, mount a Vue component card inside the chat bubble with actionable buttons. Let the user complete business flows directly inside the conversation.”
