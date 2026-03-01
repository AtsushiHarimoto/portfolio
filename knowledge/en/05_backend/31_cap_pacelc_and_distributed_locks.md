# 31. Trials of the Distributed Gods: CAP Theorem, PACELC, and Raft Consensus (Distributed Physics)

> **Type**: Distributed System Physical Laws & Underlying Theories Primer
> **Focus**: Architects are not omnipotent; in server clusters scattered across different countries, we must learn to **compromise**. This article reveals the most ruthless iron laws in the distributed computing world: the CAP and PACELC theorems. It also explores how the Raft algorithm saves the world through voting (Leader Election) when a cluster faces "split-brain" and loses its leader.

---

## Prelude: Irreversible Physical Limits

When there is only one database, things are perfect: a write is a write, a read is a read, it is guaranteed to always be correct, and the service will not stop.
But once we scale the database to 3 machines (A, B, C) to handle millions of users, the moment the fiber optic cable disconnects, these three machines can no longer communicate. At this time, the **physical limits of God** will harshly sanction our handwritten code.

---

## 1. The Cruel Choice of Two out of Three: CAP Theorem

The theory of distributed storage systems (Brewer's Theorem) points out that any clustered database can simultaneously satisfy a maximum of **two** of the following three conditions:

1. **C (Consistency)**: Whether a client connects to A or B, they **will always read the most recently written data**. (You cannot see 100 gold coins while I see 0).
2. **A (Availability)**: No matter how many machines break down, **the system remains alive and immediately gives you a response** (even if it gives you old data, it is absolutely forbidden to report a Timeout error and crash).
3. **P (Partition Tolerance)**: When the network between server room A and server room B is severed, and they cannot communicate with each other, **the system can still operate independently**.

🔥 **Iron Law: P is an inescapable destiny!**
On the internet, network disconnections will happen sooner or later. Therefore, an architect can only make a painful choice between **C or A** when a network disconnection occurs:

| Architecture Choice                     | Mindset when facing network disconnection                                                                                                                                                                                                          | Representative Databases / Application Scenarios                                                                                                                                                              |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CP Mode**<br>(Guaranteed Consistency) | **"Rather than giving you incorrect data, I'd prefer to crash and report an error!"**<br>Since it cannot connect to reconcile, to prevent double deduction, the system directly locks the nodes and refuses service, sacrificing availability.     | **Financial Banks / MongoDB (Strong Consistency) / Zookeeper**.<br>Transfer transactions absolutely do not allow a single cent of error.                                                                      |
| **AP Mode**<br>(Guaranteed Alive)       | **"Although this might be old data, just make do with it for now!"**<br>The system continues to operate, A and B accept modifications separately, and wait until the day the network is repaired to slowly merge conflicts (Eventual Consistency). | **Social Media / Cassandra DynamoDB**.<br>Facebook posts: even if you see your friend's new post a few minutes later, no one will die, but you absolutely cannot tolerate a completely blank Facebook screen! |

---

## 2. Compromising When the Network Isn't Broken: PACELC Theorem

The CAP theorem only takes effect when the network is disconnected. What about when the network is perfectly fine? The PACELC theorem expanded on this:
"If there is a Partition (P), you must choose between A and C; **Else (E)**, when the network is normal, you still have to choose between **Latency (L) and Consistency (C)**."

If you want strong consistency (C), you must wait for all 3 machines to slowly overwrite and confirm before reporting success, and the price is **extremely high Latency (L)**! If you pursue a god-like response of a few milliseconds, you can only accept weak Eventual Consistency.

---

## 3. Facing a Headless Cluster: Raft Consensus Algorithm and Distributed Locks

Suppose you have 5 servers; yesterday the Master (Leader) died, who among the remaining ones becomes the boss? Or when multiple microservices simultaneously try to grab the exact same train ticket (**Distributed Lock**), who has the final say?

This must rely on the world-renowned **Raft Consensus Algorithm** (this is the hardcore logic most beloved in advanced architecture interviews, replacing the extremely difficult to understand Paxos). Raft breaks mathematical problems down into three actions:

1. **Leader Election**:
   After losing the Leader, the subordinate slave nodes (Followers) will wait for a random number of milliseconds. Whoever wakes up first raises their hand to become a "Candidate" and broadcasts asking everyone to vote for them. **The one who gets more than half of the votes (Quorum) ascends to the throne.**
2. **Log Replication**:
   When a player wants to write data, the only way is to tell the omnipotent boss (Leader). The Leader will send this log entry to all subordinate slaves. Only when **more than half report the copying is complete** does the Leader dare to "Commit (permanently brand)" this log entry. This is the rigorous defense line of the CP architecture.
3. **Safety (Anti-counterfeiting)**: Guarantees that any slave who has fallen behind the times and has incomplete logs will absolutely never be able to become the boss in the next general election, thereby avoiding chaos.

_(Note: If the famous cache Redis wants to establish bulletproof distributed locks, it does not use Raft, but uses its own probabilistic algorithm called **Redlock** to attempt to achieve safe locking across multiple independent masters)._

---

## 💡 Vibecoding Instructions

When bossing around the system design AI facing the selection of underlying databases, this vocabulary will determine whether your system can withstand the pressure:

> 🗣️ `"For the inventory settlement of this flash sale module, we absolutely cannot tolerate any overselling. Therefore, in architectural selection, please lean completely towards the CP (Consistency & Partition Tolerance) camp! When multiple microservices concurrently deduct inventory, please introduce a Distributed Lock mechanism based on ZooKeeper or etcd (which employ the extremely strong consistency Raft theory underneath) to ensure global mutually exclusive access!"`
