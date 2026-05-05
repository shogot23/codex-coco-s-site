# PBI Input — review-ultimate-rest

## タスク情報
- ID: review-ultimate-rest
- 分類: record-safe
- 担当: Claude Code

## 依頼内容
「究極の筋トレ休息法」（岡田隆）のレビューページを新規作成し、既存ギャラリーエントリにリンクする。あわせてブランド方針違反のギャラリーdescription 7件を修正。

## 目的
- 書籍レビューをサイトに追加し読者に提供する
- ギャラリーとレビューの双方向リンクを確立する
- ギャラリーdescription の品質をブランド方針に統一する

## スコープ
- 新規: レビューMD、インフォグラフィック画像
- 更新: ギャラリーエントリ 1件（relatedReview追加）+ description 7件
- 対象外: UI テンプレート変更、author フィールドのデータ不整合修正

## 制約
- main への直接 commit 禁止
- generated_at の省略禁止
- description にタイトル・著者名を含めない
