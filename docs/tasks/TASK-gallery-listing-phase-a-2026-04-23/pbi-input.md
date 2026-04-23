# PBI Input

## Task

- task-id: `TASK-gallery-listing-phase-a-2026-04-23`
- title: Gallery listing phase A
- owner: Codex
- date: 2026-04-23

## Request Summary

- 依頼の要約: `src/pages/gallery.astro` を中心に、Curated / Grid 切替、ジャンルフィルタ、章内「もっと見る」、一覧カード軽量化を最小差分で導入する
- 背景: Gallery の展示性と一覧性が同居しており、作品数増加で特にスマホのスクロール負荷と比較しづらさが強くなっている

## Goal

- 達成したいこと: 現行 gallery の世界観を保ちながら、探す用途の閲覧負荷を下げ、将来 `/gallery/archive/` に分離しやすい骨格を整える
- 完了条件:
  - `Curated` / `Grid` 切替が動作する
  - ジャンルフィルタが browse section に効く
  - Curated 章内で「もっと見る」が動作する
  - compact grid card と browse model が将来流用できる
  - frontend verify と Claude review gate が完了している

## Scope

- 含める:
  - `src/pages/gallery.astro`
  - `src/utils/gallery.ts`
  - `tests/e2e/site-smoke.spec.ts`
  - task docs 更新
- 含めない:
  - `/gallery/archive/` 新設
  - `src/lib/gallery-taxonomy.ts` の SoT 変更
  - gallery detail page や content schema の変更

## Constraints

- 既存運用との整合:
  - `publish/dev-critical` として扱う
  - PlanGate を先に固定する
  - `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` → `npm run verify:frontend`
  - 実装後に Claude review gate を通す
- 納期 / 優先度: view 切替、章内省略、compact card を最優先。フィルタは同 PR に含める
- 触ってよいファイルや領域: 上記 scope のみ

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
  - `DESIGN.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ:
  - hero / featured は固定の展示導入として残す
  - browse section だけを interactive にし、no-JS では curated を維持する
- 未確定事項: なし。今回のフィルタは Curated + Grid の両方に入れる
