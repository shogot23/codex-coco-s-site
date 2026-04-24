# PBI Input

## Task

- task-id: `TASK-gallery-lead-image-stretch-fix-2026-04-24`
- title: Gallery browse lead image stretch fix
- owner: Codex
- date: 2026-04-24

## Request Summary

- 依頼の要約: `/gallery/` の Browse The Shelf curated view で、lead piece の大きい画像が横に引き延ばされて見える不具合を最小差分で修正する
- 背景: Gallery visibility Phase C は merge 済みだが、lead image だけが自然な比率を保てず、card 一覧は概ね正常なため、lead 表示まわりに修正対象を限定したい

## Goal

- 達成したいこと:
  - curated view の lead image が desktop / mobile ともに自然な比率で表示される
  - JS 再描画後も lead / trail / grid の media style が維持される
  - trail / grid card の正常表示と browse の既存導線を壊さない
- 完了条件:
  - `/gallery/` curated の lead image で横引き伸ばしが解消されている
  - `Curated` / `Grid` / genre filter / more toggle / URL sync が既存どおり動作する
  - `npm run lint` / `npm run typecheck` / `npm run build` / `npm run test:e2e` / `npm run verify:frontend` が通る
  - `claude-review-gate` が `ok: true` になる

## Scope

- 含める:
  - `src/components/gallery/GalleryBrowse.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-lead-image-stretch-fix-2026-04-24/*`
- 含めない:
  - `src/pages/gallery.astro` / `src/pages/gallery/archive.astro` のページ骨格変更
  - `src/utils/gallery.ts` のデータ契約変更
  - `src/content/` の画像や作品データ修正
  - pagination や別機能追加

## Constraints

- 既存運用との整合:
  - `publish/dev-critical` として扱い、Claude review gate を必須にする
  - main へ直接 commit せず、branch / PR / merge の順で進める
  - task docs 固定後に実装する
- 納期 / 優先度:
  - 最優先は lead image の横引き伸ばし解消
  - card 側の正常表示は壊さない
  - 最小差分での修正を優先する
- 触ってよいファイルや領域:
  - Gallery browse component の style 適用経路
  - lead media まわりの markup / CSS / inline render
  - Playwright smoke の最小限の回帰防止

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/process/lightweight-plangate.md`
  - `docs/frontend-playbook.md`
  - `docs/tasks/TASK-gallery-visibility-phase-c-2026-04-23/*`
- 関連 issue / PR:
  - Gallery visibility Phase C merge 後の follow-up bug fix

## Notes

- 領域固有メモ:
  - visual thesis: Browse The Shelf の lead piece を大きく見せつつ、引き延ばしではなく静かな展示写真として自然に見せる
  - content plan: chapter intro と lead piece の関係は維持し、画像と caption のまとまりだけを安定させる
  - interaction thesis: browse controls と URL sync は変えず、JS 再描画後の見え方だけを server render と揃える
- 未確定事項:
  - style 適用経路を直した上でなお lead 比率の微調整が必要かどうかは、実装後の目視で判断する
