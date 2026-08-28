# Plan

## Task

- task-id: TASK-eien-no-kioku-review
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 東野圭吾『永遠の記憶』のレビューを新規作成し、指定インフォグラフィック・ギャラリー画像を公開アセットとして参照する。
- なぜ今やるか: ユーザーが指定したレビュー文・画像・アフィリエイト URL を公開コンテンツとして反映するため。

## Scope Declaration

- 変更対象ファイル: `src/content/reviews/eien-no-kioku-higashino-keigo.md`(新規)、`public/uploads/review/infographic/eien_no_kioku_higashino_keigo.png`(新規)、`src/content/gallery/novel-*.md`(gallery:import で生成し整備)、`public/uploads/gallery/books/Eien_no_Kioku_Higashino_Keigo.png`(import → rename)、media manifest(prebuild で自動更新)、PlanGate 記録、daily。
- 変更しないもの: 既存レビュー・ギャラリー・コンポーネント・ページ実装、ユーザー管理の `inbox/`・`.playwright-cli/`。

## Implementation Steps

1. ブランチ `codex/eien-no-kioku-review` を main から作成する。
2. インフォグラフィック画像を `public/uploads/review/infographic/eien_no_kioku_higashino_keigo.png` として配置する。
3. ユーザー提供のレビュー文を本文として採用し、ブランド方針(読者のモヤモヤ → 本の問い → 見方の変化 → 実生活への一歩 → ココちゃん)に沿うよう frontmatter(excerpt / readerWorry / bookQuestion / perspectiveShift / smallStep / cocoNote / lingeringQuestion / readingCompass / recommendedFor)を整備して review md を作成する。
4. ユーザー提供の gallery 画像を `npm run gallery:import`(必要なら `--file` + title/author override)で取り込み、`Eien_no_Kioku_Higashino_Keigo.png` に rename し、gallery entry を整備する(description に題名・著者名を含めない、`generated_at` 必須、`relatedReview` 相互リンク、楽天 moshimo URL、`published: true`)。review に `cover` と楽天 URL を反映する。
5. `npm run check:content` / `npm run typecheck` / `npm run build` / `npm run verify:frontend` で検証する。
6. publish コンテンツのため、`docs/parallel-dev-config.md` に定める Claude ベースの review gate(`claude` CLI による独立レビュー、claude-review-gate スキルの手順)を、変更後および commit / PR / merge 前に完了させる(`ok: true` まで反復)。あわせて、ユーザー CLAUDE.md「Review gate (codex-review)」の規定に基づく codex-review スキル(Codex CLI read-only レビュー)を追加のクロスレビューとして実行する。完了後、status.md と daily を更新する。
7. pr-merge スキルで commit、PR 作成、checks 確認、squash merge、main 同期、branch cleanup まで実施する。

## Risks And Guards

- 想定リスク: cover を持たないレビューが表示崩れを起こす、infographic 画像が manifest に反映されずビルドで欠ける、ネタバレが原稿に混入する。
- 回避策: 一覧・詳細・ホームのフォールバック参照(infographic)を生成 HTML で確認する。画像は prebuild の `media:generate` で manifest に登録されることをビルド後に検証する。原稿は文藝春秋公式あらすじの範囲(内海刑事が刺される事件・過去につながる捜査)までとし、結末・復讐の全容・登場人物の「失ったもの」の正体には触れない。
- scope 外に見つけた事項の扱い: 変更せず、最終報告に記録する。

## Verification

- 実行するコマンド:
  - `npm run check:content`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run verify:frontend`
- 追加確認: 生成 HTML のレビュー詳細URL・infographic 参照、レビュー一覧でのサムネイル表示。

## Approval

- approver: Claude(個人運用の自己承認)
- status: approved
- note: publish コンテンツ追加(publish/dev-critical)のため、実装後および commit / PR / merge 前に Claude ベースの review gate(claude-review-gate スキル、`claude` CLI による独立レビュー)を完了させる。これに加え、ユーザー CLAUDE.md の codex-review 規定によるクロスレビューも実施する。verify:frontend も実施する。
