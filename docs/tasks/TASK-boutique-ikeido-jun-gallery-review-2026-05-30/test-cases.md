# Test Cases

## Task

- task-id: TASK-boutique-ikeido-jun-gallery-review-2026-05-30
- related plan: TASK-boutique-ikeido-jun-gallery-review-2026-05-30

## Must Check

- [x] 「ブティック」のギャラリー entry が公開対象として表示される
- [x] 「ブティック」のレビュー entry が公開対象として表示される
- [x] ギャラリー詳細からレビュー詳細へ遷移できる
- [x] レビュー詳細からギャラリー詳細へ遷移できる
- [x] 購入リンクが `楽天で見る` として表示され、外部リンク属性が既存実装に乗る
- [x] scope 外の UI / schema / 既存 content 変更が入っていない
- [x] 読書 with Coco のブランド方針に反していない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`（30 passed, 2 skipped）
- [x] `npm run verify:frontend`（30 passed, 2 skipped）

## Manual Checks

- [x] gallery 画像パスが `/uploads/gallery/books/Boutique_Ikeido_Jun.png` を指す
- [x] infographic パスが `/uploads/review/infographic/boutique_ikeido_jun.png` を指す
- [x] review slug と gallery `relatedReview` が `boutique-ikeido-jun` で一致している
- [x] レビュー本文が問いか行動を残している

## Optional Checks

- [x] desktop / mobile のスクリーンショットで大きな崩れがない
- [x] Claude review gate で `ok: true`

## Out Of Scope

- UI コンポーネントの追加やデザイン変更
- 既存レビュー本文の修正
- CMS 設定変更
