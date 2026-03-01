# 20. Database Technology Selection: SQL vs NoSQL

> **Type**: Backend storage primer  
> **Focus**: Analyze SQL’s transactional rigor, the four NoSQL archetypes, and apply the CAP theorem as a decision framework.

---

## 1. Relational SQL: the consistency garden

Relational databases rest on set theory and algebra.

- **ACID guarantees**: Atomicity, Consistency, Isolation, Durability protect cross-account transfers from mid-flight inconsistencies.  
- **Strict schema**: Every table enforces column types and constraints. Post-deployment schema migrations carry risk and downtime.

### When to choose SQL

1. Core finance systems where data errors are intolerable.  
2. Business logic that depends on real-time joins across massive tables, where SQL optimizers still lead the field.

---

## 2. NoSQL: the polymorphic data city

NoSQL is four heterogeneous families, each solving extreme load patterns:

### ① Document stores (MongoDB)

- **Pattern**: Store schema-less JSON/BSON blobs.  
- **Moyin usage**: The primary datastore for narrative branches, NPC state, and dynamic skill trees—rapid iteration without schema fights.

### ② Key-value stores (Redis)

- **Pattern**: Minimal `Key -> Value` map resident in volatile RAM.  
- **Use cases**: High-throughput cache for sessions, global leaderboards, and rate limiters.

### ③ Wide-column stores (Cassandra, HBase)

- **Pattern**: Columnar encoding optimized for write-heavy workloads.  
- **Use cases**: Real-time GPS ingestion from millions of drivers or astronomical-scale behavioral logs.

### ④ Graph databases (Neo4j)

- **Pattern**: Nodes and edges optimized for graph traversals.  
- **Use cases**: Social-network propagation and fraud detection within multi-hop connections.

---

## 3. The strict law of distributed systems: the CAP theorem

In a clustered system, you must accept that you cannot simultaneously deliver:

- **C – Consistency**: Every node shows the same up-to-date value.  
- **A – Availability**: Every request gets a timely response (even if stale).  
- **P – Partition tolerance**: The system survives network splits.

When partitions occur (and they do), you can pick either:

- **CP systems (MongoDB, HBase)**: Reject requests during split to keep data consistent, sacrificing availability.  
- **AP systems (Cassandra, DynamoDB)**: Accept writes during split, risking divergent views until the network heals (eventual consistency).

---

## ✅ Decision-making checklist

When giving AI the task of wiring storage, spell out the constraints:

- [ ] “Core payment flows demand PostgreSQL-backed relations plus Redis caching to protect concurrent transactions.”  
- [ ] “LLM-generated JSON with volatile properties should land in MongoDB to exploit document-model elasticity.”
