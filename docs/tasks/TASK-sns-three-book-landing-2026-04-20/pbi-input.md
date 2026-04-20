# PBI Input

## Task

- task-id: `TASK-sns-three-book-landing-2026-04-20`
- title: SNS流入向け「おすすめ3冊」LPと review detail 3本追加
- owner: Codex
- date: 2026-04-20

## Request Summary

- 依頼の要約: `/3books/` を SNS 初見ユーザー向けの専用着地ページとして追加し、対象3冊の review detail 不足も同時に解消する
- 背景: X / Instagram のプロフィール改善に合わせて、初見ユーザーが迷わず `3冊を見る → 興味を持つ → review detail へ進む → 必要なら購入リンクへ進む` 導線をサイト内に作りたい

## Goal

- 達成したいこと:
  - `/3books/` を追加する
  - review detail 3本を新規追加する
  - Home から `/3books/` へ最小導線を1つ追加する
  - 既存 gallery 2件に `relatedReview` を反映する
- 完了条件:
  - `/3books/`
  - `/reviews/guzen-ha-donoyouni-anata-wo-tsukurunoka/`
  - `/reviews/in-the-megachurch/`
  - `/reviews/jinsei-kouhan-no-senryakusho/`
  が成立し、verify と review gate が完了している

## Scope

- 含める:
  - `/3books/` の新規追加
  - `src/content/reviews/` の新規3ファイル
  - Home への補助導線追加
  - `src/content/gallery/business-b6e8d3.md`
  - `src/content/gallery/business-193591.md`
  - 必要画像の配置と参照反映
  - e2e の必要最小限の更新
- 含めない:
  - schema 変更
  - nav 追加
  - `イン・ザ・メガチャーチ` 用 gallery 新設
  - Home 全体や Reviews 一覧の再設計
  - 既存 review template の大幅改修

## Constraints

- 既存運用との整合:
  - `publish/dev-critical`
  - clean worktree 原則
  - PlanGate 必須
  - `purchaseLinks` を source of truth とする
- 納期 / 優先度:
  - LP と review detail を一気通貫で公開可能状態にする
- 触ってよいファイルや領域:
  - `docs/tasks/TASK-sns-three-book-landing-2026-04-20/`
  - `src/pages/index.astro`
  - `src/pages/3books.astro`
  - `src/content/reviews/`
  - `src/content/gallery/business-b6e8d3.md`
  - `src/content/gallery/business-193591.md`
  - `public/uploads/gallery/books/`
  - `public/uploads/review/infographic/`
  - `tests/e2e/site-smoke.spec.ts`

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `CLAUDE.md`
  - `DESIGN.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
  - `docs/revenue-pathway-design.md`
  - `docs/parallel-dev-core.md`
  - `docs/parallel-dev-config.md`
- 関連 issue / PR:
  - なし

## Notes

- 領域固有メモ:
  - `inbox/gallery/` と `inbox/infographic/` の未追跡ファイルは今回作業用アセットとして許容
  - review 本文はユーザー原稿を正本とし、段落整理と軽微な表記修正のみに留める
- 未確定事項:
  - なし
