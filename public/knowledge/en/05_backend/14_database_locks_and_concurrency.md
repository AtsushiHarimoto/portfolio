# 14. Concurrency, Overselling, and Database Locks

> **Type**: Systems & transaction fundamentals  
> **Focus**: Explain how race conditions during peak concurrency trigger overselling, then walk through pessimistic locks, optimistic locks, and transactional atomicity for relational/NoSQL stores.

---

## 1. Race conditions: the oversell nightmare

Single-threaded unit tests never reveal the carnage of a flash sale. Picture Moyin selling a rare SSR voice pack with **only one unit** available. Alpha and Beta hit the checkout API within the same microsecond.

- Alpha reads the stock row and sees “1 remaining.”  
- Beta—just a few nanoseconds later—also reads “1 remaining.”  
- Alpha decrements the count to 0 and grants the item.  
- Beta does the same, oblivious that the database already acknowledged Alpha’s update.

The result: the single collectible has now been delivered to two players. In e-commerce this is called **overselling** or **double spending**—a single misstep can bankrupt a legitimate business overnight.

---

## 2. Locking mechanisms: the defensive arsenal

Databases evolved locks to stop this destruction. Choose between two philosophies based on how much blocking you can tolerate.

### 🛑 Pessimistic locking – brute-force queuing

Assume the world is hostile. When Alpha issues a `SELECT` on the inventory row, the database slams an exclusive lock on that record. Beta hits the same row and is blocked, waiting in queue until Alpha finishes the entire purchase and releases the lock. At that point Beta sees a stock of 0 and fails safely.

**Pros**: Guarantees correctness; banks run on this.  
**Cons**: Performance plummets, latency rises, and deadlocks become a real threat.

### 🤝 Optimistic locking – versioned validation

Assume collaborators behave. Both Alpha and Beta read `[stock: 1, version: v1]`. Alpha applies its update referencing v1, and the database promotes the row to v2. When Beta tries to write with v1, the DB rejects it due to a version conflict, forcing Beta to retry or decline.

**Pros**: Ultra low blocking; perfect for read-heavy workloads (90% reads, 10% writes).  
MongoDB, as used by Moyin, relies on similar document-level revision numbers to keep concurrency agile.

---

## 3. Transactions: the atomic shield

Beyond oversells, systems dread partial failures. Consider charging 100 credits (module A) and granting a weapon (module B). If the process crashes after A but before B, the player loses coins without receiving the item.

Transactions enforce **atomicity**—all enclosed operations either commit together or roll back. If any step fails, the database rewinds every change (rollback), restoring the pre-transaction state so wallets and inventories remain consistent.

---

## 💡 Vibecoding directive

When delegating money-plus-inventory flows to AI:

> “Wrap these updates in a database transaction and enforce optimistic concurrency control via a version column. Do not let the bot emit raw UPDATEs that ignore the revision number—if a concurrent modification occurs, respond with a conflict and trigger a retry or user-facing error instead of allowing an oversell.”
