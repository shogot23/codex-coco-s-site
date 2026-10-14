# PBI Input

## Task

- task-id: TASK-works-autopublish-20261014-tomorrow-on-paper-note-3min
- title: 「3分の明日を預けるメモ」をサイトへ掲載
- owner: gpt-6-luna / max、単一writer
- date: 2026-10-14

## Request Summary

- 依頼の要約: 今回新規に制作が完全成功したワーク1件だけを、隔離worktreeで取り込み、下書きプレビュー、検証、PR、squash merge、GitHub Pagesの公開確認まで行う。
- 背景: 「Coco毎日の修復ワーク」の継続承認は、設定更新後に新規制作された完全成功分のサイト工程に限る。

## Goal

- 達成したいこと: `tomorrow-on-paper-note-3min` を既存のワーク導線へ追加する。
- 完了条件: 納品原本とのbyte一致を維持し、関連レビューと本のタイトルを確かめる。プレビュー、必要なテスト、Claudeレビュー、CI、Pages公開を確認し、公開一覧・詳細・レビュー相互リンク・共有画像・HTML内画像をHTTPとブラウザで確かめる。

## Scope

- 含める: `src/content/works/tomorrow-on-paper-note-3min.md`、`src/assets/works/tomorrow-on-paper-note-3min.png`、本タスクのPlanGate記録。
- 条件付きで含める: `npm run test:works`が今回追加した1件だけを理由に既存の固定件数検査で失敗した場合、`scripts/work-import.test.mjs`の期待件数を21から22へ更新する。対象は件数リテラルのみとし、reader-copy guardの検査条件やロジックは変えない。
- 含めない: 他の納品物、既存記事、トップページの構成変更、X・Instagram投稿、画像の生成・編集。

## Constraints

- 既存運用との整合: `docs/works-publishing.md` とブランド文書に従い、dry-run後に`published:false`で取り込み、PC・モバイルのプレビューを確認して対象記事だけを公開する。
- 納期 / 優先度: 2026-10-14の実行内で完了する。
- 触ってよいファイルや領域: 最新`origin/main`から作成した`codex/tomorrow-on-paper-note-3min`の隔離worktree内に限る。制作納品folderは読み取り専用。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/works-publishing.md`、`docs/brand/`配下の3文書、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md`。
- 関連 issue / PR: なし。

## Notes

- 領域固有メモ: 納品JSON SHA-256 `79baa2e267fafbbe64ac5bfeefe4dbce57667cb09fed31aa778061ecf1032489`、画像SHA-256 `1038b8e7a5dad8297008baaeba07c5b8f999abcb58536ff7b079639422c85849`。画像は1080×1350。`relatedReview`は`jinsei-ga-kawaru-saikyo-no-shukan`、`bookTitle`は「人生が変わる最強の習慣」。
- 未確定事項: 公開URLとPages run IDはデプロイ後に記録する。
