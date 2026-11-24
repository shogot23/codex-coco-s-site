# Plan

## Task

- task-id: TASK-works-autopublish-20261123-choose-a-reading-place-2min
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 既存のワーク取り込み手順で新規1件を公開し、今回追加で露呈した固定件数テストの期待値とテスト名だけを現在件数へ揃える。
- なぜ今やるか: ユーザーが2026-11-24に作業再開を明示した。隔離worktreeはfetch後の最新 `origin/main` と同じ `879c6450215458935a427cfb4549340e075597b8` でclean。
- visual thesis: 既存のワークページの静かな見た目を保ち、納品済みの4:5画像で本・ココちゃん・読む箇所を選ぶ学びを伝える。UIは変更しない。
- content plan: 読者の迷い、目次からの選択、30秒の試読、選択肢、研究の範囲と安全上の中止目安を順に示し、公開済みの関連レビューへつなぐ。
- interaction thesis: 読者が見出しを選び、少し読むか、本を閉じる・休む・相談する・終えるかを自分で選べるページにする。関連レビュー導線で本の背景へ進める。

## Scope Declaration

- 変更対象ファイル:
  - `docs/tasks/TASK-works-autopublish-20261123-choose-a-reading-place-2min/pbi-input.md`
  - `docs/tasks/TASK-works-autopublish-20261123-choose-a-reading-place-2min/plan.md`
  - `docs/tasks/TASK-works-autopublish-20261123-choose-a-reading-place-2min/test-cases.md`
  - `docs/tasks/TASK-works-autopublish-20261123-choose-a-reading-place-2min/status.md`
  - `docs/tasks/TASK-works-autopublish-20261123-choose-a-reading-place-2min/daily-2026-11-24.md`
  - `src/content/works/choose-a-reading-place-2min.md`
  - `src/assets/works/choose-a-reading-place-2min.png`
  - `scripts/work-import.test.mjs` の該当テスト名と期待値の2行だけ。
- 変更しないもの: 元repoのdirty worktree、入力納品フォルダ、既存レビュー・ワーク、他の公開設定、画像生成物、X/Instagram投稿。
- 並列作業: 対象は1つのworktreeで直列処理する。複数writerや追加agentは使わない。

## Implementation Steps

1. PlanGateをClaudeレビューし、入力JSONのdry-run成功後に通常importする。取り込み結果が `published: false` で、画像が入力とbyte一致することを確認する。
2. localhost:4327のプレビューをPC幅・モバイル幅で確認する。一覧、詳細、画像、手順、出典、関連レビュー導線を見て、本人目線・AI/第三者視点の排除・本と経験の根拠・引用/翻案と研究限界の4点を読む。
3. プレビュー確認に問題がない場合、対象Markdownの `published` だけを `true` にする。`npm run test:works` で確認する。今回の唯一の失敗は新規ワーク1件追加後も固定期待値が34のままという差だったため、ユーザー再開指示を根拠にテスト名と期待値の2行だけを35へ直し、同じsuiteを再実行する。他の失敗が出た場合は停止する。suite通過後は `npm run verify:frontend`、続けて `npm run check:works-dist` を実行する。
4. 差分・生成dist・公開対象を確認し、Claudeの必要phaseを通す。最小差分でcommit/pushし、PRを作成する。CI成功、merge可能状態、変更ファイルとchecksを確認後、merge前レビューを通してsquash mergeする。利用可能なら `codex/codex-automation` ラベルを付ける。
5. Pages成功後、公開一覧・詳細・関連レビュー相互リンク・共有画像・HTMLから参照する最適化画像を確認する。statusと当日記録を更新し、親へ証跡を渡す。

## Risks And Guards

- 想定リスク: dirtyな元repoのファイルが混入する、既存slug・画像と衝突する、読者向け本文に未確認の経験や研究効果を加える、既存suiteの固定件数が追加後の35件とずれる。
- 回避策: 専用worktreeだけを使い、dry-runと衝突検査を通す。研究の限界と短縮版未検証を保持し、対象記事以外を変更しない。件数修正はテスト名・期待値の2行に限定する。
- scope外に見つけた事項の扱い: 今回認めた2行以外のテスト変更、入力修正、画像修正、レビュー・preview・CI・Pagesの失敗は停止して報告する。失敗状態のまま次工程へ進まない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-23_2251_choose-a-reading-place-2min/site-work.json --dry-run`
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-23_2251_choose-a-reading-place-2min/site-work.json`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: Claude review gate、PC・モバイル実ブラウザ確認、画像のSHAと公開distの参照確認、PR checks、Pages公開結果。
- 完了判定: 公開URLと実配信画像を確認できた場合だけ「公開確認完了」とする。そうでなければ「サイト工程失敗」または「未実施」と理由・再開点を記録する。

## Approval

- approver: ユーザー（2026-11-24「最後までやりきってください」「作業再開してください」）
- status: approved
- note: 対象は今回の新規成功分1件と、それにより35件となるwork Markdown数を反映するテスト名・期待値の2行のみ。ユーザーは2026-11-24に作業再開を明示。Claudeレビューがblocking 0になるまでテストファイルを変更しない。
