# 23. Security Architecture

> **Type**: Architectural blueprint  
> **Date**: 2026-02-26  
> **Status**: Outline  
> **Related**: `33_api_security_https_tls.md`, `37_oauth2_oidc_and_sso.md`

---

## Summary

Define Moyin’s holistic security stack—authentication/authorization, data protection, application security, infrastructure hygiene, and AI-specific guardrails. It complements the point documents under `05_backend/`.

---

## 1. Security layering model

```
┌──────────────────────────────────┐
│ Application Security            │ OWASP Top10, input validation
├──────────────────────────────────┤
│ Auth & Access Control           │ AuthN/AuthZ, RBAC
├──────────────────────────────────┤
│ Data Security                   │ Encryption, masking, backups
├──────────────────────────────────┤
│ Network Security                │ TLS, firewalls, DDoS protection
├──────────────────────────────────┤
│ Infrastructure Security         │ Container hardening, secret management
├──────────────────────────────────┤
│ AI-Specific Security            │ Prompt injection, data leakage
└──────────────────────────────────┘
```

---

## 2. Authentication & Authorization

### 2.1 Authentication

| Mechanism | Use case | Reference |
| :-------- | :------- | :-------- |
| JWT (Access + Refresh) | Web / mobile | `37_oauth2_oidc_and_sso.md` |
| API Key | Service-to-service, MCP | — |
| OAuth 2.0 / OIDC | Third-party sign-ins | `37_oauth2_oidc_and_sso.md` |

### 2.2 Authorization

| Model | Use | Notes |
| :---- | :-- | :--- |
| RBAC | General scenarios | Map roles to permissions |
| ABAC | Fine-grained control | Evaluate based on attributes |
| Resource-based | API resources | Owners / Sharees / Admins |

### 2.3 Token management

| Item | Policy |
| :-- | :---- |
| Access token lifetime | 15–30 minutes |
| Refresh token lifetime | 7–30 days |
| Storage | HttpOnly secure cookies (web), keychain (mobile) |
| Revocation | Blacklist or short-lived tokens + rotation |

---

## 3. Application security (OWASP Top 10)

| Threat | Defense | Practice |
| :----- | :----- | :------ |
| Injection | Parametrized queries, ORM, input validation | Never concatenate SQL |
| XSS | CSP, escaping, avoid `v-html` | Vue escapes by default |
| CSRF | SameSite cookies, CSRF tokens | All state-changing requests |
| Broken auth | Strong passwords, MFA, rate limiting | Limit login attempts |
| Sensitive data exposure | HTTPS, encryption at rest, minimize responses | No passwords in URLs |
| Misconfiguration | Disable debug, least privilege | Prod checklists |
| SSRF | Allowlist outbound URLs | Special care for MCP servers |

---

## 4. Data security

### 4.1 Encryption

| Layer | Standard |
| :---- | :------- |
| In transit | TLS 1.3 |
| At rest | AES-256 |
| Password storage | bcrypt / Argon2 |
| Secrets | Environment variables + secret managers |

### 4.2 Data classification

| Tier | Example | Treatment |
| :-- | :----- | :------ |
| Public | Product names, docs | No special controls |
| Internal | Business logic | Access controls |
| Confidential | User data, API keys | Encryption + auditing |
| Highly confidential | Passwords, payment info | Encryption + auditing + masking |

### 4.3 Sensitive files

```
Never commit to Git:
  - .env / .env.local
  - credentials.json / service-account.json
  - *.pem / *.key
  - hard-coded API keys

Use:
  - .gitignore
  - Env variables
  - Secret manager (Vault / AWS SSM / GCP Secret)
```

---

## 5. AI-specific security

### 5.1 Prompt injection

| Attack | Description | Defense |
| :----- | :---------- | :------ |
| Direct | User injects commands into input | Input sanitization, role separation |
| Indirect | Malicious external data | Source validation, tagged isolation |

### 5.2 Data leakage

| Risk | Defense |
| :-- | :-- |
| LLM echoes secrets | Output guardrails, profanity filters |
| Context contains secrets | Never include secrets in prompts |
| Agent reads unauthorized files | File access allowlists |

### 5.3 Agent behavior

| Risk | Defense |
| :-- | :-- |
| Unauthorized file writes | Approval rules in CLAUDE.md |
| Infinite loops / token bursts | Max iterations, token budgets |
| Supply chain attacks | Only trust approved MCP servers |
| Destructive actions | Require human approval |

---

## 6. Infrastructure security

### 6.1 Container hygiene

| Item | Standard |
| :--- | :------ |
| Base image | Minimal official image |
| Permissions | Run as non-root |
| Scanning | Regular vulnerability scans |

### 6.2 Secret management

| Environment | Tool |
| :-- | :-- |
| Local dev | `.env` + `.gitignore` |
| CI/CD | GitHub Secrets, pipeline vars |
| Production | Secret Manager (Vault, etc.) |

### 6.3 Monitoring

- Alert on anomalous logins  
- Monitor API call rates  
- Alert on spikes in error rate  
- Centralize security logs

---

## 7. Release security checklist

- All endpoints have auth/authz  
- Sensitive data encrypted in transit & at rest  
- No hard-coded secrets  
- CORS not `*`  
- CSP headers set  
- Rate limiting enabled  
- Input validation covers every input  
- Dependencies free of critical vulnerabilities  
- Agent actions constrained by permissions  
- Logs do not leak secrets

---

## 8. Related docs

| Section | Deep dive |
| :------ | :-------- |
| Auth & authz | `05_backend/37_oauth2_oidc_and_sso.md` |
| TLS / HTTPS | `05_backend/33_api_security_https_tls.md` |
| Agent safety | `11_claude_code/24_claude_agent_sdk.md` |
| MCP security | `11_claude_code/23_mcp_server_dev_guide.md` |

---

## To explore

- RBAC policy design  
- WAF selection  
- Penetration testing plan  
- GDPR / PDPA compliance  
- AI red teaming methodology
