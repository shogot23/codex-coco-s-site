# PBI Input

## Task

- task-id: `TASK-gallery-archive-phase-b-2026-04-23`
- title: Gallery archive phase B
- owner: Codex
- date: 2026-04-23

## Request Summary

- 依頼の要約: `/gallery/archive/` を新設し、`/gallery/` を展示室、archive を探すための目録として二層化する
- 背景: Phase A で browse model、view / genre URL state、compact grid card を導入済みのため、それらを SoT として再利用しながら一覧性を強化したい

## Goal

- 達成したいこと:
  - `/gallery/archive/` を新設する
  - gallery 側から archive への自然な導線を追加する
  - browse UI を gallery / archive で共有できる責務に整理する
  - 将来の件数増加に耐える目録の骨格を先に作る
- 完了条件:
  - archive が grid 既定で表示される
  - genre / sort / view が URL state と同期する
  - no-JS でも archive の静的一覧が成立する
  - gallery の展示体験と既存 smoke が壊れていない

## Scope

- 含める:
  - `src/pages/gallery.astro`
  - `src/pages/gallery/archive.astro`
  - `src/components/gallery/` 配下の共有 browse UI
  - `src/utils/gallery.ts` の最小限の拡張
  - `tests/e2e/site-smoke.spec.ts`
  - task docs 更新
- 含めない:
  - `src/pages/gallery/[slug].astro` の再設計
  - taxonomy SoT の再設計
  - primary nav への archive 追加
  - content schema や gallery コンテンツ自体の変更

## Constraints

- 既存運用との整合:
  - `publish/dev-critical` として扱い、frontend verify と Claude review gate を必須にする
  - PlanGate に従い、plan 固定後に実装する
- 納期 / 優先度:
  - 最優先は `/gallery/archive/` の新設と gallery からの導線
  - 過剰抽象化より最小差分を優先する
- 触ってよいファイルや領域:
  - gallery browse UI とその SoT
  - tests/e2e smoke
  - docs/tasks の今回タスク領域

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/process/lightweight-plangate.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
  - `DESIGN.md`
  - `docs/tasks/TASK-gallery-listing-phase-a-2026-04-23/*`
- 関連 issue / PR:
  - Phase A は main に squash merge 済み

## Notes

- 領域固有メモ:
  - visual thesis: `/gallery/` は展示の静けさを保ち、archive は目録として比較しやすい密度に寄せる
  - content plan: gallery は hero / featured / browse shelf / bridge を維持し、archive は短い導入 + browse catalog を主役にする
  - interaction thesis: gallery は「展示を見る」導線、archive は「探す・比べる」導線を主目的にする
- 未確定事項:
  - sort は `latest` / `title` の 2 種を採用し、将来拡張は別フェーズで検討する
