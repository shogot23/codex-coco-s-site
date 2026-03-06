# Gallery Auto Generation

`gallery` 自動生成の対象は `public/uploads/gallery/books/` 配下の画像だけです。

## 対象

- `public/uploads/gallery/books/**/*.{png,jpg,jpeg,webp}`

## 対象外

- `public/uploads/` 直下の既存画像
- `public/uploads/profile/**`
- `public/uploads/summary/**`
- 上記以外の `public/uploads/**`

## 実行手順

1. gallery 対象画像だけを `public/uploads/gallery/books/` に置く
2. `npm run gallery:ocr`
3. `data/gallery-manifest.json` を確認する
4. `npm run gallery:generate`

## スキップ方針

- 対象外画像は走査しない
- 対象ディレクトリ内の未対応拡張子はログ出力してスキップする
- 既存の gallery md は上書きせずスキップする
- 上書きしたい場合だけ `npm run gallery:generate -- --force` を使う

## needs_review

- OCR 全体の confidence が 0.80 未満
- タイトル抽出に失敗した
- タイトル confidence が 0.80 未満
- 抽出できた著者 confidence が 0.80 未満
