# Plan

## Task

- task-id: TASK-review-detail-role-separation
- related pbi: `docs/tasks/TASK-review-detail-role-separation/pbi-input.md`

## Intent

- 何を変えるか: review detail page に「読書前の視点」専用 field を追加し、`recommendedFor` と描画責務を分離する。
- なぜ今やるか: `buffon-autobiography` を中心に、同じ意味の文が page 内で重なり、導線ごとの情報価値が薄れているため。

## Visual / Content / Interaction Thesis

- visual thesis: 既存の静かな review detail layout はそのままに、Reading Compass だけを役割の違う短文へ差し替える。
- content plan: `description` は要約、`excerpt` は感情の核、`readingCompass` は読む前の視点、`recommendedFor` は対象読者、`tags` はテーマ語として分離する。
- interaction thesis: 読み手が hero で本の輪郭をつかみ、Compass で心構えを受け取り、guidance で自分向きかを素早く判断できる流れにする。

## Scope Declaration

- 変更対象ファイル:
  - `src/content/config.ts`
  - `src/pages/reviews/[slug].astro`
  - `src/content/reviews/*.md`
  - `docs/tasks/TASK-review-detail-role-separation/*`
  - `inbox/daily/2026-04-13.md`
- 変更しないもの:
  - review 一覧ページの構造
  - styles / layout の大幅変更
  - gallery / videos / about 領域

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため、単独で進める。

## Implementation Steps

1. reviews schema と detail template を確認し、重複源を content 由来 / template 固定文で切り分ける。
2. `readingCompass` field を追加し、detail template で `recommendedFor` の再表示をやめて専用短文を描画する。
3. `buffon-autobiography` を優先して、description / excerpt / readingCompass / recommendedFor / 本文の役割重複を最小差分で調整する。
4. 他 published review にも同方針で `readingCompass` を追加し、必要なページだけ wording を自然に整える。
5. 差分確認、`npm run typecheck`、`npm run build`、Claude review gate、status/daily 更新を行う。

## Risks And Guards

- 想定リスク: frontmatter schema 追加で既存 content が壊れる、文章のトーンが既存世界観から浮く。
- 回避策: field は optional にし、変更は published review のみ最小範囲で実施する。各文は 2〜4文・柔らかい語り口を維持する。
- scope 外に見つけた事項の扱い: 今回は記録だけに留め、別タスクへ分離する。

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
- 追加確認:
  - `git diff --stat`
  - `buffon-autobiography` と他 review の frontmatter / body の重複目視確認

## Approval

- approver: owner self
- status: approved
- note: user 指示に基づき、一気通貫で実装まで進める前提で自己承認。
