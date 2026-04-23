# Test Cases

## Task

- task-id: `TASK-gallery-and-exercise-review-2026-04-23`
- related plan: `docs/tasks/TASK-gallery-and-exercise-review-2026-04-23/plan.md`

## Must Check

- [ ] 目的の変更が反映される
- [ ] scope 外の変更が入っていない
- [ ] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] `/gallery` に `終末のワルキューレ奇譚 ジャック・ザ・リッパーの事件簿 10` が表示される
- [ ] `/gallery` に `世界一効率がいい 最高の運動` が表示される
- [ ] ジャック・ザ・リッパー本の detail で購入リンクが表示される
- [ ] 運動本の gallery detail で `レビューを読む` 導線が表示される
- [ ] 運動本の review detail で infographic とレビュー本文が表示される
- [ ] 運動本の review detail に購入リンクが表示される

## Optional Checks

- [ ] 領域固有の追加確認: Reviews 一覧で新規 review が既存カード群に混ざって表示される
- [ ] frontend 変更時は `npm run verify:frontend`
- [ ] 既存の強い verify がある場合はそれも実行する: `claude-review-gate`

## Out Of Scope

- 今回やらない確認:
  - ジャック・ザ・リッパー本の review 新規作成
  - 他書籍の purchaseLinks や copy の見直し
