# PBI Input

## Task

- task-id: TASK-hayabusa-shobodan-review
- title: 『ハヤブサ消防団 森へつづく道』レビュー追加
- owner: Claude
- date: 2026-08-23

## Request Summary

- 依頼の要約: 指定インフォグラフィックと本の内容を理解したうえで、読書withCocoのブランド方針に即したレビュー文章を作成し、公開コンテンツとして反映する。
- 背景: 池井戸潤『ハヤブサ消防団 森へつづく道』(集英社、シリーズ第2作)のレビューを追加し、既存のレビュー導線に接続する。

## Goal

- 達成したいこと: レビュー一覧・レビュー詳細に新規レビューが正しく表示され、インフォグラフィック画像が参照される状態にする。
- 完了条件: ブランド規約(問い・変化・実生活・ココちゃんの4軸)、content schema、画像メディアパイプライン、frontend verify を確認する。

## Scope

- 含める: 対象レビュー原稿の作成と改善、指定インフォグラフィック画像の `public/uploads/review/infographic/` への配置と manifest 反映、指定 gallery 画像の import・rename と gallery entry 整備、review への `cover`・楽天 moshimo アフィリエイト URL 反映、PlanGate 記録、検証、review gate、pr-merge による commit〜PR〜squash merge〜branch cleanup。
- 含めない: 既存レビュー・コンポーネントの修正、`inbox/infographic/`・`.playwright-cli/` 等の未追跡ファイル整理。

## Constraints

- 既存運用との整合: `docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/review-addition-checklist.md`、既存 Review schema を正本とする。
- ネタバレ配慮: 事件の結末・犯人・主人公への「ある出会い」の中身には触れない。
- 触ってよいファイルや領域: 対象 review markdown、対象 public asset、必要な media manifest、今回の PlanGate 記録。

## References

- 関連ドキュメント: `docs/review-addition-checklist.md`、`docs/process/lightweight-plangate.md`、既存の池井戸潤レビュー `src/content/reviews/boutique-ikeido-jun.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: ギャラリー画像(表紙×ココちゃん)は未提供のため `cover` は持たせない。詳細ページのヒーロー画像は `infographic ?? cover`、一覧・ホームも infographic フォールバックが効くため表示上の問題はない。後続タスクで gallery 画像を追加可能。
- 未確定事項: purchaseLinks はユーザー指定がないため、checklist 準拠の Amazon 書名検索リンクのみ登録する(楽天アフィリエイト URL は商品IDを確定できないため作らない)。
- 2026-08-23 追記: ユーザーから gallery 画像と楽天 moshimo アフィリエイト URL の提供を受けたため、gallery 反映・cover 設定・楽天 URL 登録を本タスクの scope に追加した。レビュー原稿の改善依頼も受け、第2段階として反映済み。
