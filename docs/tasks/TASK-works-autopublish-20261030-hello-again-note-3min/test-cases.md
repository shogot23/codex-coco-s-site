# Test Cases

## Task
- task-id: TASK-works-autopublish-20261030-hello-again-note-3min
- related plan: plan.md

## Must Check
- [x] 入力成果物7点のみがあり、全SHAが依頼値に一致する。
- [x] site-workはpublished:falseで、slug/書名/review/画像/分類が一致する。
- [x] latest mainにslug/画像衝突がなく、review公開済み・bookTitle完全一致。
- [x] dry-run/import成功。追加原稿と画像が入力に一致し、import後published:false。
- [x] プレビューでplan.mdのContent Four-Point Checkの4点を確認し、読者が意味の流れを追える。
- [x] 本人目線で、AI調査事情/第三者review/推測した読了・経験なし。引用/著者手順と翻案を区別。
- [x] 研究の条件と限界、短縮ワーク未検証、効果非保証を保持。
- [x] 安心できる相手のみ。拒絶/断絶/恐怖/連絡拒否を除外し、送信/返信確認を任意にし、中止/休息/相談/終了を選べる。
- [x] PC/mobileで一覧・詳細・画像・手順・研究/安全・本導線が読め、崩れ/横スクロールなし。
- [x] distに公開URL/画像だけが出力され、共有画像HTML参照と480/1080最適化版を確認。
- [ ] CI/Pagesのmerge SHA一致。cache-bypassで一覧/詳細/review相互リンク/OG/最適化mediaを確認。

## Public Copy Four-Point Review
1. bookConnectionと本文が本人の目線になっている。
2. AIの調査事情や本人の公開reviewを第三者として語る表現がない。
3. 本の説明と本人の読書経験に根拠があり、読了・経験を推測していない。
4. 引用/著者手順と日常向け翻案を区別し、研究の限界と短縮版未検証を保つ。

## Command Checks
- [x] npm run test:works
- [x] npm run verify:frontend
- [x] npm run check:works-dist
- [x] Claude review gateの必要phase

## Manual Checks
- [x] 入力とimport原稿/画像/手順を照合する。
- [x] desktopでlocalhost previewの一覧→詳細→reviewを確認する。
- [x] mobile viewportへ切替えて同じ表示とCTAを確認する。
- [x] 4点を意味で確認し、限定フレーズ検査だけで完了扱いしない。
- [ ] merge後にcache-bypass HTTPと画面で一覧/詳細/review/OG/最適化mediaを確認する。

## Optional Checks
- [x] localhost preview全ページのnoindexを確認する。

## Out Of Scope
- [ ] 画像生成/編集、X/Instagram投稿、dlab、過去未公開ワーク。
- [ ] 制作job/audit/history、元dirty worktreeの変更。

## Result Notes (2026-10-31 JST)

- v4納品7点のSHAは指定値に一致し、import後の画像は入力PNGとbyte一致した。
- previewはlocalhost:4327の同一隔離worktreeで確認した。PC 1440x1000 / mobile 390x844、一覧と詳細で横はみ出しなし。詳細CTAは#stepsへ移動し、related reviewと戻りリンクを確認。robotsはnoindex,nofollow。
- `npm run test:works`: 35/35 pass。既存origin/mainのMarkdownは27件、対象追加後は28件のため、scripts/work-import.test.mjsの件数名/assertionを最小更新した。
- `npm run verify:frontend`: lint/typecheck/build/E2E pass。Astro診断0件、E2E 125 passed / 7 skipped。build prebuildで既存media派生物を生成。
- `npm run check:works-dist`: pass。distに対象記事、一覧リンク、480.webp/1080.webpとOG/Twitter 1080画像参照を確認。480=480x600、1080=1080x1350。
- 衝突確認: origin/main 08e3ba79に対象slug/画像名なし。公開レビューの`published:true`と`bookTitle: 死ぬ瞬間の5つの後悔`を再読して確認。
- Claude implementation arch/diff: actual glm-5.3、両phase valid、blocking 0。PBIのscope不一致とlatest-main確認記録を修正。件数assertionの将来動的化は別保守作業のため今回範囲外として保留。
- preview開始時に既存review画像派生物がdev serverで404だったが、build生成後はdistと生成済みpublic/mediaに存在。無関係なレビュー/画像は変更していない。
- merge後のCI/Pages/cache-bypass公開確認はこれから行う。
