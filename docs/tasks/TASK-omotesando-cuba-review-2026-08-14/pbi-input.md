# PBI Input

## Task

- task-id: `TASK-omotesando-cuba-review-2026-08-14`
- title: 『表参道のセレブ犬とカバーニャ要塞の野良犬』Review・Gallery公開
- owner: shogo / Sol
- date: 2026-08-14

## Request And Goal

- 先に作成したインフォグラフィックをReviewへ、今回添付されたココちゃんと書籍の画像をGalleryへ反映する。
- ブランド原典に沿うレビュー本文とLife Repair Notesを公開し、ReviewとGalleryを相互接続する。
- ユーザー指定のもしも楽天URLを購入導線へ反映し、検証、Claude Review Gate、Sol独立確認、PRのsquash mergeまで完了する。

## Scope

- review分類: `publish/dev-critical`
- 含める: 新規review Markdown、既存gallery Markdownの更新、公開画像2点、画像manifest、PlanGate/status/worklog。
- 含めない: Astro page/component、content schema、既存URL、購入導線UI、もしも計測用1px画像、他コンテンツの変更。

## Constraints And References

- `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/brand/reading-with-coco-brand-strategy.md`、content guidelines、AI operations、`docs/review-addition-checklist.md`を正本とする。
- Reviewを主導線、Galleryを読後の余韻、購入リンクを第三優先にする。
- mainの未追跡ファイルと別セッションの作業には触れず、専用worktree `/Users/shogo/Projects/codex-coco-s-site-wakabayashi-review` のbranch `codex/add-wakabayashi-review-gallery-20260814` だけで実装する。
- 共有`public/media/manifest.json`はPR前に最新`origin/main`を再確認して再生成する。
- 当日dailyの競合を避け、実施記録は本タスク固有の`worklog.md`へ残す。
