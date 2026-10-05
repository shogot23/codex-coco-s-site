# Plan: 「3分のただ一緒にいる時間」サイト公開

## Task

- task-id: TASK-works-autopublish-20261005-just-being-together-3min
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 受領済みの`site-work.json`を既存importerで取り込み、非公開preview確認後に対象entryだけ公開する。
- なぜ今やるか: 今回新たに完成した制作物の全production gateと納品監査が通過し、現行ユーザーの継続承認と`docs/works-publishing.md`の条件を満たすため。

## Thesis

- Visual thesis: 4:5画像に描かれた開いた本とCocoが、動物を急かさず同じ場にいる静かな場面を伝える。既存詳細ページの画像表示に沿い、PC・モバイルで手順と注記が読めることを確認する。
- Content plan: 次の用事に意識が向く悩み、本から受け取った問い、3つの具体手順、成果で時間を測らない見方の余地、安全上の終了選択肢、研究と未検証の3分版の違いを示す。
- Interaction thesis: ワーク一覧から詳細へ進み、公開レビューへ戻れる既存導線を確認する。読者は犬猫との実施や継続を強制されず、休む・終了・相談も選べる。

## Scope Declaration

- 変更対象ファイル: `src/content/works/just-being-together-3min.md`, `src/assets/works/just-being-together-3min.png`, `docs/tasks/TASK-works-autopublish-20261005-just-being-together-3min/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-10-05.md}`。
- 変更しないもの: 元checkoutと既存未追跡物、inboxの7納品ファイルと`site-work.json`、制作job/history、既存Review、既存UI/taxonomy、他のワーク、SNS投稿、画像。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

このrunは指定どおり単一writerで順に実行する。

## Implementation Steps

1. 7納品ファイルのSHA/byte、制作監査と全必須Claude phase、slug/image衝突、参照Review、書名、taxonomy、画像と手順を確認する。
2. 絶対パスの`site-work.json`を編集せず`npm run works:import -- <absolute JSON> --dry-run`で検査する。成功した場合だけ通常importし、対象Markdownが`published:false`、画像byteが納品物と一致することを確かめる。`.works-import.lock`が残った場合は、進行中処理の有無と記事・画像の状態を確認してから復旧する。状況を判断できない場合は停止して親へ報告する。
3. `npm run works:preview`を127.0.0.1:4327だけで起動する。ブラウザでdesktopと390×844 mobile viewportを切り替え、一覧・詳細・画像・3手順・出典・未検証表示・安全注記・Review導線・noindexを確認する。
4. preview合格後、対象Markdownの`published`だけをtrueへ変更する。差分を確認し、`npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist`を実行する。
5. Claude review gateをglm-5.3で実行し、必要phaseの正常終了・有効なschema・actual_model・blocking 0を証跡付きで確認する。
6. 対象差分だけをcommit/push/PR化する。変更ファイル、mergeability、全CI、merge前reviewを確認後squash mergeし、PRをCodexへattachする。
7. Pages deploy成功後、cache-bypassで一覧・詳細・Review、相互リンク、共有画像、HTMLが参照する最適化WebPのHTTP応答とSHAを確認する。`release.json`、`completion.json`、evidence manifestをprivate tmpへ保存する。

## Risks And Guards

- 想定リスク: 納品・書誌・出典・画像・本文の不一致、既存path衝突、import lock残存、preview欠落、review/CI/deploy未完了。
- 回避策: 正本SHAと最新`origin/main`の公開手順に照らし、各gateが成功するまで次段階へ進まない。lockが残ったら進行中処理の有無と記事・画像の状態を確認し、不明なら復旧せず停止する。受領JSON・制作job/historyは読み取り専用にする。
- scope 外に見つけた事項の扱い: 対象の処理を止め、原因と再開点を親へ報告する。勝手に修正しない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-05_2210_tobari-just-being-together/site-work.json --dry-run`
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-05_2210_tobari-just-being-together/site-work.json`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: 納品7ファイルSHA/byteの再照合、import先PNGのcmp/SHA、noindex付きdesktop/mobile preview、公開差分が対象Markdownのpublished変更のみであること、Claude gate、PR CI・mergeability、Pages一覧/詳細/Review/HTML参照画像検証。

## Approval

- approver: 現行ユーザーの継続承認を実行指示で確認した担当者（gpt-6-luna/max）
- status: approved
- note: 2026-10-05に新規完成し、制作全gateを通過した`just-being-together-3min`だけが対象。既存inboxの遡及公開、制作成果物の変更、X/Instagram投稿は承認範囲外。本PlanGateは実行範囲と確認手順を固定し、既存テンプレートの個人運用ルールに基づき自己承認した。
