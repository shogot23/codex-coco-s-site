# PBI Input

## Task

- task-id: TASK-works-share-image
- title: ワーク一覧の顔画像とXカード
- owner: Codex
- date: 2026-09-26

## Request Summary

- `/works/` をXで共有すると、無関係な本の画像が表示される。
- ワーク一覧の冒頭とXカードに、共通の世界観を持つ専用画像を使う。

## Goal

- 開いた本から手元のメモへ案内するココちゃんの画像を、ページとXカードに表示する。
- 公開後のHTMLで専用画像のOGPを確認し、画像を取得できるようにする。

## Scope

- 含める: `/works/` の冒頭、専用画像、OGP設定、回帰確認、PRから本番反映まで。
- 含めない: 個別ワークの画像や本文、Xへの投稿。

## Constraints

- `publish/dev-critical` としてClaudeレビューとfrontend検証を通す。
- ココちゃんの外見はstudioの正本画像に合わせ、ブランドの「本 × ココちゃん × 学び」を守る。
- 既存のmain作業ツリーの変更には触れず、専用worktreeで進める。

## References

- `docs/parallel-dev-config.md`
- `docs/brand/reading-with-coco-brand-strategy.md`
- `docs/brand/reading-with-coco-content-guidelines.md`
- `docs/reading-with-coco-design-doctrine.md`
