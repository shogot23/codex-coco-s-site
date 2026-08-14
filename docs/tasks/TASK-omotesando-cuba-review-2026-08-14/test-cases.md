# Test Cases

## Must Check

- [x] Reviews一覧・詳細に書名、著者、レビュー、Life Repair Notes、インフォグラフィックが表示される。
- [x] Gallery一覧・詳細に添付の高解像度画像、説明、余韻メモが表示される。
- [x] Galleryの`relatedReview`とReview詳細側の逆引きにより、Reviewと既存Gallery slugが相互遷移する。
- [x] Galleryのdescriptionへ書名・著者名を重ねず、既存`generated_at`とlegacy slugを維持する。
- [x] 楽天リンクが受領hrefと一致し、`&amp;`や計測画像をcontentへ混入させない。
- [x] Amazon検索リンクが正しい書名・著者を検索対象にする。
- [x] 単行本と文庫版を混同せず、キューバを理想郷化せず、父の具体的な仕掛けを明かさない。
- [x] 読者のモヤモヤ、問い、見方の変化、今日の一歩、ココちゃんの案内が残る。
- [x] 既存導線、Gallery章anchor、desktop/mobile layoutを壊さない。
- [x] scope外差分とmain未追跡ファイル、別セッションへの干渉がない。

## Command And Review Checks

- [x] `npm run lint`
- [x] `npm run check:content`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`
- [x] Claude Review Gateがblocking 0、`ok: true`。
- [x] Sol独立確認で差分、生成HTML、画像、リンク属性、desktop/mobile、Git状態が正常。

## Out Of Scope

- 外部ストアでの購入完了、もしも計測用1px画像のschema対応、既存テンプレート改修。
