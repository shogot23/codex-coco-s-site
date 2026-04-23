# Plan

## Task

- task-id: `TASK-gallery-and-exercise-review-2026-04-23`
- related pbi: `docs/tasks/TASK-gallery-and-exercise-review-2026-04-23/pbi-input.md`

## Intent

- 何を変えるか: gallery 2件と review 1件を追加し、運動本の gallery と review を既存導線で接続し、review tag に `健康` / `運動` を追加する
- なぜ今やるか: 素材、購入リンク、レビュー文が揃い、公開反映の準備が整ったため

## Scope Declaration

- 変更対象ファイル:
  - `docs/tasks/TASK-gallery-and-exercise-review-2026-04-23/`
  - `public/uploads/gallery/books/Shumatsu_no_Walkure_Kitan_Jack_the_Ripper_no_Jikenbo_10_Iizuka_Keita.png`
  - `public/uploads/gallery/books/Sekaiichi_Koritsu_ga_Ii_Saiko_no_Undo_Kawada_Hiroshi.png`
  - `public/uploads/review/infographic/sekaiichi_koritsu_ga_ii_saiko_no_undo_kawada_hiroshi.PNG`
  - `src/content/config.ts`
  - `src/content/gallery/manga-shumatsu-no-walkure-kitan-jack-the-ripper-no-jikenbo-10.md`
  - `src/content/gallery/health-sekaiichi-koritsu-ga-ii-saiko-no-undo.md`
  - `src/content/reviews/sekaiichi-koritsuga-ii-saikou-no-undou.md`
  - `inbox/daily/2026-04-23.md`
- 変更しないもの:
  - `src/pages/`
  - content schema
  - 既存 gallery / reviews の本文

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Implementation Steps

1. PlanGate 文書を作成し、scope と verify を固定する
2. `inbox/` の画像を公開パスへ配置する
3. `src/content/config.ts` に `健康` / `運動` を追加し、gallery 2件と review 1件の frontmatter / 本文を整える
4. `npm run lint`、`npm run typecheck`、`npm run build`、`npm run test:e2e`、`npm run verify:frontend` を実行する
5. `claude-review-gate` を `ok: true` まで通し、status と daily を更新する

## Risks And Guards

- 想定リスク:
  - description / note が既存トーンから浮く
  - review slug や `relatedReview` の綴りずれで導線が切れる
  - review tag を増やしたことで schema と frontmatter が食い違う
- 回避策:
  - 既存の健康系 / review 接続済み gallery を参照して frontmatter を合わせる
  - review filename と gallery `relatedReview` を同一文字列で固定する
  - tag 追加は `REVIEW_TAGS` の最小更新に留め、新規 review 側も同じ値を使う
- scope 外に見つけた事項の扱い:
  - 今回は記録のみとして別 task に分ける

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `/gallery` に2冊が表示される
  - ジャック・ザ・リッパー本の詳細と購入リンクが表示される
  - 運動本の gallery 詳細から review detail に遷移できる
  - 運動本 review detail で infographic が hero 表示される
  - 運動本 review のタグが `健康` / `運動` で通る

## Approval

- approver: self
- status: approved
- note: ユーザー承認済み計画に基づく自己承認

plan 承認前はコード変更しない。
