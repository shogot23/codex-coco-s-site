# PBI Input

## Task

- task-id: TASK-plan-template-parallel-work-check-2026-04-13
- title: plan template に Parallel Work Check を追加
- owner: Codex
- date: 2026-04-13

## Request Summary

- 依頼の要約: `docs/tasks/_templates/plan.md` に Parallel Work Check を追加し、今後のマルチエージェント導入準備として別PRで扱う
- 背景: Parallel Work Check の追加案は既に `stash@{0}` にあり、Home Featured の task / PR #82 とは分離して管理したい

## Goal

- 達成したいこと: `plan.md` テンプレートに Parallel Work Check だけを最小差分で追加し、別 task / 別PR の単位として整える
- 完了条件: `docs/tasks/_templates/plan.md` の差分が Parallel Work Check の追加だけであることを確認し、必要な review gate を完了する

## Scope

- 含める: `docs/tasks/_templates/plan.md` の選択的復元、task docs 作成、必要な確認と review gate
- 含めない: `src/pages/index.astro` の差分復元、既存 task docs の書き換え、PR 作成

## Constraints

- 既存運用との整合: テンプレート変更のため `publish/dev-critical` として扱い、PlanGate と review gate を通す
- 納期 / 優先度: PR #82 に混ぜず、別PRへ安全に切り出せる状態を先に作る
- 触ってよいファイルや領域: `docs/tasks/TASK-plan-template-parallel-work-check-2026-04-13/`, `docs/tasks/_templates/plan.md`

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: draft PR #82 とは分離して扱う

## Notes

- 領域固有メモ: `stash@{0}` には `docs/tasks/_templates/plan.md` と `src/pages/index.astro` の差分が同居しているため、template だけを選択的に扱う必要がある
- 未確定事項: なし
