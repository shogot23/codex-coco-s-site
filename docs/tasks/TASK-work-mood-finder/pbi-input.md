# PBI Input

## Task

- task-id: `TASK-work-mood-finder`
- title: 気分や悩みからワークを選べる入口を追加する
- owner: Codex
- date: 2026-09-20

## Request Summary

- 依頼の要約: ワーク一覧で、今の気分や自分の悩みから、自分に合いそうなワークを選べるようにする。
- 背景: 公開ワークが増え、現在の全件一覧だけでは、自分の状態に近い一件を見つけるまでに読み比べが必要になっている。

## Goal

- 達成したいこと: 読者が短い選択操作から候補を絞り、困りごとからワーク、関連書籍へ迷わず進めるようにする。
- 完了条件: 気分と悩みのどちらか一方、または両方を選ぶと候補が更新され、キーボードとモバイルで利用できる。JavaScript無効時は選択UIを表示せず、全ワークの一覧と詳細リンクを利用できる。既存の詳細ページ、関連書籍、公開境界は維持する。

## Scope

- 含める: ワーク用の気分・悩み分類、全公開ワークへの分類付与、一覧の選択UIと候補表示、取り込み仕様、単体/E2E検証、公開手順文書の更新。
- 含めない: 自由入力、AIによる個別診断、回答の保存、会員機能、ワーク本文や研究根拠の改稿、新しいワークや画像の追加。

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、軽量 PlanGate、frontend verify、Claude review gateを通す。通常公開と下書きプレビューの境界を変えない。
- 納期 / 優先度: 既存の14件を使い、最小の選択で候補へ届くことを優先する。
- 触ってよいファイルや領域: `src/data/work-taxonomy.json`、`src/content/config.ts`、`src/content/works/`、`src/pages/works/index.astro`、`src/styles/works.css`、`scripts/work-import.mjs` とテスト、`scripts/check-works-dist.mjs`、`tests/e2e/works.spec.ts`、`docs/works-publishing.md`、`docs/tasks/TASK-works-pages/automation-addendum.md`、当タスク文書。

## References

- 関連ドキュメント: `docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md`、`DESIGN.md`、`docs/works-publishing.md`。
- 関連 issue / PR: PR #175、PR #176で追加されたワーク一覧と14件の公開ワーク。

## Notes

- 領域固有メモ: 「最適」と断定せず、「今の選択に合いそうなワーク」として提示する。選びにくい日は全件を見られる余白を残す。
- 未確定事項: なし。分類語は実装時に既存14件へ割り当て、テストで全件の分類漏れを検出する。
