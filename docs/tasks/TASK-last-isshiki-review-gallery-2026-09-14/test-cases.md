# Test Cases

## Task

- task-id: TASK-last-isshiki-review-gallery-2026-09-14
- related plan: `plan.md`

## Must Check

- [x] 『最後の一色（上下）』がレビュー一覧と詳細に表示される
- [x] ギャラリー画像がギャラリー一覧と詳細に表示される
- [x] ギャラリーからレビュー、レビューからギャラリーへ遷移できる
- [x] 問い・視点・今日の小さな一歩が本文とメタデータに残る
- [x] 購入リンクが指定URLへ遷移する
- [x] 目的の変更が反映される
- [x] scope 外の変更が入っていない
- [x] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] 画像寸法が4:5であることを `sips` で確認する
- [x] 変更箇所を目視確認する
- [x] 関連リンク / 導線 / 文言を確認する

## Optional Checks

- [x] `git diff --check`
- [x] Claude review gate の arch / diff を完了する

## Out Of Scope

- 今回やらない確認: Xへの投稿、既存コンテンツの一括修正、購入先の追加調査。
