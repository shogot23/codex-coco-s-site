# PBI Input

## Task

- task-id: TASK-works-autopublish-20261113-meeting-place-second-option-3min
- title: 『地図と拳』「集合場所を見直す3分メモ」のサイト公開
- owner: gpt-6-luna / max（サイト工程の単独更新担当）
- date: 2026-11-13
- resumed: 2026-11-14（ユーザーの明示指示「作業再開してください」）

## Request Summary

- 依頼: 制作後のサイト工程への継続承認に基づき、新規制作物1件だけを公開する。11/14、ユーザーが明示的に作業再開を指示し、停止した固定件数テストの最小修正・再実行と、その後の元の公開契約の続行を承認した。
- 背景: 完全成功した7ファイル納品。slug `meeting-place-second-option-3min`、関連レビュー `chizu-to-ken`。
- 前回の停止: `npm run test:works` は34/35成功。`scripts/work-import.test.mjs` の「all 31 current work Markdown files pass the narrow reader-copy guard」で期待31・実数32となった。テスト検査本体は通過している。

## Goal

- 達成: 下書きプレビュー、本文レビュー、必須検証、Claude review、PR/CI/merge、Pages実公開確認を順に完了する。
- 完了条件: 一覧・詳細・関連レビュー・共有画像が公開URLから確認できる。HTML参照先の480/1080 WebPとOG画像をcache bypassで取得し、対応する`dist/works/media/meeting-place-second-option-3min/{480,1080}.webp`とbyte/SHA照合できる。

## Scope

- 含める: 対象work Markdownと同名PNG、PlanGate 3文書とstatus、当日のworklog、`scripts/work-import.test.mjs` の当該固定件数テスト名と期待値だけを31から32へ更新する最小修正、公開に必要なPR差分。
- 含めない: 他作品、UI・共通コード・依存・他テスト・テスト検査本体・workflowの変更、X/Instagram投稿。

## Constraints

- 継続承認は `docs/works-publishing.md` の定期制作新規成功分に限る。公開前プレビューを通し、対象Markdownの `published` だけを `true` にする。
- 固定件数テストの最小修正は11/14のユーザー再開指示に基づく。テスト名と `names.length` の期待値31→32以外は変更しない。独立確認とClaudeレビューの合格後に限り編集・再実行する。
- 元のdirty main、納品物、studio jobを変更しない。新規隔離worktreeのみで作業する。
- 衝突・不一致・レビュー/テスト/CI/Deploy失敗時は後続へ進まず、理由と再開地点を記録する。

## References

- `docs/works-publishing.md`、`docs/parallel-dev-config.md`、ブランド戦略/コンテンツ指針/AI運用文書。
- 納品: `inbox/work/2026-11-13_2226_meeting-place-second-option-3min/site-work.json`。制作記録: studio job `20261113-coco-repair-work-20261113`。
