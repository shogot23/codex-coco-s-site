# PBI Input

## Task

- task-id: `TASK-gallery-and-exercise-review-2026-04-23`
- title: ギャラリー2件追加と運動本レビュー反映
- owner: Codex
- date: 2026-04-23

## Request Summary

- 依頼の要約: `inbox/gallery/` の2画像を gallery に反映し、インフォグラフィックがある `世界一効率がいい 最高の運動` は review にも反映する
- 背景: ユーザーが書影画像2件、インフォグラフィック1件、レビュー文、各書籍のもしもアフィリエイトURLを提供済み

## Goal

- 達成したいこと: 新規 gallery 2件と新規 review 1件を既存導線を壊さず公開し、運動本は gallery から review detail へつながる状態にする
- 完了条件: gallery と review の content が追加され、verify と Claude review gate が完了している

## Scope

- 含める:
  - gallery 用画像2件の公開配置
  - infographic 画像1件の review 用公開配置
  - `src/content/gallery/` への新規2件追加
  - `src/content/reviews/sekaiichi-koritsuga-ii-saikou-no-undou.md` の追加
  - `src/content/config.ts` の review tag 許可値の最小更新
  - task 文書、status、daily 記録
- 含めない:
  - 既存 schema の変更
  - 既存 page component の改修
  - `終末のワルキューレ奇譚 ジャック・ザ・リッパーの事件簿 10` の review 新規作成

## Constraints

- 既存運用との整合: `publish/dev-critical` として PlanGate、frontend verify、Claude review gate を通す
- 納期 / 優先度: 今回の素材反映を最優先
- 触ってよいファイルや領域:
  - `docs/tasks/TASK-gallery-and-exercise-review-2026-04-23/`
  - `public/uploads/gallery/books/`
  - `public/uploads/review/infographic/`
  - `src/content/config.ts`
  - `src/content/gallery/`
  - `src/content/reviews/`
  - `inbox/daily/`

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/process/lightweight-plangate.md`
- 関連 issue / PR:
  - なし

## Notes

- 領域固有メモ:
  - visual thesis: 新規追加分も既存の静かな本棚トーンを崩さず、景色から言葉へつながる導線を保つ
  - content plan: 漫画1冊は景色中心、運動本は景色＋レビュー＋インフォグラフィックで学び導線を強める
  - interaction thesis: gallery から review、review から購入導線までを既存 UI のまま自然につなぐ
- 未確定事項:
  - なし。購入リンクとレビュー本文は受領済み。タグはユーザー指摘に基づき `健康` / `運動` を採用する
