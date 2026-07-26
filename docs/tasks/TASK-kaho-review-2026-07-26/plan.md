# Plan

## Task

- task-id: TASK-kaho-review-2026-07-26
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 『夏帆─The Tale of KAHO─』のレビュー本文、メタデータ、インフォグラフィック、関連ギャラリー景色を追加する
- なぜ今やるか: ユーザー提供の画像と確認済みの書誌・内容を、読書withCocoの読後体験として公開するため

## Scope Declaration

- 変更対象ファイル:
  - `src/content/reviews/kaho-the-tale-of-kaho.md`
  - `src/content/gallery/novel-kaho-the-tale-of-kaho.md`
  - `public/uploads/review/infographic/kaho_the_tale_of_kaho_murakami_haruki.png`
  - `public/uploads/gallery/books/Kaho_The_Tale_of_KAHO_Murakami_Haruki.png`
  - `inbox/daily/2026-07-26.md`
  - `docs/tasks/TASK-kaho-review-2026-07-26/*`
- 変更しないもの: 既存の Astro ページ、スタイル、既存コンテンツ、提供元の `inbox/` ファイル
- scope 外: 画像の WebP / AVIF 変換、サムネイル生成、既存画像の最適化

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

並列調査として、対象ファイル構造、ブランド適合、検証影響を読み取り専用サブエージェントへ分担した。

## Implementation Steps

1. 提供画像の比率・書誌・ブランド正本・既存コンテンツ構造を確認する。
2. ブランド方針に沿った review/gallery frontmatter と本文を追加する。
3. 提供画像を公開用の `public/uploads/` へコピーし、パスを正本へ接続する。
4. content schema、lint、typecheck、build、e2e、frontend verify を確認する。
5. 提供されたもしもアフィリエイトの `href` のみを購入リンクとして追加し、計測用画像は追加しない。
6. Claude review gate を `ok: true` まで実行し、status と daily/worklog を更新する。

## Risks And Guards

- 想定リスク: タイトル・著者・章題などの固有名詞誤り、画像パス不一致、review/gallery の参照不一致、本文が要約だけになること、アフィリエイトHTMLの不要な計測画像混入
- 回避策: 新潮社公式情報と既存 schema を照合し、slug と `relatedReview` を統一し、問い・変化・行動を本文に残す。購入用 `href` のみを `https` URL として保存する。
- scope 外に見つけた事項の扱い: 別タスクに分離し、今回の差分へ混ぜない

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `/reviews/kaho-the-tale-of-kaho/` にタイトル、著者、本文、インフォグラフィックが表示される
  - 関連ギャラリー導線が `/gallery/novel-kaho-the-tale-of-kaho/` を指す
  - ギャラリー詳細からレビュー詳細へ戻れる
  - 生成物に画像が含まれ、既存の inbox 未追跡画像を変更していない

## Approval

- approver: Codex (owner; pre-implementation self-approval)
- status: approved
- note: scope、検証方針、提供された購入リンクの採用方針を確認済み。公開前の Claude review gate は別途必須。
