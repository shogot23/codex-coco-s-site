# PBI Input

## Task

- task-id: `TASK-stoic-mindset-review-2026-08-14`
- title: 『ストイック・マインドセット』Review・Gallery公開
- owner: shogo
- date: 2026-08-14

## Request Summary

- 依頼の要約: 提供されたGallery画像とインフォグラフィックを既存ページへ反映し、確認済みの書籍内容に基づくレビューと、もしもアフィリエイトの楽天リンクを公開する。
- 背景: 前段でKADOKAWA公式目次、原著出版社、公式試し読み、著者インタビューを照合し、画像制作時の調査メモと読書withCoco向けレビュー完成稿を作成済み。

## Goal

- 達成したいこと: 『ストイック・マインドセット』のReview詳細とGallery作品を公開し、両一覧への掲載、相互導線、購入補助導線を既存構造で成立させる。
- 完了条件: Reviewでは提供インフォグラフィック、Galleryでは提供された書斎画像を使用し、レビュー本文、Life Repair Notes、相互リンク、正規化された購入リンクが表示され、frontend verify、Claude Review Gate、Sol独立確認、PRのsquash mergeまで完了する。

## Scope

- 含める: 新規review Markdown、新規gallery Markdown、Review用インフォグラフィックとGallery用画像の公開用コピー、画像派生manifest、本タスク記録、当日のdaily記録。
- 含めない: Review/Galleryテンプレート、content schema、既存コンテンツ、購入導線UI、Galleryでのインフォグラフィック使用、もしもインプレッション画像の新規schema対応。

## Constraints

- 既存運用との整合: ブランド正本、content guidelines、AI operations、既存content schema、frontend verify、Claude Review Gate、PR Merge Workflowに従う。
- 納期 / 優先度: 現在の依頼として優先実施する。
- 触ってよいファイルや領域: `src/content/reviews/`、`src/content/gallery/`、`public/uploads/review/infographic/`、`public/uploads/gallery/books/`、`public/media/manifest.json`、`docs/tasks/TASK-stoic-mindset-review-2026-08-14/`、`inbox/daily/2026-08-14.md`のみ。

## References

- 関連ドキュメント: `docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/brand/reading-with-coco-ai-operations.md`、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md`。
- 関連issue / PR: なし。

## Notes

- 領域固有メモ: `image-1.png`はGallery用の書斎画像、`image-2.png`はReview用インフォグラフィックとして用途を分離する。Gallery画像は公式書影ではなく、主要タイトル以外の背景・表紙細部に生成文字を含むため`visualOrigin: "ai-generated"`とする。もしもHTMLは既存`purchaseLinks`形式に合わせ、`href`のHTMLエンティティを通常の`&`へ1回だけ正規化する。
- 未確定事項: なし。インフォグラフィックの「5分」は本書固有の指定ではなく、読書withCocoが疲れた読者へ渡す低負荷な実生活への翻訳として明示的に扱う。
