# Plan

## Task

- task-id: TASK-works-autopublish-20261118-notice-the-conditions-2min
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 既存デザインの標準worksテンプレートに今回新規制作した1件を掲載する。固定件数テストの名称と期待件数だけを、確認済みの34件へ最小更新する。
- なぜ今やるか: 納品7点・研究と画像検証・history追記が完了した新規制作分に限り、ユーザーは制作後サイト工程を継続承認している。2026-11-19の明示指示により、前回停止した工程を再開する。
- visual thesis: 既存作品ページの余白とタイポグラフィを保ち、開いた本から続く納品画像の風景を本文へつなぐ。
- content plan: 小さな失敗後の自己批判を入口にし、本からの問い、条件を一つ見る3手順、研究の限界、休む/相談/終了を含む選択肢を並べる。
- interaction thesis: 既存一覧・詳細・レビュー導線を使い、閲覧者が読み進めるか、条件を書くか、相談・休息・終了を自分で選べる。

## Scope Declaration

- 変更対象ファイル: `src/content/works/notice-the-conditions-2min.md`; `src/assets/works/notice-the-conditions-2min.png`; `scripts/work-import.test.mjs` の当該テスト名・assertion; `docs/tasks/TASK-works-autopublish-20261118-notice-the-conditions-2min/` のPlanGateと実施記録。
- 入力のみ: `/Users/shogo/Projects/coco-book-infographic-studio/jobs/20261118-Coco修復ワーク-20261118/final/` の7点、および納品フォルダ `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-18_2241_notice-the-conditions-2min/`。7点を比較し、サイト側へ入力を取り込む。納品元や元repoを変更しない。
- 変更しないもの: 他作品、他レビュー、taxonomy、shared UI、CI/runner/config、依存関係、`history.json`、X/Instagram、生成画像。固定件数以外のテスト修理はしない。slugや本文を変更して別成果物にしない。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

本作業は単一writerで実施する。

## Implementation Steps

1. base SHA `bf14198dcffc65d0ef3211109795b742002c88ce`、元worktree未変更、納品7点のSHA/cmp、`published:false`、書誌/レビュー/taxonomy ID、slug/画像衝突を再確認する。不一致や衝突があれば停止する。
2. 作品Markdownの実数を確認する。最新mainの固定期待数は33件、今回の新規作品を含む実数は34件であることを確認し、計画のClaudeレビュー後に当該テスト名とassertionだけを34へ合わせる。このテストは全Markdownファイルを数え、公開状態には依存しない。
3. 前回成功したdry-run/通常importの出力がこの隔離worktreeに保全されていることを再確認し、現行記事の全frontmatter項目と本文、画像SHAが納品 `site-work.json` / PNGと一致することを確認する。既存slugへ再importしない。
4. `npm run works:preview` をlocalhost:4327だけで起動し、PC/モバイルで一覧・詳細・画像・3手順・出典・レビュー導線を確認する。読者向けコピー4点（本人視点、AI監査/第三者視点なし、本と経験の根拠、引用/翻案と研究限界）を人が確認する。未解決なら停止する。
5. 承認済みのこの新規作品だけ `published: true` にする。slugを変えず、本文・関連レビュー・画像・出典を再確認する。
6. `npm run test:works` → `npm run verify:frontend` → `npm run check:works-dist` を実行する。固定件数修正後の失敗を含め、必須検証に失敗した場合は対象をfalseに戻し、scopeを広げずに原因を記録する。
7. 差分をClaude `glm-5.3` でレビューし、blocking 0・全必須phase完了を確認する。必要な最小修正があれば再検証・再レビューする。
8. 変更範囲と状態を再確認してcommit/push/PRを行う。CI、PR状態、mergeable、差分を確認し、merge前レビュー後にsquash mergeする。
9. Pages成功後にキャッシュを避けて公開一覧・詳細・レビュー相互リンクとHTML参照480/1080 WebPを検証し、distと公開画像のbyte証跡を記録する。最後にstatus/dailyを更新する。

## Risks And Guards

- 想定リスク: 納品元差分、既存記事/asset衝突、関連レビュー非公開または本名不一致、taxonomy不一致、読者向けコピーの出所逸脱、プレビュー崩れ、固定件数test失敗、Claude/CI/Pages未完了。
- 回避策: PlanGate後も各gateの証拠を保存し、一つでも失敗したら公開を止め、対象publishedをfalseへ戻す。公開完了はPagesと公開URLを独立確認できた場合だけ報告する。
- scope 外に見つけた事項の扱い: 触らず記録して停止または別タスク候補として報告する。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-18_2241_notice-the-conditions-2min/site-work.json --dry-run`
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-18_2241_notice-the-conditions-2min/site-work.json`
  - `npm run works:preview`
  - `npm run test:works`（最新33件に今回分を加えた実数34件へ、当該固定件数だけ変更後）
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: Desktop/mobile preview; 4点の本人視点チェック; Claude arch/diff/cross-check as required by diff size; PR checks; Pages published HTML and optimized image byte proof.

## Approval

- approver: Claude Code review gate (`glm-5.3`) for this publish/dev-critical plan
- status: approved on 2026-11-19 after the continuation arch and final diff review returned `ok: true` with zero blocking issues
- note: reviews used only public copy and a generalized one-item site design with the fixed-count change. Actual model was `glm-5.3`, StructuredOutput succeeded after schema-repair dispatches, there was no fallback or rate limit, and the process exited 0. Advisories note contextual wording variations among the action options and a repeated book-connection paragraph in the rendered page; this round preserves the frozen production copy and does not change delivery text. The count guard enumerates all Markdown files regardless of `published`; the expected-count update and this work's published state will ship in one change set. Internal PlanGate contents, local paths, and work history were not sent.
