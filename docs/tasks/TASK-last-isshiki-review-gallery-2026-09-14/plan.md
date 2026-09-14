# Plan

## Task

- task-id: TASK-last-isshiki-review-gallery-2026-09-14
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 『最後の一色（上下）』のレビュー本文とギャラリー展示をコンテンツコレクションへ追加する。
- なぜ今やるか: 添付済みのインフォグラフィックとギャラリー画像を、読者がレビューと余韻の両方から読める状態にするため。

## Scope Declaration

- 変更対象ファイル: 新規レビュー Markdown、新規ギャラリー Markdown、`public/assets/` の指定画像2枚、PlanGate記録。
- 変更しないもの: 既存 Astro ページ、既存コンテンツ、未追跡の inbox / output / `.playwright-cli/`。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単一 writer で順に実施する。

## Implementation Steps

1. ブランド原典、content schema、既存レビュー・ギャラリー形式を確認する。
2. 画像を公開アセット領域へ最適化コピーし、レビューとギャラリーの Markdown を追加する。
3. `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` → `npm run verify:frontend` を実行する。
4. 差分・画像寸法・関連リンクを確認し、Claude review gate を `ok: true` まで完了する。
5. 変更だけを commit / push し、PRを作成して checks 確認後に squash merge、main 同期、branch cleanup を行う。

## Risks And Guards

- 想定リスク: 既存の未追跡素材を誤ってコミットする、relatedReview の slug 不一致、購入リンクの schema 不一致、4:5画像の取り違え。
- 回避策: `git diff --name-status` と `git diff --cached` を確認し、対象ファイルを明示して add する。slug を双方で固定し、`https` のURLと `sips` の寸法を検証する。
- scope 外に見つけた事項の扱い: 別タスクとして残し、今回の差分へ含めない。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: `sips`、`git diff --check`、レビューとギャラリーの `relatedReview` 接続、生成された `dist` のリンク監査。

## Approval

- approver: Codex（個人運用の自己承認）
- status: approved
- note: `publish/dev-critical` として Claude review gate を commit / PR / merge 前に実施する。
