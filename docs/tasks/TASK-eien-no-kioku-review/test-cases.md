# Test Cases

## Task

- task-id: TASK-eien-no-kioku-review
- related plan: `plan.md`

## Must Check

- [x] 書誌情報(タイトル・著者・シリーズ位置)が正確である — 文藝春秋公式書誌(ISBN 978-4-16-392132-7、2026-08-05 刊、ガリレオシリーズ長編第11作)で確認
- [x] インフォグラフィックの3ポイント(事件の入口 / 履歴をたどる / 正しさの先を見る)と原稿の軸が一致している
- [x] ブランド4軸(問い・変化・実生活・ココちゃん)が原稿に含まれている
- [x] 今日の一歩・ココちゃんの問いがインフォグラフィックと整合している
- [x] ネタバレ(結末・復讐の全容・登場人物の「失ったもの」の正体)が原稿に含まれていない
- [x] scope 外の変更が入っていない

## Command Checks

- [x] `npm run check:content` — 38 published reviews 監査通過
- [x] `npm run lint` — 通過
- [x] `npm run typecheck` — 0 errors / 0 warnings
- [x] `npm run build` — 142 pages(gallery 詳細 novel-015c11 の 1ページ増)、check:dist(links/integrity/performance)通過
- [x] `npm run verify:frontend` — e2e 51 passed / 7 skipped / 0 failed

## Manual Checks

- [x] インフォグラフィック画像が `public/uploads/review/infographic/` に配置され、manifest に登録されている(hash: 1002ea45027aed72、1080x1350、card/detail/hero の AVIF/WebP + social JPG)
- [x] gallery 画像が `public/uploads/gallery/books/Eien_no_Kioku_Higashino_Keigo.png` に配置され、manifest に登録されている(hash: 93ec261784b08366、1122x1402、派生生成、旧 import 名エントリは manifest 上に残存なし)
- [x] レビュー詳細ページのヒーロー画像は `infographic ?? cover` の優先順によりインフォグラフィックの派生(1002ea45027aed72/hero-960・1440 avif/webp、OG social-1200x630)で表示されている
- [x] レビュー一覧のサムネイルは `galleryImage ?? cover ?? infographic` の優先順により gallery 画像の派生(93ec261784b08366/card-320.webp)で表示されている(生成 HTML で確認)
- [x] gallery 詳細(novel-015c11)のタイトル・review 相互リンク(2箇所)・楽天リンク・派生画像(93ec261784b08366/card-640)、gallery 一覧への新 entry 表示(4参照)を確認
- [x] purchaseLinks の Amazon 検索リンクが正しい書名で機能する(HTTP 200 確認)
- [x] 楽天 moshimo アフィリエイト URL(review・gallery 両方)が本書の商品ページ(item.rakuten.co.jp/book/18664673/)へ到達する(HTTP 302 リダイレクト先で確認、URL はユーザー提供分の転記)

## Out Of Scope

- 今回やらない確認: 既存レビュー・ギャラリーの内容監査、UI コンポーネントの変更。
