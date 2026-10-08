# 掲載計画
- Owner: Codex。Reviewer: Claude CLI / glm-5.3。計画レビュー合格後に掲載データを作成する。
- Visual thesis: 青い未来都市とココちゃんのGallery、温かな本と問いのInfographicを既存レイアウトで見せる。
- Content plan: 確定レビューを本人の声で掲載。つくれるものが増える戸惑いから、込めたい思いと小さな一歩へつなぐ。Galleryも同じ問いの余韻を担う。
- Interaction thesis: Reviewを主導線、Galleryを補助、購入を第三の導線とし既存の相互リンクを使う。
- 変更対象: src/content/reviews/seisei-ai-de-sekai-wa-kou-kawaru-imai-shota.md、src/content/gallery/business-seisei-ai-de-sekai-wa-kou-kawaru-imai-shota.md、public/uploadsの提供画像2枚、public/mediaの派生画像とmanifest、当task記録、daily記録のみ。
- Galleryのgenerated_atは今回の掲載登録日時とし、画像の制作日時とはみなさない。提供の生成画像としてvisualOriginをai-generatedに設定する。
- 書名・著者・内容は出版社情報と正式公開抜粋で確認済み。既存のレビュー本文を採用し、内部の調査限界やレビュー運用は公開本文へ混ぜない。
- 指定URLはHTTPS、エスケープ前の&でpurchaseLinksへ保存し、既存コンポーネントのrel属性を確認。追跡画像は掲載しない。
- 検証: lint、check:content、typecheck、build、test:e2e、verify:frontend。desktop/mobileで新規Review/Gallery・相互リンク・購入リンク・画像・横溢れを確認する。
- 変更後はClaude review gateの必要phaseを通過し、対象差分だけcommit/PR/merge。Pages完了後に本番HTMLと参照されるWebP/AVIFのHTTP200を確認する。

## 計画承認と運用補足
- Claude glm-5.3 diff: ok:true（2026-10-08）。Codex owner承認済み。
- generated_atは既存同様UTC ISO 8601。verify:frontendがlint/typecheck/build/test:e2eを包含することを確認済み。規定の順次確認後に最終verifyも実施する。
- merge前にstatusと当task内daily-2026-10-08.mdを更新する。
