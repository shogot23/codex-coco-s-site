# Plan

## Task

- task-id: `TASK-gallery-listing-phase-a-2026-04-23`
- related pbi: `docs/tasks/TASK-gallery-listing-phase-a-2026-04-23/pbi-input.md`

## Intent

- 何を変えるか: Gallery の browse 導線に view switch、genre chips、chapter more toggle、compact grid card を追加する
- なぜ今やるか: 一覧負荷を下げつつ、`/gallery/archive/` に持ち出せる browse model と UI 責務を先に整えるため

## Scope Declaration

- 変更対象ファイル:
  - `src/pages/gallery.astro`
  - `src/utils/gallery.ts`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-listing-phase-a-2026-04-23/*`
- 変更しないもの:
  - `src/lib/gallery-taxonomy.ts`
  - `src/pages/gallery/[slug].astro`
  - `src/content/`

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため単独で進める。

## Implementation Steps

1. `src/utils/gallery.ts` に summary 整形と browse model を追加する
2. `src/pages/gallery.astro` に browse controls、interactive curated/grid、responsive styling、inline script を追加する
3. `tests/e2e/site-smoke.spec.ts` に gallery browse interaction の smoke を追加し、frontend verify と Claude review gate を実行する

## Risks And Guards

- 想定リスク:
  - hero / featured の展示体験を壊す
  - interactive browse が mobile で過密になる
  - static Astro 上で filter / view 状態同期が不安定になる
- 回避策:
  - browse section のみを interactive に限定する
  - 既存トークンと section narrative を維持する
  - URL state は `view` / `genre` のみ、無効値は既定へフォールバックする
- scope 外に見つけた事項の扱い: 別 PR 提案に回す

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - desktop / mobile の gallery browse 操作
  - review / gallery 導線維持
  - Claude review gate `ok: true`

## Approval

- approver: self
- status: approved
- note: ユーザー指示の実装計画に基づき自己承認で着手
