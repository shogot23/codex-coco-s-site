# Claude Code Instructions — 読書 with Coco

Canonical source: **AGENTS.md**（本ファイルは入口）

## Skills

- `/review-gate` — 変更後、commit / PR 前に必ず実行し `ok: true` を確認する
- `/worktree-start` — Git 管理対象の変更を始める際に使用する

## Quality Gate

- frontend 変更後は `npm run verify:frontend` を通すこと
- ドキュメントのみの追加では skip 可能（理由を記録すること）

## 最小差分原則

- 指示された範囲のみを変更する
- 新しい独自ルールを増やしすぎない
- 詳細は AGENTS.md を参照すること
