# 読書 with Coco 収益導線設計メモ

## Classification

- この変更は `publish/dev-critical`。
- 理由: 公開サイトの導線設計と frontend 実装に関わるため。

## Visual Thesis

- 収益導線は「売場」ではなく、読書体験の延長線上にある静かな出口として見せる。購入意欲が生まれた瞬間に最短で到達できる位置に置きつつ、世界観は維持する。

## Content Plan

- Home の Featured Review に購入CTAを置いてよい（secondary 系クラスで抑制）。
- Reviews 一覧の Featured Review に購入CTAを置いてよい（secondary 系クラスで抑制）。
- Reviews 一覧の Stream カード: Phase 2 で対応。`stream-link` は既存の「レビューを読む」と同視覚強度のため、subordinate 表現の別途設計が必要。
- Review 詳細は終端（Reading Shelf）だけでなく、上部（opening-actions）にも購入導線を前倒し配置してよい。
- About / Videos には収益導線を広げない。Gallery 詳細の review-bridge セクションには、関連レビューの purchaseLinks がある場合に限り購入CTAを置いてよい（secondary 系クラスで抑制）。
- 公開面で信頼を損なう下書き表示（description/excerpt に「下書き」を含むコンテンツ）は除外対象とする。

## Interaction Thesis

- 操作の順番は `読む` → `景色へ寄る` → `必要なら手元に置く` を基本としつつ、購入意欲が生まれた瞬間に最短出口として購入CTAに到達できるようにする。
- 購入導線は primary CTA にはせず、secondary / secondary-link 相当で抑制する。既存の `このレビューを読む` が常に主CTA。

## 候補比較

| 候補 | 到達性 | 世界観への影響 | 判定 |
| --- | --- | --- | --- |
| Home Featured | 高い | secondary 系クラスで抑制すれば共存可 | Phase 1 採用 |
| Reviews 一覧 Featured | 高い | hero-button-secondary で抑制すれば共存可 | Phase 1 採用 |
| Reviews 一覧 Stream | 高い | stream-link が主CTAと同強度、subordinate表現の別設計が必要 | Phase 2 |
| Review 詳細（上部） | 高い | secondary-link で抑制、既存 Reading Shelf も残存 | Phase 1 採用 |
| Review 詳細（終端） | 高い | 既存 Reading Shelf を維持 | 維持 |
| About / Videos | 低い | 世界観補強ページの役割を汚しやすい | 対象外 |
| Gallery 一覧 | 低い | 世界観補強ページの役割を汚しやすい | 対象外 |
| Gallery 詳細（review-bridge内） | 中〜高 | secondary 系クラスで抑制すれば共存可 | Phase 1 採用 |

## 採用方針

- Home: Featured Review の review-actions に `inline-button inline-button-secondary` の購入CTAを追加。
- Reviews 一覧: Featured Review の review-actions に `hero-button hero-button-secondary` の購入CTAを追加。Stream カードは Phase 2 で対応（subordinate 表現の別途設計が必要）。
- Review 詳細: `opening-actions` に `secondary-link` の購入CTAを追加し、既存の `Afterglow` 内 `Reading Shelf` はそのまま残す。
- Gallery 詳細: review-bridge セクションの bridge-actions に `scene-link scene-link-secondary` の購入CTAを追加。関連レビューの purchaseLinks がある場合のみ表示。
- 見せ方はカードやバナーの主役にせず、既存アクショングループの一員として控えめに配置する。
- レビュー購入導線の source of truth は review frontmatter の `purchaseLinks` とし、Home / Reviews 一覧 / Review 詳細 / Gallery 詳細の各導線は可能な限りこの共通データ構造を参照する。
- `purchaseLinks` は単数ではなく配列として扱い、先頭 1 件固定や slug ベースのリンク出し分けは行わない。
- CTA 文言は `purchaseLinks.label` を UI copy の正本とし、UI 側で汎用文言へ差し替えない。
- `purchaseLinks` を設定していない review では CTA が表示されない。この非表示は意図どおりの挙動とする。
- 新規レビュー追加時は、必要な購入導線を review frontmatter の `purchaseLinks` に定義して対応する。
- 下書きコンテンツは `published: false` で公開面から除外する。

## Copy / Strength Rule

- CTA 文言の正本は `purchaseLinks.label`。以下は UI 側固定文言ではなく、frontmatter 側の `purchaseLinks.label` で使う文言トーンのガードとして扱う。
- 使う: `この本を見る`, `読み返したくなったら`, `この本を手元に置く`, `外部ストアへ移動します`
- 使わない: `今すぐ購入`, `最安値`, `限定`, `おすすめ商品`
- 強さは secondary / secondary-link 相当。既存の `このレビューを読む` より弱く扱う。primary CTA にはしない。

## Doctrine との整合

- 主 CTA は引き続き `このレビューを読む`。
- 購入導線は読書体験を主役にしつつ、購入意欲が生まれた瞬間の最短出口として機能する。
- バナー化を避け、既存の静かな surface と同じ質感で generic affiliate 化を防ぐ。
- 本の購入は `本 × ココちゃん × 学び` のうち「本」の延長としてのみ扱う。
