# Plan

## Task

- task-id: TASK-works-share-image
- related pbi: `pbi-input.md`

## Intent

- `/works/` の現在のOGPは共通画像に落ち、別の本のインフォグラフィックを表示する。専用画像を割り当てる。

## Visual / Content / Interaction Thesis

- visual: 静かな机でココちゃんが開いた本から白紙のメモへ導く。温かい紙色と余白を保つ。
- content: 既存の見出し「本から、今日の小さな一歩へ。」を入口にし、同じ絵をページとXカードで使う。
- interaction: 画像から見出し、気分・困りごとの選択へ視線が自然につながる。既存の絞り込み操作を保つ。

## Scope Declaration

- 変更対象: `public/works/` の専用画像、`src/pages/works/index.astro`、`src/styles/works.css`、`tests/e2e/works.spec.ts`、このタスク記録。
- 個別ワークページ、共通SEOコンポーネント、他ページの画像には触れない。

## Implementation Steps

1. ココちゃん正本を参照した文字なしの横長イラストを制作し、原画はこのタスク記録に保管する。ページ用WebPと1200×630pxの文字入りXカード用JPEGを作る。
2. `/works/` 冒頭にページ用画像を加え、Layoutの単一の画像プロパティから `og:image` と `twitter:image` に専用画像のURL・代替テキスト・寸法を渡す。
3. `tests/e2e/works.spec.ts` に専用OGPの回帰確認を加え、desktop/mobile目視、frontend検証、Claudeレビューを行う。
4. PRをsquash mergeし、GitHub Pagesのデプロイ後に公開HTMLと画像を確認する。
5. `status.md`を更新し、その日のdailyに結果を記録する。

## Risks And Guards

- Xカードの文字が小さく見える可能性: 縮小表示で目視確認する。
- X側のキャッシュ: 公開HTMLと画像の確認結果と、X上の表示確認結果を分けて報告する。
- 既存作業との混在: 専用worktreeで差分を点検する。

## Verification

- `npm run verify:frontend`
- ビルド結果と公開HTMLの `og:image` / `twitter:image`、画像HTTP応答、desktop/mobile画面を確認する。

## Approval

- approver: site owner
- status: approved
- note: 2026-09-26にユーザーがこの計画の実装を明示的に依頼した。
