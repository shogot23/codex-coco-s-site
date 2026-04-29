# Test Cases

## Task

- task-id: TASK-video-card-viewport-fit-2026-04-29
- related plan: plan.md

## Must Check

- [x] `/videos/` のMP4動画カード全体が desktop viewport 高さ以内に収まる
- [x] `/videos/` のMP4動画カード全体が mobile viewport 高さ以内に収まる
- [x] MP4動画が切り抜かれず、再生コントロール付きで表示される
- [x] scope 外の変更が入っていない
- [x] 既存の主要導線やブランドトーンが崩れていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktop で `/videos/` の動画カードを確認する
- [x] mobile で `/videos/` の動画カードを確認する
- [x] Reviews / Gallery への導線が維持されている

## Optional Checks

- [x] Claude review gate `ok: true`

## Out Of Scope

- 今回やらない確認: 動画圧縮、動画内容の品質評価、サムネイル生成
