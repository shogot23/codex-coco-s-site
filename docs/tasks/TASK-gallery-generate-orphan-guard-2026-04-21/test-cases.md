# Test Cases

## Task

- task-id: TASK-gallery-generate-orphan-guard-2026-04-21
- related plan: `docs/tasks/TASK-gallery-generate-orphan-guard-2026-04-21/plan.md`

## Must Check

- [x] manifest 未登録の既存 gallery markdown が `gallery:generate` で不用意に削除されない
- [x] manifest 登録済みの gallery entry 生成・更新フローが維持される
- [x] scope 外の gallery content / review content は変更されない

## Command Checks

- [x] `npm run typecheck`
- [x] `npm run build`

## Manual Checks

- [x] 変更箇所を目視確認する
- [x] 削除条件のログや分岐が意図どおりか確認する

## Optional Checks

- [x] 領域固有の追加確認: `npm run test:gallery-generate` で preserve/delete/write-marker を fixture ベースで確認した
- [ ] frontend 変更時は `npm run verify:frontend`
- [x] 既存の強い verify がある場合はそれも実行する

## Out Of Scope

- 今回やらない確認: gallery/import パイプライン全体の全件再生成、既存 manifest の全件クリーニング
