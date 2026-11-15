# Plan

## Task

- task-id: TASK-works-autopublish-20261113-meeting-place-second-option-3min
- related pbi: `pbi-input.md`
- base: `origin/main` `c268f83e1ca47531a4fcd8354d183b1a390511db`
- resumed: 2026-11-14。fetch後の`origin/main`も同SHA、HEADとのdivergence 0/0。該当branchの既存PRなし。
- package SHA正本: studio job `20261113-coco-repair-work-20261113/delivery-manifest.json`
- 採用画像: `地図と拳_集合場所を見直す3分メモ.png` SHA-256 `7deb0554f6ced6edb5b8096b121e0ade05b48a9cfc6b63df9b3e0250ee87b31a`
- `verification.md` SHA-256 `2c34fe68357267d58a525120d09145b6a6759c24f1d7cdc481f3637f33ffd0fe`
- 前回停止: `npm run test:works` 35件中34成功。`scripts/work-import.test.mjs` の「all 31 current work Markdown files pass the narrow reader-copy guard」で期待31・実数32。テスト本体・残り34件は成功。
- 再開承認: 2026-11-14、ユーザーの明示指示「作業再開してください」。対象は本PlanGateで定める固定件数テストの最小修正・再実行と、合格後の元の公開契約。

## Intent

- 何を変えるか: 承認済み納品を既存work構造へ取り込み、プレビューとレビュー後に対象1件を公開する。
- なぜ今やるか: `docs/works-publishing.md` が継続承認する新規完全成功分に該当する。
- visual thesis: 既存ページ構成を保ち、納品画像で問いと3手順を見せ、本文を読みやすく置く。
- content plan: 困りごとから本の問い、見方の余地、任意の一歩（相談・休息・終了を含む）へ進む。
- interaction thesis: 既存の一覧・詳細・関連レビュー・本の導線を確認し、読者が任意の行動を選べる。

## Scope Declaration

- 変更対象: `scripts/work-import.test.mjs` の固定件数テスト名・期待値31→32のみ（検査本体と他のテストは維持）、`src/content/works/meeting-place-second-option-3min.md` の公開フラグのみ、`src/assets/works/meeting-place-second-option-3min.png`、本タスクの `status.md` と日次worklog。
- 変更しない: 既存レビュー、UI/共通コード、taxonomy、package/lock、他のテスト・テスト検査本体、workflow、元main、inbox納品、studio job。

## Parallel Work Check

- [ ] P1: 独立した同時作業が2つ以上ある（該当なし: 単独担当で実行）
- [ ] P2: 対象が完全に分離されている（該当なし: P1なし）
- [ ] P3: 順序に依存しない（該当なし: P1なし）
- 判定: 単独担当で実行する。

## Implementation Steps

1. 最新`origin/main`・branch/PR・slug/画像衝突、7ファイルのSHA/cmp、書誌・研究・taxonomy・関連レビュー、対象Markdownの`published:false`を確認する。PlanGateの必須Claude arch/diffと親による独立レビューの両方が合格するまで、コードや公開フラグを変更しない。
2. 両レビュー合格後、`scripts/work-import.test.mjs` の対象テスト名を「all 32 current work Markdown files...」へ、`names.length` の期待値を31から32へ更新する。ループ・検査本体・他テスト・workflowは変更しない。実差分を親へ独立確認に出し、Claude diffレビューも合格するまで実行しない。
3. 取り込み済みPNGのSHA/cmp、本文とsite-work.jsonの内容一致、`published:false`をVerificationのとおり確認し、必要なプレビューを再確認する。承認された公開契約に従って対象Markdownの`published`だけをtrueに変更し、`npm run test:works`を最初に実行する。失敗なら自分の公開フラグだけfalseに戻し、以降をすべて止める。
4. `test:works`合格後に`npm run verify:frontend`、次に`npm run check:works-dist`を実行する。Claude必須phase、差分・CI・merge可能性を確認してPR（`codex`、利用可能なら`codex-automation`ラベル）、squash merge、Pages公開とキャッシュ回避済みHTML/画像を検証する。
5. 成否、証跡、再開地点をstatusと当日worklogに記録する。既存レビュー画像の前回ローカルpreview 404は対象外で変更せず、公開確認時に関連レビューURLを確認する。

## Risks And Guards

- 固定件数テストはユーザー再開指示で明示承認された一箇所だけ31→32へ追随させる。ほかの件数・テスト範囲・検査本体は変更しない。修正後の失敗、衝突、内容/表示不一致があれば指定ゲートで停止する。
- `bookConnection` と本文は本人の目線、読了と本の裏付けを確認する。AI調査事情/第三者視点を除き、研究介入と翻案、実験限界と短縮版未検証を区別する。
- scope外の発見は変更せず、停止理由または別件として記録する。

## Verification

- 前回成功したdry-run・通常importは再実行しない。採用PNGはdelivery-manifest記載SHAとstudio job直下PNG原本を確認し、`cmp`一致を確認する。取り込み済みMarkdownはsite-work.jsonの項目・本文と変換後のfrontmatter/body内容が一致することを確認し、`published:false`を確認する。その後、`npm run works:preview`を起動してPC/モバイルを再目視する。
- `npm run test:works`（対象件数assert名/期待値は32）、`npm run verify:frontend`、`npm run check:works-dist`。この順に実行し、失敗時は次へ進まない。
- Claude reviewは実glm-5.3、StructuredOutput、正常終了、dispatch/実モデル照合を必須とする。
- コード差分を親へ独立確認に出し、明示合格を得る。PlanGateとコード差分のどちらも親の合格前に後続へ進まない。
- PR/CI/Pages後、一覧・詳細・レビュー相互リンク・OGをcache bypassでHTTP確認する。HTMLの480/1080 WebPとOGの1080 WebPは、公開レスポンスを対応する`dist/works/media/meeting-place-second-option-3min/{480,1080}.webp`と`cmp`し、両方のSHA-256を記録する。

## Approval

- approver: Claude review gate、親の独立確認、サイト工程担当
- status: 条件付き承認。必須Claude arch/diffがともに`ok:true`・blocking 0で、親がPlanGate文書を明示合格した場合のみ有効。テスト差分も親の独立確認とClaude diffの両方が合格するまで実行しない。
- note: ユーザーの継続承認は本件の新規制作物だけに適用。

plan 承認前は作品ファイルを変更しない。
