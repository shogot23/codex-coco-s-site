# PBI Input

## Task
- task-id: TASK-works-autopublish-20261030-hello-again-note-3min
- title: 『死ぬ瞬間の5つの後悔』「3分のひさしぶりの便り」を公開
- owner: gpt-6-luna（サイト工程の単一writer）
- date: 2026-10-30

## Request Summary
- 依頼: 制作完全成功後の新規1件を、サイトのプレビュー・レビュー・PR・公開確認まで進める。
- 承認根拠: 2026-10-30 automationに対するユーザーの継続承認。今回完成した1件のみが対象。

## Goal
- slug hello-again-note-3min を公開し、公開レビュー top-five-regrets-of-the-dying に関連づける。
- 完了条件: 入力成果物7点のSHAと制作証跡、下書きプレビュー、意味確認、verify、Claude gate、PR/CI/merge、Pages公開URL/相互リンク/画像を確認。URL確認前は完了扱いにしない。

## Scope
- 含める: 新規 src/content/works/hello-again-note-3min.md、src/assets/works/hello-again-note-3min.png、scripts/work-import.test.mjsの現行件数assertion1箇所、およびこのtask dirのPlanGate三文書・status・daily。変更ファイルはサイト成果物2件・test1件・task記録5件の計8件。origin/mainの27件に今回の1件を加えた28件へ期待値を合わせる。
- 含めない: 過去未公開ワーク、制作job/inbox/history、画像生成/編集、X/Instagram実投稿、dlab、無関係なコードや文書。

## Constraints
- 元dirty worktreeと制作jobは読み取り専用。最新origin/main由来の隔離worktreeだけで作業する。
- site-work入力: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-30_2236_hello-again-note-3min/site-work.json と同フォルダの6成果物。
- 本との接続・本文は本人の目線。AI調査事情や第三者レビュー表現を載せず、研究範囲/翻案/未検証を保つ。

## Input Manifest v4
納品: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-30_2236_hello-again-note-3min

- 死ぬ瞬間の5つの後悔_3分のひさしぶりの便り.png: 5f3c411fc2748aceb30df2298ba56c12a54ea010b713105b4b925504b23a4377
- report.md: 940f3d98cd3a57175cb002a8e48401de938890d7c851d8c99f71c6145e7b4713
- x-post.txt: 26bb82be02492b25c3c318a7361e58ec15a8cb781f4c59c4f83cc462e2f44698
- sources.md: 743a5a60fd755f0d664d6145f1e4ce229445783aceeb6b119a031e15f78528f9
- frozen-spec.md: b75b4dedc351ba1888dbbdee17306fb329a55585e6447de0ff33705ba82b2616
- verification.md: ce256114ddbbe32eee670ca7bc9cceac9cd443502a5e9ebe687af78aba1f3b2f
- site-work.json: e6db315f9ef868702eeda4ddd8e79f8f0508c1c10f313d02b9d2b4b398db3b1c

## References
- AGENTS.md、docs/parallel-dev-core.md、docs/parallel-dev-config.md、docs/works-publishing.md、brand strategy/content guidelines/AI operations、design doctrine、frontend playbook、claude-review-gate、pr-merge。
- user continuation approval for this one new completion; production success was confirmed by parent.

## Notes
- bookTitle: 死ぬ瞬間の5つの後悔; relatedReview: top-five-regrets-of-the-dying.
- 入力SHA、published:false、taxonomy、本名/公開review、slug/画像名衝突なしを確認済み。未確定事項なし。
