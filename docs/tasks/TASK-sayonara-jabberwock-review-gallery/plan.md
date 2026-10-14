# Plan

- task-id: TASK-sayonara-jabberwock-review-gallery
- related pbi: pbi-input.md

## Intent

本人が確認した生活の悩みをReviewの入口に置き、画像の「感情だけでその人は決まるか」という問いから、日常で選べる小さな一歩へつなぐ。Galleryは提供写真と短い余韻の文でReviewを補う。

## Scope Declaration

- 変更対象: 新規Review/Gallery markdown、public/uploads/review/infographic と public/uploads/gallery/books の提供画像、public/media/manifest.json、本タスク記録。
- 共通UI/CSS、他content、既存ユーザー作業は変更しない。

## Visual Thesis / Content Plan / Interaction Thesis

- Visual thesis: Reviewは1080x1350の問いの画像を本文と並べて読みの入口にする。Galleryは暗い青と室内灯の写真を一枚の余韻として見せる。
- Content plan: 本人の離乳食体験 → 感情だけで自分を決めない問い → 人を二つに分けず次の行動に余地を残す → 任意の小さな行動や休息。
- Interaction thesis: ReviewからGalleryへ戻れる相互リンク。購入リンクは本文価値を伝えた後の補助導線。

## Implementation Steps

1. 添付素材・原稿・content schemaを照合し、2 entryとmanifestを追加する。
2. lint、check:content、typecheck、build、E2E、verify:frontendを行い、desktop/mobile、gallery/data.json、mediaを確認する。
3. Claudeレビューを指摘0件まで行い、PR/CIを経てsquash mergeする。
4. Pages成功後、cache-bypassでReview/Gallery/一覧JSON/HTML参照メディアを検証する。

## Risks And Guards

- 既存作業を混入しないよう専用worktreeとbranchを使う。画像由来は未確認のため推測しない。古いあらすじが別導線に残っていないか生成HTMLを確認する。scope外事項は追加しない。

## Verification

- npm run lint / check:content / typecheck / build / test:e2e / verify:frontend
- git diff --check、画像SHA/寸法、manifest entry、最適化AVIF/WebP、Gallery新着順、Review/Gallery相互リンク、affiliate redirect、390/1440px overflow、CI、Pages。

## Approval

- approver: Codex（個人運用の自己承認）
- status: approved
- note: 上記scopeと検証方針で進める。mainへ直接commitしない。
