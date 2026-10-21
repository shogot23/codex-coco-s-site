# PBI Input

## Task

- task-id: TASK-works-autopublish-20261021-one-scene-sensory-sketch-3min
- title: 「3分の一場面スケッチ」を新規ワークとして1件公開する
- owner: gpt-6-luna
- date: 2026-10-21

## Request Summary

- 依頼の要約: 今回新規制作した「3分の一場面スケッチ」だけを最新 origin/main からの隔離 worktree に取り込み、確認後に PR・squash merge・GitHub Pages の公開 URL まで検証する。
- 背景: 制作完了とサイト公開完了を分け、既存成果物と元の dirty checkout を守る必要がある。

## Goal

- 達成したいこと: slug `one-scene-sensory-sketch-3min` の記事と画像をサイトへ追加し、実デプロイ後の一覧・詳細・関連レビュー・画像を確認する。
- 完了条件: source package と SHA が一致し、draft preview と意味確認が通り、対象1件のみ公開状態になり、必須テスト・Claude review・PR CI・Pages の実 URL 検証が完了する。

## Scope

- 含める: 指定された7ファイルを読み取り専用で使うこと、PlanGate記録、指定 importer による記事・画像の追加、対象記事のみ published=true、必須検証、レビュー、PR、merge、Pages確認。
- 含めない: inbox 原本の編集、既存成果物や他の PR（#214 を含む）の変更、X/Instagram投稿、追加画像の生成、サイト UI や依存関係の変更。

## Constraints

- 既存運用との整合: `docs/works-publishing.md`、4点の公開声チェック、`npm run works:import` の手順を守る。関連レビューは `kyomo-kissaten-yori-sato-mitsuharu`、本名は「今日も、喫茶店より」。
- 納期 / 優先度: 制作成功を確認済みの今回実行内で継続する。
- 触ってよいファイルや領域: 新規 `docs/tasks/TASK-works-autopublish-20261021-one-scene-sensory-sketch-3min/` 内の PlanGate・status/daily・開始時 status と `production-verification.json` 証跡、取り込みで新規作成される `src/content/works/one-scene-sensory-sketch-3min.md` と `src/assets/works/one-scene-sensory-sketch-3min.png`、既存 `scripts/work-import.test.mjs` の作品件数期待値1か所だけ（新規Markdown追加後も全作品を検査するため）。記事公開後は新規記事の `published` だけを変更する。

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-core.md`, `docs/parallel-dev-config.md`, `docs/works-publishing.md`, ブランド3文書、design doctrine、frontend playbook、Claude review gate、PR merge skill。
- 関連 issue / PR: なし。既存 PR #214 は対象外。

## Notes

- 領域固有メモ: source package は `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-21_2157_one-scene-sensory-sketch-3min`。7件の指定 SHA-256 は受領時に全件一致した。原本 `site-work.json` は `published:false` のまま保護する。
- 未確定事項: 作品を取り込んだ状態の最初の `npm run test:works` で既存テストの期待値23と実ファイル数24が不一致になった。新規記事自体のコピー検査は通過しており、既存全作品を回すガードの件数期待値だけ24へ更新する。既存の本・レビューと taxonomy の一致、slug / 画像衝突は isolated worktree 内で再確認済み。
- 承認根拠: 今回の人間ユーザー指示は、制作が完全成功した場合の Luna サイト工程、CI成功後の squash merge、Pages 公開 URL 確認までを明示している。`docs/works-publishing.md` の定期制作に関する継続承認条件も満たす。
