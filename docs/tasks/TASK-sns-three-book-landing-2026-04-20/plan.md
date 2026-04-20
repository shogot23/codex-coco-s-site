# Plan

## Task

- task-id: `TASK-sns-three-book-landing-2026-04-20`
- related pbi: `docs/tasks/TASK-sns-three-book-landing-2026-04-20/pbi-input.md`

## Intent

- 何を変えるか:
  - SNS専用入口 `/3books/` を追加し、対象3冊の review detail と Home 補助導線を整備する
- なぜ今やるか:
  - SNSプロフィール改善に合わせ、初見ユーザーの最初の迷いを減らす入口が必要で、同時に review detail 不足も解消したいため

## Scope Declaration

- 変更対象ファイル:
  - `docs/tasks/TASK-sns-three-book-landing-2026-04-20/pbi-input.md`
  - `docs/tasks/TASK-sns-three-book-landing-2026-04-20/plan.md`
  - `docs/tasks/TASK-sns-three-book-landing-2026-04-20/test-cases.md`
  - `docs/tasks/TASK-sns-three-book-landing-2026-04-20/status.md`
  - `src/pages/index.astro`
  - `src/pages/3books.astro`
  - `src/content/reviews/guzen-ha-donoyouni-anata-wo-tsukurunoka.md`
  - `src/content/reviews/in-the-megachurch.md`
  - `src/content/reviews/jinsei-kouhan-no-senryakusho.md`
  - `src/content/gallery/business-b6e8d3.md`
  - `src/content/gallery/business-193591.md`
  - `public/uploads/gallery/books/In_The_Megachurch_Asai_Ryo.png`
  - `public/uploads/review/infographic/*`
  - `tests/e2e/site-smoke.spec.ts`
- 変更しないもの:
  - schema
  - nav
  - `src/pages/reviews.astro`
  - `src/pages/reviews/[slug].astro`
  - `イン・ザ・メガチャーチ` 用 gallery 新設
  - Home 全体の構成再設計

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。  
1つでも未チェックなら単独で進める。

## Visual Thesis

- 初見ユーザーに「ここから入ればいい」が3秒で伝わる、静かな案内板として `/3books/` を設計する

## Content Plan

- hero
- 3冊の chapter block
- footer 補助導線

## Interaction Thesis

- 主導線は常に `レビューを読む`
- 購入導線は常に secondary
- Home の `/3books/` 導線は補助ボタン1つに留める

## Background

- SNS からの初見流入に対して、既存トップより少しだけわかりやすく、しかし既存世界観は壊さない専用入口が必要
- 対象3冊のうち review detail が未整備なので、LP と detail を同時に用意する

## Purpose

- 3冊の違いを短時間で伝える
- review detail を主導線にする
- 必要な人だけ購入リンクに進める
- 既存サイトの静かな上質さを維持する

## Out Of Scope

- 新しい schema や data layer 導入
- 既存サイト全体の情報設計変更
- affiliate 導線の拡大
- gallery の追加量産

## Existing References

- `AGENTS.md`
- `CLAUDE.md`
- `DESIGN.md`
- `docs/reading-with-coco-design-doctrine.md`
- `docs/frontend-playbook.md`
- `docs/revenue-pathway-design.md`
- `docs/parallel-dev-core.md`
- `docs/parallel-dev-config.md`
- 既存実装:
  - `src/pages/index.astro`
  - `src/pages/reviews.astro`
  - `src/pages/reviews/[slug].astro`

## Implementation Policy

- schema は変更しない
- 既存 `reviews` frontmatter の構造に揃える
- `purchaseLinks` を source of truth とする
- slug ベタ書き条件分岐は置かず、ページ内ローカル定義または既存 frontmatter から組み立てる
- `イン・ザ・メガチャーチ` review detail は gallery 接続を持たず、既存 fallback 導線で成立させる
- 画像は意味がわかるファイル名に整理して `public` へ配置する

## Design Policy

