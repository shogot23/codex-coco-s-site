# Test Cases

## Task

- task-id: TASK-chi-ni-ashi-o-tsukete-ikero
- related plan: plans/sharded-finding-crayon.md

## Must Check

- [x] 目的の変更が反映される（ギャラリーエントリ・レビューが追加されている）
- [x] scope 外の変更が入っていない（4ファイルのみ追加）
- [x] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [x] `npm run typecheck`
- [x] `npm run build`

## Manual Checks

- [x] 変更箇所を目視確認する（frontmatter フィールドの正確性）
- [x] 関連リンク / 導線 / 文言を確認する（relatedReview の紐付け、purchaseLinks の正確性）

## Optional Checks

- [x] `npm run verify:frontend`（lint / typecheck / build / e2e 全パス）
- [x] generated_at フィールドが設定されている（ホーム反映に必須）
- [x] description にタイトル・著者名を含めていない（feedback ルール準拠）

## Out Of Scope

- 今回やらない確認: ギャラリーページ・レビューページのビジュアル回帰テスト
