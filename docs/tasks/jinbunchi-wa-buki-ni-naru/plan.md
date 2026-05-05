# Plan

## Task

- task-id: jinbunchi-wa-buki-ni-naru
- related pbi: pbi-input.md

## Intent

- 何を変えるか: ギャラリーエントリとレビューエントリを新規追加する
- なぜ今やるか: ユーザーから画像とレビュー文が提供されたため

## Scope Declaration

- 変更対象ファイル:
  - NEW: src/content/gallery/shinsho-jinbunchi-wa-buki-ni-naru.md
  - NEW: src/content/reviews/jinbunchi-wa-buki-ni-naru.md
  - COPY: public/uploads/gallery/books/Jinbunchi_Wa_Buki_Ni_Naru_Yamaguchi_Fukai.png
  - COPY: public/uploads/review/infographic/jinbunchi_wa_buki_ni_naru_yamaguchi_fukai.png
- 変更しないもの: 既存ファイルは一切変更しない

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある → 該当なし
- [x] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない → 該当なし

単独で進める。

## Implementation Steps

1. ブランチ作成
2. 画像2枚を public/uploads/ にコピー
3. ギャラリーエントリ作成（genre: 新書、relatedReview でレビューと相互リンク）
4. レビューエントリ作成（ユーザー提供レビュー文を使用）
5. typecheck / build / verify:frontend 実行

## Risks And Guards

- 想定リスク: relatedReview の slug 不一致
- 回避策: ギャラリーとレビューのファイル名を slug として一致させる
- scope 外に見つけた事項の扱い: 記録のみ、今回は対応しない

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
  - `npm run verify:frontend`
- 追加確認: ギャラリーとレビューの相互リンクが正しく機能するか

## Approval

- approver: 翔吾
- status: approved
- note: 自己承認

plan 承認前はコード変更しない。
