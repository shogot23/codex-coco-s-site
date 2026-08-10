# Plan

## Task

- task-id: `TASK-full-site-audit-implementation-2026-08-10`
- related pbi: `docs/tasks/TASK-full-site-audit-implementation-2026-08-10/pbi-input.md`

## Intent

- 何を変えるか: 監査で抽出したブランド、コンテンツ、UI、アクセシビリティ、SEO、性能、動画、運用テストを、Reviews主導の一つの体験へ統合する。
- なぜ今やるか: 公開Galleryの多くで購入CTAがレビューより前に出ること、旧レビューの価値密度が不均一なこと、desktop / mobileの到達性と画像性能に確認済みの弱点があるため。

## Scope Declaration

- 変更対象ファイル:
  - `src/layouts/Layout.astro`
  - `src/components/SeoHead.astro`
  - `src/components/gallery/GalleryBrowse.astro`
  - `src/pages/*.astro`、`src/pages/reviews/[slug].astro`、`src/pages/gallery/[slug].astro`
  - `src/content/config.ts`、`src/content/about/`、`src/content/profile/`、`src/content/reviews/`、必要な`src/content/gallery/` / `src/content/videos/`
  - `src/styles/theme.css`
  - `public/404.html`相当を生成するAstro page、favicon / OGP / responsive image / video補助asset、`public/admin/`
  - `scripts/`、`tests/e2e/`、必要最小限の`package.json` / Playwright config
  - 本taskの`docs/tasks/`、daily / worklog
- 変更しないもの:
  - `inbox/gallery/`、`inbox/infographic/`
  - 未確認の書誌情報、ユーザー提供購入URLの値
  - 外部アカウント、Search Console、DNS、本番ホスティング設定

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 各タスクの対象（ファイル・調査範囲）が分離できる
- [ ] P3: 共通schema / Layout / content utilitiesへの依存があり、完全な順序非依存ではない

共通基盤を先に親agentが固定し、その後にContent、Frontend、Technical/Testの3領域をsub-agentへ分割する。共通ファイルを複数agentに同時編集させない。

### File Ownership Matrix

| owner | 単独所有する範囲 | 変更しない範囲 |
| --- | --- | --- |
| 親agent | `src/content/config.ts`、`src/layouts/Layout.astro`、`src/components/SeoHead.astro`、`src/pages/**/*.astro`の最終統合、`src/lib/seo.ts`、`src/lib/media.ts`、`package.json`、Astro / Playwright / deploy config、`cms/decap/` | sub-agentが作業中のcontent batch / asset derivativeへ同時編集しない |
| Content sub-agent | 割り当てた`src/content/reviews/*.md`、`src/content/about/about.md`、`src/content/profile/profile.md`、content migration / audit scriptとそのunit test | Layout、page template、SEO/media utility、GalleryBrowse、package/config |
| Frontend sub-agent | 親が共通契約を固定した後の`src/components/gallery/GalleryBrowse.astro`、`src/styles/theme.css`、UI専用E2E | content、schema、SEO/media utility、package/config、review/gallery detail template |
| Technical sub-agent | image/video derivative、RSS endpoint、dist integrity/link/performance script、CI専用test、hosting要件文書 | content本文、Layout、page template、GalleryBrowse、schema |

cross-domain変更は、担当sub-agentが変更要求と受け入れ条件を親agentへ返し、親agentだけが共有fileへbatch適用する。sub-agent同士で共有fileを直接handoffしない。

## Implementation Steps

