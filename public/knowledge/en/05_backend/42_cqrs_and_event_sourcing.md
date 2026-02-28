# 42. Overthrowing the CRUD Hegemony: CQRS and Event Sourcing

> **Type**: Top-Tier Microservices Design Pattern
> **Focus**: When you discover that the conflict between database "reads" and "writes" drags system performance down, this architecture will completely subvert your understanding of databases. This chapter leads you to abandon ancient CRUD and enter the ultimate architecture being used even by financial-grade banks or massive ERP systems: **CQRS and Event Sourcing**.

---

## Prelude: Why Is CRUD Heading Towards Death?

From the first day we learned to write code, we were taught **CRUD (Create, Read, Update, Delete)**.
To update "Moyin's wallet balance," you just issue this sentence:
`UPDATE wallets SET balance = balance - 100 WHERE user_id = 1;`

When traffic is low, this is beautiful. But in an ultra-high-concurrency microservices cluster, the **fatal pain points** are as follows:

1. **Read/Write Blocking (Lock Contention)**: When the boss is fetching the "Super JOIN complex report of ten million in revenue for this month (Read)," it will lock down the database. This forces outside users buying items to queue up for "Write Payments," with the screen frantically spinning circles.
2. **Loss of Historical Truth (Loss of Intent)**: When the balance becomes `$500`, you have absolutely no idea what happened! Was a service fee deducted? Was it a system bug? Or did they buy something? **Because the `UPDATE` operation "Overwrites" and murders the historical crime scene.**

---

## 1. Going Their Separate Ways: CQRS (Command Query Responsibility Segregation)

To resolve the performance conflict between "Read" and "Write," elite architects proposed **CQRS**.
This ideology is highly extreme: **"Reads" and "Writes" must be forcibly separated, to the point where even the databases are physically separated!**

### ✍️ Command Side —— Responsible for "Writes"

- Exclusively handles operations that change state (like payments, posting articles).
- The backend relies on **Relational Databases** like MySQL, which heavily focus on ACID transactional security.
- It doesn't care about the performance of "reading" at all, as long as it ensures collision prevention and absolute correctness during writing.

### 👁️ Query Side —— Responsible for "Reads"

- Exclusively handles display for the screen (like checking balances, listing all articles).
- The backend swaps to **NoSQL databases** like Elasticsearch or Redis. The structure of these databases is deliberately designed as Views "tailor-made for the frontend screen." The frontend doesn't even have to JOIN; it grabs and prints it directly, at lightning speed!

**Here comes the problem: How do these two databases stay synchronized?**
The answer is through **Kafka or RabbitMQ**, utilizing **Asynchronous Events (Event Driven)** to throw the results written on the Command side over to the database on the Query side.

---

## 2. Only the Ledger, No Balance Column: Event Sourcing

To push CQRS to its absolute limits, an architect will directly delete the `balance` column inside MySQL altogether!

### 📜 All Changes Are an "Event"

In an Event Sourcing architecture, the system **never saves the "current state"; the system only saves the "flow of events that happened."**
The database (like EventStore DB or Kafka) from beginning to end only has this one long array (lighting-fast append-only writes, zero lock issues):

1. [Event] `UserCreated` (Moyin joined)
2. [Event] `MoneyDeposited` (Transferred in $1000)
3. [Event] `ItemPurchased` (Bought a sword, deducted $200)
4. [Event] `ItemPurchased` (Bought a shield, deducted $300)

### 🧮 Replaying the Crime Scene (Replay)

- **What if you want to check the balance?**
  "Replay" all the events in his life from the beginning to the end, adding and subtracting them once, and you get the balance of $500.
- **What if you want to trace a Bug?**
  It's too perfect! Because you have never used `UPDATE` to overwrite any data, any hacker tampering or system errors are nailed dead onto the pillar of shame within the event stream.
- **What if you want to add a new "Annual Spending Pie Chart" feature?**
  Traditional architectures have to start slowly collecting records from today. In Event Sourcing, you just take the old event array and "replay it all over again since the dawn of time, pouring it into a new MongoDB pie chart collection." A new feature deployed yesterday possesses 10 years of chart data today!

---

## 💡 Vibecoding Instructions

When commanding AI to refactor a core engine for you that involves financial transactions or strict auditing systems:

> 🗣️ `"When you are helping me design this [Account Funds General Ledger Microservice], stop writing UPDATE Entity models for me immediately! This is a desecration to the financial system. I request that you apply the [CQRS and Event Sourcing] design pattern. The writing end (Command) must transform the withdrawal action into an Immutable Event stream, and Append it into Kafka. Then, independent Workers will listen to these events to real-time sync (Project) the View Tables (Read Model) in our MySQL which are responsible for giving the frontend screens blazing-fast Queries!"`
