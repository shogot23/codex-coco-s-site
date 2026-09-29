# PBI Input

## Task

- task-id: TASK-tobari-review-gallery
- title: 『帳の向こう』のレビュー・ギャラリー公開
- owner: Codex
- date: 2026-09-29

## Request Summary

- 依頼: 提供済みの一人称レビュー、インフォグラフィック、ギャラリー場面をレビュー・ギャラリーへ反映し、提供の楽天もしもアフィリエイト URL を添えて、PR 作成から squash merge・公開確認まで実施する。
- ブランド意図: 書誌紹介を本文の主役にせず、目的や成果を求める息苦しさ、視点の変化、今日の小さな行動へつなぐ。

## Goal

- レビュー詳細とギャラリー詳細が公開され、画像・相互導線・購入リンクが正しく動く。
- 既存の汚れた main checkout を保護し、専用 worktree だけで実装する。

## Scope

- 含める: 新規 review/gallery Markdown、レビュー用 infographic、ギャラリー用修正画像、media manifest、PlanGate 記録、必要な検証、Claude review gate、PR・merge・Pages 確認。
- 含めない: 既存コンポーネント・既存記事・依存関係・別件の main 未コミット変更。

## Constraints

- 出典: 文藝春秋公式書誌 ISBN 978-4-16-392116-7。著者は國分功一郎・若林正恭、出版社は文藝春秋。
- 添付ギャラリー画像は書影の出版社・装丁が公式と異なる。ココちゃんと夕景を残し、ユーザー提供の実物写真に写る本の表紙へ差し替える。表紙と帯の読める題名・著者名・文章および図柄が実物と一致する場合だけ公開候補にする。合成画像として `visualOrigin: ai-generated` と明記する。
- インフォグラフィックは添付原本をバイト同一で使う。
- アフィリエイトは以下の依頼原文を HTML entity decode した URL と完全一致させ、1px 計測画像は入れない。購入導線は本文の補助。
- URL 期待値: `https://af.moshimo.com/af/c/click?a_id=5459507&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18735254%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F22041427%2F`
- review 本文には前の依頼どおり書名・試し読み案内を置かず、「この本」と書く。frontmatter の題名・著者は公式書誌と一致させ、ISBN と出版社は本タスクの出典記録で保持する。

## References

- `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/brand/` 3文書, `docs/review-addition-checklist.md`, `docs/process/lightweight-plangate.md`
- 文藝春秋: https://books.bunshun.jp/ud/book/num/9784163921167
- 添付: `inbox/infographic/20260919-075631-帳の向こう-國分功一郎／若林正恭.png`, `inbox/gallery/3FD9830E-44E2-4247-8922-C9D978A0F25D.png`, `inbox/gallery/tobari-real-cover-reference.jpg`（提供写真をコピーして非公開で保管）

## Notes

- 元のギャラリー画像は未変更のまま保持する。
- 前案の無文字の本は採用しない。ユーザー提供の実物写真を参照して生成した画像の表紙を、原本と拡大比較し、文字化けや意匠の変形があれば公開しない。
