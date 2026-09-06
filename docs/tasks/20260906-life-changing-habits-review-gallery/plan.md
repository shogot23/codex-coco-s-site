# 実装計画

## 承認状態

- 依頼文による着手許可: 済み
- 分類: `publish/dev-critical`
- 変更範囲: Reviews／Galleryのコンテンツと画像アセット、作業記録のみ

## 手順

1. 現行のcontent schema、関連レビュー／ギャラリーの表示契約、ブランド文書を確認する。
2. 公式書誌と提供画像を照合し、画像の寸法・比率・内容を確認する。
3. 提供画像を公開アセットへ配置し、レビューとギャラリーのfrontmatterを最小差分で追加する。
4. `npm run check:content`、`npm run lint`、`npm run typecheck`、`npm run build`、`npm run test:e2e`、`npm run verify:frontend`を順に実行する。
5. 生成HTML、画像参照、レビュー／ギャラリーの相互リンク、アフィリエイト属性を確認する。
6. Claude review gate（small diff）を実行し、blocking issueがあれば修正して再レビューする。

## 完了条件

- ReviewsとGalleryの両方に対象書籍が公開状態で登録される。
- レビューの本文、問い、見方、今選べる一歩がブランド方針に沿う。
- 提供画像が適切な役割とファイルパスで表示される。
- 既存コンテンツと未追跡ファイルに不要な変更がない。
- 必須検証とClaude review gateが完了する。
