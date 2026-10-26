# PBI Input

## Task

- task-id: TASK-works-autopublish-20261026-one-value-outside-role-3min
- title: 「3分の大切なこと一つメモ」をサイト公開する
- owner: gpt-6-luna/max
- date: 2026-10-26

## Request Summary

- 依頼の要約: 2026-10-26に新規制作され、7ファイル納品と制作レビューを通過した「3分の大切なこと一つメモ」を、専用worktreeでpreview・サイトレビュー・PR・CI・Pages確認まで進める。
- 背景: `docs/works-publishing.md` の定期制作に対する継続承認、および今回の制作成功後Luna工程の明示依頼が適用される。

## Goal

- 達成したいこと: slug `one-value-outside-role-3min` を維持し、書誌「敗北のスポーツ学」と関連レビュー `haiboku-no-sports-gaku` を結んだワークを公開する。
- 完了条件: 受領7ファイルと全hashを照合し、限定フレーズ検査とdry-run importを通す。非公開状態のPC・モバイルpreviewで本文、画像、3手順、本への導線、noindexを確認する。本人の声4点を含むClaude gateを通し、対象の `published` だけをtrueにする。`test:works`、`verify:frontend`、`check:works-dist`、PR CI、Pages完了と本番HTML/一覧/詳細/本リンク/共有画像のHTTP応答を確認する。

## Scope

- 含める: 新規 `src/content/works/one-value-outside-role-3min.md` と `src/assets/works/one-value-outside-role-3min.png`、このtask directory内のPlanGate・status・daily・検証記録。既存テストが今回の1件追加に限って固定件数で失敗する場合のみ、該当件数を最小更新する。
- 含めない: 既存記事・画像の変更、slug変更、UI/機能追加、別worktreeや既存PRの変更、X/Instagram投稿、画像生成・編集、元のdirty worktreeへの書き込み。

## Constraints

- 既存運用との整合: `docs/works-publishing.md`、brand guidelines、`claude-review-gate` と `pr-merge` に従う。公開文は本人の目線を保つ。
- 納期 / 優先度: 今回の定期制作実行内で完了させる。失敗条件では停止する。
- 触ってよいファイルや領域: 最新 `origin/main` から作った専用worktreeの宣言済みscopeのみ。元作業ツリー・他task・他inboxは読み取りだけ。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/works-publishing.md`、`docs/brand/reading-with-coco-{brand-strategy,content-guidelines,ai-operations}.md`、`docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし。既存PR #214ほかは対象外。

## Notes

- 領域固有メモ: 受領フォルダ `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-26_2236_one-value-outside-role-3min`。期待する画像SHA-256は `3a12de8feba92fa2d4b34b4ea43180f9b45838fdcd6813f9b07e47868b061650`。`site-work.json` は `published:false`、書名・レビューslug・ワークslugの一致を確認する。
- 未確定事項: dry-run、preview、検証、レビュー、CI、Pagesの結果。どれか不成立なら公開へ進まない。
