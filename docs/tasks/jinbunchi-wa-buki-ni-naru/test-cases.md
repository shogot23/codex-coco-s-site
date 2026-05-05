# Test Cases

## Task

- task-id: jinbunchi-wa-buki-ni-naru
- related plan: plan.md

## Must Check

- [x] 目的の変更が反映される（ギャラリーとレビューの新規追加）
- [x] scope 外の変更が入っていない（既存ファイル無変更）
- [x] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [x] `npm run typecheck` → 0 errors, 0 warnings
- [x] `npm run build` → 116 pages built

## Manual Checks

- [x] ギャラリーエントリの frontmatter が schema に適合
- [x] レビューエントリの frontmatter が schema に適合
- [x] relatedReview の slug がレビューファイル名と一致
- [x] 画像パスが実際のファイルと一致
- [x] description にタイトル・著者名が含まれていない

## Optional Checks

- [x] 領域固有の追加確認: コンテンツ追加のみのため verify:frontend を実行
- [x] `npm run verify:frontend` → lint OK, typecheck OK, build OK, e2e 29/30 passed (1 skipped)

## Out Of Scope

- 今回やらない確認: レビュー文の内容レビュー（ユーザー提供のため）
