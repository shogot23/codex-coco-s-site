# Plan

## Task

- task-id: TASK-review-detail-purchase-cta
- related pbi: `docs/tasks/TASK-review-detail-purchase-cta/pbi-input.md`

## Intent

- 何を変えるか: review detail の上部 purchase CTA を、単一購入先では直接外部へ、複数購入先ではページ下部の Reading Shelf へ案内する
- なぜ今やるか: review detail だけで導線の迷いを減らしつつ、PlanGate の最初の実戦 task として scope と verify を固定したいから

## Scope Declaration

- 変更対象ファイル: `docs/tasks/TASK-review-detail-purchase-cta/pbi-input.md`, `docs/tasks/TASK-review-detail-purchase-cta/plan.md`, `docs/tasks/TASK-review-detail-purchase-cta/test-cases.md`, `docs/tasks/TASK-review-detail-purchase-cta/status.md`, `src/pages/reviews/[slug].astro`
- 変更しないもの: `src/pages/reviews.astro`, `src/pages/index.astro`, content data, e2e spec の追加や改修, PlanGate の repo-wide 導入差分

## Visual Thesis

- review detail の opening actions は「読む」が主役のまま、購入導線は読後の熱を逃がさない静かな脇道として置く

## Content Plan

- opening actions では本文導線と景色導線を先頭に置き、purchase CTA は購入先数に応じて最短導線だけを示す
- Afterglow の Reading Shelf は購入先の一覧棚として残し、複数購入先の詳細はそこへ集約する

## Interaction Thesis

- 上部 CTA は 1 回で意味が分かる文言にし、複数購入先でいきなり外部へ飛ばさない
- Reading Shelf へのスクロール到達性を維持し、主 CTA の「本文を読む」を弱めない

## Implementation Steps

1. task 文書を作成し、scope / out-of-scope / verify を固定する
2. `src/pages/reviews/[slug].astro` で purchase CTA の分岐と文言を整理する
3. verify と Claude review gate を通し、status を完了状態に更新する

## Risks And Guards

- 想定リスク: purchaseLinks が複数ある review で CTA 文言と遷移先が噛み合わない
- 回避策: single / multiple の分岐を変数に切り出して、Reading Shelf に id を付けて遷移先を固定する
- scope 外に見つけた事項の扱い: CTA 専用 e2e や content 側の store 文言統一は別 task に切り出す

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: desktop / mobile で review detail の opening CTA と Reading Shelf の関係を確認する

## Approval

- approver: self
- status: approved
- note: review detail と task 文書に scope を限定した最小差分として着手する

plan 承認前はコード変更しない。
