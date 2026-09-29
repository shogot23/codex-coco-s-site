# Test Cases

## Task

- task-id: TASK-publish-boutique-work
- related plan: `plan.md`

## Must Check

- [x] Claude review gateはユーザーが2026-09-29に今回限りで免除。レビュー未実施。最終preflightは90秒timeout (exit 124)、CLI初期化後にrequest/dispatchなし。再試行なし。
- [ ] boutiqueワークが公開一覧と詳細ページに表示される
- [x] 原本JSONと画像が一致し、taxonomy・slug・レビュー参照が有効
- [x] scope外の変更がない
- [x] ワーク手順・安全上の注意・研究との距離がページに正しく表示される
- [x] desktop/mobileで画像、本文、本へのリンクが読める

## Command Checks

- [x] `npm run works:import -- <absolute site-work.json> --dry-run`
- [x] `npm run test:works` (28 passed)
- [x] lint / typecheck / build, and isolated Playwright run (95 passed, 7 skipped)
- [x] `npm run check:works-dist`

## Manual Checks

- [x] 下書きプレビューの一覧・詳細を確認する
- [ ] 公開後の一覧・詳細URL、レビュー相互リンク、共有画像を確認する

## Out Of Scope

- X / Instagramへの投稿
