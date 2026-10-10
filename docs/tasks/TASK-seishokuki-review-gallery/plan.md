# 公開計画

分類: publish/dev-critical
Owner: ユーザー（公開・PR・mergeの指示済み）
Reviewer: Claude CLI / glm-5.3。archレビュー合格後に実装する。

- 対象: src/content/reviews/seishokuki-asai-ryo.md、新規インフォグラフィックPNG、既存Gallery novel-34a5c1.md と Seishoki_Asai_Ryo.png、public/media/生成差分、当task記録のみ。
- visual thesis: 青い量販店の光の中の本とCocoをギャラリーに、やわらかな紙面の問いをレビューに置く。既存レイアウトを利用。
- content plan: 確定レビュー全文を保持。Galleryの旧ネタバレ要約を読後の問いと画像の情景に変更。既存slugとgenerated_atは保持しupdatedAtを更新。画像は本物の書影写真と誤認させないAI制作表示を行う。
- interaction thesis: GalleryからReview、ReviewからGalleryの相互導線。購入は3番目。HTTPSのもしもURLを既存コンポーネントで表示、計測画像を省く。
- 順序: archレビュー→記事と画像→media生成→検証→Claude diff/cross-check→commit/PR/CI→squash merge→main同期と隔離作業の片付け→Pages本番確認。
- 確認: lint、check:content、typecheck、build、test:e2e、verify:frontend。desktop/mobileで両記事、画像、CTA、overflow確認。原画像SHA、寸法、manifestのentriesとHTML参照のWebP/AVIF確認。
- 承認: Claude arch: ok:true。advisoryは実装・検証に反映。全文正本は本チャット最終全文をapproved-review.mdへ固定。既存レビューの命名に準拠。ユーザーへの再承認要求は不要。
