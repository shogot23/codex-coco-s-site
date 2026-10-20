# PBI Input

## Task

- task-id: TASK-works-autopublish-20261016-choose-your-part-note-3min
- title: 「3分の選べる範囲メモ」を新規公開する
- owner: gpt-6-luna / max（サイト工程の単一writer）
- date: 2026-10-16

## Request Summary

- 依頼: 制作済みの新規1件だけを、最新origin/mainから作る隔離worktreeで取り込み、検証・レビュー・公開確認まで進める。
- 背景: 今回のAutomation:coco指示は、制作成功後のこの1件について、Luna単独でサイト公開まで進める継続承認を与えている。

## Goal

- 達成したいこと: slug `choose-your-part-note-3min` のワークを `stoic-mindset` レビューへ接続し、公開ページにする。
- 完了条件: 必須検証・Claudeレビュー・PR CIが通り、Pages本番の一覧・詳細・相互リンク・HTML参照画像を確認する。

## Scope

- 含める: 納品済み`site-work.json`の検証と取り込み、対象ページだけの公開化、PlanGate/status/daily記録、プレビューと公開後の確認、PRリリース。
- 含めない: 制作元7ファイルの編集、画像の修正・再生成、既存ワークの公開、X/Instagram投稿、無関係な変更。

## Constraints

- 参照: `docs/works-publishing.md`、ブランド指針、Design Doctrine、`claude-review-gate`、`pr-merge`。
- 承認根拠: 人間ユーザーが今回のAutomation:coco指示で明示した継続承認。対象はこの新規1件のサイト公開のみ。追加承認待ちにはしない。
- 停止条件: SHA/ファイル不足、slug/画像衝突、書誌・原稿・分類不一致、プレビュー・検証・Claude・CI・Pages失敗、画像修正の必要を確認した時点で止まり親へ報告する。モデル変更、再生成、既存公開物への拡張をしない。
- 変更範囲: 新規ブランチ上の当該slugのMarkdownと画像、および今回のdocs/tasks記録。build成果物は既存コマンドの出力に限る。

## References

- repo文書: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/works-publishing.md`、ブランド3文書、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md`。
- 納品元: `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-16_2157_choose-your-part-note-3min`（凍結、読み取り専用）。
- 参照先: 公開レビュー`src/content/reviews/stoic-mindset.md`（title: `ストイック・マインドセット`）。
