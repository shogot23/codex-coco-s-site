# Plan

## Task
- task-id: TASK-works-autopublish-20261117-choose-a-revisit-time-3min
- related pbi: `pbi-input.md`

## Intent
- 何を変えるか: 既存の取り込み手順で対象ワークを追加し、確認後に `published` だけをtrueにする。
- なぜ今やるか: 今回新規に完成した制作物へのサイト公開継続承認が適用される。
- visual thesis: 納品画像と既存ワーク詳細の静かなレイアウトをそのまま使う。
- content plan: 仕事の先行きという心配から、答えを保留する見方と一つの見直し日時へつなぐ。
- interaction thesis: 一覧から詳細へ進み、3手順と関連レビューを読み、休む・相談する・終了を選べる。

## Scope Declaration
- 変更対象: `src/content/works/choose-a-revisit-time-3min.md`、既納品SHAを維持する `src/assets/works/choose-a-revisit-time-3min.png`、固定件数テスト名と期待値のみの `scripts/work-import.test.mjs`、本taskのPlanGate/status/daily記録。
- 変更しないもの: 既存記事・import実装・他のinbox納品・X/Instagram・元worktree。

## Implementation Steps
1. 最新baseでslug/画像の衝突と納品SHAを確認し、import dry-runと通常importを行う。
2. 非公開previewをPC・mobileで確認し、ブランド4点と本文・画像・関連レビューを照合する。
3. 観測済み固定件数失敗の最小修正をPBI・plan・test-casesへ追加し、GLM-5.3 PlanGate reviewを通す。
4. 承認後、`scripts/work-import.test.mjs` のテスト名と期待値だけを32から33へ更新し、最初に `npm run test:works` を実行する。失敗時は後続工程へ進まない。
5. すべての公開前確認が成功した場合だけ対象の `published` をtrueにし、`npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist` とClaude reviewを通す。
6. 差分を確認してPRを作り、CI・merge・Pagesの公開証拠を確認する。

## Risks And Guards
- 想定リスク: 本人の声・研究の限界・関連書籍導線・画像の取り違え。
- 回避策: 原稿と公開レビューを照合し、限定フレーズ検査、4点チェック、desktop/mobile preview、distとPagesの画像照合を行う。
- 固定件数テストは最新baseに含まれるMarkdown数33と名前を一致させる。変更は期待値・テスト名に限定し、他のテスト挙動は変えない。
- scope外の問題は直さず、停止して報告する。

## Verification
- `npm run works:import -- <absolute-site-work.json> --dry-run` → import → `npm run works:preview`
- `scripts/work-import.test.mjs` の対象テストは `all 33 current work Markdown files pass the narrow reader-copy guard` とし、実Markdown数33に一致することを先に確認する。
- PlanGate amendmentのGLM-5.3 review後にtest name/expected countだけを32→33へ直し、最初に `npm run test:works` を実行する。全件成功後に `published` をtrueへ変更し、`npm run test:works` → `npm run verify:frontend` → `npm run check:works-dist` を順に実行する。
- 各確認コマンドは終了コード0を期待する。dry-runは衝突なしを示しファイルを書かない。通常importは対象Markdown・PNGを作り `published:false` を保つ。previewは `http://127.0.0.1:4327` で起動し一覧・詳細を返す。
- `test:works`、`verify:frontend`、`check:works-dist` はすべて終了コード0。distに公開URLのHTMLと関連レビューリンク、HTMLが指すOG/Twitter画像・480/1080 WebPがあることを確認する。

## Approval
- approver: Claude review gate (glm-5.3), then gpt-6-luna execution
- status: approved
- note: 以前の承認は固定件数テスト修正を含まないため、今回32→33のテスト名・期待値変更を追加したamendmentを別途レビューした。GLM-5.3 StructuredOutput成功、`ok:true`、blocking 0件（advisory 2件）。review artifact: `/private/tmp/coco-20261118-choose-a-revisit-time-review-artifacts/plan-amendment-review`。
