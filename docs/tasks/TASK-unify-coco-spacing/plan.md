# Plan

## Task

- task-id: TASK-unify-coco-spacing
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 日本語ブランド表記を全ページ・SEO/RSS・公開コンテンツ・現行運用文書で厳密に `読書 with Coco` へ統一する。
- なぜ今やるか: 現行サイトに空白が欠けた箇所があり、ユーザー指定の正式表記と一致していないため。

## Scope Declaration

- 変更対象ファイル:
  - 公開ソース: `src/components/SeoHead.astro`, `src/content/about/about.md`, `src/content/profile/profile.md`, `src/content/reviews/risukiringu-cho-nyumon.md`, `src/content/reviews/stoic-mindset.md`, `src/content/works/curiosity-sprout-3min.md`, `src/content/works/gratitude-draft-4min.md`, `src/content/works/tomorrow-on-paper-note-3min.md`, `src/layouts/Layout.astro`, `src/lib/seo.ts`, `src/pages/3books.astro`, `src/pages/404.astro`, `src/pages/about.astro`, `src/pages/gallery.astro`, `src/pages/gallery/[slug].astro`, `src/pages/gallery/archive.astro`, `src/pages/index.astro`, `src/pages/profile.astro`, `src/pages/reviews.astro`, `src/pages/reviews/[slug].astro`, `src/pages/rss.xml.ts`, `src/pages/works/[slug].astro`, `src/pages/works/index.astro`。
  - E2E期待値: `tests/e2e/site-smoke.spec.ts`, `tests/e2e/works.spec.ts`。
  - 現行指針: `AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, `README.md`, `docs/brand/reading-with-coco-ai-operations.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/frontend-playbook.md`, `docs/reading-with-coco-design-doctrine.md`。
  - PlanGate記録と検査: 本ディレクトリの4文書と `check-brand-spelling.py`。日次記録: `inbox/daily/2026-10-15.md`（record-fast）。
- 変更しないもの: `Reading with Coco`、URLや識別子、画像内文字、旧タスク/日次記録、ページの構造・デザイン・導線。

### 事前の全件棚卸し

- `git grep -n -I -i -E '読書[[:space:]　]*with[[:space:]　]*coco' -- . ':!docs/tasks/**' ':!inbox/**'` で追跡対象のテキストを棚卸しした。
- 表記修正が必要な該当箇所は上記の公開ソース、E2E、現行指針の一覧に含まれている。`.codex/config.toml` と `docs/revenue-pathway-design.md` はすでに指定表記。`public/` に別のテキスト表記はない。
- 過去タスクと日次記録は履歴として除外し、画像内文字も対象外とする。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単一の表記統一なので単独で進める。

## Implementation Steps

1. PlanGate の内容と対象を `claude-review-gate` の arch / diff / cross-check で確認する。すべて合格した後に Approval を `approved` へ更新し、各レビュー結果を `status.md` に記録する。ここまではbaseline取得やソース変更に進まない。
2. `npm run build` と `check-brand-spelling.py` でベースラインを取得し、候補ファイルが宣言範囲内か照合する。既存の誤表記が残るため、この時点の検査は不一致を報告して終了コード1になる。候補件数・不一致数・scope照合結果を `status.md` に記録してからstep 3へ進む。
3. 宣言した公開ソース、E2E期待値、現行指針の該当表記だけを厳密に置換する。ベースラインに宣言外の真の誤表記があれば、ここで止め、scopeを追加してarch reviewをやり直す。
4. `npm run verify:frontend` を実行して置換後の `dist/` を再生成し、その後で `check-brand-spelling.py` を実行する。
5. Claude の変更レビューと cross-check を完了し、結果を `status.md` に記録してから commit / PR / squash merge を行う。
6. main / Pages の反映後に主要ルートとRSSの本番HTMLを確認する。

## Risks And Guards

- 想定リスク: 似た日本語表記や空白差が一部ページ、SEO、RSS、テストに残る。
- 回避策: 検査仕様は `test-cases.md` に定め、指定表記との完全一致を検証する。候補の原文前後を照合し、語の離れすぎによる誤検出なら、該当ファイル・文脈・判定理由を status.md に記録する。今回の全件棚卸しではコードによる文字列分割は見つかっていない。新たに見つかった場合は個別に確認する。
- scope 外に見つけた事項の扱い: 過去作業記録、英語表記、画像内文字は変更しない。

## Verification

- 変更前のベースライン:
  - `npm run build`
  - `python3 docs/tasks/TASK-unify-coco-spacing/check-brand-spelling.py`（既存表記を検出するため終了コード1を想定）。報告されたファイルが宣言scope内にあることを照合する。
- 置換後の最終確認:
  - `npm run verify:frontend`（build完了後に dist を更新し、lint / typecheck / build / test:e2e を順に実行）。
  - `python3 docs/tasks/TASK-unify-coco-spacing/check-brand-spelling.py`（更新済みdistを確認）。
  - `git grep -n -I -i -E '読書[[:space:]　]*with[[:space:]　]*coco' -- . ':!docs/tasks/**' ':!inbox/**'` でASCII英字と空白を使う現在の追跡テキストを棚卸しし、各一致が指定表記であることを確認する。
- `check-brand-spelling.py` の候補仕様、HTML境界、事前条件、終了コードは `test-cases.md` を正とする。実行後は候補件数と不一致数を `status.md` に記録する。
- 追加確認:
  - build 出力の全ページとRSS title/descriptionに指定表記が反映されること。
  - Playwrightの `chromium`（1440×1080）と `mobile-chrome`（Pixel 7）で既存のsmoke / 導線E2Eが通ること。
  - merge後のmain CIとPages deploy runが成功し、その後に主要公開ページのHTMLとRSSを確認する。

## Approval

- approver: `AGENTS.md` / `docs/parallel-dev-config.md` に基づく Claude review gate (glm-5.3) と owner
- reviewed: 2026-10-15
- status: approved before implementation
- note: この承認はPlanGateの実装前計画承認である。PR/mergeは実装後の必須diff reviewとcross-checkに通した後に行う。表記の大小文字・空白・全角差を調べる検査スクリプトを追加し、候補0件を合格扱いしない。`verify:frontend` には lint / typecheck / build / test:e2e が含まれる。`CLAUDE.md` の `codex-review` は他の正典にある現在のgate名称と異なるため今回は変更しない。
