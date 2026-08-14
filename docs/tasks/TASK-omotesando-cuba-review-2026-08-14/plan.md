# Plan

## Intent And Scope Declaration

- task-id: `TASK-omotesando-cuba-review-2026-08-14`
- 変更対象: `src/content/reviews/omotesando-no-serebu-ken-to-kabanya-yosai-no-nora-inu.md`、`src/content/gallery/business-5c43f5.md`、Review/Gallery用画像2点、`public/media/manifest.json`、本タスク記録。
- 変更しないもの: Astro page/component、content schema、既存gallery slug、他review/gallery、mainの未追跡ファイル、別セッションの成果物。

## Frontend Thesis

- visual thesis: Reviewでは東京とキューバを往復しながら「自分を縛る物差し」を読み解くインフォグラフィックを置き、Galleryではキューバの街、本、ココちゃんが一つの静かな旅の景色になる添付画像を見せる。
- content plan: 評価や遅れへの焦りから入り、競争と自己肯定の関係、犬の対比、父への思いをネタバレを抑えてたどり、疲れを生んだルールを一行書く行動へつなぐ。
- interaction thesis: Review本文とLife Repair Notesを主導線、Galleryを余韻の副導線、購入リンクを第三優先とする。既存Galleryの`relatedReview`へ新規review slugを設定し、Review詳細がこの参照を逆引きする既存実装によって双方向導線を作る。

## Delegation And Implementation

- サブエージェント: Aがcontent schemaとテスト影響、Bが2画像の仕様と公開パス、Cがworktree/PR/別セッション衝突をread-only調査。
- 親エージェント: 計画、実装、統合、検証、Claude review、Sol最終確認、PR/mergeを担当。

1. PlanGateをClaudeでレビューし、blocking 0を確認して承認状態へ更新する。
2. Review用インフォグラフィックを新規公開パスへコピーし、既存Gallery画像を添付の同一構図・高解像度版へ差し替える。
3. ブランド準拠のreview Markdownを追加する。既存gallery Markdownは書名・著者名を重ねない説明、余韻メモ、`relatedReview`、編集状態だけを更新し、既存`generated_at`とlegacy slugを維持する。
4. ユーザー指定の楽天hrefを通常の`&`へ正規化し、checklistに沿うAmazon検索リンクとともにreview frontmatterへ定義する。schemaにない1px計測画像は追加しない。
5. stale OCR metadataによる上書きを避けるため`gallery:sync` / `gallery:generate`は実行しない。`npm run media:generate`後、lint、content audit、typecheck、build、E2E、`verify:frontend`を実行する。
6. Claude Review Gateを`ok: true`まで収束させ、Solが差分、生成HTML、画像、リンク属性、desktop/mobile、Git状態を独立確認する。
7. 最新`origin/main`と他セッションを再監査し、必要なら追従・manifest再生成・full verify後、commit、PR、checks、squash merge、cleanupを行う。

## Risks And Guards

- リスク: 画像用途の取り違え、単行本と文庫版の混同、キューバの理想郷化、父に関するネタバレ、affiliate URLの二重escape、共有manifest競合、stale OCR metadataによる既存Galleryの上書き。
- ガード: 画像を用途別パスへ置き、文庫版追加章を明示する。資本主義対社会主義の単純二択を避け、父の具体的な仕掛けを伏せる。hrefだけを正規化し、`gallery:sync`を避け、PR直前にmanifestを再生成する。
- scope外事項: 別タスクとして記録し、本変更へ混ぜない。

## Verification

- コマンド: `npm run lint`、`npm run check:content`、`npm run typecheck`、`npm run build`、`npm run test:e2e`、`npm run verify:frontend`
- desktop/mobileでReviewとGalleryの画像、本文、相互導線、購入リンク属性、横スクロールを目視確認する。

## Approval

- approver: Sol（ユーザーの一気通貫実行指示に基づくowner自己承認。reviewerはClaude Review Gate。blocking 0確認後にapprovedへ更新）
- status: approved
