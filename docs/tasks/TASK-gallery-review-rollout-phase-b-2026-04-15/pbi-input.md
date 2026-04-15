# PBI Input

## Task

- task-id: `TASK-gallery-review-rollout-phase-b-2026-04-15`
- title: gallery review rollout phase B
- owner: Codex
- date: 2026-04-15

## Request Summary

- 依頼の要約: 保留していた 5件の gallery 詳細について、レビュー本文を作成し Phase B を実装する
- 背景: `plans/luminous-singing-star.md` で Phase B とされていた 5件は、もしも URL 未確認のため保留だったが、このスレッドで具体的 URL 文字列が提供され、さらに本文執筆の明示的指示が出た

## Goal

- 達成したいこと: 5件の review コンテンツを新規作成し、対応する gallery に `relatedReview` を追加して review 導線と購入導線を有効化する
- 完了条件: 5件の review 詳細が生成され、gallery 詳細で `レビューを読む` と購入リンクが表示され、検証と review gate を通過する

## Scope

- 含める:
  - `src/content/reviews/*.md` の新規作成 5件
  - 対応する `src/content/gallery/*.md` の `relatedReview` 追加と `needs_review` 更新
  - Phase B 用 task docs の作成と更新
- 含めない:
  - `src/pages/gallery/[slug].astro`
  - `src/pages/reviews.astro`
  - `src/pages/reviews/[slug].astro`
  - `src/content/config.ts`
  - Phase B 対象外の gallery / review

## Constraints

- 既存運用との整合: `plans/luminous-singing-star.md` を正本とし、URL確認済み 5件のみ実装する。推測で別リンクへ差し替えない
- 納期 / 優先度: high
- 触ってよいファイルや領域: `src/content/reviews/`, 対象 `src/content/gallery/`, `docs/tasks/TASK-gallery-review-rollout-phase-b-2026-04-15/`

## References

- 関連ドキュメント: `plans/luminous-singing-star.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: review 本文素材は「レビュー本文を作成してください」というユーザー明示指示を受領済みとして扱う
- 未確定事項: review slug は既存 naming に寄せて新規決定する
