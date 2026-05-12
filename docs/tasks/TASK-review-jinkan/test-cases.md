# Test Cases

## Task

- task-id: TASK-review-jinkan
- related plan: TASK-review-jinkan

## Must Check

- [ ] レビューページが正しく表示される
- [ ] ギャラリーからレビューへのリンクが機能する
- [ ] scope 外の変更が入っていない
- [ ] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [ ] `npm run typecheck`
- [ ] `npm run build`

## Manual Checks

- [ ] レビュー frontmatter の各フィールドを目視確認
- [ ] インフォグラフィック画像が正しく表示される
- [ ] ギャラリーの relatedReview が正しく設定されている

## Optional Checks

- [ ] codex-review で ok: true を確認

## Out Of Scope

- UI デザインの変更確認
- 他レビューページの回帰テスト
