# Review Addition Checklist

レビューを新規追加する際の最小確認項目。

## 1. 書誌情報

- [ ] title / bookTitle / author が正確か
- [ ] ISBN での検索結果と一致するか

## 2. Frontmatter 必須項目

- [ ] `title`, `bookTitle`, `author`, `date`
- [ ] `cover`, `infographic` の画像パスが存在するか
- [ ] `tags` が設定されているか
- [ ] `description`, `excerpt` に下書きでない本文が入っているか

## 3. purchaseLinks

- [ ] Amazon 検索リンクあり（`amazon.co.jp/s?k=...`）
- [ ] 楽天リンクあり（あれば）

## 4. 品質 Gate

- [ ] `npm run verify:frontend` が通ること

## 5. 表示確認

- [ ] `npm run dev` で該当レビューページが正しく表示されるか
- [ ] 画像・リンクが機能しているか
