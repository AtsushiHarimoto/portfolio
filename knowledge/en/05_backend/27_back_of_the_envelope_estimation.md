# 27. The Architect's Sixth Sense: Back-of-the-envelope Estimation

> **Type**: Mathematical Quantification & Mental Models in System Design
> **Focus**: The eternal first hurdle of a System Design Interview. If you can't even calculate how many artillery shells your server has to withstand per second, what right do you have to propose using Kafka or Cassandra? This article reveals the mysterious martial art of top Silicon Valley architects: estimating bandwidth and server counts barehanded on a Starbucks napkin.

---

## Prelude: Before Drawing the Architecture Blueprint, "Tell Its Fortune" First

"Back-of-the-envelope Estimation is an estimation technique that can derive a reasonable system scale in a short time through a set of simplified assumptions." — ByteByteGo (Alex Xu).

When a PM hands you a project to "build a posting and push-stream system similar to Twitter," a junior engineer will immediately open their IDE and start writing CRUD. A formidable architect, however, will grab a pen and paper and ask the PM:

- "What is our projected Daily Active Users (DAU)?"
- "How many posts does each user publish per day on average?"
  Then, within three minutes, the architect will tell you: **"We need 50 Web Servers, 3 giant Sharded databases, and 30 GB/s internal network equipment."** This isn't mysticism; this is pure arithmetic.

---

## 1. The Three Indispensable Golden Constants

Before stepping into the realm of mental calculation, you must engrave a few physical and operating system ceilings into your mind:

1. **The Chasm of Time**:
   - Memory (RAM) reading 1MB: $\approx 250\text{ \mu s}$ (microseconds).
   - Solid State Drive (SSD) sequential reading 1MB: $\approx 1\text{ ms}$ (milliseconds).
   - Sending a packet from the US East Coast to the West Coast (Round Trip): $\approx 150\text{ ms}$. **(This is the god-given limit of network transmission, the speed of light. This is also the ironclad proof of why we absolutely must deploy CDNs globally!)**
2. **The High-Concurrency Conversion Formula: Seconds in a Day**
   - 1 Day $= 24 \text{ hr} \times 60 \text{ min} \times 60 \text{ s} \approx \mathbf{100,000 \text{ seconds}}$ (Rounding makes calculation fastest! The exact value is 86400).
3. **Data Size Echelons**:
   - Character = 1 Byte
   - KB ➡️ MB ➡️ GB ➡️ TB ➡️ PB (each is a thousand times larger / $10^3$).
   - Grasp an image as 2MB, a 1-minute HD short video as 50MB.

---

## 2. The Three-Minute Napkin Practical Exercise: Estimating Twitter's Specifications

**📍 [Scenario]: You are to design a new micro-blogging app that supports publishing posts containing images.**

### Step A. Establish the Grand Assumptions

- Global Monthly Active Users (MAU) 300 million. Daily Active Users (DAU) count as half: **150 Million**.
- Each DAU publishes 2 pure-text posts per day (100 Bytes per post) + 1 out of every 10 people will attach an image (2 MB).

### Step B. Estimate QPS (Throughput - Queries Per Second)

How much pressure can the server handle in one second? This determines how you allocate your Nginx and API Gateways.

- **Total daily posts**: $150\text{ Million DAU} \times 2 = \mathbf{300\text{ Million requests / day}}$.
- **👉 Average QPS**: $300\text{ Million} \div 100,000\text{ seconds (per day)} = \mathbf{3,000\text{ requests / second}}$.
- **🚨 Peak QPS**: According to the rule of thumb, peak traffic (like breaking news) is usually twice the average. Therefore, **our system MUST be able to withstand $6,000 \text{ QPS}$!**

_(Note: If a conventional Node.js + Express setup can handle 500 QPS, you know you need at least 12 API servers prepared as a standing army.)_

### Step C. Estimate Storage Costs

How big should our hard drives be? Can we afford cloud space?

- **Pure text table capacity**: $150\text{ Million} \times 2\text{ posts} \times 100\text{ Bytes} = \mathbf{30 \text{ GB / Day}}$. (Absolutely zero pressure for a relational database).
- **Media library explosion (Images S3/MinIO)**: $150\text{ Million} \times 10\% \text{(probability)} \times 2\text{ MB} = \mathbf{30 \text{ TB / Day}}$.
- **Total cost over 5 years**: $30\text{ TB} \times 365 \times 5 = \mathbf{54,000 \text{ TB} = \mathbf{54 \text{ PB}} !}$
  _(Conclusion: The database can be handled by a single cluster primary-replica backup; but for static resources, if we don't move to a large-scale object storage like cloud S3, nor use a CDN, and buy hard drives to build it ourselves, this company will go bankrupt immediately.)_

### Step D. Network Bandwidth Estimation

For server hardware, it's not just about CPU/RAM; whether the network card will explode is also crucial. (Usually, uploading is called Ingress, downloading is called Egress).

- **Image payload generated per second**: The 30 TB per day calculated above $\div 100,000 = \mathbf{300 \text{ MB / s} \text{ per second}}$ (This is considered heavy for a standard Gigabit fiber network card, requiring the establishment of a dedicated media upload microservice).

---

## 💡 Vibecoding Instructions

Instead of merely telling the AI what features to write, a top-tier approach is to immediately drop your environmental estimation parameters into the first paragraph of your prompt to Claude. When the AI recognizes you are doing monster-level engineering, its output logic will magically ascend from a script-kiddie to a senior architect:

> 🗣️ `"Attention AI Architect, you are now to construct a Flash Sale module. The estimated Peak QPS will approach 20,000 and 95% is read traffic. Please do not give me an ordinary MySQL read/write script! I demand the first layer of this architecture utilize a Redis Cluster as a combat buffer, and use an asynchronous message queue (estimated message load of 5MB generated per second) to offload the pressure of dropping orders into the database! For the code structure, please use Node.js + Worker Threads as the main axis to write out scalable Cloud-Native source code."`
