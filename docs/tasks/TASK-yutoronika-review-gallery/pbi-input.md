# PBI Input

## Task

- task-id: TASK-yutoronika-review-gallery
- title: 『ユートロニカのこちら側』Review/Gallery追加
- owner: Shogo
- date: 2026-09-30

## Request Summary

- 依頼の要約: 提供されたギャラリー写真とインフォグラフィックを使い、ブランド方針に沿う書評とギャラリー記事を公開する。
- 背景: 書評は読者の違和感、見方の変化、小さな行動をつなぐ。両ページを相互に案内し、指定のもしもアフィリエイトリンクを掲載する。

## Goal

- 達成したいこと: `/reviews/yutoronika-no-kochira-gawa-ogawa-satoshi/` と対応する Gallery 詳細を追加し、Pagesで公開を確認する。
- 完了条件: Claude review、content audit、frontend verify、PR checks、squash merge、main同期、公開HTMLと最適化画像を確認する。

## Scope

- 含める: Review/Gallery Markdown、提供画像2点、`public/media/manifest.json`、このタスクの記録と2026-09-30の日次作業記録。
- 含めない: サイト共通UI、既存コンテンツ、inbox素材、`.playwright-cli/`、`output/`、依存関係、別タスクの変更。

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、ブランド原典、PlanGate、Claude review gate、frontend verify、PR merge手順に従う。
- 納期 / 優先度: この依頼内でPR作成からマージ後確認まで完了する。
- 触ってよいファイルや領域: 上記の追加対象に限定する。

## References

- 関連ドキュメント: `AGENTS.md`; `docs/parallel-dev-config.md`; `docs/brand/reading-with-coco-brand-strategy.md`; `docs/brand/reading-with-coco-content-guidelines.md`; `docs/brand/reading-with-coco-ai-operations.md`; `docs/process/lightweight-plangate.md`; `skills/coco-review-gallery-release/SKILL.md` (memory skill copy)
- 関連 issue / PR: なし。ユーザー依頼に基づく新規作業。

## Notes

- 領域固有メモ: インフォグラフィックは1080×1350、ギャラリー写真は1092×1440。写真は原寸のまま保存する。
- 未確定事項: ギャラリー写真の制作由来は提供情報から確認できないため、`visualOrigin` を推定で設定しない。
