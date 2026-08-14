# Test Cases

## Task

- task-id: `TASK-stoic-mindset-review-2026-08-14`
- related plan: `docs/tasks/TASK-stoic-mindset-review-2026-08-14/plan.md`

## Must Check

- [x] Reviews一覧に『ストイック・マインドセット』が表示され、詳細へ遷移できる。
- [x] Review詳細に提供インフォグラフィック、著者名、レビュー本文、Life Repair Notesが表示される。
- [x] Gallery一覧に同書が書斎のGallery画像で表示され、詳細へ遷移できる。Galleryでインフォグラフィックを使用しない。
- [x] Review詳細とGallery詳細の相互リンクが正しいslugへ遷移する。
- [x] 楽天購入リンクが受領値どおりの遷移先を持ち、`&amp;`がURL文字列に残らない。
- [x] レビューがストイックを感情抑圧や成功保証として扱わず、著者の10原則を日常の判断と行動へ翻訳する。
- [x] インフォグラフィックの「5分」を本書からの直接指定と誤認させない。
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
- [x] ココちゃんが飾りではなく、本から足元の一歩へ導く案内役として機能する。

## Optional Checks

- [x] Claude Review Gateが必須フェーズ`ok: true`、blocking 0件で完了する。
- [x] Sol独立最終チェックがClaude完了後にpassする。

## Out Of Scope

- もしもインプレッション画像の新規schema対応、外部ストアでの購入完了確認、既存ページテンプレートの変更。
