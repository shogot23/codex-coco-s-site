# PBI Input

## Task

- task-id: TASK-imada-honnoji-review-gallery-2026-10-16
- request: 「未だ本能寺にあり」のレビューとギャラリーを読書 with Coco のサイトへ反映し、PRからsquash mergeする。
- classification: `publish/dev-critical`

## User Requirements

- 添付のギャラリー画像とインフォグラフィック、本の確認済み内容を反映する。
- ブランド方針に沿って、書籍紹介やあらすじより、読者の困りごとに本の視点をつなぎ、次の一歩を残す。
- 育児の場面は0歳児と暮らす父親の目線にする。授乳、インフォグラフィック内のココちゃん紹介、三成の話はレビューへ入れない。
- もしもアフィリエイトURLを楽天購入リンクとして登録する。
- Claudeレビューを指摘がなくなるまで行い、PR経由でmergeする。

## Reader Route

- 困りごと: おむつを替えて抱き上げても泣きやまない0歳児を前に、父親として何ができるのか分からず、自分の関わり方を責めそうになる。
- 本からの視点: 立場の違う8人の証言から一つの出来事をたどる構成と、確認できたこと・伝聞・推測の距離。
- 見方の変化: 赤ちゃんが泣いていることと、自分の関わり方が悪いという評価を分け、理由がまだ分からない状態を残す。
- 選べる一歩: 余裕があれば「目の前で起きていること」と「そこから考えたこと」を一つずつ言葉にする。手を借りる、休む、今日は考えるのをやめる選択も残す。

## Source Boundaries

- 本文は[出版社の書籍紹介](https://www.gentosha.co.jp/book/detail/9784344046467/)、[公式試し読み](https://www.gentosha.jp/viewer/viewer.html?cid=12943&lin=1)の序章p.8–15、[公式冒頭漫画](https://www.gentosha.co.jp/topic/detail/033516/)、[著者インタビュー](https://webun.jp/articles/-/792747)、およびユーザー提供インフォグラフィックで確認した要素に限定する。
- 全編読了や結末の感想を装わず、人物・事件のあらすじを並べない。
- 「事実と推測を分ける」は作品の構造から日常へ移した編集上の提案であり、本の実用手順や著者の主張として書かない。
- 8人の証言は小説の構成を指し、現存する8件の史料とは扱わない。
- ギャラリー画像はユーザー提供原本を保持する。制作由来を示す明確な情報がないため `visualOrigin` は付与しない。

## Inputs

- gallery source: `inbox/gallery/A1437E62-4CE4-45A0-B347-A829883D247F.png` (1092×1440; SHA-256 `af6ac704906c2888204c6b5d1a34d0b3d9290d81f39040bdf01d1663a1b3c943`)
- infographic source: `inbox/infographic/20261012-220615-未だ本能寺にあり-今村翔吾.png` (1080×1350; SHA-256 `1f7b8681bf5ead1ee2c2fdb6d474f26d099f22031e592c284dff6fc603d19d6d`)
- affiliate: user-provided Moshimo Rakuten link for ISBN/book page `https://item.rakuten.co.jp/book/18748215/`
