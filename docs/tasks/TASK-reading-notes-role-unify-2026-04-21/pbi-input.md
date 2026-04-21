# PBI Input

## Task

- task-id: TASK-reading-notes-role-unify-2026-04-21
- title: reviews page の READING NOTES パネル役割統一
- owner: Codex
- date: 2026-04-21

## Request Summary

- 依頼の要約: `/Users/shogo/Projects/codex-coco-s-site-main/plans/plangate-joyful-spark.md` に従い、`src/pages/reviews.astro` の READING NOTES パネルから「いちばん新しい一冊」を外して、パネルの役割を「レビューページ紹介」に揃える。
- 背景: 現状の右カラムパネルが「ページ紹介」と「最新レビュー紹介」の二役を持ち、情報設計がぶれている。

## Goal

- 達成したいこと: READING NOTES パネルをページ全体の案内に統一し、最新レビュー訴求はヒーロー側のナラティブへ役割を戻す。
- 完了条件: `src/pages/reviews.astro` の最小差分修正、PlanGate 文書整備、`npm run lint` / `npm run typecheck` / `npm run build` / `npm run test:e2e` / `npm run verify:frontend` の成功、Claude review gate `ok: true`。

## Scope

- 含める: `src/pages/reviews.astro` の不要変数削除と READING NOTES パネルの条件ブロック削除、task/status/daily 記録。
- 含めない: ヒーローコピー変更、CSS 変更、最新レビュー訴求の別位置新設、他ページやコンテンツ変更。

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、repo の frontend verify と `claude-review-gate` を通す。
- 納期 / 優先度: ユーザー指定の計画書どおり最小差分で一気通貫に完了する。
- 触ってよいファイルや領域: `src/pages/reviews.astro`、`docs/tasks/TASK-reading-notes-role-unify-2026-04-21/*`、`inbox/daily/2026-04-21.md`。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/process/lightweight-plangate.md`、`plans/plangate-joyful-spark.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: レビュー一覧の first viewport 構成は維持し、パネル内の役割だけを整理する。
- 未確定事項: なし
