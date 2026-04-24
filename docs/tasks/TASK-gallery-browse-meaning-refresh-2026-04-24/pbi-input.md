# PBI Input

## Task

- task-id: `TASK-gallery-browse-meaning-refresh-2026-04-24`
- title: Gallery browse meaning refresh
- owner: Codex
- date: 2026-04-24

## Request Summary

- 依頼の要約:
  - Gallery / Archive の browse UI から実装都合の説明を減らし、`Curated / Grid` をユーザーに伝わる表現へ置き換える
  - `/gallery/` は章ごとに眺める場所、`/gallery/archive/` は一覧で探す場所として役割差を UI で伝える
- 背景:
  - archive 冒頭と browse controls に `no-JS`、`pagination`、`責務` など作り手目線の説明が残っている
  - `Curated / Grid` はラベルだけでは意味が伝わりにくく、切替後も何が変わったか分かりにくい

## Goal

- 達成したいこと:
  - ユーザーが説明を読まずに browse UI の意味と使い分けを理解できる状態にする
- 完了条件:
  - `Curated / Grid` が `章で見る / 一覧で見る` へ変わっている
  - archive / gallery の冒頭説明がユーザー向けの短い文へ置き換わっている
  - 切替後の見え方の差が視覚的に明確になっている
  - 既存の `view` / `genre` / `sort` / `more toggle` / URL sync が壊れていない

## Scope

- 含める:
  - `src/components/gallery/GalleryBrowse.astro`
  - `src/pages/gallery.astro`
  - `src/pages/gallery/archive.astro`
  - `tests/e2e/site-smoke.spec.ts`
  - `docs/tasks/TASK-gallery-browse-meaning-refresh-2026-04-24/*`
- 含めない:
  - `src/utils/gallery.ts` のデータ契約変更
  - pagination、新 filter、detail page 改修
  - `src/content/` のデータ更新

## Constraints

- 既存運用との整合:
  - `publish/dev-critical` として進め、verify 完了後に `claude-review-gate` を必ず実行する
  - main へ直接 commit しない
  - frontend hard rules と design doctrine を維持する
- 納期 / 優先度:
  - 今回の主戦場は archive browse UI。広げすぎず、意味が伝わる UI へ集中する
- 触ってよいファイルや領域:
  - gallery browse component、gallery/archive page copy、smoke test、task docs

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/parallel-dev-config.md`
  - `docs/frontend-playbook.md`
  - `docs/reading-with-coco-design-doctrine.md`
- 関連 issue / PR:
  - 直近フェーズ:
    - Phase A: gallery listing phase A
    - Phase B: gallery archive phase B
    - Phase C: gallery visibility phase C
    - lead image stretch fix

## Notes

- 領域固有メモ:
  - visual thesis: browse controls を「内部モード切替」ではなく「章で眺める / 一覧で探す」が一目で分かる棚にする
  - content plan: `/gallery/` は章ごとに景色をめくる入口、`/gallery/archive/` は一覧から気になる作品を探す入口に寄せる
  - interaction thesis: active mode の意味を短く示し、切替後は chapter 構成と uniform grid の差が見た目で伝わるようにする
- 未確定事項:
  - なし。ラベルは `章で見る / 一覧で見る` を採用する
