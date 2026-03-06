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
3. `data/gallery-manifest.json` の `title` / `author` / `genre` / `needs_review` を人手で確認し、必要なら補正する
4. `npm run gallery:generate`
5. 既存 md を更新したいときだけ `npm run gallery:generate -- --force` を使う

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

## 運用上の注意

- OCR は公開用データの確定ではなく、候補生成までと考える
- 表紙以外の写り込み、帯、背景、斜め撮影がある画像では OCR が崩れやすいため、人手補正を前提にする
- OCR 精度に自信がない場合は `needs_review: true` を維持する
- `genre` は自動抽出に依存しない
- `genre` 未設定の entry は `/gallery` に出ないため、manifest 確認時または CMS で必ず手動補正する

## Cleanup

- 現在の OCR キャッシュは `.cache/tesseract/` を使う
- リポジトリ直下の `eng.traineddata` / `jpn.traineddata` は旧実行や失敗実行で残る残骸なので、未追跡なら削除してコミットしない
