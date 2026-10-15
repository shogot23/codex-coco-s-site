# Status

## Task

- task-id: TASK-unify-coco-spacing
- state: complete
- updated: 2026-10-15

## Summary

- 実施内容: 最新main（PR #210統合後）との差分34ファイルでブランド表記90箇所を `読書 with Coco` へ統一し、現行指針とE2E期待値も更新した。PlanGate・検査ヘルパー・dailyを含む変更40ファイルは宣言scopeと一致する。
- 実施済み: PlanGate作成、全件棚卸し、baseline照合、40ケースの検査ヘルパー確認、最新main取り込み後のfrontend検証、182ページとRSSの最終表記確認。
- Claudeレビュー: PR #210取り込み後のarch / grouped diff / cross-checkはすべて`ok: true`。brand strategyの旧空白ルールは修正済み。RSS alternate linkとfeed titleの区切り記号差は既存の表記差として記録し、今回のブランド統一範囲外とした。

## Verification Result

- `npm run build`: 成功。Astro static build と `check:dist` を完了（182 HTML files）。
- 検査ヘルパー: 生文字列24ケースとHTML可視文字列16ケース（計40ケース）が通過し、`py_compile` も成功。
- baseline checker (branch開始時、main #209): 期待どおり終了コード1。`scanned_files=509`、`binary_files_skipped=2378`、`candidate_detections=2297`、`exact_detections=4`、`dist_index_candidates=24`、`invalid_detections=2293`、`scan_errors=0`。不一致のある217ファイルは、宣言済み公開ソース34ファイルと生成HTML/RSS 183ファイルだけで、宣言外候補は0件。
- `npm run verify:frontend`: 成功。lint / typecheck / build / test:e2eを完了し、E2Eは113 passed、7 skipped。Playwrightの`chromium`と`mobile-chrome`を含む。
- 最新main（PR #210統合）取り込み後のverify: `npm run verify:frontend`成功、E2E 113 passed / 7 skipped。
- 最新main取り込み後のfinal checker: 終了コード0。`scanned_files=509`、`candidate_detections=2284`、`exact_detections=2284`、`dist_index_candidates=24`、`invalid_detections=0`、`scan_errors=0`。
- 生成物の目視相当確認: 182/182 HTMLページで可視表記が一致し、不一致ページ0。RSS titleは`読書 with Coco | Reviews`、descriptionも指定表記を含む。
- 終了コード2のguard: `dist/`欠落時と追跡ファイル欠落時の両方で2を確認し、移動した生成物・ソースは復元済み。
- 追加確認: tracked tree の棚卸しで修正対象を確定。`.codex/config.toml` と `docs/revenue-pathway-design.md` はすでに指定表記、`public/` に別のテキスト表記なし。`package.json` の `verify:frontend` は lint / typecheck / build / test:e2e を実行。
- アセット確認: 共通OGPの既定画像は本のインフォグラフィックでサイト名を含まず、faviconも文字のない図形のみ。画像内表記の変更は不要。
- 最新main arch review: Claude `glm-5.3` が`ok: true`。checkerは今回の全件監査用で、継続CIガードとして追加していない。variant検出は`RAW_SEPARATOR` / `VISIBLE_SEPARATOR`と40ケースで確認済み。RSS link titleとfeed titleの区切り記号ゆれは既存としてscope外に置く。
- 最新main diff review: 変更されたHome/SEO・About/Profile・content・E2E groupは`glm-5.3`で`ok: true`。日本語助詞直前の空白ゆれはブランド名部分の外側にある既存表記として維持。review advisoryだったcuriosity本文の旧表記は検索で0件、works一覧タイトルは個別に指定表記を含み、E2Eでも確認済み。
- PlanGateの`plan.md` approvedは実装前計画承認を示す。実装後レビューとcross-check、merge後確認は別の完了条件として扱う。
- 最新main cross-check: Claude `glm-5.3` が`ok: true`。origin/mainとの差分40ファイル・90置換・ブランドルール1文修正と、frontend検証・checker結果の整合を確認し、blocking issueは0件。
- PR #211: `https://github.com/shogot23/codex-coco-s-site/pull/211` を2026-10-15にsquash merge。main merge commitは`2c237f88c0b5aa63ab4152720b2dc44031f4c101`。
- merge後main CI: `frontend-verify` 成功（[run 38683621743](https://github.com/shogot23/codex-coco-s-site/actions/runs/38683621743)）。GitHub Pages deployも成功（[run 38683621697](https://github.com/shogot23/codex-coco-s-site/actions/runs/38683621697)）。
- 本番確認: sitemap掲載181ページと404ページの計182 HTMLページがすべてHTTP 200で、可視表記の不一致・旧表記候補は0件。RSSもHTTP 200で、titleは`読書 with Coco | Reviews`、descriptionを含め誤表記候補0件。

## Scope Check

- scope 内で収まっているか: 最新mainとの差分34ファイルで旧文字列90箇所を指定表記へ置換した。内容差分照合では33ファイルが置換のみで一致し、brand-strategyにはレビューで見つかった旧空白ルール1文の修正も含めて期待値と一致した。変更40ファイル（公開ソース・現行指針・E2E 34、PlanGate/検査5、daily1）はすべて宣言済みで、scope外ファイル0件。置換前の不一致候補も全件scope内だった。先行PR #209 は「読書with Coco」への変更であり、今回は空白を1字追加した。
- 見送った項目: 英語表記、画像、過去記録は対象外。
- 受容した文書差分: `CLAUDE.md` の `codex-review` 表記と `AGENTS.md` / `docs/parallel-dev-config.md` の `claude-review-gate` 表記に差がある。今回は現在の正典を優先し、無関係な運用文書の記述は変更しない。

## Next Action

- 残件: なし。PR merge、main CI、Pages deploy、本番HTML/RSSの確認まで完了。
- 次に見る人へのメモ: 正式表記はASCII空白を挟んだ `読書 with Coco`。

## Daily Record

- 記録先: `inbox/daily/2026-10-15.md`
- 記録内容: `inbox/daily/2026-10-15.md`に実装と最新main取り込み後の検証を記録済み。PR merge後にCI・Pages・本番確認を追記する。
