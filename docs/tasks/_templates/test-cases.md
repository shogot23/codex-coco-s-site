# Test Cases

## Task

- task-id:
- related plan:

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

- [ ] 領域固有の追加確認:
- [ ] frontend 変更時は `npm run verify:frontend`
- [ ] 既存の強い verify がある場合はそれも実行する

## Out Of Scope

- 今回やらない確認:
