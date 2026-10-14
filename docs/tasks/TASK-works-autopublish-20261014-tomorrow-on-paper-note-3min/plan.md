# Plan

## Task

- task-id: TASK-works-autopublish-20261014-tomorrow-on-paper-note-3min
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 制作済みのワーク1件と1080×1350画像を既存コレクションへ加え、審査・公開確認を完了する。
- なぜ今やるか: 今回の新規制作が全ゲートを通過し、定期制作後のサイト工程に対する継続承認が適用されるため。
- visual thesis: 既存のワーク一覧・詳細の静かな表示に、納品画像をそのまま置く。新しい画面や装飾は加えない。
- content plan: 明日の用事が気になって休む時間が遠のく場面から始め、本の体の視点、3つの手順、研究の限界、中止と休息・相談・終了の選択へつなぐ。
- interaction thesis: 既存の詳細ページから関連レビューとワーク一覧へ移動できる状態を保つ。新しい操作は増やさない。

## Scope Declaration

- 変更対象ファイル: `src/content/works/tomorrow-on-paper-note-3min.md`、`src/assets/works/tomorrow-on-paper-note-3min.png`、本ディレクトリの`pbi-input.md`、`plan.md`、`test-cases.md`、`status.md`、`daily-2026-10-14.md`。
- 条件付き対象: `npm run test:works`が新規追加1件による固定件数不一致（実測22、期待21）だけで失敗したときは、`scripts/work-import.test.mjs`の期待件数だけを22へ更新する。reader-copy guardの文言・検査ロジックは維持する。
- 変更しないもの: 納品原本、他のワーク・レビュー・画像、トップページ、既存コンポーネント、X・Instagram投稿。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単一writerで順に進める。

## Implementation Steps

1. 納品JSON・画像・既存レビューのID/タイトル、slugと画像パスの衝突を再確認する。
2. 絶対パスの納品JSONで`works:import --dry-run`を実行し、成功したら同じJSONを通常importする。取り込み直後は`published:false`を確認する。
3. `WORKS_PREVIEW=1`のlocalhost:4327だけでPC・モバイルの一覧と詳細を確認する。画像、3手順、出典、本・レビュー導線、研究の限界、中止・終了の選択を目視する。
4. 問題がなければ対象記事の`published`だけをtrueへ変更し、`test:works`、`verify:frontend`、`check:works-dist`を実行する。`test:works`が今回の1件追加で固定件数検査だけ失敗した場合は、期待値21を22へ更新し、PlanGateとClaudeレビューの後に再実行する。ガード条件は変えない。生成distのHTML・画像参照と相互リンクを調べる。
5. 全必須Claudeレビュー、差分確認、commit、push、PR、CI確認、squash merge、Pages公開後のHTTP・PC/モバイル確認を行う。
6. `status.md`と日次記録へ結果を残す。

## Risks And Guards

- 想定リスク: 納品ファイルの変化、既存slug/画像との衝突、公開文と画像の不一致、下書き漏出。
- 回避策: SHA-256とdry-runを確認し、previewはlocalhostに限定する。公開切替は対象記事だけに行い、dist検査とデプロイ後の実URLで再確認する。
- scope外に見つけた事項の扱い: 作業を止め、親へ報告する。別記事や納品原本は変更しない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /absolute/path/site-work.json --dry-run`
  - `npm run works:import -- /absolute/path/site-work.json`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: localhost:4327のPC・モバイル表示、ビルド済みHTMLと画像、PRのCI、Pages公開URLの一覧・詳細・レビュー相互リンク・共有画像・srcset画像。

## Approval

- approver: ユーザーの継続承認（automation本文と`docs/works-publishing.md`）に基づくscope確認。Claude Review Gateを安全レビュー担当とする。
- status: approved
- note: 2026-10-14に新規制作され完全成功した1件だけが対象。過去納品、X・Instagram、画像再生成は含めない。今回の`test:works`実測で新規1件だけによる21→22の固定件数不一致を確認したため、期待値だけを更新する条件を明記した。reader-copy guardは維持し、このPlanGate amendmentをClaudeで確認してから更新を実装する。
