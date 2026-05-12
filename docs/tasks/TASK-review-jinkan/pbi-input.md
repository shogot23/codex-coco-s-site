# PBI Input

## Task

- task-id: TASK-review-jinkan
- title: 「じんかん」（今村翔吾）レビューページ追加
- owner: 翔吾
- date: 2026-05-12

## Request Summary

- 依頼の要約: 既存ギャラリーエントリのある「じんかん」（今村翔吾）について、ユーザー提供のレビュー文・インフォグラフィックを用いてレビューページを新規作成する
- 背景: 読書withCoco サイトへのレビュー追加。ギャラリーエントリは既存、レビュー・インフォグラフィックは新規

## Goal

- 達成したいこと: レビューページの公開、ギャラリーとの相互リンク
- 完了条件: typecheck/build 通過、codex-review ok: true

## Scope

- 含める: review 新規作成、infographic コピー、gallery に relatedReview 追加
- 含めない: UI/デザイン変更、他レビューの修正

## Constraints

- 既存運用との整合: ブランド方針（content guidelines）に即した内容
- 納期 / 優先度: 通常
- 触ってよいファイルや領域: src/content/reviews/, src/content/gallery/, public/uploads/review/infographic/

## References

- 関連ドキュメント: docs/brand/reading-with-coco-content-guidelines.md
- 関連 issue / PR: なし

## Notes

- レビュー文はユーザー提供。ブランド4軸との整合は確認済み
- インフォグラフィック: inbox/infographic/20260505-221229-じんかん-今村翔吾.png
