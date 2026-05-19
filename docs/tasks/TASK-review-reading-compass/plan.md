# Plan

## Task

- task-id: TASK-review-reading-compass
- related pbi: `docs/tasks/TASK-review-reading-compass/pbi-input.md`

## Intent

- 何を変えるか: `/reviews/` に Reading Compass section を追加し、気分・モヤモヤ・気づきからレビュー詳細へ入れるようにする。
- なぜ今やるか: 記事数が増え、日付順一覧だけでは訪問者が今の悩みに近い一冊を選びにくくなっているため。

## Scope Declaration

- 変更対象ファイル:
  - `src/pages/reviews.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-review-reading-compass/`
- 変更しないもの:
  - `src/content/reviews/*.md`
  - `src/content/config.ts`
  - `src/utils/reviews.ts`
  - `purchaseLinks` の表示方針

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

中核実装は `src/pages/reviews.astro` に集中するため直列で進める。調査はサブエージェントで並列実施済み。

## Implementation Steps

1. `reviewCards` に `readingCompass` を追加し、既存 frontmatter から短い案内文を作る。
2. `reviewCompassLenses` を page-local に定義し、気分・モヤモヤ・気づきの3軸をレビュー詳細リンクとして表示する。
3. hero の副 CTA を `#review-compass` に向け、Reading Compass section を hero と featured review の間へ追加する。
4. 既存の scoped CSS を使い、静かな棚として見えるよう最小限のスタイルを追加する。
5. E2E smoke に section 表示、3軸、詳細遷移、横スクロールなしを追加する。

## Risks And Guards

- 想定リスク: filter UI 化すると JS / URL state / schema 移行まで scope が広がる。
- 回避策: v1 は通常リンクだけで構成し、schema と content ファイルを変更しない。
- scope 外に見つけた事項の扱い: 別タスク候補として記録し、今回の差分には入れない。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `/reviews/` desktop / mobile 表示
  - Reading Compass からレビュー詳細への遷移
  - `claude-review-gate` の `ok: true`

## Approval

- approver: Codex self-approval for single-owner rollout
- status: approved
- note: ユーザーの実行依頼後、Plan Mode 解除済み。scope と検証方針は提案計画に沿う。