1. 基準固定
   - brand field、editorial disclosure、Review / Gallery CTAの優先順位を型と共通utilityで定義する。
   - responsive image / SEO metadata / schemaの共通interfaceを決める。
   - reviewに`readerWorry`、`bookQuestion`、`perspectiveShift`、`smallStep`、`cocoNote`、`lingeringQuestion`、`excerptKind`、必要時のみ`excerptSource`、確認できる場合のみ`updatedAt`を持たせる。
   - `excerptKind`は`direct-quote` / `paraphrase` / `site-takeaway`のenumとし、`direct-quote`だけ`excerptSource`を必須にする。
   - galleryに`galleryEditorialStatus`、`galleryPrompt`、確認できる場合のみ`visualOrigin` / `updatedAt`を持たせる。
   - toolchainは`@astrojs/rss`、直接依存の`sharp`、`@axe-core/playwright`、`@lhci/cli`を採用する。video再圧縮はversion check scriptでsystem `ffmpeg`の有無とversionを記録し、利用できない場合だけversion固定した`ffmpeg-static`をdevDependencyへ追加する。local / CIのbinary versionとderivative metadataを比較し、不一致なら固定版`ffmpeg-static`へ統一してderivativeを再生成し、hashを検証する。
   - Astro組み込みimage serviceを直接利用できる経路と、public upload pipeline用の`sharp` scriptを分ける。
   - Galleryの初期data deliveryは、`/gallery/`へfeatured / chapter / listを合計15件以下の`img`としてSSRし、残りはbuild時生成のstatic JSONをclient-side fetchする方式へ固定する。JSON URLとfilter / sort contractを親agentが定義する。
2. Content migration foundation
   - Content sub-agentがfrontmatter追加専用のmigration scriptとquality auditを作る。本文の新規文言はscriptで生成しない。
   - `dry-run` → deterministic snapshot test → sample 1件のdiff review → bulk frontmatter適用の順に進める。
   - 既存contentの`updatedAt`は既存frontmatterまたは人手で確認できる更新日だけを設定し、git commit date、file mtime、build時刻、migration実行時刻を自動注入しない。不明な場合はfieldを省略する。
   - migration snapshot testで`excerptKind`のenumと、`direct-quote`時の`excerptSource`必須条件を検証する。
   - 本文編集はmigrationから分離し、作品事実と直接引用を確認した人手reviewを必須にする。
3. Content / CTA
   - Review未連携Galleryでは購入をprimaryにしない。
   - affiliate / AI読後イメージ / quote-vs-takeaway disclosureを全関連ページで統一する。
   - `galleryPrompt`は制作由来を保持するeditorial provenanceとし、値が確認できる作品ではGallery detailの補助的な`details`で提示する。値がない作品へ推測promptを補わない。
   - 旧reviewへ生活上の入口、見方の変化、小さな一歩、問い、必要なCoco noteを補う。
   - 3books / About / Profile / Homeの読者価値と役割を更新する。
4. Home / common navigation
   - Heroを1200x656 / 1280x720へ収め、brand name、対象読者、primary CTAを同時に見せる。
   - mobile menu、skip link、Japanese labels、external-link cue、footer、reduced-motionを実装する。
5. Reviews information architecture
   - 生活場面別の入口を全review metadataへ展開する。
   - 初期表示件数を制御し、filter / search / load-moreまたはpaginationをURL / back navigationと整合させる。
   - related reviewを単純な最新順からtheme / reader situation優先へ変更する。
   - related reviewの選定理由と順序をunit / E2Eで検証する。
   - `/reviews/`の初期HTMLを圧縮前90KB以下、初期`img`を12件以下、初期画像転送を600KB以下にし、全公開reviewを一括出力するhidden DOMを0件にする。
6. Gallery information architecture
   - 導入文の重複を削り、featured 3枚 → chapter → 必要時のみ一覧の段階開示へ整理する。
   - collection / taxonomyから動的に導出した全genre、view、sort stateを発見可能かつkeyboard-accessibleにし、重複DOM / image nodes / HTMLを削減する。
   - `/gallery/`の初期HTMLを圧縮前70KB以下、初期`img`を15件以下、初期画像転送を700KB以下にする。hidden gridの全件DOMは0件とする。
7. Error / empty / auxiliary pages
   - brand 404と復帰導線を追加する。
   - empty stateと3books footerを整える。
   - VideosはReviewsを補助する「本から生まれた声と動き」として位置づけ、Review / Galleryとの関係、primary CTA、一覧構造を整理する。媒体品質はstep 8で扱う。
