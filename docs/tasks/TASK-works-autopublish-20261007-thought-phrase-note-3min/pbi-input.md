# PBI Input

## Task

- task-id: TASK-works-autopublish-20261007-thought-phrase-note-3min
- title: 3分の考えに添える言葉をサイト公開
- owner: gpt-6-luna/max、単一writer
- date: 2026-10-07 JST

## Request Summary

- 依頼の要約: 今回新たに制作され、制作ゲートと納品監査が成功した「3分の考えに添える言葉」1件を、最新origin/mainからの隔離worktreeでサイトへ取り込み、プレビュー・レビュー・CIを経て公開確認まで行う。
- 背景: ユーザーはこの実行の2026-10-07指示で、制作成功後の新規成果物に限るサイト公開工程を継続承認した。

## Goal

- 達成したいこと: slug thought-phrase-note-3min、title「3分の考えに添える言葉」をrelatedReview koufuku-ni-naritai-nara-koufuku-ni-narou-to-shite-wa-ikenaiに接続し、一覧・詳細・Reviewへの導線と最適化画像を公開確認する。
- 完了条件: 7納品ファイルと制作証跡が一致し、private importとPC/390×844 preview、著者目線4点確認、公開後の指定テストとClaude gate、PR CI/squash merge、Pagesの一覧・詳細・Review・画像を確認する。

## Scope

- 含める: 対象ワークMarkdown/画像の新規追加、PlanGate 4文書と2026-10-08作業記録、指定レビュー・検証・PR・公開確認、private tmpへのサイト工程証跡保存。
- 含めない: 元checkoutの変更、今回以外のinbox/workや既存ワーク/Reviewの変更、制作job/history/7納品ファイルの編集、画像生成・再生成、SNS投稿、無関係なUIやtaxonomy変更。

## Constraints

- 既存運用との整合: docs/works-publishing.md、AGENTS.md、ブランド原典、Claude review gate、pr-merge skillに従う。全作業はpublish/dev-critical。
- 納期 / 優先度: 制作完了ゲートがすべて成功している場合のみ連続して実行。いずれかの不一致・失敗で次工程へ進まない。
- 触ってよいファイルや領域: /private/tmp/coco-site-thought-phrase-note-3minの隔離worktree内、公開許可後のPR/Pages操作、サイト工程証跡専用の/private/tmp。

## References

- 関連ドキュメント: AGENTS.md、docs/parallel-dev-core.md、docs/parallel-dev-config.md、docs/works-publishing.md、docs/brand/reading-with-coco-brand-strategy.md、docs/brand/reading-with-coco-content-guidelines.md、docs/brand/reading-with-coco-ai-operations.md、docs/reading-with-coco-design-doctrine.md、docs/frontend-playbook.md、docs/process/lightweight-plangate.md
- 関連 issue / PR: 今回の新規公開。既存PRなし。
- 制作受領先: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-07_2157_thought-phrase-note-3min/site-work.json
- 制作証跡: /Users/shogo/Projects/coco-book-infographic-studio/jobs/20261007-coco-repair-work/production-completion.json と delivery-audit.json

## Notes

- 領域固有メモ: 最新origin/mainは8b5bdb504f381dd16a8277dfe9ab87491a7f5412。元checkoutはdirtyでbehind 5だったため隔離worktreeを作成。slug/title/bookTitle/relatedReviewは受領値を維持する。
- 未確定事項: なし。2026-10-08のユーザーによる「作業再開してください」は、前回提示したPlanGate 3文書とdocs/works-publishing.mdをapi.z.aiのClaudeレビューへ送る確認への承認として記録する。承認はこのpayloadと宛先に限り、追加の内部文書や別endpointへ広げない。レビュー、テスト、CI、Pagesに不一致があれば停止して親へ報告する。
