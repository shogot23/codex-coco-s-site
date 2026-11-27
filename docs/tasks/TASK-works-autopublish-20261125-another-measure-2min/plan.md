# Plan

## Task

- task-id: TASK-works-autopublish-20261125-another-measure-2min
- related pbi: pbi-input.md
- base: origin/main 92dbd668be5cc6b205efb4ab75d80e929d669d10（2026-11-27 fetch後、worktree HEAD一致）

## Intent

- visual thesis: 既存のワークページの静かな読みやすさを保ち、納品画像で本・ココちゃん・日常への学びを伝える。UI変更はしない。
- content plan: 周りより遅い焦りから入り、本の「物差し」への問い、前と今の違い、休む/相談/終える選択へつなぐ。
- interaction thesis: 読者が手順と研究の範囲を読み、関連レビューへ移るか、何もせず終了するかを選べる。
- 今回の改稿済み成功納品1件だけを掲載する。使用PNGは新revision SHA 73582740d3c0be1a4be5b2381db6677493031165a8ff8670d82b3f0c09956983。旧版を公開入力に使わず、旧納品・履歴は変更しない。
- 親の実turn_contextで担当モデル gpt-6-luna / max を確認済み。単一writerで進める。
- ユーザーが今回のPlanGateと必要なrepo抜粋をClaude CLI経由のGLM-5.3へ送ることを明示承認。承認範囲に限る。

## Scope Declaration

- 変更対象: 本タスクのpbi-input.md / plan.md / test-cases.md / status.md / daily-2026-11-27.md、src/content/works/another-measure-2min.md、src/assets/works/another-measure-2min.png。
- 条件付き対象: 固定件数test:worksが今回1件だけを理由に失敗し、親が同期修正を個別承認した場合のみ、scripts/work-import.test.mjsの該当名称/期待値をPlanGate追記・Claudeレビュー後に変更する。
- 変更しない: 元main、revision入力7点・旧納品・history.json、既存レビュー/ワーク、上記条件を満たさないpackage scripts・テスト変更、画像生成物、SNS、既存daily-2026-11-25.md。
- 並列実施: なし。サイト工程の単一writerとして直列実行する。

## Implementation Steps

1. import直前にもfetchしorigin/mainとworktree HEADを比較する。origin/mainが上記baseから進んでいたらworktreeを安全にfast-forwardし、PlanGateのbase SHAを更新して再レビューする。fast-forward不能、衝突、または安全な追随を判断できない場合は親に報告して停止する。改稿入力7点SHA/cmp、書誌・review title、出典、taxonomy、既存slug/画像衝突を確認し、改稿PNGとjob revisionのbyte一致も確かめる。PlanGate arch/diffがblocking 0になった後、dry-run、通常importを行いpublished:falseを確認する。
2. works:previewをPC/mobile viewportで開き、一覧・詳細・画像・三手順・研究限界・本へのリンクを確認する。本文を本人目線と根拠の面から読む。
3. 問題がなければ対象Markdownのpublishedだけtrueにする。test:worksで今回観測した失敗は `all 35 current work Markdown files pass the narrow reader-copy guard` の件数検査だけで、35件中34件がpass、実数36・期待値35だった。今回追加したMarkdown1件による差と確認できたため親へ報告し、親は今回の委任範囲として、PlanGate更新・必須GLMレビュー後に限り、`scripts/work-import.test.mjs` の188行目のテスト名にある `35` を `36` に、190行目の `assert.equal(names.length, 35)` を `assert.equal(names.length, 36)` に変える2行だけの変更と、その後のtest:works再実行までを許可した。失敗出力は actual 36、expected 35 の順（`36 !== 35`）。この委任はユーザーによるテスト数値への個別承認として記録しない。該当testを再実行し成功するまで後続へ進まない。その他の失敗やテスト変更は後続へ進まず親に報告する。
4. test:works通過後にverify:frontend、check:works-distを実行し、実装差分の必須Claudeレビューと差分確認がblocking 0ならcommit/PR/CI/mergeへ進む。
5. Pages完了後、公開一覧・詳細・レビュー相互リンク、共有画像、HTML参照画像をURLと実バイトで確認し、statusと日次記録を更新する。

## Risks And Guards

- リスク: 元worktreeのdirty内容混入、入力不一致、既存slug衝突、読者向けコピーの根拠逸脱、固定件数テスト失敗。
- 対応: 既存の専用worktreeでorigin/mainを確認し、改稿版7点のSHA/cmpとdry-runで確認する。固定件数不一致は親の個別承認がない限り修正しない。
- 停止条件: 書誌・分類・手順・出典・画像の不一致、既存衝突、preview/review/test/CI/Pagesの失敗。

## Verification

- npm run works:import -- <absolute site-work.json> --dry-run
- npm run works:import -- <absolute site-work.json>
- npm run works:preview、npm run test:works、npm run verify:frontend、npm run check:works-dist
- PC/mobile実ブラウザ確認、Claude GLM-5.3の全必須phase、PR checks、Pagesと配信画像の確認。

## Approval

- approver: ユーザーの継続承認（docs/works-publishing.mdに記録）
- status: approved
- note: 今回の公開と、PlanGate/必要なrepo抜粋をGLM-5.3へ送ることの個別承認がある。PlanGateのClaude arch/diff確認完了後に限りimportする。
- 2026-11-27 fixed-count exception: 親の個別委任により、今回追加したMarkdown1件だけが原因の `36 !== 35` 件数失敗について、`scripts/work-import.test.mjs` の188行目テスト名 `35`→`36` と190行目期待値 `35`→`36` の2行だけを同期し、PlanGate更新と必須GLMレビュー後に `test:works` を再実行する。この範囲はユーザーの個別テスト数値承認ではない。
