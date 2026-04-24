# Plan

## Task

- task-id: `TASK-gallery-lead-image-stretch-fix-2026-04-24`
- related pbi: `docs/tasks/TASK-gallery-lead-image-stretch-fix-2026-04-24/pbi-input.md`

## Intent

- 何を変えるか: `GalleryBrowse.astro` の browse 専用 style を JS 再描画後にも効く形に整理し、lead image の横引き伸ばしを解消する
- なぜ今やるか: Phase C 後の curated lead image で、server render では正常でも client-side 再描画後に style が落ちて見え方が崩れるため

## Scope Declaration

- 変更対象ファイル:
  - `src/components/gallery/GalleryBrowse.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-lead-image-stretch-fix-2026-04-24/*`
- 変更しないもの:
  - `src/pages/gallery.astro`
  - `src/pages/gallery/archive.astro`
  - `src/utils/gallery.ts`
  - `src/content/`

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため単独で進める。`GalleryBrowse.astro` の style・inline render・回帰テストが密結合で、分離すると確認コストと競合リスクが増えるため直列のほうが安全。

## Implementation Steps

1. `GalleryBrowse.astro` の browse 専用 style を `[data-gallery-browse-shell]` 配下の global selector に切り替え、JS 再描画後の DOM にも同じ style が当たるようにする
2. lead / trail / grid の markup と render helper の class / `data-*` は維持し、server render と JS render の整合を確保する
3. lead media に `object-fit: cover` と intended wrapper sizing が継続適用されることを確認し、必要な微調整があれば lead に限定して行う
4. `site-smoke.spec.ts` に JS 再描画後も lead image の computed style が維持される回帰テストを追加する
5. desktop / mobile 目視確認、frontend verify、Claude review gate を完了させる

## Risks And Guards

- 想定リスク:
  - style selector の global 化で card 側に副作用が出る
  - lead だけ直したつもりで grid / trail の見え方が崩れる
  - test が style 実装に寄りすぎて brittle になる
- 回避策:
  - selector を `[data-gallery-browse-shell]` 配下に限定する
  - 既存の trail / grid 構造 assertion は維持する
  - computed style は `object-fit` と ratio 系の要点だけを確認する
- scope 外に見つけた事項の扱い:
  - Gallery detail や page shell の改善は別タスクへ分離する

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `/gallery/` curated lead image の desktop / mobile 目視
  - genre filter 後の JS 再描画で lead image が自然比率を保つこと
  - trail / grid card に副作用がないこと
  - Claude review gate `ok: true`

## Approval

- approver: self
- status: approved
- note: ユーザー指示に基づき、上記 scope と verify で自己承認して進める
