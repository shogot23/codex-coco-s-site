# PBI Input

## Task

- task-id: TASK-gallery-generate-orphan-guard-2026-04-21
- title: gallery:generate の orphan 削除ロジック根本修正
- owner: Codex
- date: 2026-04-21

## Request Summary

- 依頼の要約: `gallery:generate` が manifest 未登録の既存 gallery markdown を削除しうる挙動を根本修正する
- 背景: 手動作成・import 起点の gallery entry が旧 generate フローで orphan 扱いされ、再生成時に消えるリスクが確認された

## Goal

- 達成したいこと: manifest 未登録の既存 gallery markdown が、不用意な generate 実行で削除されないようにする
- 完了条件: 削除条件が安全側に変更され、関連する自動テストまたは最小限の検証で意図が確認できる

## Scope

- 含める: `scripts/generate-gallery-md.ts` の削除判定見直し、必要なテスト追加、必要最小限の運用文書更新
- 含めない: gallery コンテンツ個別の修正、manifest 全件同期、UI 表示変更

## Constraints

- 既存運用との整合: `gallery:import` 推奨フローと衝突しないこと。既存の regenerate 用挙動を壊しすぎないこと
- 納期 / 優先度: 高。今回の gallery/review 追加を安全にコミットできる状態へ戻す
- 触ってよいファイルや領域: `scripts/`、必要なら `docs/gallery-generation.md`、task 文書

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/gallery-generation.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: 現在の repo では manifest 未登録の gallery markdown が既に複数存在する
- 未確定事項: 安全策をドキュメントだけで補うか、スクリプト側で完全に防ぐかは実装調査後に確定する
