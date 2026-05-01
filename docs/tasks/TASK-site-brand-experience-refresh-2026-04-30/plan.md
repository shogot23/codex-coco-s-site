# Plan: Site Brand Experience Refresh

## Thesis

- visual thesis: mobile でも最初の読書入口にココちゃんの気配が見え、静かな読書の表紙として成立する状態にする。
- content plan: 内部設計語を減らし、読者が「問い」「余韻」「今日できる一歩」を持ち帰れる順に整える。
- interaction thesis: 主要導線は Reviews を保ち、Gallery は景色を静かに見返す寄り道として自然に入れる。

## Implementation

1. `src/pages/index.astro` の mobile hero CSS を調整し、390x844 で CTA とココちゃん画像の上部が見えるようにする。
2. `src/pages/gallery.astro` と `src/components/gallery/GalleryBrowse.astro` の内部設計っぽい文言を読者向けコピーへ置換し、画像枠 placeholder を既存トーンに合わせて整える。
3. `src/pages/reviews.astro` で Reviews 一覧を `最近の余韻` / `これまでの棚` に分け、「今日の小さな一歩」を固定表示する。
4. Home hero / Gallery hero lead / Reviews featured image に限定して `fetchpriority="high"` を追加する。
5. 差分確認、frontend verify、Claude review gate、必要なら修正と再レビューを行う。

## Parallel Work

- `index.astro`、`gallery.astro + GalleryBrowse.astro`、`reviews.astro` は独立性が高いため分担可能。
- 最終統合ではコピー調子、mobile viewport、差分範囲を1人が横断確認する。

## Constraints

- 最小差分を維持する。
- Review detail と schema は触らない。
- `src/styles/theme.css` は触らない。
- 画像生成や画像 pipeline は追加しない。
