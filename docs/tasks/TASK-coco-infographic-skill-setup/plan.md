# Plan

## Task

- task-id: TASK-coco-infographic-skill-setup
- related pbi: `docs/tasks/TASK-coco-infographic-skill-setup/pbi-input.md`

## Intent

- 何を変えるか: 本紹介インフォグラフィックの一連の制作フローを reusable な skill と専用ワークスペースへ切り出す
- なぜ今やるか: 今後の制作を毎回同じ品質で短時間に再現できるようにするため

## Scope Declaration

- 変更対象ファイル: `docs/tasks/TASK-coco-infographic-skill-setup/*`、新規プロジェクト `/Users/shogo/Projects/coco-book-infographic-studio/*`、新規 skill 配置先
- 変更しないもの: `src/`, `public/`, `tests/`, build 設定、既存 frontend

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Implementation Steps

1. 専用ワークスペースの構成を決め、skill と補助スクリプトの配置方針を確定する
2. skill 本体、テンプレート、画像保存スクリプト、README を作成する
3. 保存先ディレクトリと動作確認を行い、Claude review gate でレビューして収束させる

## Risks And Guards

- 想定リスク: skill の trigger 条件が弱くて将来使われない
- 回避策: description に利用シーンを広めに書き、制作フローと保存先手順を明記する
- scope 外に見つけた事項の扱い: 改善案として `status.md` に残し、今回は触れない

## Verification

- 実行するコマンド:
  - `python3 scripts/save_generated_image.py --help`
  - `python3 scripts/save_generated_image.py --source <test-image> --title <test-title> --dry-run`
- 追加確認:
  - skill の文面が今回のワークフローを再現できるか目視確認する
  - 保存先が `.../inbox/infographic` に固定されているか確認する

## Approval

- approver: Codex
- status: approved
- note: 個人運用の自己承認として、この plan に沿って最小差分で進める

plan 承認前はコード変更しない。
