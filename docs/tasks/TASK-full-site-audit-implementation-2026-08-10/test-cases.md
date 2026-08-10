# Test Cases

## Task

- task-id: `TASK-full-site-audit-implementation-2026-08-10`
- related plan: `docs/tasks/TASK-full-site-audit-implementation-2026-08-10/plan.md`

## Must Check: Brand And Content

- [ ] Home first viewportで`読書 with Coco`、対象読者の具体的なモヤモヤ、持ち帰る価値、`レビューを見る`が理解できる。
- [ ] Reviewsがprimary、Galleryがsecondary、purchaseがtertiaryで全主要ページに一貫する。
- [ ] Review未連携Galleryのprimary CTAが外部purchaseではない。
- [ ] アフィリエイト表示が購入リンク付近で統一される。
- [ ] AI生成・読後イメージが公式書影と誤認されない表示になる。
- [ ] 画像由来が未確認の作品をAI生成と断定しない。
- [ ] direct quoteとsite-authored takeawayが区別される。
- [ ] 全公開reviewが生活上の入口、見方の変化、小さな一歩、問いまたは行動を持つ。
- [ ] Coco noteが単なる画像・名前ではなく、本と生活をつなぐ役割を持つ。
- [ ] 3booksの各本に見方の変化と今日の一歩がある。
- [ ] About / Profileが現在のbrand strategyと一致する。
- [ ] UI制作意図を説明するcopyが読者向けcopyへ置き換わる。

## Must Check: Visual And Interaction

- [ ] 1200x656 / 1280x720でHomeのbrand、h1、primary CTA全体がviewport内に収まる。
- [ ] Heroのbrand nameがcatch copyに埋もれない。
- [ ] 360 / 390pxで全navigation項目が発見・操作できる。
- [ ] keyboard focus時にmobile menu項目全体が可視になる。
- [ ] 最初のTabでskip linkが表示され、mainへ移動できる。
- [ ] `prefers-reduced-motion: reduce`で装飾的な移動が抑制される。
- [ ] 外部ストアが新規tabで開くことを視覚・accessible nameで理解できる。
- [ ] Gallery filter / view / sortがkeyboardで操作でき、stateがURLとback navigationに残る。
- [ ] Reviews filter / search / pagination stateがURLとback navigationに残る。
- [ ] Reviewsで生活場面から1〜3手以内にreviewへ到達できる。
- [ ] related reviewがreader situation / themeを優先し、単純な最新順だけで決まらない。
- [ ] Home / Reviews / Galleryの説明重複が減り、各sectionが一つの役割を持つ。
- [ ] 404 / empty stateからHomeまたはReviewsへ復帰できる。
- [ ] desktop / mobileで横scrollと主要layout崩れがない。

## Must Check: Media And Performance

- [ ] first viewport imageに次世代formatとviewport別sourceがある。
- [ ] LCP候補assetが代表viewportで概ね300KB以下、または品質上の例外理由が記録される。
- [ ] infographicの文字とココちゃんの表情が変換後も視認できる。
- [ ] Gallery初期HTML / image node数が現状より削減される。
- [ ] Reviews初期DOMが、collection filterから動的導出した全公開reviewを一括表示する場合より削減される。
- [ ] Reviews初期HTMLは圧縮前90KB以下、初期`img`は12件以下、初期画像転送は600KB以下で、hidden全件DOMは0件である。
- [ ] videoにposter、字幕または同等のtranscript導線がある。
- [ ] performance budget checkが追加される。
- [ ] Gallery初期HTMLは圧縮前70KB以下、featured / chapter / list合計の初期`img`は15件以下、初期画像転送は700KB以下である。
- [ ] HomeのLCP候補として選ばれる各viewport用assetは300KB以下、または品質例外が容量とともに記録される。

## Must Check: SEO And Metadata

- [ ] review detailが`Review`と`Book`の関係をJSON-LDで表す。
- [ ] list pageがcanonicalに一致する`CollectionPage` / `ItemList`を持つ。
- [ ] Gallery schemaで本のauthorと画像creatorを混同しない。
- [ ] breadcrumb UIに対応する`BreadcrumbList`がある。
- [ ] `dateModified`が実更新日を反映し、未確認値を捏造しない。
- [ ] page titleがpage roleとbrandを日本語で示す。
- [ ] OGPが横長、軽量、alt / dimensions付きで、ページ差を判別できる。
- [ ] favicon / apple-touch-icon / theme-colorが明示される。
- [ ] RSSが公開reviewを含む。
- [ ] sitemap metadataが実データと整合する。
- [ ] sitemap `lastmod`は明示的な`updatedAt`だけを使い、build時刻やfile mtimeを使わない。
- [ ] unknown URLはHTTP 404のままbrand 404を表示する。

## Must Check: Operations And Safety

- [ ] CMS field / editorial checklistがbrand公開条件を表す。
- [ ] `excerptKind`は定義済みenumだけを許可し、`direct-quote`には`excerptSource`が必須である。
- [ ] 既存contentへ根拠不明の`updatedAt`（git / mtime / build / migration時刻）が自動注入されない。
- [ ] 確認済み`galleryPrompt`はGallery detailの補助的なprovenanceとして開示され、未確認作品には推測値が入らない。
- [ ] 公開review / gallery件数を固定せず、collectionの公開条件から完全性を検証する。
- [ ] internal link / image path / relatedReview / purchase URL integrity checkが通る。
- [ ] `/admin/`の公開判断と検証可能範囲が記録される。
- [ ] GitHub Pages向けdeploy artifactに動作しない`admin/`が含まれない。
- [ ] `cms/decap/config.yml`のYAML構文とcontent pathがbuild dry-runで検証される。
- [ ] GitHub Pagesで設定不能なcache / security headerを実装済みと誤報しない。
- [ ] systemまたは固定依存の`ffmpeg` versionが記録され、local / CIのvideo derivative生成条件を比較できる。
- [ ] ffmpeg version不一致時は固定版へ統一して再生成し、derivative hashの検証結果が記録される。
- [ ] Search Console、外部CDN、CMS loginなどexternal actionの状態をstatusへ分離する。
- [ ] `inbox/gallery/`と`inbox/infographic/`へ変更がない。

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`
- [ ] content / link / accessibility / performance checks

## Manual Checks

- [ ] desktop screenshotsをHome、Reviews、Gallery、review detail、unlinked Gallery detailで確認する。
- [ ] mobile screenshotsをHome、Reviews、Gallery、navigation、404で確認する。
- [ ] keyboard-only navigationを確認する。
- [ ] reduced-motionを確認する。
- [ ] OGP / JSON-LD / RSS / sitemap build outputを確認する。
- [ ] 画像変換前後の品質を確認する。

## Optional Checks

- [ ] Lighthouse / PSIがrate limitなしで利用できる場合に計測する。
- [ ] social debuggerは外部サービスへ公開後に確認する。

## Out Of Scope

- Search Console / Bing Webmaster Toolsの登録操作。
- DNS、CDN、GitHub Pages外ホスティングへの本番切替。
- CMSのcredentialを使うlogin / publish操作。
- 要件未確定のPWA / offline cache。
