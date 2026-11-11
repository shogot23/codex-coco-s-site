# Plan

## Task
- task-id: TASK-works-autopublish-20261109-before-ai-one-line-3min
- related pbi: `docs/tasks/TASK-works-autopublish-20261109-before-ai-one-line-3min/pbi-input.md`

## Intent
- 成功済みの「AIを開く前の3分メモ」を既存の公開レビューへつなぎ、読者が問いと選べる行動を持ち帰れるワークとして公開する。
- visual thesis: 既存の本・ココちゃん・学びのページ構成を使い、開いた本と閉じた端末の間で考える情景を伝える。
- content plan: 困りごと、見方を置く余地、研究と翻案の範囲、3段階の手順、休む/相談/終了を含む選択肢を示す。
- interaction thesis: 一覧から詳細へ進み、試す・休む・相談する・終えるを読者が選べる。

## Scope Declaration
- 変更対象: `src/content/works/before-ai-one-line-3min.md`（`published:true`を維持）、`src/assets/works/before-ai-one-line-3min.png`（既存納品物をそのまま追加）、`scripts/work-import.test.mjs` の固定件数テスト名と件数期待値だけ（30→31）、`tests/e2e/works.spec.ts` の購入URL抽出だけ、本taskの5記録（dailyは完了時作成）。
- テストの最小差分は対象テスト名を `all 30 current work Markdown files pass the narrow reader-copy guard` から `all 31 current work Markdown files pass the narrow reader-copy guard` にし、同じテストの `assert.equal(names.length, 30)` を `assert.equal(names.length, 31)` にすること。ループやその他のテストコードには触れない。
- E2E修正は `works.spec.ts` のfrontmatter読取だけに限定する。既存の複数行 `url:` 抽出を残し、1行JSONの `purchaseLinks` があれば `JSON.parse` して `https://af.moshimo.com/` URLだけ期待リストへ追加する。これはDOM selectorと既存抽出のprefixを保つ。存在確認、actual URLとの一致、`target` / `rel` 属性、開示文の既存アサーションは変更しない。既存レビュー本文、利用者向け表示、依存、CIは変更しない。
- 変更しない: 元main/inbox/history、関連レビュー、既存作品、共通UI、依存/CI設定、SNS投稿。
- base: `origin/main` `f83dc0647ccc05d3533adb70c43d0068cef89040`。branch: `codex/works-before-ai-one-line-3min`。

## Implementation Steps
1. 7点SHA・history SHA・レビュー名/公開状態・書誌・taxonomy・slug衝突を照合。絶対パスのsite-work.jsonをdry-runし、成功後importして下書き状態を確認。
2. localhost:4327でPC/モバイルの一覧・詳細・画像・手順・問い・出典・本への相互リンクを目視し、プレビューHTMLのrobots metaも確認。困りごと→見方の余地→選べる一歩を一覧/本文/振り返りで確認する。
3. 今回承認された範囲で、前回失敗した固定件数テストの名前・期待値だけを30から31へ変更する。仕様更新のClaudeレビューでblocking 0を確認するまではテストファイルを変更しない。
4. `npm run test:works` を実行し、失敗時は停止する。通過後に他の指定検証と実装後Claude gateを完了。差分確認後にPR/CI/merge/Pagesを進め、実公開URLのrobots metaからnoindexが外れたことも検証する。
5. `verify:frontend` の購入URL抽出に関する再発時は、承認したテストファイル内だけで診断し、既存形式と1行JSON形式の両方から `https://af.moshimo.com/` URLを抽出する。リンクと外部リンク安全属性のアサーションは維持する。

## Risks And Guards
- 書誌・原稿・画像の不一致、衝突、プレビュー/レビュー/CI/Pages失敗時は停止する。固定件数の変更は承認済み30→31の一度に限り、その後も件数テストが失敗した場合は期待値を追加修正せず報告する。
- X/Instagram投稿と画像再生成は行わない。元inboxとhistoryは各段階でSHAを再確認する。

## Verification
- `npm run works:import -- <absolute site-work.json> --dry-run`、通常import、`npm run works:preview`。
- `npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist`。
- PC/モバイル、公開HTML、noindex解除、相互リンク、OG、HTML参照WebPを確認。

## Approval
- approver: ユーザー（2026-11-09の継続承認と、2026-11-11「では公開も含めて最後まで完了させてください」。テスト修正の具体範囲はrootから受領した明示承認）
- E2E追加承認: rootからの再開指示（購入URL抽出だけを複数行・1行JSON両対応にする。既存レビューfrontmatter、公開表示、依存、CIを変更しない）。
- reviewer: Claude review gate（実モデル `glm-5.3`）
- status: approved
- note: 今回の追加範囲は固定件数テスト名・期待値の30→31と、root承認済みのE2E購入URL抽出（複数行・1行JSON両対応）に限る。各仕様更新のClaudeレビューが `ok:true` / blocking 0になるまで該当ファイルを変更しない。
