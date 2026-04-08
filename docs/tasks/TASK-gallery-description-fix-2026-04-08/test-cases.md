# Test Cases

## Task

- task-id: `TASK-gallery-description-fix-2026-04-08`
- related plan: `docs/tasks/TASK-gallery-description-fix-2026-04-08/plan.md`

## Must Check

- [ ] `ひゃくえむ。` の gallery description が正式紹介文へ更新される
- [ ] Gallery 一覧、Lead Scene、Featured Scenes の description 表示に title / author が混ざらない
- [ ] scope 外の変更が入っていない

## Command Checks

- [ ] `npm run typecheck`
- [ ] `npm run build`

## Manual Checks

- [ ] `src/pages/gallery.astro` の各カード種別で title / author / description が分離されている
- [ ] Home Featured Gallery は content 更新で正式紹介文を表示できる前提になっている

## Optional Checks

- [ ] frontend 変更時は `npm run verify:frontend`

## Out Of Scope

- 今回やらない確認: e2e 実行、他 gallery content の正式文整備
