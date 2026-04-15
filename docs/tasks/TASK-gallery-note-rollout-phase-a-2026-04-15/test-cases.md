# Test Cases: Gallery Note Rollout Phase A

## Automatic Verification

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`
4. `npm run test:e2e` if any rendering risk appears during verification

## Manual Checks

1. 対象ページで Hero が `description` を表示する
2. What Lingers が `note` を表示する
3. `note !== description` により Hero の scene-memo が表示される
4. review-bridge はレビューなしページとして「レビュー一覧を見る」を表示する
5. 購入リンクボタンは表示されない
6. 関連シーンカードで `note` が優先表示される

## Exclusions to Confirm

1. Phase B の 5ページで `relatedReview` を追加していない
2. `needs_review` の値を変更していない
3. 未公開ページを変更していない
