# PBI Input

## Task

- task-id: `TASK-reviews-readability`
- title: レビュー一覧のPC・スマホ可読性修正
- owner: site owner
- date: 2026-08-11

## Request Summary

- 依頼の要約: レビューページがPCとスマホの両方で見にくいため、実画面を確認し、表示不具合と情報重複を含めて読みやすく再構成する。
- 背景: 本番画面の確認で、PCのレビュー一覧が未整形に近い縦並びになり、390px幅のスマホでは本文が画面外へ約208pxはみ出していることを確認した。

## Goal

- 達成したいこと: 「今のモヤモヤから一冊を選び、レビューを読む」流れを、PCでもスマホでも迷わず追える表示にする。
- 完了条件: 横方向の欠落がなく、短いHero、最新レビュー、本棚へ重複なく進める。レビュー項目の画像・書名・著者・読む理由・導線が明確な順序で読め、検索・テーマ絞り込み・追加表示が表示崩れなく動く。

## Scope

- 含める: `src/pages/reviews.astro`内のHero・最新レビュー・Compass・Today Step・本棚の情報構成整理、`src/components/reviews/ReviewExplorer.astro`の検索と一覧表示修正、レビュー一覧の専用E2E、変更したReviews構造を参照する既存smoke assertionの更新、作業記録。
- 含めない: レビュー本文、他ページのデザイン刷新、コンテンツ原稿、CMS、依存関係、公開設定。

## Constraints

- 既存運用との整合: ブランド正本、design doctrine、`DESIGN.md`、frontend verify、Claude review gateに従う。
- 納期 / 優先度: 表示欠落と一覧崩れを最優先に、同じページ・同じ2コンポーネント内で情報重複も減らす。
- 触ってよいファイルや領域: Scopeに列挙したファイルのみ。

## References

- 関連ドキュメント: `docs/brand/reading-with-coco-brand-strategy.md`、`docs/reading-with-coco-design-doctrine.md`、`DESIGN.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: Astroのscoped CSSが、クライアント再描画で生成した要素へ継承されないことがPC表示崩れの直接原因。スマホはグリッド項目の最小幅が親グリッドを押し広げている。加えて、一覧より前にHero・Compass・Featuredで説明と同じ本が重複し、一覧開始位置がPC約2,823px、スマホ約4,341pxになっている。
- 未確定事項: なし。ownerから「オーケストラ方針で開発を進める」指示を受け、診断で判明したページ構成整理を含む案で進行する。
