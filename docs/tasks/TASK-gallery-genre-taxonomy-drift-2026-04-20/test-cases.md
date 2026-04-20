# Test Cases

## Task

- task-id: TASK-gallery-genre-taxonomy-drift-2026-04-20
- related plan: `docs/tasks/TASK-gallery-genre-taxonomy-drift-2026-04-20/plan.md`

## Must Check

- [ ] gallery genre taxonomy の列挙値が schema / CMS / scripts で一致する
- [ ] `社会科学` が scripts 側でも受理される
- [ ] gallery 一覧と詳細の bucket 判定が同じ概念定義に基づく
- [ ] scope 外の narrative / CTA / note-description 変更が入っていない
- [ ] 既存 slug / 既存 URL / 既存ファイル名を壊していない

## Command Checks

- [ ] `npm run verify:frontend`
- [ ] `node scripts/gallery-import.ts --help`
- [ ] `node scripts/gallery-import.ts --help | rg "社会科学"`
- [ ] `node scripts/gallery-import.ts --dry-run --file <existing-fixture> --genre 社会科学`

## Manual Checks

- [ ] `/gallery` の Chapter 02 が learning bucket に基づくまま崩れていない
- [ ] gallery detail の learning 系棚説明が `社会科学` でも learning 分岐へ入る
- [ ] `public/admin/config.yml` の options が schema enum と一致している
- [ ] `git diff --name-status --find-renames` に rename や scope 外差分が出ていない

## Optional Checks

- [ ] scripts から共有 taxonomy module を import できることを再確認する
- [ ] review gate で advisory / blocking を確認する

## Out Of Scope

- 今回やらない確認:
  - CTA 文言の見直し
  - `note/description` の役割整理
  - `purchaseLinks` 表示ルールの再設計
  - `relatedReview` 共通化
  - `REVIEW_TAGS` 共通化
