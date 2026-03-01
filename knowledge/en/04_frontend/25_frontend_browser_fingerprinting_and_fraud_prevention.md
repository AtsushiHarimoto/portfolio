# 25. Browser Fingerprinting & Frictionless Anti-Fraud

> **Type**: Dark UX & anti-fraud science  
> **Focus**: When malicious scripts mimic Chrome to scrape your API, expose how browser fingerprinting, reCAPTCHA v3, and device tokens lock them out while letting real users through.

---

## Prelude: cookies die, fingerprints persist

Cookies/LocalStorage are easily cleared. A bot clears them, registers a thousand accounts, and spree-scrapes your site. What they cannot erase in 0.1 seconds is the browser/device fingerprint your frontend already collected.

---

## 1. Fingerprint anatomy

You have access to hundreds of harmless-seeming APIs. Combined as entropy, they uniquely identify almost every visitor.

### Canvas fingerprinting

Draw a complex gradient with emoji fonts on an offscreen canvas. Each GPU driver, OS font renderer, and antialiasing routine tweaks the pixels a little differently. Hash the result—unless they swap computers, the hash stays the same even if they use Incognito or change IPs.

### Audio/WebGL fingerprints

Generate a short high-frequency tone via AudioContext, analyze how the sound card processes it, query `navigator.hardwareConcurrency`, screen resolution, etc. Glue these features together and the attacker is pinned to a single identity. Major ad platforms already use these signals for targeting.

---

## 2. Anti-fraud stack

When credential stuffing hits Moyin’s login page at 100k attempts per second, IP blocking is insufficient.

### Legacy CAPTCHA

“Select all traffic lights” is a human unfriendly obstacle and is easily beating by modern vision models. That approach is dead.

### Invisible defense

reCAPTCHA v3 / Cloudflare Turnstile evaluates users without showing checkboxes.

1. **Mouse math**: Real mouse paths wiggle and follow Bezier-like curves. Scripts produce perfect straight lines.  
2. **Fingerprint correlation**: Google can see if the visitor’s fingerprint matches a human browsing session minutes earlier.  
3. **Proof-of-work**: Advanced turnstiles push a CPU-costly challenge to the browser, which normal phones survive but botnets cannot.

These defenses mint a **reputation token** that the backend only accepts for registration. Tokens below the threshold get rejected.

---

## 💡 Vibecoding directive

When AI architects a high-risk registration flow:

> “Don’t rely on SMS alone. In bytes of the frontend, embed Cloudflare Turnstile or reCAPTCHA v3. Send fingerprints and interaction scores as background telemetry. The backend must verify the reputation token against Google and reject any request scoring below 0.7 with 403.”
