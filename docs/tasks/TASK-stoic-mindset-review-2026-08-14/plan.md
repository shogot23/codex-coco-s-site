# Plan

## Task

- task-id: `TASK-stoic-mindset-review-2026-08-14`
- related pbi: `docs/tasks/TASK-stoic-mindset-review-2026-08-14/pbi-input.md`

## Intent

- 何を変えるか: 『ストイック・マインドセット』の公開Reviewとインフォグラフィック、Gallery作品と書斎画像を追加する。
- なぜ今やるか: ユーザーが提供画像2点、確認済みレビュー、もしも楽天リンクのGallery・Review反映からPR mergeまでを依頼したため。

## Scope Declaration

- 変更対象ファイル: `src/content/reviews/stoic-mindset.md`、`src/content/gallery/psychology-stoic-mindset.md`、`public/uploads/review/infographic/stoic_mindset_mark_tuitert.png`、`public/uploads/gallery/books/Stoic_Mindset_Mark_Tuitert.png`、`public/media/manifest.json`、本タスク記録、`inbox/daily/2026-08-14.md`。
- 変更しないもの: ページテンプレート、content schema、既存Review・Gallery作品、既存CTAと購入導線設計。

## Frontend Thesis

- visual thesis: Galleryでは書斎の静かな朝の光とココちゃんを通して「本から生まれた思索」を見せ、Reviewでは生成りの図解とコンパスで足元の一歩へ視線を導く。用途の異なる2画像を混同しない。
- content plan: 結果や他人の反応まで背負う読者の疲れから入り、感情抑圧ではないストア派、結果よりプロセス、地図よりコンパス、10原則の広がりを伝え、紙を二分して5分の行動を選ぶ一歩で閉じる。
- interaction thesis: Review本文とLife Repair Notesを主導線、Galleryを読後の副導線、外部購入リンクを第三優先とし、ReviewとGalleryを既存`relatedReview`で相互接続する。

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある
- [x] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [x] P3: 順序に依存がない（どちらが先でも成立する）

既存content構造、画像用途、workflow/affiliate契約のread-only調査をサブエージェントへ分担し、親エージェントがPlanGate、実装、検証、レビュー、PR統合を担当する。

## Implementation Steps

1. 既存作品の`public/uploads/gallery/books/Title_Author.png`と`public/uploads/review/infographic/title_author.png`の配置規約を確認し、`image-1.png`をGallery用`public/uploads/gallery/books/Stoic_Mindset_Mark_Tuitert.png`へ、`image-2.png`をReview用`public/uploads/review/infographic/stoic_mindset_mark_tuitert.png`へコピーする。
2. review frontmatterへ既存schemaの編集フィールド、正規化済み`purchaseLinks`、画像参照を設定し、ブランド完成稿を追加する。受領HTMLの`href`だけを取り出し、先頭`//`を`https://`へ、`&amp;amp;`を通常の`&`へ1回だけ戻し、計測用`img`はschema外として含めない。
3. gallery frontmatterへ書誌、画像、余韻メモ、`relatedReview`、`visualOrigin`、公開状態を設定する。購入リンクは関連Reviewから既存テンプレートが引き継ぐ。
4. `npm run media:generate`で派生画像と`public/media/manifest.json`を更新し、対象2原本のmanifest登録を確認する。
5. 一覧・両詳細・相互導線・購入リンク・用途別画像を生成HTMLとdesktop/mobile実表示で確認する。
6. full frontend verify、Claude Review Gate、Sol独立最終確認を完了し、`pr-merge` Pattern Dでcommit、PR、checks、squash merge、main同期、branch/worktree cleanupを行う。

## Risks And Guards

- 想定リスク: 2画像の取り違え、アフィリエイトURLの二重エスケープ、ストイックを感情抑圧として扱うこと、10原則を勝敗論だけへ狭めること、購入導線が記事価値より目立つこと、ユーザー所有の未追跡ファイルを巻き込むこと。
- 回避策: 画像の寸法・hash・内容を記録し、Review/Galleryで別パスに固定する。`href`のみを既存形式へ正規化する。著者自身の解釈と実践であること、感情理解、チーム・運命・死・幸福・人格・行動への広がりを本文に残す。別worktreeで実装し、main側の未追跡ファイルへ触れない。
- scope 外に見つけた事項の扱い: 本タスクでは変更せず、必要なら別タスクとして記録する。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run check:content`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認: `shasum -a 256`で入力と公開コピーのhash一致、`sips -g pixelWidth -g pixelHeight -g format`でGallery 1122×1402 PNG／Review 1080×1350 PNG、`git diff --check`、生成HTML内のタイトル・本文・用途別画像・相互リンク・正規化URLと`target="_blank"` / `rel="noopener noreferrer nofollow"`、desktop/mobileの横overflowと可読性、Claude Review Gateのblocking 0件、Sol独立目視を確認する。

## Approval

- approver: task ownerによる実装・PR・mergeの明示依頼。reviewerはClaude Review Gate。
- status: approved
- note: 2026-08-14の依頼を、既存構造への最小差分、全frontend verify、外部レビューとSol独立確認を含むscope・検証方針として承認済みと扱う。

plan承認前はコード変更しない。
