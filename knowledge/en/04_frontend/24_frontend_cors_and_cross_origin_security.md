# 24. CORS & Cross-Origin Security: Guarding the Web

> **Type**: Frontend/backend security fundamentals  
> **Focus**: CORS errors look like a broken API, but browsers are protecting the user. Learn Same-Origin Policy, preflight OPTIONS, and how to whitelist origins safely to prevent CSRF and credential leaks.

---

## Prelude: why Postman works but Chrome blocks your call

You send `fetch("https://api.moyin.com")` from the page and Chrome raises:  
`Access to fetch at '...' from origin '...' has been blocked by CORS policy`.  
Postman can hit the endpoint, so nobody is wrong—the browser is enforcing the Same-Origin Policy (SOP) to protect the user.

---

## 1. The SOP origin cage

Browsers enforce: a page from origin A cannot read responses from origin B unless the server allows it. An “origin” equals protocol + hostname + port, so even a different subdomain counts as cross-origin.

Imagine `hacker.com` fetching `https://bank.com/api/balance` while you are signed into the bank. Without SOP, the greedy script could drain and display your balance instantly. Chrome intercepts that and surfaces a CORS error. This is about safeguarding the **client**, not the server. The API did respond—it’s just trapped by Chrome.

---

## 2. Issuing travel visas: CORS headers

Modern stacks run the frontend at `www.moyin.com` and the API at `api.moyin.com`—still cross-origin. The backend must issue a “CORS visa.”

### Preflight OPTIONS

Before a risky request (e.g., `POST` with JSON/Authorization), the browser sends an `OPTIONS` probe:
“Hey, I’m from `www.moyin.com`; may I send a `POST`?”

### Headers that grant entry

The API must respond with headers such as:

- `Access-Control-Allow-Origin: https://www.moyin.com`  
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`

Once Chrome verifies the origin matches, it releases the real POST.

---

## 3. Hardened defenses

Avoid the “open vault” CORS:

```http
Access-Control-Allow-Origin: *
```

That line lets any rogue site read sensitive member APIs—effectively unlocking your vault.

### Security matrix

1. **Strict whitelist** – Backend code should maintain `ALLOWED_ORIGINS = ['https://moyin.com', 'https://admin.moyin.com']` and reject others with `403 Forbidden`.  
2. **No credentials unless necessary** – Don’t enable `Access-Control-Allow-Credentials: true` unless you really need it. When set, browsers will allow cookies on cross-origin requests, which fuels CSRF attacks.  
3. **SameSite cookies** – Mark authentication cookies with `SameSite=Strict` or `Lax` so third-party requests cannot carry them, surgically stopping cross-site exploits.

---

## 💡 Vibecoding directive

When the AI engineer configures gateway middleware:

> “Never set `Access-Control-Allow-Origin: *`. Build a whitelist-driven CORS policy that only allows our domains plus preview URLs, and keep OPTIONS responses minimal. Don’t sacrifice security for convenience.”
