# Plan

## Task

- task-id: TASK-works-autopublish-20261019-why-i-chose-this-book-3min
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 今回納品の3分ワークを既存Worksへ追加し、レビュー後に公開する。
- なぜ今やるか: 今回分に限る継続承認と制作側の全ゲート完了を確認した。

## Scope Declaration

- 変更対象: src/content/works/why-i-chose-this-book-3min.md, src/assets/works/why-i-chose-this-book-3min.png, 本タスク記録。既存テストの固定件数だけ必要時に1点更新する。
- 変更しないもの: 元checkout、納品原稿、history/studio、他のWorks、レビュー/Gallery、画像生成物、SNS投稿。
- 分類: publish/dev-critical。branch: codex/why-i-chose-this-book-3min（task-idの短縮slug）。base: origin/main 567001ec557eacf3f308db939928f1fb6dfdeb83。

## Frontend Thesis

- visual thesis: 既存Works詳細の画像と余白を使い、背表紙へ戻る静かな視線を保つ。
- content plan: 自責の悩みから本の問い、関心へ戻る余地、3手順と研究限界、休む/相談/終了の選択へつなぐ。
- interaction thesis: 既存の一覧・詳細・関連レビュー導線を使い、新しい操作UIは足さない。

## Implementation Steps

1. 入力7ファイルのSHA/byte、公開review・書名、taxonomy、slug/画像衝突を再確認する。site-work.jsonは /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-19_2157_why-i-chose-this-book-3min/site-work.json を使う。
2. import dry-run成功後に通常importし、下書きとしてPC/モバイルpreviewを確認する。
3. 内容・導線確認後に対象だけ公開へ変更し、Works/Frontend/dist検証を行う。これら・Claude gate・CIが全て成功するまでmergeしない。
4. Claude gate完了後、差分確認・commit・PR・CI・squash merge・Pages確認を行う。

## Risks And Guards

- 想定リスク: 既存slug衝突、公開コピーの根拠逸脱、previewでの画像/導線崩れ、固定件数テスト。
- 回避策: 衝突と公開状態を確認し、reader-facing copyの4点を再読。失敗時は進めず報告する。ガード検査は緩めない。
- scope 外の発見: 変更せず別課題として親へ報告する。

## Verification

- 取り込み:
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-19_2157_why-i-chose-this-book-3min/site-work.json --dry-run
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-19_2157_why-i-chose-this-book-3min/site-work.json
- 完了確認: npm run test:works, npm run verify:frontend, npm run check:works-dist。
- 手動: localhost:4327/noindexの一覧・詳細・画像・手順・出典・本への導線をPC/モバイルで確認。公開後はPagesの一覧・詳細・相互リンク・共有画像・HTML参照画像を確認。

## Approval

- approver: 人間ユーザー（このautomation runの直接指示）
- status: approved
- note: 2026-10-19 22:06 JST、本task冒頭の今回新規1件に対する継続承認を参照。ClaudeのPlanGateレビュー通過後にコード変更へ進む。
