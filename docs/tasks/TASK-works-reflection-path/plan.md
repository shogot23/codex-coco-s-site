# Plan

## Task

- task-id: TASK-works-reflection-path
- related pbi: `pbi-input.md`
- classification: `publish/dev-critical`

## Intent

- 個別ワークの手順と終了の目安の後に、読者が自分の壁、試した後の気づき、次にできそうなことを順に確かめられる問いを追加する。
- 見方の変化や行動を要求せず、書ける範囲で終えられるようにする。

## Scope Declaration

- 変更対象: `src/pages/works/[slug].astro`、`src/styles/works.css`、このタスクの記録。
- 変更しないもの: 15件の研究・安全上の説明、手順、一覧、データ構造、既存のココちゃんの問い。

## Frontend Thesis

- visual thesis: 既存の本文の流れを保ち、振り返りは静かな番号付きの問いとして置く。
- content plan: 「自分の壁」→「試した後の見え方」→「次にできそうなこと」を短い日本語で尋ねる。
- interaction thesis: 紙や手元のメモで任意に答える。入力欄や保存機能は設けない。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象が完全に分離されている
- [ ] P3: 順序に依存がない

共通テンプレートと表示確認が一続きのため、単独で進める。

## Implementation Steps

1. 個別ページの終了の目安の直後に、任意の振り返りを追加する。
2. 番号付きの問いがデスクトップとモバイルで読みやすいよう最小限のスタイルを加える。
3. 文面、全15件への表示、既存の導線、frontend verify を確認する。

## Risks And Guards

- 行動の強制や効果の保証に読める表現を避ける。
- 既存の安全上の注意と「この短縮ワーク自体は未検証」の表示を保持する。
- scope 外の改善は別タスクへ分ける。

## Verification

- `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` → `npm run verify:frontend`
- 15件の生成ページと desktop / mobile の表示を確認する。
- `claude-review-gate` による計画・変更後のレビューを行う。

## Approval

- approver: ユーザー（2026-09-29「ではその改善を実施してください」）
- status: approved
- note: 直前に提示した三つの振り返りの追加を承認済み。実装方針はこの範囲に限定する。
