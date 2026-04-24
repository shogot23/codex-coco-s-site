# Test Cases

## Task

- task-id: `TASK-gallery-lead-image-stretch-fix-2026-04-24`
- related plan: `docs/tasks/TASK-gallery-lead-image-stretch-fix-2026-04-24/plan.md`

## Must Check

- [x] `/gallery/` curated の lead image が横に引き延ばされていない
- [x] lead image が genre filter などの JS 再描画後も自然な比率を保つ
- [x] lead piece の image と caption の関係が壊れていない
- [x] trail / grid card の見え方が壊れていない
- [x] curated / grid 切替、more toggle、URL sync が維持されている
- [x] scope 外の `src/utils/gallery.ts` / `src/content/` / page shell に差分が入っていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktop の `/gallery/` curated lead image を目視確認する
- [x] mobile の `/gallery/` curated lead image を目視確認する
- [x] card 一覧に副作用がないことを確認する

## Optional Checks

- [x] JS 再描画後の lead image computed style を E2E で確認する
- [x] `claude-review-gate` を完了する

## Out Of Scope

- 今回やらない確認:
  - pagination 追加
  - Gallery detail page の UI 調整
  - page hero / shell の再設計
