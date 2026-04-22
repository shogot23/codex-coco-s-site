# Test Cases

## Task

- task-id: TASK-3books-lp-copy-refresh
- related plan: `docs/tasks/TASK-3books-lp-copy-refresh/plan.md`

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

- [ ] 変更箇所を目視確認する
- [ ] SNS から来た人向けの導入として自然に読めるか確認する
- [ ] 購入導線よりレビュー導線が主であることを確認する

## Optional Checks

- [ ] 領域固有の追加確認: トップのトーンがやわらかく静かなままか確認する
- [ ] frontend 変更時は `npm run verify:frontend`
- [ ] 既存の強い verify がある場合はそれも実行する

## Out Of Scope

- 今回やらない確認: 書籍カード本文の再設計、デザインやスタイルの見直し
