# PBI Input

## Task

- task-id: TASK-reviews-reading-notes-copy-refresh-2026-04-21
- title: Reviews page の READING NOTES 文言をページ紹介向けに更新
- owner: Codex
- date: 2026-04-21

## Request Summary

- 依頼の要約: Reviews ページ右カラム `READING NOTES` の「このページでめくれるテーマ」と「こんな気分の日に」を、個別レビュー紹介ではなく一覧ページ紹介として自然に読める内容へ更新する。
- 背景: 前回タスクで READING NOTES の役割は「レビューページ紹介」に統一済みだが、現行のテーマタグと cue 文言は `tags` / `recommendedFor` の実データ寄りで、ページ全体の役割に対してまだ最適化しきれていない。

## Goal

- 達成したいこと: 右カラムを見た瞬間に、「このページにはどんなレビューが並び、どんな気分のときに開くとよいか」が自然に伝わる状態へ寄せる。
- 完了条件: task 文書を Source of Truth として整備し、`src/pages/reviews.astro` の対象文言だけを最小差分で更新し、`npm run lint` / `npm run typecheck` / `npm run build` / `npm run test:e2e` / `npm run verify:frontend` と Claude review gate `ok: true` を完了する。

## Scope

- 含める: `READING NOTES` 内のテーマタグ文言、`こんな気分の日に` の箇条書き文言、今回タスクの PlanGate 文書、status/daily 記録。
- 含めない: 左ヒーロー本文変更、CTA ラベル変更、featured review / review stream のコピー変更、CSS やレイアウト構造変更、新規 UI 追加、他ページへの横展開。

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、PlanGate 文書先行、frontend verify 一式、`claude-review-gate` を必須とする。
- 納期 / 優先度: 今回の狙いは意味の輪郭を研ぎ澄ますことであり、見た目や構造は触らず最小差分で完了する。
- 触ってよいファイルや領域: `docs/tasks/TASK-reviews-reading-notes-copy-refresh-2026-04-21/*`、`src/pages/reviews.astro`、`inbox/daily/2026-04-21.md`。

## References

- 関連ドキュメント: `AGENTS.md`、`CLAUDE.md`、`docs/parallel-dev-core.md`、`docs/parallel-dev-config.md`、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md`、`docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: 現行 `READING NOTES` は `src/pages/reviews.astro` 内で `reviewCards` から theme / cue を派生している。今回の役割に合わせ、ページ紹介専用の文言へ寄せる必要がある。
- 未確定事項: なし
