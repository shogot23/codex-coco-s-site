# Plan

## Task

- task-id: TASK-works-autopublish-20261007-thought-phrase-note-3min
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 受領済みsite-work.jsonを既存importerで読み込み、private preview合格後に今回のワークだけ公開する。
- なぜ今やるか: 今回新たに完成した成果物の制作全ゲートと納品監査が成功し、ユーザーの継続承認と最新公開手順の条件を満たしている。

## Thesis

- Visual thesis: 既存ワーク詳細の構成に4:5画像を載せ、本・クリーム色のココちゃん・学びが一続きに見える状態をPCとmobileで確認する。
- Content plan: 具体的な悩み、固定句を添える3手順、振り返り、本との接点、研究条件と3分版未検証、安全な終了選択肢の順に読む。
- Interaction thesis: 一覧から詳細へ進み、既存Reviewへ戻れることを確認する。小さな行動は任意で、休む・相談する・ここで終える選択を残す。

## Scope Declaration

- 変更対象ファイル: src/content/works/thought-phrase-note-3min.md、src/assets/works/thought-phrase-note-3min.png、docs/tasks/TASK-works-autopublish-20261007-thought-phrase-note-3min/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-10-08.md}。
- 変更しないもの: 元checkout、inboxの全7納品ファイルとsite-work.json、制作job/history、既存Review・Gallery・ワーク、taxonomy/UI、別のinbox成果物、SNS投稿、画像生成。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単一writerで順番に実行する。

## Implementation Steps

1. 7ファイルSHA/byteと制作完了証跡、slug・画像衝突、関連Reviewの公開状態・書名、taxonomy、3手順と原典の接続を確認する。
2. 絶対パスsite-work.jsonでdry-runし、成功後に非公開として通常importする。受領ファイルと画像のcmp、記事のpublished:false、対象2パスのみの追加を確認する。
3. localhost:4327のprivate previewでPCと390×844 mobileの一覧/詳細/画像/手順/出典/研究注記/安全注記/Review導線/noindexを確認する。著者目線の4点も人が確認する。
4. preview合格後に対象Markdownのpublishedだけをtrueにする。test:works、verify:frontend、check:works-distを実行する。
5. Claude review gateを現行規則どおり実施し、必要phaseのactual model、schema、正常終了、blocking 0を証跡で確認する。
6. 差分がscope内であることを再確認してcommit/push/PR。変更ファイル、mergeability、checksとmerge前Claude reviewを確認してsquash mergeし、PRをattachする。
7. Pages deploy成功後、cache-bypassで一覧・詳細・Review相互リンク・共有画像とHTML参照480/1080 WebPを検証する。作業記録と証跡を保存し、元checkoutが不変であることを確認する。

## Risks And Guards

- 想定リスク: 入力/原典/既存コンテンツの不一致、重複、import lock、preview欠落、author voice drift、Claude/CI/Pages失敗。
- 回避策: 一つでも不一致なら停止する。制作納品物は読み取り専用。public変更はpreview後に対象published値だけを変更する。
- scope 外に見つけた事項の扱い: 変更せず、原因と再開地点を親へ報告する。

## Verification

- 実行するコマンド:
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-07_2157_thought-phrase-note-3min/site-work.json --dry-run
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-07_2157_thought-phrase-note-3min/site-work.json
  - npm run test:works
  - npm run verify:frontend
  - npm run check:works-dist
- 追加確認: 制作7ファイルSHA/byte/cmp、private desktop/mobile previewと著者目線4点、import後published:false、公開差分の最小性、Claude gate、PR CI、Pagesのcache-bypass routesと最適化画像SHA。

## Approval

- approver: この実行のユーザー指示による継続承認を確認した担当者
- status: approved
- note: 2026-10-07の直接指示は、制作全ゲート成功後の今回新規1件だけについてサイト取り込み、preview、テスト、Claude、commit/push/PR/CI/squash merge/Pages確認までを継続承認している。過去成果物、画像再生成、SNS投稿は範囲外。PlanGateはこの承認範囲と停止条件を固定する。
- 2026-10-08 approval record: ユーザーは「PlanGateレビュー原稿をapi.z.aiへ送るClaudeレビューを承認しますか」という具体的確認に「作業再開してください」と回答した。この回答を、前回提示したPlanGate 3文書とdocs/works-publishing.mdをapi.z.aiのClaudeレビューへ送信する承認として記録する。追加文書・別endpoint・機密値の送信には拡張しない。
