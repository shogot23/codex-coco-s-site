# Plan

## Task

- task-id: `TASK-saikyo-no-dairinin-review-2026-08-13`
- related pbi: `docs/tasks/TASK-saikyo-no-dairinin-review-2026-08-13/pbi-input.md`

## Intent

- 何を変えるか: 『最強の代理人』の公開reviewコンテンツとReview用インフォグラフィック、Gallery用作品画像とgalleryコンテンツを追加する。
- なぜ今やるか: ユーザーが完成レビューともしもリンクのReviews反映に加え、既存形式に合わせたGallery反映も依頼したため。

## Scope Declaration

- 変更対象ファイル: `src/content/reviews/saikyo-no-dairinin.md`、`src/content/gallery/nonfiction-saikyo-no-dairinin.md`、`public/uploads/review/infographic/saikyo_no_dairinin_ryugo_masaya.png`、`public/uploads/gallery/books/Saikyo_no_Dairinin_Ryugo_Masaya.png`、`public/media/manifest.json`、`src/pages/gallery.astro`のSSR初期選定、`tests/e2e/site-smoke.spec.ts`のReviews詳細遷移1箇所、`tests/e2e/reviews-readability.spec.ts`のレイアウト計測待機、本タスク記録。
- 変更しないもの: ページテンプレート、content schema、既存レビュー・Gallery作品、既存の購入導線設計。

## Frontend Thesis

- visual thesis: Reviewでは既存Review Detailの静かな誌面とインフォグラフィックを組み合わせ、Galleryでは夕景の書斎で本を抱えるココちゃんの専用画像を使う。用途の異なる2画像を混同しない。
- content plan: 読者の支援にまつわるモヤモヤから入り、契約・環境整備・本人の決断・日本サッカーの土壌へ射程を広げ、最後に今日の一歩を残す。
- interaction thesis: Review本文とLife Repair Notesを主導線、Galleryを読後の副導線、外部ストアを第三優先とし、ReviewとGalleryを既存`relatedReview`で相互接続する。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

単一コンテンツ追加で共有成果物への統合が中心のため、単独で進める。

## Implementation Steps

1. `inbox/infographic/20260813-173724-最強の代理人-龍後昌弥.png`をReview用`public/uploads/review/infographic/saikyo_no_dairinin_ryugo_masaya.png`へ、`inbox/gallery/12951457-47A6-4C20-8804-B0372006C1BD.png`をGallery用`public/uploads/gallery/books/Saikyo_no_Dairinin_Ryugo_Masaya.png`へコピーする。
2. review frontmatterへ`title`、`bookTitle`、`author`、`description`、`excerpt`、`readingCompass`、`date`、`cover`、`infographic`、`tags`、`recommendedFor`、`purchaseLinks`、`excerptKind`、`readerWorry`、`bookQuestion`、`perspectiveShift`、`smallStep`、`cocoNote`、`lingeringQuestion`、`editorialStatus`、`published`を設定し、レビュー本文を追加する。`excerptKind: site-takeaway`のため、引用時のみ必須の`excerptSource`は設定しない。これらが`src/content/config.ts`のreviews schemaおよび`scripts/migrate-review-editorial-fields.mjs`の必須編集フィールドと一致することを確認済み。
3. gallery frontmatterへ`title`、`image`、`genre`、`author`、`description`、`note`、`generated_at`、`source_file`、`relatedReview`、`visualOrigin`、`galleryEditorialStatus`、`published`を設定する。全項目が`src/content/config.ts`のgallery schemaに存在することを確認済み。購入リンクは関連Reviewから既存テンプレートが引き継ぐ。
4. 全件モデルの各章先頭slugをSSR初期集合へ先に確保し、残りを全体の既存ソート順で8件まで埋め、最後に全体順で並べる。これにより上部の全章リンクとSSR本文の章anchorを一致させる。
5. `site-smoke.spec.ts`のReviews初期棚から詳細へ進むテストは、古い特定作品名ではなく`#review-stream [data-review-list] .review-item h3 a`の先頭を対象にする。Featuredは`#review-stream`外なので混同しない。リンクの表示を確認してクリックし、Playwrightの`toHaveURL(/\/codex-coco-s-site\/reviews\/[^/]+\/$/)`で遷移完了を待ってから`#review-title`の表示を確認する。これにより一覧から詳細へ進む機能契約を維持し、コンテンツ追加・削除に伴う特定作品名依存だけを除く。
6. `reviews-readability.spec.ts`のレイアウト計測は、resetによる一覧DOM差し替え中に切断済み要素を単発`evaluate`しないよう、既存の全レイアウトassertionをPlaywrightの再試行可能な`expect(...).toPass()`内で行う。表示契約や期待値は変えない。
7. 一覧・両詳細・相互導線・購入リンク・用途別画像・全章anchorを実表示で確認し、statusを更新する。

## Risks And Guards

- 想定リスク: URLの二重エスケープ、書籍内容を支援論だけへ狭めること、購入導線がレビューより目立つこと、Galleryへのインフォグラフィック流用、SSR初期集合から一章が欠けること、reset直後のE2E計測競合、未追跡ファイルへの干渉。
- 回避策: `href`のみ既存schemaへ正規化し、契約交渉・情報戦・環境整備・日本サッカー全体の視点を本文に残す。Review用とGallery用の入力・出力を明示して別管理する。Gallery初期表示数8と全体ソート順を保ったまま、各章代表を確保する。DOM差し替え競合だけを再試行し、期待するレイアウト値は緩めない。入力元を含むユーザー所有の未追跡ファイルを保持する。
- scope 外に見つけた事項の扱い: 本タスクでは変更せず、必要なら別タスクとして記録する。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run check:content`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: `tests/e2e/reviews-readability.spec.ts`の`toHaveCount(4)`と`toHaveCount(8)`は初期表示4件と「さらに読む」後の表示8件の契約であり、総件数固定ではないことを確認済み。reset競合の修正後は対象desktopケースを`--repeat-each=5`で連続確認する。`src/pages/reviews/[slug].astro`と`src/pages/gallery/[slug].astro`の既存外部リンクはいずれも`target="_blank"`と`rel="noopener noreferrer nofollow"`を出力することを確認済み。生成HTML内のタイトル・本文・用途別画像・相互リンク・正規化URL・同属性、全章リンクとanchor、desktop/mobileの実画面、Claude review gateを確認する。初回buildは本体生成成功後、`gallery/index.html: missing anchor #chapter-horizon`でpostbuildのみ失敗したため、この再発がないことを確認する。初回E2Eは49 pass / 7 intentional skip / 2 timeoutで、timeoutは旧作品名固定locatorのみだった。PR前再検証の対象desktopケースは5回中3回、切断済み要素の`display: ""`で失敗した。

## Approval

- approver: task ownerによるReviews反映の明示依頼。reviewerはClaude Review Gate。
- status: approved
- note: 依頼済みレビュー本文、Review用インフォグラフィック、Gallery用専用画像を既存構造へ最小差分で反映するscope・検証方針として自己承認。2026-08-13の追加要件を反映済み。
