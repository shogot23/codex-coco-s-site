# Test Cases

## Task

- task-id: TASK-yutoronika-review-gallery
- related plan: `docs/tasks/TASK-yutoronika-review-gallery/plan.md`

## Must Check

- [x] 早川書房の公式書誌で著者・刊行情報・アガスティアリゾートの設定・六つの物語を照合する。
- [x] Review本文にユーザーの読後感、作品設定、問い、小さな一歩が反映される。
- [x] Gallery.relatedReviewがReviewへ解決され、Review詳細からGalleryへ戻れる。
- [x] Reviewにインフォグラフィック、Galleryに写真が設定され、画像内容と表示対象が一致する。
- [x] Galleryのgenerated_atが存在し、一覧データに掲載される。
- [x] ReviewのMoshimo URLはHTTPSでtracking pixelを含まず、Galleryは関連Reviewから購入リンクを取得する。両ページの外部リンク属性と開示表示を確認する。
- [x] 変更はtask scopeに限定され、提供画像のハッシュと原寸が保たれる。

## Command Checks

- [x] `npm run lint`
- [x] `npm run check:content`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] Review/Galleryの生成HTML、書評、購入導線、相互リンクを確認する。
- [x] 1440px desktop / 390px mobileで該当ページを確認し、画像表示と水平はみ出しなしを確認する。
- [ ] Pages成功後にcache-bypassで公開HTMLとHTMLに参照されたAVIF/WebPを確認する。

## Optional Checks

- [x] manifestのentries[path]、SHA-256、寸法、Gallery並び順を確認する。
- [ ] Pages公開後に画像HTTP 200を確認する。

## Out Of Scope

- 今回やらない確認: 既存ページ全体の再設計、既存アフィリエイトの棚卸し。
