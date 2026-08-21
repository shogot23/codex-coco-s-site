# Test Cases

## Task

- task-id: TASK-happiness-curve-review-gallery
- related plan: `plan.md`

## Must Check

- [x] レビューに指定書誌・原稿・affiliate URL が反映される
- [x] ギャラリーに指定画像・説明・読後の余韻・レビュー相互リンクが反映される
- [x] scope 外の変更が入っていない
- [x] 既存の Review → Gallery 導線と content schema が崩れていない

## Command Checks

- [x] `npm run check:content`
- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] 対象画像と最適化 derivative の存在・寸法・参照先を確認する
- [x] Review detail / Reviews listing / Gallery listing / Gallery detail を確認する
- [x] Review と Gallery の相互リンク、affiliate 導線、主要 CTA を確認する
- [x] desktop と mobile のレイアウトを確認する

## Optional Checks

- [x] `git diff --check`
- [ ] PR checks がすべて通過する

## Out Of Scope

- 今回やらない確認: 無関係な既存レビュー・ギャラリーの内容監査、サイト全体の新規 UI 改修。
