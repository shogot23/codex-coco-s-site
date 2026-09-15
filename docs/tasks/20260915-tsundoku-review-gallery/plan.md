# 実装計画：『積ん読の本』

## 変更分類

`publish/dev-critical`。公開サイトのレビュー・ギャラリー本文、画像アセット、購入導線を追加するため、Claude review gate と frontend verify を実行する。

## visual thesis

未読の山を責める視線をほどき、手元に置いた一冊との関係を見返す余白として表現する。インフォグラフィックの問いと、ココちゃんが本棚を見上げる視線をレビューの導入に重ねる。

## content plan

1. 『積ん読の本』のレビュー frontmatter と本文にインフォグラフィックを登録する。
2. 添付写真から『積ん読の本』の gallery entry を追加する。
3. 指定アフィリエイトURLをレビューとギャラリーへ登録する。
4. 画像の寸法・SHA・参照整合性を確認する。

## interaction thesis

レビュー詳細とギャラリー詳細の相互導線を、既存の `relatedReview` / `purchaseLinks` のデータ構造で接続する。レビューからインフォグラフィックと写真へ、ギャラリーからレビューへ自然に行き来できる構成にする。

## 実装順

1. 専用ブランチを作成し、計画を固定する。
2. 画像を公開アセットへコピーし、レビュー・ギャラリーの Markdown を追加する。
3. lint / typecheck / build / e2e / verify:frontend を実行する。
4. Claude review gate で diff をレビューし、blocking issue があれば修正して再レビューする。
5. 差分を確認して commit、push、PR、checks確認、squash merge、main同期、branch cleanup を行う。
