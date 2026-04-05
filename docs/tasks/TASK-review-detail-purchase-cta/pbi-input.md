# PBI Input

## Task

- task-id: TASK-review-detail-purchase-cta
- title: review detail purchase CTA を PlanGate 付きで改善する
- owner: codex
- date: 2026-04-05

## Request Summary

- 依頼の要約: review detail page に限定して purchase CTA を改善し、lightweight PlanGate の最初の実戦 task 文書を残したうえで独立 PR にする
- 背景: CTA 改善を広げすぎず、scope / out-of-scope / tests を task 文書で固定した採用事例を 1 本作りたい

## Goal

- 達成したいこと: review detail 上部の purchase CTA を、購入先数に応じて迷いなく辿れる導線に整える
- 完了条件: `src/pages/reviews/[slug].astro` のみで CTA 改善が反映され、task 文書に scope / verify / status が残る

## Scope

- 含める: `docs/tasks/TASK-review-detail-purchase-cta/` の task 文書、`src/pages/reviews/[slug].astro` の CTA ロジックと必要最小の文言 / style 調整
- 含めない: reviews 一覧、トップページ、他ページ、PlanGate 導入差分、無関係な refactor

## Constraints

- 既存運用との整合: `docs/reading-with-coco-design-doctrine.md` の CTA 優先度を維持し、purchase CTA を主導線より強くしない
- 納期 / 優先度: 最小差分で当日中に独立 PR として完了する
- 触ってよいファイルや領域: `docs/tasks/TASK-review-detail-purchase-cta/` と `src/pages/reviews/[slug].astro`

## References

- 関連ドキュメント: `docs/frontend-playbook.md`, `docs/reading-with-coco-design-doctrine.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: visual thesis は「読書の主導線を崩さず、購入意思が生まれた瞬間だけ迷わせない」
- 未確定事項: CTA 専用 e2e は今回追加しないため、既存 smoke と目視で補う
