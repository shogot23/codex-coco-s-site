# PBI Input

## Task

- task-id: TASK-eien-no-kioku-review
- title: 『永遠の記憶』レビュー・ギャラリー追加
- owner: Claude
- date: 2026-08-28

## Request Summary

- 依頼の要約: 東野圭吾『永遠の記憶』のレビュー文・インフォグラフィック・ギャラリー画像（ユーザー提供）を、読書withCocoのブランド方針と規定に準拠して公開コンテンツとして反映する。
- 背景: ガリレオシリーズ最新長編（文藝春秋、ISBN 978-4-16-392132-7、2026-08-05 刊）のレビューを追加し、既存のレビュー・ギャラリー 導線に接続する。

## Goal

- 達成したいこと: レビュー一覧・レビュー詳細に新規レビューが正しく表示され、インフォグラフィックとギャラリー画像（cover）が参照される状態にする。
- 完了条件: ブランド規約(問い・変化・実生活・ココちゃんの4軸)、content schema、画像メディアパイプライン、frontend verify を確認する。

## Scope

- 含める: 対象レビュー原稿(ユーザー提供文を本文として採用し frontmatter を整備)の作成、指定インフォグラフィック画像の `public/uploads/review/infographic/` への配置と manifest 反映、指定 gallery 画像の import・rename と gallery entry 整備、review への `cover`・楽天 moshimo アフィリエイト URL 反映、PlanGate 記録、検証、review gate、pr-merge による commit〜PR〜squash merge〜branch cleanup。
- 含めない: 既存レビュー・ギャラリー・コンポーネントの修正、`inbox/`・`.playwright-cli/` 等の未追跡ファイル整理。

## Constraints

- 既存運用との整合: `docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/review-addition-checklist.md`、既存 Review schema を正本とする。
- ネタバレ配慮: 文藝春秋公式あらすじの範囲（内海刑事が刺される事件の発生と、過去につながる捜査の始まり）までとし、結末・復讐の全容・各登場人物の「失ったもの」の正体には触れない。ユーザー提供原稿はこの範囲内で書かれていることを確認済み。
- 触ってよいファイルや領域: 対象 review markdown、対象 public asset、必要な media manifest、今回の PlanGate 記録。

## References

- 関連ドキュメント: `docs/review-addition-checklist.md`、`docs/process/lightweight-plangate.md`
- 書誌: 文藝春秋 単行本 ISBN 978-4-16-392132-7（[文藝春秋書誌](https://books.bunshun.jp/ud/book/num/9784163921327)）
- 関連 issue / PR: なし

## Notes

- ユーザー提供物: レビュー文（本文として採用）、gallery 画像 `inbox/gallery/C69DA0F6-41C4-4117-B4BF-ACC31BFE7EA6.png`、インフォグラフィック `inbox/infographic/20260827-225708-永遠の記憶-東野圭吾.png`、楽天 moshimo アフィリエイト URL（item.rakuten.co.jp/book/18664673/）。
- gallery 画像は AI 生成（ココちゃんが『永遠の記憶』の文庫イメージを覗き込む、赤い糸の作戦部屋風）のため `visualOrigin: ai-generated` を設定する。
