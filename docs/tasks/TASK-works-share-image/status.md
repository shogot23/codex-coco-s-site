# Status

## Task

- task-id: TASK-works-share-image
- state: done
- updated: 2026-09-28

## Summary

- ココちゃんの正本を参照した原画を制作し、ページ用WebPと文字入りXカード用JPEGを作成した。
- `/works/` の冒頭とOGPに専用画像を組み込んだ。原画はこのタスク記録に保管した。

## Verification Result

- `npm run verify:frontend`: 成功。E2Eは89件成功、7件は既定のスキップ。
- ビルドHTML: `og:image` と `twitter:image` が同一の専用画像URLを指す。寸法と代替テキストも一致。
- 画面と画像: desktop/mobileおよび300px幅のXカード縮小表示を目視確認済み。
- Claude review gate: planのarch/diff、実装のarch/diff、記録のdiff、横断確認でblockingなし。
- PR #179をsquash merge。GitHub Pagesのデプロイは成功し、公開ページのdesktop/mobile表示を目視確認した。
- 公開HTMLの `og:image` と `twitter:image` は `https://shogot23.github.io/codex-coco-s-site/works/works-social-20260926.jpg` を指す。公開画像とページ用WebPはHTTP 200で、ローカルとSHA-256が一致した。
- Xの投稿作成画面では、2026-09-27に通常URLで旧キャッシュの汎用アイコン、クエリ付きURLで専用画像を確認した。2026-09-28に通常の `/works/` URLを再確認すると、専用画像の大きなカードが表示された。投稿はしていない。

## Sharing Note

- Xに共有するURLは `https://shogot23.github.io/codex-coco-s-site/works/`。通常URLで専用画像のカード表示を確認済み。

## Daily Record

- 記録先: `daily-2026-09-26.md`、`daily-2026-09-28.md`
