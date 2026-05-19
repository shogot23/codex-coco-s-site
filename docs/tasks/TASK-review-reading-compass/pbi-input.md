# PBI Input

## Task

- task-id: TASK-review-reading-compass
- title: Reviews Reading Compass
- owner: Codex
- date: 2026-05-19

## Request Summary

- 依頼の要約: レビュー記事が増えたため、訪問者が気分・今の悩み・気づきから記事を選べるように `/reviews/` を整理する。
- 背景: 公開レビューが増え、日付順だけでは今の自分に合う一冊を探しにくくなっている。

## Goal

- 達成したいこと: 読書 with Coco のブランド方針に沿い、読者のモヤモヤからレビュー詳細へ入れる静かな選書導線を追加する。
- 完了条件: `/reviews/` に Reading Compass 入口が表示され、既存の hero / featured / stream / purchaseLinks の役割を壊さず、frontend verify と Claude review gate が通る。

## Scope

- 含める:
  - `/reviews/` に「気分」「モヤモヤ」「気づき」から選べる入口を追加する。
  - 既存 frontmatter の `readingCompass` / `recommendedFor` / `tags` / `excerpt` を活用する。
  - E2E smoke に新しい入口と詳細遷移の確認を追加する。
- 含めない:
  - review schema への新規 taxonomy field 追加。
  - 全レビュー frontmatter の一括移行。
  - URL state 付き filter / search UI。
  - 購入リンクの目立たせ方変更。

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、PlanGate、`npm run verify:frontend`、`claude-review-gate` を通す。
- 納期 / 優先度: 最小差分で、公開導線の読みやすさを優先する。
- 触ってよいファイルや領域: `src/pages/reviews.astro`、`tests/e2e/site-smoke.spec.ts`、`docs/tasks/TASK-review-reading-compass/`。

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/brand/reading-with-coco-brand-strategy.md`
  - `docs/brand/reading-with-coco-content-guidelines.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: `readingCompass` は読みはじめる前の姿勢、`recommendedFor` は読者対象として役割を混ぜない。
- 未確定事項: v2 で taxonomy / filter 化するかは今回判断しない。
