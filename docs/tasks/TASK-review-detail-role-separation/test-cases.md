# Test Cases

## Task

- task-id: TASK-review-detail-role-separation
- related plan: `docs/tasks/TASK-review-detail-role-separation/plan.md`

## Must Check

- [ ] `buffon-autobiography` で「読みはじめる前の、ひとこと。」と「こんな人におすすめ」が別情報になる
- [ ] 他 published review でも `readingCompass` が読書前の視点として自然に読める
- [ ] `recommendedFor` が対象読者の列挙に徹している
- [ ] scope 外の変更が入っていない

## Command Checks

- [ ] `npm run typecheck`
- [ ] `npm run build`

## Manual Checks

- [ ] `src/pages/reviews/[slug].astro` で Compass が `recommendedFor` 再表示になっていない
- [ ] `description` / `excerpt` / `readingCompass` / `recommendedFor` / `tags` の役割が分かれている

## Optional Checks

- [ ] `git diff --stat` で想定範囲内か確認する
- [ ] frontend 変更時は `npm run verify:frontend`

## Out Of Scope

- review 一覧ページの文言調整
- e2e を含む追加 verify の拡張
