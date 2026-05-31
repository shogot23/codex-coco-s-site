# PBI Input

## Task

- task-id: TASK-gyakuten-kantoku-moriyasu-2026-05-31
- title: 「逆転監督 森保一」（木崎伸也）ギャラリー・レビュー追加
- owner: 翔吾
- date: 2026-05-31

## Request Summary

- 依頼の要約: ユーザー提供のギャラリー画像、インフォグラフィック、レビュー本文、もしもアフィリエイトURLを使い、「逆転監督 森保一」をギャラリーページとレビューページへ反映する
- 背景: W杯開幕前に読みたい一冊として、サッカー監督論を日常の組織や家庭の学びへ翻訳する公開コンテンツを追加する

## Goal

- 達成したいこと: 「逆転監督 森保一」のギャラリー詳細とレビュー詳細が公開され、一覧・詳細間の導線と購入リンクが機能する
- 完了条件: 画像配置、content追加、関連レビューリンク、frontend verify、Claude review gate の `ok: true`

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
  - 無関係な `inbox/` ファイルや `.DS_Store` の整理

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、PlanGate と Claude review gate を通す
- 納期 / 優先度: 通常
- 触ってよいファイルや領域:
  - `docs/tasks/TASK-gyakuten-kantoku-moriyasu-2026-05-31/`
  - `public/uploads/gallery/books/`
  - `public/uploads/review/infographic/`
  - `src/content/gallery/`
  - `src/content/reviews/`
  - `inbox/daily/2026-05-31.md`

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/brand/reading-with-coco-brand-strategy.md`
  - `docs/brand/reading-with-coco-content-guidelines.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
  - `docs/gallery-generation.md`
- 関連 issue / PR: なし

## Notes

- gallery image: `inbox/gallery/FD768155-70EA-4378-A6E0-DA0A8C35CAD4.png`
- infographic: `inbox/infographic/20260531-215735-逆転監督-森保一-木崎伸也.png`
- もしもアフィリエイト label は既存に合わせて `楽天で見る`
- もしもHTMLは `href` のみを `https://af.moshimo.com/...` に正規化し、impression image tag は保存しない
- レビュー本文はユーザー提供本文を正本とする。ブランド方針に照らして、「問い」と「今日の一歩」が残る内容として採用する
