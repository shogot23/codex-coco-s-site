# Test Cases

## Task

- task-id: `TASK-gallery-archive-phase-b-2026-04-23`
- related plan: `docs/tasks/TASK-gallery-archive-phase-b-2026-04-23/plan.md`

## Must Check

- [x] `/gallery/` の hero / featured / existing browse UX が崩れていない
- [x] `/gallery/` から `/gallery/archive/` へ自然に遷移できる
- [x] `/gallery/archive/` の初期表示が grid である
- [x] archive の genre / sort / view が URL state と同期する
- [x] back / forward で archive state が復元される
- [ ] detail を持たない作品が archive 上で非リンクカードとして表示される
- [x] scope 外の detail page、taxonomy、content schema に差分が入っていない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktop で gallery が展示室として読みやすく、archive が目録として比較しやすい
- [x] mobile で archive controls が過密にならず、横スクロールが出ない
- [x] gallery 側の archive 導線と review / about bridge が共存している
- [x] no-JS 相当でも archive の静的一覧が成立している

## Optional Checks

- [x] Playwright で `/gallery/archive/` の state sync を両 project で確認する
- [x] frontend 変更時は `npm run verify:frontend`
- [x] Claude review gate を完了する

## Out Of Scope

- 今回やらない確認:
  - `src/pages/gallery/[slug].astro` の UI 再設計
  - taxonomy SoT の再編
  - primary navigation への archive 追加
  - detailless 公開作品の fixture 追加
