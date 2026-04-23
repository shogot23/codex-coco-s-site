# Test Cases

## Task

- task-id: `TASK-gallery-visibility-phase-c-2026-04-23`
- related plan: `docs/tasks/TASK-gallery-visibility-phase-c-2026-04-23/plan.md`

## Must Check

- [x] `/gallery/` curated で lead / trail が `data-gallery-piece` として描画される
- [x] 各 curated piece に `data-gallery-piece-media` と `data-gallery-piece-caption` が同居する
- [x] `more toggle` 展開後に増える trail card も同じ作品構造で描画される
- [x] `/gallery/archive/` grid card の media 高さが desktop / mobile ともに比較しやすく揃って見える
- [x] grid card 内で genre / title / author / CTA(status) が同一 caption 面に収まる
- [x] 既存の `view` / `genre` / `sort` / `more toggle` / back-forward / URL sync が壊れていない
- [x] scope 外の `src/utils/gallery.ts`、gallery detail page、content schema に差分が入っていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktop の `/gallery/` curated で画像サイズのばらつきが緩和され、caption の対応先に迷わない
- [x] mobile の `/gallery/` curated で card が縦に伸びすぎず、作品単位でスクロールできる
- [x] desktop の `/gallery/archive/` grid で一覧比較しやすいリズムが出ている
- [x] mobile の `/gallery/archive/` grid で media と caption が離れすぎず、横スクロールも出ない

## Optional Checks

- [x] Playwright で `chromium` / `mobile-chrome` の両 project を確認する
- [x] frontend 変更時は `npm run verify:frontend`
- [x] Claude review gate を完了する

## Out Of Scope

- 今回やらない確認:
  - pagination 導入
  - page hero / featured / bridge の再設計
  - gallery detail page の UI 変更
