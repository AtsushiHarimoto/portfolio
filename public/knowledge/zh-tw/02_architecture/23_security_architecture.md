# 23. 安全架構設計

> **類型**: 架構設計
> **日期**: 2026-02-26
> **狀態**: 骨架
> **關聯**: `33_api_security_https_tls.md`、`37_oauth2_oidc_and_sso.md`

---

## 摘要

定義 Moyin 專案的整體安全架構，涵蓋認證授權、數據保護、應用安全、基礎設施安全與 AI 特有安全考量。與 `05_backend/` 中的單點安全文檔互補，提供全局視角。

---

## 1. 安全分層模型

```
┌──────────────────────────────────┐
│  Application Security (應用層)    │  OWASP Top 10、輸入驗證
├──────────────────────────────────┤
│  Auth & Access Control (認證授權)  │  AuthN、AuthZ、RBAC
├──────────────────────────────────┤
│  Data Security (數據層)           │  加密、脫敏、備份
├──────────────────────────────────┤
│  Network Security (網路層)        │  TLS、防火牆、DDoS
├──────────────────────────────────┤
│  Infrastructure (基礎設施)        │  容器安全、Secret 管理
├──────────────────────────────────┤
│  AI-Specific Security (AI 安全)   │  Prompt Injection、數據洩露
└──────────────────────────────────┘
```

---

## 2. 認證與授權

### 2.1 認證 (Authentication)

| 方案 | 適用場景 | 參考 |
|------|----------|------|
| JWT (Access + Refresh Token) | Web / Mobile App | `37_oauth2_oidc_and_sso.md` |
| API Key | 服務間通訊、MCP Server | — |
| OAuth 2.0 / OIDC | 第三方登入 | `37_oauth2_oidc_and_sso.md` |

### 2.2 授權 (Authorization)

| 模型 | 適用場景 | 說明 |
|------|----------|------|
| RBAC | 大多數場景 | Role → Permission 映射 |
| ABAC | 細粒度控制 | Attribute-Based，按屬性動態判斷 |
| Resource-Based | API 資源 | 擁有者 / 共享者 / 管理員 |

### 2.3 Token 管理

| 項目 | 規範 |
|------|------|
| Access Token 有效期 | 15–30 分鐘 |
| Refresh Token 有效期 | 7–30 天 |
| 儲存方式 | HttpOnly Secure Cookie（Web）/ Keychain（Mobile） |
| Token 撤銷 | 黑名單機制 或 短期 Token + Rotation |

---

## 3. 應用安全 (OWASP Top 10)

| 威脅 | 防禦措施 | 實踐要點 |
|------|----------|----------|
| **Injection** (SQL/NoSQL/Command) | 參數化查詢、ORM、輸入驗證 | 永不拼接 SQL |
| **XSS** | CSP Header、輸出轉義、避免 `v-html` | Vue 預設已轉義 |
| **CSRF** | SameSite Cookie、CSRF Token | 所有 state-changing 請求 |
| **Broken Auth** | 強密碼策略、MFA、Rate Limiting | 登入嘗試限制 |
| **Sensitive Data Exposure** | HTTPS、加密 at rest、最小化回傳 | 不在 URL 中傳密碼 |
| **Security Misconfiguration** | 預設關閉 Debug、最小權限 | 生產環境檢查清單 |
| **SSRF** | 白名單 URL、禁止內網存取 | MCP Server 特別注意 |

---

## 4. 數據安全

### 4.1 加密策略

| 場景 | 方案 |
|------|------|
| 傳輸中 (In Transit) | TLS 1.3 |
| 靜態 (At Rest) | AES-256 |
| 密碼儲存 | bcrypt / Argon2 (不可逆) |
| API Key / Secret | 環境變數 + Secret Manager |

### 4.2 數據分級

| 級別 | 範例 | 處理要求 |
|------|------|----------|
| 公開 | 產品名稱、公開文檔 | 無特殊要求 |
| 內部 | 業務邏輯、內部文檔 | 存取控制 |
| 機密 | 用戶資料、API Key | 加密 + 審計 |
| 高機密 | 密碼、支付資訊 | 加密 + 審計 + 脫敏 |

### 4.3 敏感檔案管理

```
禁止提交到 Git:
  - .env / .env.local
  - credentials.json / service-account.json
  - *.pem / *.key
  - API Key 硬編碼

使用:
  - .gitignore 排除
  - 環境變數注入
  - Secret Manager (Vault / AWS SSM / GCP Secret)
```

---

## 5. AI 特有安全考量

### 5.1 Prompt Injection

| 攻擊類型 | 描述 | 防禦 |
|----------|------|------|
| Direct Injection | 用戶直接在輸入中注入惡意指令 | 輸入過濾、角色隔離 |
| Indirect Injection | 透過外部數據（網頁、檔案）注入 | 數據來源驗證、標記隔離 |

### 5.2 數據洩露

| 風險 | 防禦 |
|------|------|
| LLM 回傳敏感資訊 | Output Guardrail、敏感詞過濾 |
| Context 中包含 Secret | 不將 Secret 放入 Prompt |
| Agent 讀取不該碰的文件 | 檔案存取白名單 |

### 5.3 Agent 行為安全

| 風險 | 防禦 |
|------|------|
| 未授權的檔案修改 | CLAUDE.md 中的審批規則 |
| 無限循環 / Token 爆破 | 最大迭代數、Token Budget |
| 供應鏈攻擊（惡意 MCP Server） | 只使用受信任的 MCP Server |
| 未經確認的破壞性操作 | 敏感操作需人工確認 |

---

## 6. 基礎設施安全

### 6.1 容器安全

| 項目 | 規範 |
|------|------|
| Base Image | 使用官方最小化 Image |
| 權限 | 非 root 運行 |
| 掃描 | 定期 Image 漏洞掃描 |

### 6.2 Secret 管理

| 環境 | 方案 |
|------|------|
| 本地開發 | `.env` + `.gitignore` |
| CI/CD | GitHub Secrets / Pipeline Variables |
| 生產 | Secret Manager (HashiCorp Vault 等) |

### 6.3 安全監控

- 異常登入告警
- API 呼叫頻率監控
- 錯誤率突增告警
- 安全日誌集中收集

---

## 7. 安全檢查清單（Release 前）

- [ ] 所有 API 端點都有認證 / 授權
- [ ] 敏感數據已加密（傳輸 + 儲存）
- [ ] 無硬編碼的 Secret / API Key
- [ ] CORS 配置正確（非 `*`）
- [ ] CSP Header 已設定
- [ ] Rate Limiting 已啟用
- [ ] 輸入驗證覆蓋所有用戶輸入
- [ ] 依賴套件無已知高危漏洞
- [ ] Agent 操作有權限約束
- [ ] 日誌不包含敏感資訊

---

## 8. 與現有文檔的關係

| 本文章節 | 深入文檔 |
|----------|----------|
| 認證授權 | `05_backend/37_oauth2_oidc_and_sso.md` |
| TLS / HTTPS | `05_backend/33_api_security_https_tls.md` |
| Agent 安全 | `11_claude_code/24_claude_agent_sdk.md` (Guardrails) |
| MCP 安全 | `11_claude_code/23_mcp_server_dev_guide.md` (安全考量) |

---

## 待深入

- [ ] 具體 RBAC 權限表設計
- [ ] WAF (Web Application Firewall) 選型
- [ ] 滲透測試計畫與工具
- [ ] GDPR / 個資法合規要求
- [ ] AI Red Teaming 方法論
