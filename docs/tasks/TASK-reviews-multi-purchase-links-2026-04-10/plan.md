# Plan

## Task

- task-id: TASK-reviews-multi-purchase-links-2026-04-10
- related pbi: `docs/tasks/TASK-reviews-multi-purchase-links-2026-04-10/pbi-input.md`

## Intent

- 何を変えるか: `/reviews` 一覧の featured card と stream card で `purchaseLinks` を先頭 1 件ではなく複数件描画できるようにする
- なぜ今やるか: `ひゃくえむ。` の下巻リンクが source of truth に存在するのに一覧から辿れない状態を解消するため

## Scope Declaration

- 変更対象ファイル: `docs/tasks/TASK-reviews-multi-purchase-links-2026-04-10/pbi-input.md`, `docs/tasks/TASK-reviews-multi-purchase-links-2026-04-10/plan.md`, `docs/tasks/TASK-reviews-multi-purchase-links-2026-04-10/test-cases.md`, `docs/tasks/TASK-reviews-multi-purchase-links-2026-04-10/status.md`, `src/pages/reviews.astro`, `inbox/daily/2026-04-10.md`
- 変更しないもの: `src/pages/reviews/[slug].astro`, `src/pages/index.astro`, `src/content/reviews/` の他レビュー, slug 分岐, テスト基盤

## Visual Thesis

- 一覧カードの購入導線は「レビューを読む」が主役のまま、複数リンクが増えても静かに横へ並ぶ棚のように見せる

## Content Plan

- featured card では主 CTA 群の後に `purchaseLinks` をそのまま順に出す
- stream card では既存の「レビューを読む」の横に購入リンク群を折り返し可能な形で並べる

## Interaction Thesis

- ラベルは frontmatter の `label` をそのまま使い、リンク先の意味を UI 側で作り替えない
- 小さい画面ではボタン群が自然に折り返して詰まらないことを優先する

## Implementation Steps

1. task 文書を作成し、scope / verify / 承認状態を固定する
2. `/reviews` の purchaseLinks 描画を配列ベースに切り替え、複数件でも崩れにくいスタイルへ調整する
3. `npm run typecheck` と `npm run build` を行い、必要に応じて追加 verify と Claude review gate を実施する
4. status と daily を更新して結果を残す

## Risks And Guards

- 想定リスク: featured / stream でリンク数が増えた際に横幅や縦積みの見え方が不自然になる
- 回避策: 既存の action group を維持しつつ、purchaseLinks だけ `flex-wrap` 前提で描画する
- scope 外に見つけた事項の扱い: `/` や詳細ページの同種改善は別 task として切り出す

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
- 追加確認: `/reviews` で「楽天で見る（上巻）」「楽天で見る（下巻）」の両方が見えること、既存の単一 purchaseLink レビューが従来どおり表示されること

## Approval

- approver: self
- status: approved
- note: scope を `/reviews` 一覧と task 記録に限定した最小差分として着手する

plan 承認前はコード変更しない。
