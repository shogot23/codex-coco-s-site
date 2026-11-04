# PBI Input

## Task

- task-id: TASK-works-autopublish-20261104-check-my-understanding-3min
- title: 「3分の受け取り方を確かめる一文」を新規公開する
- owner: gpt-6-luna/max の単一 writer
- date: 2026-11-04

## Request Summary

- 依頼の要約: 新しく制作成功した修復ワーク1件を、最新の `origin/main` から作る隔離 worktree で掲載し、レビュー・検証・PR・CI・squash merge・Pages・公開後確認まで行う。
- 背景: 制作は inbox への納品、7ファイルのハッシュ一致、制作時レビューと画像監査が完了している。制作成功後のサイト工程は、この実行のユーザー指示と `docs/works-publishing.md` の継続承認の対象。

## Goal

- 達成したいこと: `check-my-understanding-3min` を既存レビュー `saikyo-no-komyuryoku-no-tsukurikata` と結び、読者が3分で理解確認の一文を用意する公開ワークにする。
- 完了条件: 指定のプレビュー、コピー確認、テスト、Claude gate、PR CI、Pages deploy、cache-bypass 公開確認がすべて成功し、公開HTML・画像・dist の同一性を記録する。

## Scope

- 含める: 追加する `src/content/works/check-my-understanding-3min.md` と `src/assets/works/check-my-understanding-3min.png`、既存 `scripts/work-import.test.mjs:188-190` のテスト名・期待件数の28→29変更、本 task folder の PlanGate/status/daily、サイト工程証跡。
- 含めない: 画像の生成・再生成・編集、制作納品7ファイルや history の編集、既存コンテンツ改訂、CI/config/依存変更、X/Instagram投稿、既存 inbox 成果物の公開。

## Constraints

- 既存運用との整合: `docs/works-publishing.md`、ブランド3文書、`claude-review-gate`、`pr-merge` の手順に従う。対象記事以外の公開状態やファイルを変更しない。
- 納期 / 優先度: 継続承認のある今回の新規制作1件を同一実行内で完了させる。
- 触ってよいファイルや領域: 最新 origin から作成した隔離 worktree と、承認済みサイト工程の証跡先のみ。元 main の dirty/untracked は保持する。

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/works-publishing.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`。
- 関連 issue / PR: 作業前に新規PRとして確認する。

## Notes

- 領域固有メモ: 入力は `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-04_2217_check-my-understanding-3min/site-work.json`。制作時の `published:false` を保持したまま dry-run とプレビューを行い、公開確認後に対象記事の `published` だけを true にする。
- 未確定事項: なし。衝突・確認不一致・レビュー・CI・deploy失敗時は次段階へ進まず停止する。
- 2026-11-05再開: ユーザーの『作業再開してください』と今回の再開指示に基づき、前回停止の直接原因となったreader-copy guardのテスト名・期待件数を28から29へ変える2箇所だけを対象に追加する。変更前にPlanGate更新をClaudeがレビューし、その後 `npm run test:works` を再実行する。
