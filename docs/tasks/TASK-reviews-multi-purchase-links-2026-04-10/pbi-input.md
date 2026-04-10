# PBI Input

## Task

- task-id: TASK-reviews-multi-purchase-links-2026-04-10
- title: /reviews の purchaseLinks 複数表示対応
- owner: Codex
- date: 2026-04-10

## Request Summary

- 依頼の要約: `/reviews` の「ひゃくえむ。」カードで、`purchaseLinks` の上巻・下巻を両方表示する
- 背景: 現状は frontmatter に複数リンクがあっても一覧カード側が先頭 1 件しか描画しておらず、下巻への導線が落ちている

## Goal

- 達成したいこと: `/reviews` 一覧カードが review frontmatter の `purchaseLinks` を source of truth として複数件描画できるようにする
- 完了条件: `hyakuemu.md` に上巻・下巻 2 件が揃っていることを確認し、`/reviews` で両方のラベルが表示され、既存の他レビュー表示が崩れていない

## Scope

- 含める: `hyakuemu.md` の確認、`src/pages/reviews.astro` の purchaseLinks 描画改善、必要最小限のスタイル調整、task 文書と記録更新
- 含めない: slug 特例追加、`/reviews/[slug]` や `/` の購入導線改修、e2e テスト追加、他ページの文言統一

## Constraints

- 既存運用との整合: `publish/dev-critical` として PlanGate、frontend verify、Claude review gate を通す
- 納期 / 優先度: 今回の表示不整合を最小差分で解消する
- 触ってよいファイルや領域: `docs/tasks/TASK-reviews-multi-purchase-links-2026-04-10/`, `src/pages/reviews.astro`, 必要時のみ `src/content/reviews/hyakuemu.md`, `inbox/daily/2026-04-10.md`

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: `hyakuemu.md` には確認時点で上巻・下巻の 2 件が定義済み
- 未確定事項: なし