- `/3books/` は card grid ではなく 3つの chapter を縦に読む構成
- hero copy は固定:
  - kicker: `読書 with Coco / Start Here`
  - title: `最初の3冊から、読書 with Coco をひらく。`
  - subcopy: `SNSから来てくれた人へ。まずは、世界の見え方が変わる一冊、熱狂との距離を見つめる一冊、これからの働き方を考える一冊からどうぞ。`
- 3冊の順番は固定:
  1. `偶然はどのようにあなたをつくるのか`
  2. `イン・ザ・メガチャーチ`
  3. `人生後半の戦略書`
- モバイルでは CTA をフル幅 stack にする

## CTA Policy

- `/3books/` の主CTAは各本の `レビューを読む`
- 購入導線は `purchaseLinks.label` をそのまま使う
- footer 補助導線:
  - `レビュー一覧を見る`
  - `ギャラリーを見る`
- Home 追加導線:
  - 文言: `3booksへ`
  - 強さ: `inline-button inline-button-secondary` 相当
  - 既存主CTAより強くしない
  - `reviews-section` の action 群に寄せて配置する

## Copy Policy

- landing 用短い紹介文は固定:
  - 偶然本: `偶然の積み重なりでできた「今」を見つめ直すと、不安の中でも今日の一歩が少し選びやすくなる。`
  - メガチャーチ: `失ったように見える熱狂を、忙しさではなく成長や立場の変化から見直していく読書。`
  - 人生後半: `成功を追い続ける働き方から少し降りて、人生後半の知恵の使い方を考え直す一冊。`
- footer copy は固定:
  - title: `この3冊のあとに、ほかのレビューへ。`
  - body: `気になったテーマが見つかったら、レビュー一覧とギャラリーで、もう少しゆっくり寄り道できます。`

## Review Frontmatter Fixed Values

- `guzen-ha-donoyouni-anata-wo-tsukurunoka`
  - title: `偶然はどのようにあなたをつくるのか`
  - author: `ブライアン・クラス`
  - date: `2026-04-20`
  - description: `偶然の積み重なりでできた「今」を見つめ直すことで、不安の中でも今日の一歩を選び直せる一冊。`
  - excerpt: `人生はコントロールできない。けれど偶発的だからこそ、予想外の嬉しいことにも出会える。`
  - readingCompass: `運命論として読むよりも、変えられないものを受け入れ、変えられるものを少しずつ試す視点で開くと、この本のワクワクが自分の行動に近づきます。`
  - recommendedFor:
    - `先のことが見えなくて不安な人`
    - `頑張っているのに報われない感じが続いている人`
    - `世界の見え方を変えたい人`
  - purchaseLinks: `src/content/gallery/business-b6e8d3.md` を流用
  - cover: `/uploads/gallery/books/How_Coincidence_Makes_You_Brian_Klass.jpeg`
  - infographic: `/uploads/review/infographic/how_coincidence_makes_you_brian_klass.png`
- `in-the-megachurch`
  - title: `イン・ザ・メガチャーチ`
  - author: `朝井リョウ`
  - date: `2026-04-20`
  - description: `失ったように見える熱狂を、忙しさではなく成長や立場の変化から見つめ直す読書。`
  - excerpt: `熱狂が消えたのは、冷めたからじゃなくて“成長”だったのかもしれない。`
  - readingCompass: `熱狂を善悪で決める本として急いで読むよりも、自分が心地よく信じている「物語」がどこで支えになり、どこで視野を狭めるのかを考えながら開くと、この本の問いがより深く残ります。`
  - recommendedFor:
    - `昔ほど熱狂できなくなったものがある人`
    - `役割や責任の変化で好きなものとの距離が変わった人`
    - `いまも自分を救っている熱を確かめたい人`
  - purchaseLinks:
    - label: `楽天で見る`
    - url: `https://af.moshimo.com/af/c/click?a_id=5459507&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18328668%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F21691921%2F`
  - cover: `/uploads/gallery/books/In_The_Megachurch_Asai_Ryo.png`
  - infographic: `/uploads/review/infographic/in_the_megachurch_asai_ryo.png`
