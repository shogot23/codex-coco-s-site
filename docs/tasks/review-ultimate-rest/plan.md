# Plan — review-ultimate-rest

## 意図
「究極の筋トレ休息法」のレビューページ追加と、ギャラリーdescription のブランド方針準拠化。

## 変更対象
1. `public/uploads/review/infographic/ultimate_rest_for_muscle_training_okada_takashi.png` — コピー
2. `src/content/reviews/ultimate-rest-for-muscle-training-okada-takashi.md` — 新規
3. `src/content/gallery/business-77bd3b.md` — relatedReview 追加
4. `src/content/gallery/business-cfc28c.md` — description 修正
5. `src/content/gallery/history-ea859a.md` — description 修正
6. `src/content/gallery/novel-d182d7.md` — description 修正
7. `src/content/gallery/novel-d4b1fc.md` — description 修正
8. `src/content/gallery/novel-edcfbd.md` — description 修正
9. `src/content/gallery/shinsho-6ad8f8.md` — description 修正
10. `src/content/gallery/manga-b761d4.md` — description 修正

## 実装順序
1. インフォグラフィック画像コピー
2. レビューMD作成（Step 2 先行 — relatedReview 参照解決のため）
3. ギャラリーエントリ relatedReview 追加
4. ギャラリーdescription 7件修正
5. `npm run verify:frontend` で検証

## リスク
- relatedReview 参照はレビューファイル存在後に解決される → レビュー作成を先に行う
- generated_at の誤削除に注意

## 検証
- `npm run verify:frontend` パス
- ギャラリーdescription に著者名なし
