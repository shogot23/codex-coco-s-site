# PBI Input

## Task

- task-id: TASK-works-hero-refine
- title: `/works/` 冒頭の構図と検索導線を整える
- owner: Luna
- date: 2026-09-28

## Request Summary

- 依頼の要約: `/works/` 冒頭でココちゃん・本・メモを一つの場面として大きく見せ、短い説明と検索CTAを配置する。
- 背景: 現状は画像と本文が別々の左右カラムで、画像左側の余白と本文側の余白が重なり、冒頭の印象が弱い。

## Goal

- 達成したいこと: desktopでは既存画像の左の余白にコピーとCTAを載せ、mobileではコピー・CTA・寄った画像の順で自然に見せる。検索説明の重複を減らす。
- 完了条件: 既存の全ワーク表示、no-JS表示、WORKS_PREVIEW境界、個別ワーク導線を保ち、CTAが検索欄へ移動する。desktop/mobileの画面を目視確認し、frontend verifyを完了する。

## Scope

- 含める: `src/pages/works/index.astro`, `src/styles/works.css`, 必要最小限の `tests/e2e/works.spec.ts`, `docs/tasks/TASK-works-hero-refine/`, 当日daily。
- 含めない: 画像の生成・編集、Xカード/OGPの変更、ワーク本文や公開状態、検索ロジック、他ページ。

## Constraints

- 既存運用との整合: 分類は `publish/dev-critical`。PlanGateとClaude review gate、`npm run verify:frontend` を適用する。
- 納期 / 優先度: 冒頭の違和感解消を優先。
- 触ってよいファイルや領域: 上記scope内のみ。元mainのdirty/untracked workは隔離し保護する。

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`, `docs/reading-with-coco-design-doctrine.md`, `docs/frontend-playbook.md`, `DESIGN.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: CTA文言は「今の気分から探す」。冒頭の「本から、今日の小さな一歩へ。」は維持。説明は「本をまだ読んでいなくても、紙やメモで試せる短いワークです。」を軸に一文とする。
- 未確定事項: なし。880pxでコピーが画像の被写体へかかることを確認し、Heroのstack breakpointを920pxに設定した。finderと一覧は720pxのまま維持する。
