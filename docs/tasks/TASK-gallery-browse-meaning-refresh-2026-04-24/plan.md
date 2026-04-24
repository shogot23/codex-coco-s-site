# Plan

## Task

- task-id: `TASK-gallery-browse-meaning-refresh-2026-04-24`
- related pbi: `docs/tasks/TASK-gallery-browse-meaning-refresh-2026-04-24/pbi-input.md`

## Intent

- 何を変えるか:
  - gallery browse の文言とレイアウト差を調整し、`章で見る / 一覧で見る` の意味が見れば分かる UI にする
- なぜ今やるか:
  - Phase B/C で browse の骨格は整ったが、現状は実装説明が前に出ており、archive と gallery の役割差がユーザーに伝わりきっていないため

## Scope Declaration

- 変更対象ファイル:
  - `src/components/gallery/GalleryBrowse.astro`
  - `src/pages/gallery.astro`
  - `src/pages/gallery/archive.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-browse-meaning-refresh-2026-04-24/*`
- 変更しないもの:
  - `src/utils/gallery.ts`
  - `src/pages/gallery/[slug].astro`
  - `src/content/`
  - taxonomy / data schema

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため単独で進める。`GalleryBrowse.astro` に controls、server/client render、status copy、CSS が集中し、archive / gallery の page copy と E2E もその最終 DOM と文言に依存するため、worktree 分離より直列の方が安全。

## Implementation Steps

1. `GalleryBrowse.astro` の labels / status / count / no-script 表出を日本語の利用価値ベースへ置き換え、`章で見る / 一覧で見る` の見え方の差を CSS と markup で強める
2. `src/pages/gallery.astro` と `src/pages/gallery/archive.astro` の導入コピーと stats/panel 文言を短く整理し、gallery=眺める / archive=探す の役割差だけを残す
3. `tests/e2e/site-smoke.spec.ts` を更新して新ラベル、視覚差、既存 state sync を確認し、verify と Claude review gate を完了する

## Risks And Guards

- 想定リスク:
  - 文言だけ変えて見え方の差が弱いままになる
  - status / no-script の変更で server/client render がずれる
  - archive と gallery のトーン差が崩れる
- 回避策:
  - controls の active summary と panel styling を一緒に変えて、章表示と一覧表示の主役を明確に分ける
  - server markup と inline client render の copy を揃える
  - archive は探すための短い案内、gallery は章をめくる入口として narrative を保つ
- scope 外に見つけた事項の扱い:
  - detail page、pagination、新機能追加は別タスク候補に回す

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `/gallery/` desktop / mobile の既定表示が `章で見る` で自然か
  - `/gallery/archive/` desktop / mobile の既定表示が `一覧で見る` で自然か
  - 切替後に chapter lead と uniform grid の差が説明なしで伝わるか
  - `genre` / `sort` / `more toggle` / URL sync / back-forward が維持されるか
  - `claude-review-gate` が `ok: true` になるか

## Approval

- approver: self
- status: approved
- note: ユーザー承認済みの計画に基づき、上記 scope / verify で着手する
