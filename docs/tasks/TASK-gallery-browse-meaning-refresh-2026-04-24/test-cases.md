# Test Cases

## Task

- task-id: `TASK-gallery-browse-meaning-refresh-2026-04-24`
- related plan: `docs/tasks/TASK-gallery-browse-meaning-refresh-2026-04-24/plan.md`

## Must Check

- [ ] archive 上部の実装説明が消えるか、ユーザー向けの短い文に変わる
- [ ] `Curated / Grid` が `章で見る / 一覧で見る` に変わる
- [ ] `章で見る` では chapter heading と lead piece が主役に見える
- [ ] `一覧で見る` では uniform grid と比較のしやすさが主役に見える
- [ ] scope 外の機能追加やデータ契約変更が入っていない

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] `/gallery/` desktop / mobile で controls、補助文、CTA が自然に読める
- [ ] `/gallery/archive/` desktop / mobile で「探す場所」として理解できる
- [ ] `genre` filter、`sort`、`more toggle`、URL sync、back-forward が維持される
- [ ] gallery / archive / review の導線が壊れていない

## Optional Checks

- [ ] `claude-review-gate` を完了し、blocking なし + `ok: true` を確認する

## Out Of Scope

- 今回やらない確認:
  - pagination 追加
  - detail page UI の再設計
  - `src/utils/gallery.ts` の schema / contract 変更
