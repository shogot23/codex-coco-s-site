# PBI Input

## Task

- task-id: `TASK-gallery-visibility-phase-c-2026-04-23`
- title: Gallery visibility phase C
- owner: Codex
- date: 2026-04-23

## Request Summary

- 依頼の要約: `/gallery/` と `/gallery/archive/` の browse 体験で、画像サイズのばらつきと画像/テキスト対応の曖昧さを改善する
- 背景: Phase B で shared browse UI と archive は導入済みだが、curated 系の作品ブロックが作品単位に見えづらく、archive でも比較時のリズムがまだ不安定に見える

## Goal

- 達成したいこと:
  - lead / trail / grid の media sizing を整理して、PC / mobile 両方で一覧の視覚リズムを安定させる
  - 画像と genre / title / summary / CTA を作品単位として認識しやすい構造に寄せる
  - Gallery の静かな展示感と Archive の比較しやすさを両立する
- 完了条件:
  - `/gallery/` curated で各作品が media + caption のまとまりとして読める
  - `/gallery/archive/` grid の media 高さが比較しやすく揃って見える
  - mobile で縦に伸びすぎる card や caption の迷子がない
  - 既存の `view` / `genre` / `sort` / `more toggle` / URL state / no-JS fallback が壊れていない

## Scope

- 含める:
  - `src/components/gallery/GalleryBrowse.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-visibility-phase-c-2026-04-23/*`
- 含めない:
  - `src/pages/gallery.astro` と `src/pages/gallery/archive.astro` のページ骨格再設計
  - `src/utils/gallery.ts` のデータ契約変更
  - pagination、taxonomy 再設計、gallery detail page の UI 変更
  - `src/content/` の作品データ変更

## Constraints

- 既存運用との整合:
  - `publish/dev-critical` として扱い、frontend verify と Claude review gate を必須にする
  - main への直接 commit は行わず、branch / PR / merge フローで進める
  - PlanGate に従い、task docs 固定後に実装する
- 納期 / 優先度:
  - 最優先は作品単位の視認性改善
  - 見た目の派手さより意味関係の明確さを優先する
  - 過剰抽象化より最小差分を優先する
- 触ってよいファイルや領域:
  - Gallery browse component の markup / inline render / style
  - Playwright smoke
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
  - `docs/tasks/TASK-gallery-archive-phase-b-2026-04-23/*`

## Notes

- 領域固有メモ:
  - visual thesis: browse 部は展示室/目録それぞれの静けさを保ちつつ、各作品を「1つの景色の札」として一目で読める密度に整える
  - content plan: chapter intro は room header に留め、各作品は `media → genre/title → summary/meta → CTA/status` の順で 1 ブロックにまとめる
  - interaction thesis: `view` / `genre` / `sort` / `more toggle` / URL sync は保持し、クリック可能な作品単位がより明確に見えるようにする
- 未確定事項:
  - archive grid に summary は追加せず、比較性優先で title / author / CTA までに留める
