# Test Cases

## Task

- task-id: TASK-review-reading-compass
- related plan: `docs/tasks/TASK-review-reading-compass/plan.md`

## Must Check

- [x] `/reviews/` に Reading Compass section が表示される。
- [x] 「気分から選ぶ」「モヤモヤから選ぶ」「気づきから選ぶ」の3軸が表示される。
- [x] Reading Compass のリンクからレビュー詳細へ遷移できる。
- [x] 既存の hero、featured review、review stream が表示される。
- [x] purchaseLinks が主導線になっていない。
- [x] scope 外の変更が入っていない。

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktop で `/reviews/` の Reading Compass と CTA 到達性を確認する。
- [x] mobile で横スクロールや大きな崩れがないことを確認する。
- [x] ブランド文書に沿い、煽り・ランキング・購入主導になっていないことを確認する。

## Optional Checks

- [x] `claude-review-gate` の artifact と `ok: true` を確認する。

## Out Of Scope

- 今回やらない確認: URL state filter、検索、schema migration、全レビュー taxonomy 整備。
