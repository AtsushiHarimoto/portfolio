# 39. A Song of Ice and Fire: Hot and Cold Data Storage Tiering (Data Tiering)

> **Type**: Big Data Storage Architecture & Database Cost Control
> **Focus**: Data is like fresh milk; it has a shelf life. If you mix ten-year-old reports that no one looks at with the current 100,000 orders per second into the same highly-paid "memory cluster," the company will definitely go bankrupt. This chapter explores how to build **Automatic Layered Freezing (Hot/Warm/Cold Storage Tiering)** to achieve a perfect balance between extreme performance and extreme stinginess.

---

## Prelude: You Can't Buy SSDs to Use as Warehouses

When many startups first get funding, in pursuit of "speed," they stuff all their data into AWS's most expensive EBS Solid State Drives (SSDs), and even massively build Redis memory clusters.
A year later, this company's AWS bill skyrockets from five hundred US dollars a month to two hundred thousand US dollars a month.

**Because they made the most fatal mistake: They didn't perform Data Temperature Tiering**.
On a 5-year-old e-commerce site, 95% of users will only query orders from the "last 30 days." Spending exorbitant amounts of money to store "failed order records from Double 11 three years ago" on millisecond-access SSDs isn't called technology; it's called squandering.

---

## 1. Defining Temperatures: Hot, Warm, Cold

Architects must transform into actuaries and ruthlessly classify the data flowing into the system:

### 🔥 Hot Data

- **Definition**: Data that needs to be read and written frequently right now, immediately, at this very second.
- **Example**: Today's latest news, items in a user's shopping cart, current real-time stock quotes.
- **Armory**: Placed in the most expensive locations. Redis (Memory), high-end SSDs, NVMe. Access time is required to be between a few milliseconds to tens of milliseconds. The capacity of this tier is usually the smallest (occupying 5% of total data) but burns 50% of the budget.

### 🌤️ Warm Data

- **Definition**: Consulted occasionally. Although it doesn't need to pop up in under a millisecond, it can't make the user wait more than three seconds either.
- **Example**: Last month's electronic invoices, chat logs from half a year ago.
- **Armory**: Traditional Hard Disk Drives (HDDs), standard versions of relational databases (like MySQL), Elasticsearch clusters. Access time is within hundreds of milliseconds.

### ❄️ Cold Data & Frozen Data (Archive)

- **Definition**: Super historical files that almost no one will ever look at, but because of [Legal Audit Regulations] (e.g., the Financial Supervisory Commission requires keeping transaction records for seven years), you are forced not to delete them.
- **Example**: 2016 Server Access Logs, return details over five years old.
- **Armory**: Outrageously cheap storage repositories. For example, AWS S3 Standard-IA (Infrequent Access tier), or even the ultimate **Amazon S3 Glacier (Deep Ice Tier)**.
  _(Note: The storage fee for Glacier approaches free, but the catch is: If your boss suddenly goes crazy one day and wants to pull up a report from five years ago, after you send the API request, **you might have to wait 12 hours** for the data to be dug out from deep-layer magnetic tape and "thawed" for you! This is an extreme magic of trading time for money.)_

---

## 2. Miracles Descend: Automatic Lifecycle Management (Lifecycle Hooks)

It is absolutely impossible for you to hire an engineer to manually dump old MySQL data out every midnight and throw it to a cheap S3. This must be fully automated.

### 🔄 The Transfer Matrix of the Gradually Frozen

In modern cloud architectures (like AWS S3), by just clicking a few settings, you can activate a quicksand trap named **Lifecycle Configuration (Lifecycle Rules)**:

1. A user just uploaded a video, and it happens to go viral within these 30 days. Everyone is watching it. This video stays in the most expensive S3 Standard tier.
2. After 30 days, the heat drops, and the system "automatically" knocks the video down to **S3 IA (Infrequent Access tier)**. The storage fee instantly halves.
3. After 1 full year, no one watches this video anymore. The system ruthlessly packages it and throws it into **S3 Glacier Deep Archive (Deep Ice Tier)**. The storage fee drops to one-thousandth of the original.
4. What if this video suddenly gets dug up and goes viral again three years later? The system will charge you a "thawing fee," but the money you've saved over these three years is already an astronomical figure.

---

## 3. Database Cold/Hot Separation (Database Tiering)

It's not just file systems; relational databases (like MySQL / PostgreSQL) also require Hot/Cold Separation.
If an `orders` table accumulates 500 million orders over ten years, every time you execute an `INSERT`, the weight of the B-Tree index reorganizing will drag the database down.

**Solution: Historical Archiving / Partitioning**:
The architect must write a scheduled script (CronJob or using a Kafka Connector):

- Find all orders over two years old where `created_at < 2023-01-01`.
- Transfer these old orders to another table named `orders_history_2022` (or simply migrate them to a cheap data warehouse dedicated to big data, like Hive / Redshift).
- In the current high-energy database, `DELETE` these old data points (don't forget to do an index rebuild).
  This ensures that the frontline `orders` table, which faces millions of traffic hits, always remains lightweight and at ultimate god-speed.

---

## 💡 Vibecoding Instructions

When using an AI Agent to construct a system containing user footprint logs, giant photo albums, or historical transaction records:

> 🗣️ `"When you are helping me use AWS CDK or Terraform to plan this giant video storage S3 Bucket, you are strictly forbidden from just opening a default Standard tier and calling it a day! Please immediately add the code configuration for [Lifecycle Rules]. I want you to configure: files that are 30 days old and over 1MB are automatically downgraded and transferred to the [Infrequent Access (IA)] tier; for aged files that haven't seen the light of day for 365 days, please ruthlessly knock them into [Glacier Deep Archive] for deep freezing. This concerns our infrastructure bill of thousands of dollars every quarter, it's not a game!"`
