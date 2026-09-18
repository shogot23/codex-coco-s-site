# ワークページ実装結果

2026-09-18。実装・プレビュー検証完了後、ユーザーから本番反映の承認を受領。以下は段階ごとの記録。

- 作業領域: `/Users/shogo/Projects/coco-works-pages`
- branch: `codex/works-pages`。mainと既存未追跡ファイルは保全。
- プレビュー: http://127.0.0.1:4327/codex-coco-s-site/works/
- 初回3件: 青天、ハピネス・カーブ、私が間違っているかもしれない。すべて `published:false`。
- 一覧・詳細・本との相互リンク、条件付きホーム・メニュー、共有用メタデータを実装。
- `site-work.json` から下書きと画像を取り込む。既存ファイルを上書きしない。
- 定期制作cocoへレビュー済みの `automation-addendum.md` を追記。保存後のpromptと、既存モデル・推論設定・スケジュール・プロジェクト・ACTIVE状態の一致を確認。
- 定期制作はサイト原稿同梱まで。今回commit・PR・merge・サイト公開・SNS投稿は未実施。

## 検証

- `npm run test:works`: 13 passed。
- `npm run verify:frontend`: exit 0。lint/typecheck/build、E2E 53 passed / 13 expected skipped（表示対象・viewport限定ケース）。
- `npm run test:works-preview`: 8 passed。PC/mobile、3件すべての本との往復、画像読込・比率、Enterで手順へ移動、axe違反0。
- `check:works-dist`: 3下書きのURL・タイトル・画像がdistにない。通常の `check:dist` に組込み済み。
- `WORKS_PREVIEW=1` 付き本番buildでも下書き除外を確認。
- 一時的な公開fixtureでページ・画像2サイズ・sitemap・本からの逆リンク生成を確認。fixtureは削除し、最終buildは3件とも非公開へ復元。
- 全8種のCSS参照トークンの存在、元画像とコピーのSHA一致、原寸画像とPC/mobile画面を確認。
- 初回テストで見つけた環境変数読取、画像ロード待機、レビューID比較を修正し、最終再実行で解消。

## Claudeレビュー

- CLI: `claude`。requested/actual model: `glm-5.3`、fallbackなし。
- arch、data/ui/integration/content/testsの各diff、最終cross-checkすべて `ok:true`。blocking 0。
- 全phaseで正常終了・schema完全検証・dispatch対応確認済み。
- arch/data/ui/testsはschema修正1回、integrationは2回の後に成功1回。preflight/content/cross-checkは成功1回。
- contentは小さな文書グループのためeffort low。他の本レビューはhigh。
- 証跡: `/tmp/coco-works-review/`。要約は `reports/works-review/` にも保存。
- 残るadvisory: 手書き原稿のJSON parse診断、手順数計測の対象範囲。現在の取り込み形式では発生せず、公開判定に影響しない。
- 任意のfetchpriority・import順整理は今回追加しない。まれなディスク書込異常では残存ファイルを手動確認して復旧する。

## 次の操作

ユーザーのプレビュー確認後、対象3件のpublishedをtrueにし、`docs/works-publishing.md` に従って再検証・PR・公開へ進む。

作業記録: `docs/tasks/TASK-works-pages/daily-2026-09-18.md`（record-fast）。

## 2026-09-18 参考図書のリンク追加

- 3件の参考図書欄に、既存レビュー・同じ本の公開ギャラリー・既存のもしも購入先を表示。購入先はURL単位で重複除外。
- 購入先に `sponsored nofollow noopener noreferrer`、別タブ表示、アフィリエイト開示を付与。
- `npm run test:works-preview`: 8 passed。各ギャラリーへの実遷移、購入先URLの原稿一致・重複除外・属性、axeを確認。外部購入先へテスト用の計測クリックは送っていない。
- `npm run verify:frontend`: exit 0、typecheckエラー0、53 passed / 13 expected skipped。画像・リンク・下書き除外のビルド検証も通過。
- Claude small diff: `glm-5.3` / high / `ok:true`。正常終了、schema修正1回後に成功1回、出力検証済み。証跡 `/tmp/coco-works-links/`。
- 型ナローイングに関するadvisoryは現行TypeScriptとastro checkで問題なしと確認。購入先抽出は既存3原稿の書式と一致。将来の書式変更時の期待値チェック強化、リンク一覧のul/li化は任意改善として保留。
- 画像・原稿の公開状態、定期制作設定は変更していない。

## 2026-09-18 公開承認後の作業

- ユーザーの「それでは本番反映してください」を受け、初回3件を `published:true` に変更。今後の取り込みは引き続き下書きから始める。
- 公開時に追加される「ワーク」を、既存ナビゲーションテストの期待値へ追加。
- PRのCI完了後にsquash mergeし、Pages完了後に本番URL・相互リンク・画像を確認する。

## 2026-09-19 再開時の確認

- 公開状態で `verify:frontend` が59 passed / 7 skipped、取り込みテスト13 passed、公開レビュー42件のcontent auditを確認。
- Claude最終cross-checkは `glm-5.3` / high / `ok:true`。schema修正1回後に成功。証跡 `/tmp/coco-works-release/`。
- 購入先期待値が空の場合の検出を追加。手順数の計測範囲とJSON解析の診断文は現行形式では支障がなく、保留とする。
- レビューのautomation未適用という記述は過去資料からの推定。実際には前段で適用・保存値照合済み。
