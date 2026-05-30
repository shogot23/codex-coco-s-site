# PBI Input

## Task

- task-id: TASK-boutique-ikeido-jun-gallery-review-2026-05-30
- title: 「ブティック」（池井戸潤）ギャラリー・レビュー追加
- owner: 翔吾
- date: 2026-05-30

## Request Summary

- 依頼の要約: ユーザー提供のギャラリー画像とインフォグラフィックを使い、「ブティック」（池井戸潤）をギャラリーページとレビューページへ反映する
- 背景: 読書 with Coco の公開コンテンツとして、本から広がる景色とレビュー本文を相互導線でつなぐ

## Goal

- 達成したいこと: 「ブティック」のギャラリー詳細とレビュー詳細が公開され、一覧・詳細間の導線が機能する
- 完了条件: 画像配置、content 追加、関連レビューリンク、frontend verify、Claude review gate の `ok: true`

## Scope

- 含める:
  - gallery 画像を `public/uploads/gallery/books/` へ配置
  - infographic を `public/uploads/review/infographic/` へ配置
  - gallery content を新規追加
  - review content を新規追加
  - daily record を残す
- 含めない:
  - UI コンポーネントやページレイアウトの変更
  - collection schema の変更
  - 既存レビュー・既存ギャラリーの文言変更

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、PlanGate と Claude review gate を通す
- 納期 / 優先度: 通常
- 触ってよいファイルや領域:
  - `docs/tasks/TASK-boutique-ikeido-jun-gallery-review-2026-05-30/`
  - `public/uploads/gallery/books/`
  - `public/uploads/review/infographic/`
  - `src/content/gallery/`
  - `src/content/reviews/`
  - `inbox/daily/2026-05-30.md`

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/brand/reading-with-coco-brand-strategy.md`
  - `docs/brand/reading-with-coco-content-guidelines.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
- 関連 issue / PR: なし

## Notes

- gallery 画像: `inbox/gallery/7CCD6456-A960-4591-9E0D-EA7B924F9174.png`
- infographic: `inbox/infographic/20260530-212901-ブティック-池井戸潤.png`
- もしもアフィリエイト label は既存に合わせて `楽天で見る`
- レビュー本文はユーザー提供。ブランド方針に照らして、「問い」と「今日の一歩」が残る内容として採用する
