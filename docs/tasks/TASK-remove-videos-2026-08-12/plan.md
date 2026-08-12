# Plan

## Task

- task-id: `TASK-remove-videos-2026-08-12`
- related pbi: `docs/tasks/TASK-remove-videos-2026-08-12/pbi-input.md`

## Intent

- 何を変えるか: 独立した動画ページと動画機能固有の実装・資産を削除し、Home/About/ナビをレビュー主導・ギャラリー副導線へ整理する。
- なぜ今やるか: 今後更新しない動画機能が主要導線と保守面を占有しており、ブランド方針と運用方針の双方に対して過剰だから。

## Frontend Thesis

- visual thesis: 第三の代替枠を足さず、レビューと言葉、ギャラリーと景色の二つの窓に視線を集中させる。
- content plan: Homeの動画件数・Fragmentsを除き、Aboutの体験順をReview→Galleryに短縮する。実レビュー・実ギャラリー・ココちゃんの役割は弱めない。
- interaction thesis: primary CTAは`レビューを見る`、secondary CTAは`ギャラリーを見る`のままとし、グローバルナビとAboutから動画への行き止まりをなくす。旧`/videos/`はブランド404で扱う。

## Scope Declaration

- 変更対象ファイル: `src/pages/index.astro`、`src/pages/about.astro`、`src/pages/404.astro`、`src/layouts/Layout.astro`、`src/content/config.ts`、`scripts/check-dist-integrity.mjs`、`tests/e2e/site-smoke.spec.ts`、`tests/e2e/technical-audit.spec.ts`、`cms/decap/config.yml`、`package.json`、`package-lock.json`、`README.md`、`AGENTS.md`、`docs/hosting/github-pages-requirements.md`、`docs/revenue-pathway-design.md`、本taskのPlanGate/status/daily。
- 削除対象: `src/pages/videos.astro`、`src/content/videos/`、`src/data/videos.ts`、`public/videos/`、`scripts/check-video-toolchain.mjs`、`scripts/generate-video-assets.mjs`、`scripts/video-accessibility-manifest.json`。
- 変更しないもの: review/galleryの実コンテンツ、汎用`check-dist-links`、過去task/daily、Git履歴、deploy先、ブランド原典、無関係な依存関係と整形。

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 調査範囲を依存inventory、test/SEO、brand/contentに分離できる
- [x] P3: 読み取り調査は順序に依存しない

調査を3つのread-only sub-agentへ分割し、共通ファイルの実装と統合は親agentだけが行う。

## Survey Findings

- `src/components/`に動画collection/dataを参照する専用コンポーネントはなく、動画表示は`src/pages/videos.astro`内で完結している。
- `docs/`横断検索では、過去task/dailyを除く現行仕様の動画参照は`docs/hosting/github-pages-requirements.md`と`docs/revenue-pathway-design.md`に限定される。`docs/frontend-playbook.md`には動画toolchain参照がない。
- ルートの`README.md`と`AGENTS.md`には現行機能としてVideosの記述があり、更新対象に含める。`docs/brand/`の正本文書はレビュー主導・ギャラリー副導線で、動画を第三の柱として定義していないため変更しない。
- ブランド404は`src/pages/404.astro`として存在し、Review/Home CTAを備える。
- Sol実画面確認で390px時のブランド404がcontent-box由来で右へはみ出すことを確認したため、border-box化とviewport境界E2Eを追加する。
- 二本柱と動画導線不在の回帰は新規specを作らず、既存`site-smoke.spec.ts`と`technical-audit.spec.ts`へ追加する。
- sitemapは`@astrojs/sitemap`が静的routeから自動生成するためconfig変更は不要。build後のXMLに`/videos/`がないことを確認する。
- `check-dist-integrity.mjs`は`exists`による成果物検査とYAMLをparseしたCMS検査を持つため、既存方式を拡張して`dist/videos/`と`videos` CMS collectionをdenyする。

## Implementation Steps

1. 3領域の並列調査結果を統合し、ClaudeにPlanGateをレビューさせる。
2. 動画route、content/data、公開アセット、専用scripts/manifestを削除する。
3. collection/CMS/package依存、ナビ/Home/About、現行文書を最小差分で更新する。
4. 動画専用E2Eを削除し、既存E2Eへレビュー・ギャラリー二本柱、ナビ・About・Profileの動画導線不在、旧URLのブランド404確認を追加する。dist integrityに動画route/CMS collection再混入の禁止条件を追加する。
5. residual検索、lint、typecheck、build、E2E、verify、desktop/mobile実画面、dist/sitemap/依存不在を確認する。
6. Claude review gateを`ok: true`まで収束させ、続いてSol自身が独立最終チェックする。
7. `status.md`と当日dailyを更新し、commit・push・PR作成まで行う。

## Risks And Guards

- 想定リスク: `/videos/`ブックマークが404になる、sitemap/CMS/schema/test/package-lockに参照が残る、二項目化後のHome/Aboutレイアウトが崩れる、過去記録や一般語を過剰削除する。
- 回避策: 完全削除と404移行を明示し、`rg`とbuild成果物を横断確認する。desktop/mobileを実ブラウザ確認し、履歴文書と一般語は対象外として保持する。
- scope 外に見つけた事項の扱い: 今回変更せず、必要なら別task候補として記録する。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - sourceとbuild成果物に機能参照 `/videos/`、`Moving Fragments`、`動く断片` が残らない（過去task/dailyと一般本文は除外）。
  - `dist/videos/`が存在せず、sitemapに`/videos/`がない。
  - `ffmpeg-static`が直接・推移依存から外れている。
  - desktop/mobileでHome、About、グローバルナビ、Review/Gallery遷移、旧`/videos/`のブランド404とReview/Home CTA、404セクションのviewport内表示を確認する。

## Approval

- approver: task owner（2026-08-12、動画関連削除とオーケストラ方針を承認）
- reviewer: Claude Review Gate → Sol final check
- status: approved
- note: ownerの「動画関連削除でいきましょう。オーケストラ方針で実施」と追加の最終チェック指示を、scopeと検証方針への承認として固定する。
