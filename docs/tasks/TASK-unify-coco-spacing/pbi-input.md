# PBI Input

## Task

- task-id: TASK-unify-coco-spacing
- title: サイト内のブランド名を「読書 with Coco」に統一
- owner: 読書 with Coco
- date: 2026-10-15

## Request Summary

- 依頼の要約: サイト全ページのブランド表記を「読書 with Coco」に統一する。大文字小文字とスペースを厳密に扱う。
- 背景: 先行PR #209 で「読書with Coco」に揃えた後、今回の指定で「読書」と `with` の間にもASCII空白1字を置くことが明確になった。現行mainのページ、SEO/RSS、コンテンツ、テスト、ブランド指針を新しい厳密表記へ揃える。

## Goal

- 達成したいこと: 読者に見える全ページと公開メタデータの日本語ブランド名を、ASCII空白1字で区切った「読書 with Coco」に揃える。
- 完了条件: 公開ソースと現行指針の日本語ブランド表記が正確な大文字小文字・空白になり、ビルド出力、本番HTML、RSSまで一致する。

## Scope

- 含める: `src/` のページ、レイアウト、SEO、RSS、コンテンツ、関連E2Eテスト、`AGENTS.md` / `CLAUDE.md` / `DESIGN.md` / `README.md` を含む現行の運用・ブランド・フロントエンド指針、およびこの作業の PlanGate 記録と表記検査スクリプト。
- 含めない: 英語の `Reading with Coco`、URL/ファイル名/識別子、過去タスク・日次記録、画像内文字、デザインや導線の変更。

## Constraints

- 既存運用との整合: `AGENTS.md` と `docs/parallel-dev-config.md` を正典とし、`publish/dev-critical` の Claude review gate を通してPR経由で反映する。
- 納期 / 優先度: PR からマージまで実施する。
- 触ってよいファイルや領域: 宣言した公開ソース、関連テスト、現行運用文書、作業記録に限定する。

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`, `docs/brand/reading-with-coco-brand-strategy.md`
- 関連 issue / PR: #209（先行の `読書with Coco` 表記統一）

## Notes

- 領域固有メモ: 正確な表記は `読書 with Coco`。`読書` と `with` の間、`with` と `Coco` の間にASCII空白を1字ずつ置き、`with` は小文字、`Coco` は先頭だけ大文字。
- 未確定事項: なし
