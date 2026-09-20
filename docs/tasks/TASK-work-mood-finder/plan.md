# Plan

## Task

- task-id: `TASK-work-mood-finder`
- related pbi: `docs/tasks/TASK-work-mood-finder/pbi-input.md`

## Intent

- 何を変えるか: ワーク一覧の冒頭に、今の気分と気になっていることを一つずつ選べる入口を置き、選択に合うワークを優先表示する。
- なぜ今やるか: 公開ワークが14件に増え、困りごとから最初の一件へ進む導線を、一覧の読み比べに頼らず用意するため。

## Experience Thesis

- visual thesis: 温かな紙面の余白に、ココちゃんが選択肢の間を案内するような静かな「道しるべ」を置く。既存の実画像が続く編集的な一覧を主役に保つ。
- content plan: ワークページの約束 → 気分を選ぶ → 悩みを選ぶ → 合いそうな候補 → ワーク詳細 → 関連書籍。
- interaction thesis: 選択直後に候補数と結果が更新され、両方に合うワークを先頭へ移す。「選択をクリア」で2組のradioを初期状態へ戻せ、hover・focus・結果の切り替えは短く静かに伝える。

## Scope Declaration

- 変更対象ファイル:
  - `src/content/config.ts`
  - `src/data/work-taxonomy.json`
  - `src/content/works/*.md`
  - `src/pages/works/index.astro`
  - `src/styles/works.css`
  - `scripts/work-import.mjs`
  - `scripts/work-import.test.mjs`
  - `scripts/check-works-dist.mjs`
  - `tests/e2e/works.spec.ts`
  - `docs/works-publishing.md`
  - `docs/tasks/TASK-works-pages/automation-addendum.md`
  - `docs/tasks/TASK-work-mood-finder/`
- 変更しないもの: ワーク本文、研究根拠、画像、詳細ページ、レビュー/ギャラリー本文、購入導線、公開状態、トップページと共通ナビの構成。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

分類、表示、取り込み仕様、E2Eが同じ契約に依存するため、単独で進める。

## Implementation Steps

1. 気分6種を `疲れている`、`不安・落ち着かない`、`焦っている`、`自分を責めている`、`動き出せない`、`気持ちを整理したい`、悩み6種を `仕事・働き方`、`休息・体調`、`人との関わり`、`行動・習慣`、`情報との付き合い`、`自分との対話` として固定する。機械用IDと表示ラベルの単一情報源を `src/data/work-taxonomy.json` に置き、schema、一覧、importer、テストから参照する。
2. works schemaへ複数選択可能な分類フィールドを追加する。既存14件へ本文と `readerWorry` に沿った分類を付け、12分類の各項目が少なくとも1件の公開ワークに割り当てられていることをテストする。
3. `/works/` に2組の単一選択UIを追加する。各組は `fieldset` / `legend` / radioで表し、片方だけの選択にも対応する。「選択をクリア」ボタンで両組を未選択へ戻す。両方一致を先頭、片方一致を次点とし、同じ一致段階では既存のコレクション順を保つ安定ソートにする。両方を選んだ場合も少なくとも一方に一致するワークだけを表示し、無一致は非表示にする。選択がない場合は全件を既存順で表示する。
4. 結果件数をlive regionで伝える。JavaScript無効時は選択UIを隠し、初期HTMLにある全ワークと詳細ページへの通常リンクを維持する。サーバー側やクエリパラメータによる絞り込みは今回のscope外とする。
5. `site-work.json` の分類項目を検証・取り込みできるようにし、制作仕様とautomation addendumを同期する。配列でない値、未知の分類、空配列、重複、分類漏れは拒否する。
6. 単体テストとE2Eへ、分類契約、全分類の割り当て、片方/両方選択、リセット、候補順、radioのキーボード操作、JavaScript無効時の一覧、公開境界の確認を追加する。
7. desktop/mobileで見た目と操作を確認し、frontend verifyとClaude review gateを完了する。`status.md` とdaily記録を更新する。

## Risks And Guards

- 想定リスク: 「最適」と断定して読者の状態を診断する印象になる。JavaScriptに依存して一覧やリンクが消える。今後の取り込みで分類が欠落する。
- 回避策: 「合いそう」と表現し、少なくとも一方に一致する候補を表示する。各分類を公開ワークへ必ず割り当てて候補が空にならない契約にする。初期HTMLに全件を描画し、schema・import・テストで分類契約を揃える。
- scope 外に見つけた事項の扱い: 別タスク候補として `status.md` に記録し、今回の差分へ混ぜない。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run test:works`
  - `npm run test:works-preview`
  - `npm run check:works-dist`
  - `npm run verify:frontend`
- 追加確認: desktop/mobileの一覧、選択/解除、結果件数、候補順、キーボード操作、axe、詳細ページ遷移、通常公開とpreviewの境界を確認する。

## Approval

- approver: ユーザー
- status: approved
- note: 2026-09-20、ユーザーがこの計画での実装を承認。
