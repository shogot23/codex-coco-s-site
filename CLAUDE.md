# Claude Code Instructions — 読書 with Coco

Canonical source: **AGENTS.md**（本ファイルは入口）

## Design Reference

- UI 設計の正本は `DESIGN.md`。新規 UI 追加・修正時はまず DESIGN.md と既存トークン（`src/styles/theme.css`）を確認する

## 着手前の必須手順

コード変更・文書更新の着手前に以下を実行する（`record-fast` のみの作業を除く）。

1. `git status --short --branch` で worktree が clean であることを確認する
2. 変更を `record-fast` / `record-safe` / `publish/dev-critical` に分類する（`docs/parallel-dev-config.md` 参照）
3. 変更対象ファイルと狙いを箇条書きで宣言する
4. main への直接 commit を禁止する。必ず branch を切る

## Lightweight PlanGate

実装系タスクでは、コード変更の **前** に以下を作成する。1ファイル・15分以内の軽微修正は skip してよい。

- `docs/tasks/<TASK-short-slug>/` を作り `pbi-input.md` / `plan.md` / `test-cases.md` を用意する（テンプレート: `docs/tasks/_templates/`）
- plan の承認前にコード変更しない（個人運用では自己承認で可）
- 完了後は `status.md` を更新し、daily / worklog に記録する

詳細手順は `docs/process/lightweight-plangate.md` を参照。

## Frontend 変更の追加要件

frontend 実装に着手する前、以下 3 点を短く定義してから始める（AGENTS.md「Frontend Hard Rules」参照）。

- visual thesis（どう見せるか）
- content plan（何を載せるか）
- interaction thesis（どう動くか）

## Skills

- `codex-review` — commit / PR 前に実行し `ok: true` を確認する
- `pr-merge` — PR 作成〜squash merge〜branch cleanup を一括実行する

## Quality Gate

- frontend 変更後は `npm run verify:frontend` を通すこと
- ドキュメントのみの追加では skip 可能（理由を記録すること）
- `publish/dev-critical` の変更では review gate を必ず完了させる

## 最小差分原則

- 指示された範囲のみを変更する
- 新しい独自ルールを増やしすぎない
- 運用ルールの実体は AGENTS.md「基本運用ルール」にある
