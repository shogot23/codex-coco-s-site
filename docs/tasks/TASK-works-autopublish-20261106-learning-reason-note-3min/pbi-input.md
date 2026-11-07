# PBI Input

## Task

- task-id: TASK-works-autopublish-20261106-learning-reason-note-3min
- title: 『リスキリング超入門』「3分の学ぶ理由メモ」を新規公開する
- owner: gpt-6-luna/max の単一 writer
- date: 2026-11-06

## Request Summary

- 依頼の要約: 新しく制作成功した修復ワーク1件を、最新の origin/main から作った隔離worktreeでサイトに掲載し、プレビュー、レビュー、検証、PR、CI、squash merge、Pages、公開後確認まで行う。
- 背景: 制作元とinboxの7ファイルが指定SHAで一致し、制作時の原典・レビュー・画像監査が完了している。新規制作成功分のサイト自動公開は、docs/works-publishing.md の継続承認対象であり、この実行について親からも明示承認を受けた。

## Resume Authorization — 2026-11-07

- ユーザーから「作業完了させてください」と明示指示を受けた。前回停止時に提示した `scripts/work-import.test.mjs` の固定件数テスト名と期待値を29→30へ更新する最小変更、および残る公開工程が今回の承認範囲。
- 変更前に最新 `origin/main` のwork数・slug不在とテストの固定値を再確認し、PlanGateレビューを通す。変更はテスト名と `assert.equal(names.length, ...)` の数値だけに限定する。最新baseの実work件数が29件で、今回の1件を加えた合計が30件になることを確認する。合わなければ停止する。
- 短縮版未検証の説明重複は前回確認済みの非blocking事項として扱い、今回の対象に含めない。

## Goal

- 達成したいこと: slug learning-reason-note-3min を、公開済みレビュー risukiringu-cho-nyumon と結んだ3分のワークとして公開する。
- 完了条件: 公開前プレビュー、読者向けコピーの4点確認、必要なテスト、Claude review、PR/CI、Pages成功、cache-bypass公開URL・一覧・相互リンク・共有画像の確認が完了する。

## Scope

- 含める: src/content/works/learning-reason-note-3min.md、src/assets/works/learning-reason-note-3min.png、`scripts/work-import.test.mjs` の固定件数テスト名と期待値の2箇所だけの29→30更新、このtask folderのPlanGate/status/daily記録。
- 含めない: 既存コンテンツの改訂、許可した2箇所以外のテストコード変更、他ワークの公開状態変更、制作成果物・historyの変更、画像の生成・編集、CI/config/依存変更、X/Instagram投稿、設定更新前に納品された別inbox成果物の公開。

## Constraints

- 既存運用との整合: 最新 docs/works-publishing.md、ブランド3文書、claude-review-gate、pr-merge に従う。制作JSONは published:false で取り込み、確認後は対象Markdownの published だけを変更する。
- 触ってよい範囲: origin/main から作った隔離worktreeと、承認済みサイト工程の記録。元のdirty mainと既存未追跡ファイルは保全する。
- 停止条件: slug/画像衝突、内容・リンク・画像・出典の不一致、import/preview/review/test/CI/deployの失敗時は後続工程へ進まない。最新baseのwork件数に今回の1件を足した合計が30件にならない場合、または限定変更後にテストが失敗した場合は公開フラグをfalseへ戻して停止し、対象外の修正をせず再開点を報告する。

## References

- 関連ドキュメント: AGENTS.md、docs/parallel-dev-config.md、docs/works-publishing.md、docs/brand/reading-with-coco-brand-strategy.md、docs/brand/reading-with-coco-content-guidelines.md、docs/brand/reading-with-coco-ai-operations.md。
- 制作元: /Users/shogo/Projects/coco-book-infographic-studio/jobs/20261106-リスキリング超入門
- 納品元: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-06_2212_learning-reason-note-3min

## Notes

- 内容: 新しい学び選びへの焦りから、暮らしで使う場面を手がかりに学びを一行で結ぶ。3分または一行で終え、試す・相談する・休む・ここで終えるから選べる。
- 根拠の境界: 大学の入門生物で、授業の概念と生活の関連を1〜2ページ、学期中に3回書いた研究課題と、一度3分の日常向け翻案を区別する。短縮版自体は未検証と明記する。
- 承認根拠: docs/works-publishing.md に定める継続承認と、この実行の親から受けた明示承認。
- 受領7ファイルのSHA256はPlanGate作成前に納品指定値と照合済み。制作manifestは byte_match:true、history_before:31、history_after:32、published:false を記録する。
