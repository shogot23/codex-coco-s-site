# PBI Input

## Task

- task-id: `TASK-saikyo-komyuryoku-review-2026-08-14`
- title: 『最強のコミュ力のつくりかた』Review・Gallery公開
- owner: shogo
- date: 2026-08-14

## Request And Goal

- 提供されたインフォグラフィックをReviewへ、ココちゃんと書籍の写真をGalleryへ反映する。
- 先に作成したレビュー本文、Life Repair Notes、ReviewとGalleryの相互導線、正規化したもしも楽天リンクを公開する。
- ブランド原典と既存content schemaを守り、frontend verify、Claude Review Gate、Sol独立確認を完了してPRをsquash mergeする。

## Scope

- 含める: 新規review/gallery Markdown、公開用画像2点、画像manifest、PlanGate/status/worklog。
- 含めない: page template、schema、既存コンテンツ、購入導線UI、もしも計測用1px画像の変更。

## Constraints And References

- `docs/brand/reading-with-coco-brand-strategy.md`、content guidelines、AI operations、review addition checklistを正本とする。
- Reviewを主導線、Galleryを読後の余韻、購入リンクを第三優先にする。
- 別worktree `codex/stoic-mindset-content`には触れず、共有manifestはPR前に最新mainを再確認して再生成する。
- 当日dailyの競合を避け、実施記録は本タスク固有の`worklog.md`に残す。
