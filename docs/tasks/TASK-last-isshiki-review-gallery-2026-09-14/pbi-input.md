# PBI Input

## Task

- task-id: TASK-last-isshiki-review-gallery-2026-09-14
- title: 『最後の一色（上下）』レビュー・ギャラリー反映
- owner: Codex
- date: 2026-09-14

## Request Summary

- 依頼の要約: 添付されたインフォグラフィックとギャラリー画像を使い、『最後の一色（上下）』のレビューをレビュー・ギャラリーページへ反映する。
- 背景: 読書withCocoの問い・見方・今日の一歩を、和田竜の歴史小説と読者の生活へつなげる。

## Goal

- 達成したいこと: 公開済みコンテンツコレクションとしてレビュー詳細、レビュー一覧、ギャラリー一覧、ギャラリー詳細に表示できる状態にする。
- 完了条件: レビューとギャラリーが同じ slug で相互接続され、画像、書誌情報、提供された購入リンク、ブランド準拠の問い・小さな一歩が表示され、frontend verify と Claude review gate を通過する。

## Scope

- 含める: `src/content/reviews/` と `src/content/gallery/` の新規エントリ、`public/assets/` の指定画像、PlanGate記録。
- 含めない: 既存ページロジック、既存コンテンツ、既存の未追跡ファイル、X投稿、サイト外への追加連絡。

## Constraints

- 既存運用との整合: `published: true`、既存の content schema、レビューとギャラリーの `relatedReview` 連携を使う。
- 納期 / 優先度: 今回の反映を優先。
- 触ってよいファイルや領域: 上記 scope の新規ファイルのみ。`public/assets/` は既存の派生メディア処理対象外の公開素材置き場として使い、`public/media/manifest.json` は変更しない。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/reading-with-coco-design-doctrine.md`
- 関連 issue / PR: なし

## Notes

- 原本はインフォグラフィック 1080×1350、ギャラリー 1122×1402。公開用JPEG/WebPは同じ寸法・4:5比率を保ち、性能予算に収まる品質へ変換している。アセット名はslugと同じ `isshiki` 表記に統一し、原本は `inbox/` に保全する。
- 本文はユーザーの読後感、添付インフォグラフィック、出版社・著者の公開情報を接続して作成する。
