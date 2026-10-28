# PBI Input

## Task

- task-id: TASK-works-autopublish-20261028-choose-one-feed-3min
- title: 『列』「3分の表示を一つ選び直す」を公開
- owner: gpt-6-luna/max
- date: 2026-10-28

## Request Summary

- 依頼の要約: 新規制作が全gateを通過した1件だけを最新 `origin/main` の隔離worktreeへ取り込み、確認後に公開する。
- 背景: 読者がSNSで比較して苦しくなる日に、表示との距離と終了方法を自分で選べる3分ワークをサイトへ届ける。

## Goal

- 達成したいこと: slug `choose-one-feed-3min`、related review `retsu` の公開ページと一覧カードを本番へ届ける。
- 完了条件: preview、規定検証、Claude review、PR/CI/squash merge、Pagesと本番HTML・関連画像の実確認がそろう。

## Scope

- 含める: 取り込みで生成される当該work Markdown/PNG、必要な既存件数テストの最小期待値更新、task記録。
- 含めない: 納品7ファイル・history・正本・元main、既存workの変更、X/Instagram投稿、画像生成/再生成、他の未公開品。

## Constraints

- 既存運用との整合: `docs/works-publishing.md`、ブランド4点チェック、slug維持、納品JSONの `published:false` を維持。
- 納期 / 優先度: 完全な本番確認まで一続きに実施。
- 触ってよいファイルや領域: この隔離worktreeと指定task記録。納品・制作job・元mainは読み取り専用。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/works-publishing.md`、3つのbrand文書、design doctrine、frontend playbook。
- 関連 issue / PR: なし。

## Notes

- 領域固有メモ: 正本の7 SHAと3 manifestを照合済み。制作 gate raw artifacts は成功 phase のみ有効として照合済み。
- 未確定事項: なし。