- `jinsei-kouhan-no-senryakusho`
  - title: `人生後半の戦略書`
  - author: `アーサー・C・ブルックス`
  - date: `2026-04-20`
  - description: `成功依存から少しずつ降りて、人生後半に向けた働き方と知恵の使い方を組み替えるための一冊。`
  - excerpt: `今の働き方、一生続けられますか？`
  - readingCompass: `衰えの話として身構えるより、これから何に知恵を移していくかを考える入口として読むと、焦りより設計の視点が残ります。`
  - recommendedFor:
    - `今の働き方を一生続けられるのか不安な人`
    - `焦りや詰まりを感じている人`
    - `成功の追い方を少し変えたい人`
  - purchaseLinks: `src/content/gallery/business-193591.md` を流用
  - cover: `/uploads/gallery/books/LifeStrategyForSecondHalf_ArthurCBrooks.png`
  - infographic: `/uploads/review/infographic/life_strategy_for_second_half_arthur_c_brooks.png`

## Gallery Policy

- `src/content/gallery/business-b6e8d3.md`
  - title を `偶然はどのようにあなたをつくるのか` に更新
  - `relatedReview: guzen-ha-donoyouni-anata-wo-tsukurunoka` を追加
- `src/content/gallery/business-193591.md`
  - `relatedReview: jinsei-kouhan-no-senryakusho` を追加
- `イン・ザ・メガチャーチ` 用 gallery は新設しない

## Image Policy

- 添付画像:
  - `/Users/shogo/Projects/codex-coco-s-site-main/inbox/gallery/211D3880-96E2-4CA3-9B3D-43787DA1B3D2.png`
    → `public/uploads/gallery/books/In_The_Megachurch_Asai_Ryo.png`
- infographics:
  - `/Users/shogo/Projects/codex-coco-s-site-main/inbox/infographic/IMG_5640.PNG`
  - `/Users/shogo/Projects/codex-coco-s-site-main/inbox/infographic/IMG_5860.PNG`
  - `/Users/shogo/Projects/codex-coco-s-site-main/inbox/infographic/IMG_6731.PNG`
  を以下の名前で `public/uploads/review/infographic/` に配置
  - `how_coincidence_makes_you_brian_klass.png`
  - `in_the_megachurch_asai_ryo.png`
  - `life_strategy_for_second_half_arthur_c_brooks.png`

## Implementation Steps

1. task docs を作成し、scope と fixed decisions を先に固定する
2. 必要画像を `public` 配下へ配置し、参照パスを決める
3. review 3本を `src/content/reviews/` に追加する
4. `/3books/` を実装する
5. Home に `3booksへ` 補助ボタンを追加する
6. gallery 2件に `relatedReview` を追加し、偶然本 title を揃える
7. e2e を必要最小限で更新する
8. `lint` → `typecheck` → `build` → `test:e2e` → `verify:frontend`
9. `claude-review-gate` を実施し、`ok: true` を確認する
10. `status.md` を更新する

## Risks And Guards

- 想定リスク:
  - Home 補助導線が主CTAより目立つ
  - `/3books/` が generic LP に寄る
  - review 原稿に意味補完が混ざる
- 回避策:
  - Home 導線は secondary のみ
  - `/3books/` は chapter 構成で実装
  - review 原稿は段落整理と軽微修正のみに限定
- scope 外に見つけた事項の扱い:
  - 記録のみ行い、別 task に分離する

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `/3books/` の hero と3冊タイトルが表示される
  - Home の `3booksへ` から `/3books/` へ遷移できる
  - `/3books/` から各 review detail に遷移できる
  - 各 review detail で purchase shelf が表示される
  - 偶然本と人生後半で gallery 導線が成立する
  - desktop / mobile とも横スクロールが出ない

## Approval

- approver: self
- status: approved
- note: ユーザー合意済み内容を source of truth として固定

plan 承認前はコード変更しない。
