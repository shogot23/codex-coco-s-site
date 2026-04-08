# PBI Input

## Task

- task-id: `TASK-gallery-description-fix-2026-04-08`
- title: `ひゃくえむ。gallery description fix`
- owner: Codex
- date: 2026-04-08

## Request Summary

- 依頼の要約: `ひゃくえむ。` の gallery 用紹介文を正式文へ差し替え、Gallery ページでは description 表示から title / author を分離する。
- 背景: 公開中の Home Featured Gallery と Gallery で下書き文が表示され、Gallery 側では content に混ざった title / author が description にそのまま出る。

## Goal

- 達成したいこと: `ひゃくえむ。` の description を正式文に更新し、Gallery 系カードでは description 部分に title / author を含めない。
- 完了条件: Gallery content 更新、Gallery ページ表示修正、`npm run typecheck` と `npm run build` 成功。

## Scope

- 含める: `src/content/gallery/manga-hyakuemu.md` の更新、`src/pages/gallery.astro` の表示調整、task 記録。
- 含めない: Home / Reviews のデザイン変更、他 gallery content の文面修正、不要な refactor。

## Constraints

- 既存運用との整合: `publish/dev-critical` として review gate を通す。最小差分を維持する。
- 納期 / 優先度: 公開表示不整合の修正を優先。
- 触ってよいファイルや領域: `src/content/gallery/`, `src/pages/gallery.astro`, `docs/tasks/TASK-gallery-description-fix-2026-04-08/`

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: Home Featured Gallery は content description 更新で反映される想定。
- 未確定事項: なし
