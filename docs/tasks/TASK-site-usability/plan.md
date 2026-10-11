# Plan
- task-id: TASK-site-usability
- Classification: publish/dev-critical

## Intent
1. 最新特集も含めた全公開レビューを検索対象とする。
2. スマホheroを短くし、ココちゃん・ブランド・主CTAを初期画面に置く。
3. トップの重複案内を削り直後に具体的な一冊。レビュー本文前の重複枠を統合する。
4. 読者向けUIの設計用語やFINAL CTA等を整理する。
5. レビュー検索の前に少数の気がかり入口を置く。既存work-taxonomyの語彙を使い、検索語を明示したリンクとする。テーマ検索、URL状態、戻る、キーボードを保つ。
6. 最初の3冊を内容が分かるリンク名にし、レビュー入口付近に配置。
7. desktop heroの脇画像を重ならない構図で見せる。
8. galleryの重複説明を削り、ページ内表示切替と全作品一覧への移動を区別する。

## Design
- visual thesis: 暖かな紙の上で、本とココちゃんが近くにいる表紙。既存トークンと画像を使用。
- content plan: 表紙 → 具体的な一冊 → 暮らしで試せるワーク → 景色 → サイトの背景。
- interaction thesis: 主CTAはレビュー。探す・表示を変える・別ページへ移るを明確にする。既存の短いhoverと状態変化を維持し、装飾的motionを増やさない。

## Scope Declaration
- src/pages/index.astro
- src/pages/reviews.astro
- src/components/reviews/ReviewExplorer.astro
- src/pages/reviews/[slug].astro
- src/pages/gallery.astro
- src/components/gallery/GalleryBrowse.astro
- tests/e2e/site-smoke.spec.ts
- tests/e2e/reviews-readability.spec.ts
- tests/e2e/gallery-ui.spec.ts
- docs/tasks/TASK-site-usability/{pbi-input,plan,test-cases,status,daily-2026-10-11}.md

## Sequence and verification
- 計画レビュー → 実装 → lint → typecheck → build → test:e2e → verify:frontend → Claude最終レビュー。
- desktop 1440x900 / 1200x656、mobile 390x844 / 360x800。画像とCTAの可視領域、非重複、横溢れ、検索と戻るを確認。
- 最新作の書名・著者検索、気がかり入口と解除、既存gallery切替・archive導線、本文到達、3冊のリンクを確認。
- 変更規模に応じClaude arch / grouped diff / cross-check。blockingなしまで修正。
- 公開内容の追加、本文の主張変更、元main変更の取り込み、無関係な整形は禁止。

## Approval
- approver: Codex (ownerから8項目すべての対応指示)、reviewer: Claude CLI glm-5.3
- status: approved (glm-5.3 arch ok:true、blocking 0。schema修正2回後の成功1回・正常終了を検証)

## Review refinements
- 語彙は src/data/work-taxonomy.json をimportしmoodsのlabelを参照。検索語は各リンクにも明記する。
- 指定4viewportすべてで横溢れと初期画面を確認。主CTAとココちゃん画像の上下端がviewport内、desktop画像矩形の交差が0であることをassertする。

- 公開レビュー取得は既存getPublishedReviewsに委任し、draftを除外。取得した全件（現時点45件）を検索対象へ渡す。
