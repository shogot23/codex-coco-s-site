# Test Cases

## Task

- task-id: TASK-gyakuten-kantoku-moriyasu-2026-05-31
- related plan: TASK-gyakuten-kantoku-moriyasu-2026-05-31

## Must Check

- [x] 「逆転監督 森保一」のギャラリー entry が公開対象として表示される
- [x] 「逆転監督 森保一」のレビュー entry が公開対象として表示される
- [x] ギャラリー詳細からレビュー詳細へ遷移できる
- [x] レビュー詳細からギャラリー詳細へ遷移できる
- [x] 購入リンクが `楽天で見る` として表示され、外部リンク属性が既存実装に乗る
- [x] もしもHTMLの impression image tag が frontmatter に混入していない
- [x] scope 外の UI / schema / 既存 content 変更が入っていない
- [x] 読書 with Coco のブランド方針に反していない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`（30 passed, 2 skipped）
- [x] `npm run verify:frontend`（30 passed, 2 skipped）

## Manual Checks

- [x] gallery 画像パスが `/uploads/gallery/books/Gyakuten_Kantoku_Moriyasu_Hajime_Kizaki_Shinya.png` を指す
- [x] infographic パスが `/uploads/review/infographic/gyakuten_kantoku_moriyasu_hajime_kizaki_shinya.png` を指す
- [x] review slug と gallery `relatedReview` が `gyakuten-kantoku-moriyasu-hajime` で一致している
- [x] gallery `description` にタイトルが混入していない
- [x] レビュー本文が問いか行動を残している

## Optional Checks

- [x] desktop / mobile のブラウザ確認で大きな崩れがない
- [x] Claude review gate で `ok: true`

## Out Of Scope

- UI コンポーネントの追加やデザイン変更
- 既存レビュー本文の修正
- CMS 設定変更
