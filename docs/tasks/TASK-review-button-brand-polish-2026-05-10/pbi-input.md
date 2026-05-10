# PBI Input

## Task

- task-id: TASK-review-button-brand-polish-2026-05-10
- title: Reviews CTA and brand polish
- owner: Codex
- date: 2026-05-10

## Request Summary

- 依頼の要約: `/reviews/` のモバイル hero CTA が `/gallery/` より大きく見えるため、ボタンサイズを揃える。あわせてサイト全体を読書withCocoのブランド思考に照らし、明確な見え方の崩れだけ最小差分で直す。
- 背景: 公開ページの確認で `/reviews/` の hero CTA がスマホ表示で過大化しており、同じパターンが About / Profile の hero CTA にも出ていた。

## Goal

- 達成したいこと: Reviews / About / Profile のモバイル hero CTA を Gallery と同程度のコンパクトな高さに揃える。
- 完了条件: PC / スマホで対象ページの CTA、改行、横スクロール、主要導線に明確な崩れがない。

## Scope

- 含める: `src/pages/reviews.astro`, `src/pages/about.astro`, `src/pages/profile.astro`, `tests/e2e/site-smoke.spec.ts`, この task docs。
- 含めない: 公開コピーの全面改稿、review / gallery content data、purchaseLinks、Gallery browse semantics、route / schema 変更、merge。

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、実装後に verify と `claude-review-gate` を通す。
- 納期 / 優先度: 最小差分で優先。
- 触ってよいファイルや領域: Scope に記載したファイルのみ。

## References

- 関連ドキュメント: `docs/parallel-dev-config.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/reading-with-coco-design-doctrine.md`, `docs/frontend-playbook.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: Gallery の hero CTA はモバイルで約 52px 高。Reviews は約 152px 高まで膨らんでいた。
- 未確定事項: なし。
