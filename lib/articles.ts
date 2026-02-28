import type { Locale } from '@/lib/i18n';

export type Article = {
  slug: string;
  title: Record<'en' | 'ja' | 'zh-tw', string>;
  category: string;
  file: string;
};

export type Category = {
  id: string;
  icon: string;
  label: {
    en: string;
    ja: string;
    'zh-tw': string;
  };
};

export const categories: Category[] = [
  {
    id: '02_architecture',
    icon: '\u{1F3D7}',
    label: { en: 'Architecture', ja: 'アーキテクチャ', 'zh-tw': '架構設計' },
  },
  {
    id: '03_development',
    icon: '\u{1F6E0}',
    label: { en: 'Development', ja: '開発', 'zh-tw': '開發實務' },
  },
  {
    id: '04_frontend',
    icon: '\u{1F3A8}',
    label: { en: 'Frontend', ja: 'フロントエンド', 'zh-tw': '前端技術' },
  },
  {
    id: '05_backend',
    icon: '\u{2699}',
    label: { en: 'Backend', ja: 'バックエンド', 'zh-tw': '後端技術' },
  },
  {
    id: '06_testing',
    icon: '\u{1F9EA}',
    label: { en: 'Testing', ja: 'テスト', 'zh-tw': '測試策略' },
  },
  {
    id: '07_ai_llm',
    icon: '\u{1F916}',
    label: { en: 'AI / LLM', ja: 'AI / LLM', 'zh-tw': 'AI / LLM' },
  },
  {
    id: '09_workflows',
    icon: '\u{1F504}',
    label: { en: 'Workflows', ja: 'ワークフロー', 'zh-tw': '工作流程' },
  },
  {
    id: '11_claude_code',
    icon: '\u{1F4BB}',
    label: { en: 'Claude Code', ja: 'Claude Code', 'zh-tw': 'Claude Code' },
  },
  {
    id: '12_diagrams',
    icon: '\u{1F4CA}',
    label: { en: 'Diagrams', ja: 'ダイアグラム', 'zh-tw': '架構圖表' },
  },
];

