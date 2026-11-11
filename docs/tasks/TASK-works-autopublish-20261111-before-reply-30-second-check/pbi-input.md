# PBI Input

## Task

- task-id: TASK-works-autopublish-20261111-before-reply-30-second-check
- title: 「返信前の30秒見直し」を新規公開
- owner: gpt-6-luna / max
- date: 2026-11-11

## Request Summary

- 依頼の要約: この実行で制作・検証に成功した新規ワーク1件を、隔離worktreeでサイト掲載し、レビュー・CI・Pages・公開ページまで確認する。
- 背景: `docs/works-publishing.md` は「Coco毎日の修復ワーク」の自動公開設定更新後に同じ実行で完成した新規成果物に限り、制作検証成功後のLunaによるサイト工程を継続承認している。対象は `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-11_2223_before-reply-30-second-check/site-work.json` の1件。
- 再開承認（2026-11-12 JST）: 前回 `npm run test:works` がMarkdown実数31・固定期待30で失敗したため、同じ対象1件の公開完了に限り、`scripts/work-import.test.mjs` の固定件数とテスト名だけを30から31へ最小修正する。修正前にこのPlanGateをGLM-5.3で再レビューする。既存worktree/branchを継続し、テストが成功した後にのみ後続ゲートへ進む。

## Goal

- 達成したいこと: `before-reply-30-second-check` を本人の声・研究限界・選べる行動を保った公開ワークとして追加する。
- 完了条件: PC・モバイルの下書きプレビュー、4点の読者向けコピー確認、全必須テスト、GLM-5.3レビュー、PR/CI/merge/Pages、公開一覧・詳細・レビュー往復リンク・OG画像・HTML参照画像の本番確認が通る。

## Scope

- 含める:
  - 原本7ファイルのSHA、site-work項目、PNG寸法、書誌・参照レビュー・slugの照合
  - 既存import手順で対象Markdown/PNGを追加し、プレビュー確認後に対象Markdownの`published`だけをtrueにする
  - 初回失敗を解消するため`src/content/works/`の現行Markdown実数に合わせ、`scripts/work-import.test.mjs`の単一固定件数テスト名と期待値だけを30から31へ変更する
  - 本タスクのPlanGate、status、日次記録
  - 指定verify、Claudeレビュー、PR、CI、squash merge、Pagesおよび公開表示確認
- 含めない:
  - 画像再生成・編集、X/Instagram投稿、過去納品の遡及公開
  - 元main worktreeや既存の未追跡・変更ファイル、他の既存ワーク・テストの変更
  - 固定件数テストの指定箇所以外、CI runner、依存設定、テスト実装の変更

## Constraints

- 既存運用との整合: 最新`origin/main`から新規隔離worktreeを使う。元mainは複数の既存変更と未追跡物があるため触れない。初期状態は`published:false`。失敗したゲートから先へ進まない。
- 納期 / 優先度: この実行中に完了できる範囲。公開成功とサイト工程失敗は区別する。
- 触ってよいファイルや領域: `src/content/works/before-reply-30-second-check.md`、`src/assets/works/before-reply-30-second-check.png`、`scripts/work-import.test.mjs`の固定件数テスト名・期待値1箇所、本タスクの`docs/tasks/TASK-works-autopublish-20261111-before-reply-30-second-check/`のみ。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/works-publishing.md`、`docs/brand/reading-with-coco-{brand-strategy,content-guidelines,ai-operations}.md`、`docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: 関連レビューIDは`sekai-wa-naze-jigoku-ni-naru-noka`、書名は「世界はなぜ地獄になるのか」。日本語の30秒短縮版自体は未検証と表示する。選択肢にはメモ、閉じる、休む、相談、終了を含める。
- 前回停止点: test:works 34/35。`scripts/work-import.test.mjs`がMarkdown全件を30と期待したが実数31だった。再開時は指定テストのラベル・期待値のみ31にし、`published:false`から公開ゲートをやり直す。
- 未確定事項: CI・本番デプロイ結果は各工程完了まで未確定。
