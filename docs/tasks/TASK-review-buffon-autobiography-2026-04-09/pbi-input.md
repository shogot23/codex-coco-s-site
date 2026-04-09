# PBI Input

## Task

- task-id: TASK-review-buffon-autobiography-2026-04-09
- title: レビュー追加: ジャンルイジ・ブッフォン自伝　何度でも立ち上がる
- owner: 翔吾
- date: 2026-04-09

## Request Summary

- 依頼の要約: レビューページに新規レビュー「ジャンルイジ・ブッフォン自伝　何度でも立ち上がる」を追加する。ギャラリーにも同書を追加する。
- 背景: 書籍レビューの定期追加タスク。青天を参考実装とする。

## Goal

- 達成したいこと: 新規レビュー1件とギャラリー1件の追加
- 完了条件: 段階検証（lint → typecheck → build → test:e2e → verify:frontend）通過、一覧・詳細・ギャラリーで正しく表示

## Scope

- 含める: review content / gallery content の新規作成、画像パスの frontmatter 記載
- 含めない: テンプレート変更、config.ts 変更、画像ファイル自体の配置

## Constraints

- アフィリエイト URL はユーザー提供のものを改変しない
- 画像ファイル名は確定名を使用（ユーザーが後日その名前で配置）

## 承認済み例外（review-addition-checklist.md に対する偏差）

以下の項目について、今回は意図的に例外とする。理由と前提を明記する。

| checklist 項目 | 例外内容 | 理由 |
|---------------|---------|------|
| Amazon 検索リンクあり | 今回は楽天リンクのみ | ユーザー提供のアフィリエイトリンクに Amazon が含まれていないため |
| cover / infographic の画像パスが存在するか | ファイル自体は未配置、パスのみ frontmatter に記載 | ユーザーが後日配置する前提。配置まで hero fallback で対応 |

上記例外はオーナー（翔吾）が承認済み。

## References

- 関連ドキュメント: docs/review-addition-checklist.md
- 参考実装: src/content/reviews/seiten.md / src/content/gallery/novel-seiten.md

## Notes

- 画像配置後の follow-up タスクで画像ファイルのコミットと表示確認を行う想定
