# Test Cases

## Task

- task-id: TASK-reviews-multi-purchase-links-2026-04-10
- related plan: `docs/tasks/TASK-reviews-multi-purchase-links-2026-04-10/plan.md`

## Must Check

- [x] `/reviews` の `ひゃくえむ。` カードで `purchaseLinks` 2 件が表示される
- [x] 他レビューの購入リンク表示が崩れていない
- [x] scope 外の slug 特例や他ページ改修が入っていない

## Command Checks

- [x] `npm run typecheck`
- [x] `npm run build`

## Manual Checks

- [x] `src/content/reviews/hyakuemu.md` に上巻・下巻 2 件がある
- [x] `/reviews` でラベルが frontmatter の値のまま出る
- [x] 狭い幅でも action 群が不自然に詰まらない

## Optional Checks

- [x] 領域固有の追加確認: `npm run verify:frontend`
- [x] frontend 変更時は `npm run verify:frontend`
- [x] 該当なし: この task の verify は `npm run verify:frontend` を最上位とする

## Out Of Scope

- `/reviews/[slug]` や `/` の purchaseLinks 複数表示対応
- 新規 e2e テスト追加
