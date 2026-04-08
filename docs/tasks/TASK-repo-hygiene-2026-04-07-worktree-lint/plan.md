# Plan

## Task

- task-id: TASK-repo-hygiene-2026-04-07-worktree-lint
- related pbi: pbi-input.md

## Intent

- 何を変えるか: `.claude/worktrees` 起因で `verify:frontend` が失敗する repo hygiene 問題を分離して扱う
- なぜ今やるか: gallery task の検証事実を歪めず、repo-wide lint 汚染だけを独立して解消するため

## Scope Declaration

- 変更対象ファイル:
  - `.eslint*`
  - `package.json`
  - 必要に応じて task 文書
- 変更しないもの:
  - gallery content
  - reviews content
  - UI / コンポーネント

## Implementation Steps

### Step 1: 再現確認
- `npm run verify:frontend` で `.claude/worktrees/...` 配下の lint エラーを再現

### Step 2: 原因切り分け
- eslint 対象と ignore 設定を確認し、なぜ worktree 配下が対象化されるかを特定

### Step 3: hygiene 修正
- repo 本体の lint 対象から不要な worktree 配下を除外するか、別の妥当な対策を最小差分で実施

### Step 4: 再検証
- `npm run verify:frontend` が repo-wide に通ることを確認

## Verification

- `npm run verify:frontend`

## Approval

- approver: 自己承認
- status: approved
- note: 実装後に review gate を通す
