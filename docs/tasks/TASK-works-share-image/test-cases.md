# Test Cases

## Task

- task-id: TASK-works-share-image
- related plan: `plan.md`

## Must Check

- [x] `/works/` の冒頭に専用画像が表示される。
- [x] ビルドHTMLの `og:image` と `twitter:image` は専用の1200×630px画像の同一絶対URLを指す。
- [x] `og:image:width`、`og:image:height`、`og:image:alt` は実画像の寸法と内容に合う。
- [x] X向けの300px幅の縮小表示でもココちゃんと見出しが読める。
- [x] desktop/mobileの見出しと絞り込み導線が崩れない。
- [x] 個別ワークの画像と公開境界が変わらない。
- [ ] 公開URLから画像を取得できる。

## Command Checks

- [x] `npm run verify:frontend`（89 passed、7 expected skipped）
- [x] `git diff --check`

## Manual Checks

- [x] 画像とページのdesktop/mobileスクリーンショットを目視確認する。
- [ ] 公開HTMLと画像のHTTP応答を確認する。
- [ ] Xのリンクカード表示を確認し、取得不能なら未確認として記録する。
