# Test Cases

## Task

- task-id: TASK-example
- related plan: `docs/tasks/examples/TASK-example/plan.md`

## Must Check

- [ ] hero の主 CTA 文言が新しい文言に変わっている
- [ ] 補助コピーが CTA と矛盾していない
- [ ] 他セクションや他ページに差分が入っていない

## Command Checks

- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] desktop で first viewport の CTA が一画面で読める
- [ ] mobile で CTA が折れすぎず押しやすい
- [ ] CTA クリックで意図した導線に進める

## Optional Checks

- [ ] スクリーンショット比較
- [ ] 関連レビュー導線の文言との整合確認

## Out Of Scope

- hero 画像の差し替え
- section 順序の変更
