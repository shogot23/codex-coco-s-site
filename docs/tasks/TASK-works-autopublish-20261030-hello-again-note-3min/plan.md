# Plan

## Task
- task-id: TASK-works-autopublish-20261030-hello-again-note-3min
- related pbi: pbi-input.md

## Intent
- 入力成果物7点（site-work.jsonと制作6ファイル）から新規ワーク1件を取り込み、プレビュー後に対象だけ公開する。
- 新規完成1件に限るユーザーの継続承認があり、制作検証が成立している。

## Design Thesis
- visual thesis: 既存詳細テンプレートを使い、封筒・開いた本・案内役のココちゃんがある制作画像を入口にする。UIは追加しない。
- content plan: ひさしぶりの便りの書き出しに迷う場面→本とのつながり→3手順→研究範囲と安全→振り返り→レビュー導線。
- interaction thesis: 既存一覧から詳細へ進み、関連レビューへ戻れる。送信・返信を促す操作は加えない。

## Content Four-Point Check
1. 悩み: 連絡が空いたことや返事の負担が気になり、書き出しに迷う場面から始める。
2. 本の問い: 今日の小さな関係を見つめ、安心できる友人への便りを下書きする。
3. 見方の余地: 返事を予測するだけで止まらず、気にかけていることを伝えるか選べる。変化は保証しない。
4. 今の一歩: 送る／しまう／休む／相談／終える。安心できる相手が浮かばなければ空欄で終了する。

## Scope Declaration
- 変更対象:
  - src/content/works/hello-again-note-3min.md
  - src/assets/works/hello-again-note-3min.png
  - scripts/work-import.test.mjs（origin/mainに27件ある状態で期待数26件が残っていたため、追加後28件に一致させる1 assertionのみ）
  - docs/tasks/TASK-works-autopublish-20261030-hello-again-note-3min/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-10-31.md}
- 変更しない: 元dirty worktree、他worktree、制作job/audit/history、他のwork、画像、SNS投稿、公開UI/共通テンプレート。試験期待値の変更が必要なら停止しscopeを再確認する。

## Parallel Work Check
- [ ] P1: 同時に進める独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象が完全に分離されている
- [ ] P3: 順序に依存がない
判定: P1-P3は不成立。独立タスクはなく、サイト工程は単一writerが順に行う。

## Implementation Steps
1. PBIに記録したv4入力成果物7点のSHA、published:false、review/title、分類、slug/画像名衝突、制作証跡を再確認する。
2. works:import dry-run成功後に通常importし、2ファイルとpublished:falseを確認する。
3. localhost:4327のデスクトップ/モバイルで一覧・詳細・画像・手順・研究・安全・本導線を実見し、4点の意味確認を行う。
4. 問題がなければ対象Markdownのpublishedだけをtrueにし、slug・画像・他記事を変えない。
5. test:works、verify:frontend、check:works-distを実行し、distのURL/画像を確認する。
6. 差分と意味を再確認し、actual glm-5.3の必須Claude phaseを完了後、commit/push/PR/CI/merge前レビュー/squash merge。
7. merge SHAのPages成功後、cache-bypassで一覧・詳細・レビュー相互リンク・共有画像・HTML参照の480/1080最適化画像をHTTPと画面で確認し、status/dailyを実績で更新する。

## Risks And Guards
- リスク: import不一致/衝突、画像と手順のずれ、研究の過剰一般化、危険な相手への連絡促進、公開画像/配信不備。
- 対応: SHA・dry-run・PC/モバイル目視・4点意味確認・研究限界/中止選択・dist/Pages確認。異常時は公開へ進まず親へ返す。
- scope外事項は記録し、対象1件の安全に直結しない限り変更しない。

## Verification
- npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-30_2236_hello-again-note-3min/site-work.json --dry-run
- npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-30_2236_hello-again-note-3min/site-work.json
- npm run test:works
- npm run verify:frontend
- npm run check:works-dist
- 追加: localhost PC/mobile preview、公開前4点、dist、CI、Pages cache-bypass公開確認。

## Approval
- approver: ユーザー（2026-10-30 automationの新規完成1件に限る継続承認）
- status: approved
- note: import前のClaude計画レビューは必須。blockingまたは未レビューなら停止する。
