# 読書 with Coco 収益導線設計メモ

## Classification

- この変更は `publish/dev-critical`。
- 理由: 公開サイトの導線設計と frontend 実装に関わるため。

## Visual Thesis

- 収益導線は「売場」ではなく、読後に本をそっと手元へ戻すための静かな棚として見せる。

## Content Plan

- Home は story-cover のまま維持する。
- Reviews 一覧は「次の一冊を選ぶ」役割に徹し、販促を追加しない。
- Review 詳細の終端だけに、任意表示の購入導線を置く。
- About / Gallery / Videos には収益導線を広げない。

## Interaction Thesis

- 操作の順番は `読む` → `景色へ寄る` → `必要なら手元に置く`。
- 購入導線は primary / secondary CTA にしない。

## 現状診断

- Home は「ブランドと世界観を開く最初の一画面」として完成している。
- Reviews 一覧は「レビューへ入る前の余韻と選択」を担っている。
- Review 詳細は本文読了後に `Afterglow` で景色や次の一冊へ戻す構造になっている。
- このため、最も自然な収益導線は Review 詳細の終端に限られる。

## 候補比較

| 候補 | 自然さ | 役割衝突 | 判定 |
| --- | --- | --- | --- |
| Home | 低い | story-cover と CTA priority を崩しやすい | 不採用 |
| Reviews 一覧 | 低い | 選択導線より販促が先に見えやすい | 不採用 |
| Review 詳細 | 高い | 読了後の次の一歩として接続できる | 採用 |
| About / Gallery / Videos | 低い | 世界観補強ページの役割を汚しやすい | 今回は置かない |

## 採用方針

- `Review 詳細` の `Afterglow` 内にだけ `Reading Shelf` を置く。
- 見せ方は small panel とし、カードやバナーの主役にしない。
- 文言は `この本を手元に置く` `読み返したくなったら` のように、余韻の延長で表現する。
- 実装は review content に購入リンクを任意設定できるようにし、未設定レビューでは何も出さない。
- `purchaseLinks` を設定していない review では `Reading Shelf` 自体を表示しない。この非表示は意図どおりの挙動とする。

## Copy / Strength Rule

- 使う: `読み返したくなったら`, `この本を手元に置く`, `外部ストアへ移動します`
- 使わない: `今すぐ購入`, `最安値`, `限定`, `おすすめ商品`
- 強さは tertiary。既存の `本文を読む` / `景色のページへ` / `レビュー一覧へ戻る` より弱く扱う。

## Doctrine との整合

- 主 CTA は引き続き `レビューを見る`。
- 収益導線を review detail の終端に閉じ込めることで、`読後の余韻が深まる順番` を守る。
- バナー化を避け、既存の静かな surface と同じ質感で generic affiliate 化を防ぐ。
- 本の購入は `本 × ココちゃん × 学び` のうち「本」の延長としてのみ扱う。
