# Test Cases

## Task

- task-id: TASK-plan-template-parallel-work-check-2026-04-13
- related plan: `docs/tasks/TASK-plan-template-parallel-work-check-2026-04-13/plan.md`

## Must Check

- [x] `docs/tasks/_templates/plan.md` に Parallel Work Check が追加されている
- [x] `docs/tasks/_templates/plan.md` の差分が今回の追加だけに収まっている
- [x] PR #82 の対象差分に触れていない

## Command Checks

- [x] `git diff -- docs/tasks/_templates/plan.md`
- [x] review gate 実行要否の判定

## Manual Checks

- [x] `stash@{0}` のうち template 以外の差分を復元していない
- [x] 追加した文言がテンプレートの流れを壊していない

## Optional Checks

- [x] 領域固有の追加確認: review gate artifact を確認し、`ok: true / issues: []` を確認した
- [ ] frontend 変更時は `npm run verify:frontend`
- [ ] 既存の強い verify がある場合はそれも実行する

## Out Of Scope

- `src/pages/index.astro` の差分復元
- commit / push / PR 作成
