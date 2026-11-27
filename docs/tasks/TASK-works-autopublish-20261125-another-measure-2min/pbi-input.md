# PBI Input

## Task

- task-id: TASK-works-autopublish-20261125-another-measure-2min
- title: 物差しを見直す2分の新規サイト掲載
- owner: gpt-6-luna / max
- date: 2026-11-27

## Request Summary

- 依頼: 改稿画像を含む今回の成功納品1件を、同一の隔離worktreeで確認・公開する。
- 個別公開承認: ユーザーの「最後まで実施してください」。対象はこの1件だけ。
- 外部レビュー承認: ユーザーは「今回の掲載計画書とレビューに必要な関連リポジトリの抜粋を、Claude CLI経由で既定のGLM-5.3レビュー先に送信してよいですか？」に「今回の送信を承認する」と明示回答した。今回のPlanGateと必要な関連抜粋だけを送る。
- 入力: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/revisions/2026-11-27_another-measure-2min-site-input/site-work.json。slug another-measure-2min、関連レビュー omotesando-no-serebu-ken-to-kabanya-yosai-no-nora-inu。
- 画像: 改稿版PNG SHA-256 73582740d3c0be1a4be5b2381db6677493031165a8ff8670d82b3f0c09956983。旧版は記録として保持する。

## Goal

- 達成: 公開レビューと結びついたワーク1件を、手順・根拠・選択肢を保って公開し、Pages上の表示と画像を確認する。
- 完了条件: 必須レビュー、テスト、PR/CI/merge、Pagesの一覧・詳細・相互リンク・配信画像の独立確認がすべて成功する。

## Scope

- 含める: 対象1件の取り込み・公開、当該PlanGate/状態記録、2026-11-27の日次記録。
- 含めない: 過去成果物、他ワーク、X/Instagram投稿、画像生成・修正。
- 固定件数テスト: 失敗が追加1件分の期待値/テスト名だけなら停止して親に報告する。親の個別承認を受けた場合に限りPlanGateを更新して必須レビュー後、該当testを再実行する。その他のテスト変更は対象外。

## Constraints

- 元checkout、revision入力7点、旧納品、history.jsonは変更しない。既存隔離worktree /private/tmp/coco-site-another-measure-2min-20261125 とbranch codex/works-autopublish-another-measure-2min-20261125 を使い、fetch後の最新origin/mainをbaseとして確認する。
- 公開文は本人の目線を保ち、本からの着想と日常向け翻案、研究の限界と短縮版未検証を明記する。
- dry-run、衝突、プレビュー、レビュー、テストのいずれかが失敗したら次へ進まない。

## References

- AGENTS.md、docs/parallel-dev-config.md、docs/works-publishing.md、docs/brand/reading-with-coco-{brand-strategy,content-guidelines,ai-operations}.md
- 作成job/revision: /Users/shogo/Projects/coco-book-infographic-studio/jobs/20261125-表参道のセレブ犬とカバーニャ要塞の野良犬/revisions/2026-11-27_another-measure-2min
- 入力照合: 上記7点のexpected SHAは親からの引継ぎ。PNGは改稿revisionの画像とbyte一致。
- expected SHA-256: frozen-spec.md 718cfa2a0bd79949ebe15020c044cb0eb5878e044cf686ac5afcbf5ec7385b75; report.md 9b1bbd0c14fc3a11c53c98e1efe662ad56a890ecb14508b696d2808c48e837ff; site-work.json 6dbe6ceaf6157a82e2bba46be79cd411ad14b27677670ac7ea74df894b4a474d; sources.md 6451e6835dfd9b813182a23de88572d92af36ccf807384adf7f16f1c27132128; verification.md e7412a2453caabb541281a2d6e3f4953e2b08e52e78886683dccf232bbdd1f11; x-post.txt d3efa6ba71f29141ef424d700a19114eb23e3836af411749d16bb33652e0c6ca; 改稿PNG 73582740d3c0be1a4be5b2381db6677493031165a8ff8670d82b3f0c09956983。
- 再開前の停止記録: 同task folderのstatus.mdとdaily-2026-11-25.md。11/27の承認で外部送信条件が満たされた。
