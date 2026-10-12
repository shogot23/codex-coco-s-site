# PBI Input

## Task

- task-id: TASK-works-autopublish-20261012-another-possibility-note-3min
- title: 「私が間違っているかもしれない」から3分ワークをサイト公開
- owner: gpt-6-luna/max、単一writer
- task date: 2026-10-12 JST
- resumed: 2026-10-13 JST

## Request Summary

- 依頼の要約: 2026-10-12に新規制作され、制作全ゲートと納品監査が成功した「3分の別の可能性メモ」1件を、最新origin/mainの隔離worktreeから取り込み、プレビュー、公開検証、PR、CI、squash merge、Pages確認まで行う。2026-10-13のユーザー直接指示「作業再開してください」を受け、既存worktreeを再利用して再開する。
- 背景: 制作後のサイト工程はユーザーの継続承認の範囲。再開依頼も同じ新作1件の工程を継続する。親が全7納品ファイルの現在SHA/byteと制作jobとの一致、原本published:falseを再確認済み。

## Goal

- 達成したいこと: slug `another-possibility-note-3min`、title「3分の別の可能性メモ」を、完全一致title「私が間違っているかもしれない」、relatedReview `watashi-ga-machigatteru-kamosirenai` へ接続し、一覧・詳細・Review導線・最適化画像を公開確認する。
- 完了条件: 制作物一致と衝突なし、非公開import、desktop/mobile preview、公開コピー4点と問いから一歩の流れを確認。指定コマンド、独立Solのarch/diff/cross gate、PR CI、exact-HEAD merge前確認、Pagesの一覧・詳細・Review相互リンク・HTML参照画像を確認する。

## Scope

- 含める: 対象work Markdown/画像の新規追加、PlanGate 5文書（この3件、status、10/13 daily）、scripts/work-import.test.mjs の今回追加1件に対応するテスト名 all20→all21 と件数期待値 20→21 の2箇所だけの更新、今回のレビュー/検証/PR/公開確認とprivate tmp証跡。既存の全件reader-copy guardループと判定ロジックは維持する。
- 含めない: 元checkoutの編集、他のinbox/workや過去成果物の公開、制作job/history/7納品ファイルの編集、画像生成/再生成、X/Instagram投稿、既存Review/Gallery/既存work/taxonomy/UI変更。

## Constraints

- 分類: publish/dev-critical。Global Review Gateとrepoの最新AGENTS、works-publishing、PR workflowを適用する。最終独立レビュー担当はユーザーの直接指示に従う。
- 役割: 指定済みgpt-6-luna/maxの単一writer。役割・モデルの代替や追加agentは禁止。
- 承認: 元のユーザー依頼は新作1件のサイト工程を許可する。2026-10-13のユーザー直接指示「PRからマージ処理をスキルを使って実施してください。レビューはSolが独立エージェントとして代わりに実施してください」により、独立SolレビューとPRからsquash mergeまでの継続も明示的に承認された。parentが独立gpt-6.1-sol reviewerを割り当て、writerはgpt-6-luna/maxの単一writerを維持する。test:worksで観測した21件対20件の不一致に限る2箇所のtest名・期待値変更と全件guard維持も変更なし。
- 触ってよい場所: /private/tmp/coco-site-another-possibility-note-3min の既存worktree、公開許可後の対象PR/Pages操作、/private/tmp内のサイト工程証跡。制作納品・jobと元mainは読み取り専用。
- 再開時点: branch codex/publish-another-possibility-note-3min、HEAD/origin/main 55bbcc1f8fb300d63073ef22557c3aa7f1c7e7ba、git status clean、最新fetch後0/0。

## References

- repo正本: AGENTS.md、docs/parallel-dev-core.md、docs/parallel-dev-config.md、docs/works-publishing.md、docs/brand/reading-with-coco-brand-strategy.md、docs/brand/reading-with-coco-content-guidelines.md、docs/brand/reading-with-coco-ai-operations.md
- 制作納品: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-12_2219_another-possibility-note-3min/site-work.json と同梱6ファイル。
- 制作監査: /Users/shogo/Projects/coco-book-infographic-studio/jobs/20261012-coco-repair-work/audit/luna-handoff.json、production-gates.json、image-qa.json、history-append.json、preservation-check.json
- 関連Review: src/content/reviews/watashi-ga-machigatteru-kamosirenai.md

## Notes

- title、slug、relatedReviewを受領値から変更しない。7納品ファイルは親が再検証済み。前回runでも各SHAとbyteが指定値に一致した。
- 2026-10-13再開時にorigin/mainをfetchし、worktreeがclean、HEADがorigin/mainと一致していることを確認した。新しいworktreeは作らない。
- Review failure policy: 先行したClaude CLI失敗では別routeを使わず停止した。後のユーザー直接指示が独立Sol reviewerを明示したため、今回に限りその指定された担当へ切り替える。Claude再試行、writer自身による代替review、追加agentは行わない。

## Test Run Finding and Limited Scope Update

- private worktreeでnpm run test:worksを実行し、35件中34件成功・1件失敗を観測した。失敗はscripts/work-import.test.mjs:188-190の件数固定だけで、実際のMarkdownは21件、期待値は20件（21 !== 20）。
- 失敗証跡: /private/tmp/coco-site-another-possibility-evidence/2026-10-13/test-works-initial-failure.md。
- 今回はwork Markdownを1件追加したため、テスト名のall20をall21へ、assert.equalの期待値を20から21へ更新する。この2箇所のみをscopeへ加える。全Markdownにreader-copy guardを適用するloop、guard本体、その他の検査と製品挙動は変更しない。
- このscope追加は、ユーザーの新作1件サイト公開依頼に含まれる必須test:worksを成立させるための追随修正として記録する。計画のClaude arch→diff合格前はテストファイルを編集せず、他の失敗があれば停止する。

## 2026-10-13 Direct User Review and Release Direction

- Direct instruction: 「PRからマージ処理をスキルを使って実施してください。レビューはSolが独立エージェントとして代わりに実施してください」
- This explicitly authorizes the independent Sol review route and continuation through PR/squash merge for the same one-work task. It does not add other works, images, social posts, or content changes.
- The parent assigns the independent gpt-6.1-sol reviewer for arch/diff/cross and exact-HEAD pre-merge review. The site writer waits for that result before commit or PR; no Claude retry or self-review.
