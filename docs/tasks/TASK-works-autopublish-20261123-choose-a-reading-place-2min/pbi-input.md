# PBI Input

## Task

- task-id: TASK-works-autopublish-20261123-choose-a-reading-place-2min
- title: 『積読こそが完全な読書術である』「読むところを選ぶ2分」のサイト公開
- owner: gpt-6-luna / max（単一writer）
- date: 2026-11-24

## Request Summary

- 依頼の要約: 本チャットでユーザーが「最後までやりきってください」「作業再開してください」と明示したため、2026-11-23に制作が成功した新規ワーク1件のサイト工程を再開する。
- 背景: 画像・原稿・制作時レビューは完了済み。サイト取り込み、下書きプレビュー、公開、PR、Pages確認が未実施。

## Goal

- 達成したいこと: 「読むところを選ぶ2分」を読者向けページとして公開し、関連レビューと画像を含む実ページを検証する。
- 完了条件: 対象1件だけを下書きプレビューで確認後に公開し、必要な検証・Claudeレビュー・PR・CI・squash merge・Pagesデプロイと公開URLを確認する。完了記録に確認済み事項と未確認事項を残す。

## Scope

- 含める:
  - 入力: `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-23_2251_choose-a-reading-place-2min/site-work.json` と同納品フォルダ内の画像。
  - `src/content/works/choose-a-reading-place-2min.md` と `src/assets/works/choose-a-reading-place-2min.png` の追加。プレビュー確認後、対象記事の `published` だけを `true` にする。
  - このPlanGateの `pbi-input.md` / `plan.md` / `test-cases.md` / `status.md`、および `daily-2026-11-24.md`。
  - 今回認める最小テスト整合: `scripts/work-import.test.mjs` の固定テスト名と期待値を、現在のワークMarkdown件数に合わせて34から35へ変更する。根拠はユーザーの最新再開指示。
  - PC・モバイルのプレビュー確認、4点の公開コピー確認、ワーク検証、Claudeレビュー、PR、CI、Pagesと公開成果物の検証。
- 含めない:
  - 元のdirty worktree、制作納品物、既存公開記事、別ワークの変更。
  - 画像の修正・再生成、コードやテストの範囲外変更、今回認めた2行以外のテスト変更。
  - X・Instagramへの投稿。

## Constraints

- 既存運用との整合: `docs/works-publishing.md` の自動公開条件と停止条件に従う。承認対象は今回の新規成功分1件のみ。
- 納期 / 優先度: ユーザーが再開を明示したため、レビュー・検証・公開確認まで継続する。
- 触ってよいファイルや領域: `/private/tmp/coco-site-choose-a-reading-place-2min-20261124` の専用branchだけ。元repoの作業ファイルは変更しない。入力JSON・画像は読み取り専用。
- 参照照合: 7点の納品ハッシュは引継ぎ記録と一致。画像SHA-256は `f7b54de68fc79fc3a47cf11ba8a30c88f03bdbe773d42607bf857becfb984e02`。関連レビュー `tsundoku-dokushojutsu` の書名は「積読こそが完全な読書術である」で、公開済み。
- 停止条件: 入力・参照・分類IDの不一致、slug/画像衝突、プレビュー・テスト・レビュー・CI・デプロイの失敗時は次工程へ進まない。今回確認した34/35の固定件数差だけは最新再開指示を根拠に最小修正を行う。テスト名と期待値の2行以外のテスト変更や、別の失敗は停止して報告する。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-core.md`、`docs/parallel-dev-config.md`、`docs/works-publishing.md`、ブランド3文書、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md`、`/Users/shogo/.agents/skills/claude-review-gate/SKILL.md`、`/Users/shogo/.agents/skills/pr-merge/SKILL.md`。7点の照合元: `/Users/shogo/Projects/coco-book-infographic-studio/jobs/20261123-Coco修復ワーク-20261123/task-record/site-handoff.md`。
- 関連 issue / PR: なし。新規PRを作成予定。

## Notes

- 領域固有メモ: 原著研究は反復選択課題を扱う。今回の目次から選ぶ単回2分版は条件が異なり、この短縮ワーク自体は未検証と明記する。
- 未確定事項: PR番号・URL、merge SHA、Pagesの公開URLと画像配信結果は工程完了後に記録する。
