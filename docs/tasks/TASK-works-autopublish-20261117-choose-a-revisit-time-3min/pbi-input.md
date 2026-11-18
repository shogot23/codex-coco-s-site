# PBI Input

## Task
- task-id: TASK-works-autopublish-20261117-choose-a-revisit-time-3min
- title: 『楽園の楽園』「見直す時を決める3分メモ」のサイト公開
- owner: gpt-6-luna / site writer
- date: 2026-11-17

## Request Summary
- 依頼の要約: 11月17日に新規納品された1件だけを、既存の継続承認と「作業再開してください」の指示に基づいてサイト公開する。
- 背景: inbox納品・制作検証・history追記は親エージェントが確認済み。サイト工程は最新origin/mainから作った隔離worktreeで進める。

## Goal
- 達成したいこと: slug `choose-a-revisit-time-3min` のワークを公開し、Pages上の独立した公開証拠を確認する。
- 完了条件: 下書きプレビュー、人手4点確認、Claude review、必須検証、CI、PR merge、Pages公開後の一覧・詳細・書籍導線・画像確認がすべて成功する。

## Scope
- 含める: 対象MarkdownとPNGの追加、task記録、必要な公開確認。
- 含めない: 過去納品の公開、X/Instagram投稿、画像生成、無関係な既存変更。

## Constraints
- 既存運用との整合: `docs/works-publishing.md`、ブランド3文書、`AGENTS.md` に従う。分類は `publish/dev-critical`。
- 触ってよい領域: 対象ワークのMarkdown・既納品画像、このtaskの記録、固定件数テストの名称と期待値のみ。
- 停止条件: slug/画像衝突、確認・検証・レビュー・CI・deployの失敗時は先へ進まない。

## 2026-11-18 再開承認と追加範囲
- ユーザーが「最後まで実施してください」と明示して再開を承認した。
- 前回 `npm run test:works` は35件中34件成功。`scripts/work-import.test.mjs` の固定件数テスト名・期待値は32件だが、今回の新規Markdownを含む最新baseの実数は33件。
- 追加修正は、当該テスト名と `assert.equal(names.length, 32)` の期待値を33へ合わせるだけとする。テストロジックや他の実装は変更しない。
- plan amendment をGLM-5.3で確認するまでテストファイルを編集しない。修正後に最初に `npm run test:works` を再実行し、失敗した場合は他の検証・公開工程へ進まない。

## References
- 納品: `inbox/work/2026-11-17_0902_choose-a-revisit-time-3min/site-work.json`
- 関連レビュー: `src/content/reviews/rakuen-no-rakuen.md`
- 承認・手順: `docs/works-publishing.md`
