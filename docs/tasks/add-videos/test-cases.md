# Test Cases

## Task

- task-id: add-videos
- related plan: plan.md

## Must Check

- [ ] 3本の新規動画が /videos/ ページに表示される
- [ ] 各動画がインラインで再生・一時停止できる
- [ ] scope 外の変更が入っていない
- [ ] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [ ] `npm run typecheck`
- [ ] `npm run build`

## Manual Checks

- [ ] 新規動画カードの title / note が正しく表示される
- [ ] 既存 sora 動画3件の表示に変化がない
- [ ] レスポンシブレイアウトが崩れていない

## Optional Checks

- [ ] frontend 変更時は `npm run verify:frontend`

## Out Of Scope

- 今回やらない確認: サムネイル生成、動画ファイルの圧縮
