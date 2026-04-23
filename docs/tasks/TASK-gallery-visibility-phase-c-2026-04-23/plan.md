# Plan

## Task

- task-id: `TASK-gallery-visibility-phase-c-2026-04-23`
- related pbi: `docs/tasks/TASK-gallery-visibility-phase-c-2026-04-23/pbi-input.md`

## Intent

- 何を変えるか: Gallery browse の lead / trail / grid card を作品単位のカード構造に揃え、media sizing と caption grouping を整理する
- なぜ今やるか: Phase B の browse UI は機能要件を満たした一方で、curated の視認性と archive の比較リズムに改善余地が残っているため

## Scope Declaration

- 変更対象ファイル:
  - `src/components/gallery/GalleryBrowse.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-visibility-phase-c-2026-04-23/*`
- 変更しないもの:
  - `src/pages/gallery.astro`
  - `src/pages/gallery/archive.astro`
  - `src/utils/gallery.ts`
  - `src/pages/gallery/[slug].astro`
  - `src/content/`

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため単独で進める。`GalleryBrowse.astro` の server markup、inline client render、CSS に P1/P2 の責務が集中し、P3 もその最終 DOM に依存するため、worktree 分離より直列の方が安全。

## Implementation Steps

1. `GalleryBrowse.astro` の server markup を作品カード単位に整理し、lead / trail / grid すべてで media と caption が同じ surface 内で完結するようにする
2. inline client render helper を同じ DOM 構造に揃え、server/client の再描画差をなくす
3. 共通 card surface、`aspect-ratio`、spacing、mobile fallback を整理し、lead=`5:4`、trail=`4:3`、grid=`5:6` の見え方を安定させる
4. E2E に作品単位の grouping と grid media 高さの安定性を追加し、既存 smoke を維持する
5. frontend verify と Claude review gate を完了し、commit / PR / merge / main 同期 / branch cleanup まで進める

## Risks And Guards

- 想定リスク:
  - 画像を揃えようとして切り抜きが強くなり、作品性が落ちる
  - curated の chapter 構造より作品カードの存在感が強くなりすぎる
  - JS 再描画後だけ DOM が変わり、E2E や no-JS fallback がずれる
- 回避策:
  - `object-fit: cover` は維持しつつ、wrapper ratio と padding で見え方を整える
  - card surface は subtle に留め、章 intro と競合しない強さにする
  - server markup と render helper を同じ要素順・data 属性で揃える
- scope 外に見つけた事項の扱い:
  - page shell や detail page の改善は別 PR に回す

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - desktop / mobile の `/gallery/` curated
  - desktop / mobile の `/gallery/archive/` grid
  - `view` / `genre` / `sort` / `more toggle` / URL sync
  - `data-gallery-piece` / `data-gallery-piece-media` / `data-gallery-piece-caption`
  - Claude review gate `ok: true`

## Approval

- approver: self
- status: approved
- note: ユーザー指示に基づき task docs 固定後に着手
