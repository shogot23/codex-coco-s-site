# Plan

## Task

- task-id: TASK-works-process-steps
- related pbi: `pbi-input.md`
- classification: `publish/dev-critical`

## Intent

- 既存の「このページの使い方」を、ブランドの思想である「困りごと → 本の問い → 見方の変化 → 今選べる一歩」に対応する4段階へ整理する。
- 一覧入口で流れを理解し、個別ページのワークと振り返りへ進めるようにする。

## Scope Declaration

- 変更対象: `src/pages/works/index.astro`、`src/styles/works.css`、`tests/e2e/works.spec.ts`、このタスクの記録。
- 変更しないもの: 個別ワークの本文・研究説明・安全上の注意、検索処理、画像、コンテンツデータ。
- 現行構造: `works-howto` セクションに `h2#works-howto-heading` と `ol` の3項目があり、一覧・finder の前に表示される。

## Frontend Thesis

- visual thesis: 既存の横並び手順の視認性を保ちながら、4段階を番号付きで示す。
- content plan: 困りごとを一つ選ぶ → 本の問いから生まれたワークを開く → 見方の変化や残った壁を残す → 今選べる一歩を決める。
- interaction thesis: 読むだけで流れが分かり、特別な入力や保存なしに個別ワークへ進める。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象が完全に分離されている
- [ ] P3: 順序に依存がない

入口の文面とそのスタイルが一続きのため、単独で進める。

## Implementation Steps

1. 使い方セクションの見出しを「ワークの進め方」にし、4段階の文面へ更新する。
2. 休む・相談する・ここで終える選択を補足文で明示する。
3. 既存E2Eの手順文言を4段階の表示へ更新する。
4. desktop / mobile の改行・余白・一覧への接続を確認する。

## Risks And Guards

- 「見方が変わる」「行動する」を結果や義務として書かない。
- 個別ワークに変更を広げず、既存の振り返りと重複しすぎない短さに保つ。
- scope 外の改善は別タスクへ分ける。

## Verification

- `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` → `npm run verify:frontend`
- `/works/` を1280px / 360pxで確認する。
- `ol/li` の意味構造、見出し階層、キーボードでの一覧導線を確認する。
- `claude-review-gate` による計画・変更後レビューを行う。

## Approval

- approver: ユーザー（2026-09-29「今回のワークの思想内容を手順化してください」）
- status: approved
- note: ワークの思想を一覧入口の4段階へ整理する範囲で実装する。
