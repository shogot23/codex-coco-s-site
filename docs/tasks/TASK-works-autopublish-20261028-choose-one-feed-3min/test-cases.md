# Test Cases

## Task

- task-id: TASK-works-autopublish-20261028-choose-one-feed-3min
- related plan: `plan.md`

## Must Check

- [x] 指定の7ファイルが3つの納品manifest/元jobとbyte・SHA一致し、source JSONは `published:false`。
- [x] slug `choose-one-feed-3min`、本名『列』、公開済みrelated review `retsu`、taxonomyが一致し、衝突がない。
- [x] dry-run/importが成功し、private previewに詳細・一覧・画像・3手順・review導線が一致して表示される。
- [x] `npm run works:preview` を127.0.0.1:4327で起動し、desktop/mobileで横overflowやレイアウト崩れがなく、preview全ページがnoindex。確認後にserverを停止する。
- [x] 本人目線4点を確認し、AI調査事情・第三者review目線・新たな読書経験を公開文に含めない。研究限界と短縮版未検証を保つ。
- [x] preview後に今回のworkだけ `published:true`。slug、手順、画像、出典、review導線を保持する。
- [x] 変更ファイルが宣言scope内で、元main・inbox・history・正本は不変。親が独立確認する。

## Command Checks

- [x] 手動件数テストの期待値だけを今回1件分、最小更新する。
- [x] `npm run test:works` — 35/35 passed。
- [x] `npm run verify:frontend` — lint/typecheck/build成功、E2E 121 passed・7 skipped。
- [x] `npm run check:works-dist` — passed; draft exclusion passed。

## Manual Checks

- [x] preview desktop/mobileの一覧・詳細を実画面で確認する。
- [x] 本番の一覧/detail/review相互リンク/OG共有画像/HTML参照画像をcache-bypassで確認し、480/1080派生のHTTP・SHAを記録する。詳細は `site-phase/production/http/report.json`。
- [x] PR state、changed files、CI、mergeable、Pagesがmerge SHAで成功したことを確認する。
- [x] Chromeで本番一覧・詳細・レビューを確認し、本文と双方向リンクを目視/AXで確認する。

## Optional Checks

- [x] 本番画像をブラウザとHTTPで確認し、実体SHAを記録する。

## Out Of Scope

- X/Instagramへの投稿、未公開品の遡及公開、画像生成/再生成、既存レビュー/既存ワークの修正。
