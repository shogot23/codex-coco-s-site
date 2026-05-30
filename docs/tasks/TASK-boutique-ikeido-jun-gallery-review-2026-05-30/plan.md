# Plan

## Task

- task-id: TASK-boutique-ikeido-jun-gallery-review-2026-05-30
- related pbi: TASK-boutique-ikeido-jun-gallery-review-2026-05-30

## Intent

- 何を変えるか: 「ブティック」（池井戸潤）の gallery/review content と関連画像を追加する
- なぜ今やるか: ユーザー提供の画像・インフォグラフィック・レビュー本文を公開サイトへ反映するため

## Classification

- 判定: `publish/dev-critical`
- 理由: 公開サイトへ反映される content 追加であり、`src/` と `public/` を変更するため
- 必須 gate: frontend verify と Claude review gate

## Visual Thesis

- 夜の窓辺と灯りの中で、ココちゃんが『ブティック』の世界へ入る直前の静かな場面として見せる。

## Content Plan

- ギャラリーは画像を主役にし、「評価の外で自分の星を探す」余韻を短く添える。
- レビューはユーザー提供本文を軸に、正義と悪の境界、評価に削られた後の希望、今日の小さな行動を残す。
- アフィリエイト導線は `楽天で見る` の secondary 導線として扱い、本文価値より前に出さない。

## Interaction Thesis

- ギャラリー詳細からレビュー詳細へ、レビュー詳細からギャラリー詳細へ、読後の余韻がつながる導線を置く。
- 購入リンクは既存 UI の Reading Shelf / bridge に乗せ、購入主役の構成にしない。
- ページレイアウトは変更せず、既存 content collection の表示ルールに沿って反映する。

## Scope Declaration

- 変更対象ファイル:
  - `docs/tasks/TASK-boutique-ikeido-jun-gallery-review-2026-05-30/pbi-input.md`
  - `docs/tasks/TASK-boutique-ikeido-jun-gallery-review-2026-05-30/plan.md`
  - `docs/tasks/TASK-boutique-ikeido-jun-gallery-review-2026-05-30/test-cases.md`
  - `docs/tasks/TASK-boutique-ikeido-jun-gallery-review-2026-05-30/status.md`
  - `public/uploads/gallery/books/Boutique_Ikeido_Jun.png`
  - `public/uploads/review/infographic/boutique_ikeido_jun.png`
  - `src/content/gallery/novel-boutique-ikeido-jun.md`
  - `src/content/reviews/boutique-ikeido-jun.md`
  - `inbox/daily/2026-05-30.md`
- 変更しないもの:
  - UI コンポーネント
  - collection schema
  - 既存 content の内容
  - build / test / deployment 設定

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

調査フェーズは、content 構成調査とブランド方針調査をサブエージェントへ分担済み。実装フェーズは差分が小さいため、親エージェントが単独で最小差分を入れる。

## Implementation Steps

1. 作業ブランチ `codex/boutique-gallery-review-2026-05-30` で進める。
2. PlanGate ファイルを作成する。
3. gallery 画像と infographic を public assets へコピーする。
4. gallery entry を `novel-boutique-ikeido-jun.md` として追加する。
5. review entry を `boutique-ikeido-jun.md` として追加する。
6. daily record と status を更新する。
7. `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` → `npm run verify:frontend` を実行する。
8. Claude review gate を `ok: true` まで実行する。

## Risks And Guards

- 想定リスク: `relatedReview` の参照名ミスで build が失敗する。
- 回避策: review slug と gallery `relatedReview` を `boutique-ikeido-jun` に統一する。
- 想定リスク: もしも URL の HTML 断片をそのまま入れて schema に合わない。
- 回避策: `href` のみを `https://af.moshimo.com/...` へ正規化して frontmatter に入れる。
- scope 外に見つけた事項の扱い: 別タスクへ分離し、今回の差分には含めない。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - gallery/review content の frontmatter を目視確認する
  - `ブティック` の gallery/review 間導線が成立していることを確認する
  - Claude review gate で blocking issue がないことを確認する

## Approval

- approver: user / Codex
- status: approved
- note: ユーザーが 2026-05-30 にもしもアフィリエイト URL とレビュー本文を確認済み。Codex がブランド方針との整合を最終チェックし、本文を採用する。

plan 承認前はコード変更しない。
