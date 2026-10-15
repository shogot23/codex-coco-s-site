# Status

## Task

- task-id: TASK-unify-coco-spacing
- state: in-progress
- updated: 2026-10-15

## Summary

- 実施内容: 公開ソース34ファイルのブランド表記92箇所を `読書 with Coco` へ統一し、現行指針とE2E期待値も更新した。PlanGateを含む変更39ファイルは宣言scopeと一致する。
- 実施済み: PlanGate作成、全件棚卸し、baseline照合、40ケースの検査ヘルパー確認、frontend検証、182ページとRSSの最終表記確認。
- Claudeレビュー: PlanGateのarch / diff / cross-check、全グループの実装diff、helper各部のfocused review、最終全体cross-checkは`ok: true`。brand strategyに残っていた空白ルールのblocking指摘は修正し、再レビューで解消した。残るreview advisoryは既存の助詞前空白ゆれをscope外として扱う点と、merge後確認が未完了である点。

## Verification Result

- `npm run build`: 成功。Astro static build と `check:dist` を完了（182 HTML files）。
- 検査ヘルパー: 生文字列24ケースとHTML可視文字列16ケース（計40ケース）が通過し、`py_compile` も成功。
- baseline checker: 期待どおり終了コード1。`scanned_files=509`、`binary_files_skipped=2378`、`candidate_detections=2297`、`exact_detections=4`、`dist_index_candidates=24`、`invalid_detections=2293`、`scan_errors=0`。不一致のある217ファイルは、宣言済み公開ソース34ファイルと生成HTML/RSS 183ファイルだけで、宣言外候補は0件。
- `npm run verify:frontend`: 成功。lint / typecheck / build / test:e2eを完了し、E2Eは113 passed、7 skipped。Playwrightの`chromium`と`mobile-chrome`を含む。
- final checker: 終了コード0。`scanned_files=509`、`candidate_detections=2297`、`exact_detections=2297`、`dist_index_candidates=24`、`invalid_detections=0`、`scan_errors=0`。
- 生成物の目視相当確認: 182/182 HTMLページで可視表記が一致し、不一致ページ0。RSS titleは`読書 with Coco | Reviews`、descriptionも指定表記を含む。
- 終了コード2のguard: `dist/`欠落時と追跡ファイル欠落時の両方で2を確認し、移動した生成物・ソースは復元済み。
- 追加確認: tracked tree の棚卸しで修正対象を確定。`.codex/config.toml` と `docs/revenue-pathway-design.md` はすでに指定表記、`public/` に別のテキスト表記なし。`package.json` の `verify:frontend` は lint / typecheck / build / test:e2e を実行。
- アセット確認: 共通OGPの既定画像は本のインフォグラフィックでサイト名を含まず、faviconも文字のない図形のみ。画像内表記の変更は不要。
- 最終arch review: Claude `glm-5.3` が `ok: true`。検査ヘルパーは今回の全件監査用で、継続的CIガードとしては追加していない。バリアント検出範囲は`RAW_SEPARATOR` / `VISIBLE_SEPARATOR`と40ケースで確認済み。
- grouped diff review: `glm-5.3`で全公開コード・指針・タスク記録グループが`ok: true`。about / review本文にある`Coco`直後の助詞と空白の既存ゆれは、正準ブランド部分の変更と無関係なためscope外として維持した。
- PlanGateの`plan.md` approvedは実装前計画承認を示す。実装後レビューとcross-check、merge後確認は別の完了条件として扱う。
- final cross-check: Claude `glm-5.3` が`ok: true`。40ファイルの差分scope、ページ/SEO/RSS/E2Eの正準表記、チェッカー結果とfrontend検証の整合を確認し、blocking issueは0件。

## Scope Check

- scope 内で収まっているか: 公開ソース・現行指針34ファイルで旧文字列92箇所を指定表記へ置換した。内容差分照合では33ファイルが置換のみで一致し、brand-strategyにはレビューで見つかった旧空白ルール1文の修正も含めて期待値と一致した。変更40ファイル（公開ソース・現行指針34、PlanGate/検査5、daily1）はすべて宣言済みで、scope外ファイル0件。置換前の不一致候補も全件scope内だった。先行PR #209 は「読書with Coco」への変更であり、今回は空白を1字追加した。
- 見送った項目: 英語表記、画像、過去記録は対象外。
- 受容した文書差分: `CLAUDE.md` の `codex-review` 表記と `AGENTS.md` / `docs/parallel-dev-config.md` の `claude-review-gate` 表記に差がある。今回は現在の正典を優先し、無関係な運用文書の記述は変更しない。

## Next Action

- 残件: daily記録を含む変更をcommitしてPR・squash mergeへ進む。merge後はmain CI、Pages deploy、本番HTML/RSSを確認して最終statusを更新する。
- 次に見る人へのメモ: 正式表記はASCII空白を挟んだ `読書 with Coco`。

## Daily Record

- 記録先: `inbox/daily/2026-10-15.md`
- 記録内容: `inbox/daily/2026-10-15.md`に実装と検証を記録済み。PR merge後にCI・Pages・本番確認を追記する。
