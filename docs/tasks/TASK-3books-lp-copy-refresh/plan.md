# Plan

## Task

- task-id: TASK-3books-lp-copy-refresh
- related pbi: `docs/tasks/TASK-3books-lp-copy-refresh/pbi-input.md`

## Intent

- 何を変えるか: 3books LP の冒頭まわりの案内文言を、Xプロフィールの新しい入口設計に合わせて調整する
- なぜ今やるか: SNS から来た人が LP 冒頭で迷わず文脈接続できるようにするため

## Scope Declaration

- 変更対象ファイル: `src/pages/3books.astro`, `docs/tasks/TASK-3books-lp-copy-refresh/*`
- 変更しないもの: レイアウト、スタイル、コンポーネント構造、各書籍カード本文の大幅変更

## Visual / Content / Interaction Thesis

- visual thesis: 既存の静かな余白と柔らかさは維持し、言葉だけで入口の明確さを少し上げる
- content plan: 忙しい日々 → 役割や環境変化 → 視界を整える → 次の一歩、の順で冒頭文言をつなぐ
- interaction thesis: まずレビューへ進める安心感を前面に出し、購入導線は補助として静かに残す

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Implementation Steps

1. `src/pages/3books.astro` の冒頭文言を既存トーンに合わせて最小差分で更新する
2. 差分を確認し、文言変更以外が混ざっていないか点検する
3. verify 実行後に Claude review gate を回し、必要なら最小差分で修正する

## Risks And Guards

- 想定リスク: 案内性を上げる過程で、読書 with Coco の静かな世界観が少し硬く見える
- 回避策: ユーザー提示文案を芯にしつつ、断定や販促の強さを抑えた表現に留める
- scope 外に見つけた事項の扱い: 今回は触らず、必要なら別タスクとして記録する

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `git diff -- src/pages/3books.astro`
  - 冒頭見出し、リード、Coco's Note、導入文が意図どおりに読めるか目視確認

## Approval

- approver: self
- status: approved
- note: scope と検証方針を固定。1ファイル中心の最小差分で進める

個人運用では自己承認でよい。承認とは、scope と検証方針に同意した状態を指す。

plan 承認前はコード変更しない。