8. Media performance
   - first viewport、review hero、gallery card、OGPに用途別WebP/AVIFまたはWebP fallbackを生成し、`srcset` / `sizes`を適用する。
   - 原本はrepoに保持し、build後の`dist`から参照移行済み原本だけを検証付きで除外する。
   - derivative manifestに含まれ、build済みHTML / CSS / JSON / RSS / sitemapのどこからも原本参照がない場合だけ、`dist`の原本を削除する。参照が1件でも残ればbuildを失敗させる。
   - HomeのLCP候補として選択される各viewport用assetを300KB以下にする。品質例外は目視結果と実容量をstatusへ記録する。
   - video poster / captions / transcript / compressionを追加する。字幕とtranscriptは実際の音声をlocal transcriptionして再生照合し、音声のない場面は推測せず非音声情報として記述する。
9. SEO / discovery
   - `Review` + `Book`、`CollectionPage` + `ItemList`、`BreadcrumbList`、Gallery creator/about関係、actual `dateModified`を実装する。
   - page title、OGP dimensions / alt、favicon、RSS、sitemap lastmodを実装する。
   - sitemap `lastmod`はreview / gallery / About / Profileの明示的な`updatedAt`だけを根拠にし、file mtimeやbuild時刻を使わない。
10. Hosting / CMS / operations
   - GitHub Pages制約下で可能なreferrer / metadataを適用し、CSP / immutable cache / security headerは移行要件として文書化する。
   - `public/admin/`を`cms/decap/`へ移し、GitHub PagesではCMSを明示的にdisabledとする。deploy artifactは`dist/admin/`不在をtestする。
   - `cms/decap/config.yml`は将来のCMS再導入用sourceとしてbrand fieldを維持し、build dry-runでYAML構文とcontent pathだけを検証する。認証・publish継続は主張しない。
11. Regression coverage
   - mobile nav全項目、first viewport CTA、skip link、reduced motion、404、affiliate priority、schema、OGP、responsive image、Gallery / Reviews progressive disclosureを自動テストする。
   - link check、axe相当、performance budgetをrepo commandへ追加する。
12. Verification and review
   - 短い反復確認後、`lint` → `typecheck` → `build` → `test:e2e` → `verify:frontend`。
   - desktop / mobile visual QA。
   - Claude Review Gate large: arch → grouped diff → cross-check。blockingがあれば修正して再レビューする。
13. Completion record
   - `status.md`と2026-08-10のdaily / worklogを更新し、外部状態依存の未実行項目を事実として記録する。

## Risks And Guards

- 想定リスク:
  - 100件超のcontent / asset変更で書誌情報や参照関係を壊す。
  - Galleryのclient rendering変更でfilter、history、keyboard操作を退行させる。
  - 画像変換で文字入りinfographicやココちゃんの表情が劣化する。
  - schemaを増やして実データと異なる構造化情報を公開する。
  - GitHub Pagesで効かないheader設定を実装済みと誤認する。
- 回避策:
  - content変換はscript + deterministic test + `git diff` sample reviewで行う。
  - 共通schemaを先に確定し、sub-agentの編集所有範囲を分離する。
  - infographicは視認性比較を行い、品質閾値を下回る場合はPNGを保持する。
  - JSON-LDは実データのみ出力し、validator相当のtestを追加する。
  - repo実装とexternal deployment actionを`status.md`で明確に分ける。
  - Gallery / Reviewの件数は固定値でなくcollectionの公開条件から導出する。
- scope 外に見つけた事項の扱い:
  - 本taskの完了条件へ直接関係しない新機能は追加せず、statusへ候補として記録する。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
  - 追加するlink / accessibility / performance / content integrity checks
- 追加確認:
  - 1200x656、1280x720、390x844、360x800。
  - Home、Reviews、review detail、Gallery、unlinked Gallery detail、3books、About、Profile、Videos、404。
  - keyboard-only、reduced-motion、external-link notification、filter URL restoration。
  - OGP / JSON-LD / RSS / sitemap output。
  - deploy artifactに未最適化原本と`admin/`が残っていないこと。

## Approval

- approver: owner（2026-08-10 ユーザー依頼「これらの内容を全て適応してください」）
- status: approved
- note: 監査で列挙した全項目を実装する依頼をscope承認として記録する。repo外サービス操作は実装可能な準備と制約記録までとする。

plan 承認後も、Claude architecture reviewが`ok: true`になるまではproduction codeへ着手しない。
