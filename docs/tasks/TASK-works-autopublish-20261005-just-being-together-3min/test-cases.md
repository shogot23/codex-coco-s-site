# Test cases: 「3分のただ一緒にいる時間」サイト公開

## Task

- task-id: TASK-works-autopublish-20261005-just-being-together-3min
- related plan: plan.md

## Must Check

- [x] 受領パッケージは指定7ファイルだけで、全SHA-256/byte数が作業指示と一致する。画像は1080×1350 PNG。
- [x] `site-work.json`は受領時点でbyte一致し`published:false`。slug・書名・Review ID・画像名が依頼と一致する。
- [x] mood/concern IDはtaxonomy内にあり重複なし。参照Reviewは公開済みでtitleがbookTitleと完全一致する。
- [x] 制作auditと必須Claude phaseは全件valid、実モデルglm-5.3、blocking 0。制作jobと納品物を変更しない。
- [x] 制作時の必須phase名を確認した: `preflight`, `pre-image-arch`, `pre-image-diff-g1`, `pre-image-diff-g2`, `pre-image-diff-g3`, `pre-image-cross`, `post-image-diff`, `post-image-cross`, `post-save-cross-r0`。
- [x] slug・画像の取り込み先pathに既存ファイルがない。
- [x] dry-runが成功し、意図したpathと`published:false`を示す。
- [x] 通常importが対象MarkdownとPNGだけを追加し、JSONを維持、PNGのbyte一致を保つ。
- [x] `.works-import.lock`が処理後に残らない。残った場合は進行中処理と記事・画像の状態を確認し、判断できないときは削除・復旧せず停止する。
- [x] Desktopと390×844 mobile previewで一覧・詳細・画像・手順・出典・未検証文言・安全注記・関連Review導線が表示される。previewにnoindexが付く。
- [x] preview確認後に対象Markdownの`published`だけをtrueに変更する。受領packageと無関係ファイルに変更がない。
- [x] `npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist`がすべて成功する。
- [x] Claude reviewは指定phaseがglm-5.3で正常終了し、schema valid、blocking 0。
- [ ] PR差分に宣言対象だけが含まれ、全CI成功、mergeableを確認してsquash mergeする。
- [ ] Pages deploy完了後、一覧・詳細・Review相互リンクとHTML参照最適化WebPのHTTP・SHAをcache-bypassで確認する。
- [x] 作業開始時に元checkoutの変更・未追跡ファイルを保持し、X/Instagram投稿と画像生成・修正を行わない。

## Command Checks

- [x] `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-05_2210_tobari-just-being-together/site-work.json --dry-run`
- [x] `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-05_2210_tobari-just-being-together/site-work.json`
- [x] `npm run test:works`
- [x] `npm run verify:frontend`
- [x] `npm run check:works-dist`

## Manual Checks

- [x] Desktop preview: list/detail, correct image, body, source links, safety exits, Review link, unvalidated note, noindex.
- [x] Mobile preview: same content and links fit/read well at 390×844; resize the browser viewport explicitly.

## Optional Checks

- [ ] Normal build omits the draft and its standalone source image.
- [ ] Published HTML points to optimized 480/1080 WebP derivatives; record response status and SHA.

## Out Of Scope

- X / Instagram publication, changes to delivery files or studio history, regeneration/editing of the image, and publication of any prior inbox package.
