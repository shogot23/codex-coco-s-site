# Plan

## Task

- task-id: TASK-happiness-curve-review-gallery
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 指定レビューと指定画像を、既存の Review → Gallery 導線に接続する。
- なぜ今やるか: ユーザーが指定した書誌・画像・affiliate 情報を公開コンテンツとして反映するため。

## Scope Declaration

- 変更対象ファイル: 対象 review markdown、gallery import が生成・更新する対象 markdown と public asset、必要な media/gallery manifest、PlanGate 記録。
- 変更しないもの: 既存ページ・コンポーネント・無関係な content、ユーザー管理の `inbox/`、`.playwright-cli/`、既存の別件未追跡ファイル。

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

## Implementation Steps

1. ブランド、schema、メディア運用、既存実例を確認し、サブエージェントの調査結果を統合する。
2. gallery import と media derivative pipeline を実行し、対象 gallery entry と review の画像・相互リンク・affiliate URL を整える。
3. content audit、lint、typecheck、build、E2E、`verify:frontend` を実行する。
4. Claude review gate を `ok: true` まで完了し、Codex自身で差分・生成物・desktop/mobile の最終確認を行う。
5. commit、push、PR、checks 確認、squash merge、main 同期、branch cleanup を実施する。

## Risks And Guards

- 想定リスク: gallery import が別画像・既存 entry と重複判定される、画像の元パスだけを参照して公開 asset が欠ける、affiliate HTML をそのまま埋め込んで schema を壊す。
- 回避策: import report と差分を確認し、public asset・gallery markdown・review cover・manifest の対応を個別に検証する。affiliate は URL のみを既存 purchaseLinks に登録する。
- scope 外に見つけた事項の扱い: 変更せず、最終報告に記録する。

## Verification

- 実行するコマンド:
  - `npm run check:content`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: `git diff --check`、生成 HTML の Review/Gallery URL・画像参照・相互リンク、desktop/mobile の主要導線、PR checks。

## Approval

- approver: Codex（個人運用の自己承認）
- status: approved
- note: publish/dev-critical のため、実装後と commit/PR/merge 前に Claude review gate を実施する。
