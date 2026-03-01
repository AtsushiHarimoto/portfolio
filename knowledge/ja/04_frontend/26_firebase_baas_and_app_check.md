# 26. Firebase BaaS と App Check：純フロントエンドの狂宴

> **種類**: サーバーレス & Backend-as-a-Service  
> **重点**: Node.js API を書かずに MVP をローンチする。Firestore、Auth、Cloud Functions、Security Rules、App Check を組み合わせた防御戦略を学びます。

---

## 序章：API なんて弱者が使うもの

従来の流れは `Vue → axios → Node.js → MySQL → JSON → Vue`。Firebase はその煩雑さを切り落とします。

---

## 1. Firebase の三本の矢

### ① Cloud Firestore

`db.collection("users").doc("moyin").update({ age: 25 })` と書けばクラウドのデータが瞬時に更新されます。

- Offline-first：オフラインでも UI は即時反映し、接続回復後に同期。  
- Realtime listener：`onSnapshot()` で他ユーザーのチャットが 0.1 秒以内に反映。WebSocket 不要。

### ② Firebase Auth

認証メール、パスワードリセット、トークン管理を一から書く必要なし。`signInWithPopup(GoogleAuthProvider)` だけで、Google が署名済みの JWT が手に入ります。

### ③ Cloud Functions

決済や秘匿 AI パイプラインなどは前端に晒せない。TypeScript スクリプトを Cloud Functions にデプロイし、あたかもローカル関数のように呼び出します。

---

## 2. Security Rules：守護者のコード

```javascript
match /users/{userId} {
  allow write: if request.auth != null && request.auth.uid == userId;
}
```

このルールをクラウドに配置することで、ID が一致しないリクエストを Firebase が即座に遮断します。

---

## 3. App Check：デバイス証明

Firebase SDK を模倣するボットがいます。App Check はデバイス自身に「私は正規の端末です」と誓わせます。

- **Apple DeviceCheck/App Attest**：脱獄していない正規 iPhone であることを証明。  
- **Play Integrity API**：ルート化やエミュレータではない Android 端末のみ許可。  
- **reCAPTCHA Enterprise**：Web クライアントの指紋を弾く。  

これらにより生成されるトークンを持たないリクエストは、ネットワークレベルで破壊されます。

---

## 💡 Vibecoding の指示例

Firebase ベースのリアルタイム MVP を AI に依頼するとき：

> 「Security Rules を `allow read, write: if true` のままにしないでください。Firebase Auth に連動した RBAC ルールを定義し、App Check（Play Integrity + reCAPTCHA v3）を Enforcement モードで運用。偽のスニペットや改ざんされたアプリからのアクセスは一切許容しないでください。」
