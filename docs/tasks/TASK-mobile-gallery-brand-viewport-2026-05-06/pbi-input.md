# PBI Input

## Task

- task-id: TASK-mobile-gallery-brand-viewport-2026-05-06
- title: Mobile Gallery Spacing And Brand Viewport Fix
- owner: Codex
- date: 2026-05-06

## Request Summary

- 依頼の要約: スマホの Gallery 一覧表示で、著者名と「景色をひらく」の下の余白が大きすぎる問題を修正し、サイト全体が読書withCocoの理念をより体現できるよう主要な mobile first viewport を改善する。
- 背景: `/gallery/` の一覧カードで下部説明領域の白い余白が目立つ。あわせて、理念、文字の並び、画像の見え方、ココちゃんの役割がスマホ初期表示でも伝わるか確認する必要がある。

## Goal

- 達成したいこと: Gallery のスマホ一覧カード下部余白を最小差分で詰めつつ、Review 主導線と Gallery 副導線を保ったまま、主要ページのスマホ初期表示で brand / world / CTA / 本・ココちゃん・学びの手がかりが見える状態にする。
- 完了条件: 画像比率や route/schema を変えずに、スマホでカード余白、header 高さ、Reviews/About/Profile/Gallery の初期表示が改善され、既存導線とテストが通る。

## Scope

- 含める: `GalleryBrowse.astro` の CSS、共通 header の mobile nav、Reviews/About/Profile/Gallery の mobile hero 調整、Profile の装飾見出し整理、必要な e2e smoke 更新。
- 含めない: Gallery/archive の役割変更、archive hero redesign、画像アセット追加、content schema 変更、依存追加、route 変更、全ページ全面 redesign。

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、実装後に frontend verify と Claude review gate を通す。
- 納期 / 優先度: ユーザー指摘の Gallery 一覧余白を最優先に、主要なブランド viewport 改善を同じ PR に収める。
- 触ってよいファイルや領域: `src/components/gallery/GalleryBrowse.astro`, `src/layouts/Layout.astro`, `src/pages/{gallery,reviews,about,profile}.astro`, `tests/e2e/site-smoke.spec.ts`, 本 task docs。

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`, `docs/reading-with-coco-design-doctrine.md`, `docs/frontend-playbook.md`, `DESIGN.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: `/gallery/` は章ごとに眺める場所、`/gallery/archive/` は一覧で探す場所として維持する。
- 未確定事項: なし。ユーザーは「主要改善も同時実装」と「下余白だけ詰める」を選択済み。
