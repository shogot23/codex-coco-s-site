# Test Cases

## Task

- task-id: TASK-works-hero-refine
- related plan: `plan.md`

## Must Check

- [x] 冒頭見出しを維持し、説明が一文で読める
- [x] 「今の気分から探す」がfinderへ移動する
- [x] finder導入説明と「診断ではありません」の表示を保つ
- [x] 全ワーク表示、no-JS、WORKS_PREVIEW、個別ワークリンクに変更がない
- [x] 公開ワークが0件のときCTAが出ず、JavaScript無効時もfinderへのCTAが出ない
- [x] finderの選択・公開境界コードはHero UIと無結合で、変更差分に含まれない
- [x] scope外の画像ファイルやOGP/X画像が変更されていない

## Command Checks

- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktopの本文可読性、画像内の本・ココちゃん・メモ、CTA
- [x] 720〜920pxの混在区間から880pxを確認し、Heroのcopy・CTAに窮屈さやはみ出しがない
- [x] mobileのcopy→CTA→画像→検索欄の順序とcrop
- [x] CTA後の既存フィルター選択、focus表示、横スクロールの有無
- [x] CTA遷移後、scroll-marginによりfinderの見出しが固定ヘッダーに隠れない
- [x] CTAへのTab到達とfocus ringの視認性（Hero上でも明確に見える）

## Optional Checks

- [x] 領域固有の追加確認: `npm run test:works-preview` (40 passed)

## Out Of Scope

- 今回やらない確認: Xカードキャッシュや本番OGPの検証（meta/画像は変更しない）
