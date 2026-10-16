# Plan

## Task

- task-id: TASK-imada-honnoji-review-gallery-2026-10-16
- related PBI: `pbi-input.md`

## Classification

- 判定: `publish/dev-critical`
- 理由: 公開するReview/Galleryコンテンツと画像を追加し、サイトビルドが参照するmedia manifestを更新する。
- 必須 gate: frontend verify、Claude `glm-5.3` review、PR checks。

## Intent

- Reviewを主導線、Galleryを読後の余韻を添える副導線として追加する。
- 読者の困りごとから作品の証言構造へつなぎ、今日選べる小さな一歩を渡す。

## Visual Thesis

- Gallery画像は炎の跡と一冊の本が残る強い景色を一枚で見せ、歴史ミステリーの問いを静かに残す。画像が史実の再現であるとは説明しない。

## Content Plan

- Reviewは、泣きやまない0歳児を前にした父親の戸惑いから始める。
- 8人の異なる立場の証言という確認済みの作品構造を、見たこと・考えたことを分ける問いへ接続する。
- あらすじ、ココちゃん紹介、三成、授乳、仕事の別例を入れず、事実と推測を分ける方法は編集上の提案だと明示する。
- 終盤は「保留する」「手を借りる」「休む」など、読者が選べる一歩を残す。
- アフィリエイトは既存の `楽天で見る` 補助リンクとして登録する。

## Interaction Thesis

- ReviewとGalleryの相互リンクを既存テンプレートでつなぐ。
- ReviewのインフォグラフィックとGalleryのメイン画像を既存のresponsive media pipelineに登録する。
- ページUIとcollection schemaは変更せず、既存の表示規則に従う。

## Scope Declaration

- 変更対象:
  - `docs/tasks/TASK-imada-honnoji-review-gallery-2026-10-16/pbi-input.md`
  - `docs/tasks/TASK-imada-honnoji-review-gallery-2026-10-16/plan.md`
  - `docs/tasks/TASK-imada-honnoji-review-gallery-2026-10-16/test-cases.md`
  - `docs/tasks/TASK-imada-honnoji-review-gallery-2026-10-16/status.md`
  - `src/content/reviews/imada-honnoji-ni-ari.md`
  - `src/content/gallery/history-imada-honnoji-ni-ari.md`
  - `public/uploads/gallery/books/Imada_Honnoji_Ni_Ari_Imamura_Shogo.png`
  - `public/uploads/review/infographic/imada_honnoji_ni_ari_imamura_shogo.png`
  - `public/media/manifest.json`
  - `inbox/daily/2026-10-16.md`
- UI、schema、既存投稿、build設定、SNS公開、外部への告知は変更しない。

## Implementation Steps

1. PlanGateを確認し、作業用branch `codex/imadahonnoji-review-gallery` を使用する。
2. ユーザー提供の画像を原寸・原画質でpublic uploadsへコピーする。
3. Review/Galleryのcontent entryとaffiliate linkを追加し、相互参照を一致させる。
4. daily記録とtask statusを更新する。
5. media pipeline、frontmatter、相互導線、本文の一貫性を確認する。
6. `npm run lint`、`npm run check:content`、`npm run typecheck`、`npm run build`、`npm run test:e2e`、`npm run verify:frontend`を実行する。
7. Claude review gateを規模に応じた必須phaseで`ok:true`かつ`issues:[]`まで完了する。
8. 差分を確認し、conventional commit、PR、required checks、squash merge、main同期、branch cleanupを行う。
9. PagesのReview、Gallery、manifestおよび表示画像を確認する。

## Risks And Guards

- 8人の証言を実在史料と誤解させない。小説の構成と明記する。
- 推測を分ける練習を著者の実用手順と誤解させない。編集上の提案と明記する。
- ギャラリー画像を史実の記録写真と誤認させない。
- Review slug、Gallery `relatedReview`、画像path、affiliate URLをbuild前に照合する。
- 元worktreeにある無関係なdirty/untracked filesは変更・取り込みしない。

## Approval

- status: approved
- basis: ユーザーがサイト反映、ブランド方針順守、Claude review、PRからmergeまでを明示的に依頼。
- scope: 上記Scope Declaration内に限定。
