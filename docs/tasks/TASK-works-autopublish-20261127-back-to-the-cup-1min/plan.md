# Plan

## Task

- task-id: TASK-works-autopublish-20261127-back-to-the-cup-1min
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 当回に完成した `back-to-the-cup-1min` の原稿と1080×1350画像を既存ワーク機能へ取り込み、審査・検証後にこのslugだけを公開する。
- なぜ今やるか: 自動公開設定更新後の新規完成分に対する継続承認の範囲に入り、制作と納品の検証が完了している。
- visual thesis: 既存の一覧・詳細レイアウトを保ち、納品済みの喫茶席とココちゃんの4:5画像を、静かな導入として表示する。
- content plan: 夜に今日の出来を採点し続ける悩み → そばの一杯へ30秒注意 → 今日の一場面にも目を向けられる余地 → 休む・相談・終了の選択 → 公開レビューへつなぐ。
- interaction thesis: 既存一覧から詳細へ進み、選択できる短い手順・振り返り・関連レビューをたどれることを、PCとmobileで確認する。

## Scope Declaration

- 変更対象ファイル:
  - `src/content/works/back-to-the-cup-1min.md`（import時は `published:false`、最終ゲート後に `published` だけ `true`）
  - `src/assets/works/back-to-the-cup-1min.png`（原本PNGそのまま）
  - `docs/tasks/TASK-works-autopublish-20261127-back-to-the-cup-1min/{pbi-input.md,plan.md,test-cases.md,status.md}`
  - `inbox/daily/2026-11-27.md`
  - 条件成立時のみ: `scripts/work-import.test.mjs`（固定件数の既存テスト名・期待値の2行を同期）
- daily/worklogの記録先は `inbox/daily/2026-11-27.md` に統一し、別のworklogファイルは作らない。
- 変更しないもの: 元repoとそのdirty main、納品原本とhistory、他の公開記事・画像・slug、共通UI/レイアウト・設定、SNS投稿。既存testは原則変更しない。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

本件は原稿import、プレビュー、公開切替を単一writerの順序で行う。

## Implementation Steps

1. 実ログで `gpt-6-luna / max`、元repo状態、原本hash、最新 `origin/main` のslug/画像衝突なしを確認する。PlanGateをClaudeでレビューし、合格前はコード変更しない。
2. 隔離worktreeで `npm run works:import -- <site-work.json> --dry-run`、その後通常importを実行する。`published:false` を確かめ、`npm run works:preview` で一覧・詳細・画像・手順・出典・本への導線をPC/mobile viewportで確認する。
3. 一覧・本文・振り返りで悩み→任意の30秒→見方の余地→休む/相談/終了が一貫することをPC/mobile previewで目視する。既存 `tests/e2e/works.spec.ts` の `work and book round trip: back-to-the-cup-1min` と `scripts/work-import.test.mjs` を実行する。公開文は `pbi-input.md` の4点チェックに沿ってClaudeと確認し、review gate合格後、対象Markdownの `published` だけを `true` にする。
4. `npm run test:works` を実行する。唯一の失敗が今回の追加1件による固定件数36→37だけなら、後続検証を止め、実数と原因を記録する。PBI/plan/test-casesへ本amendmentを記載し、Claude `glm-5.3` reviewに合格した後だけ、既存 `scripts/work-import.test.mjs` のtest名・期待値の2行を37へ同期し、`npm run test:works` を再実行する。他の失敗、差の原因不一致、review不成立なら停止して報告する。成功後に限り `npm run verify:frontend` → `npm run check:works-dist` を実行し、変更差分と公開状態を再確認、commit/PR/merge前のClaude review gateを通す。
5. Conventional Commitでcommit/pushし、`codex`・`codex-automation`ラベルを付けたPRを作成する。PR差分・CI・mergeable状態・merge前レビューを確認しsquash mergeする。
6. Pages成功後、公開一覧・詳細・本の相互リンク・OG画像を確認する。HTMLが参照する最適化画像を取得しstatusとdaily記録にURL・HTTP状態・SHA/byte一致を残す。公開URLが確認できない場合は成功扱いにしない。

## Risks And Guards

- 想定リスク: dirty main上の既存ファイルや別の仕事を誤って混入する、同一slug/画像を上書きする、公開文が根拠を超える、研究条件を30秒版へ転用する、固定件数テスト・preview・レビュー・CI・Pagesが失敗する。
- 回避策: 元repoはread-onlyで扱う。最新origin/main起点の隔離branchだけを編集する。slugと画像の未存在を確認し、既存記事上書きはしない。出版社・本人の公開レビュー・研究原典に即して4点を確認し、未検証表示を維持する。各失敗で次工程へ進まず記録して停止する。
- scope外に見つけた事項の扱い: 停止し、別件として親へ共有する。CI設定、既存記事、共通UIは変更しない。`npm run test:works` が固定件数の差だけで失敗したときは、本amendmentに記した2行同期以外のテスト変更を行わない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-27_2230_back-to-the-cup-1min/site-work.json --dry-run`
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-27_2230_back-to-the-cup-1min/site-work.json`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
  - `git diff --check`
- 追加確認: import前後hash・対象slugのみ変更・`published:false`・プレビューnoindex・PC/mobile表示・4点コピー確認・レビューとの相互リンク・本番HTMLと最適化画像のHTTP/SHA/byte確認。

## 2026-11-28 Amendment

- 失敗根拠: `npm run test:works` は35件中34 pass / 1 fail。失敗は既存の固定件数テストのみで、origin/mainの36 Markdownに今回の `back-to-the-cup-1min` だけが加わり実数37。
- 許可差分: review合格後に `scripts/work-import.test.mjs` のテスト名 `all 36 current work Markdown files ...` と `assert.equal(names.length, 36)` の2箇所を37へ変更し、同テストを再実行する。他のtest編集や新規testは含めない。
- この変更は公開・検証scopeを広げず、同一の固定件数ハードコードを実データ件数に合わせる限定例外。

## Approval

- approver: 親タスク所有者（継続承認の範囲）。Claude review gateはレビュー担当。
- status: amendment-approved
- note: 初回PlanGate approvalはimport・公開フローを承認済み。2026-11-28の固定件数2行修正は本amendmentのClaude review合格まで未承認。初回承認根拠: `docs/works-publishing.md` 冒頭の継続承認を適用。実turn_contextは親ログで `gpt-6-luna / max` を照合済み。PlanGateのarch・最終diffレビューはactual_model `glm-5.3`、終了コード0、blocking 0、最終advisory 0で成立した。archの初回schema不一致1件は次のStructuredOutput成功dispatchで修復。過程のadvisoryは最終diff前に反映済み。レビューartifactは `/private/tmp/coco-site-back-to-the-cup-1min-20261127-review/` に保存。 Amendment review: glm-5.3 / low / diff、exit 0、schema error修復後1 successful dispatch、blocking 0・advisory 3。status遷移・test名特定・HEAD記録に関するadvisoryは、既存作業記録と本statusで実務を追跡し scopeを変えないため追加文書修正を見送り。artifact `/private/tmp/coco-site-back-to-the-cup-1min-20261127-review/task-plan-amendment-20261128/retry1/`。
