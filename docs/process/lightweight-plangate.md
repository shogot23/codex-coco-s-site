# Lightweight PlanGate

軽量 PlanGate は、実装前に計画を短く固定して scope drift と確認漏れを防ぐための最小運用です。重いプロセス化ではなく、既存の clean worktree / 最小差分 / daily 記録を補強するために使います。

## 1. 使う場面

- コード変更
- 公開文書や運用文書の更新
- 手順が複数段に分かれる実装タスク

次のような `record-fast` の記録だけを残す作業では不要です。

- daily
- recovery-log
- AI worklog
- 軽いメモ追記

1ファイル・15分以内で完了する軽微修正は PlanGate を skip してよい。

## 2. 作業前に作るもの

`task-id` は `TASK-<short-slug>` 形式を推奨します。

作業ごとに `docs/tasks/<task-id>/` を作り、着手前に次の 3 ファイルを用意します。

- `pbi-input.md`: 依頼内容、目的、制約、scope を固定する
- `plan.md`: 変更対象、実装順、検証方針を固定する
- `test-cases.md`: 先に確認観点を出しておく

`status.md` は同じディレクトリに置き、実装後に結果と残件を更新します。

テンプレートは `docs/tasks/_templates/` を使います。

## 3. 最小フロー

1. `git status --short --branch` で worktree を確認する
2. `pbi-input.md` を作る
3. `plan.md` を作る
4. `test-cases.md` を作る
5. plan 承認前はコード変更しない。個人運用では owner の自己承認でよく、複数人や `publish/dev-critical` では reviewer を明示する
6. plan の前提や scope が崩れた場合は実装を止め、plan.md を更新してから再開する
7. 承認後に、宣言した scope だけを最小差分で実装する
8. 実装後に最低限 `npm run typecheck` と `npm run build` を行う
9. frontend 変更では既存ルールどおり `npm run verify:frontend` まで行う
10. `status.md` を更新し、その日の daily / worklog に記録する

daily / worklog の固定パスがない場合は、その時点で使っている記録先を `status.md` に明記します。例として `inbox/daily/YYYY-MM-DD.md` のような日次ファイルを使ってよいです。

## 4. 運用の原則

- PlanGate は事故防止のための軽量な固定であり、長い設計書を毎回求めるものではない
- scope 外変更をしない。気づいた改善案は別タスクへ分ける
- plan はあとで読み返して判断理由が追える粒度に留める
- 既存の review gate や verify ルールは置き換えず、その前段に置く

## 5. テンプレートの使い分け

- Web 開発では対象画面、変更ファイル、検証コマンドを具体化する
- 文書整備や運用改善では、影響範囲と更新対象を具体化する
- 他タスクでも、目的 / scope / 手順 / 検証 / 完了条件の 5 点が残れば流用してよい

## 6. 例

- 記入例: `docs/tasks/examples/TASK-example/`
- テンプレート: `docs/tasks/_templates/`
