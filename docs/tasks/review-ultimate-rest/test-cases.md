# Test Cases — review-ultimate-rest

## TC-1: レビューページ表示
- レビューURL `/reviews/ultimate-rest-for-muscle-training-okada-takashi/` が 200 で表示される → **PASS**
- frontmatter の全フィールドが画面に反映されている → **PASS**

## TC-2: ギャラリー→レビューリンク
- ギャラリーエントリ `/gallery/business-77bd3b/` からレビューへのリンクが動作する → **PASS**

## TC-3: ギャラリーdescription 品質
- 7件の修正対象 description に著者名が含まれていない → **PASS**（`grep 'による' description` 結果: 0件）
- タイトル名が含まれていない → **PASS**
- 各 description が書籍の内容に即している → **PASS**

## TC-4: generated_at 維持
- `business-77bd3b.md` の generated_at が変更されていない → **PASS**（`2026-03-08T08:40:24.550Z` 維持確認）

## TC-5: ビルド成功
- `npm run verify:frontend` がエラーなく完了する → **PASS**（lint OK / typecheck 0 errors / build 114 pages / e2e 29 passed, 1 skipped）

## TC-6: CI checks
- Workers Builds: pass → **PASS**
- frontend-verify (GitHub Actions): pass → **PASS**
