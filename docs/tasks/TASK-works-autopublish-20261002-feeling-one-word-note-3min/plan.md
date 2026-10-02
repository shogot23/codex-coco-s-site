# Plan: 3-minute one-word feeling note publication

## Task

- task-id: TASK-works-autopublish-20261002-feeling-one-word-note-3min
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 受領済みのsite-work packageを既存importerでサイトへ取り込み、preview確認後に対象entryだけ公開する。
- なぜ今やるか: 今回新規に完成した制作物の全ゲートが通過し、現行ユーザーの継続承認と docs/works-publishing.md の条件を満たしたため。

## Thesis

- Visual thesis: 受領済みの4:5画像で本・ココちゃん・学びを伝え、既存の詳細ページ構成の中で気持ちを一語置く静かな場面を見せる。
- Content plan: 会話後に返答を振り返り続ける悩み、本から着想した問い、一語を仮置きする3手順、採点以外の見方の余地、安全上の終了選択肢、研究と未検証の短縮版の違いを伝える。
- Interaction thesis: ワーク一覧から詳細、関連レビューへ進める既存導線を保ち、読者は記入・開示を強制されず、話す・相談する・休む・ここで終えるから選べる。

## Scope Declaration

- 変更対象ファイル: src/content/works/feeling-one-word-note-3min.md, src/assets/works/feeling-one-word-note-3min.png, docs/tasks/TASK-works-autopublish-20261002-feeling-one-word-note-3min/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-10-02.md}。
- 変更しないもの: 元checkoutと既存未追跡物、inboxの7納品ファイルとsite-work.json、制作job・history、既存Review、既存UI/taxonomy、他のワーク、SNS投稿。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

このrunは単一writerとして順に実行する。

## Implementation Steps

1. 納品7ファイルのSHA・件数、最終監査、既存slug/image衝突、参照レビューの公開状態・書名、taxonomyと手順を確認する。
2. site-work.jsonの編集は行わず、npm run works:import -- <absolute site-work.json> --dry-run を実行する。通過した場合のみ通常importし、公開状態falseと画像byte一致を確認する。
3. npm run works:preview を127.0.0.1:4327で起動し、一覧・詳細・画像・3手順・出典・未検証表示・関連レビュー導線をdesktop/mobile viewportで目視する。不一致なら停止する。
4. Preview確認後に生成Markdownの published だけをtrueへ変更する。差分を確認し、npm run test:works、npm run verify:frontend、npm run check:works-dist を通す。
5. Claude review gateでglm-5.3の必要phaseを証跡付きで完了し、blocking 0を確認する。
6. 差分を限定してcommit/push/PR作成。対象ファイル・mergeability・全CI・merge前reviewを確認後squash mergeする。
7. Pagesのdeploy成功後、cache-bypassで公開一覧/詳細/関連Review、HTML参照画像と最適化WebPを検証し、公開確認URLとSHAを記録する。

## Risks And Guards

- 想定リスク: 書誌参照・slug・taxonomy・手順・画像の不一致、previewの欠落、review/CI/deploy failure。
- 回避策: 既存Reviewのtitle/publishedをimporterで検査し、source SHAを照合。各必須gateの成功を確認するまで次段階へ進まない。
- scope 外に見つけた事項の扱い: 対象の処理を止め、親へ再開点を報告する。勝手に修正しない。

## Verification

- 実行するコマンド:
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-02_2140_komyuryoku-feeling-word/site-work.json --dry-run
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-02_2140_komyuryoku-feeling-word/site-work.json
  - npm run test:works
  - npm run verify:frontend
  - npm run check:works-dist
- 追加確認: inbox 7ファイルのSHA再照合、import先PNGのcmp/SHA、非公開desktop/mobile preview、Markdownのpublished変更が単一箇所、Claude glm-5.3 gate、PR CIとmergeability、Pages cache-bypass list/detail/review/media検証。

## Approval

- approver: 現行ユーザーの継続承認を実行指示で確認した担当者（gpt-6-luna/max）
- status: approved
- note: 今回新規に完成し全production gateが通過したslug feeling-one-word-note-3min だけに適用。既存inboxの遡及公開、X/Instagram投稿、納品物の変更は承認範囲外。PlanGate内の実装・検証・公開手順に同意してから作業する。
