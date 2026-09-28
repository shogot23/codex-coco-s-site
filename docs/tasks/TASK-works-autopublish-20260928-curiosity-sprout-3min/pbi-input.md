# PBI Input

## Task

- task-id: TASK-works-autopublish-20260928-curiosity-sprout-3min
- title: 公開ワーク「3分の好奇心の芽さがし」
- owner: Codex gpt-6-luna（唯一のwriter）
- date: 2026-09-28

## Request Summary

- 依頼の要約: 完成済みの新規ワークを隔離worktreeで検証し、サイトへ公開する。
- 背景: 継続承認済みの「Coco毎日の修復ワーク」制作後サイト工程。

## Goal

- 達成したいこと: `curiosity-sprout-3min` を既存公開レビューと関連づけて安全にサイト公開する。
- 完了条件: dry-run、非公開取り込み、PC/モバイルpreview、公開状態での検証、Claude gate、PR/CI/squash merge、Pagesと公開URLの確認がすべて成功。

## Scope

- 含める: 対象Markdown/画像、PlanGate、完了status、当日worklog。
- 含めない: 元worktree、既存inbox納品、他コンテンツ、X/Instagram投稿。

## Constraints

- 既存運用との整合: `docs/works-publishing.md` に従い、レビューを通してPR経由で公開する。
- 納期 / 優先度: 今回の制作に続くサイト工程。
- 触ってよいファイルや領域: この隔離worktree内の今回追加する `docs/tasks/TASK-works-autopublish-20260928-curiosity-sprout-3min/`、対象 `src/content/works/curiosity-sprout-3min.md` と画像、`inbox/daily/2026-09-28.md`。

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/works-publishing.md`, ブランド3文書、`docs/reading-with-coco-design-doctrine.md`, `docs/frontend-playbook.md`。
- 関連 issue / PR: なし。最新 `origin/main` 起点。

## Notes

- 領域固有メモ: site-work.json の最終 `published:false` とPNG SHA-256 `c4b0abe0feda329a75efb73cb94db9bb6f9b5773f391b53eecf1a6f5665c9467` が制作側で確認済み。X/Instagram投稿は禁止。
- 未確定事項: 実行時の全検証、CI、Pages結果。
