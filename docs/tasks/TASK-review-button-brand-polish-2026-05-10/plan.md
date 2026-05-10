# Plan

## Task

- task-id: TASK-review-button-brand-polish-2026-05-10
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: Reviews / About / Profile のモバイル hero CTA を Gallery と同程度のコンパクトなサイズに揃える。
- なぜ今やるか: スマホ表示で CTA が過大化し、読書withCoco の静かな first view を圧迫しているため。

## Scope Declaration

- 変更対象ファイル: `src/pages/reviews.astro`, `src/pages/about.astro`, `src/pages/profile.astro`, `tests/e2e/site-smoke.spec.ts`, `docs/tasks/TASK-review-button-brand-polish-2026-05-10/*`
- 変更しないもの: public copy の全面改稿、content data、purchaseLinks、Gallery browse semantics、routes、schemas、dependencies。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単独で進める。CSS の同一パターン修正で、並列化するほど独立した作業ではない。

## Implementation Steps

1. Reviews の `@media (max-width: 640px)` 内で hero CTA の縦方向 `flex-basis` をなくし、Gallery に近い `min-height` / padding にする。
2. About / Profile の `@media` 内で同じ hero CTA 過大化を最小CSSで修正する。
3. E2E に Reviews / About / Profile の mobile compact CTA assertion を追加する。
4. 表示確認と verify を行い、`status.md` を更新する。
5. `claude-review-gate` を通し、blocking issue がない状態で commit / PR へ進む。

## Risks And Guards

- 想定リスク: CTA を小さくしすぎてタップターゲットが 44px を下回る。
- 回避策: E2E で対象 CTA の高さを 44px 以上 62px 以下として確認する。
- scope 外に見つけた事項の扱い: 明確な崩れ以外は見送る。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: `/reviews/`, `/gallery/`, `/about/`, `/profile/` の PC / mobile 表示で CTA 高さ、改行、横スクロールを確認する。

## Approval

- approver: user
- status: approved
- note: User requested implementation of this plan on 2026-05-10.
