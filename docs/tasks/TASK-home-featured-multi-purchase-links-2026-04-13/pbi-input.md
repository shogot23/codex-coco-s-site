# PBI Input

## Task

- task-id: TASK-home-featured-multi-purchase-links-2026-04-13
- title: Home Featured の purchaseLinks 複数表示対応
- owner: Codex
- date: 2026-04-13

## Request Summary

- 依頼の要約: Home Featured で `purchaseLinks[0]` 固定になっている購入 CTA を、Reviews 一覧 / 詳細と整合する複数リンク表示へ揃える
- 背景: review frontmatter の `purchaseLinks` は配列で管理されているが、トップページの Featured だけ先頭 1 件しか描画しておらず source of truth と UI がずれている

## Goal

- 達成したいこと: Home Featured が review frontmatter の `purchaseLinks` を配列のまま順に描画し、主 CTA「レビューを読む」を主役に保ったまま購入導線の欠落をなくす
- 完了条件: `src/pages/index.astro` だけの最小差分で複数購入リンクが描画され、既存の subordinate な見せ方を壊していない

## Scope

- 含める: `src/pages/index.astro` の Home Featured CTA 部分の描画修正、task 文書作成、必要な確認
- 含めない: `src/pages/reviews.astro` や `src/pages/reviews/[slug].astro` の改修、frontmatter 変更、スタイル設計の大幅見直し、テスト追加

## Constraints

- 既存運用との整合: `publish/dev-critical` として PlanGate、frontend verify、Claude review gate を通す
- 納期 / 優先度: Home Featured の UI 不整合を最小差分で解消する
- 触ってよいファイルや領域: `docs/tasks/TASK-home-featured-multi-purchase-links-2026-04-13/`, `src/pages/index.astro`

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: Reviews 一覧では主 CTA の後に `purchaseLinks.map(...)` で subordinate な購入リンク群を描画している
- 未確定事項: なし
