# PBI Input

## Task
- task-id: TASK-works-autopublish-20261109-before-ai-one-line-3min
- title: 「AIを開く前の3分メモ」をサイト公開
- owner: gpt-6-luna（隔離worktreeの単一writer）
- date: 2026-11-09
- review classification: publish/dev-critical（公開ワークの追加と公開切替）

## Request Summary
- 制作検証を通過した新規ワークを、既存レビュー「生成AIで世界はこう変わる」につないで公開する。
- 継続承認の根拠は、2026-11-09のユーザー承認と `docs/works-publishing.md`。
- 2026-11-11にユーザーから「では公開も含めて最後まで完了させてください」と明示された。今回の再開では公開完遂に加え、前回停止原因に限定して `scripts/work-import.test.mjs` の固定件数テスト名・期待値を30から31へ直すことが承認されている。
- 再開後の `verify:frontend` では、今回の作品に限りE2Eの購入URL抽出が既存レビューの1行JSON形式を拾えず失敗した。rootから、E2Eの期待URL抽出だけで既存の複数行形式と1行JSON形式の両方を扱う修正が追加承認された。

## Goal
- 公開一覧・詳細・関連レビュー・画像を確認できる状態まで届ける。
- 完了条件は、下書きプレビュー、公開前レビュー、検証、PR/CI/Pages、キャッシュを避けた実公開確認の合格。

## Scope
- 含める: 新しいワークMarkdownと既存納品PNG、固定件数テスト名・期待値だけの最小修正、専用PlanGate/status/daily記録。
- テスト修正は `scripts/work-import.test.mjs` の対象テスト名と同テストの件数期待値 `30` を `31` にする。ループ、テスト範囲、他の期待値・テスト・テスト設定は変更しない。
- E2E修正は `tests/e2e/works.spec.ts` の購入URL抽出だけ。既存の複数行 `url:` 抽出を維持し、1行JSONの `purchaseLinks` を `JSON.parse` して、DOMと既存抽出と同じ `https://af.moshimo.com/` URLだけ期待値に加える。購入リンクの存在・URL一致・属性・開示文の各アサーションは維持する。
- E2E失敗対応はrootの再開承認によるテスト限定の追加範囲。既存レビューfrontmatter、表示、依存、CIは変更しない。
- 含めない: 元inbox・`history.json`、既存レビュー、他inbox、画像再生成、X/Instagram投稿、CI設定変更。

## Constraints
- 作業場所は最新 `origin/main` から作った隔離worktree。元のdirtyなmainには触れない。
- 7点の納品SHAとhistory SHAを保ち、対象作品の公開前プレビュー確認後に `published:true` とする。
- 失敗・衝突・固定件数テスト失敗時は次工程へ進まず証跡を残す。
- 承認範囲の固定件数修正後も `npm run test:works` が失敗した場合、追加変更せず停止する。
- E2E修正後に失敗が残る場合は、承認された抽出処理内の原因を診断し、関連レビューやUI、他テストへ範囲を広げない。

## References
- `docs/works-publishing.md`、ブランド3文書、`docs/parallel-dev-config.md`。
- 制作job `/Users/shogo/Projects/coco-book-infographic-studio/jobs/20261109-coco-repair-work-20261109`。
- 再開承認: ユーザーの2026-11-11メッセージと、rootから受領した固定件数テスト名・期待値30→31だけの承認範囲。
- E2E追加承認: rootから受領した `tests/e2e/works.spec.ts` の購入URL抽出対応。既存の複数行URL抽出と各アサーションを維持し、1行JSON `purchaseLinks` の解析を追加する範囲。
