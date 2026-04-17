# Plan

## Task

- task-id: `TASK-playwright-gallery-mobile-smoke`
- related pbi: `docs/tasks/TASK-playwright-gallery-mobile-smoke/pbi-input.md`

## Intent

- 何を変えるか: 既存 smoke spec に gallery detail 2本と mobile-chrome 専用 usability 1本を追加する
- なぜ今やるか: 主要回遊導線の回帰を最小差分で補完し、監査指摘の不足点だけを埋めるため

## Visual / Content / Interaction Thesis

- visual thesis: UI 自体は変えず、mobile で header / nav / hero CTA が崩れていないことを viewport 内可視性で押さえる
- content plan: gallery detail では見出し・本文・画像・戻り導線・purchase fallback の最小要素だけを検証する
- interaction thesis: review 主導線から gallery detail へ渡り、必要なら review に戻る流れと、mobile で最初の CTA に迷わず届く流れを守る

## Scope Declaration

- 変更対象ファイル:
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-playwright-gallery-mobile-smoke/pbi-input.md`
  - `docs/tasks/TASK-playwright-gallery-mobile-smoke/plan.md`
  - `docs/tasks/TASK-playwright-gallery-mobile-smoke/test-cases.md`
  - `docs/tasks/TASK-playwright-gallery-mobile-smoke/status.md`
  - `inbox/daily/2026-04-15.md`
- 変更しないもの:
  - `playwright.config.ts`
  - 他の spec ファイル
  - 本番ページ実装
  - screenshot baseline

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため、単独で進める。

## Implementation Steps

1. `site-smoke.spec.ts` の既存 helper / expect style に合わせ、mobile 用の viewport 内可視 helper を 1 つだけ追加する
2. `gallery/novel-seiten/` で review 連動の detail smoke を追加する
3. `gallery/business-0d597c/` で purchaseLinks fallback の detail smoke を追加する
4. `mobile-chrome` 限定で home の header / nav / hero CTA usability を追加する
5. `npx playwright test tests/e2e/site-smoke.spec.ts --project=chromium --project=mobile-chrome` を先に回し、その後 `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` → `npm run verify:frontend` を実行する
6. Claude review gate を通し、結果を status / daily に反映する

## Risks And Guards

- 想定リスク: mobile で duplicate link が多く locator が不安定になる、gallery detail の slug 依存が brittle になる
- 回避策: `.hero` や `nav[aria-label="Primary"]` 配下に locator を絞り、slug は既存導線で既に使われている `novel-seiten` と安定 fixture の `business-0d597c` に限定する
- scope 外に見つけた事項の扱い: 今回は task docs にだけ残し、別タスクへ分離する

## Verification

- 実行するコマンド:
  - `npx playwright test tests/e2e/site-smoke.spec.ts --project=chromium --project=mobile-chrome`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `git diff --stat`
  - gallery detail 2本の CTA 遷移と属性確認
  - mobile-chrome で viewport 内可視性の確認

## Approval

- approver: self
- status: approved
- note: ユーザーから実装指示を受けているため、上記 scope で自己承認して進める

plan 承認前はコード変更しない。
