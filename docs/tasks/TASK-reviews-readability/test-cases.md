# Test Cases

## Task

- task-id: `TASK-reviews-readability`
- related plan: `plan.md`

## Must Check

- [x] PCでレビュー一覧が書影・本文・CTAの整った横組みになる
- [x] 360px / 390pxでページ幅とカード内容がviewport内に収まる
- [x] Hero、最新レビュー、本棚の順に重複なく進み、本棚がPCで2スクロール程度、スマホで3画面程度までに始まる
- [x] クライアント初期描画後も一覧スタイルが維持される
- [x] JavaScript無効時の初期4件も同じ情報階層で読める
- [x] scope 外の変更が入っていない
- [x] Reviews主導線とGallery副導線の優先度が崩れていない
- [x] 最新レビューと各一覧項目に、作品固有の問い・行動または読む理由が残る
- [x] 見出し階層がh1 → h2 → h3の順で論理的に保たれる
- [x] axeでserious / critical違反がない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`
- [x] Reviewsへ遷移する既存site smokeが、新しいh1・Featured・本棚構造を検証して通る

## Manual Checks

- [x] 1440x1000で一覧が不自然な片寄りや大きな空白を作らない
- [x] 390x844と360x800で本文やボタンが切れない
- [x] 検索、テーマ選択、条件解除、追加表示が動く
- [x] Tab操作で検索UIとレビューリンクへ到達できる
- [x] 長い書名・読む理由が自然に折り返す

## Optional Checks

- [ ] `prefers-reduced-motion`で不要な動きが抑制される

## Out Of Scope

- 今回やらない確認: 全レビュー本文の編集品質、Galleryや動画ページの再設計、外部購入先の内容確認。
