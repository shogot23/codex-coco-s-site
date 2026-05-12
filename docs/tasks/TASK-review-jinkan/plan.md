# Plan

## Task

- task-id: TASK-review-jinkan
- related pbi: TASK-review-jinkan

## Intent

- 何を変えるか: レビューファイル新規作成、インフォグラフィック配置、ギャラリーに relatedReview 追加
- なぜ今やるか: ユーザー提供のレビュー文・インフォグラフィックを公開するため

## Scope Declaration

- 変更対象ファイル:
  - public/uploads/review/infographic/jinkan_imamura_shogo.png（コピー）
  - src/content/reviews/jinkan.md（新規作成）
  - src/content/gallery/novel-jinkan.md（relatedReview 追加）
- 変更しないもの: UI コンポーネント、他レビュー、設定ファイル

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある → なし（単独で進める）
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単独で進める。

## Implementation Steps

1. ブランチ作成: `git checkout -b review/jinkan`
2. インフォグラフィックコピー
3. レビューファイル作成（frontmatter + body）
4. ギャラリーエントリに relatedReview 追加
5. typecheck & build 検証

## Risks And Guards

- 想定リスク: relatedReview 参照解決失敗
- 回避策: review と gallery 更新を同コミットに含める
- scope 外に見つけた事項の扱い: 別タスクへ分離

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
- 追加確認: codex-review

## Approval

- approver: self
- status: approved
- note: 個人運用のため自己承認
