# 読書 with Coco Repo Guide

## Review Gate

- すべての変更は最初に `record-fast` / `record-safe` / `publish/dev-critical` を判定する。
- このrepoの frontend 基盤整備、公開UI変更、config更新、テスト基盤追加は `publish/dev-critical` 扱いとする。
- `publish/dev-critical` の変更後、commit 前、PR 前、merge 前には必ず `claude-review-gate` を実行し、`ok: true` を確認する。

## Repo Layout

- `src/pages/`: Astro pages。`index.astro` が first viewport の基準。
- `src/layouts/`: 共通レイアウト。全体トークンと global shell はここを起点に扱う。
- `src/components/`: SEO などの共通部品。
- `src/content/`: About / Profile / Reviews / Gallery / Videos の実データ。
- `src/utils/`: content collections を整形する補助。
- `src/styles/`: 共通デザイントークンとベーススタイル。
- `public/`: 固定アセットと CMS。
- `docs/`: frontend 運用メモ、実装前チェック、依頼テンプレート。
- `tests/e2e/`: Playwright smoke tests。

## Commands

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test`
- `npm run test:e2e`
- `npm run test:e2e:headed`
- `npm run verify:frontend`

## Frontend Hard Rules

- 実装前に必ず `visual thesis` / `content plan` / `interaction thesis` を短く定義してから着手する。
- first viewport は 1つの composition として扱い、brand name `読書 with Coco` を hero-level の強さで見せる。
- first viewport では “読書で生まれた世界を、ココちゃんが旅する。” の体験価値を最優先する。
- generic SaaS 風レイアウト、過剰なカード分割、意味の薄い KPI セクションを増やさない。
- typography / color / spacing を先に決め、component は後から組む。
- 実コピー・実コンテンツ・実画像がある場合はダミーより優先する。
- 既存の Astro 構成、コンテンツコレクション、ブランドトーンを壊さない。
- 本 × ココちゃん × 学び の世界観を守り、余白・構図・タイポで物語性を出す。

## Section Principles

- Hero は brand、世界観、主要CTA を一画面で読める密度に保つ。
- 主CTA は「本 × ココちゃん × 学び」を最短で体験できる導線に置き、副CTA は補助導線として優先度を一段下げる。
- Section は narrative でつなぐ。情報の羅列より「読後の余韻が深まる順番」を優先する。
- Cards は一覧や比較に必要な場面だけで使う。安易に `card` を量産しない。
- Desktop / mobile の両方で視認性、余白、CTA 到達性を確認する。

## Verify

- frontend 変更後は `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` を順に実行する。
- Playwright では desktop と mobile の両方で top page、主要遷移、CTA クリック、レイアウト崩れを確認する。
- UI調整中は `npm run test:e2e -- --project=chromium` などで短い反復をしてよいが、完了時は full smoke を通す。

## Definition Of Done

- `visual thesis` / `content plan` / `interaction thesis` が作業ログまたは依頼文に残っている。
- brand と first viewport の意図が壊れていない。
- mobile / desktop の確認が終わっている。
- `lint` / `typecheck` / `build` / `test:e2e` が通っている。
- `publish/dev-critical` 変更では Claude review gate が `ok: true` になっている。
