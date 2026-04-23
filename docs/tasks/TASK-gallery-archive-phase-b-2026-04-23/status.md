# Status

## Task

- task-id: `TASK-gallery-archive-phase-b-2026-04-23`
- state: done
- updated: 2026-04-23

## Summary

- 実施内容:
  - `src/components/gallery/GalleryBrowse.astro` を追加し、gallery / archive 共通の browse UI を切り出した
  - `/gallery/archive/` を新設し、grid 既定・genre / sort / view URL state・no-JS fallback を実装した
  - `/gallery/` に archive 導線を追加し、展示の補助棚としての位置づけに寄せた
  - `tests/e2e/site-smoke.spec.ts` に archive smoke を追加した
  - frontend verify と Claude review gate（arch / grouped diff / docs diff）を完了した
- 完了した範囲:
  - PlanGate 用 task docs の作成
  - branch `codex/gallery-archive-phase-b` の作成
  - gallery/archive 二層化の実装
  - verify と review gate の完了

## Verification Result

- `npm run typecheck`: passed
- `npm run build`: passed
- 追加確認:
  - `npm run lint`: passed
  - `npm run test:e2e`: passed
  - `npm run verify:frontend`: passed
  - Claude review gate: passed (`arch`, grouped `diff`, docs `diff` all `ok: true`)

## Scope Check

- scope 内で収まっているか: はい
- 見送った項目:
  - primary nav への archive 追加
  - taxonomy SoT の再設計
  - gallery detail page の再設計
  - detailless 公開作品の fixture 追加

## Next Action

- 残件:
  - なし
- 次に見る人へのメモ:
  - archive 初版は primary nav に追加していない
  - 現在の公開 gallery データには detailless item が無いため、非リンク card の runtime 実例はまだ出ていない
  - static card fallback は shared component 側で維持しているので、fixture 追加後に smoke を拡張できる

## Daily Record

- 記録先: `docs/tasks/TASK-gallery-archive-phase-b-2026-04-23/status.md`
- 記録内容: Gallery archive phase B の実装、verify、review gate 結果を記録した
