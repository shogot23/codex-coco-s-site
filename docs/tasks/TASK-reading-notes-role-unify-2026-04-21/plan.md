# Plan

## Task

- task-id: TASK-reading-notes-role-unify-2026-04-21
- related pbi: `docs/tasks/TASK-reading-notes-role-unify-2026-04-21/pbi-input.md`

## Intent

- 何を変えるか: reviews page の READING NOTES パネルから「いちばん新しい一冊」を削除し、ページ紹介パネルへ役割統一する。
- なぜ今やるか: 現行パネルの責務が二重化しており、レビューページの情報設計をシンプルに整える必要があるため。

## Visual / Content / Interaction Thesis

- visual thesis: 既存の静かな reviews hero は保ちつつ、右カラムの情報密度を少しだけ引いて、ページのしおりらしい落ち着きを戻す。
- content plan: hero で最新レビュー導線、READING NOTES でページ全体の紹介、featured section で最新レビュー詳細、review stream で一覧という責務に揃える。
- interaction thesis: 右カラムは読む前の見取り図として機能させ、ユーザーが hero CTA か theme/cue の文脈から自然に次の行動を選べる状態にする。

## Scope Declaration

- 変更対象ファイル:
  - `src/pages/reviews.astro`
  - `docs/tasks/TASK-reading-notes-role-unify-2026-04-21/*`
  - `inbox/daily/2026-04-21.md`
- 変更しないもの:
  - reviews hero copy
  - CSS / layout 構造
  - gallery / about / videos など他ページ

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため、単独で進める。

## Implementation Steps

1. PlanGate 文書を作成し、対象・制約・検証方針を固定する。
2. `src/pages/reviews.astro` から `latestReviewLabel` 変数と READING NOTES 内の「いちばん新しい一冊」条件ブロックを削除する。
3. 差分を確認し、frontend verify 一式と Claude review gate を完了する。
4. `status.md` と daily を更新し、結果を記録する。

## Risks And Guards

- 想定リスク: パネル内要素削除でレイアウトが不自然になる、不要変数削除漏れで typecheck が落ちる。
- 回避策: 差分を `reviews.astro` のみへ限定し、verify と E2E を通して hero / CTA / featured review への影響がないことを確認する。
- scope 外に見つけた事項の扱い: 今回は記録のみ行い、別タスクに分離する。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `git diff --stat`
  - reviews page の READING NOTES パネル目視確認

## Approval

- approver: owner self
- status: approved
- note: ユーザーが指定した計画書に基づき、この scope と検証方針で自己承認して進行する。
