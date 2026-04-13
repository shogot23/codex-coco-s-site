# Plan

## Task

- task-id: TASK-home-featured-multi-purchase-links-2026-04-13
- related pbi: `docs/tasks/TASK-home-featured-multi-purchase-links-2026-04-13/pbi-input.md`

## Intent

- 何を変えるか: Home Featured の購入 CTA を `purchaseLinks[0]` 固定から `purchaseLinks.map(...)` 描画へ切り替える
- なぜ今やるか: Reviews 一覧 / 詳細と purchaseLinks の扱いを揃え、複数購入先がある本で導線欠落が起きないようにするため

## Scope Declaration

- 変更対象ファイル: `docs/tasks/TASK-home-featured-multi-purchase-links-2026-04-13/pbi-input.md`, `docs/tasks/TASK-home-featured-multi-purchase-links-2026-04-13/plan.md`, `docs/tasks/TASK-home-featured-multi-purchase-links-2026-04-13/test-cases.md`, `docs/tasks/TASK-home-featured-multi-purchase-links-2026-04-13/status.md`, `src/pages/index.astro`
- 変更しないもの: `src/pages/reviews.astro`, `src/pages/reviews/[slug].astro`, `src/content/reviews/`, CTA の文言優先度, スタイル体系の大きな組み替え

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Visual Thesis

- Home Featured の CTA は「レビューを読む」を主役に固定し、購入リンク群は静かな補助棚として縦に連なる見え方を保つ

## Content Plan

- 主 CTA とレビュー一覧導線は現状の順序を維持する
- 購入 CTA だけを Reviews 一覧のパターンにならって配列順に描画する

## Interaction Thesis

- 購入リンクは frontmatter の `label` をそのまま使い、外部ストアリンクとして従来どおり新規タブで開く
- 購入リンク数が増えても主 CTA 群の階層は変えず、subordinate な見せ方を崩さない

## Implementation Steps

1. task 文書で scope / verify / 並列不要判定を固定する
2. `src/pages/index.astro` の Home Featured 購入 CTA を `purchaseLinks.map(...)` 描画へ置き換える
3. `npm run typecheck` と `npm run build` を行い、必要な目視確認と Claude review gate を完了する

## Risks And Guards

- 想定リスク: 購入リンクが複数になったときに CTA 群の見た目が主 CTA より強く見える
- 回避策: 既存の secondary button と action group をそのまま使い、主 CTA の順序とクラスを変えない
- scope 外に見つけた事項の扱い: Reviews 側との差分が他にも見つかっても今回は記録だけに留め、別 task に分ける

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
- 追加確認: Home Featured で複数購入リンクが出ること、単一リンクのレビューでも従来どおり表示されること、主 CTA の優先度が変わっていないこと

## Approval

- approver: self
- status: approved
- note: 単独作業・`src/pages/index.astro` 中心の最小差分として進める

plan 承認前はコード変更しない。
