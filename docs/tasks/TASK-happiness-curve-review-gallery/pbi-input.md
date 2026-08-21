# PBI Input

## Task

- task-id: TASK-happiness-curve-review-gallery
- title: ハピネス・カーブのレビューとギャラリー反映
- owner: Codex
- date: 2026-08-21

## Request Summary

- 依頼の要約: `ハピネス・カーブ 人生は50代で必ず好転する` をレビューとギャラリーへ反映し、指定画像ともしもアフィリエイトURLを既存規約に沿って登録する。
- 背景: 読書with Coco の本 × ココちゃん × 学びの導線に、新しいレビューと読後の景色を追加する。

## Goal

- 達成したいこと: レビュー詳細・レビュー一覧・ギャラリー一覧・ギャラリー詳細から新規コンテンツを正しく閲覧できる状態にする。
- 完了条件: ブランド規約、content schema、画像メディアパイプライン、相互リンク、affiliate URL、frontend verify、Claude review、PR squash merge、main同期を確認する。

## Scope

- 含める: 指定レビュー原稿の公開準備、指定画像の gallery asset 化、対応する gallery markdown、必要な manifest/derivative 更新、相互リンク、指定 affiliate URL の purchaseLinks 反映、検証、PRからのmerge。
- 含めない: 既存コンポーネントの刷新、無関係な画像・レビューの修正、inbox/gallery や他の未追跡ファイルの整理・削除。

## Constraints

- 既存運用との整合: `docs/brand/`、`docs/reading-with-coco-design-doctrine.md`、`docs/gallery-generation.md`、既存 Review/Gallery schema を正本とする。
- 納期 / 優先度: ユーザー指定の公開タスク。小さく安全な差分を優先する。
- 触ってよいファイルや領域: 対象 review、対象 gallery entry、対象 public asset、必要な media/gallery manifest、今回の PlanGate 記録。

## References

- 関連ドキュメント: `docs/parallel-dev-config.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/reading-with-coco-design-doctrine.md`, `docs/gallery-generation.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: affiliate HTML は既存の `purchaseLinks` URL schema に変換し、impression pixel は本文へ持ち込まない。
- 未確定事項: gallery import の自動判定結果と最終 asset filename は既存パイプライン実行後に確定する。
