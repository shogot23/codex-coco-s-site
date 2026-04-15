# Plan

## Task

- task-id: `TASK-gallery-review-rollout-phase-b-2026-04-15`
- related pbi: `docs/tasks/TASK-gallery-review-rollout-phase-b-2026-04-15/pbi-input.md`

## Intent

- 何を変えるか: 5件の review 本文と frontmatter を追加し、対応する gallery に `relatedReview` と `needs_review: false` を反映する
- なぜ今やるか: URL確認と本文執筆指示が揃い、計画書の `phase_b_ready` 条件を満たしたため

## Scope Declaration

- 変更対象ファイル:
  - `src/content/reviews/` の新規 5ファイル
  - `src/content/gallery/business-143c24.md`
  - `src/content/gallery/novel-9868be.md`
  - `src/content/gallery/novel-78d4ec.md`
  - `src/content/gallery/novel-70beea.md`
  - `src/content/gallery/novel-dd98a4.md`
  - `docs/tasks/TASK-gallery-review-rollout-phase-b-2026-04-15/`
- 変更しないもの:
  - テンプレート
  - スキーマ
  - 一覧ページ
  - 他の gallery / reviews

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Implementation Steps

1. 5件の gallery 既存文言と既存 review 書式をもとに、review slug と frontmatter を決める
2. review 本文を新規作成し、購入リンクに受領済みのもしも URL を設定する
3. 対応する gallery に `relatedReview` を追加し、`needs_review: false` に更新する
4. `lint` → `typecheck` → `build` → `test:e2e` → `verify:frontend` を実行する
5. `claude-review-gate` と `codex-review` を通してから commit / push / PR に進む

## Risks And Guards

- 想定リスク: 本文が gallery のトーンや既存 review の密度から外れる
- 回避策: 既存 6レビューの frontmatter と本文構成を参照し、抽象度と CTA 導線を揃える
- scope 外に見つけた事項の扱い: 今回は記録のみとし、別タスクに分離する

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - 5件の gallery 詳細で `レビューを読む` が各 review 詳細へ遷移する
  - 購入リンクボタンが表示される
  - `needs_review` が解消される

## Approval

- approver: self
- status: approved
- note: 計画書とユーザー追加入力に基づく自己承認

plan 承認前はコード変更しない。
