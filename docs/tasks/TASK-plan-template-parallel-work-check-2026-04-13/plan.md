# Plan

## Task

- task-id: TASK-plan-template-parallel-work-check-2026-04-13
- related pbi: `docs/tasks/TASK-plan-template-parallel-work-check-2026-04-13/pbi-input.md`

## Intent

- 何を変えるか: `docs/tasks/_templates/plan.md` に Parallel Work Check セクションを追加する
- なぜ今やるか: マルチエージェント導入準備の運用ルールを template に固定しつつ、PR #82 とは独立した変更として扱うため

## Scope Declaration

- 変更対象ファイル: `docs/tasks/TASK-plan-template-parallel-work-check-2026-04-13/pbi-input.md`, `docs/tasks/TASK-plan-template-parallel-work-check-2026-04-13/plan.md`, `docs/tasks/TASK-plan-template-parallel-work-check-2026-04-13/status.md`, `docs/tasks/TASK-plan-template-parallel-work-check-2026-04-13/test-cases.md`, `docs/tasks/_templates/plan.md`
- 変更しないもの: `src/pages/index.astro`, PR #82 の差分、他の template、verify コマンド定義

## Implementation Steps

1. task docs を作成し、scope と review 方針を固定する
2. `stash@{0}` から `docs/tasks/_templates/plan.md` だけを選択的に復元する
3. 差分が Parallel Work Check の追加だけであることを確認し、必要な review gate を実施する

## Risks And Guards

- 想定リスク: `stash@{0}` から誤って `src/pages/index.astro` まで復元してしまう
- 回避策: `git restore --source=stash@{0} --worktree -- docs/tasks/_templates/plan.md` の単一ファイル指定で扱う
- scope 外に見つけた事項の扱い: PR #82 に関する差分や他の stash 内容は記録だけに留め、この task では触れない

## Verification

- 実行するコマンド:
  - `git diff -- docs/tasks/_templates/plan.md`
  - `git stash show -p stash@{0}`
- 追加確認: `plan.md` の差分が Parallel Work Check の追加だけであること、review gate の対象区分を妥当に判定できていること

## Approval

- approver: self
- status: approved
- note: template 変更のみを別task / 別PR に切り出す最小差分として進める

plan 承認前はコード変更しない。
