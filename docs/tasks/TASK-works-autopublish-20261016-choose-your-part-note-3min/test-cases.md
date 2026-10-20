# Test Cases

## Task

- task-id: TASK-works-autopublish-20261016-choose-your-part-note-3min
- related plan: `plan.md`

## Must Check

- [ ] 納品7ファイルのSHAが指定値と一致し、制作元ファイルは不変。
- [ ] `relatedReview: stoic-mindset`と`bookTitle`が公開レビューのtitleに一致し、moods/concernsはtaxonomyに存在する。
- [ ] 同slugの本文・画像がなく、dry-run成功後に限り1件をimportする。
- [ ] 下書きpreviewでPC/mobileの一覧・詳細・画像・3手順・問い・出典・安全注記・本への導線を確認する。
- [ ] 読者向け文が本人目線で、AI調査事情や第三者レビュー表現を含まず、本人経験を新しく作らない。
- [ ] 引用と日常向け翻案を区別し、研究の対象・支援量・限界と短縮版未検証を表示する。
- [ ] 対象の公開状態だけを変え、差分にscope外の変更がない。
- [ ] 公開後のHTML・共有画像・HTML参照画像が正しい。PC/mobileで一覧・詳細・レビュー相互リンクを確認する。

## Command Checks

- [ ] `scripts/work-import.test.mjs`の`all 23 current work Markdown files pass the narrow reader-copy guard`が、追加後の23件すべてに既存guardを適用する。初回`npm run test:works`は34/35成功し、この件数assertだけが期待22・実数23で失敗したため、テスト名と固定件数だけを22から23へ同期する。guard本体・個別検査は緩めない。
- [ ] `npm run test:works`
- [ ] `npm run verify:frontend`
- [ ] `npm run check:works-dist`
- [ ] PR exact HEADのCI通過を確認する。

## Manual Checks

- [ ] 画像を目視し、参照書名・番号1/2/3・手順文・ココちゃんの表示を確認する。
- [ ] localhost:4327のpreviewでPC/mobile viewportを切り替え、画像・文章・リンク・noindexを確認する。
- [ ] Pages公開URLをcache-bust付きで取得し、HTMLにnoindexがなく、HTML参照WebP/AVIFをHTTPと画面で確認する。

## Out Of Scope

- 制作画像・原稿の修正や再生成、過去納品の遡及公開、X/Instagram投稿、他のワーク変更。
