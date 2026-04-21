# Plan

## Task

- task-id: TASK-gallery-generate-orphan-guard-2026-04-21
- related pbi: `docs/tasks/TASK-gallery-generate-orphan-guard-2026-04-21/pbi-input.md`

## Intent

- 何を変えるか: `gallery:generate` が manifest を唯一の正本として orphan 削除する挙動を、安全側に寄せる
- なぜ今やるか: 現行運用では manual/import 生成の markdown が普通に存在し、再生成で失うリスクがあるため

## Scope Declaration

- 変更対象ファイル: `scripts/generate-gallery-md.ts`、必要なら `package.json` 配下の既存テスト基盤に沿うテストファイル、`docs/gallery-generation.md`、task 文書
- 変更しないもの: `src/content/gallery/**/*.md` 個別修正、`data/gallery-manifest.json` 全件修復、UI/ページ実装

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Implementation Steps

1. `generate-gallery-md.ts` の orphan 削除条件と repo 実態を照合し、安全な削除条件を設計する
2. スクリプトを最小差分で修正し、必要なら回帰防止のテストを追加する
3. typecheck/build と必要な実行確認を行い、Claude review gate を通して収束させる

## Risks And Guards

- 想定リスク: 削除を止めすぎて、本来 regenerate で消すべき生成物まで残る
- 回避策: 削除対象を「このスクリプトが生成したと判定できるファイル」に限定するか、明示マーカーでのみ削除する
- scope 外に見つけた事項の扱い: manifest 未登録既存ファイルの棚卸しはメモに留め、今回の差分では全件修復しない

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
- 追加確認:
  - 変更対象スクリプトの想定ケースをローカル実行またはテストで確認する
  - review gate で blocking issue が 0 件になるまで反復する

## Approval

- approver: Codex self-approval
- status: approved
- note: ユーザー依頼に基づき scope と検証方針を固定して着手する

個人運用では自己承認でよい。承認とは、scope と検証方針に同意した状態を指す。

plan 承認前はコード変更しない。
