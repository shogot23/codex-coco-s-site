# PBI Input

## Task

- task-id: TASK-review-detail-role-separation
- title: review detail page の導入文とおすすめ対象の役割分離
- owner: Codex
- date: 2026-04-13

## Request Summary

- 依頼の要約: `buffon-autobiography` を起点に、review detail page の「読みはじめる前の、ひとこと。」と「こんな人におすすめ」の文意重複を解消し、同方針を他 review detail pages に横展開する。
- 背景: 現状は detail template が `recommendedFor` を2箇所で使っており、導入文と対象読者の役割が曖昧になっている。

## Goal

- 達成したいこと: review detail page で「読書前の視点」と「向いている読者属性」を別情報として見せる。
- 完了条件: `buffon-autobiography` の重複解消、他 published review への横展開、`npm run typecheck` と `npm run build` の成功。

## Scope

- 含める: reviews collection schema、review detail template、`src/content/reviews/*.md` の必要最小限の文言調整、task/status/daily 記録。
- 含めない: レイアウト刷新、レビュー一覧ページの大規模改修、review 本文の全面書き換え。

## Constraints

- 既存運用との整合: `publish/dev-critical` として Claude review gate を通す。既存の世界観とデザインは維持する。
- 納期 / 優先度: 今回の修正を一気通貫で完了させる。
- 触ってよいファイルや領域: `src/content/config.ts`、`src/pages/reviews/[slug].astro`、`src/content/reviews/*.md`、`docs/tasks/TASK-review-detail-role-separation/*`、`inbox/daily/2026-04-13.md`。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/reading-with-coco-design-doctrine.md`、`docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: content 側で役割分離を持たせつつ、template の重複源も最小修正する。
- 未確定事項: 新規 frontmatter field 名をどれにするか。
