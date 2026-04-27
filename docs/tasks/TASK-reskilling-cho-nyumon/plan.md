# Plan

## Task

- task-id: TASK-reskilling-cho-nyumon
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 書籍「リスキリング超入門」のギャラリーエントリとレビューページを新規追加
- なぜ今やるか: inbox に画像が配置済みでコンテンツ追加の準備が整っている

## Scope Declaration

- 変更対象ファイル:
  - `public/uploads/gallery/books/Reskilling_Cho_Nyumon_Tokuoka_Koichiro_Futa_Hiroshi.png`（新規）
  - `public/uploads/gallery/books/Reskilling_Cho_Nyumon_Tokuoka_Koichiro_Futa_Hiroshi_infographic.png`（新規）
  - `src/content/gallery/business-a8b5e2.md`（新規）
  - `src/content/reviews/risukiringu-cho-nyumon.md`（新規）
  - `data/gallery-manifest.json`（更新）
- 変更しないもの: 既存のコンポーネント、設定ファイル、他のコンテンツファイル

## Parallel Work Check

- [x] P1: 同時に進めるべき独立タスクが2つ以上ある → なし
- [ ] P2: 該当なし
- [ ] P3: 該当なし

単独で進める。

## Implementation Steps

1. ブランチ作成: `feat/add-reskilling-cho-nyumon`
2. 画像コピー（2ファイル）
3. ギャラリーエントリ作成
4. レビュー作成（frontmatter + 本文）
5. Manifest 更新
6. `npm run verify:frontend` 実行
7. 自己レビュー（差分確認）
8. Commit & `pr-merge` スキルで PR→merge

## Risks And Guards

- 想定リスク: manifest JSON のフォーマット崩れ
- 回避策: 既存エントリのフォーマットに厳密に合わせる
- scope 外に見つけた事項の扱い: 記録のみ、触らない

## Verification

- 実行するコマンド:
  - `npm run verify:frontend`
- 追加確認: ギャラリーとレビューページのレンダリング確認

## Approval

- approver: self
- status: approved
- note: 個人運用での自己承認
