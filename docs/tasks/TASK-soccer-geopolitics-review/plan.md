# Plan

## Task

- task-id: `TASK-soccer-geopolitics-review`
- related pbi: `docs/tasks/TASK-soccer-geopolitics-review/pbi-input.md`

## Intent

- 何を変えるか: 「サッカーと地政学」のギャラリー画像を新アセットに差し替え、新規レビュー entry を追加して Gallery と Reviews を接続する
- なぜ今やるか: 公開サイト上で本 × ココちゃん × 学びの導線を保ったまま、この一冊の展示と感想を出せる状態にするため

## Scope Declaration

- 変更対象ファイル:
  - `src/content/gallery/business-767997.md`
  - `src/content/reviews/soccer-to-geopolitics.md`
  - `public/uploads/gallery/books/SoccerChiseigaku_KizakiShinnya.png`
  - `public/uploads/review/infographic/soccer_to_geopolitics_kizaki_shinya.PNG`
  - `docs/tasks/TASK-soccer-geopolitics-review/*`
- 変更しないもの:
  - `src/pages/` のレイアウト実装
  - 他書籍の content entry
  - デザイントークンや verify 設定

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべてチェックなら独立 worktree での並列実施を検討する。
1つでも未チェックなら単独で進める。

## Implementation Steps

1. PlanGate 文書を作成し、ブランチを切って作業前提を固定する
2. 差し替え画像とインフォグラフィック画像を公開パスへ配置する
3. ギャラリー entry を更新し、新規レビュー entry を追加する
4. typecheck / build / verify:frontend を実行する
5. `claude-review-gate` に沿ってレビューを通し、必要なら修正して `status.md` を更新する

## Risks And Guards

- 想定リスク: 画像パスの誤りでビルド後に表示崩れが起きる
- 回避策: 既存の公開パス命名に合わせて配置し、content frontmatter から直接参照する
- scope 外に見つけた事項の扱い: 今回は触らず `status.md` にメモする

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
  - `npm run verify:frontend`
- 追加確認:
  - Gallery と Review の相互リンクが生成されること
  - 差し替え画像と infographic が正しく参照されること

## Approval

- approver: self
- status: approved
- note: 2026-04-22 自己承認。依頼 scope と検証方針を確認済み

plan 承認前はコード変更しない。
