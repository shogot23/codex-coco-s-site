# Plan

## Task

- task-id: `TASK-reviews-readability`
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: Heroから本棚までの重複を減らし、レビュー一覧の幅制約、クライアント再描画後にも適用されるスタイル、項目内の情報階層、PC・スマホ固有の配置を修正する。
- なぜ今やるか: 本番画面で、PCは一覧スタイルが消え、スマホはコンテンツが画面外へ切れる再現性のある不具合を確認した。さらに本棚へ届く前の情報重複が、ページの目的を見えにくくしているため。

## Experience Thesis

- visual thesis: 温かな紙の棚に、表紙と「今の自分へ持ち帰れる言葉」が一冊ずつ静かに並ぶ構図にする。
- content plan: 短いHero → ココちゃんと本が見える最新レビュー → 検索と短いテーマ入口 → 本棚 → Galleryの余韻。Hero右パネル、3分類のCompass、作品非依存のToday Step、一覧内の情報全件併記は外す。
- interaction thesis: 検索・テーマ絞り込み・条件解除・追加表示の状態変化を即座に理解でき、明確なレビューリンクで次の読書へ入れるようにする。動きは短い色・影・移動に限定する。

## Scope Declaration

- 変更対象ファイル: `src/pages/reviews.astro`、`src/components/reviews/ReviewExplorer.astro`、`tests/e2e/reviews-readability.spec.ts`、`tests/e2e/site-smoke.spec.ts`内のReviews遷移後assertion、本タスク記録。
- 変更しないもの: レビュー本文、他ページ、共通デザイントークン、CMS、依存関係、デプロイ設定。

## Brand Compatibility Check

- `docs/brand/reading-with-coco-brand-strategy.md`とcontent guidelinesは、Hero右パネル、Compass、固定Today Stepを必須としていない。必須なのは、生活のモヤモヤを入口にして、問い・見方の変化・小さな行動を持ち帰れること。
- `DESIGN.md`のReviews要件は「読書の余韻・学び」「書籍情報とレビュー本文の分離」「購入リンクを静かに置く」。購入を詳細ページへ委ね、一覧を購入前提にしない整理は整合する。
- `docs/reading-with-coco-design-doctrine.md`の主CTAはReviews、副CTAはGallery。最新レビューの主CTA、本棚の各レビューCTA、最後のGallery導線を残して優先度を維持する。
- 削除後も、最新レビューに作品固有の残る言葉とsmallStep、本棚にreaderWorry、詳細へのCTAを残す。固定の一般論を減らし、各作品に紐づく問い・行動を優先する。
- ココちゃんは最新レビューの実画像と最後のGallery導線に残し、本から生まれた景色の案内役として扱う。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

表示幅と動的DOMのスタイルは同じ一覧UIで密接に依存するため、単独で進める。

## Implementation Steps

1. 原因確認: 本番の動的`.review-item`にはAstro scope属性がなく、`display:list-item`、`.review-copy`は`display:block`であることを確認済み。ReviewExplorer配下へ限定したglobal selectorを採用する。
2. Heroを短くし、Hero右パネルとCompassを外して、最新レビューと本棚をページ前半へ移す。`#review-stream`開始位置の目標はPCで`2 * innerHeight`以内、スマホで`3 * innerHeight`以内とする。
3. 最新レビューは画像・書名・著者・作品固有の残る言葉・smallStep・主CTAに絞り、購入導線は詳細ページへ委ねる。
4. `reviews.astro`側では`.reviews-story`を`minmax(0, 1fr)`の1列グリッドにし、直下セクションへ`min-width:0`を適用して360px / 390pxでページ全体の欠落をなくす。
5. `ReviewExplorer.astro`側ではroot・検索フォーム・label・入力・一覧・項目・本文へ`min-width:0`を適用する。PCは番号＋書影＋本文、スマホは番号を外した書影＋本文の2列にする。
6. 長文のモヤモヤselectを短いタグ選択へ置き換え、項目は書影・書名・著者・読む理由・CTAへ絞る。
7. 専用E2EとPlaywright実画面確認を行う。既存smokeで旧Reviews見出し・Compass・Hero右パネルを固定しているassertionは、新Hero・Featured・本棚・画像の意味を確認するassertionへ更新する。
8. full frontend verifyとClaude review gateを完了する。

## Risks And Guards

- 想定リスク: 情報削減でブランド価値まで弱める、クライアント再描画だけ直してSSR表示を壊す、長い日本語テキストで再び横幅が膨らむ、一覧をカード過多にする。
- 回避策: 最新レビューのココちゃん画像と残る言葉、各項目の読む理由、最後のGallery導線を残す。SSR / JS有効の両方を検査し、`minmax(0, 1fr)`と`min-width: 0`を境界ごとに置く。項目は余白と区切り線で構成する。
- scope 外に見つけた事項の扱い: 本タスクでは変更せず、終了報告に残す。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: Playwrightで1440x1000、390x844、360x800を確認。横スクロール、Heroから本棚までの距離、項目幅、検索、テーマ、リセット、追加表示、キーボードフォーカスを検査する。

## Approval

- approver: task owner request to proceed with orchestrated development; reviewer: Claude Review Gate
- status: approved
- note: 現在の依頼を、上記scopeの表示不具合修正とページ内情報構成整理へのowner承認として扱う。コード着手前に計画差分をClaudeで確認する。
