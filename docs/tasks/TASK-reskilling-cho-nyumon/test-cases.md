# Test Cases

## Task

- task-id: TASK-reskilling-cho-nyumon
- related plan: plan.md

## Must Check

- [ ] ギャラリーエントリが `/gallery/` に表示される
- [ ] レビューページ `/reviews/risukiringu-cho-nyumon/` が正しくレンダリングされる
- [ ] ギャラリー→レビューのリンクが機能する
- [ ] scope 外の変更が入っていない

## Command Checks

- [ ] `npm run typecheck`
- [ ] `npm run build`

## Manual Checks

- [ ] gallery description にタイトル・著者名が含まれていない（gallery description rules 準拠）
- [ ] レビュー本文がユーザー提供テキスト通りに配置されている
- [ ] 画像パスが正しく参照されている
- [ ] purchaseLinks の URL が正しい

## Optional Checks

- [ ] frontend 変更時は `npm run verify:frontend`

## Out Of Scope

- 今回やらない確認: 他のギャラリーエントリ・レビューの表示確認
