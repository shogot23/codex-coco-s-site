# PBI Input

## Task

- task-id: TASK-publish-boutique-work
- title: 未反映ワークをワークページへ反映
- owner: Luna
- date: 2026-09-29

## Request Summary

- 依頼の要約: 未反映のワークがあればワークページへ反映する。
- 背景: ユーザーから公開反映の明示依頼があり、Solの読み取り監査で候補を調査した。

## Goal

- 達成したいこと: origin/main 時点で未反映の `beyond-numbers-star-note-4min` をサイトへ追加して公開する。
- 完了条件: 既存データとの衝突・参照整合性を確認し、公開ページに反映、各必須検証とClaude review gateを通し、PR経由のデプロイ後に一覧・詳細の公開URLを確認する。

## Scope

- 含める: boutique ワークのサイト原稿・画像を取り込み、下書きプレビュー後、対象 `published` のみ true にする。
- 含めない: 他のinbox成果物、X投稿、inbox/history変更、main作業ツリーの変更。

## Constraints

- 既存運用との整合: `docs/works-publishing.md` に従う。公開差分はユーザー依頼を承認根拠とする。
- 納期 / 優先度: 今回の依頼内で完了。
- 触ってよいファイルや領域: 新規task記録、`src/content/works/beyond-numbers-star-note-4min.md`、`src/assets/works/beyond-numbers-star-note-4min.png`。PR・merge操作は検証とレビュー完了後。

## References

- 関連ドキュメント: `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`, `docs/works-publishing.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: origin/main には curiosity-sprout-3min が既に公開済み。対象候補はboutiqueの1件のみ。
- 未確定事項: なし
