# Test Cases

- task-id: TASK-sayonara-jabberwock-review-gallery
- related plan: plan.md

## Must Check

- [x] 0歳児の離乳食に関する本人確認済みの体験に忠実。未確認の行動や感情を加えていない。
- [x] あらすじや結末を載せず、問い・視点の変化・選べる一歩がある。
- [x] Galleryの写真と説明が読後の余韻になりReviewへ戻れる。
- [x] reciprocal relatedReview、generated_at、購入URLと属性が正しい。
- [x] 原画像のSHA/寸法とmanifest及び派生画像が一致する。
- [x] 対象外ファイルや既存差分が含まれない。

## Command Checks

- [x] npm run lint
- [x] npm run check:content
- [x] npm run typecheck
- [x] npm run build
- [x] npm run test:e2e
- [x] npm run verify:frontend

## Manual Checks

- [x] Review、Gallery、gallery/data.json、desktop/mobileを確認。
- [x] PR #206の必須CIとDeploy Previewが成功し、squash merge済み。
- [x] Pages deploy run #38576030903が成功。cache-bypass付きReview、Gallery、gallery/data.jsonとHTML参照AVIF/WebPがHTTP 200。

## Optional Checks

- [ ] 390px/1440pxでhorizontal overflowなし。

## Out Of Scope

- SNS投稿、tracking pixel追加。
