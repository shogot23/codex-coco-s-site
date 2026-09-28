# Status

## 現在の状態

- サイトコンテンツ: 対象slug `curiosity-sprout-3min` を公開状態で実装済み。
- 制作ゲート: 完了。入力7ファイルのbyte一致、PNG SHA-256・1080×1350、研究・書誌・画像/ OCR確認、history監査、制作Claude各phase `glm-5.3` / valid / gate_ok / blocking 0 を照合。
- サイト取り込み: dry-run成功後にimport。import時は `published:false` を確認。previewのdesktop/mobileで詳細・一覧・画像・手順・研究と安全範囲・関連レビュー導線を確認。
- 検証: `npm run test:works` 28 passed。`npm run test:works-preview` desktop/mobile合計42 passed。`npm run verify:frontend` のlint/typecheck/buildを通過し、全体E2E 93 passed / 7 skipped。`npm run check:works-dist` 通過し、記事と最適化画像2種がbuildに含まれることを確認。
- Claude review: arch/diff とも成立（GLM-5.3、ok:true、blocking 0）。arch advisory（test-cases.mdの検証済みcheckbox不足）は反映済み。diff advisory（PMIDの独立照合）はPubMedで論文名・年・著者・PMIDの一致を確認済み（https://pubmed.ncbi.nlm.nih.gov/35822037/）。最終diff再確認、GitHub / Pages: 実施中。

## 参照したブランド根拠

`docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/brand/reading-with-coco-ai-operations.md`、`docs/reading-with-coco-design-doctrine.md` を参照。公開文面では本由来の問いと日常向け翻案を区別し、短縮版が未検証であること、負担時の中止、診断・治療・重要判断に使わない範囲を明示。画像のココちゃんは本から伸びる新芽を案内する。

## 残件

Claudeのサイト差分レビュー、commit/push/PR/CI/squash merge、Pages公開とcache-bypassの一覧/詳細/相互リンク/共有画像/最適化画像確認。X/Instagram投稿は行わない。

## 日次記録

`inbox/daily/2026-09-28.md` に追記。
