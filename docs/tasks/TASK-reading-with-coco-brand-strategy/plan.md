# Plan

## Task

- task-id: TASK-reading-with-coco-brand-strategy
- related pbi: `docs/tasks/TASK-reading-with-coco-brand-strategy/pbi-input.md`

## Intent

- 何を変えるか: 読書withCocoのブランド戦略、制作判断、AI運用ルールを `docs/brand/` に分けて追加し、入口文書から参照する。
- なぜ今やるか: 今後の Codex / Claude Code 作業で、投稿文、レビュー文、画像プロンプト、サイト改修の判断基準を揃えるため。

## Scope Declaration

- 変更対象ファイル:
  - `docs/brand/reading-with-coco-brand-strategy.md`
  - `docs/brand/reading-with-coco-content-guidelines.md`
  - `docs/brand/reading-with-coco-ai-operations.md`
  - `docs/tasks/TASK-reading-with-coco-brand-strategy/pbi-input.md`
  - `docs/tasks/TASK-reading-with-coco-brand-strategy/plan.md`
  - `docs/tasks/TASK-reading-with-coco-brand-strategy/test-cases.md`
  - `docs/tasks/TASK-reading-with-coco-brand-strategy/status.md`
  - `AGENTS.md`
  - `CLAUDE.md`
- 変更しないもの:
  - frontend の表示、実装、テスト
  - `.codex/skills` / `.claude/skills`
  - main worktree の既存差分
  - `inbox/` と他 task ディレクトリ

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単独の文書整備として進める。

## Implementation Steps

1. PlanGate の `pbi-input.md` / `plan.md` / `test-cases.md` を作成する。
2. `docs/brand/` にブランド原典、制作ガイドライン、AI運用ルールを追加する。
3. `AGENTS.md` / `CLAUDE.md` に本文を貼りすぎず、`docs/brand/` への参照を追加する。
4. `status.md` を更新し、検証結果と残件を記録する。
5. `git diff --check`、可能なら `npm run verify:frontend` を実行する。
6. Claude review gate を通し、必要なら最小差分で修正する。
7. commit、push、PR 作成を行う。

## Risks And Guards

- 想定リスク: ブランド文書が情緒的すぎて、AI作業の判断基準として使いにくくなる。
- 回避策: 禁止事項、使い分け、公開前チェック、AI向け参照順を明文化する。
- scope 外に見つけた事項の扱い: 今回は変更せず、必要なら別タスク化する。

## Verification

- 実行するコマンド:
  - `git diff --check`
  - `npm run verify:frontend`
- 追加確認:
  - `docs/reading-with-coco-design-doctrine.md` と矛盾していないこと
  - `AGENTS.md` / `CLAUDE.md` が正本文書への参照に留まっていること
  - `.codex/skills` / `.claude/skills` を追加していないこと

## Approval

- approver: owner self-approval
- status: approved
- note: ユーザー指定の isolated worktree 方針と scope に基づき、文書整備のみ進める。

plan 承認前はコード変更しない。
