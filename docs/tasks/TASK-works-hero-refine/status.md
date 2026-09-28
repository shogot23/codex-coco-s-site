# Status

## Task

- task-id: TASK-works-hero-refine
- state: implementation-verified
- updated: 2026-09-28

## Summary

- 実施内容: 既存hero画像の左側へdesktopのcopy/CTAを配置。920px以下はcopy→CTA→画像へstackし、finderと一覧は既存720px breakpointを維持。説明を一文にし、finderへのCTAと0件/no-JS時の表示条件を追加。
- 完了した範囲: desktop・820px・mobileはSolがデザイン承認。追加で880pxを目視し、Heroをstackする920px breakpointを決めた。DOM順をcopy→画像へ揃え、CTA遷移、keyboard Tab到達と3px focus ring、選択値、OGP/X画像不変を確認。mobileはfinder上端64px／header下端62px、desktopは64.5px／60pxで見出しが隠れないことを実測。

## Verification Result

- `npm run typecheck`: passed (0 errors, warnings, hints)
- `npm run build`: passed
- 追加確認: `npm run verify:frontend` passed (lint/typecheck/build/E2E; 91 passed, 7 skipped)。`npm run test:works-preview` passed (40 tests)。PlanGate plan reviewは`ok: true`, blockingなし。Claude architectureと最終diff reviewは`ok: true`、blockingなし。初回diff reviewの読み上げ順指摘は修正済み。

## Scope Check

- scope 内で収まっているか: はい。Astro page、works.css、works e2e、TASK-works-hero-refine記録、dailyのみ。
- 見送った項目: 新規画像生成、OGP/X画像・meta変更、finderロジック変更、公開境界変更。

## Next Action

- 残件: commit/PR/checks/merge/Pages確認。
- 次に見る人へのメモ: 元mainはdirty/untrackedのため保護。`codex/works-hero-refine` の隔離worktreeで作業中。

## Daily Record

- 記録先: `inbox/daily/2026-09-28.md`
- 記録内容: `/works/` Hero改善、PlanGate、frontend verify、画面レビュー結果。
