# Test Cases

## Task

- task-id: TASK-works-autopublish-20261111-before-reply-30-second-check
- related plan: `plan.md`

## Must Check

- [x] 原本7ファイルのSHA-256が引継ぎ値と一致し、site-workのslug/title/bookTitle/review ID/image filenameが仕様と一致する。
- [x] 関連レビューが公開済みで、bookTitleが「世界はなぜ地獄になるのか」と完全一致する。
- [x] 既存slug/画像に衝突がなく、import dry-runと通常importが成功する。通常import直後は`published:false`。
- [x] 画像が1080×1350で、PNGを原本とbyte/SHA比較できる。本文の3手順が画像/固定仕様と一致する。
- [x] 下書きの詳細Previewでnoindex、本への往復導線、画像、手順、出典、実験条件と短縮版未検証の表示、中止・相談・終了選択が確認できる。
- [x] PCとモバイルのviewportで画面を実見し、文字切れ・画像崩れ・横overflowがない。
- [x] 4点コピー確認が通り、限定フレーズ検査にかからない。
- [x] 前回失敗した固定件数テストの名前と期待値だけが30から31に変わり、`src/content/works/`のMarkdown件数31を検査する。他のtest/import/CI実装は変更しない。
- [x] `npm run test:works`が通る。失敗時は対象記事を`published:false`のままにし、後続ゲートへ進まない。
- [x] `published:true` は対象Markdownのみ。公開状態の既存記事やslugには変更がない。verify:frontendまたはcheck:works-distが失敗した場合は対象を`published:false`へ戻し、PR前に停止する。
- [x] test:works、verify:frontend、check:works-dist、最終Claudeレビューが通る。失敗時は次ゲートへ進まない。
- [ ] squash merge・Pages完了後、cache-bypassで一覧/詳細/レビュー相互リンク/OG/HTML参照画像が表示され、実験条件と短縮版未検証の表示が残り、ローカルdistと公開画像のbytes/SHAが一致する。
- [ ] 本番確認で不一致・取得失敗があれば成功扱いせず、証跡を保全して親へ報告し、同一成果物の修正またはrevert判断を待って停止する。

## Command Checks

- [x] `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-11_2223_before-reply-30-second-check/site-work.json --dry-run`
- [x] `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-11_2223_before-reply-30-second-check/site-work.json`
- [x] `npm run test:works`
- [x] `npm run verify:frontend`
- [x] `npm run check:works-dist`

## Manual Checks

- [ ] 詳細ページをdesktop viewportで確認する。
- [ ] 詳細ページをmobile viewportへ切り替えて確認する。
- [ ] 返信を急ぐ悩み → 本からの問い → 見方の余地 → メモ/閉じる/休む/相談/終了の流れを確認する。
- [ ] 公開後の本番一覧、詳細、レビューへの往復リンク、OG画像、HTMLが参照する480/1080画像を確認する。

## Optional Checks

- [ ] 追加確認: `sips -g pixelWidth -g pixelHeight`, `shasum -a 256`, `cmp`, `curl`でのcache-bypass取得。

## Out Of Scope

- 画像の再生成・編集、指定の固定件数テスト以外の修正、CI runnerやimport実装の変更、X/Instagram投稿、他ワークの公開。
