# 30. Defending Against Traffic Tsunamis: API Rate Limiting Algorithms Revealed (Rate Limiting)

> **Type**: System Architecture Defense & Algorithms Primer
> **Focus**: Breaking the vulnerability of naive defensive thinking like "you can only poke 10 times per minute." Deeply exploring the ultimate weapons used by Stripe, AWS, and top industry Gateways (like Kong) to protect against malicious crawlers and sudden blizzards of traffic: **Token Bucket** and **Sliding Window** algorithms.

---

## Prelude: Why Are Simple "Counters" Vulnerable to a Single Blow?

When junior developers design rate-limiting mechanisms, they usually implement the **"Fixed Window Counter"** algorithm:

- **Logic**: Set a Key like `user_123_minute_01` in Redis with a maximum value of 10.
- **Operation**: +1 for every request; reject if it exceeds 10. In the next minute (`minute_02`), the counter resets to 0.

❌ **Fatal Flaw: Burst at Edge**
Hackers discovered the loophole in this mechanism. They send 10 requests at the very instant of `00:00:59` (just barely not blocked), then instantly send another 10 requests at `00:01:00`.
For the server, it endures 20 attacks within "a short span of one second"! This has already exceeded your originally expected load limit of 10. Your defense line is pierced just by them "exploiting the gap between two minutes."

To thoroughly solve burst traffic and edge loopholes, architects developed the following god-tier algorithms:

---

## 1. The Reservoir That Allows a Burst of Firepower: Token Bucket

This is the most famous and widely applied algorithm in the universe (Amazon and Stripe provide rate limiting based on it). Its strength lies in: **I normally restrict you, but I allow you to occasionally burst with anger.**

### 🪣 Operational Model

Imagine the system allocates a "Bucket" to each user.

1. **Capacity Limits**: The bucket can hold a maximum of 100 coins (Tokens). Anything exceeding this drops out of the bucket and is discarded.
2. **Fixed Refill Rate**: The system continuously throws coins into the bucket at a steady rate of "10 coins per second."
3. **Cost of Consumption**: Every time the user calls an API, they must "take away 1 coin" from the bucket. If the bucket is empty and they can't take one, the request directly returns `429 Too Many Requests`.

### 🏎️ Perfect Advantage: Burst-Friendly

If a user is usually well-behaved and takes no action for 5 seconds, their bucket accumulates 50 coins.
Suddenly, they press a heavy operation that concurrently calls the API 50 times. Because there are "50 coins in the bucket all at once," the system instantly lets these 50 connections pass! This is a smooth experience a fixed time window cannot achieve.
After they exhaust the coins, they once again fall back to the strict limit of "only poking 10 times per second."

_(Note: Similar to the Token Bucket is the "Leaky Bucket," which can enforce a smooth, constant outflow, often used to protect e-commerce databases from being crushed)._

---

## 2. The Precision Microscope That Shuts Down Edge Cases: Sliding Window

If you are operating a financial trading system and cannot allow even 1 "sudden burst," and you pursue **flawlessly smooth limits with no blind spots**, then please choose this mechanism.

### 📜 Sliding Window Log

Instead of maintaining a simple number, the "precise Timestamp" of each request is recorded within a `Sorted Set` in Redis.
When a new request arrives at `00:01:30`:

1. **Clean House**: Delete all old timestamps in the array from a minute ago (earlier than `00:00:30`).
2. **Headcount**: If the number of remaining timestamps is greater than the threshold, sorry, rejected. Otherwise, it is allowed to pass, and `00:01:30` is added to the array.
   ❌ **Drawback**: Under high concurrency, memory will explode on the spot from frantically recording the timestamp of every single passerby (Memory-Intensive).

### 🧠 Sliding Window Counter (The Ultimate Improved Version)

Combines the "memory saving" of the fixed window with the "blind-spot free" nature of the sliding log.
When the next request arrives at `00:01:30`, the system will:

1. Find the total volume of the "previous minute (00:00)" (say, 5 times).
2. Find the total volume "so far this minute (00:01)" (say, 3 times).
3. Use a **weighted ratio** to calculate the real traffic of the past 60 seconds:
   `Total of previous minute * (100% - the proportion of seconds already passed currently 50%) + Total of current minute` = `5 * 0.5 + 3 = 5.5 times`.
   Using simple middle school math, the edge burst is perfectly smoothed out, and the memory overhead approaches zero!

---

## 💡 Vibecoding Instructions

When using an AI Agent to set up any open-ingress Public API nodes, you must forcefully enact rate-limiting weapons:

> 🗣️ `"When setting up the Rate Limiter middleware for the external API in Express.js, you are strictly prohibited from using simple Redis INCR to implement a [Fixed Window Counter]. This would cause us to suffer OOM crashes under edge burst attacks. Please introduce a rate limiting package supporting the [Token Bucket] algorithm, and set the Bucket Capacity to 50 to accommodate a small amount of frontend concurrent request bursts!"`
