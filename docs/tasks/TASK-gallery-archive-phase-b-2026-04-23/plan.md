# Plan

## Task

- task-id: `TASK-gallery-archive-phase-b-2026-04-23`
- related pbi: `docs/tasks/TASK-gallery-archive-phase-b-2026-04-23/pbi-input.md`

## Intent

- 何を変えるか: gallery browse UI を shared component に整理し、`/gallery/archive/` を新設して gallery と archive の役割を分離する
- なぜ今やるか: Phase A の browse model と URL state を使い回しながら、今後の件数増加に耐える目録の骨格を最小差分で作るため

## Scope Declaration

- 変更対象ファイル:
  - `src/pages/gallery.astro`
  - `src/pages/gallery/archive.astro`
  - `src/components/gallery/*`
  - `src/utils/gallery.ts`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-archive-phase-b-2026-04-23/*`
- 変更しないもの:
  - `src/pages/gallery/[slug].astro`
  - `src/lib/gallery-taxonomy.ts`
  - `src/content/`
  - `src/layouts/Layout.astro`

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため単独で進める。browse markup・inline script・style・URL state 契約を同時に触るため `src/pages/gallery.astro` を起点に競合が濃く、worktree 分離より直列の方が安全。

## Implementation Steps

1. `src/utils/gallery.ts` に archive 用 sort 型・既定 state・sort helper を最小追加し、shared component が使うデータ契約を整える
2. `src/components/gallery/` に browse UI を切り出し、gallery variant と archive variant を同じ component で描画できるようにする
3. `src/pages/gallery/archive.astro` を追加し、grid 既定・genre / sort / view URL state・no-JS static grid を実装する
4. `src/pages/gallery.astro` を shared browse component 利用へ移行し、archive 導線を追加して展示の補助棚へ寄せる
5. `tests/e2e/site-smoke.spec.ts` を更新し、archive の導線と state sync を追加する
6. frontend verify と Claude review gate を完了し、commit / PR / merge に進む

## Risks And Guards

- 想定リスク:
  - shared browse 化で gallery の既存 UX が崩れる
  - archive の目録 UI が展示室らしさを食う
  - URL state 拡張で戻る / 進むが不安定になる
- 回避策:
  - gallery / archive の variant を props で明示し、既定値も page 側で固定する
  - archive は短い導入にとどめ、browse catalog を主役にする
  - URL state は `view` / `genre` / `sort` に限定し、無効値は既定へフォールバックする
- scope 外に見つけた事項の扱い:
  - detail page や taxonomy 再設計は別 PR 候補に回す

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - desktop / mobile の `/gallery/` と `/gallery/archive/`
  - `/gallery/` → `/gallery/archive/` 導線
  - archive の genre / sort / view URL sync
  - back / forward による state 復元
  - detail を持たない作品が非リンクカードとして表示される
  - Claude review gate `ok: true`

## Approval

- approver: self
- status: approved
- note: ユーザー承認済みの実行計画を task docs に固定して着手する
