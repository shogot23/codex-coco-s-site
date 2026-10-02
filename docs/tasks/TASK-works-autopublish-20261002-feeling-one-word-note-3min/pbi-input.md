# PBI input: 3-minute one-word feeling note publication

## Task

- task-id: TASK-works-autopublish-20261002-feeling-one-word-note-3min
- title: Publish feeling-one-word-note-3min
- owner: gpt-6-luna/max (single writer)
- date: 2026-10-02

## Request Summary

- 依頼の要約: 制作ゲートをすべて通過した新規ワークを、サイト標準の取り込み・非公開プレビュー・検証・Claudeレビュー・PR・CI・squash merge・Pages公開確認まで進める。
- 背景: docs/works-publishing.md に定めた自動公開の継続承認が、この実行で新規完成した成果物に適用される。

## Goal

- 達成したいこと: feeling-one-word-note-3min を既存の公開レビュー saikyo-no-komyuryoku-no-tsukurikata に正しく結び、内容と画像を公開する。
- 完了条件: PC・モバイルの非公開preview、必須コマンド、Claude GLM-5.3 gate、CI、squash merge、GitHub Pages上の一覧・詳細・関連レビュー・参照画像の確認がすべて成功する。

## Scope

- 含める: importerが作る src/content/works/feeling-one-word-note-3min.md と src/assets/works/feeling-one-word-note-3min.png、このtaskのPBI/plan/cases/status/daily記録。
- 含めない: inbox納品7ファイル、制作job/history、既存レビュー、既存ページ/UI、他のinbox成果物、X/Instagram投稿。

## Constraints

- 既存運用との整合: docs/works-publishing.md とブランド文書を守り、最初は published:false でPC・モバイル確認後、このentryだけを公開する。
- 納期 / 優先度: 今回の自動化run内に完了。失敗した確認があれば公開へ進まず止める。
- 触ってよいファイルや領域: 最新 origin/main から作った隔離worktree内の上記targetとtask記録のみ。元checkout、制作job、inbox納品物は読み取り専用。

## References

- 関連ドキュメント: AGENTS.md, docs/parallel-dev-config.md, docs/works-publishing.md, docs/brand/reading-with-coco-brand-strategy.md, docs/brand/reading-with-coco-content-guidelines.md, docs/brand/reading-with-coco-ai-operations.md
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: 会話後の悩みから始め、本の問いと一語の観察、会話の出来だけで自分を採点しない見方、話す・相談する・休む・ここで終える選択肢を保つ。研究介入の効果は転用せず「この短縮ワーク自体は未検証」と明示する。
- 未確定事項: なし。衝突や表示不一致が出たら停止して親へ報告する。
