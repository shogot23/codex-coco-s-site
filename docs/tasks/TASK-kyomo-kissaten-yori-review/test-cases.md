# Test Cases

## Task

- task-id: TASK-kyomo-kissaten-yori-review
- related plan: `plan.md`

## Must Check

- [ ] レビュー詳細ページに『今日も、喫茶店より』の本文・infographic・cover が表示される
- [ ] レビュー一覧に新規レビューが表示される
- [ ] ギャラリーに新規画像が表示され、`relatedReview` からレビュー詳細へ遷移できる
- [ ] scope 外の変更が入っていない
- [ ] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [ ] `npm run check:content`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] 生成 HTML でレビュー詳細URL・infographic 参照・cover 参照を確認する
- [ ] gallery entry の description に書名・著者名が含まれていないことを確認する
- [ ] gallery entry に `generated_at` があることを確認する
- [ ] 楽天 moshimo URL が review / gallery 両方に正しく入っていることを確認する

## Optional Checks

- [ ] レビュー文がブランド規約（問い・変化・実生活・ココちゃん）の4軸を満たすか最終確認する
- [ ] ネタバレ要素（特定のエッセイの結末・オチ）が本文に含まれていないか確認する

## Out Of Scope

- 既存レビュー・ギャラリーの修正、コンポーネント・ページ実装の変更
