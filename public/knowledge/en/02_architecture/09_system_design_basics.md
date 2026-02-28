# 09. System Design Basics

> **Type**: System architecture primer  
> **Focus**: Demystify the core terms you frequently hear in backend engineering—Microservices, API Gateways, and Async Queues—so newcomers can sketch a reliable system blueprint.

---

## 1. System Topology: Monolith vs Microservices

At the heart of distributed systems lies a fundamental split in how you organize components:

| Pattern | Metaphor & Technical Traits | Pros & Cons | Moyin’s decision |
| :------ | :------------------------- | :---------- | :---------------- |
| **Monolithic** | Like a **“tiny studio apartment”**: everything—logic, modules, and state—runs in a single process and directory. | 💥 **Issue**: a memory leak in one feature (e.g., authentication) can topple the entire server, including the critical AI services. | ❌ Rejected. A monolith cannot handle the wildly varying load profiles of AI workloads. |
| **Microservices** | Like a **“specialized industrial park”**: functions split into independently deployable projects that talk over APIs. | ✨ **Benefit**: If the login service crashes, the rendering service keeps running. You can also dedicate high-end GPU resources only to compute-heavy services (e.g., ComfyUI). | ✅ **Fully adopted**: the repo hosts dedicated services like `moyin-gateway` and `moyin-comfyUI`. |

> 💡 **Best Practice**: Microservices are not a silver bullet. They simply decouple a giant application into maintainable mini-projects that exchange data through well-defined RESTful or gRPC contracts.

---

## 2. API Gateway

- **Legacy pain point**: Without a gateway, clients must hardcode how to reach dozens of services (IP + port). Any topology change forces a client-side release.  
- **Purpose**: Acts as the **single entry guard** or **reception desk** for the service mesh.  
- **Behavior**: Every client request (e.g., fetching player info or generating an image) targets the Gateway. It handles authentication, then **reverse proxies** the call to the proper microservice based on the API path.

> 🏢 **In Moyin**: When a frontend request involves chatting with a large language model, it never hits OpenAI directly. Instead, it calls `moyin-gateway`, whose cost-aware router chooses between the cloud Claude or the on-premise Ollama model. The frontend doesn’t notice a thing.

---

## 3. Asynchronous Message Queues

- **Synchronous blocking**: A long-running request (e.g., a 3-minute AI image render) would hold the HTTP thread hostage, causing UI deadlocks and timeouts.  
- **Queue solution**: Like taking a number ticket at a restaurant.  
  1. User submits a heavy request and immediately receives a **Task ID**.  
  2. The task payload enters a **Message Queue** (RabbitMQ or Redis).  
  3. Background workers pull jobs from the queue and run them quietly.  
  4. When work finishes, the system notifies the UI via WebSocket or lets the client poll the Task ID for results.

> 🌟 **Fault-tolerance hero: Temporal**  
> Normal queues lose jobs when a server crashes. Moyin is rolling out **Temporal** to orchestrate **long-running workflows** with persistent state machines. Even after a restart, tasks resume from their last checkpoint, delivering enterprise-grade reliability.

---

## 4. Load Balancing

- **Scenario**: A viral release pushes a service’s CPU and network throughput to the roof.  
- **Solution**: Scale out by running the same microservice on multiple nodes and fronting them with a **Load Balancer** (Nginx or HAProxy).  
- **Mechanism**: The balancer applies algorithms (Round Robin, Least Connections) to spread incoming traffic evenly, preventing any single node from choking and ensuring **High Availability**.

---

## ✅ Architecture Checklist

System design is fundamentally about **trade-offs**. Moyin offloads complexity and safeguards to the backend so that the frontend stays lightweight.

Verify you internalized the chapter by checking each statement:

- [ ] “Because this API triggers deep learning inference that may take 30+ seconds, refactor it into an **Async background task** that returns a Task ID immediately.”  
- [ ] “I understand that microservices isolate blast radius and improve scalability, even though they raise operational complexity.”  
- [ ] “I understand that load balancers spread high-concurrency traffic across horizontal nodes to deliver availability.”  
- [ ] “I get that Message Queues (or Temporal) handle expensive jobs asynchronously while guaranteeing persistence and eventual consistency.”
