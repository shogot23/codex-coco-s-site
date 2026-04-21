# Test Cases

## Task

- task-id: TASK-reviews-reading-notes-copy-refresh-2026-04-21
- related plan: `docs/tasks/TASK-reviews-reading-notes-copy-refresh-2026-04-21/plan.md`

## Must Check

- [ ] READING NOTES のテーマタグが plan の最終採用案 4 件に更新されている
- [ ] `こんな気分の日に` の 3 項目が plan の最終採用案に更新されている
- [ ] READING NOTES が個別レビュー紹介ではなく、レビュー一覧ページの紹介として自然に読める
- [ ] 左 hero copy、CTA、featured review、review stream の既存導線が変わっていない
- [ ] scope 外の変更が入っていない

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] desktop 表示で右カラムの情報が過不足なく自然に読める
- [ ] mobile を含めても右カラム文言の折り返しや余白が不自然でない
- [ ] 旧文言より「ここで何が見つかるか」が読み取りやすくなっている
- [ ] hero のトーンと READING NOTES の文言が矛盾していない

## Optional Checks

- [ ] `git diff --stat` で task 文書・`src/pages/reviews.astro`・daily 以外に差分がない
- [ ] `dist/reviews/index.html` で採用文言が出力されている
- [ ] Claude review gate が `ok: true`

## Out Of Scope

- 他ページのコピー調整
- `src/content/reviews/*.md` の frontmatter 整備
- CSS / layout の調整
