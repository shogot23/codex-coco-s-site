# PBI Input

- task-id: TASK-sayonara-jabberwock-review-gallery
- title: 『さよならジャバウォック』Review/Gallery公開
- owner: Codex
- date: 2026-10-14

## Request Summary

- 依頼の要約: ブランド方針に沿うReview/Gallery追加、ユーザー提供の2画像と購入URLを使い、PR・squash merge・本番確認まで行う。
- 本文: ユーザー提供の生活経験を本人の目線で用いる。未確認の体験は加えない。

## Goal

- 達成したいこと: Reviewを主導線、Galleryを読後の余韻、購入先を補助導線とした掲載。
- 完了条件: content相互リンク、画像manifestと派生画像、ブランドと本人の体験に沿う本文、Claudeレビュー、必須ローカル検証・CI・Pages確認を完了。

## Scope

- 含める: Review/Galleryの新規entry、提供画像2点のmedia追加、media manifest、本タスクの計画・検証記録。
- 含めない: 共通UI/CSS変更、他作品、SNS投稿。

## Constraints and References

- 運用: 専用branch/worktree、ブランド原典、content schema、gallery generated_at、相互relatedReview、HTTPS Moshimo URLを守る。
- 参照: docs/brand/reading-with-coco-brand-strategy.md、docs/brand/reading-with-coco-content-guidelines.md、docs/brand/reading-with-coco-ai-operations.md、docs/reading-with-coco-design-doctrine.md
- 素材: infographic 1080x1350。Gallery photo 1122x1402。画像内の問いは著者の直接引用としない。Gallery画像の来歴は未確認なのでvisualOriginを推定しない。
