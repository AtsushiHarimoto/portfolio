# 23. セキュリティアーキテクチャ

> **種類**: アーキテクチャ  
> **日付**: 2026-02-26  
> **ステータス**: 骨子  
> **関連**: `33_api_security_https_tls.md`, `37_oauth2_oidc_and_sso.md`

---

## 概要

認証・認可、データ保護、アプリケーション安全、インフラ安全、AI 特有の対策を含む Moyin の全体像を述べ、`05_backend/` の点在するセキュリティ資料を補完します。

---

## 1. セキュリティ層モデル

```
┌────────────────────────────┐
│ Application Security        │ OWASP Top10、入力検証
├────────────────────────────┤
│ Auth & Access Control       │ AuthN/AuthZ、RBAC
├────────────────────────────┤
│ Data Security               │ 暗号化、マスキング、バックアップ
├────────────────────────────┤
│ Network Security            │ TLS、ファイアウォール、DDoS
├────────────────────────────┤
│ Infrastructure Security     │ コンテナ安全、シークレット管理
├────────────────────────────┤
│ AI-Specific Security        │ Prompt Injection、データ漏洩
└────────────────────────────┘
```

---

## 2. 認証と認可

### 2.1 認証

| 手段 | ケース | 参照 |
| :-- | :-- | :-- |
| JWT（Access/Refresh） | Web / モバイル | `37_oauth2_oidc_and_sso.md` |
| API Key | サービス間通信、MCP | — |
| OAuth 2.0 / OIDC | サードパーティログイン | `37_oauth2_oidc_and_sso.md` |

### 2.2 認可

| モデル | 用途 | 備考 |
| :-- | :-- | :-- |
| RBAC | 標準シナリオ | ロール ↔ 権限 |
| ABAC | 微細な制御 | 属性ベースで動的判断 |
| Resource-Based | API リソース | 所有者、共有者、管理者 |

### 2.3 トークン管理

| 項目 | ポリシー |
| :-- | :-- |
| Access トークン寿命 | 15～30 分 |
| Refresh トークン | 7～30 日 |
| 保管 | Web：HttpOnly Cookie、Mobile：Keychain |
| 廃止 | ブラックリストまたは短期トークン+ローテーション |

---

## 3. アプリケーションセキュリティ（OWASP Top10）

| 脅威 | 防御 | 実践 |
| :-- | :-- | :-- |
| Injection | パラメータ化クエリ、ORM、入力検証 | SQL を文字列連結しない |
| XSS | CSP、エスケープ、`v-html` を避ける | Vue はデフォルトでエスケープ |
| CSRF | SameSite Cookie、CSRF トークン | 状態変更リクエスト全部 |
| Broken Auth | 強制パスワード、MFA、レート制限 | ログイン試行制限 |
| Sensitive Data Exposure | HTTPS、At Rest 暗号化、最小応答 | URL にパスワードを載せない |
| Misconfiguration | デバッグ無効、最小権限 | 本番チェックリスト |
| SSRF | URL ホワイトリスト、内部網禁止 | MCP Server 特別注意 |

---

## 4. データセキュリティ

### 4.1 暗号化

| 層 | 方針 |
| :-- | :-- |
| In Transit | TLS 1.3 |
| At Rest | AES-256 |
| パスワード | bcrypt / Argon2 |
| API Key / Secret | 環境変数 + Secret Manager |

### 4.2 データ分類

| レベル | 例 | 取り扱い |
| :-- | :-- | :-- |
| 公開 | 製品名、公開資料 | 特になし |
| 内部 | 業務ロジック | アクセス制御 |
| 機密 | ユーザーデータ、API Key | 暗号化 + 監査 |
| 高機密 | パスワード、決済情報 | 暗号化 + 脱敏 + 監査 |

### 4.3 機密ファイル

```
Git へ push 禁止:
  - .env / .env.local
  - credentials.json / service-account.json
  - *.pem / *.key
  - ハードコードされた API Key

利用:
  - .gitignore
  - 環境変数注入
  - Secret Manager（Vault / AWS SSM / GCP Secret）
```

---

## 5. AI 特有のセキュリティ

### 5.1 Prompt Injection

| 攻撃 | 説明 | 防御 |
| :-- | :-- | :-- |
| 直接注入 | ユーザーが入力に悪意の命令 | 入力フィルタ、ロール分離 |
| 間接注入 | 外部データ経由 | ソース検証、タグ隔離 |

### 5.2 データ漏洩

| リスク | 防御 |
| :-- | :-- |
| LLM が秘密を吐く | Output Guardrail、フィルタリング |
| Context に secret | Prompt へ秘密を含めない |
| エージェントが不正ファイル | ファイルアクセス allowlist |

### 5.3 Agent 行動安全

| リスク | 防御 |
| :-- | :-- |
| 無許可編集 | CLAUDE.md の承認ルール |
| 無限ループ / Token 爆発 | 最大 iteration、token budget |
| サプライチェーン攻撃 | 信頼済 MCP Server のみ |
| 検証なし破壊操作 | 人的承認必須 |

---

## 6. インフラ安全

### 6.1 コンテナ安全

| 項目 | 基準 |
| :-- | :-- |
| Base Image | 最小限の公式イメージ |
| 権限 | 非 root 実行 |
| スキャン | 定期脆弱性スキャン |

### 6.2 Secret 管理

| 環境 | ソリューション |
| :-- | :-- |
| ローカル | `.env` + `.gitignore` |
| CI/CD | GitHub Secrets / パイプライン変数 |
| 本番 | Secret Manager (Vault 等) |

### 6.3 監視

- 異常ログインアラート  
- API 呼び出し頻度監視  
- エラー率スパイクアラート  
- セキュリティログの集中收集

---

## 7. リリース前チェックリスト

- すべてのエンドポイントに認証／認可が実装されている  
- 機密データが通信・保存とも暗号化されている  
- 秘密情報がハードコードされていない  
- CORS が `*` ではない  
- CSP ヘッダが設定済み  
- レート制限がオン  
- すべての入力に対して検証が実施されている  
- 依存に重大脆弱性がない  
- Agent の操作には権限制御がある  
- ログに機密情報が含まれない

---

## 8. 関連資料

| セクション | 深堀 |
| :-- | :-- |
| 認証・認可 | `05_backend/37_oauth2_oidc_and_sso.md` |
| TLS / HTTPS | `05_backend/33_api_security_https_tls.md` |
| Agent 安全 | `11_claude_code/24_claude_agent_sdk.md` |
| MCP 安全 | `11_claude_code/23_mcp_server_dev_guide.md` |

---

## 今後の検討

- RBAC ポリシー設計  
- WAF 選定  
- ペネトレーションテストプラン  
- GDPR / 個人情報法対応  
- AI Red Teaming 方法論
