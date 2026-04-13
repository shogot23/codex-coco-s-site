# Test Cases: Gallery Review Note Rollout

## 自動テスト

### 1. Build Verification
- `npm run build` が成功すること
- 全 gallery ページが静的生成されること

### 2. Type Check
- `npm run typecheck` が成功すること
- note フィールドが optional string として認識されること

### 3. Lint
- `npm run lint` が成功すること

### 4. E2E
- `npm run test:e2e` が通ること

## 手動確認項目

### 5. Hero / What Lingers 分離確認
各5ページで:
- Hero セクションに description が表示されること
- What Lingers セクションに note が表示されること
- 両者が異なるテキストであること

### 6. 関連シーンカード確認
- note を持つ gallery の関連シーンカードに note 文が表示されること

### 7. 基準実装との整合性
- `autobiography-buffon` と同じ挙動であること

### 8. レビューブリッジ確認
- review-bridge に「レビューを読む」CTA が表示されること
- 購入リンクが表示されること

### 9. PC / Mobile レイアウト
- 5ページで崩れがないこと
