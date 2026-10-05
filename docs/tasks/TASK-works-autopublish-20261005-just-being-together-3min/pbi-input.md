# PBI Input: 「3分のただ一緒にいる時間」サイト公開

## Task

- task-id: TASK-works-autopublish-20261005-just-being-together-3min
- title: Publish just-being-together-3min
- owner: gpt-6-luna/max (single writer)
- date: 2026-10-05

## Request Summary

- 依頼の要約: 今回新しく制作され、全production gateを通過した「3分のただ一緒にいる時間」を、既存の取り込み手順でサイトへ載せ、preview、Claude review、PR、CI、squash merge、Pages確認まで行う。
- 背景: `docs/works-publishing.md` が定める自動公開の継続承認は、自動公開設定の更新後に完成した新規成果物だけを対象とする。今回の成果物は2026-10-05に新規完成した。

## Goal

- 達成したいこと: `just-being-together-3min` を公開レビュー `tobari-no-mukou-kokubun-wakabayashi` と結び、ワーク一覧・詳細・関連レビューの導線と画像を公開する。
- 完了条件: 納品物のSHA/byte一致とproduction review gateを確認し、dry-run/import、noindex previewでPC・モバイルを確認。対象だけを公開し、必須コマンド、Claude review、PR CI、squash merge、Pagesの一覧・詳細・相互リンク・HTML参照画像の公開確認を完了する。

## Scope

- 含める: `src/content/works/just-being-together-3min.md`、`src/assets/works/just-being-together-3min.png`、このtaskのPBI/plan/test-cases/status/daily記録。
- 含めない: inboxの7納品ファイルと`site-work.json`、制作job/history、既存レビュー、既存UI・taxonomy、他のinbox成果物、X/Instagram投稿、画像の生成・修正。

## Constraints

- 既存運用との整合: 受領JSONを編集せず、最初は`published:false`でimportする。安全なpreview確認後に対象Markdownの`published`だけをtrueへ変更する。研究結果を3分版へ転用せず、「この短縮ワーク自体は未検証」と明示する。
- 納期 / 優先度: 今回のサイト工程内に完了する。衝突、不一致、preview・review・CI・deploy失敗時は公開の次段階へ進まず親へ報告する。
- 触ってよいファイルや領域: 2026-10-05時点の`origin/main`から作成した隔離worktree内の対象Markdown・画像と上記task記録。元checkout、制作job/history、inbox納品物は読み取り専用。

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/works-publishing.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`, `docs/reading-with-coco-design-doctrine.md`, `docs/frontend-playbook.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: 「次の用事を考え、誰かといる時間が通り過ぎる」という悩みから入り、公開レビューで受け取った問いを日常向けに翻案する。犬猫の自発的な接近、安全な中止条件、続ける・休む・ここで終える選択を保つ。
- 未確定事項: なし。既存slug/image、参照先の書名・公開状態、taxonomy、import結果の不一致があれば停止する。
