# PBI Input

## Task

- task-id: TASK-hide-audible-gallery-pages
- title: Gallery の Audible 帯付き画像ページを非公開化する
- owner: Codex
- date: 2026-04-17

## Request Summary

- 依頼の要約: gallery 内の画像を棚卸しし、画像上に `ONLY FROM audible` 帯が明確にあるページを非公開にする
- 背景: 公開 gallery に権利・表記上の懸念がある画像が含まれているため、該当ページを一覧と直URLの両方から外したい

## Goal

- 達成したいこと: `ONLY FROM audible` 帯がある gallery エントリを `published: false` に変更し、公開導線から外す
- 完了条件: 該当エントリが `/gallery/` に表示されず、`/gallery/<slug>/` の静的ページも生成されない

## Scope

- 含める: `public/uploads/gallery/books/` の目視棚卸し、対応する `src/content/gallery/*.md` の `published` 更新、必要最小限の確認
- 含めない: gallery UI 改修、スキーマ追加、運用自動化、再発防止用の新機能追加、無関係な既存差分への介入

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、PlanGate と Claude review gate を通す
- 納期 / 優先度: 即時対応
- 触ってよいファイルや領域: `docs/tasks/TASK-hide-audible-gallery-pages/`、`src/content/gallery/*.md`

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: gallery 一覧と詳細ページは既存の `published` 制御に依存している
- 未確定事項: `ONLY FROM audible` 帯付きの該当枚数
