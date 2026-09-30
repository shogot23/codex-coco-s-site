# Plan

## Task

- task-id: TASK-yutoronika-review-gallery
- related pbi: `docs/tasks/TASK-yutoronika-review-gallery/pbi-input.md`

## Intent

- 何を変えるか: 小川哲『ユートロニカのこちら側』のReviewとGalleryを相互リンクで追加し、購入導線を両ページに設定する。
- なぜ今やるか: ユーザーが提供した書評、画像、アフィリエイトURLを読者に届く状態へ整えるため。

## Scope Declaration

- 変更対象ファイル: `src/content/reviews/yutoronika-no-kochira-gawa-ogawa-satoshi.md`; `src/content/gallery/novel-yutoronika-no-kochira-gawa-ogawa-satoshi.md`; `public/uploads/gallery/books/Yutoronika_no_Kochira_Gawa_Ogawa_Satoshi.png`; `public/uploads/review/infographic/yutoronika_no_kochira_gawa_ogawa_satoshi.png`; `public/media/manifest.json`; task record; `inbox/daily/2026-09-30.md`。
- 変更しないもの: 既存の作業ツリー、既存作品の本文や画像、共通UI、依存関係、アフィリエイトトラッキング画像。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単独作業とする。書評、メタデータ、画像参照、manifestの整合を一人がまとめて確認する。

## Implementation Steps

1. 提供画像、公式書誌、ブランド原典、既存content schemaを確認する。
2. PlanGateの範囲を承認記録し、Review/Gallery、画像、manifestを追加する。
3. 生成HTMLと画像variant、相互リンク、CTAを確認し、Claude reviewとfrontend検証を完了する。
4. PRを作成し、checksを確認してsquash merge。Pagesの反映後に公開ページと画像を確認する。

## Risks And Guards

- 想定リスク: 未追跡inbox画像や既存のdirty worktreeを誤って取り込む。Galleryの`generated_at`や相互参照、manifest hashを誤る。
- 回避策: cleanな管理worktreeで作業し、提供画像をSHA-256で照合。追加するファイルを限定し、build後の`gallery/data.json`とHTML参照画像を確認する。
- scope 外に見つけた事項の扱い: 変更せずstatusへ記録する。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run check:content`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: 画像の元ファイルと配信元のSHA-256・寸法、manifest `entries[path]`、Gallery一覧順、Review/Gallery両ルートと相互リンク、affiliate URL/属性/表示、デスクトップ・モバイル表示、PR checks、Pages公開HTMLとHTML参照AVIF/WebP。

## Approval

- approver: 依頼者（ユーザー指示）
- status: approved
- note: 「ギャラリーページとレビューページに反映」「PRからマージ処理をスキルを使って実施」の明示依頼により、上記scopeと検証方針を承認済みとして記録。
