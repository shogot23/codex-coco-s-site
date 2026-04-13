# Claude Code Instructions — 読書 with Coco

Canonical source: **AGENTS.md**（本ファイルは入口）

## Design Reference

- UI 設計の正本は `DESIGN.md`。新規 UI 追加・修正時はまず DESIGN.md と既存トークン（`src/styles/theme.css`）を確認する

## Skills

- `/review-gate` — 変更後、commit / PR 前に必ず実行し `ok: true` を確認する
- `/worktree-start` — Git 管理対象の変更を始める際に使用する

## Quality Gate

- frontend 変更後は `npm run verify:frontend` を通すこと
- ドキュメントのみの追加では skip 可能（理由を記録すること）

## 最小差分原則

- 指示された範囲のみを変更する
- 新しい独自ルールを増やしすぎない
- 運用ルールの実体は AGENTS.md「基本運用ルール」にある
