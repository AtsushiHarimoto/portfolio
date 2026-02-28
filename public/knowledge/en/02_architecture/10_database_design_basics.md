# 10. Database & Storage Design

> **Type**: System architecture primer  
> **Focus**: Map the differences between relational (SQL) and non-relational (NoSQL) databases and explain Moyin’s heterogeneous storage strategy for text, media, and cache data.

---

## 1. Core storage choice: SQL vs NoSQL

Designing the database layer starts with selecting the right data model and enforcement level.

| Family | Characteristics | Where it shines for Moyin |
| :----- | :-------------- | :------------------------ |
| **Relational (SQL / RDBMS)**<br>(MySQL, PostgreSQL) | Schema-rigid storage: every table column and constraint is defined upfront. ACID transactions guarantee absolute consistency. | ✅ Ideal for financial flows and accounting systems where zero tolerance for inconsistency exists.<br>❌ A poor fit for AI-generated, unstructured payloads; migrating schemas at scale would become an engineering disaster, so Moyin does not lead with it initially. |
| **Non-relational (NoSQL)**<br>(MongoDB) | Document-oriented storage: nested BSON documents with highly variable structures live directly in collections without preset column definitions. | ✅ The mainstay for Moyin. Handles daily-changing story nodes, 50-layer dynamic skill tree character profiles, and other high-iteration AI artifacts with unmatched flexibility. |

> 💡 **Best Practice**: Microservices are not a silver bullet. The goal is to decouple a monolithic app into maintainable mini-projects that exchange data over clean RESTful or gRPC contracts.

---

## 2. In-memory cache

To decouple from slow disk I/O, every architecture needs a lightning-fast buffer layer.

- **Solution**: Redis (Remote Dictionary Server)  
- **Positioning**: An in-RAM key-value store operating at memory speed.  
- **Traits**: Reads and writes are orders of magnitude faster than SSDs, but volatility means data vanishes after power loss or restart unless explicitly persisted.

> ⚡ **Live usage**: We strictly limit Redis to “hot data” with acceptable loss, such as online session states, short-lived OTP/JWT tokens (5-minute TTL), and leaderboard caches. Its extreme I/O latency keeps user feedback at millisecond granularity.

---

## 3. Object storage service

Trying to shove multi-megabyte high-res images or lossless audio into MongoDB as Base64 strings would cause disk bloat and painful page faults.

- **Taboo**: Never store large BLOB media inside your document or relational databases.  
- **Solution**: Use distributed object stores like AWS S3 or an on-premise MinIO cluster.  
- **Topology**:  
  1. Upload a few-GB video or audio asset to MinIO.  
  2. Retrieve a signed URL (e.g., `https://s3.moyin.local/assets/char_123.mp3`).  
  3. Store that short URL string inside MongoDB’s player asset field and let the backend serve it from the CDN.  

This keeps frontend static assets lean while letting MinIO handle the heavy lifting.

---

## 4. Indexing magic

Once record counts hit the millions, full table scans stall CPUs and kill responsiveness.

- **Mechanism**: Creating an index on a hot field (e.g., `UserEmail`) builds a lightweight B-tree or hash structure, like a book’s index. The engine now jumps to the right page with O(log N) complexity.  
- **Cost**: Indexes speed reads but slow inserts/updates and eat disk space, so only index fields with heavy query traffic.

---

## ✅ Architecture acceptance checklist

Before contributing to backend work, confirm you understand heterogeneous storage and can instruct the AI with engineering rigor:

- [ ] “MongoDB (NoSQL) is our go-to store for long-form narrative text, numeric vaults, and ever-changing JSON configuration blobs.”  
- [ ] “I will leave multi-media binaries in object stores (S3/MinIO) and only persist CDN URLs in the database.”  
- [ ] “Redis’s job is high-frequency status cache and matching data that can tolerate eventual loss, not permanent storage.”  
- [ ] “I will ask the AI to create indexes on high-traffic fields like Email and UserID before shipping a new lookup column.”
