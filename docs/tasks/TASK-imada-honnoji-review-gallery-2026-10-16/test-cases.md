# Test Cases

## Task

- task-id: TASK-imada-honnoji-review-gallery-2026-10-16
- related plan: `plan.md`

## Must Check

- [x] ReviewとGalleryがpublishedとしてビルドされ、各詳細ページに表示される。
- [x] ReviewからGallery、GalleryからReviewへの関連導線が成立する。
- [x] 楽天購入リンクが両ページに既存表示仕様で出る。
- [x] gallery画像が1092×1440、infographicが1080×1350のユーザー提供原本とSHA-256一致で保存される。
- [x] media manifestに両画像の元画像dimensions/hashとAVIF/WebP派生先が記録される。
- [x] レビューが父親目線・0歳児の一場面から始まり、あらすじ、授乳、ココちゃん紹介、三成、無関係な仕事例を含まない。
- [x] 本の構成から日常への問いと選べる一歩がつながり、編集上の提案を著者の方法と誤認させない。
- [x] `npm run lint` / `npm run check:content` / `npm run typecheck` / `npm run build` / `npm run test:e2e` / `npm run verify:frontend` が成功する。
- [x] Claude reviewの最終構造化出力が `ok:true`、`issues:[]` である。
- [ ] PR state/open、draft false、mergeable、changed files想定内、required checks greenの後にsquash mergeされる。
- [ ] merge後のPagesでReview、Gallery、JSON/manifest参照、AVIF/WebPを確認できる。

## Manual Content Checks

- [x] 冒頭の赤ちゃんの泣き声と後半の「まだ分からない」が因果でつながる。
- [x] 読者を責めず、助けを借りる・休む・答えを保留する余地がある。
- [x] アフィリエイトを外しても本文だけで問いと行動が残る。
