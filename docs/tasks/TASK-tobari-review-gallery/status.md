# Status

- task-id: TASK-tobari-review-gallery
- classification: publish/dev-critical
- state: complete (PR #192 squash merged; Pages verified)
- date: 2026-09-29

## Delivered in branch

- レビューとギャラリーを新規追加。本文は書名を出さず、本人の違和感、視点の変化、今日の小さな行動を中心にした。
- ギャラリー画像の本だけをユーザー提供の実物写真に基づく表紙へ置き換え、夕景とココちゃんを保持。画像の由来は `ai-generated`。
- インフォグラフィックは提供原本と `cmp` 一致。楽天もしもリンクは提供 URL を一度だけ HTML entity decode し、Review/Gallery とも同一値。
- 元ギャラリー画像は未変更。作業前・後 SHA-256: `c36fa282341a548937a0ccded63546f0ec99d3547ff34c49b5732cf05800e3ba`。
- 非公開の実物表紙写真を `inbox/gallery/tobari-real-cover-reference.jpg` に保管。SHA-256: `c74358e49023d43c735adfd1b0e737d69b7311f2e2e617991b4e2b2d46619202`。
- 公開用ギャラリー画像 SHA-256: `1bab443d187ea54bd11d4164b885417526ccb28cc286ba1617d4a80389c34352`。実物写真と等倍・拡大で、題名、両著者名、帯の読める文章、色面、人物配置を確認。読める範囲の誤字・欠字・架空表記は見つからなかった。
- infographic SHA-256: `83f99c00afeb04935d2a25e1a4f6655f360ac2fbc7a0e74da8d89a03987f61e1`。

## Checks

- `npm run check:content`: pass (43 published reviews)
- `npm run lint`: pass
- `npm run typecheck`: pass (0 errors/warnings/hints)
- `npm run build`: pass; manifest に両画像の entries がある
- `npm run test:e2e`: pass (95 passed, 7 skipped)
- `npm run verify:frontend`: pass (95 passed, 7 skipped in E2E)
- desktop/mobile: Review/Gallery の主画像読み込みと横はみ出しなしを確認。Review の関連画像も遅延読み込み後に表示。
- 生成 HTML: Review→Gallery、Gallery→Review の相互リンクを確認。
- 楽天リンク: URL 完全一致、別タブ、`nofollow` を確認。
- 計測 img: `dist/` の Review/Gallery HTML とも0件。
- Claude review gate: diff と cross-check が成立、blocking 0。
- PR: [#192](https://github.com/shogot23/codex-coco-s-site/pull/192) を squash merge。merge commit `b3e7c982d4863e998905c1e093c461aec034d467`。frontend-verify、Cloudflare Workers Builds、Netlify preview は pass。
- main / origin/main: PR #192 反映時点で同じ `b3e7c982d4863e998905c1e093c461aec034d467`。同期前からの未コミット3ファイルの SHA は変化なし。リモート・ローカルの作業ブランチ削除、専用 worktree はアーカイブ済み。
- GitHub Pages: [公開run 36545718815](https://github.com/shogot23/codex-coco-s-site/actions/runs/36545718815) の build/deploy が成功。Review/Gallery の公開 HTML は両方 HTTP 200、相互リンク・楽天リンクあり、計測 img 0件。HTML が参照する最適化画像も HTTP 200。
