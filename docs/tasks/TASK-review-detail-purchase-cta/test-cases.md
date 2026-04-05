# Test Cases

## Task

- task-id: TASK-review-detail-purchase-cta
- related plan: `docs/tasks/TASK-review-detail-purchase-cta/plan.md`

## Must Check

- [ ] review detail の opening purchase CTA が購入先数に応じた導線になっている
- [ ] Reading Shelf への導線と本文導線の優先度が崩れていない
- [ ] 対象差分が task 文書 4 件と `src/pages/reviews/[slug].astro` に限定されている

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] desktop で review detail の opening actions が 1 画面内で読める
- [ ] mobile で purchase CTA が過度に強くならず押しやすい
- [ ] purchaseLinks が単一の review では外部ストアへ、複数の review では Reading Shelf へ迷わず進める

## Optional Checks

- [ ] CTA 専用 e2e 追加の必要性を別 task 候補としてメモする
- [ ] `Astro.site!` の non-null assertion advisory を review gate の残リスクとして扱うか確認する

## Out Of Scope

- reviews 一覧やトップページの purchase CTA 調整
- content data の purchaseLinks 追加 / 変更
- Playwright spec の新設や大幅改修
