# Test Cases

## Task

- task-id: TASK-unify-coco-spacing
- related plan: `plan.md`

## Must Check

- [x] 目的の変更が反映される。日本語ブランド名はASCII空白1字ずつを含む `読書 with Coco` と一致する。
- [x] `with` の小文字、`Coco` の大小文字、両側のASCII空白1字を厳密に確認する。
- [x] 全角空白、連続空白、空白なし、全角英字、各境界4個までの句読点・記号、アンダースコア、不可視書式文字、単一改行、大文字小文字の変体を含む候補検査を追跡テキストとビルド出力全体に実施し、不一致が0件である。上限4個は`RAW_SEPARATOR` / `VISIBLE_SEPARATOR`が定める検出範囲を指し、正式表記は句読点なしとする。空行をまたぐ別段落は候補に連結しない。
- [x] HTMLのinline要素で分割された可視文字列も検査し、改行や別blockを越えて無関係な文章を連結しない。
- [x] HTMLの隣接するli項目、見出しと段落、別table cell間の境界を検査し、NUL境界を句読点候補に含めない。
- [x] 英単語が続く「Coco...」の部分一致をブランド名として数えない。
- [x] 終了コード0（clean）、1（誤表記候補あり）、2（build出力欠落・候補ゼロ・走査エラー）の意味を確認する。HTML候補数はraw sourceと可視テキストの合算である。
- [x] 完全なcheckoutで実行し、追跡ファイル欠落・読み取りエラーが終了コード2になることを確認する。
- [x] Astro buildの整形式HTMLを前提として検査する。自己終了形のscript/style/templateやタグの不整合を想定した原文確認の手順を記録した。
- [x] 公開ページ、SEO、RSS、E2E期待値、現行指針に誤表記が残っていない。
- [x] scope 外の変更が入っていない。
- [x] 主要導線とレイアウトが変わっていない。

## Command Checks

- [x] Baseline: `npm run build` の後にcheckerを実行し、既存候補をすべてscopeと照合する（旧表記が残るため終了コード1を想定）。
- [x] Final: `npm run verify:frontend`（lint / typecheck / build / test:e2e を含む）の後にcheckerを実行し、誤表記0件を確認する。Playwright結果に `chromium` と `mobile-chrome` の両方が含まれる。

## Manual Checks

- [x] build 出力のHome、About、Profile、Reviews、Gallery一覧・アーカイブ、3books、Works、404、個別詳細ページで表記を確認する。
- [x] RSSのtitle/descriptionを確認する。
- [ ] merge後のmain CIとPages deploy runが成功したことを確認する。
- [ ] deploy後に公開HTML/RSSを確認する。

## Optional Checks

- なし。

## Out Of Scope

- 英語表記、画像内テキスト、過去のタスク記録やdaily、デザイン変更。
