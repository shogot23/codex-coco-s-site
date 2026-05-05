# Test Cases — review-ultimate-rest

## TC-1: レビューページ表示
- レビューURL `/reviews/ultimate-rest-for-muscle-training-okada-takashi/` が 200 で表示される
- frontmatter の全フィールドが画面に反映されている

## TC-2: ギャラリー→レビューリンク
- ギャラリーエントリ `/gallery/business-77bd3b/` からレビューへのリンクが動作する

## TC-3: ギャラリーdescription 品質
- 7件の修正対象 description に著者名が含まれていない
- タイトル名が含まれていない
- 各 description が書籍の内容に即している

## TC-4: generated_at 維持
- `business-77bd3b.md` の generated_at が変更されていない

## TC-5: ビルド成功
- `npm run verify:frontend` がエラーなく完了する
