# 19. Cloud Ecosystem: Public Clouds, Serverless, and Edge

> **Type**: Deployment & infrastructure primer  
> **Focus**: Survey modern infrastructure including traditional public clouds, zero-ops Serverless, and the ultra-low latency of edge computing networks.

---

## 1. IaaS: The three public cloud titans

With on-premises datacenter costs ballooning, enterprises have embraced public cloud providers.

### AWS

- **Positioning**: The veteran infrastructure leader with the most complete service matrix and the deepest ecosystem—hosting the majority of heavyweight workloads.  
- **Canonical services**: EC2 (elastic VMs, the archetypal IaaS) and S3 (object storage, the cloud equivalent of Moyin’s local MinIO staging ground).

### GCP

- **Positioning**: Leader in data analytics, Kubernetes-native tooling, and premium ML clusters, backed by high-quality undersea cables.  
- **Project relevance**: Moyin’s Google Stitch MCP integration lives inside GCP’s compute ecosystem.

### Azure

- **Positioning**: Leverages Microsoft enterprise hooks (Active Directory, Office) and attracts conservative banking/enterprise customers.  
- **Notably**: OpenAI’s massive inference fleet runs exclusively on Azure’s global infrastructure.

---

## 2. Serverless revolution: uncoupling ops

The term “Serverless” is misleading—the servers still exist. The idea is to hand the responsibility for provisioning, patching, and scaling to the vendor so developers focus on business logic.

### Pain point of rented VMs

Reserving a fixed-spec VM means you pay even when traffic is zero, and bursty waves can saturate the instance and cause downtime.

### Benefits of serverless functions (AWS Lambda, Google Cloud Functions)

- **Pay-as-you-go**: Upload a Python or Node.js function. When idle, it sleeps and the bill is zero; you only pay per millisecond and memory usage when invoked.  
- **Auto-scaling**: When traffic surges 10,000×, the provider spins up 10,000 parallel instances in seconds and scales them down when the wave ends.

---

## 3. CDN & Edge computing counterattack

### CDN foundation

Requests from Taiwan to a U.S. East Coast host incur 150ms+ latency. CDNs copy static assets (HTML, images) to PoPs worldwide so users hit the nearest node and get millisecond delivery.

### Edge evolution (Cloudflare et al.)

CDNs realized their global nodes could also run code. **Edge computing** deploys logic (e.g., Vercel Edge or Cloudflare Workers) near the user.

- Authentication or lightweight DB lookups run on the nearest V8-powered node instead of crossing the ocean.  
- Ultra-low latency boosts interactions to native-app levels.

---

## 💡 Summary: trade-offs

Serverless and Edge are powerful but not universal. Moyin relies on GPU-heavy, long-running LLM processes orchestrated by Temporal. These workloads exceed serverless max execution durations (5–15 minutes) and need persistent sessions, so dedicated VMs remain essential for now.
