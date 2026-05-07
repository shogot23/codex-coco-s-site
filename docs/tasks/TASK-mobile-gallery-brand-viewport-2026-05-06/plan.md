# Plan

## Task

- task-id: TASK-mobile-gallery-brand-viewport-2026-05-06
- related pbi: `docs/tasks/TASK-mobile-gallery-brand-viewport-2026-05-06/pbi-input.md`

## Intent

- 何を変えるか: Gallery 一覧カードのスマホ下部余白、共通 mobile header、主要ページの mobile hero density と visual cue を調整する。
- なぜ今やるか: スマホの Gallery 一覧で余白が目立ち、主要ページの first viewport でも読書withCoco の `本 × ココちゃん × 学び` が十分に同時表示されない箇所があるため。

## Scope Declaration

- 変更対象ファイル: `src/components/gallery/GalleryBrowse.astro`, `src/layouts/Layout.astro`, `src/pages/gallery.astro`, `src/pages/reviews.astro`, `src/pages/about.astro`, `src/pages/profile.astro`, `tests/e2e/site-smoke.spec.ts`, this task directory.
- 変更しないもの: `src/content/`, `public/` assets, route/schema/config/dependencies, `/gallery/archive/` hero redesign, inbox files.

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

Gallery card CSS と page-level hero/header は分離できるため並列実施する。テスト更新と最終 visual integration は直列で行う。

## Implementation Steps

1. `GalleryBrowse.astro` で mobile grid card body の min-height と compact/grid meta spacing を CSS-only で調整する。
2. `Layout.astro` と主要 page hero を調整し、スマホ first viewport で brand / CTA / visual cue が早く見えるようにする。
3. `site-smoke.spec.ts` に mobile spacing / nav / hero visual の回帰チェックを追加し、対象確認と full verify を実行する。
4. `claude-review-gate` を通し、blocking があれば最小差分で修正して再確認する。

## Risks And Guards

- 想定リスク: Gallery の画像比率変更によるカード意図の崩れ、header 圧縮による tap target 低下、Review/Gallery 主従関係の混乱。
- 回避策: 画像 aspect-ratio は触らず、tap target は 44px 以上、CTA 文言と route は維持する。
- scope 外に見つけた事項の扱い: archive hero など大きい再設計は follow-up とし、この PR では共有改善のみ反映する。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: mobile Playwright metrics for `/gallery/?view=grid`, `/gallery/archive/`, `/reviews/`, `/about/`, `/profile/`; no horizontal overflow at 360px and 390px.

## Approval

- approver: Codex
- status: approved
- note: User supplied implementation plan and requested implementation.
