# Test Cases

## Task

- task-id: TASK-works-autopublish-20261125-another-measure-2min
- related plan: plan.md

## Must Check

- [ ] 作業前worktreeはclean、HEADは最新origin/main、元checkoutの状態を保つ。
- [ ] import直前のfetchでorigin/mainがPlanGate記載baseより進んでいる場合、安全にfast-forwardしbase SHA更新とClaude再レビューを済ませる。困難なら親へ報告して停止。
- [ ] 7点のSHA/cmpが引継ぎ値と一致し、PNG SHA 73582740d3c0be1a4be5b2381db6677493031165a8ff8670d82b3f0c09956983がrevision画像とbyte一致する。
- [ ] slugと画像の既存衝突がない。
- [ ] dry-run成功後の通常importはpublished:falseで、画像が入力とbyte一致する。
- [ ] 公開コピーは本人目線で、本からの着想と翻案、研究限界と未検証を区別し、悩みから休む/相談/終了を選べる流れを保つ。
- [ ] PC/mobileで一覧・詳細、画像、三手順、出典、関連レビューリンクが確認できる。
- [ ] プレビュー確認後に変更するのは対象Markdownのpublishedのみ。
- [ ] scope外差分、レビューblocking、検証失敗があれば後工程へ進まない。
- [ ] 固定件数test:works失敗時に、期待値と実数の差がちょうど1、失敗が件数検査のみ、今回の1 Markdownだけが原因の全条件を証明できた場合はログ・テスト名・期待値・実数を親へ報告して停止。親の個別承認がある場合のみPlanGate/Claude更新後に名称と期待値を同期し、再実行する。
- [x] 実測: 上記の単独テスト `all 35 current work Markdown files pass the narrow reader-copy guard` のみ失敗し、`scripts/work-import.test.mjs` 188行目のテスト名と190行目の期待値で、実数36 / 期待値35、他34テストはpass。今回のMarkdown1件だけが原因と確認して親へ報告した。親の今回の委任は、PlanGate更新・GLMレビュー後にテスト名中の `35`→`36` と `assert.equal(names.length, 35)`→`36` の2行だけを同期し、続けて `test:works` を再実行する範囲まで。ユーザーのテスト数値への個別承認とは扱わない。

## Command Checks

- [ ] works:import dry-run、works:import、test:works。固定件数以外の失敗は停止条件。
- [ ] verify:frontend、check:works-dist

## Manual Checks

- [ ] PC/mobile previewでページ・画像・手順・出典・レビュー導線を確認。
- [ ] Pages後に公開一覧・詳細・レビュー相互リンク・共有画像・HTML参照画像を確認。

## Out Of Scope

- X/Instagram投稿、画像生成・修正、他ワークの公開、親の個別承認・PlanGate更新・Claudeレビューを経ない固定件数テストの修正。
