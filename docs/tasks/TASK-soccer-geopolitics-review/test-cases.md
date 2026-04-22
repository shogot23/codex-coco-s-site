# Test Cases

## Task

- task-id: `TASK-soccer-geopolitics-review`
- related plan: `docs/tasks/TASK-soccer-geopolitics-review/plan.md`

## Must Check

- [ ] 目的の変更が反映される
- [ ] scope 外の変更が入っていない
- [ ] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [ ] `npm run typecheck`
- [ ] `npm run build`

## Manual Checks

- [ ] 変更箇所を目視確認する
- [ ] 関連リンク / 導線 / 文言を確認する

## Optional Checks

- [ ] 領域固有の追加確認: Gallery から Review、Review から Gallery へ相互遷移できる
- [ ] frontend 変更時は `npm run verify:frontend`
- [ ] 既存の強い verify がある場合はそれも実行する

## Out Of Scope

- 今回やらない確認: トップページの並び順や他レビューの文面調整
