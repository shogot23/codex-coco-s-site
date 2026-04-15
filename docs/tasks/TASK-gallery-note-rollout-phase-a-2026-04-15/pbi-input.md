# PBI Input: Gallery Note Rollout Phase A

## Summary

承認済み計画書 `plans/luminous-singing-star.md` を正本として、公開済み gallery 詳細ページ 63件に `note` を追加する。

## User Story

読者として、gallery 詳細ページで作品紹介と読後の余韻を別々に受け取りたい。

## Acceptance Criteria

- 公開済み Type D 63ページに `note` が追加されること
- 既存の Type A 6ページ、未公開ページ、一覧ページ、テンプレートは変更しないこと
- Phase B 対象5ページは、具体的なもしも URL 未受領のため `relatedReview` と `needs_review` を変更しないこと
- `note` は description と役割を分け、Hero / What Lingers の重複を避けること

## Scope

- `src/content/gallery/*.md` のうち、公開済みで `note` 未設定かつ `relatedReview` 未設定の 63ファイル
- 検証: `lint` / `typecheck` / `build` / 必要なら `e2e`

## Out of Scope

- Phase B のレビュー作成と購入リンク実装
- `src/pages/gallery/[slug].astro`、`src/content/config.ts`、一覧ページの変更
- 未公開ページの更新
