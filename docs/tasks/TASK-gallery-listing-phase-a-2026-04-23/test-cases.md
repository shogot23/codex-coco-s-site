# Test Cases

## Task

- task-id: `TASK-gallery-listing-phase-a-2026-04-23`
- related plan: `docs/tasks/TASK-gallery-listing-phase-a-2026-04-23/plan.md`

## Must Check

- [ ] `Curated` が初期表示で hero / featured / bridge を壊さない
- [ ] `Grid` 切替で compact card が表示される
- [ ] genre filter が Curated / Grid の両方に効く
- [ ] chapter ごとの「もっと見る」が件数に応じて表示・展開・折りたたみされる
- [ ] scope 外の detail page、taxonomy、content schema に差分が入っていない

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] desktop で browse controls が把握しやすく、横スクロールが出ない
- [ ] mobile で chips が視認でき、スクロール疲れが減る
- [ ] review へ戻る導線と About への bridge が保たれている
- [ ] URL state の `view` / `genre` が切替に追従する

## Optional Checks

- [ ] Playwright で gallery page の view switch / filter / more toggle を両 project で確認する
- [ ] frontend 変更時は `npm run verify:frontend`
- [ ] Claude review gate を完了する

## Out Of Scope

- 今回やらない確認:
  - `/gallery/archive/` の実装確認
  - gallery detail page の UI 再設計
