# PBI Input

## Task

- task-id: `TASK-soccer-geopolitics-review`
- title: サッカーと地政学のギャラリー差し替えとレビューページ追加
- owner: Codex
- date: 2026-04-22

## Request Summary

- 依頼の要約: `inbox/gallery` の新画像で「サッカーと地政学」のギャラリーを差し替え、`inbox/infographic` の画像を使ったレビューページを追加する
- 背景: 既存のギャラリー展示はあるが、レビュー導線が未接続で、差し替え用アセットとレビュー文がそろったため公開導線まで整える

## Goal

- 達成したいこと: 「サッカーと地政学」が Gallery と Reviews の両方から辿れる状態にし、両ページを相互リンクさせる
- 完了条件: ギャラリー画像が新アセットに差し替わり、新規レビューがビルド対象となり、関連導線が機能する

## Scope

- 含める: 公開画像の差し替え、レビューコンテンツ追加、既存ギャラリー entry の関連付け、PlanGate と作業状態更新
- 含めない: トップページや一覧ページのデザイン改修、既存レビュー本文の全面リライト、他書籍データの整理

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、frontend verify と Claude review gate を通す
- 納期 / 優先度: 依頼分をこの turn で完了させる
- 触ってよいファイルや領域: `src/content/`, `public/uploads/`, `docs/tasks/TASK-soccer-geopolitics-review/`

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: Gallery は `relatedReview` が入ると詳細導線が強化される。Review は `infographic` を hero 画像として使える
- 未確定事項: レビュータイトルは書名そのままを採用し、タグは既存 schema 内で最も近いものを使う
