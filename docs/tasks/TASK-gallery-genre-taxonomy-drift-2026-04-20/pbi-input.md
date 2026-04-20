# PBI Input

## Task

- task-id: TASK-gallery-genre-taxonomy-drift-2026-04-20
- title: Gallery genre taxonomy drift 解消
- owner: Codex
- date: 2026-04-20

## Request Summary

- 依頼の要約: gallery genre の列挙値と bucket 判定の分散を最小差分で整理し、`社会科学` を含む taxonomy drift を UI と scripts の両方で解消する。
- 背景: `社会科学` 追加は UI 側に反映済みだが、import / correction / OCR / slug 判定など scripts 側に未反映箇所が残っている。

## Goal

- 達成したいこと: app / scripts の双方で利用できる Astro 非依存の gallery taxonomy 定義を導入し、列挙値と pure mapping のみを共通化する。
- 完了条件:
  - `社会科学` が schema / CMS / gallery 一覧 / gallery 詳細 / import / correction / OCR / slug 判定で一貫して扱える
  - gallery 一覧と詳細の bucket 判定が同じ概念定義に基づく
  - 既存 slug / 既存 URL / 既存ファイル名を壊さない

## Scope

- 含める:
  - `genre` 列挙値の共通化
  - `genre bucket` 判定の共通化
  - scripts 側の `社会科学` drift 解消
  - CMS option の手同期
- 含めない:
  - CTA 文言共通化
  - `note/description` 統合
  - `purchaseLinks` component 化
  - `relatedReview` 共通化
  - `REVIEW_TAGS` 共通化
  - legacy sample data 整理

## Constraints

- 既存運用との整合: `publish/dev-critical` として PlanGate、verify、Claude review gate、Codex review、commit / push / PR まで実施する。
- 納期 / 優先度: 高。taxonomy drift の実害解消を優先する。
- 触ってよいファイルや領域:
  - `src/content/config.ts`
  - `public/admin/config.yml`
  - `src/pages/gallery.astro`
  - `src/pages/gallery/[slug].astro`
  - `scripts/gallery-import.ts`
  - `scripts/apply-gallery-corrections.ts`
  - `scripts/lib/ocr.ts`
  - `scripts/lib/slug.ts`
  - 共通 taxonomy module と task 文書

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/process/lightweight-plangate.md`
- 関連 issue / PR:
  - Advisory: gallery genre 分類ロジックの分散

## Notes

- 領域固有メモ:
  - `src/content/config.ts` は `astro:content` 依存のため scripts から直接 import できない
  - plain TS module は既存 `node` 実行方式で import 可能
  - `社会科学 -> business` prefix mapping は新規生成時のみ適用する
- 未確定事項:
  - なし。taxonomy は `src/lib/gallery-taxonomy.ts` に置く前提で進める
