# Test Cases

## Task

- task-id: TASK-home-featured-multi-purchase-links-2026-04-13
- related plan: `docs/tasks/TASK-home-featured-multi-purchase-links-2026-04-13/plan.md`

## Must Check

- [x] Home Featured の purchaseLinks 描画が `map(...)` ベースへ置き換わっている
- [x] 主 CTA「レビューを読む」の優先度が変わっていない
- [x] scope 外のファイル改修が入っていない

## Command Checks

- [x] `npm run typecheck`
- [x] `npm run build`

## Manual Checks

- [x] Home Featured で購入リンク描画が frontmatter 配列を順に走査する実装へ変わっている
- [x] 購入 CTA が secondary の見せ方のまま補助導線として見える
- [x] 既存のレビュー一覧導線と表示順が崩れていない

## Optional Checks

- [ ] 領域固有の追加確認: 現在の featured review は単一 purchaseLink のため、複数描画の実表示確認は未実施
- [x] frontend 変更時は `npm run verify:frontend`
- [x] 既存の強い verify がある場合はそれも実行する

## Out Of Scope

- `/reviews` 一覧 / 詳細の追加改修
- 新規 e2e テスト追加
