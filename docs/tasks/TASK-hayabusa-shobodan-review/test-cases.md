# Test Cases

## Task

- task-id: TASK-hayabusa-shobodan-review
- related plan: `plan.md`

## Must Check

- [x] 書誌情報(タイトル・著者・シリーズ位置)が正確である — 集英社公式書誌(ISBN 978-4-08-770063-3)で確認(池井戸潤、シリーズ第2作、2026年8月5日刊)
- [x] インフォグラフィックの3ポイント(町に眠る記憶 / ふたつの疑惑 / 受け継ぐという選択)と原稿の軸が一致している
- [x] ブランド4軸(問い・変化・実生活・ココちゃん)が原稿に含まれている
- [x] 今日の一歩・ココちゃんの問いがインフォグラフィックと整合している
- [x] ネタバレ(結末・犯人・「ある出会い」の中身)が原稿に含まれていない — 集英社公式あらすじの範囲(変死事件・盗作疑惑・開発の思惑・文学賞ノミネート)まで
- [x] scope 外の変更が入っていない

## Command Checks

- [x] `npm run check:content` — 37 published reviews 監査通過(原稿改善後も再実行して通過)
- [x] `npm run lint` — 通過
- [x] `npm run typecheck` — 通過
- [x] `npm run build` — gallery 追加後 140 pages(gallery 詳細 novel-9d63f4 の 1ページ増)
- [x] `npm run verify:frontend` — e2e 51 passed / 7 skipped / 0 failed(exit 0)

## Manual Checks

- [x] インフォグラフィック画像が `public/uploads/review/infographic/` に配置され、manifest に登録されている(hash: 92b26137a419fb64、1080x1350、card/detail/hero の AVIF/WebP + social JPG)
- [x] gallery 画像が `public/uploads/gallery/books/Hayabusa_Shobodan_Mori_e_Tsuzuku_Michi_Ikeido_Jun.png` に配置され、manifest に登録されている(hash: a5a1e95526158bc6、派生生成、旧 import 名エントリは manifest 上に残存なし)
- [x] レビュー詳細ページのヒーロー画像は `infographic ?? cover` の優先順によりインフォグラフィックの派生(hero-960/1440 avif/webp + OG social-1200x630)で表示されている
- [x] レビュー一覧・ホームのサムネイルは `galleryImage ?? cover ?? infographic` の優先順により gallery 画像の派生(a5a1e95526158bc6/card-320.webp)へ切り替わっている(生成 HTML で確認)
- [x] gallery 詳細(novel-9d63f4)のタイトル・review 相互リンク・楽天リンク・派生画像、gallery 一覧への新 entry 表示を確認
- [x] purchaseLinks の Amazon 検索リンクが正しい書名で機能する(HTTP 200 確認)
- [x] 楽天 moshimo アフィリエイト URL(review・gallery 両方)が本書の商品ページ(item.rakuten.co.jp/book/18601949/)へ到達する(HTTP 302 リダイレクト先で確認、URL はユーザー提供分の転記)

## Out Of Scope

- 今回やらない確認: 既存レビュー・ギャラリーの内容監査、UI コンポーネントの変更。