export const articles: Article[] = [

  // 02_architecture
  { slug: '02_architecture--09_system_design_basics', title: { en: '09. System Design Basics', ja: '09. システム設計フィールドガイド', 'zh-tw': '09. 系統設計漫遊指北 (System Design Basics)' }, category: '02_architecture', file: '09_system_design_basics.md' },
  { slug: '02_architecture--10_database_design_basics', title: { en: '10. Database & Storage Design', ja: '10. データベース & ストレージ設計', 'zh-tw': '10. 資料庫設計與異構儲存基礎 (Database & Storage Design)' }, category: '02_architecture', file: '10_database_design_basics.md' },
  { slug: '02_architecture--12_ai_native_system_architecture', title: { en: '12. Building AI-Native Systems in 2026', ja: '12. 2026 年代における AI ネイティブシステム設計', 'zh-tw': '12. 邁入 AI Native 世代：2026 前端與系統架構設計典範' }, category: '02_architecture', file: '12_ai_native_system_architecture.md' },
  { slug: '02_architecture--16_docker_containerization_basics', title: { en: '16. Docker & Containerization', ja: '16. Docker とサーバーコンテナ化技術', 'zh-tw': '16. Docker 與伺服器容器化技術 (Docker & Containerization)' }, category: '02_architecture', file: '16_docker_containerization_basics.md' },
  { slug: '02_architecture--19_cloud_and_serverless_ecosystem', title: { en: '19. Cloud Ecosystem: Public Clouds, Serverless, and Edge', ja: '19. クラウドエコシステム：パブリッククラウド、サーバーレス、エッジ', 'zh-tw': '19. 漫步雲端：三大公有雲、Serverless 與邊緣運算' }, category: '02_architecture', file: '19_cloud_and_serverless_ecosystem.md' },
  { slug: '02_architecture--20_database_tech_selection', title: { en: '20. Database Technology Selection: SQL vs NoSQL', ja: '20. データベース技術選定：SQL 対 NoSQL', 'zh-tw': '20. 資料庫技術選型策略：SQL 與 NoSQL 陣營之決斷' }, category: '02_architecture', file: '20_database_tech_selection.md' },
  { slug: '02_architecture--21_agent_system_design', title: { en: '21. Agent System Design Overview', ja: '21. Agent システム設計概要', 'zh-tw': '21. Agent 系統設計總覽' }, category: '02_architecture', file: '21_agent_system_design.md' },
  { slug: '02_architecture--22_opencwal_principles', title: { en: '22. OpenCWAL Principles', ja: '22. OpenCWAL 原理設計', 'zh-tw': '22. OpenCWAL 原理設計' }, category: '02_architecture', file: '22_opencwal_principles.md' },
  { slug: '02_architecture--23_security_architecture', title: { en: '23. Security Architecture', ja: '23. セキュリティアーキテクチャ', 'zh-tw': '23. 安全架構設計' }, category: '02_architecture', file: '23_security_architecture.md' },

  // 03_development
  { slug: '03_development--03.1.cloudflare_tunnel_local_deployment', title: { en: '03.1. Cloudflare Tunnel for Temporary Public Deployment', ja: '03.1. Cloudflare Tunnel による一時パブリック公開', 'zh-tw': '03.1. Cloudflare Tunnel 臨時公網部署' }, category: '03_development', file: '03.1.cloudflare_tunnel_local_deployment.md' },
  { slug: '03_development--03.2.cross_platform_install_scripts', title: { en: '03.2. Cross-Platform Install Scripts', ja: '03.2. クロスプラットフォームインストールスクリプト', 'zh-tw': '03.2. 跨平台自動化基礎建設安裝腳本' }, category: '03_development', file: '03.2.cross_platform_install_scripts.md' },
  { slug: '03_development--03.4.git_merge_best_practices', title: { en: '03.4. Git Merge Best Practices', ja: '03.4. Git Merge Best Practices', 'zh-tw': '03.4. Git Merge Best Practices' }, category: '03_development', file: '03.4.git_merge_best_practices.md' },
  { slug: '03_development--03.5.powershell_tips', title: { en: '03.5. PowerShell Tips & Troubleshooting', ja: '03.5. PowerShell Tips & Troubleshooting', 'zh-tw': '03.5. PowerShell Tips & Troubleshooting' }, category: '03_development', file: '03.5.powershell_tips.md' },
  { slug: '03_development--08_software_design_patterns', title: { en: '08. Software Design Patterns', ja: '08. Software Design Patterns', 'zh-tw': '08. Software Design Patterns' }, category: '03_development', file: '08_software_design_patterns.md' },
  { slug: '03_development--13_search_algorithms_and_hermit_purple', title: { en: '13. Algorithms & Data Pipelines', ja: '13. Algorithms & Data Pipelines', 'zh-tw': '13. Algorithms & Data Pipelines' }, category: '03_development', file: '13_search_algorithms_and_hermit_purple.md' },

  // 04_frontend
  { slug: '04_frontend--04.1.style_guard_pattern', title: { en: '04.1. Style Guard Pattern', ja: '04.1. Style Guard Pattern', 'zh-tw': '04.1. Style Guard Pattern' }, category: '04_frontend', file: '04.1.style_guard_pattern.md' },
  { slug: '04_frontend--04.2.ui_design_system', title: { en: '04.2. UI Design System & Style Guide', ja: '04.2. UI Design System & Style Guide', 'zh-tw': '04.2. UI Design System & Style Guide' }, category: '04_frontend', file: '04.2.ui_design_system.md' },
  { slug: '04_frontend--17_frontend_mobile_and_web_ecosystem', title: { en: '17. Mobile & Web Framework Ecosystem', ja: '17. Mobile & Web Framework Ecosystem', 'zh-tw': '17. Mobile & Web Framework Ecosystem' }, category: '04_frontend', file: '17_frontend_mobile_and_web_ecosystem.md' },
  { slug: '04_frontend--18_frontend_rendering_ssr_and_hydration', title: { en: '18. CSR vs SSR & Hydration', ja: '18. CSR vs SSR & Hydration', 'zh-tw': '18. CSR vs SSR & Hydration' }, category: '04_frontend', file: '18_frontend_rendering_ssr_and_hydration.md' },
  { slug: '04_frontend--19_frontend_state_and_micro_frontends', title: { en: '19. State Management & Micro-Frontends', ja: '19. State Management & Micro-Frontends', 'zh-tw': '19. State Management & Micro-Frontends' }, category: '04_frontend', file: '19_frontend_state_and_micro_frontends.md' },
  { slug: '04_frontend--20_frontend_performance_and_virtualization', title: { en: '20. Frontend Performance & Virtual Lists', ja: '20. Frontend Performance & Virtual Lists', 'zh-tw': '20. Frontend Performance & Virtual Lists' }, category: '04_frontend', file: '20_frontend_performance_and_virtualization.md' },
  { slug: '04_frontend--21_frontend_webgpu_and_browser_ai', title: { en: '21. WebGPU, Wasm & Browser AI', ja: '21. WebGPU, Wasm & Browser AI', 'zh-tw': '21. WebGPU, Wasm & Browser AI' }, category: '04_frontend', file: '21_frontend_webgpu_and_browser_ai.md' },
  { slug: '04_frontend--22_frontend_streaming_ui_and_sse', title: { en: '22. Streaming UI & SSE', ja: '22. Streaming UI & SSE', 'zh-tw': '22. Streaming UI & SSE' }, category: '04_frontend', file: '22_frontend_streaming_ui_and_sse.md' },
  { slug: '04_frontend--23_frontend_generative_ui_vercel', title: { en: '23. Vercel AI SDK & Generative UI', ja: '23. Vercel AI SDK & Generative UI', 'zh-tw': '23. Vercel AI SDK & Generative UI' }, category: '04_frontend', file: '23_frontend_generative_ui_vercel.md' },
  { slug: '04_frontend--24_frontend_cors_and_cross_origin_security', title: { en: '24. CORS & Cross-Origin Security', ja: '24. CORS & Cross-Origin Security', 'zh-tw': '24. CORS & Cross-Origin Security' }, category: '04_frontend', file: '24_frontend_cors_and_cross_origin_security.md' },
  { slug: '04_frontend--25_frontend_browser_fingerprinting_and_fraud_prevention', title: { en: '25. Browser Fingerprinting & Fraud Prevention', ja: '25. Browser Fingerprinting & Fraud Prevention', 'zh-tw': '25. Browser Fingerprinting & Fraud Prevention' }, category: '04_frontend', file: '25_frontend_browser_fingerprinting_and_fraud_prevention.md' },
  { slug: '04_frontend--26_firebase_baas_and_app_check', title: { en: '26. Firebase BaaS & App Check', ja: '26. Firebase BaaS & App Check', 'zh-tw': '26. Firebase BaaS & App Check' }, category: '04_frontend', file: '26_firebase_baas_and_app_check.md' },

  // 05_backend
  { slug: '05_backend--14_database_locks_and_concurrency', title: { en: '14. Concurrency & Database Locks', ja: '14. Concurrency & Database Locks', 'zh-tw': '14. Concurrency & Database Locks' }, category: '05_backend', file: '14_database_locks_and_concurrency.md' },
  { slug: '05_backend--18_backend_concurrency_and_race_conditions', title: { en: '18. Concurrency & Data Race', ja: '18. Concurrency & Data Race', 'zh-tw': '18. Concurrency & Data Race' }, category: '05_backend', file: '18_backend_concurrency_and_race_conditions.md' },
  { slug: '05_backend--20_backend_resource_pools', title: { en: '20. Resource Pooling: Thread & Connection Pools', ja: '20. Resource Pooling: Thread & Connection Pools', 'zh-tw': '20. Resource Pooling: Thread & Connection Pools' }, category: '05_backend', file: '20_backend_resource_pools.md' },
  { slug: '05_backend--21_high_concurrency_and_cloud_native', title: { en: '21. High Concurrency & Cloud Native', ja: '21. High Concurrency & Cloud Native', 'zh-tw': '21. High Concurrency & Cloud Native' }, category: '05_backend', file: '21_high_concurrency_and_cloud_native.md' },
  { slug: '05_backend--22_distributed_transactions_and_saga', title: { en: '22. Distributed Transactions & Saga Pattern', ja: '22. Distributed Transactions & Saga Pattern', 'zh-tw': '22. Distributed Transactions & Saga Pattern' }, category: '05_backend', file: '22_distributed_transactions_and_saga.md' },
  { slug: '05_backend--23_mq_event_sourcing_kafka', title: { en: '23. Message Queues & Event Sourcing', ja: '23. Message Queues & Event Sourcing', 'zh-tw': '23. Message Queues & Event Sourcing' }, category: '05_backend', file: '23_mq_event_sourcing_kafka.md' },
  { slug: '05_backend--24_observability_and_centralized_logging', title: { en: '24. Observability & Centralized Logging', ja: '24. Observability & Centralized Logging', 'zh-tw': '24. Observability & Centralized Logging' }, category: '05_backend', file: '24_observability_and_centralized_logging.md' },
  { slug: '05_backend--25_distributed_algorithms_hashing_and_snowflake', title: { en: '25. Consistent Hashing & Snowflake Algorithm', ja: '25. Consistent Hashing & Snowflake Algorithm', 'zh-tw': '25. Consistent Hashing & Snowflake Algorithm' }, category: '05_backend', file: '25_distributed_algorithms_hashing_and_snowflake.md' },
  { slug: '05_backend--26_geospatial_and_realtime_leaderboards', title: { en: '26. Geospatial & Real-Time Leaderboards', ja: '26. Geospatial & Real-Time Leaderboards', 'zh-tw': '26. Geospatial & Real-Time Leaderboards' }, category: '05_backend', file: '26_geospatial_and_realtime_leaderboards.md' },
  { slug: '05_backend--27_back_of_the_envelope_estimation', title: { en: '27. Back-of-the-Envelope Estimation', ja: '27. Back-of-the-Envelope Estimation', 'zh-tw': '27. Back-of-the-Envelope Estimation' }, category: '05_backend', file: '27_back_of_the_envelope_estimation.md' },
  { slug: '05_backend--28_api_gateway_and_service_mesh', title: { en: '28. API Gateway & Service Mesh', ja: '28. API Gateway & Service Mesh', 'zh-tw': '28. API Gateway & Service Mesh' }, category: '05_backend', file: '28_api_gateway_and_service_mesh.md' },
  { slug: '05_backend--29_disaster_recovery_and_multi_region', title: { en: '29. Multi-Region Disaster Recovery', ja: '29. Multi-Region Disaster Recovery', 'zh-tw': '29. Multi-Region Disaster Recovery' }, category: '05_backend', file: '29_disaster_recovery_and_multi_region.md' },
  { slug: '05_backend--30_api_rate_limiting_algorithms', title: { en: '30. API Rate Limiting Algorithms', ja: '30. API Rate Limiting Algorithms', 'zh-tw': '30. API Rate Limiting Algorithms' }, category: '05_backend', file: '30_api_rate_limiting_algorithms.md' },
  { slug: '05_backend--31_cap_pacelc_and_distributed_locks', title: { en: '31. CAP, PACELC & Distributed Consensus', ja: '31. CAP, PACELC & Distributed Consensus', 'zh-tw': '31. CAP, PACELC & Distributed Consensus' }, category: '05_backend', file: '31_cap_pacelc_and_distributed_locks.md' },
  { slug: '05_backend--32_real_time_websocket_and_chat', title: { en: '32. WebSocket & Real-Time Communication', ja: '32. WebSocket & Real-Time Communication', 'zh-tw': '32. WebSocket & Real-Time Communication' }, category: '05_backend', file: '32_real_time_websocket_and_chat.md' },
  { slug: '05_backend--33_api_security_https_tls', title: { en: '33. HTTPS, TLS & API Security', ja: '33. HTTPS, TLS & API Security', 'zh-tw': '33. HTTPS, TLS & API Security' }, category: '05_backend', file: '33_api_security_https_tls.md' },
  { slug: '05_backend--34_search_autocomplete_and_trie', title: { en: '34. Autocomplete & Trie Data Structure', ja: '34. Autocomplete & Trie Data Structure', 'zh-tw': '34. Autocomplete & Trie Data Structure' }, category: '05_backend', file: '34_search_autocomplete_and_trie.md' },
  { slug: '05_backend--35_video_streaming_and_hls', title: { en: '35. HLS & Adaptive Video Streaming', ja: '35. HLS & Adaptive Video Streaming', 'zh-tw': '35. HLS & Adaptive Video Streaming' }, category: '05_backend', file: '35_video_streaming_and_hls.md' },
  { slug: '05_backend--36_probabilistic_data_structures', title: { en: '36. Bloom Filter & HyperLogLog', ja: '36. Bloom Filter & HyperLogLog', 'zh-tw': '36. Bloom Filter & HyperLogLog' }, category: '05_backend', file: '36_probabilistic_data_structures.md' },
  { slug: '05_backend--37_oauth2_oidc_and_sso', title: { en: '37. OAuth 2.0, OIDC & SSO', ja: '37. OAuth 2.0, OIDC & SSO', 'zh-tw': '37. OAuth 2.0, OIDC & SSO' }, category: '05_backend', file: '37_oauth2_oidc_and_sso.md' },
  { slug: '05_backend--38_chaos_engineering_and_resilience', title: { en: '38. Chaos Engineering & Resilience', ja: '38. Chaos Engineering & Resilience', 'zh-tw': '38. Chaos Engineering & Resilience' }, category: '05_backend', file: '38_chaos_engineering_and_resilience.md' },
  { slug: '05_backend--39_hot_cold_data_storage_tiering', title: { en: '39. Hot/Cold Data Storage Tiering', ja: '39. Hot/Cold Data Storage Tiering', 'zh-tw': '39. Hot/Cold Data Storage Tiering' }, category: '05_backend', file: '39_hot_cold_data_storage_tiering.md' },
  { slug: '05_backend--40_vector_database_and_rag_internals', title: { en: '40. Vector Database & RAG Internals', ja: '40. Vector Database & RAG Internals', 'zh-tw': '40. Vector Database & RAG Internals' }, category: '05_backend', file: '40_vector_database_and_rag_internals.md' },
  { slug: '05_backend--41_cloud_finops_and_cost_optimization', title: { en: '41. Cloud FinOps & Cost Optimization', ja: '41. Cloud FinOps & Cost Optimization', 'zh-tw': '41. Cloud FinOps & Cost Optimization' }, category: '05_backend', file: '41_cloud_finops_and_cost_optimization.md' },
  { slug: '05_backend--42_cqrs_and_event_sourcing', title: { en: '42. CQRS & Event Sourcing', ja: '42. CQRS & Event Sourcing', 'zh-tw': '42. CQRS & Event Sourcing' }, category: '05_backend', file: '42_cqrs_and_event_sourcing.md' },
  { slug: '05_backend--43_webhooks_idempotency_design', title: { en: '43. Webhook & Idempotency Design', ja: '43. Webhook & Idempotency Design', 'zh-tw': '43. Webhook & Idempotency Design' }, category: '05_backend', file: '43_webhooks_idempotency_design.md' },
  { slug: '05_backend--44_ebpf_and_linux_kernel_networking', title: { en: '44. eBPF & Service Mesh Revolution', ja: '44. eBPF & Service Mesh Revolution', 'zh-tw': '44. eBPF & Service Mesh Revolution' }, category: '05_backend', file: '44_ebpf_and_linux_kernel_networking.md' },

  // 06_testing
  { slug: '06_testing--06.1.automation_basics', title: { en: '06.1. E2E Test Automation Basics', ja: '06.1. E2E Test Automation Basics', 'zh-tw': '06.1. E2E Test Automation Basics' }, category: '06_testing', file: '06.1.automation_basics.md' },
  { slug: '06_testing--06.2.testing_strategy', title: { en: '06.2. Testing Strategy', ja: '06.2. Testing Strategy', 'zh-tw': '06.2. Testing Strategy' }, category: '06_testing', file: '06.2.testing_strategy.md' },

  // 07_ai_llm
  { slug: '07_ai_llm--07.1.api_strategy', title: { en: '07.1. LLM API Strategy & Monetization', ja: '07.1. LLM API Strategy & Monetization', 'zh-tw': '07.1. LLM API Strategy & Monetization' }, category: '07_ai_llm', file: '07.1.api_strategy.md' },
  { slug: '07_ai_llm--07.2.claude_skills_structure', title: { en: '07.2. Claude Code Skills Directory Structure', ja: '07.2. Claude Code Skills Directory Structure', 'zh-tw': '07.2. Claude Code Skills Directory Structure' }, category: '07_ai_llm', file: '07.2.claude_skills_structure.md' },
  { slug: '07_ai_llm--07.3.comfyui_models_guide', title: { en: '07.3. ComfyUI Image & Voice Generation Models', ja: '07.3. ComfyUI Image & Voice Generation Models', 'zh-tw': '07.3. ComfyUI Image & Voice Generation Models' }, category: '07_ai_llm', file: '07.3.comfyui_models_guide.md' },
  { slug: '07_ai_llm--07.4.comfyui_quickstart', title: { en: '07.4. ComfyUI Quickstart: Node-Based Visual Generation', ja: '07.4. ComfyUI Quickstart: Node-Based Visual Generation', 'zh-tw': '07.4. ComfyUI Quickstart: Node-Based Visual Generation' }, category: '07_ai_llm', file: '07.4.comfyui_quickstart.md' },
  { slug: '07_ai_llm--07.5.ollama_and_auth_guide', title: { en: '07.5. Ollama Local Model Deployment & Cloud LLM Auth', ja: '07.5. Ollama Local Model Deployment & Cloud LLM Auth', 'zh-tw': '07.5. Ollama Local Model Deployment & Cloud LLM Auth' }, category: '07_ai_llm', file: '07.5.ollama_and_auth_guide.md' },
  { slug: '07_ai_llm--07.6.prompt_engineering', title: { en: '07.6. Prompt Engineering Fundamentals', ja: '07.6. Prompt Engineering Fundamentals', 'zh-tw': '07.6. Prompt Engineering Fundamentals' }, category: '07_ai_llm', file: '07.6.prompt_engineering.md' },
  { slug: '07_ai_llm--07_llm_training_for_beginners', title: { en: '07. AI Model Architecture & Fine-Tuning Basics', ja: '07. AI Model Architecture & Fine-Tuning Basics', 'zh-tw': '07. AI Model Architecture & Fine-Tuning Basics' }, category: '07_ai_llm', file: '07_llm_training_for_beginners.md' },
  { slug: '07_ai_llm--12_prompt_and_context_management', title: { en: '12. Prompt & Context Management', ja: '12. Prompt & Context Management', 'zh-tw': '12. Prompt & Context Management' }, category: '07_ai_llm', file: '12_prompt_and_context_management.md' },
  { slug: '07_ai_llm--21_rag_and_vector_databases_explained', title: { en: '21. Advanced RAG & Vector Database', ja: '21. Advanced RAG & Vector Database', 'zh-tw': '21. Advanced RAG & Vector Database' }, category: '07_ai_llm', file: '21_rag_and_vector_databases_explained.md' },
  { slug: '07_ai_llm--22_advanced_ai_vtuber_and_npc_architectures', title: { en: '22. NPC, VTuber & Edge Inference Architectures', ja: '22. NPC, VTuber & Edge Inference Architectures', 'zh-tw': '22. NPC, VTuber & Edge Inference Architectures' }, category: '07_ai_llm', file: '22_advanced_ai_vtuber_and_npc_architectures.md' },
  { slug: '07_ai_llm--23_academic_neural_networks_and_backprop', title: { en: '23. Neural Networks & Backpropagation', ja: '23. Neural Networks & Backpropagation', 'zh-tw': '23. Neural Networks & Backpropagation' }, category: '07_ai_llm', file: '23_academic_neural_networks_and_backprop.md' },
  { slug: '07_ai_llm--24_academic_transformer_qkv_attention', title: { en: '24. Attention Is All You Need & Self-Attention', ja: '24. Attention Is All You Need & Self-Attention', 'zh-tw': '24. Attention Is All You Need & Self-Attention' }, category: '07_ai_llm', file: '24_academic_transformer_qkv_attention.md' },
  { slug: '07_ai_llm--25_academic_llm_inference_optimization', title: { en: '25. LLM Inference: KV Cache, FlashAttention & Speculative Decoding', ja: '25. LLM Inference: KV Cache, FlashAttention & Speculative Decoding', 'zh-tw': '25. LLM Inference: KV Cache, FlashAttention & Speculative Decoding' }, category: '07_ai_llm', file: '25_academic_llm_inference_optimization.md' },
  { slug: '07_ai_llm--26_academic_post_transformer_era', title: { en: '26. Post-Transformer Era: MoE, Mamba & Spatial Intelligence', ja: '26. Post-Transformer Era: MoE, Mamba & Spatial Intelligence', 'zh-tw': '26. Post-Transformer Era: MoE, Mamba & Spatial Intelligence' }, category: '07_ai_llm', file: '26_academic_post_transformer_era.md' },
  { slug: '07_ai_llm--27_academic_titans_memory_and_dit_video', title: { en: '27. Titans Neural Memory & DiT Video Engine', ja: '27. Titans Neural Memory & DiT Video Engine', 'zh-tw': '27. Titans Neural Memory & DiT Video Engine' }, category: '07_ai_llm', file: '27_academic_titans_memory_and_dit_video.md' },
  { slug: '07_ai_llm--28_academic_cot_and_agentic_workflows', title: { en: '28. Chain of Thought & Agentic Workflows', ja: '28. Chain of Thought & Agentic Workflows', 'zh-tw': '28. Chain of Thought & Agentic Workflows' }, category: '07_ai_llm', file: '28_academic_cot_and_agentic_workflows.md' },

  // 09_workflows
  { slug: '09_workflows--09.1.agent_roles_2026', title: { en: 'AI Agent Role Specification (2026)', ja: 'AI Agent Role Specification (2026)', 'zh-tw': 'AI Agent Role Specification (2026)' }, category: '09_workflows', file: '09.1.agent_roles_2026.md' },
  { slug: '09_workflows--09.10.progress_tracking', title: { en: 'Task Progress Tracking', ja: 'Task Progress Tracking', 'zh-tw': 'Task Progress Tracking' }, category: '09_workflows', file: '09.10.progress_tracking.md' },
  { slug: '09_workflows--09.11.prompt_cheat_sheet', title: { en: 'AI Collaboration Cheat Sheet', ja: 'AI Collaboration Cheat Sheet', 'zh-tw': 'AI Collaboration Cheat Sheet' }, category: '09_workflows', file: '09.11.prompt_cheat_sheet.md' },
  { slug: '09_workflows--09.12.vibe_coding_rules', title: { en: 'Lifecycle Guard (BMAD-Lite)', ja: 'Lifecycle Guard (BMAD-Lite)', 'zh-tw': 'Lifecycle Guard (BMAD-Lite)' }, category: '09_workflows', file: '09.12.vibe_coding_rules.md' },
  { slug: '09_workflows--09.13.vibe_coding_workflow', title: { en: 'Vibe Coding Workflow: Design to Verify', ja: 'Vibe Coding Workflow: Design to Verify', 'zh-tw': 'Vibe Coding Workflow: Design to Verify' }, category: '09_workflows', file: '09.13.vibe_coding_workflow.md' },
  { slug: '09_workflows--09.14.wiki_restructure_best_practices', title: { en: 'IT Wiki Restructure Best Practices', ja: 'IT Wiki Restructure Best Practices', 'zh-tw': 'IT Wiki Restructure Best Practices' }, category: '09_workflows', file: '09.14.wiki_restructure_best_practices.md' },
  { slug: '09_workflows--09.15.workflow_file_format_standard', title: { en: 'Workflow File Format Standard', ja: 'Workflow File Format Standard', 'zh-tw': 'Workflow File Format Standard' }, category: '09_workflows', file: '09.15.workflow_file_format_standard.md' },
  { slug: '09_workflows--09.2.claude_anti_work', title: { en: 'Vibe Coding Automation SOP', ja: 'Vibe Coding Automation SOP', 'zh-tw': 'Vibe Coding Automation SOP' }, category: '09_workflows', file: '09.2.claude_anti_work.md' },
  { slug: '09_workflows--09.3.claude_guide', title: { en: 'Cross-Agent Collaboration Guide', ja: 'Cross-Agent Collaboration Guide', 'zh-tw': 'Cross-Agent Collaboration Guide' }, category: '09_workflows', file: '09.3.claude_guide.md' },
  { slug: '09_workflows--09.4.code_archive_workflow', title: { en: 'Code Archive & Log Management', ja: 'Code Archive & Log Management', 'zh-tw': 'Code Archive & Log Management' }, category: '09_workflows', file: '09.4.code_archive_workflow.md' },
  { slug: '09_workflows--09.5.external_ai_collaboration', title: { en: 'External AI Collaboration (GPT Projects Loop)', ja: 'External AI Collaboration (GPT Projects Loop)', 'zh-tw': 'External AI Collaboration (GPT Projects Loop)' }, category: '09_workflows', file: '09.5.external_ai_collaboration.md' },
  { slug: '09_workflows--09.6.issue_management_system', title: { en: 'Issue Management System Design', ja: 'Issue Management System Design', 'zh-tw': 'Issue Management System Design' }, category: '09_workflows', file: '09.6.issue_management_system.md' },
  { slug: '09_workflows--09.7.multi_agent_collaboration', title: { en: 'Multi-Agent Collaboration Framework', ja: 'Multi-Agent Collaboration Framework', 'zh-tw': 'Multi-Agent Collaboration Framework' }, category: '09_workflows', file: '09.7.multi_agent_collaboration.md' },
  { slug: '09_workflows--09.8.multi_agent_worktree', title: { en: 'Multi-Agent Worktree Isolation (Parallel Universe)', ja: 'Multi-Agent Worktree Isolation (Parallel Universe)', 'zh-tw': 'Multi-Agent Worktree Isolation (Parallel Universe)' }, category: '09_workflows', file: '09.8.multi_agent_worktree.md' },
  { slug: '09_workflows--09.9.multi_project_workflow_design', title: { en: 'Multi-Project Workflow Design', ja: 'Multi-Project Workflow Design', 'zh-tw': 'Multi-Project Workflow Design' }, category: '09_workflows', file: '09.9.multi_project_workflow_design.md' },
  { slug: '09_workflows--15_git_version_control_cicd', title: { en: '15. Git Version Control & CI/CD Pipeline', ja: '15. Git Version Control & CI/CD Pipeline', 'zh-tw': '15. Git Version Control & CI/CD Pipeline' }, category: '09_workflows', file: '15_git_version_control_cicd.md' },

  // 11_claude_code
  { slug: '11_claude_code--11.1.claude-reflect', title: { en: 'Claude Reflect: Auto Rule Distillation', ja: 'Claude Reflect: Auto Rule Distillation', 'zh-tw': 'Claude Reflect: Auto Rule Distillation' }, category: '11_claude_code', file: '11.1.claude-reflect.md' },
  { slug: '11_claude_code--11_vibecoding_agent_mcp', title: { en: '11. AI Agent & MCP Concepts', ja: '11. AI Agent & MCP Concepts', 'zh-tw': '11. AI Agent & MCP Concepts' }, category: '11_claude_code', file: '11_vibecoding_agent_mcp.md' },
  { slug: '11_claude_code--22_agentic_design_patterns', title: { en: '22. Agentic Design Patterns', ja: '22. Agentic Design Patterns', 'zh-tw': '22. Agentic Design Patterns' }, category: '11_claude_code', file: '22_agentic_design_patterns.md' },
  { slug: '11_claude_code--23_mcp_server_dev_guide', title: { en: '23. MCP Server Development Guide', ja: '23. MCP Server Development Guide', 'zh-tw': '23. MCP Server Development Guide' }, category: '11_claude_code', file: '23_mcp_server_dev_guide.md' },
  { slug: '11_claude_code--24_claude_agent_sdk', title: { en: '24. Claude Agent SDK Guide', ja: '24. Claude Agent SDK Guide', 'zh-tw': '24. Claude Agent SDK Guide' }, category: '11_claude_code', file: '24_claude_agent_sdk.md' },
  { slug: '11_claude_code--25_skill_authoring_guide', title: { en: '25. Skill Authoring Guide', ja: '25. Skill Authoring Guide', 'zh-tw': '25. Skill Authoring Guide' }, category: '11_claude_code', file: '25_skill_authoring_guide.md' },

  // 12_diagrams
  { slug: '12_diagrams--00.Moyin_Group_Overview', title: { en: 'Moyin Group Overview (2026)', ja: 'Moyin Group Overview (2026)', 'zh-tw': 'Moyin Group Overview (2026)' }, category: '12_diagrams', file: '00.Moyin_Group_Overview.md' },
  { slug: '12_diagrams--07.Drama_Production_Workflow', title: { en: '07. Drama Production Workflow', ja: '07. Drama Production Workflow', 'zh-tw': '07. Drama Production Workflow' }, category: '12_diagrams', file: '07.Drama_Production_Workflow.md' },
  { slug: '12_diagrams--08.Moyin_MCP_Architecture', title: { en: '08. Moyin MCP Architecture', ja: '08. Moyin MCP Architecture', 'zh-tw': '08. Moyin MCP Architecture' }, category: '12_diagrams', file: '08.Moyin_MCP_Architecture.md' },
  { slug: '12_diagrams--09.Model_Studio_Integration', title: { en: '09. Model Studio Integration', ja: '09. Model Studio Integration', 'zh-tw': '09. Model Studio Integration' }, category: '12_diagrams', file: '09.Model_Studio_Integration.md' },
  { slug: '12_diagrams--10.StoryPack_Data_Flow', title: { en: '10. StoryPack Data Flow', ja: '10. StoryPack Data Flow', 'zh-tw': '10. StoryPack Data Flow' }, category: '12_diagrams', file: '10.StoryPack_Data_Flow.md' },
];

export function getArticlesByCategory(categoryId: string): Article[] {
  return articles.filter((a) => a.category === categoryId);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function getArticlePath(article: Article, locale: Locale = 'en'): string {
  return `/knowledge/${locale}/${article.category}/${article.file}`;
}
