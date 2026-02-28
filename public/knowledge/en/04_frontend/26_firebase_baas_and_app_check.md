# 26. Firebase BaaS & App Check: Pure Frontend Power

> **Type**: Serverless & Backend-as-a-Service guide  
> **Focus**: Launch an MVP without building Node APIs. Explore Firebase Firestore, Auth, Cloud Functions, Security Rules, and App Check for device attestation.

---

## Prelude: APIs are for the weak

Classic flow: Vue → axios → Node.js API → MySQL → JSON → Vue. Firebase cuts out the middleman.

---

## 1. Firebase’s triple firepower

### 1. Cloud Firestore

The NoSQL document store listens to `db.collection("users").doc("moyin").update({ age: 25 })` and instantly mutates the cloud.

- Offline-first: Actions made while offline queue and sync when back online.  
- Realtime listeners: `onSnapshot` auto-refreshes in 0.1 seconds when someone else posts to the chat—no WebSocket needed.

### 2. Firebase Auth

Forget building registration, password reset, token refresh. Call `signInWithPopup(GoogleAuthProvider)` and receive a secure JWT backed by Google.

### 3. Cloud Functions

Some sensitive operations (payment gateways, proprietary AI pipelines) still run on trusted servers. Deploy TypeScript functions and call them like local APIs from the frontend.

---

## 2. Security Rules: the gatekeeper

Without them, a hacker could open DevTools and `db.collection("users").doc("Admin").delete()` your database.

Define rules such as:

```javascript
match /users/{userId} {
  allow write: if request.auth != null && request.auth.uid == userId;
}
```

Firebase validates every request’s identity before permitting reads/writes.

---

## 3. App Check: device attestation

Bots can still mimic the Firebase SDK. App Check forces the device itself to swear authenticity.

- **Apple DeviceCheck/App Attest** verifies the request comes from an untampered iPhone App Store build.  
- **Play Integrity API** ensures the Android phone is not rooted or running in an emulator.  
- **reCAPTCHA Enterprise** fingerprints the browser for web clients.

Requests lacking this attestation token are obliterated at the network edge.

---

## 💡 Vibecoding directive

When commissioning an MVP that rewards tokens or needs live collaboration:

> “Do not leave Firestore rules in test mode (`allow read, write: if true`). Define RBAC-based rules tied to Firebase Auth. Enable App Check Enforcement with Play Integrity + reCAPTCHA v3 so only legitimately signed apps access production data.”
