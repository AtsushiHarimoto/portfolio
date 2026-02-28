# 37. Who Exactly Are You? The Great Authorization Brawl and the Key to SSO (OAuth 2.0 / OIDC)

> **Type**: System Architecture Level Security Protocol
> **Focus**: Shattering the biggest myth in the industry: **"OAuth 2.0 is NOT for logging in at all!"** This article deeply analyzes the massive authorization empire woven by OAuth 2.0 and OpenID Connect (OIDC) behind "Sign in with Google" across the entire internet and "Single Sign-On (SSO)" in corporate offices today.

---

## Prelude: Don't Hand Your Front Door Key to a Third-Party App

More than a decade ago, if you registered for a new social network (like an early flash game site), it would ask you: "Please enter your Yahoo email account and password, and we'll help you find out who among your contacts is also playing!"
This was an extremely horrifying disaster. To make one or two friends, you handed over the "High Priest's Key"—which could view your private emails or even reset your bank passwords—completely intact to a third party!

To solve this **"all-or-nothing" password streaking**, **OAuth 2.0 (Open Authorization Protocol)** was born.

---

## 1. OAuth 2.0: Issuing a "Visitor Pass" with an Expiration Date

You must engrave this sentence in your mind: **OAuth 2.0 handles "Authorization"; it is not responsible for "Authentication" (verifying who you are)**.

### 🎟️ The Hotel Valet

When the Moyin App wants to get permission to access your Google Drive for one hour, it won't ask for your password.

1. The Moyin App redirects you to Google's front door (Authorization Server).
2. Google asks you: "This guy Moyin wants to 'only read' your Google Drive. Do you agree?"
3. You click agree, and Google immediately issues Moyin a "valet parking card" called an **`Access Token`**.
4. Holding this Access Token, Moyin can freely drive your car away (read files) within the next few hours. But Moyin can absolutely never open your trunk (read Gmail emails), because the permission scope (Scope) of this magnetic card is rigidly locked down.

**Here is the blind spot**: This `Access Token` is often just like a physical key fob; it **"has absolutely no print of your name or profile picture on it!"** Moyin drove your car away, but it only knows "I have the permission to drive." It doesn't even know the name or email of the boss (you) it is currently serving!

---

## 2. Putting on an ID Card: The Descent of OpenID Connect (OIDC)

Since OAuth 2.0 is just an authorization tag for valet parking, how do all the "Sign in with Google" buttons on websites all over the world today actually know what my name is?

This relies on a **"patch protocol" built on top of OAuth 2.0**, named **OpenID Connect (OIDC)**.

### 🆔 The Attached ID Card (ID Token)

OIDC cleverly utilizes the OAuth 2.0 flow, except that at the exact same time Google sends that `Access Token`, it forces Google to **"also stuff a photo ID card named `ID Token` to you!"**
This `ID Token` is uniformly regulated across the globe, and its appearance is the **JWT (JSON Web Token)** that everyone is most familiar with!

- The Moyin App rips open this string of JWT and sees clearly written inside (Claims):
  - `sub`: "87654321" (This guy's universally unique identifier)
  - `name`: "Atsushi Harimoto"
  - `email`: "atsushi@example.com"
  - `iss`: "https://accounts.google.com" (This ID card is issued by the Jade Emperor Google, absolutely authentic!)

Moyin happily prints your name in the top right corner of its webpage and creates a file in its own database. This is the complete truth of modern "Third-Party Login"!

---

## 3. The Omniscient and Omnipotent Global Pass: SSO (Single Sign-On)

When an enterprise internally possesses 50 different internal systems (leave system, reimbursement system, meeting system), employees logging in by typing their account and password 50 times a day would cause a complete breakdown.

**SSO (Single Sign-On)** is an architectural concept: "As long as you log into one headquarter system, the front doors of all branch office buildings automatically open for you."
In the modern era, this magic is mostly realized by the OIDC protocol paired with a centralized "Identity Provider (IdP) like Auth0, Okta, or Microsoft's Azure AD."

### 🏰 The Operation of a Transnational Passport (Central Authentication)

When you open the "leave system `a.com`" on your first day of work:

1. `a.com` finds it doesn't recognize you, and immediately kicks you back to the headquarter's "Guardhouse `idp.company.com`."
2. The guardhouse asks you to type your account and password, and issues you a Cookie (Headquarter Visa) stored under the `idp.company.com` domain.
3. The guardhouse sends you back to `a.com`, and stuffs an `ID Token (JWT)` in your pocket.
   In the afternoon, you open the "reimbursement system `b.com`" on another domain:
4. `b.com` also doesn't recognize you! It kicks you back to the "Guardhouse `idp.company.com`" once again.
5. A miracle happens! The guardhouse sees that you already have the "Headquarter Visa Cookie" issued in the morning on your person. Without even asking, it **"directly issues you another brand new ID Token within one second" and forcibly bounces you back to `b.com`!**
   From your perspective, you merely clicked open a new webpage, the screen flashed for a second, and you "logged in passwordlessly" directly to the reimbursement system. This is the Grand Line of cross-domain SSO!

---

## 💡 Vibecoding Instructions

When bossing around AI to set up foolproof authentication checkpoints for enterprises or even B2C websites, please demonstrate the depth of your domain:

> 🗣️ `"When you are writing the authentication layer for this Moyin backend management dashboard, do not hand-code a database password collision routine from scratch! We will comprehensively introduce the [SSO Single Sign-On Architecture]. Please directly interface with Auth0 or Keycloak as our IdP (Identity Provider) for me. And ensure that you fully implement the [OAuth 2.0 Authorization Code Flow] based on the PKCE extension attribute within the frontend framework (Vue/React), in order to extract the [OIDC Specification ID Token (JWT format)] containing our employees' Email and other Claims roles to establish their local Session!"`
