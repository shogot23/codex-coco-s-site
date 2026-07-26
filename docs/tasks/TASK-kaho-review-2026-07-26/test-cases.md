# Test Cases

## Task

- task-id: TASK-kaho-review-2026-07-26
- related plan: `plan.md`

## Must Check

- [x] 『夏帆─The Tale of KAHO─』のレビュー entry が公開対象として表示される
- [x] レビュー本文に読者のモヤモヤ、見方の変化、今日の一歩、問いが含まれる
- [x] インフォグラフィックとギャラリー画像が正しいパスで表示される
- [x] レビューから関連ギャラリー詳細へ遷移できる
- [x] ギャラリー詳細からレビュー詳細へ遷移できる
- [x] `relatedReview` と review slug が一致している
- [x] レビューの購入リンクが提供された楽天アフィリエイトURLへ遷移する
- [x] 計測用1px画像や不要なアフィリエイトHTMLが追加されていない
- [x] PBI の Goal（問いか行動を残す）が本文とレビュー/ギャラリー導線に反映される
- [x] scope 外の変更が入っていない
- [x] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] レビュー詳細を desktop で目視確認する
- [x] レビュー詳細を mobile で目視確認する
- [x] 関連リンク / 導線 / 文言を確認する
- [x] `sips` で公開画像の寸法を確認する
- [x] Claude review gate の blocking issue がないことを確認する

## Optional Checks

- [x] 画像の alt、タイトル、著者、公開日、タグが内容と一致する
- [x] 重大な筋展開を不必要に明かしていない

## Out Of Scope

- 今回やらない確認: 提供された購入URLの遷移先・在庫・商品同一性の外部確認、既存ページのレイアウト改修
