# Test Cases

## Task

- task-id: `TASK-gallery-review-rollout-phase-b-2026-04-15`
- related plan: `docs/tasks/TASK-gallery-review-rollout-phase-b-2026-04-15/plan.md`

## Must Check

- [ ] 5件の review 詳細ページが生成される
- [ ] 5件の gallery 詳細から対応 review へ遷移できる
- [ ] 5件の gallery 詳細で購入リンクボタンが表示される
- [ ] scope 外の変更が入っていない
- [ ] 既存の主要導線や既存文言トーンとの整合が崩れていない

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] 各 review のタイトル・著者・description・excerpt・readingCompass・purchaseLinks を確認する
- [ ] 各 gallery で `relatedReview` により Hero scene-memo が非表示になることを確認する
- [ ] `/reviews/` に 5件が追加されることを確認する

## Optional Checks

- [ ] 変更 5件の review body を目視で読み、過度に断定的・事実誤認がないことを確認する
- [ ] build 出力の review / gallery HTML を spot check する

## Out Of Scope

- 一覧ページやテンプレートの追加改修
- Phase B 対象外の review 本文作成
