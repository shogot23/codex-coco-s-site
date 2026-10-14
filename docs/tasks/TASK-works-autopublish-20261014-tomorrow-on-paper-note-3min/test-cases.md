# Test Cases

## Task

- task-id: TASK-works-autopublish-20261014-tomorrow-on-paper-note-3min
- related plan: `plan.md`

## Must Check

- [x] 納品7原本とPNGのSHA-256が指定値に一致する。PNGは1080×1350。
- [x] slug、画像名、公開済みレビューID、bookTitleが契約どおりで、衝突がない。
- [x] dry-runと通常importが成功し、import直後は`published:false`。
- [x] 既存一覧と詳細で画像・手順・本への導線・レビュー相互リンク・研究限界・安全な終了選択を確認する。
- [x] 公開対象はこの1件だけで、生成distは下書きを除外する。
- [x] reader-copy guardは既存の検査条件を維持する。新規Markdown1件追加に伴い`test:works`が固定件数21→22だけで失敗したため、テスト名と期待件数を22へ更新し、他のテスト条件は変えていない。
- [x] scope外の差分が入っていない。

## Command Checks

- [x] `npm run test:works`
- [x] `npm run verify:frontend`
- [x] `npm run check:works-dist`

## Manual Checks

- [x] `WORKS_PREVIEW=1`のlocalhost:4327でPCとモバイルの一覧・詳細を確認する。
- [x] ビルドdistのHTML、画像参照、レビュー・本へのリンクを確認する。
- [ ] GitHub PRのchanged files、merge可能状態、CI成功を確認する。
- [ ] Pages公開後、一覧・詳細・関連レビューへの相互リンク・共有画像・HTML参照画像をHTTPで確認し、PCとモバイルでも表示する。

## Optional Checks

- [x] build outputの480/1080 WebPの寸法、SHA-256、byteを記録した。HTTP statusはPages公開後に確認する。

## Out Of Scope

- X・Instagramへの実投稿、過去納品の公開、制作原本の修正、無関係なfrontend変更。
