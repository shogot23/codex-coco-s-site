# PBI Input

## Task

- task-id: TASK-works-autopublish-20261019-why-i-chose-this-book-3min
- title: 「3分の選んだ理由メモ」を新規公開
- owner: gpt-6-luna/max
- date: 2026-10-19

## Request Summary

- 依頼の要約: 今回新規の完成済みワーク1件を、隔離worktreeでプレビュー・検証し、承認済みの継続範囲で公開する。
- 背景: 制作成功、納品7ファイルのSHA/byte一致、制作側のレビューゲート完了を受領した。

## Goal

- 達成したいこと: slug why-i-chose-this-book-3min を既存Works導線へ追加する。
- 完了条件: PC/モバイル確認、必須検証、Claude gate、PR/CI/squash merge、Pages上の一覧・詳細・関連レビュー・画像のHTTP確認が通る。

## Scope

- 含める: 今回のMarkdown/PNG、必要時のみ既存テストの固定件数1点、PlanGate記録。
- 含めない: 既存inbox・制作history/job、旧PR #214/worktree、元dirty checkout、X/Instagram投稿、画像の生成・再生成。

## Constraints

- 既存運用との整合: docs/works-publishing.md とWorks import契約に従い、dry-run後に取り込み、プレビュー後に対象だけ公開する。
- 承認: 今回のautomation実行に対する人間ユーザーの明示的継続承認を根拠とする。
- 触ってよい領域: 宣言した隔離worktree内の今回のWorks記事・画像、必要な固定件数テスト1点、指定PlanGate記録のみ。

## References

- 関連ドキュメント: AGENTS.md, docs/parallel-dev-config.md, docs/works-publishing.md, ブランド/Design Doctrine/Frontend Playbook。
- 関連issue / PR: なし。
