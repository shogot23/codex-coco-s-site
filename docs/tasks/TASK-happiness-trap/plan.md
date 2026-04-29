# Plan — TASK-happiness-trap

## 変更対象

1. `public/uploads/gallery/books/Happiness_Trap_Russ_Harris.png` — 表紙画像
2. `public/uploads/gallery/books/Happiness_Trap_Russ_Harris_infographic.png` — インフォグラフィック
3. `src/content/gallery/psychology-XXXXXX.md` — ギャラリーエントリー
4. `src/content/reviews/koufuku-ni-naritai-nara-koufuku-ni-narou-to-shite-wa-ikenai.md` — レビュー

## 実装順

1. 画像2点を所定ディレクトリにコピー
2. ギャラリー markdown を作成（frontmatter + 空本文）
3. レビュー markdown を作成（frontmatter + ユーザー提供本文）
4. 自己レビュー → verify:frontend → コミット → PR

## 検証方針

- `npm run verify:frontend` が通ること
- ギャラリー/レビュー両ページにエントリーが表示されること
- 相互リンク（relatedReview）が機能すること
