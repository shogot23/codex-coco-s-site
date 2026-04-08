# Status — TASK-repo-hygiene-2026-04-07-worktree-lint

## Summary

完了。`TASK-gallery-import-2026-04-07` の最終検証で確認された `.claude/worktrees` 起因の lint 汚染を、gallery task とは別責務で切り分けて解消した。

## Why Separate

- gallery task の対象3ファイルは `npm run typecheck` / `npm run build` / gallery 掲載確認で妥当性を確認済み
- `npm run verify:frontend` の失敗原因は `.claude/worktrees/...` 配下の既存 lint エラーであり、gallery 差分起因ではない
- 公開判断タスクと repo hygiene 問題を混同しないため、独立 task として扱う

## Scope

- `.claude/worktrees` を起点とした lint / verify 汚染の再現、切り分け、解消

## Findings

- `npm run lint` は `eslint .` により repo 全体を走査していた
- `.claude/worktrees/override-fix` と `.claude/worktrees/rename` は repo の複製 worktree を内包しており、配下の `.astro` 生成物と script 群が既存 lint エラーを返していた
- gallery task 対象ファイルではなく、repo 外縁に置かれた作業用 worktree が `verify:frontend` を汚染していた

## Fix

- [eslint.config.mjs](/Users/shogo/Projects/codex-coco-s-site-main/eslint.config.mjs) の ignore に `.claude/worktrees/**` を追加
- repo 本体の lint 対象から作業用複製 worktree を除外し、公開物・本体 source の検証範囲は維持した

## Verification

- `npm run lint`: pass
- `npm run typecheck`: pass
- `npm run build`: pass
- `npm run test:e2e`: pass
- `npm run verify:frontend`: pass

## Completion Criteria

- `npm run verify:frontend` が `.claude/worktrees` 配下の lint エラーで失敗しない
- 原因と対策が task 文書に記録されている

## Completion Result

- `verify:frontend` は `.claude/worktrees` 配下の既存 lint エラーで落ちなくなった
- 原因、対策、検証結果をこの task 文書に記録した
- gallery content / UI / reviews content には変更を加えていない
