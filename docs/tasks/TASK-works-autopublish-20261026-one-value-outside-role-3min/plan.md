# Plan

## Task

- task-id: TASK-works-autopublish-20261026-one-value-outside-role-3min
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 制作済みの7ファイルを照合し、既存のworks importerで公開用コンテンツを追加する。previewの確認後、当該Markdown frontmatterの `published` だけをtrueへ変更する。
- なぜ今やるか: 2026-10-26の新規制作成功分であり、定期制作の継続承認と今回の明示されたサイト工程に合致する。
- visual thesis: 既存worksの誌面調レイアウトと余白を使い、原画像の本・ココちゃん・学びをページの入口として見せる。トップページのfirst viewportや共通UIは変えない。
- content plan: 役割と成果にまつわる悩みから入り、3手順、関連する本、研究と短縮版の違い、安全な終了方法へつなぐ。
- interaction thesis: 一覧から詳細へ進み、読者が「書く」「空欄にする」「休む」「話す」「ここで終える」を選べる既存導線を使う。

## Scope Declaration

- 変更対象ファイル: `src/content/works/one-value-outside-role-3min.md`、`src/assets/works/one-value-outside-role-3min.png`、本task directoryの `pbi-input.md` / `plan.md` / `test-cases.md` / `status.md` / `daily-2026-10-26.md` / 内部検証記録。既存テストの固定件数が実際に今回失敗するときのみ該当箇所を更新する。
- 変更しないもの: 元のdirty checkout、既存の作品・レビュー・画像・manifest、UI/機能、slug、制作job、inbox原本、既存PR、SNS。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

独立したレビュー・調査は完了済み。サイト変更はsingle-writerで進める。

## Implementation Steps

1. 最新 `origin/main` 由来のcleanな専用branch、正本、公開レビュー、既存slug/画像との衝突、制作jobの7ファイルhash・cmp・全gateを照合する。
2. 3つのPlanGate文書（PBI・plan・test-cases）を固定し、medium gateの `arch` と `diff` の両方がvalid / `ok:true` / blocking 0になるまでimportしない。受領7ファイルからは `site-work.json` と画像だけを隔離tmpへ置いてimportに使い、report・x-post・sources・frozen-spec・verificationの5文書は監査証跡として参照のみとする。
3. fresh worktreeに `node_modules` がなければ `npm ci` を実行し、origin/mainのtracked lockfileを使う。package.json/lockの差分がないことを確認する。初回dry-runの依存解決失敗を受け、準備後にdry-runを1回再実行し、成功した場合だけ通常importへ進む。
4. 通常import後にMarkdownが `published:false`、画像が1080x1350かつ受領SHA一致であることを確認する。
5. `npm run works:preview` をlocalhost:4327で起動し、desktopとmobileの一覧・詳細、画像、全3手順、書籍導線、研究/安全注記、noindex、横overflowを確認する。
6. 4点（本人の目線、AI監査/第三者視点なし、本と本人の経験の根拠、引用/翻案と研究限界）を確認してから、対象Markdownの `published` だけをtrueにする。
7. `npm run test:works` → `npm run verify:frontend` → `npm run check:works-dist` を実行。生成distに対象URL/画像と最適化画像参照があることを確認する。
8. 変更差分と既存不変を確認し、必要なClaude review、commit、push、PR、CI、merge前レビューを通してsquash mergeする。
9. Pages成功後、cache-bypassで本番一覧・詳細・関連レビュー導線・共有画像とHTML参照の最適化画像を確認し、status/daily/completionを記録する。

## Risks And Guards

- 想定リスク: 元worktreeの未追跡成果物との混同、書誌/画像/本文の不一致、下書き誤公開、研究効果の転用、スマートフォンでの欠落、Pages反映遅延。
- 回避策: 受領SHAと `cmp`、slug衝突検査、previewのnoindex確認、public copy 4点、短縮版未検証の明記、CI/mergeSHA/Pages/cache-bypassの実測を必須にする。
- scope 外に見つけた事項の扱い: 記録して停止または別課題へ分離する。既存記事・運用文書を無断修正しない。

## Verification

- 実行するコマンド:
  - 依存不足時のみ `npm ci`（origin/mainのtracked lockfileから）
  - `npm run works:import -- /private/tmp/coco-one-value-outside-role-3min-package/site-work.json --dry-run`
  - `npm run works:import -- /private/tmp/coco-one-value-outside-role-3min-package/site-work.json`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
  - `git diff --check`
- 追加確認: desktop 1440px幅とmobile 390px幅でpreviewを実見。公開本文4点、noindex、横overflow、画像寸法/SHA、dist URL、公開HTMLの共有画像/参照画像、GitHub checksとPages runを記録する。隔離tmpのimportパスは `status.md` と内部completion証跡に記録する。

## Approval

- approver: Claude Code / glm-5.3（PlanGate reviewer）
- status: approved
- note: plan-arch、plan-diff、およびadvisory反映後のplan-diff-followupはいずれもvalid / `ok:true` / blocking 0（actual glm-5.3）。followupのadvisoryはtest-casesのCommand Checksに残る一般的placeholder表記で、実行する隔離tmpパスはplan.mdに明記済みのため追加変更しない。受領7ファイルを全件照合し、`site-work.json` と画像のみimport入力に使う。
