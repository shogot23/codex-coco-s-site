# Test Cases

## Task

- task-id: TASK-reading-with-coco-brand-strategy
- related plan: `docs/tasks/TASK-reading-with-coco-brand-strategy/plan.md`

## Must Check

- [x] ブランド定義、中心思想、読者像、7つの知性、4つの投稿軸が明文化されている
- [x] ココちゃんが装飾ではなく、難解な知をやわらかく翻訳する案内役として定義されている
- [x] SNS と Web サイトの役割分担が明文化されている
- [x] 禁止事項と公開前チェックリストが実務判断に使える
- [x] 最重要問い「この投稿は、読者の中に問いか行動を残しているか？」が含まれている
- [x] アフィリエイト誘導より投稿単体の価値提供を優先する方針が明確である
- [x] scope 外の変更が入っていない
- [x] 既存の design doctrine / frontend playbook と矛盾していない

## Command Checks

- [x] `git diff --check`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] `AGENTS.md` / `CLAUDE.md` の追記が参照中心で、本文を貼りすぎていない
- [x] `docs/brand/` の3文書だけで Codex / Claude Code が作業判断できる
- [x] `.codex/skills` / `.claude/skills` を追加していない

## Optional Checks

- [x] Claude review gate

## Out Of Scope

- frontend 表示確認
- skill ディレクトリ追加
- main worktree の既存差分整理
