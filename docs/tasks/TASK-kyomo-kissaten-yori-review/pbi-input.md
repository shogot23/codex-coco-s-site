# PBI Input

## Task

- task-id: TASK-kyomo-kissaten-yori-review
- title: 『今日も、喫茶店より』レビュー・ギャラリー追加
- owner: Claude
- date: 2026-08-30

## Request Summary

- 依頼の要約: 佐藤満春『今日も、喫茶店より』のレビュー文・インフォグラフィック・ギャラリー画像（ユーザー提供）を、読書withCocoのブランド方針と規定に準拠して公開コンテンツとして反映する。
- 背景: 佐藤満春のエッセイ集（KADOKAWA、2026-08-19 刊）のレビューを追加し、既存のレビュー・ギャラリー導線に接続する。

## Goal

- 達成したいこと: レビュー一覧・レビュー詳細に新規レビューが正しく表示され、インフォグラフィックとギャラリー画像（cover）が参照される状態にする。
- 完了条件: ブランド規約（問い・変化・実生活・ココちゃんの4軸）、content schema、画像メディアパイプライン、frontend verify を確認する。

## Scope

- 含める: 対象レビュー原稿（ユーザー提供文を本文として採用し frontmatter を整備）の作成、指定インフォグラフィック画像の `public/uploads/review/infographic/` への配置と manifest 反映、指定 gallery 画像の import・rename と gallery entry 整備、review への `cover`・楽天 moshimo アフィリエイト URL 反映、PlanGate 記録、検証、review gate、pr-merge による commit〜PR〜squash merge〜branch cleanup。
- 含めない: 既存レビュー・ギャラリー・コンポーネントの修正、`inbox/`・`.playwright-cli/` 等の未追跡ファイル整理。

## Constraints

- 既存運用との整合: `docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/review-addition-checklist.md`、既存 Review schema を正本とする。
- ギャラリー規約: description に書名・著者名を含めない。`generated_at` を必ず設定する。`relatedReview` で相互リンクする。
- 触ってよいファイルや領域: 対象 review markdown、対象 public asset、必要な media manifest、今回の PlanGate 記録。

## References

- 関連ドキュメント: `docs/review-addition-checklist.md`、`docs/process/lightweight-plangate.md`
- 書誌: KADOKAWA 単行本 192p、2026-08-19 刊、ISBN 978-4-04-330204-3（[K-Dash Stage 発売情報](https://www.kdashstage.jp/topic/archives/2148)）
- 関連 issue / PR: なし

## Notes

- ユーザー提供物: レビュー文（本文として採用）、gallery 画像 `inbox/gallery/5C92470D-608A-4BFE-9C29-4B7698C7F02C.png`、インフォグラフィック `inbox/infographic/20260830-090601-今日も、喫茶店より-佐藤満春.png`、楽天 moshimo アフィリエイト URL（item.rakuten.co.jp/book/18682975/）。
- gallery 画像は AI 生成（レトロな喫茶店でココちゃんが単行本を覗き込む場面）のため `visualOrigin: ai-generated` を設定する。
