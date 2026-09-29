# Plan

## Task

- task-id: TASK-publish-boutique-work
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: `beyond-numbers-star-note-4min` をワークページへ追加して公開する。
- なぜ今やるか: ユーザーが未反映ワークの反映を依頼し、origin/main の監査で当該1件のみ未反映と確認した。

## Scope Declaration

- 変更対象ファイル: `src/content/works/beyond-numbers-star-note-4min.md`, `src/assets/works/beyond-numbers-star-note-4min.png`, `docs/tasks/TASK-publish-boutique-work/{pbi-input,plan,test-cases,status}.md`。
- 変更しないもの: main作業ツリー、`inbox/work` 内の原本とhistory、他のワーク、投稿先SNS。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単一writerとしてLunaが順番に行う。

## Implementation Steps

1. Plan承認後、detached HEADのworktreeに専用branch `feat/publish-boutique-work` を作成する。
2. inbox原本・画像・既存レビュー・taxonomy・衝突を検証し、`works:import --dry-run` を実行する。
3. worktree内に非公開ワークを取り込み、localhost:4327でPC/モバイルを確認する。
4. 問題がなければ対象の `published` だけtrueにして必須検証を行い、ユーザーの今回限りの免除に従ってClaude review gateを実施せず、PR/CI/merge/Pages確認を行う。

## Risks And Guards

- 想定リスク: 原本との相違、slug/画像衝突、関連レビュー名・公開状態の不整合。
- 回避策: 元ファイルは読み取りのみとし、importのdry-runと機械検証・プレビューで照合する。問題時は停止する。
- scope 外に見つけた事項の扱い: status.mdへ記録し、今回変更しない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-09-26_1920_boutique-beyond-numbers-star/site-work.json --dry-run`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: `npm run works:preview` によりPC/mobileで一覧・詳細・画像・手順・本への導線を確認。公開後はPagesの一覧・詳細・相互リンク・共有画像を確認。

## Approval

- approver: Sol (オーケストレーター / reviewer)
- status: approved
- note: Solが2026-09-29に対象範囲・検証手順を承認。ユーザーが2026-09-29に今回のClaudeレビューを明示的に免除したため、レビュー未実施のまま後続のPR手順へ進む。

plan 承認前はコード変更しない。
