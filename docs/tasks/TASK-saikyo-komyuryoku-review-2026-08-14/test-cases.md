# Test Cases

## Must Check

- [x] Reviews一覧・詳細に書名、著者、レビュー、Life Repair Notes、インフォグラフィックが表示される。
- [x] Gallery一覧・詳細に専用写真、説明、余韻メモが表示される。
- [x] ReviewとGalleryが正しいslugで相互遷移する。
- [x] 楽天リンクが受領hrefと一致し、`&amp;`や計測画像をcontentへ混入させない。
- [x] 読者を断罪せず、問い・見方の変化・今日の一歩・ココちゃんの案内が残る。
- [x] 既存導線、Gallery章anchor、desktop/mobile layoutを壊さない。
- [x] scope外差分と別worktreeへの干渉がない。

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
