# Test Cases

## Task

- task-id: `TASK-sns-three-book-landing-2026-04-20`
- related plan: `docs/tasks/TASK-sns-three-book-landing-2026-04-20/plan.md`

## Must Check

- [x] `/3books/` が表示される
- [x] 3冊の順番が計画どおり
- [x] 主導線が `レビューを読む` のまま
- [x] 購入導線が secondary のまま
- [x] Home に `3booksへ` 補助ボタンが1つだけ追加されている
- [x] review detail 3本が公開されている
- [x] gallery 2件に `relatedReview` が反映されている
- [x] scope 外のページ再設計が入っていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] `/3books/` を見て3秒で入口とわかる
- [x] 3冊の違いが見出しと短文で伝わる
- [x] Home 補助導線が既存主CTAより強く見えない
- [x] review detail 本文が原稿の意味から逸脱していない
- [x] モバイルで CTA がフル幅 stack になっている
- [x] 横スクロールが出ない

## Optional Checks

- [x] Playwright で `/3books/` の導線を明示的に追加確認
- [x] review detail の opening-actions と Reading Shelf の強さが適切
- [x] gallery fallback を使うメガチャーチ review detail の読後導線が不自然でない

## Out Of Scope

- nav 追加
- `イン・ザ・メガチャーチ` gallery 新設
- Reviews 一覧の再設計
- Home 全体の構成変更
