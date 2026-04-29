# Plan

## Task

- task-id: TASK-video-card-viewport-fit-2026-04-29
- related pbi: pbi-input.md

## Intent

- 何を変えるか: `/videos/` の fragment card と media の高さ制御を viewport 基準へ調整し、MP4カード全体を desktop / mobile の1画面内に収める
- なぜ今やるか: 動画追加後の表示が大きく、Moving Fragments の「余韻の補助室」という役割に対して閲覧負荷が高くなっているため

## Scope Declaration

- 変更対象ファイル:
  - `src/pages/videos.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-video-card-viewport-fit-2026-04-29/`
- 変更しないもの:
  - 動画ファイル
  - content collection data
  - hero / card copy / Reviews・Gallery導線

## Parallel Work Check

- [x] P1: 調査と確認は並列化できる
- [ ] P2: 実装対象のCSSとE2Eが完全に分離されている
- [ ] P3: 順序に依存がない

単独で実装する。CSSの実測結果をE2Eへ反映する必要があるため、編集作業は直列で進める。

## Implementation Steps

1. `.fragment-card` / `.fragment-media` / media element CSS を最小差分で調整する
2. `video` を `img` / `iframe` と同じ表示制御へ含め、MP4全体が切れずに収まるよう `object-fit: contain` を指定する
3. mobile 用にカード余白、copy gap、media height を viewport 基準で抑える
4. `/videos/` の動画カード高さとMP4表示を確認するE2Eを追加する
5. verify と Claude review gate を実行し、結果を `status.md` に記録する

## Risks And Guards

- 想定リスク: mobile で本文と動画を詰めすぎてブランドの静けさが損なわれる
- 回避策: コピーや構成は変えず、余白と動画領域の上限だけを調整する
- scope 外に見つけた事項の扱い: 別タスク候補として記録し、今回のPRには含めない

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: desktop / mobile の `/videos/` で各動画カード全体が viewport 高さ以内に収まる

## Approval

- approver: self
- status: approved
- note: ユーザー承認済み計画に基づく実装。`publish/dev-critical` として review gate 必須。
