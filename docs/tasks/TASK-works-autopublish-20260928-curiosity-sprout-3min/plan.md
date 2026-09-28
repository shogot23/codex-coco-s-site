# Plan

## Task

- task-id: TASK-works-autopublish-20260928-curiosity-sprout-3min
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 制作済みワークをdraftでimport・previewし、ゲート後に対象 `published` だけをtrueへ変えて公開する。
- なぜ今やるか: ユーザーが制作後サイト公開工程を継続承認しており、今回の制作が証跡付きで完了した。

## Scope Declaration

- 変更対象ファイル: task記録一式、`src/content/works/curiosity-sprout-3min.md`、対応する `src/assets/works/curiosity-sprout-3min.png`、`inbox/daily/2026-09-28.md`。
- 変更しないもの: 元worktree、既存inbox/work成果物、その他のsrc/docs、SNS投稿。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

## Implementation Steps

1. 入力7ファイル・制作検証証跡・参照レビュー・衝突・分類IDを再照合し、絶対パスのdry-runを行う。
2. 成功後に通常importし、非公開状態を確認。ローカルpreviewをPC/モバイルで検証する。
3. 対象のpublishedのみ公開状態へ変更し、works/ frontend/ dist検証とClaude gateを通す。
4. 差分を確認してcommit/push/PR/CI/squash mergeし、Pagesと公開ページを確認する。
5. statusと当日worklogを更新する。

## Risks And Guards

- 想定リスク: slug/画像衝突、参照情報や制作根拠の不一致、preview/CI/deploy不成立。
- 回避策: 不一致や失敗時は次工程へ進まず停止する。元worktreeとinboxは読み取り専用。
- scope 外に見つけた事項の扱い: 変更せず報告する。

## Verification

- 実行するコマンド:
  - `npm run works:import -- <absolute-site-work.json> --dry-run`
  - `npm run works:import -- <absolute-site-work.json>`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: `npm run works:preview`でPC/モバイル、一覧/詳細/画像/手順/出典/レビュー導線を確認。PR CIとPages公開URLを確認。

## Approval

- approver: ユーザー（継続承認）
- status: approved
- note: 親指示に明記された制作後サイト工程の継続承認を根拠としている。計画・scope・検証方針を本工程開始前に固定。
