# PBI Input

## Task

- task-id: TASK-kaho-review-2026-07-26
- title: 『夏帆─The Tale of KAHO─』レビューの公開反映
- owner: Codex
- date: 2026-07-26

## Request Summary

- 依頼の要約: ユーザー提供のインフォグラフィック、ギャラリー画像、本の内容に基づくレビューを、読書withCocoのレビューページへ反映する
- 背景: 『夏帆』の現実と異界のあいだにある読書体験を、違和感・問い・日常の小さな行動へ翻訳して公開する

## Goal

- 達成したいこと: 『夏帆─The Tale of KAHO─』のレビュー詳細ページと関連する景色を公開し、読者に問いか行動を残す
- 完了条件: review/gallery content、画像アセット、相互導線が追加され、frontend verify と Claude review gate が完了する

## Scope

- 含める:
  - `src/content/reviews/kaho-the-tale-of-kaho.md`
  - `src/content/gallery/novel-kaho-the-tale-of-kaho.md`
  - `public/uploads/review/infographic/kaho_the_tale_of_kaho_murakami_haruki.png`
  - `public/uploads/gallery/books/Kaho_The_Tale_of_KAHO_Murakami_Haruki.png`
  - 提供されたもしもアフィリエイトの購入リンク（レビュー側のみ）
  - `inbox/daily/2026-07-26.md`
  - このタスクの PlanGate 記録
- 含めない:
  - 既存ページのレイアウト改修
  - ギャラリー側への購入リンク追加や、提供分以外の購入導線
  - 既存レビュー・ギャラリーの文言変更

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、PlanGate、frontend verify、Claude review gate を通す
- 納期 / 優先度: ユーザー依頼を優先
- 触ってよいファイルや領域: 上記 scope の新規コンテンツ、提供画像の公開用コピー、タスク記録のみ

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`, `docs/reading-with-coco-design-doctrine.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: レビューは「違和感を消す」から「違和感を自分の感覚へ戻る手がかりにする」への変化を軸にする。実生活への一歩は、ひっかかった言葉と自分の感覚を一行メモすること。ココちゃんは問いを手渡す案内役として扱う。
- 未確定事項: なし。提供HTMLから `href` のみを採用し、計測用の1px画像は採用しない。
