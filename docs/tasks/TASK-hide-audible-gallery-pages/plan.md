# Plan

## Task

- task-id: TASK-hide-audible-gallery-pages
- related pbi: `docs/tasks/TASK-hide-audible-gallery-pages/pbi-input.md`

## Intent

- 何を変えるか: Audible 帯付き gallery エントリの frontmatter を非公開状態へ更新する
- なぜ今やるか: 公開中ページから対象画像を速やかに外すため

## Scope Declaration

- 変更対象ファイル: `docs/tasks/TASK-hide-audible-gallery-pages/*`、該当する `src/content/gallery/*.md`
- 変更しないもの: `src/pages/`、`src/utils/`、`tests/`、既存の dirty worktree 差分

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Implementation Steps

1. `public/uploads/gallery/books/` の画像を目視棚卸しし、`ONLY FROM audible` 帯の有無を記録する
2. 該当画像に対応する `src/content/gallery/*.md` を特定し、`published: false` に更新する
3. ビルドと E2E を含む frontend verify を実行し、最後に Claude review gate を通す

## Risks And Guards

- 想定リスク: 対象画像の見落とし、誤判定、既存の関連導線の意図しない変化
- 回避策: 画像を一覧化して目視確認し、変更は `published` のみに限定する
- scope 外に見つけた事項の扱い: このタスクでは対応せず、必要なら別タスクへ切り出す

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: 該当 slug が gallery 一覧と詳細URL生成から外れていることを確認する

## Approval

- approver: self
- status: approved
- note: 依頼内容に基づく自己承認。既存の dirty worktree には触れない
