# Plan

## Task

- task-id: TASK-works-hero-refine
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 既存ヒーロー画像を全幅の場面として見せ、左の空間に短いcopyと検索CTAを重ねる。mobileではcopyとCTAの後に画像を置き、必要な範囲をCSSでcropする。
- なぜ今やるか: `/works/` 冒頭で画像と文章が分断され、主役の画像を活かせていないため。

## Scope Declaration

- 変更対象ファイル: `src/pages/works/index.astro`, `src/styles/works.css`, 必要最小限の `tests/e2e/works.spec.ts`, 本PlanGate一式と `inbox/daily/2026-09-28.md`
- 変更しないもの: `public/works/works-hero-20260926.webp` を含むhero/social画像ファイル、OGP/X画像とmeta、finderの選択・並び替え処理、no-JSの全件リスト、WORKS_PREVIEW、個別ワーク。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単独実施。デザイン確認はSolが実装後スクリーンショットで行う。
並行作業の3条件を満たす独立サブタスクがないため、意図的に単独で進める。

## Implementation Steps

1. copyを一文にし、公開ワークが1件以上あるときのみ `#work-finder` へ移動する主要CTAを表示する。JavaScript無効時もfinderが非表示のためCTAを隠す。finder導入文を短くする。
2. desktopは画像を全幅に広げ、画像左側の余白にcopy/CTAを配置する。920px以下はcopy→CTA→画像の順にし、CSSの `object-fit: cover` / `object-position` でcropする。finderと一覧の既存breakpointは720pxのまま維持する。
3. 必要なら意味のあるe2e確認を加え、desktop/mobileのスクリーンショットを作成してSolへ送る。デザイン確認後にfrontend verify、Claude review、commit/PR/mergeへ進む。

## Risks And Guards

- 想定リスク: cropが本・ココちゃん・メモを欠かす、overlay copyの可読性が不足する、CTA先が見つけにくい。
- 回避策: object-positionとoverlay幅を画面で調整し、検索欄にscroll-marginを設ける。desktop/mobile両方を確認する。
- scope 外に見つけた事項の扱い: 変更せず記録する。

## Verification

- 実行するコマンド:
  - `npm run verify:frontend`
- 追加確認:
  - desktop/880px中間幅/mobileでfirst viewport、crop、CTA遷移、finder表示を目視
  - finderロジックと公開境界のコードが変更対象外で、diffに含まれないことを確認
  - Xカード/OGP指定URLが変更されていないこと
  - `npm run verify:frontend` 合格とClaude review gateのblocking issueなし、`ok: true`

## Approval

- approver: Sol (親エージェント)
- status: approved
- note: 2026-09-28に承認済み。desktopは画像左の空間へcopy/CTAを配置し、mobileと中間幅はcopy→CTA→crop画像の順で確認する。880pxの視認性を踏まえHero breakpointは920pxとする。
