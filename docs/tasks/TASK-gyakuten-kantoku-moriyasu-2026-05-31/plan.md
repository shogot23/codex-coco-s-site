# Plan

## Task

- task-id: TASK-gyakuten-kantoku-moriyasu-2026-05-31
- related pbi: TASK-gyakuten-kantoku-moriyasu-2026-05-31

## Intent

- 何を変えるか: 「逆転監督 森保一」（木崎伸也）の gallery/review content と関連画像を追加する
- なぜ今やるか: ユーザー提供の画像・インフォグラフィック・レビュー本文・もしもURLを公開サイトへ反映するため

## Classification

- 判定: `publish/dev-critical`
- 理由: 公開サイトへ反映される content 追加であり、`src/` と `public/` を変更するため
- 必須 gate: frontend verify と Claude review gate

## Visual Thesis

- 夕方のグラウンドに残る光の中で、ココちゃんが勝つための厳しさと、人を信じて任せる余白の両方を案内する場面として見せる。

## Content Plan

- ギャラリーは画像を主役にし、「安心して力を出せる場所」への問いを短く添える。
- レビューはユーザー提供本文を軸に、森保監督の遠回り、対話、信じて任せる余白を、職場や家庭にも持ち帰れる学びとして扱う。
- アフィリエイト導線は `楽天で見る` の secondary 導線として扱い、本文価値より前に出さない。

## Interaction Thesis

- ギャラリー詳細からレビュー詳細へ、レビュー詳細からギャラリー詳細へ、読後の余韻がつながる導線を置く。
- 購入リンクは既存 UI の Reading Shelf / bridge に乗せ、購入主役の構成にしない。
- ページレイアウトは変更せず、既存 content collection の表示ルールに沿って反映する。

## Scope Declaration

- 変更対象ファイル:
  - `docs/tasks/TASK-gyakuten-kantoku-moriyasu-2026-05-31/pbi-input.md`
  - `docs/tasks/TASK-gyakuten-kantoku-moriyasu-2026-05-31/plan.md`
  - `docs/tasks/TASK-gyakuten-kantoku-moriyasu-2026-05-31/test-cases.md`
  - `docs/tasks/TASK-gyakuten-kantoku-moriyasu-2026-05-31/status.md`
  - `public/uploads/gallery/books/Gyakuten_Kantoku_Moriyasu_Hajime_Kizaki_Shinya.png`
  - `public/uploads/review/infographic/gyakuten_kantoku_moriyasu_hajime_kizaki_shinya.png`
  - `src/content/gallery/nonfiction-gyakuten-kantoku-moriyasu-hajime.md`
  - `src/content/reviews/gyakuten-kantoku-moriyasu-hajime.md`
  - `inbox/daily/2026-05-31.md`
- 変更しないもの:
  - UI コンポーネント
  - collection schema
  - 既存 content の内容
  - build / test / deployment 設定
  - 無関係な `inbox/` ファイルや `.DS_Store`

## Asset Source Mapping

- gallery source:
  - from: `inbox/gallery/FD768155-70EA-4378-A6E0-DA0A8C35CAD4.png`
  - to: `public/uploads/gallery/books/Gyakuten_Kantoku_Moriyasu_Hajime_Kizaki_Shinya.png`
- infographic source:
  - from: `inbox/infographic/20260531-215735-逆転監督-森保一-木崎伸也.png`
  - to: `public/uploads/review/infographic/gyakuten_kantoku_moriyasu_hajime_kizaki_shinya.png`

## Frontmatter Decisions

- review:
  - `title`: `逆転監督 森保一`
  - `bookTitle`: `逆転監督 森保一`
  - `author`: `木崎伸也`
  - `description`: `森保監督の遠回りから、強い組織に必要な安心と余白を考えさせてくれる一冊。`
  - `excerpt`: `強い組織は、正解を押しつける場所ではなく、安心して力を出せる場所から生まれる。`
  - `readingCompass`: `勝敗や采配の裏側だけでなく、挫折を通ってきた人がどう相手を見て、任せる余白をつくるのかに注目して読むと、この本の問いはサッカーの外側にも静かに広がります。`
  - `date`: `2026-05-31`
  - `cover`: `/uploads/gallery/books/Gyakuten_Kantoku_Moriyasu_Hajime_Kizaki_Shinya.png`
  - `infographic`: `/uploads/review/infographic/gyakuten_kantoku_moriyasu_hajime_kizaki_shinya.png`
  - `tags`: `ノンフィクション`, `再起`, `ビジネス`
  - `recommendedFor`: 組織づくり、任せること、批判や失敗の受け止め方を考えたい人向けに3件
  - `purchaseLinks`: `楽天で見る` の1件
  - `published`: `true`
- gallery:
  - `title`: `逆転監督 森保一`
  - `image`: `/uploads/gallery/books/Gyakuten_Kantoku_Moriyasu_Hajime_Kizaki_Shinya.png`
  - `genre`: `ノンフィクション`
  - `author`: `木崎伸也`
  - `description`: `安心して力を出せる場所づくりを、サッカーの現場から考える一冊。`
  - `note`: `夕方のグラウンドに残る光の中で、勝つための厳しさと、人を信じて任せる余白が同じ景色として立ち上がる。`
  - `generated_at`: `2026-05-31T12:57:35.000Z`
  - `source_file`: `gallery/books/Gyakuten_Kantoku_Moriyasu_Hajime_Kizaki_Shinya.png`
  - `relatedReview`: `gyakuten-kantoku-moriyasu-hajime`
  - `published`: `true`

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

調査フェーズは、content 構成調査とブランド方針調査をサブエージェントへ分担済み。実装フェーズは差分が小さく相互参照が密なため、親エージェントが単独で最小差分を入れる。

## Implementation Steps

1. 作業ブランチ `codex/gyakuten-kantoku-moriyasu-2026-05-31` で進める。
2. PlanGate ファイルを作成する。
3. gallery 画像と infographic を public assets へコピーする。
4. gallery entry を `nonfiction-gyakuten-kantoku-moriyasu-hajime.md` として追加する。
5. review entry を `gyakuten-kantoku-moriyasu-hajime.md` として追加する。
6. daily record と status を更新する。
7. `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` → `npm run verify:frontend` を実行する。
8. Claude review gate を `ok: true` まで実行する。

## Risks And Guards

- 想定リスク: `relatedReview` の参照名ミスで build が失敗する。
- 回避策: review slug と gallery `relatedReview` を `gyakuten-kantoku-moriyasu-hajime` に統一する。
- 想定リスク: もしも URL の HTML 断片をそのまま入れて schema に合わない。
- 回避策: `href` のみを `https://af.moshimo.com/...` へ正規化して frontmatter に入れる。
- 想定リスク: 無関係な未追跡 inbox ファイルを巻き込む。
- 回避策: 今回指定された2画像と daily のみを対象にし、`.DS_Store` や別書籍の画像は触らない。
- scope 外に見つけた事項の扱い: 別タスクへ分離し、今回の差分には含めない。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - gallery/review content の frontmatter を目視確認する
  - 「逆転監督 森保一」の gallery/review 間導線が成立していることを確認する
  - purchase link が `楽天で見る` として表示され、href のみを保存していることを確認する
  - Claude review gate で blocking issue がないことを確認する

## Approval

- approver: user / Codex
- status: approved
- note: ユーザーが 2026-05-31 にレビュー本文ともしもアフィリエイト URL を確認済み。Codex がブランド方針との整合を最終チェックし、本文を採用する。

plan 承認前はコード変更しない。
