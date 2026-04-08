# PBI Input

## Task

- task-id: TASK-repo-hygiene-2026-04-07-worktree-lint
- title: `.claude/worktrees` 起因の lint 汚染を repo hygiene として分離対応
- owner: 翔吾
- date: 2026-04-07

## Request Summary

- 依頼の要約: `npm run verify:frontend` が `.claude/worktrees/...` 配下の既存 lint エラーで失敗する問題を、gallery import task から分離して扱う
- 背景: gallery の対象差分は妥当だが、repo-wide な lint 汚染が検証結果を不必要に汚している

## Goal

- 達成したいこと: `.claude/worktrees` 配下の lint 汚染を再現・切り分けし、repo hygiene の問題として解消方針を確定する
- 完了条件: `verify:frontend` が gallery task と無関係な worktree 配下ファイルで落ちない状態に戻ること

## Scope

- 含める:
  - `.claude/worktrees` 配下が lint 対象に入る理由の確認
  - lint / eslint / ignore 設定の切り分け
  - 必要な hygiene 修正の実施
- 含めない:
  - gallery metadata の修正
  - 公開コンテンツの内容変更
  - gallery import task の再整理

## Notes

- 発端は `TASK-gallery-import-2026-04-07` の最終検証
- gallery 対象3ファイルの妥当性とは切り分けて扱う
