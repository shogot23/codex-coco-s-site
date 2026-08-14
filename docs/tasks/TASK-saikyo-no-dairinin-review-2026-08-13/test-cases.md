# Test Cases

## Task

- task-id: `TASK-saikyo-no-dairinin-review-2026-08-13`
- related plan: `docs/tasks/TASK-saikyo-no-dairinin-review-2026-08-13/plan.md`

## Must Check

- [x] Reviews一覧に『最強の代理人』が表示され、詳細へ遷移できる。
- [x] 詳細に提供インフォグラフィック、著者名、レビュー本文、Life Repair Notesが表示される。
- [x] Gallery一覧に『最強の代理人』が専用Gallery画像で表示され、詳細へ遷移できる。Galleryでインフォグラフィックを使用しない。
- [x] Review詳細とGallery詳細の相互リンクが正しいslugへ遷移する。
- [x] Gallery上部の3章リンクすべてに、SSR生成HTML内の対応anchorが存在する。
- [x] Reviews初期棚から、作品の並び替えに依存せず先頭レビュー詳細へ遷移できる。
- [x] Reviews検索・reset・load more・browser back後のレイアウト計測がDOM差し替え競合なく連続5回成功する。
- [x] 楽天購入リンクが受領値どおりの遷移先を持ち、`&amp;`がURL文字列に残らない。
- [x] レビューが支援論だけに縮まず、契約・環境整備・日本サッカーの土壌まで扱う。
- [x] scope外の変更がなく、既存のReviews・Gallery導線を壊さない。

## Command Checks

- [x] `npm run lint`
- [x] `npm run check:content`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktopとmobileでReviews一覧・Review詳細・Gallery一覧・Gallery詳細を目視確認する。
- [x] 画像の取り違え・欠落、横overflow、本文の読みづらさがない。
- [x] 購入リンクの`href`、`target="_blank"`、`rel="noopener noreferrer nofollow"`を確認する。

## Optional Checks

- [x] Claude review gateが`ok: true`、blocking 0件で完了する。

## Out Of Scope

- もしもインプレッション画像の新規schema対応、外部ストアでの購入完了確認、既存ページテンプレートの変更。
