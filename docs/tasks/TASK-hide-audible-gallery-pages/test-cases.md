# Test Cases

## Task

- task-id: TASK-hide-audible-gallery-pages
- related plan: `docs/tasks/TASK-hide-audible-gallery-pages/plan.md`

## Must Check

- [x] `ONLY FROM audible` 帯付き gallery エントリが非公開化される
- [x] scope 外の変更が入っていない
- [x] Home / Reviews / Gallery の既存導線が崩れていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] 画像棚卸し結果と変更対象 slug が一致している
- [x] `/gallery/` 一覧に該当タイトルが出ない
- [x] 非公開化した `/gallery/<slug>/` が生成対象外になっている

## Optional Checks

- [x] 既存の関連 review から gallery 導線が崩れていない
- [x] 追加の権利注意画像がないか棚卸し結果を見直す

## Out Of Scope

- UI / デザイン変更
- 権利注意画像を自動検知する仕組みの追加
