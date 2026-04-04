# 読書 with Coco Repo Guide

## 参照の基本

- 正本入口は `AGENTS.md` とし、repo 全体の判断が必要なときは `docs/parallel-dev-core.md` → `docs/parallel-dev-config.md` → `docs/reading-with-coco-design-doctrine.md` → `docs/frontend-playbook.md` の順で参照する。
- `docs/parallel-dev-core.md` は共通ルールのみ、`docs/parallel-dev-config.md` はこの repo 固有値のみを扱う。

## Review Gate

- すべての変更は最初に `record-fast` / `record-safe` / `publish/dev-critical` を判定する。
- この repo の `publish/dev-critical` 条件、verify コマンド、現在の Claude review 要件は `docs/parallel-dev-config.md` を正本として参照する。

## 基本運用ルール

- 実装前に `docs/parallel-dev-config.md` で分類と検証範囲を確認し、変更対象ファイルと狙いを箇条書きで宣言する
- 作業開始前に `git status --short --branch` で worktree が clean であることを確認する
- main への直接 commit を禁止する。必ず branch を切り PR 経由で反映する
- 指示された範囲のみを変更し、無関係な整形・依存追加・ルール追加をしない
- 検証コマンドは repo に存在するもののみ使用する（`npm run` 経由で定義されたもの）

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
- `site core` は常に「本 × ココちゃん × 学び」。この3要素のうち1つでも欠ける構成にしない。
- first viewport は 1つの composition として扱い、brand name `読書 with Coco` を hero-level の強さで見せる。
- first viewport では “読書で生まれた世界を、ココちゃんが旅する。” の体験価値を最優先する。
- generic SaaS 風レイアウト、過剰なカード分割、意味の薄い KPI セクションを増やさない。
- トップページは機能一覧ではなく「物語の表紙」として設計し、整っていることより「このサイトらしさ」を優先する。
- typography / color / spacing を先に決め、component は後から組む。
- 実コピー・実コンテンツ・実画像がある場合はダミーより優先する。
- ココちゃん関連ビジュアルは最重要アセットとして扱い、読書から広がる景色が見える構図を優先する。
- 既存の Astro 構成、コンテンツコレクション、ブランドトーンを壊さない。
- 本 × ココちゃん × 学び の世界観を守り、余白・構図・タイポで物語性を出す。

## Section Principles

- Hero は brand、世界観、主要CTA を一画面で読める密度に保つ。
- CTA priority は `docs/reading-with-coco-design-doctrine.md` を正本とし、主CTA を最短の読書体験導線、副CTA を補助導線として設計する。
- Section は narrative でつなぐ。情報の羅列より「読後の余韻が深まる順番」を優先する。
- Cards は一覧や比較に必要な場面だけで使う。安易に `card` を量産しない。
- Desktop / mobile の両方で視認性、余白、CTA 到達性を確認する。

## Design Doctrine Reference

- ブランド固有の design doctrine / copy / layout / implementation rules は `docs/reading-with-coco-design-doctrine.md` を正本として参照する。
- `docs/frontend-playbook.md` は着手前チェックと実装の進め方、doctrine 文書はブランド判断基準として使い分ける。

## Verify

- frontend 変更後は `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` を順に実行する。
- 完了時は `npm run verify:frontend` で最終確認する。
- Playwright では desktop と mobile の両方で top page、主要遷移、CTA クリック、レイアウト崩れを確認する。
- UI調整中は `npm run test:e2e -- --project=chromium` などで短い反復をしてよいが、完了時は full smoke を通す。

## Definition Of Done

- `visual thesis` / `content plan` / `interaction thesis` が作業ログまたは依頼文に残っている。
- brand と first viewport の意図が壊れていない。
- mobile / desktop の確認が終わっている。
- `lint` / `typecheck` / `build` / `test:e2e` が通っている。
- `publish/dev-critical` 変更では Claude review gate が `ok: true` になっている。
