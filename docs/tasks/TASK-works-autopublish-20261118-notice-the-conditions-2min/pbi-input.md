# PBI Input

## Task

- task-id: TASK-works-autopublish-20261118-notice-the-conditions-2min
- title: 『敗北のスポーツ学』「その場の条件を見る2分メモ」を新規サイト掲載
- owner: gpt-6-luna/max
- date: 2026-11-19

## Request Summary

- 依頼の要約: ユーザーの「最後まで実施してください」という継続指示を受け、前回停止した1件のサイト工程を再開する。固定件数テストの最小更新をPlanGateとClaudeレビューに含め、レビュー後に今回の作品数へ期待件数とテスト名を合わせる。
- 背景: Automation coco のユーザー指示で、新規制作が全検証を通過した場合に限る制作後サイト工程の継続承認がある。2026-11-19の明示指示により、前回の固定件数失敗を最小修正して工程を継続する。`docs/works-publishing.md` の対象範囲にも合致する。

## Goal

- 達成したいこと: slug `notice-the-conditions-2min` の「その場の条件を見る2分メモ」を `relatedReview: haiboku-no-sports-gaku` / `bookTitle: 敗北のスポーツ学` で公開し、デプロイ後の一覧・詳細・レビュー相互リンク・画像を独立確認する。
- 完了条件: 本文・画像の一致、PC/モバイルのプレビュー、読者向けコピー4点確認、固定件数テストの最小更新を含む指定テストとClaudeゲート、CI成功、squash merge、Pages成功、および公開HTMLと参照画像のbyte証跡が揃う。

## Scope

- 含める: この1件だけの作品Markdown/画像、同じ新規制作の7点を照合する内部PlanGate記録、対象publishedだけのtrue化、PR経由の公開。最新mainで33件の固定期待数に対し今回の追加後の実数34件を確認し、当該テスト名と期待数だけを34へ更新する。
- 含めない: 既存作品の遡及公開・修正、X/Instagram投稿、画像生成/編集、history.jsonの追記/変更、元main作業ツリーの編集、固定件数以外のテスト修理、テスト基盤/runner/依存/CI設定の変更。

## Constraints

- 既存運用との整合: `docs/works-publishing.md`、ブランド指針、`docs/parallel-dev-config.md`、Claude review gate に従う。
- 納期 / 優先度: 今回の新規制作1件に限定。衝突・不一致・失敗は推測で補わず停止する。
- 触ってよいファイルや領域: 新規隔離worktreeの対象作品出力、固定件数テストの対象assertionと名称、本task用 `docs/tasks/TASK-works-autopublish-20261118-notice-the-conditions-2min/` のみ。納品元 `/Users/shogo/Projects/coco-book-infographic-studio/jobs/20261118-Coco修復ワーク-20261118/final/` および既存worktreeは読み取り専用。

## References

- 関連ドキュメント: `AGENTS.md`; `docs/parallel-dev-config.md`; `docs/works-publishing.md`; `docs/brand/reading-with-coco-brand-strategy.md`; `docs/brand/reading-with-coco-content-guidelines.md`; `docs/brand/reading-with-coco-ai-operations.md`; `docs/process/lightweight-plangate.md`; Claude review gate / PR merge skills。
- 関連 issue / PR: なし。新規制作のjobは `20261118-Coco修復ワーク-20261118`。

## Notes

- 領域固有メモ: 2026-11-19にorigin/main `bf14198dcffc65d0ef3211109795b742002c88ce` へ隔離worktreeをrebaseした。mainの固定件数テストは33件。新規原稿を含むworktreeの実数は34件。元repo mainは既存の未関連変更があり、作業対象にしない。納品7点はjob/finalとユーザー指定inboxの両方でSHA一致・cmp一致。
- 未確定事項: GLM arch/diffレビューとローカル検証は完了。commit/PR/CI/merge前cross-check/Pages、本番URLと公開画像のbyte確認は未完了。完了状況をstatus/evidenceへ個別記録する。
