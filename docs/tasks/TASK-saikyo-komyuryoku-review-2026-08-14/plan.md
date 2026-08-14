# Plan

## Intent And Scope Declaration

- task-id: `TASK-saikyo-komyuryoku-review-2026-08-14`
- 変更対象: `src/content/reviews/saikyo-no-komyuryoku-no-tsukurikata.md`、`src/content/gallery/business-saikyo-no-komyuryoku-no-tsukurikata.md`、用途別画像2点、`public/media/manifest.json`、本タスク記録。
- 変更しないもの: Astro page/component、content schema、既存review/gallery、別worktreeとその未追跡ファイル。

## Frontend Thesis

- visual thesis: Reviewでは学びを整理したインフォグラフィック、Galleryでは本から人とのつながりが広がるココちゃんの写真を使い分ける。
- content plan: 会話術への焦りから入り、素直さ・感情との付き合い方・敬意という信頼の土台へ視点を移し、今日の会話を三行で振り返る一歩を残す。
- interaction thesis: Review本文とLife Repair Notesを主導線、Galleryを余韻の副導線、購入リンクを第三優先とし、`relatedReview`で相互接続する。

## Delegation And Implementation

- サブエージェントA: 既存content/schema/test規約をread-only調査。
- サブエージェントB: 画像仕様・書誌・affiliate URLをread-only検証。
- サブエージェントC: worktree/branch/PR衝突をread-only監査。
- 親エージェント: 計画、実装、統合、検証、Claude review、Sol最終確認、PR/mergeを担当。

1. PlanGateをClaudeでレビューし、blocking 0を確認する。
2. Review/Gallery用画像を別々の公開パスへコピーし、content Markdownを追加する。
3. `npm run media:generate`後、lint、content audit、typecheck、build、E2E、`verify:frontend`を実行する。
4. Claude Review Gateを`ok: true`まで収束させ、Solが差分・生成物・desktop/mobile・Git状態を独立確認する。
5. origin/mainと別worktreeを再監査し、必要なら最新mainを統合してmanifestを再生成後、commit、PR、checks、squash merge、cleanupを行う。

## Risks And Approval

- リスク: 画像用途の取り違え、刺激的表現による読者の断罪、affiliate URLの二重escape、共有manifest競合。
- ガード: 別パスと`source_file`で画像用途を分離し、人格ではなく修正可能な会話傾向として翻訳する。URLはhrefのみ正規化し、PR直前にmanifestを再生成する。
- approver: ユーザーの一気通貫実行依頼。reviewerはClaude Review Gate。
- status: approved
