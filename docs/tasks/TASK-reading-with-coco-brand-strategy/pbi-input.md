# PBI Input

## Task

- task-id: TASK-reading-with-coco-brand-strategy
- title: 読書withCoco ブランド戦略文書化
- owner: Codex
- date: 2026-04-28

## Request Summary

- 依頼の要約: 読書withCocoのブランド戦略を、今後の Codex / Claude Code 作業で常に参照できる形に整理する。
- 背景: 読書withCocoは単なる書評サイトではなく、難解な知を忙しい大人の日常で使える「小さな武器」へ翻訳する場所として運用する必要がある。

## Goal

- 達成したいこと: ブランド原典、制作ガイドライン、AI運用ルールを `docs/brand/` 配下に整理し、AI作業時の判断基準にする。
- 完了条件: `AGENTS.md` / `CLAUDE.md` から `docs/brand/` の正本文書を参照でき、レビュー文、投稿文、画像プロンプト、サイト改修で迷わず使える粒度になっている。

## Scope

- 含める:
  - `docs/brand/reading-with-coco-brand-strategy.md`
  - `docs/brand/reading-with-coco-content-guidelines.md`
  - `docs/brand/reading-with-coco-ai-operations.md`
  - `docs/tasks/TASK-reading-with-coco-brand-strategy/`
  - `AGENTS.md`
  - `CLAUDE.md`
- 含めない:
  - frontend 実装、デザイン変更、コンテンツコレクション変更
  - `.codex/skills` / `.claude/skills` の追加
  - main worktree の既存差分整理
  - `inbox/gallery/`、`inbox/infographic/`、`docs/tasks/TASK-coco-infographic-skill-setup/` への変更

## Constraints

- 既存運用との整合: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md` と矛盾させない。
- 納期 / 優先度: publish/dev-critical 相当として、最小差分で正本参照を追加する。
- 触ってよいファイルや領域: Scope に列挙したファイルとディレクトリのみ。

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `CLAUDE.md`
  - `docs/parallel-dev-config.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
  - `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: ブランド文書は情緒だけでなく、AIが実務判断に使える形式にする。
- 未確定事項: なし
