# テストケース

- [x] 書誌（タイトル、著者、購入先）が公式情報と一致する。主婦の友社の書誌情報と提供URLを照合済み。
- [x] レビューfrontmatterがschemaに適合し、`published: true`、`editorialStatus: reviewed`になっている。
- [x] レビュー本文が要約中心にならず、読者のモヤモヤ、見方の変化、具体的な一歩、問いを含む。
- [x] ギャラリーfrontmatterがschemaに適合し、レビューを参照している。
- [x] ギャラリーとレビューの画像パスが実在し、提供画像の寸法・比率を保っている。gallery 1122x1402、review 1080x1350。
- [x] アフィリエイトリンクが既存の購入導線形式で、レビュー本文の価値提供を妨げない。
- [x] `npm run check:content` が成功する。published reviews 40件を監査。
- [x] `npm run lint` が成功する。
- [x] `npm run typecheck` が成功する。0 errors / 0 warnings / 0 hints。
- [x] `npm run build` が成功する。146 pagesを生成し、dist checksも成功。
- [x] `npm run test:e2e` が成功する。51 passed / 7 skipped / 0 failed。
- [x] `npm run verify:frontend` が成功する。51 passed / 7 skipped / 0 failed。
- [x] Claude review gateの `arch` / `diff` が成立し、blocking issueを修正済み。最終diffレビューでblockingなしを確認。
